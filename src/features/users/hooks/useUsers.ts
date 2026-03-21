// src/features/users/hooks/useUsers.ts
// React Query hooks cho Users management

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsersApi, updateUserApi, deleteUserApi } from '../api';
import type { UpdateUserRequest } from '../types';

const USERS_QUERY_KEY = ['admin', 'users'];

/** Hook lấy danh sách tất cả users */
export const useUsers = () => {
    return useQuery({
        queryKey: USERS_QUERY_KEY,
        queryFn: getUsersApi,
    });
};

/** Hook cập nhật user (Admin) */
export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, data }: { userId: string; data: UpdateUserRequest }) =>
            updateUserApi(userId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
        },
    });
};

/** Hook xóa (soft-delete) user (Admin) */
export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId: string) => deleteUserApi(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
        },
    });
};
