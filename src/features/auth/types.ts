// src/features/auth/types.ts
// TypeScript types cho Auth domain, đồng bộ với BE model

export interface User {
    id: string;
    email: string;
    fullName: string;
    role: 'student' | 'teacher' | 'admin' | 'parent';
    avatar?: string;
    createdAt: string;
    mustChangePassword?: boolean;
}

// --- Login ---
export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    user: User;
}

// --- Register ---
export interface RegisterRequest {
    email: string;
    password: string;
    fullName: string;
    role: 'student' | 'teacher' | 'parent';
    avatar?: string;
}

export interface RegisterResponse {
    message: string;
    user: User;
}

// --- Change password ---
export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

export interface ChangePasswordResponse {
    message: string;
}
