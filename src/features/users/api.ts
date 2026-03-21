// src/features/users/api.ts
// API calls cho Users domain (Admin management)

import { httpClient } from '../../core/http';
import type { AdminUser, UpdateUserRequest, CreateUserRequest } from './types';

/** Lấy danh sách tất cả users (Admin only) */
export const getUsersApi = (): Promise<AdminUser[]> => {
    return httpClient.get('/users');
};

/** Lấy chi tiết user theo ID */
export const getUserByIdApi = (userId: string): Promise<AdminUser> => {
    return httpClient.get(`/users/${userId}`);
};

/** Tạo user mới */
export const createUserApi = (data: CreateUserRequest): Promise<AdminUser> => {
    return httpClient.post('/users', data);
};

/** Cập nhật user (Admin) */
export const updateUserApi = (userId: string, data: UpdateUserRequest): Promise<AdminUser> => {
    return httpClient.put(`/users/${userId}`, data);
};

/** Soft-delete user (Admin) */
export const deleteUserApi = (userId: string): Promise<{ message: string }> => {
    return httpClient.delete(`/users/${userId}`);
};
