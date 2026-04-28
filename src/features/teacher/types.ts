// src/features/teacher/types.ts

export interface ClassSummary {
    id: string;
    name: string;
    description?: string;
    thumbnailUrl?: string; // Tạm thời dùng camelCase theo backend trả về (hoặc update map)
    studentCount: number;
    status: string;
    // Map theo db:
    thumbnail_url?: string;
    owner_id?: string;
    created_at?: string;
}

export interface CreateClassRequest {
    owner_id: string; // ID của teacher profile (lấy từ backend)
    name: string;
    description?: string;
    thumbnail_url?: string;
    status?: string; // Dùng UUID category status hoặc string thông thường
}

export interface ClassStudent {
    id: string;
    class_id: string;
    student_profile_id: string;
    enrollment_date: string;
    status?: string;
    // Tùy theo backend trả về có kèm info student không
    studentInfo?: {
        id: string;
        full_name: string;
        email: string;
    }
}
