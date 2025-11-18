import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminUser {
  telegram_id: string;
  username: string;
  is_admin: boolean;
}

interface AdminStore {
  adminUser: AdminUser | null;
  isAdminAuthenticated: boolean;
  setAdminUser: (user: AdminUser | null) => void;
  logout: () => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      adminUser: null,
      isAdminAuthenticated: false,
      setAdminUser: (user) => set({ 
        adminUser: user, 
        isAdminAuthenticated: !!user && user.is_admin 
      }),
      logout: () => set({ adminUser: null, isAdminAuthenticated: false }),
    }),
    {
      name: 'admin-storage',
    }
  )
);
