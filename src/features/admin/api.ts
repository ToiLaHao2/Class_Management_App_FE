// src/features/admin/api.ts
import { httpClient } from '../../core/http';
import type { AdminDashboardStats, SystemHealth } from './types';

/** Get Admin Dashboard Stats */
export const getAdminStatsApi = (): Promise<AdminDashboardStats> => {
    return httpClient.get('/admin/stats');
};

/** Get System Health Stats */
export const getSystemHealthApi = (): Promise<SystemHealth> => {
    return httpClient.get('/admin/health');
};
