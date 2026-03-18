import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCurrentUserApi, updateCurrentUserApi } from '../api';
import { useAuthStore } from '../../../stores/authStore';
import type { User } from '../types';

const CURRENT_USER_KEY = ['auth', 'me'];

export const useCurrentUser = () => {
    const queryClient = useQueryClient();
    const setUser = useAuthStore((s) => s.setUser);

    const query = useQuery<User, Error>({
        queryKey: CURRENT_USER_KEY,
        queryFn: getCurrentUserApi,
        staleTime: 5 * 60 * 1000,
    });

    const updateMutation = useMutation({
        mutationFn: (data: Partial<Pick<User, 'fullName' | 'avatar'>>) => updateCurrentUserApi(data),
        onSuccess: (user) => {
            setUser(user);
            queryClient.setQueryData(CURRENT_USER_KEY, user);
        },
    });

    if (query.data) {
        setUser(query.data);
    }

    return {
        data: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        updateProfile: updateMutation.mutate,
        updating: updateMutation.isPending,
    };
};

