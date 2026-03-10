// src/types/index.ts
// Nơi định nghĩa và export TypeScript Types/Interfaces dùng chung toàn ứng dụng

export interface CommonResponse<T> {
    success: boolean;
    message?: string;
    data: T;
}

export interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}
