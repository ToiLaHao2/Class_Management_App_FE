// src/stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '../core/config/constants';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    // Các field khác
}

interface AuthState {
    user: User | null;
    token: string | null;
    setAuth: (user: User, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            setAuth: (user, token) => set({ user, token }),
            logout: () => set({ user: null, token: null }),
        }),
        {
            name: 'cma-auth-storage', // Lưu state vào localStorage để persist đăng nhập
            partialize: (state) => ({ token: state.token, user: state.user }),
        }
    )
);
