import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ChangePasswordPage from '../pages/auth/ChangePasswordPage';
import { MainLayout } from '../layouts/MainLayout';
import * as Teacher from '../pages/teacher';
import * as Parent from '../pages/parent';
import MarketplacePage from '../pages/MarketplacePage';
import { useAuthStore } from '../stores/authStore';

import * as Student from '../pages/student';

const HomeRoute = () => {
    const { user, demoRole } = useAuthStore();
    const role = demoRole || user?.role;
    
    if (role === 'student') return <Student.DashboardPage />;
    if (role === 'parent') return <Parent.DashboardPage />;
    return <Teacher.DashboardPage />;
};

const MarketplaceRoute = () => {
    return <MarketplacePage />;
};

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
                        {/* Dynamic Home Route */}
                        <Route path="/" element={<HomeRoute />} />
                        
                        {/* Teacher Specific Routes */}
                        <Route path="/classes" element={<Teacher.ClassManagementPage />} />
                        <Route path="/calendar" element={<Teacher.CalendarPage />} />
                        <Route path="/materials" element={<Teacher.MaterialsPage />} />
                        
                        {/* Parent Specific Routes */}
                        <Route path="/kids" element={<Parent.KidsManagementPage />} />
                        <Route path="/finance" element={<Parent.FinancePage />} />

                        {/* Common Protected Routes */}
                        <Route path="/marketplace" element={<MarketplaceRoute />} />
                        <Route path="/profile" element={<Teacher.ProfilePage />} />
                        <Route path="/change-password" element={<ChangePasswordPage />} />
                        {/* Student Routes */}
                    <Route path="/schedule" element={<Student.SchedulePage />} />
                    <Route path="/my-classes" element={<Student.MyClassesPage />} />
                    <Route path="/assignments" element={<Student.AssignmentsPage />} />

                    <Route path="/notifications" element={<div className="p-8">Notifications Under Construction</div>} />
                    </Route>
                </Route>

                {/* Redirect any unknown routes to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};
