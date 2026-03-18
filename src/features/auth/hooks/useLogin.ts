// src/features/auth/hooks/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../api';
import { useAuthStore } from '../../../stores/authStore';
import type { LoginRequest } from '../types';

export const useLogin = () => {
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation({
        mutationFn: (data: LoginRequest) => loginApi(data),
        onSuccess: (response) => {
            setAuth(response.user, response.accessToken);
            navigate('/');
        },
    });
};
