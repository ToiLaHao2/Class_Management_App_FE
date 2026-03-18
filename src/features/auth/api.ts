// src/features/auth/api.ts
// Các hàm gọi API cho Auth domain

import { httpClient } from '../../core/http';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from './types';

export const loginApi = (data: LoginRequest): Promise<LoginResponse> => {
    return httpClient.post('/auth/login', data);
};

export const registerApi = (data: RegisterRequest): Promise<RegisterResponse> => {
    return httpClient.post('/auth/register', data);
};
