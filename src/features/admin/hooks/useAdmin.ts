// src/features/admin/hooks/useAdmin.ts
import { useQuery } from '@tanstack/react-query';
import { getAdminStatsApi, getSystemHealthApi } from '../api';

export const useAdminStats = () => {
    return useQuery({
        queryKey: ['admin', 'stats'],
        queryFn: getAdminStatsApi,
        refetchInterval: 30000, // Refetch every 30s
    });
};

export const useSystemHealth = () => {
    return useQuery({
        queryKey: ['admin', 'health'],
        queryFn: getSystemHealthApi,
        refetchInterval: 60000, // Refetch every 60s
    });
};
