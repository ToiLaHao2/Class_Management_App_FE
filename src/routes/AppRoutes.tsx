import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleGuard } from './RoleGuard';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ChangePasswordPage from '../pages/auth/ChangePasswordPage';
import { MainLayout } from '../layouts/MainLayout';
import * as Teacher from '../pages/teacher';
import * as Parent from '../pages/parent';
import MarketplacePage from '../pages/MarketplacePage';
import { useAuthStore } from '../stores/authStore';

import * as Student from '../pages/student';
import * as Admin from '../pages/admin';

const HomeRoute = () => {
    const { user } = useAuthStore();
    const role = user?.role;

    if (role === 'admin') return <Admin.DashboardPage />;
    if (role === 'student') return <Student.DashboardPage />;
    if (role === 'parent') return <Parent.DashboardPage />;
    return <Teacher.DashboardPage />;
};

const MarketplaceRoute = () => {
    return <MarketplacePage />;
};

import RegisterChildPage from '../features/parent/pages/RegisterChildPage';

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
                        <Route element={<RoleGuard allowedRoles={['teacher', 'admin']} />}>
                            <Route path="/classes" element={<Teacher.ClassManagementPage />} />
                            <Route path="/classes/:id" element={<Teacher.ClassDetailsPage />} />
                            <Route path="/calendar" element={<Teacher.CalendarPage />} />
                            <Route path="/materials" element={<Teacher.MaterialsPage />} />
                        </Route>

                        {/* Parent Specific Routes */}
                        <Route element={<RoleGuard allowedRoles={['parent', 'admin']} />}>
                            <Route path="/kids" element={<Parent.KidsManagementPage />} />
                            <Route path="/parent/register-child" element={<RegisterChildPage />} />
                            <Route path="/finance" element={<Parent.FinancePage />} />
                        </Route>

                        {/* Student Routes */}
                        <Route element={<RoleGuard allowedRoles={['student', 'admin']} />}>
                            <Route path="/schedule" element={<Student.SchedulePage />} />
                            <Route path="/my-classes" element={<Student.MyClassesPage />} />
                            <Route path="/assignments" element={<Student.AssignmentsPage />} />
                        </Route>

                        {/* Admin Specific Routes */}
                        <Route element={<RoleGuard allowedRoles={['admin']} />}>
                            <Route path="/admin/users" element={<Admin.UserManagementPage />} />
                            <Route path="/admin/resources" element={<Admin.ResourcesPage />} />
                        </Route>

                        {/* Common Protected Routes */}
                        <Route path="/marketplace" element={<MarketplaceRoute />} />
                        <Route path="/profile" element={<Teacher.ProfilePage />} />
                        <Route path="/change-password" element={<ChangePasswordPage />} />

                        <Route path="/notifications" element={<div className="p-8">Notifications Under Construction</div>} />
                    </Route>
                </Route>

                {/* Redirect any unknown routes to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};
