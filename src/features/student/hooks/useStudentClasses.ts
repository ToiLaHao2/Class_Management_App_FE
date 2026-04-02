// src/features/student/hooks/useStudentClasses.ts
import { useQuery } from '@tanstack/react-query';
import { getEnrolledClassesApi } from '../api';

export const useStudentClasses = () => {
    return useQuery({
        queryKey: ['student', 'enrolled-classes'],
        queryFn: getEnrolledClassesApi,
        staleTime: 1000 * 60 * 10, // Cache trong 10 phút
    });
};
