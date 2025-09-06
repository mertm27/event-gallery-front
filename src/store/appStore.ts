import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState, Toast } from '../types';

const NICKNAME_STORAGE_KEY = 'wedding-photos-nickname';

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      nickname: null,
      setNickname: (nickname: string) => {
        set({ nickname });
        localStorage.setItem(NICKNAME_STORAGE_KEY, nickname);
      },
      clearNickname: () => {
        set({ nickname: null });
        localStorage.removeItem(NICKNAME_STORAGE_KEY);
      },
      toasts: [],
      addToast: (toast: Omit<Toast, 'id'>) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newToast: Toast = {
          ...toast,
          id,
          duration: toast.duration || 5000,
        };
        
        set(state => ({
          toasts: [...state.toasts, newToast],
        }));
        
        // Auto-remove toast after duration
        if (newToast.duration > 0) {
          setTimeout(() => {
            get().removeToast(id);
          }, newToast.duration);
        }
      },
      removeToast: (id: string) => {
        set(state => ({
          toasts: state.toasts.filter(toast => toast.id !== id),
        }));
      },
    }),
    {
      name: 'wedding-photos-app',
      partialize: (state) => ({ nickname: state.nickname }),
    }
  )
);
