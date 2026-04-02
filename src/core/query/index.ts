// src/core/query/index.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // Dữ liệu được coi là cũ sau 5 phút
            gcTime: 1000 * 60 * 10,   // Xóa khỏi bộ nhớ sau 10 phút nếu không dùng
            retry: 1,                 // Thử lại 1 lần nếu lỗi
            refetchOnWindowFocus: false, // Không tự load lại khi quay lại tab
        },
        mutations: {
            retry: 0, // Không tự thử lại khi submit form lỗi
        },
    },
});
