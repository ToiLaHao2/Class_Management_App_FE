// src/features/users/types.ts
// TypeScript types cho Users domain (Admin management), đồng bộ với BE model

export interface AdminUser {
    id: string;
    email: string;
    fullName: string;
    role: 'student' | 'teacher' | 'admin';
    avatar?: string;
    createdAt: string;
    isDeleted: boolean;
    mustChangePassword?: boolean;
}

export interface UpdateUserRequest {
    fullName?: string;
    avatar?: string;
    role?: 'student' | 'teacher' | 'admin';
}

export interface CreateUserRequest {
    email: string;
    password: string;
    fullName: string;
    role: 'student' | 'teacher' | 'admin';
    avatar?: string;
}
