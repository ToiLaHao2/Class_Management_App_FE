import { httpClient } from '../../core/http';
import type { ClassSummary, CreateClassRequest, ClassStudent } from './types';

// Lấy danh sách lớp học của giáo viên hiện tại (dùng query param owner_id)
export const getTeacherClassesApi = (ownerId?: string): Promise<ClassSummary[]> => {
    return httpClient.get(`/classes${ownerId ? `?owner_id=${ownerId}` : ''}`);
};

// Lấy chi tiết lớp học
export const getClassDetailsApi = (classId: string): Promise<ClassSummary> => {
    return httpClient.get(`/classes/${classId}`);
};

// Tạo lớp học mới
export const createClassApi = (data: CreateClassRequest): Promise<ClassSummary> => {
    return httpClient.post('/classes', data);
};

// Lấy danh sách học sinh trong lớp
export const getClassStudentsApi = (classId: string): Promise<ClassStudent[]> => {
    return httpClient.get(`/classes/${classId}/students`);
};
