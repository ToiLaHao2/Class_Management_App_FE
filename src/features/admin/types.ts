// src/features/admin/types.ts

export interface RoleDistribution {
    label: string;
    count: number;
    percentage: number;
    color: string;
}

export interface AdminDashboardStats {
    totalUsers: number;
    roleDistribution: RoleDistribution[];
    recentGrowth: string;
}

export interface SystemHealth {
    services: {
        name: string;
        status: 'healthy' | 'warning' | 'error';
        latency: string;
    }[];
    uptime: string;
}
