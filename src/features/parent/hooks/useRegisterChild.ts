// src/features/parent/hooks/useRegisterChild.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerChildApi } from '../../auth/api';

export const useRegisterChild = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { username: string, full_name: string }) => registerChildApi(data),
        onSuccess: () => {
            // Sau khi tạo xong, có thể làm mới danh sách học sinh của phụ huynh
            queryClient.invalidateQueries({ queryKey: ['parent', 'children'] });
        },
    });
};
