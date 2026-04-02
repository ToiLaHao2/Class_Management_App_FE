// src/features/auth/types.ts
// TypeScript types cho Auth domain, đồng bộ với BE model

export interface User {
    id: string;
    email?: string; // Optional cho học viên nhỏ tuổi
    username: string; // Tên đăng nhập
    full_name: string;
    role: 'student' | 'teacher' | 'admin' | 'parent';
    avatar?: string;
    createdAt: string;
    mustChangePassword?: boolean;
}

// --- Login ---
export interface LoginRequest {
    identifier: string; // Email hoặc Username
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    user: User;
}

export interface RegisterRequest {
    email: string;
    username: string; // Tên đăng nhập
    password: string;
    full_name: string;
    role: 'student' | 'teacher' | 'parent';
    avatar?: string;
    // Profile extra fields
    bio?: string;
    school?: string;
    grade?: string;
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
