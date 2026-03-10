import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const httpClient = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor cho Request: Đính kèm Token
httpClient.interceptors.request.use(
    (config) => {
        // Ví dụ cách lấy token từ Zustand store, 
        // const token = useAuthStore.getState().token;
        // if (token && config.headers) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor cho Response: Xử lý lỗi toàn cục
httpClient.interceptors.response.use(
    (response) => {
        return response.data; // Trả về data luôn để ngắn gọn
    },
    (error) => {
        // Xử lý 401 Unauthorized toàn app (đẩy về trang login...)
        if (error.response?.status === 401) {
            console.warn('Unauthorized, redirecting to login...');
            // Code logout/redirect ở đây
        }
        return Promise.reject(error);
    }
);
