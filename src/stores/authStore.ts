// src/stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../features/auth/types';

interface AuthState {
    user: User | null;
    token: string | null;
    demoRole: string | null;
    setAuth: (user: User, token: string) => void;
    setUser: (user: User | null) => void;
    setDemoRole: (role: string | null) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            demoRole: null,
            setAuth: (user, token) => set({ user, token }),
            setUser: (user) => set({ user }),
            setDemoRole: (demoRole) => set({ demoRole }),
            logout: () => set({ user: null, token: null, demoRole: null }),
        }),
        {
            name: 'cma-auth-storage',
            partialize: (state) => ({ token: state.token, user: state.user }),
        }
    )
);
