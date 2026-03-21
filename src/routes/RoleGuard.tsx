// src/routes/RoleGuard.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

interface RoleGuardProps {
    allowedRoles: string[];
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles }) => {
    const { user } = useAuthStore();
    const role = user?.role;

    // If no user is logged in, ProtectedRoute should have handled this, 
    // but as a fallback/secondary check:
    if (!role) {
        return <Navigate to="/login" replace />;
    }

    // Check if the role is in the list of allowed roles
    const isAuthorized = allowedRoles.includes(role);

    if (!isAuthorized) {
        // Redirect to dashboard if unauthorized
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
