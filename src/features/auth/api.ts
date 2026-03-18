// src/features/auth/api.ts
// Các hàm gọi API cho Auth domain

import { httpClient } from '../../core/http';
import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    ChangePasswordRequest,
    ChangePasswordResponse,
    User,
} from './types';

export const loginApi = (data: LoginRequest): Promise<LoginResponse> => {
    return httpClient.post('/auth/login', data);
};

export const registerApi = (data: RegisterRequest): Promise<RegisterResponse> => {
    return httpClient.post('/auth/register', data);
};

export const changePasswordApi = (data: ChangePasswordRequest): Promise<ChangePasswordResponse> => {
    return httpClient.post('/auth/change-password', data);
};

export const getCurrentUserApi = (): Promise<User> => {
    return httpClient.get('/auth/me');
};

export const updateCurrentUserApi = (data: Partial<Pick<User, 'fullName' | 'avatar'>>): Promise<User> => {
    return httpClient.put('/auth/me', data);
};
