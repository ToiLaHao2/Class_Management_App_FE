import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ChangePasswordPage from '../pages/auth/ChangePasswordPage';
import ProfilePage from '../pages/auth/ProfilePage';
import { MainLayout } from '../layouts/MainLayout';
import * as Teacher from '../pages/teacher';

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        {/* Teacher Routes */}
                        <Route path="/" element={<Teacher.DashboardPage />} />
                        <Route path="/marketplace" element={<Teacher.MarketplacePage />} />
                        <Route path="/classes" element={<Teacher.ClassManagementPage />} />
                        <Route path="/calendar" element={<Teacher.CalendarPage />} />
                        <Route path="/materials" element={<Teacher.MaterialsPage />} />
                        
                        {/* Common Protected Routes */}
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/change-password" element={<ChangePasswordPage />} />
                        <Route path="/notifications" element={<div>Notifications Page</div>} />
                    </Route>
                </Route>

                {/* Redirect any unknown routes to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};
