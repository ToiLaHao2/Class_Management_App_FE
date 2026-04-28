import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTeacherClassesApi, createClassApi, getClassDetailsApi, getClassStudentsApi } from '../api';
import type { CreateClassRequest } from '../types';

export const CLASS_KEYS = {
    all: ['teacher', 'classes'] as const,
    list: (ownerId?: string) => ['teacher', 'classes', ownerId] as const,
    details: (classId: string) => ['teacher', 'class', classId] as const,
    students: (classId: string) => ['teacher', 'class', classId, 'students'] as const,
};

export const useTeacherClasses = (ownerId?: string) => {
    return useQuery({
        queryKey: CLASS_KEYS.list(ownerId),
        queryFn: () => getTeacherClassesApi(ownerId),
        staleTime: 1000 * 60 * 5, // Cache trong 5 phút
    });
};

export const useClassDetails = (classId: string) => {
    return useQuery({
        queryKey: CLASS_KEYS.details(classId),
        queryFn: () => getClassDetailsApi(classId),
        enabled: !!classId,
    });
};

export const useClassStudents = (classId: string) => {
    return useQuery({
        queryKey: CLASS_KEYS.students(classId),
        queryFn: () => getClassStudentsApi(classId),
        enabled: !!classId,
    });
};

export const useCreateClass = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateClassRequest) => createClassApi(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CLASS_KEYS.all });
        },
    });
};
