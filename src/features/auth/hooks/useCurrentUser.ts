import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCurrentUserApi, updateCurrentUserApi } from '../api';
import { useAuthStore } from '../../../stores/authStore';
import type { User } from '../types';

export const CURRENT_USER_KEY = ['auth', 'me'];

/**
 * Hook quản lý thông tin user đang đăng nhập.
 * - TanStack Query: fetch + cache từ server (/auth/me), auto-refetch khi stale
 * - Zustand authStore: được đồng bộ mỗi khi query data thay đổi (qua useEffect)
 * - Đây là nguồn sự thật duy nhất cho user data — không dùng authStore.user để render UI
 */
export const useCurrentUser = () => {
    const queryClient = useQueryClient();
    const setUser = useAuthStore((s) => s.setUser);

    const query = useQuery<User, Error>({
        queryKey: CURRENT_USER_KEY,
        queryFn: getCurrentUserApi,
        staleTime: 5 * 60 * 1000, // Cache 5 phút
        retry: 1,
    });

    // Đồng bộ authStore khi query data thay đổi (KHÔNG gọi trong render body)
    useEffect(() => {
        if (query.data) {
            setUser(query.data);
        }
    }, [query.data, setUser]);

    const updateMutation = useMutation({
        mutationFn: (data: Partial<Pick<User, 'full_name' | 'avatar'>>) =>
            updateCurrentUserApi(data),
        onSuccess: (updatedUser) => {
            // Cập nhật cả cache TanStack và Zustand store đồng thời
            queryClient.setQueryData(CURRENT_USER_KEY, updatedUser);
            setUser(updatedUser);
        },
    });

    return {
        data: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        updateProfile: updateMutation.mutate,
        updating: updateMutation.isPending,
    };
};
