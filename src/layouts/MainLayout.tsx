import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  BookOpen,
  ClipboardList,
  Bell,
  User,
  LayoutDashboard,
  Calendar,
  ShoppingBag,
  LogOut,
  Settings,
  Users,
  Database
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const navByRole = (role: string | undefined) => {
  if (role === 'teacher') {
    return [
      { to: '/', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/marketplace', label: 'Marketplace', icon: ShoppingBag },
      { to: '/classes', label: 'Lớp học', icon: BookOpen },
      { to: '/calendar', label: 'Lịch dạy', icon: Calendar },
      { to: '/materials', label: 'Học liệu', icon: ClipboardList },
      { to: '/notifications', label: 'Thông báo', icon: Bell },
      { to: '/profile', label: 'Hồ sơ', icon: User },
    ];
  }

  if (role === 'parent') {
    return [
      { to: '/', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/marketplace', label: 'Marketplace', icon: ShoppingBag },
      { to: '/kids', label: 'Con của tôi', icon: BookOpen },
      { to: '/finance', label: 'Học phí', icon: ClipboardList },
      { to: '/notifications', label: 'Thông báo', icon: Bell },
    ];
  }

  if (role === 'student') {
    return [
      { to: '/', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/marketplace', label: 'Marketplace', icon: ShoppingBag },
      { to: '/schedule', label: 'Lịch học', icon: Calendar },
      { to: '/my-classes', label: 'Lớp của tôi', icon: BookOpen },
      { to: '/assignments', label: 'Bài tập', icon: ClipboardList },
      { to: '/notifications', label: 'Thông báo', icon: Bell },
    ];
  }

  if (role === 'admin') {
    return [
      { to: '/', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/admin/users', label: 'Người dùng', icon: Users },
      { to: '/admin/resources', label: 'Hệ thống', icon: Database },
      { to: '/notifications', label: 'Thông báo', icon: Bell },
    ];
  }

  // Default
  return [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/notifications', label: 'Thông báo', icon: Bell },
  ];
};

export const MainLayout: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const effectiveRole = user?.role;
  const navItems = navByRole(effectiveRole);

  return (
    <div className="flex min-h-screen bg-bg-app font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-emerald-50 flex flex-col sticky top-0 h-screen overflow-y-auto no-scrollbar shadow-sm z-50">
        <div className="p-8 pb-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
              <span className="text-white font-black text-xl italic leading-none">C</span>
            </div>
            <div>
              <h1 className="text-xl font-black text-heading italic tracking-tighter leading-none">Classify</h1>
              <p className="text-[10px] font-bold text-body/40 uppercase tracking-[0.2em] mt-1 italic">
                {effectiveRole || 'Master'} HUB
              </p>
            </div>
          </Link>

          <nav className="mt-12 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${active
                      ? 'bg-primary text-white shadow-xl shadow-primary/20 translate-x-1'
                      : 'text-body/60 hover:bg-emerald-50 hover:text-primary'
                    }`}
                >
                  <Icon
                    size={20}
                    className={active ? 'text-white' : 'group-hover:scale-110 transition-transform'}
                  />
                  <span className="font-bold text-sm tracking-tight">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Footer Section */}
        {user && (
          <div className="mt-auto p-6 border-t border-emerald-50">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-primary font-black border border-emerald-100 shadow-sm">
                  {user.full_name?.charAt(0) || user.email?.charAt(0)}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-xs font-black text-heading truncate">{user.full_name || user.email}</span>
                  <span className="text-[10px] font-bold text-body/40 uppercase tracking-widest">{effectiveRole}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="p-2.5 rounded-xl bg-emerald-50 text-primary/60 hover:bg-emerald-100 transition-colors flex items-center justify-center">
                  <Settings size={16} />
                </button>
                <button onClick={() => logout()} className="p-2.5 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors flex items-center justify-center">
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto no-scrollbar relative">
        {/* Top Header Placeholder / Blur background */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-emerald-50/50 to-transparent -z-10" />
        <div className="p-8 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
