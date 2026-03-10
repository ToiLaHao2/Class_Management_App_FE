// src/core/config/env.ts
// Tập trung quản lý và validate các biến môi trường
export const ENV = {
    API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    SOCKET_URL: import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000',
    ENV_MODE: import.meta.env.MODE, // 'development' | 'production'
};
