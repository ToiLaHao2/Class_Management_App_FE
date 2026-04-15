// src/features/users/types.ts
// TypeScript types cho Users domain (Admin management), đồng bộ với BE model

export interface AdminUser {
    id: string;
    email: string;
    username: string;
    full_name: string;
    role: 'student' | 'teacher' | 'admin' | 'parent';
    avatar_url?: string;
    created_at: string;
    is_active: boolean;
}

export interface UpdateUserRequest {
    full_name?: string;
    avatar_url?: string;
    role?: 'student' | 'teacher' | 'admin' | 'parent';
    is_active?: boolean;
}

export interface CreateUserRequest {
    email?: string;
    username: string;
    password?: string;
    full_name: string;
    role: 'student' | 'teacher' | 'admin' | 'parent';
    avatar_url?: string;
}
