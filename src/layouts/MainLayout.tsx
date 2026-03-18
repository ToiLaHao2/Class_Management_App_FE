import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  BookOpen, 
  ClipboardList, 
  Bell, 
  User, 
  LayoutDashboard, 
  Calendar,
  MoreVertical,
  ShoppingBag
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const navByRole = (_role: string | undefined) => {
  // Demo Mode: Show Teacher tabs for everyone
  return [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/marketplace', label: 'Marketplace', icon: ShoppingBag },
    { to: '/classes', label: 'Lớp học', icon: BookOpen },
    { to: '/calendar', label: 'Lịch dạy', icon: Calendar },
    { to: '/materials', label: 'Học liệu', icon: ClipboardList },
    { to: '/notifications', label: 'Thông báo', icon: Bell },
    { to: '/profile', label: 'Hồ sơ', icon: User },
  ];
};

export const MainLayout = () => {
  const user = useAuthStore((s) => s.user);
  const location = useLocation();
  const navItems = navByRole(user?.role);

  return (
    <div className="min-h-screen bg-bg-app text-body font-sans selection:bg-primary/20">
      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar left */}
        <aside className="hidden md:flex md:flex-col md:w-64 border-r border-emerald-100/50 py-8 px-6 sticky top-0 h-screen overflow-y-auto no-scrollbar">
          <div className="flex items-center gap-3 mb-10 px-2 transition-transform hover:scale-[1.02]">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <BookOpen size={22} />
            </div>
            <div>
              <div className="font-bold text-heading text-lg leading-tight tracking-tight">Classify</div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-primary/70">
                {user?.role === 'teacher' ? 'Tutor Workstation' : 'Learning Space'}
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-200 group ${
                    isActive 
                      ? 'bg-primary text-white shadow-md shadow-primary/20' 
                      : 'hover:bg-emerald-50 text-body/80 hover:text-heading'
                  }`}
                >
                  <Icon size={18} className={`${isActive ? 'text-white' : 'text-primary/70 group-hover:text-primary'} transition-colors`} />
                  <span className="text-sm font-semibold tracking-wide">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {user && (
            <div className="mt-8 pt-6 border-t border-emerald-100/50">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/50 backdrop-blur-sm border border-emerald-100/50 hover:bg-white transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-100 to-white flex items-center justify-center text-sm font-bold text-primary border border-emerald-100 shadow-sm">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-heading text-[13px] truncate">{user.fullName}</div>
                  <div className="text-[11px] text-body/50 truncate font-medium capitalize">{user.role}</div>
                </div>
                <MoreVertical size={14} className="text-body/30 group-hover:text-body/60 transition-colors" />
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 py-8 px-6 md:px-8 max-w-5xl mx-auto w-full">
            <Outlet />
        </main>
      </div>
    </div>
  );
};

