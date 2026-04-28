// src/features/profiles/api.ts
// API calls cho Profiles domain

import { httpClient } from '../../core/http';
import type {
    TeacherProfile,
    StudentProfile,
    ParentProfile,
    UpdateTeacherProfileRequest,
    UpdateStudentProfileRequest,
} from './types';

type MyProfile = TeacherProfile | StudentProfile | ParentProfile | null;

/** Lấy profile của user đang đăng nhập (tự phân role ở BE) */
export const getMyProfileApi = (): Promise<MyProfile> =>
    httpClient.get('/profiles/me');

/** Cập nhật profile của user đang đăng nhập */
export const updateMyProfileApi = (
    data: UpdateTeacherProfileRequest | UpdateStudentProfileRequest
): Promise<MyProfile> =>
    httpClient.put('/profiles/me', data);

/** Lấy profile giáo viên theo userId */
export const getTeacherProfileApi = (userId: string): Promise<TeacherProfile | null> =>
    httpClient.get(`/profiles/teacher/${userId}`);

/** Lấy profile học sinh theo userId */
export const getStudentProfileApi = (userId: string): Promise<StudentProfile | null> =>
    httpClient.get(`/profiles/student/${userId}`);
