// src/features/teacher/hooks/useTeacherClasses.ts
import { useQuery } from '@tanstack/react-query';
import { getTeacherClassesApi } from '../api';

export const useTeacherClasses = () => {
    return useQuery({
        queryKey: ['teacher', 'classes'],
        queryFn: getTeacherClassesApi,
        staleTime: 1000 * 60 * 5, // Cache trong 5 phút
    });
};
