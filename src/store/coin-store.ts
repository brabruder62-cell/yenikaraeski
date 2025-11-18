import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CoinState {
  balance: number;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  setBalance: (amount: number) => void;
}

export const useCoinStore = create<CoinState>()(
  persist(
    (set, get) => ({
      balance: 0,

      addCoins: (amount: number) => {
        set((state) => ({ balance: state.balance + amount }));
      },

      spendCoins: (amount: number) => {
        const { balance } = get();
        if (balance >= amount) {
          set({ balance: balance - amount });
          return true;
        }
        return false;
      },

      setBalance: (amount: number) => {
        set({ balance: amount });
      },
    }),
    {
      name: 'coin-storage',
    }
  )
);
