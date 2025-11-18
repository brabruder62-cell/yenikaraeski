// Telegram Web App Mock/Interface
// This provides a simplified interface for Telegram Mini App functionality

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
}

interface TelegramWebApp {
  initDataUnsafe: {
    user?: TelegramUser;
    auth_date?: number;
    hash?: string;
  };
  ready: () => void;
  expand: () => void;
  close: () => void;
  MainButton: {
    text: string;
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
  };
  BackButton: {
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
  };
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy') => void;
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
    selectionChanged: () => void;
  };
}

// Check if running in Telegram
export const isTelegramWebApp = (): boolean => {
  return typeof window !== 'undefined' && !!(window as any).Telegram?.WebApp;
};

// Get Telegram WebApp instance
export const getTelegramWebApp = (): TelegramWebApp | null => {
  if (isTelegramWebApp()) {
    return (window as any).Telegram.WebApp;
  }
  return null;
};

// Initialize Telegram WebApp
export const initTelegramWebApp = (): TelegramWebApp | null => {
  const webapp = getTelegramWebApp();
  if (webapp) {
    webapp.ready();
    webapp.expand();
  }
  return webapp;
};

// Get Telegram user data
export const getTelegramUser = (): TelegramUser | null => {
  const webapp = getTelegramWebApp();
  return webapp?.initDataUnsafe?.user || null;
};

// Haptic feedback helpers
export const triggerHaptic = (style: 'light' | 'medium' | 'heavy' = 'medium') => {
  const webapp = getTelegramWebApp();
  webapp?.HapticFeedback?.impactOccurred(style);
};

export const triggerNotification = (type: 'error' | 'success' | 'warning') => {
  const webapp = getTelegramWebApp();
  webapp?.HapticFeedback?.notificationOccurred(type);
};

// Mock user for development (when not in Telegram)
export const getMockUser = (): TelegramUser => {
  return {
    id: 123456789,
    first_name: 'Test',
    last_name: 'User',
    username: 'testuser',
    language_code: 'tr',
  };
};

// Get user (real or mock)
export const getUser = (): TelegramUser => {
  const telegramUser = getTelegramUser();
  return telegramUser || getMockUser();
};
