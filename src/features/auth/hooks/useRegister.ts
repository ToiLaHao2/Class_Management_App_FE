// src/features/auth/hooks/useRegister.ts
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { registerApi } from '../api';
import type { RegisterRequest } from '../types';

export const useRegister = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: RegisterRequest) => registerApi(data),
        onSuccess: () => {
            navigate('/login');
        },
    });
};
