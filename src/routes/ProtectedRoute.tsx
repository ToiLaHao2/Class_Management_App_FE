// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export const ProtectedRoute = () => {
    const token = useAuthStore((state) => state.token);
    const user = useAuthStore((state) => state.user);

    if (!token) {
        // Nếu chưa đăng nhập, đá về /login
        return <Navigate to="/login" replace />;
    }

    if (user?.mustChangePassword && window.location.pathname !== '/change-password') {
        return <Navigate to="/change-password" replace />;
    }

    return <Outlet />;
};
