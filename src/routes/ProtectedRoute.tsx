// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export const ProtectedRoute = () => {
    const token = useAuthStore((state) => state.token);

    if (!token) {
        // Nếu chưa đăng nhập, đá về /login
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};
