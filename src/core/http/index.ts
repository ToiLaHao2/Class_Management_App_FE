// src/core/http/index.ts
import axios from 'axios';
import { useAuthStore } from '../../stores/authStore';
import { ENV } from '../config/env';

export const httpClient = axios.create({
    baseURL: ENV.API_URL,
    timeout: 30000, // Tăng timeout lên 30s cho các tác vụ upload/ai sau này
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor cho Request: Đính kèm Token từ Zustand Store
httpClient.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor cho Response: Đồng bộ dữ liệu và xử lý lỗi Unauthorized
httpClient.interceptors.response.use(
    (response) => {
        // TSOA/Express trả về data trực tiếp, chúng ta bóc tách luôn ở đây
        return response.data;
    },
    (error) => {
        // Xử lý lỗi 401 (Hết hạn Token hoặc Token không hợp lệ)
        if (error.response?.status === 401) {
            const url = error.config?.url || '';
            const isLoginRequest = url.includes('/auth/login');

            // Nếu không phải đang login mà bị 401 thì mới logout
            if (!isLoginRequest) {
                console.warn('⚠️ Token expired or invalid. Logging out...');
                useAuthStore.getState().logout();
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);
