// src/features/profiles/hooks/useProfile.ts
// TanStack Query hooks cho Profiles domain

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getMyProfileApi,
    updateMyProfileApi,
    getTeacherProfileApi,
    getStudentProfileApi,
} from '../api';
import type {
    TeacherProfile,
    StudentProfile,
    UpdateTeacherProfileRequest,
    UpdateStudentProfileRequest,
} from '../types';

// === Query Keys (centralized để invalidation nhất quán) ===
export const PROFILE_KEYS = {
    me: ['profile', 'me'] as const,
    teacher: (userId: string) => ['profile', 'teacher', userId] as const,
    student: (userId: string) => ['profile', 'student', userId] as const,
};

/**
 * Hook lấy profile của user đang đăng nhập.
 * Tự động phân role ở BE: Teacher → TeacherProfile, Student → StudentProfile, v.v.
 */
export const useMyProfile = <T = TeacherProfile | StudentProfile | null>() => {
    return useQuery<T>({
        queryKey: PROFILE_KEYS.me,
        queryFn: getMyProfileApi as () => Promise<T>,
        staleTime: 5 * 60 * 1000, // Cache 5 phút
        retry: 1,
    });
};

/**
 * Hook cập nhật profile của user đang đăng nhập.
 * Tự invalidate cache sau khi update thành công.
 */
export const useUpdateMyProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: UpdateTeacherProfileRequest | UpdateStudentProfileRequest) =>
            updateMyProfileApi(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PROFILE_KEYS.me });
        },
    });
};

/**
 * Hook lấy profile Teacher theo userId (dùng cho Admin hoặc xem trang công khai).
 */
export const useTeacherProfile = (userId: string) => {
    return useQuery<TeacherProfile | null>({
        queryKey: PROFILE_KEYS.teacher(userId),
        queryFn: () => getTeacherProfileApi(userId),
        enabled: !!userId,
        staleTime: 5 * 60 * 1000,
    });
};

/**
 * Hook lấy profile Student theo userId (dùng cho Teacher hoặc Parent xem).
 */
export const useStudentProfile = (userId: string) => {
    return useQuery<StudentProfile | null>({
        queryKey: PROFILE_KEYS.student(userId),
        queryFn: () => getStudentProfileApi(userId),
        enabled: !!userId,
        staleTime: 5 * 60 * 1000,
    });
};
