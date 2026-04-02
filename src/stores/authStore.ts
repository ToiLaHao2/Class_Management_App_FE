// src/stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../features/auth/types';
import { getCurrentUserApi } from '../features/auth/api';

interface AuthState {
    user: User | null;
    token: string | null;
    isInitialized: boolean;
    setAuth: (user: User, token: string) => void;
    setUser: (user: User | null) => void;
    logout: () => void;
    initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isInitialized: false,
            setAuth: (user, token) => set({ user, token, isInitialized: true }),
            setUser: (user) => set({ user }),
            logout: () => set({ user: null, token: null, isInitialized: false }),
            initialize: async () => {
                const token = get().token;
                if (!token) {
                    set({ isInitialized: true });
                    return;
                }

                try {
                    const user = await getCurrentUserApi();
                    set({ user, isInitialized: true });
                } catch (error) {
                    console.error('Failed to initialize auth:', error);
                    // Nếu lỗi do Token hết hạn (401 handled by interceptor)
                    // Hoặc server down, chúng ta vẫn set isInitialized = true để App render
                    set({ isInitialized: true });
                }
            },
        }),
        {
            name: 'cma-auth-storage',
            partialize: (state) => ({ token: state.token, user: state.user }),
        }
    )
);
