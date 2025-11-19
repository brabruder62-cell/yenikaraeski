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
          initTelegramWebApp();
          const telegramUser = getUser();

          // 1) Kanal katılım kontrolü
          const channelJoined = localStorage.getItem('channel_joined') === 'true';
          set({ hasJoinedChannel: channelJoined, showWelcome: !channelJoined });

          // 2) Demo bakiye: Telegram ID’ye göre 0-9999 arası
          const demoBalance = telegramUser ? telegramUser.id % 10000 : 0;

          // 3) Session kontrolü
          const sid = localStorage.getItem('DEVV_CODE_SID');
          if (sid && telegramUser) {
            // Backend’den kullanıcı çek
            const result = await table.getItems(USERS_TABLE_ID, {
              query: { _uid: telegramUser.id.toString() },
              limit: 1,
            });

            if (result.items.length > 0) {
              const dbUser = result.items[0];
              const user: User = {
                uid: dbUser._uid,
                email: dbUser.email || '',
                name: dbUser.first_name,
                telegram_id: parseInt(dbUser.telegram_id),
                telegram_username: dbUser.username,
                telegram_first_name: dbUser.first_name,
                telegram_last_name: dbUser.last_name,
                coin_balance: dbUser.coin_balance ?? demoBalance,
                join_date: dbUser.join_date,
                referral_count: dbUser.referral_count,
                referral_code: dbUser.referral_code || '',
                referred_by: dbUser.referred_by,
                _id: dbUser._id,
              };
              set({ user, isAuthenticated: true, isLoading: false });
            } else {
              // Yeni kullanıcı → demo bakiye ile kaydet
              const newBalance = demoBalance;
              const referralCode = `KAR${telegramUser.id.toString().slice(-6)}`;
              await table.addItem(USERS_TABLE_ID, {
                _uid: telegramUser.id.toString(),
                telegram_id: telegramUser.id.toString(),
                username: telegramUser.username || '',
                first_name: telegramUser.first_name,
                last_name: telegramUser.last_name || '',
                email: '',
                coin_balance: newBalance,
                join_date: new Date().toISOString(),
                referral_count: 0,
                referral_code: referralCode,
                referred_by: '',
                is_admin: 0,
              });
              const user: User = {
                uid: telegramUser.id.toString(),
                email: '',
                name: telegramUser.first_name,
                telegram_id: telegramUser.id,
                telegram_username: telegramUser.username,
                telegram_first_name: telegramUser.first_name,
                telegram_last_name: telegramUser.last_name,
                coin_balance: newBalance,
                join_date: new Date().toISOString(),
                referral_count: 0,
                referral_code: referralCode,
                referred_by: '',
              };
              set({ user, isAuthenticated: true, isLoading: false });
            }
          } else {
            // Giriş yapmadı ama demo bakiye göster
            if (telegramUser) {
              const user: User = {
                uid: telegramUser.id.toString(),
                email: '',
                name: telegramUser.first_name,
                telegram_id: telegramUser.id,
                telegram_username: telegramUser.username,
                telegram_first_name: telegramUser.first_name,
                telegram_last_name: telegramUser.last_name,
                coin_balance: demoBalance,
                join_date: new Date().toISOString(),
                referral_count: 0,
                referral_code: `KAR${telegramUser.id.toString().slice(-6)}`,
                referred_by: '',
              };
              set({ user, isAuthenticated: false, isLoading: false });
            } else {
              set({ isLoading: false });
            }
          }
        } catch (error: any) {
          console.error('Auth initialization error:', error);
          set({ error: 'Failed to initialize authentication', isLoading: false });
        }
      },

      login: async (email: string) => {
        try {
          set({ isLoading: true, error: null });
          await auth.sendOTP(email);
          set({ isLoading: false });
        } catch (error: any) {
          console.error('Login error:', error);
          set({ error: error.message || 'Failed to send verification code', isLoading: false });
          throw error;
        }
      },

      verifyOTP: async (email: string, code: string, referralCode?: string) => {
        try {
          set({ isLoading: true, error: null });
          const response = await auth.verifyOTP(email, code);
          const userId = response.user.uid;
          const telegramUser = getUser();
          if (!telegramUser) throw new Error('Telegram user not found');

          const demoBalance = telegramUser.id % 10000;
          const result = await table.getItems(USERS_TABLE_ID, { query: { _uid: userId }, limit: 1 });
          let user: User;

          if (result.items.length > 0) {
            const dbUser = result.items[0];
            user = {
              uid: userId,
              email: response.user.email,
              name: dbUser.first_name,
              telegram_id: parseInt(dbUser.telegram_id),
              telegram_username: dbUser.username,
              telegram_first_name: dbUser.first_name,
              telegram_last_name: dbUser.last_name,
              coin_balance: dbUser.coin_balance ?? demoBalance,
              join_date: dbUser.join_date,
              referral_count: dbUser.referral_count,
              referral_code: dbUser.referral_code,
              referred_by: dbUser.referred_by,
              _id: dbUser._id,
            };
          } else {
            const newBalance = demoBalance;
            const referralCodeGen = `KAR${telegramUser.id.toString().slice(-6)}`;
            let referredBy = referralCode;
            if (referralCode) {
              try {
                const refResult = await table.getItems(USERS_TABLE_ID, { query: { referral_code: referralCode }, limit: 1 });
                if (refResult.items.length > 0) {
                  const ref = refResult.items[0];
                  await table.updateItem(USERS_TABLE_ID, { _uid: ref._uid, _id: ref._id, referral_count: (ref.referral_count || 0) + 1, coin_balance: (ref.coin_balance || 0) + 500 });
                }
              } catch {}
            }
            await table.addItem(USERS_TABLE_ID, {
              _uid: userId,
              telegram_id: telegramUser.id.toString(),
              username: telegramUser.username || '',
              first_name: telegramUser.first_name,
              last_name: telegramUser.last_name || '',
              email: response.user.email,
              coin_balance: newBalance,
              join_date: new Date().toISOString(),
              referral_count: 0,
              referral_code: referralCodeGen,
              referred_by: referredBy || '',
              is_admin: 0,
            });
            const created = await table.getItems(USERS_TABLE_ID, { query: { _uid: userId }, limit: 1 });
            const dbUser = created.items[0];
            user = {
              uid: userId,
              email: response.user.email,
              name: telegramUser.first_name,
              telegram_id: telegramUser.id,
              telegram_username: telegramUser.username,
              telegram_first_name: telegramUser.first_name,
              telegram_last_name: telegramUser.last_name,
              coin_balance: newBalance,
              join_date: dbUser.join_date,
              referral_count: 0,
              referral_code: referralCodeGen,
              referred_by: referredBy,
              _id: dbUser._id,
            };
          }
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error: any) {
          console.error('OTP verification error:', error);
          set({ error: error.message || 'Invalid verification code', isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true });
          await auth.logout();
          set({ user: null, isAuthenticated: false, isLoading: false, error: null });
        } catch (error: any) {
          console.error('Logout error:', error);
          set({ error: error.message || 'Failed to logout', isLoading: false });
        }
      },

      updateCoinBalance: async (amount: number) => {
        const user = get().user;
        if (user && user._id) {
          const newBalance = user.coin_balance + amount;
          try {
            await table.updateItem(USERS_TABLE_ID, { _uid: user.uid, _id: user._id, coin_balance: newBalance });
            set({ user: { ...user, coin_balance: newBalance } });
          } catch (error) {
            console.error('Failed to update coin balance:', error);
            throw error;
          }
        }
      },

      clearError: () => set({ error: null }),

      setHasJoinedChannel: (joined: boolean) => {
        set({ hasJoinedChannel: joined });
        if (joined) localStorage.setItem('channel_joined', 'true');
      },

      completeWelcome: () => set({ showWelcome: false }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        hasJoinedChannel: state.hasJoinedChannel,
        showWelcome: state.showWelcome,
      }),
    }
  )
);
