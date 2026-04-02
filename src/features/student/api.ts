// src/features/student/api.ts
import { httpClient } from '../../core/http';

export interface EnrolledClass {
    id: string;
    name: string;
    description?: string;
    thumbnailUrl?: string;
    enrollment_status: string;
    owner_id: string;
}

export const getEnrolledClassesApi = (): Promise<EnrolledClass[]> => {
    return httpClient.get('/classes/enrolled');
};
