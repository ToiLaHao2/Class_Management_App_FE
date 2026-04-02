// src/features/teacher/api.ts
import { httpClient } from '../../core/http';

export interface ClassSummary {
    id: string;
    name: string;
    description?: string;
    thumbnailUrl?: string;
    studentCount: number;
    status: string;
}

export const getTeacherClassesApi = (): Promise<ClassSummary[]> => {
    // API từ Phase 3: GET /classes
    return httpClient.get('/classes');
};
