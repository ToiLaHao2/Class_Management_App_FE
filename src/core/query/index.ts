import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Tắt tự fetch lại khi chuyển tab
      retry: 1, // Thử lại 1 lần nếu lỗi API
      staleTime: 5 * 60 * 1000, // 5 phút mới coi là stale (cũ)
    },
  },
});
