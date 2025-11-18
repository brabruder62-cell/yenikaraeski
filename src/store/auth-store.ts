import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { auth, table } from '@devvai/devv-code-backend';
import { getUser, initTelegramWebApp } from '@/lib/telegram';

const USERS_TABLE_ID = 'f41liqhtnp4w';

interface User {
  uid: string;
  email: string;
  name: string;
  telegram_id: number;
  telegram_username?: string;
  telegram_first_name: string;
  telegram_last_name?: string;
  coin_balance: number;
  join_date: string;
  referral_count: number;
  referral_code: string;
  referred_by?: string;
  _id?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  hasJoinedChannel: boolean;
  showWelcome: boolean;
  
  // Actions
  initialize: () => Promise<void>;
  login: (email: string) => Promise<void>;
  verifyOTP: (email: string, code: string, referralCode?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateCoinBalance: (amount: number) => Promise<void>;
  clearError: () => void;
  setHasJoinedChannel: (joined: boolean) => void;
  completeWelcome: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      hasJoinedChannel: false,
      showWelcome: true,

      initialize: async () => {
        try {
          set({ isLoading: true, error: null });

          // Initialize Telegram WebApp
          initTelegramWebApp();

          // Get Telegram user data
          const telegramUser = getUser();

          // Check channel membership from localStorage
          const channelJoined = localStorage.getItem('channel_joined') === 'true';
          set({ hasJoinedChannel: channelJoined, showWelcome: !channelJoined });

          // Check if we have a session
          const sid = localStorage.getItem('DEVV_CODE_SID');
          
          if (sid) {
            // User is already logged in, fetch from database
            try {
              // Get user ID from persisted state
              const existingUser = get().user;
              const userId = existingUser?.uid;
              if (userId) {
                // Query user from database by telegram_id
                const result = await table.getItems(USERS_TABLE_ID, {
                  query: {
                    _uid: userId,
                  },
                  limit: 1
                });

                if (result.items.length > 0) {
                  const dbUser = result.items[0];
                  const user: User = {
                    uid: userId,
                    email: dbUser.email || '',
                    name: dbUser.first_name,
                    telegram_id: parseInt(dbUser.telegram_id),
                    telegram_username: dbUser.username,
                    telegram_first_name: dbUser.first_name,
                    telegram_last_name: dbUser.last_name,
                    coin_balance: dbUser.coin_balance,
                    join_date: dbUser.join_date,
                    referral_count: dbUser.referral_count,
                    referral_code: dbUser.referral_code || '',
                    referred_by: dbUser.referred_by,
                    _id: dbUser._id,
                  };

                  set({ 
                    isAuthenticated: true, 
                    user,
                    isLoading: false 
                  });
                } else {
                  set({ isLoading: false });
                }
              } else {
                set({ isLoading: false });
              }
            } catch (error) {
              console.error('Failed to fetch user from database:', error);
              set({ isLoading: false });
            }
          } else {
            set({ isLoading: false });
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          set({ 
            error: 'Failed to initialize authentication', 
            isLoading: false 
          });
        }
      },

      login: async (email: string) => {
        try {
          set({ isLoading: true, error: null });
          await auth.sendOTP(email);
          set({ isLoading: false });
        } catch (error: any) {
          console.error('Login error:', error);
          set({ 
            error: error.message || 'Failed to send verification code', 
            isLoading: false 
          });
          throw error;
        }
      },

      verifyOTP: async (email: string, code: string, referralCode?: string) => {
        try {
          set({ isLoading: true, error: null });

          // Verify OTP with Devv backend
          const response = await auth.verifyOTP(email, code);
          const userId = response.user.uid;

          // Get Telegram user data
          const telegramUser = getUser();

          // Check if user exists in database
          const existingUsers = await table.getItems(USERS_TABLE_ID, {
            query: {
              _uid: userId,
            },
            limit: 1
          });

          let user: User;

          if (existingUsers.items.length > 0) {
            // User exists, update with latest data
            const dbUser = existingUsers.items[0];
            user = {
              uid: userId,
              email: response.user.email,
              name: dbUser.first_name,
              telegram_id: parseInt(dbUser.telegram_id),
              telegram_username: dbUser.username,
              telegram_first_name: dbUser.first_name,
              telegram_last_name: dbUser.last_name,
              coin_balance: dbUser.coin_balance,
              join_date: dbUser.join_date,
              referral_count: dbUser.referral_count,
              referral_code: dbUser.referral_code,
              referred_by: dbUser.referred_by,
              _id: dbUser._id,
            };
          } else {
            // New user - generate referral code
            const referralCodeGenerated = `KAR${telegramUser.id.toString().slice(-6)}`;
            
            // Initial coin balance
            let initialBalance = 1000;
            let referredBy = referralCode;

            // If user was referred, give bonus and update referrer
            if (referralCode) {
              initialBalance += 500; // Bonus for being referred
              
              // Find and update referrer
              try {
                const referrerResult = await table.getItems(USERS_TABLE_ID, {
                  query: {
                    referral_code: referralCode,
                  },
                  limit: 1
                });

                if (referrerResult.items.length > 0) {
                  const referrer = referrerResult.items[0];
                  // Update referrer's count and give bonus
                  await table.updateItem(USERS_TABLE_ID, {
                    _uid: referrer._uid,
                    _id: referrer._id,
                    referral_count: (referrer.referral_count || 0) + 1,
                    coin_balance: (referrer.coin_balance || 0) + 500, // Bonus for referrer
                  });
                }
              } catch (error) {
                console.error('Failed to update referrer:', error);
              }
            }

            // Create new user in database
            const newUserData = {
              _uid: userId,
              telegram_id: telegramUser.id.toString(),
              username: telegramUser.username || '',
              first_name: telegramUser.first_name,
              last_name: telegramUser.last_name || '',
              email: response.user.email,
              coin_balance: initialBalance,
              join_date: new Date().toISOString(),
              referral_count: 0,
              referral_code: referralCodeGenerated,
              referred_by: referredBy || '',
              is_admin: 0,
            };

            await table.addItem(USERS_TABLE_ID, newUserData);

            // Fetch the newly created user to get _id
            const createdUser = await table.getItems(USERS_TABLE_ID, {
              query: {
                _uid: userId,
              },
              limit: 1
            });

            const dbUser = createdUser.items[0];

            user = {
              uid: userId,
              email: response.user.email,
              name: telegramUser.first_name,
              telegram_id: telegramUser.id,
              telegram_username: telegramUser.username,
              telegram_first_name: telegramUser.first_name,
              telegram_last_name: telegramUser.last_name,
              coin_balance: initialBalance,
              join_date: dbUser.join_date,
              referral_count: 0,
              referral_code: referralCodeGenerated,
              referred_by: referredBy,
              _id: dbUser._id,
            };
          }

          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });

        } catch (error: any) {
          console.error('OTP verification error:', error);
          set({ 
            error: error.message || 'Invalid verification code', 
            isLoading: false 
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true });
          await auth.logout();
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false,
            error: null 
          });
        } catch (error: any) {
          console.error('Logout error:', error);
          set({ 
            error: error.message || 'Failed to logout', 
            isLoading: false 
          });
        }
      },

      updateCoinBalance: async (amount: number) => {
        const user = get().user;
        if (user && user._id) {
          const newBalance = user.coin_balance + amount;
          
          // Update in database
          try {
            await table.updateItem(USERS_TABLE_ID, {
              _uid: user.uid,
              _id: user._id,
              coin_balance: newBalance,
            });

            // Update local state
            set({ 
              user: { 
                ...user, 
                coin_balance: newBalance 
              } 
            });
          } catch (error) {
            console.error('Failed to update coin balance:', error);
            throw error;
          }
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setHasJoinedChannel: (joined: boolean) => {
        set({ hasJoinedChannel: joined });
        if (joined) {
          localStorage.setItem('channel_joined', 'true');
        }
      },

      completeWelcome: () => {
        set({ showWelcome: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated,
        hasJoinedChannel: state.hasJoinedChannel,
        showWelcome: state.showWelcome
      }),
    }
  )
);
