import React from 'react';
import {
  Search,
  Filter,
  MoreHorizontal,
  UserPlus,
  ShieldCheck,
  ShieldAlert,
  ChevronRight,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { GlassCard } from '../../shared/components/GlassCard';
import { StatusBadge } from '../../shared/components/StatusBadge';
import { useUsers, useDeleteUser, useUpdateUser } from '../../features/users';
import type { AdminUser } from '../../features/users';

export const UserManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');

  const { data: users, isLoading, isError, error } = useUsers();
  const deleteUserMutation = useDeleteUser();
  const updateUserMutation = useUpdateUser();

  // Client-side filtering
  const filteredUsers = React.useMemo(() => {
    if (!users) return [];
    let result = users;

    // Filter by role tab
    if (activeTab !== 'all') {
      result = result.filter(u => u.role === activeTab);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(u =>
        u.full_name?.toLowerCase().includes(q) ||
        u.username?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q)
      );
    }

    return result;
  }, [users, activeTab, searchQuery]);

  const handleBanUser = (userId: string) => {
    if (confirm('Bạn có chắc muốn vô hiệu hóa tài khoản này?')) {
      deleteUserMutation.mutate(userId);
    }
  };

  const handleUnbanUser = (userId: string) => {
    if (confirm('Bạn có chắc muốn mở khóa tài khoản này?')) {
      updateUserMutation.mutate({ userId, data: { is_active: true } });
    }
  };

  const handleRoleChange = (userId: string, newRole: 'student' | 'teacher' | 'admin' | 'parent') => {
    updateUserMutation.mutate({ userId, data: { role: newRole } });
  };

  const getStatusInfo = (user: AdminUser) => {
    if (!user.is_active) return { label: 'Banned', variant: 'rose' as const, icon: ShieldAlert };
    return { label: 'Active', variant: 'primary' as const, icon: ShieldCheck };
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-heading italic tracking-tighter">Quản lý người dùng</h1>
          <p className="text-xs font-bold text-body/40 uppercase tracking-widest">
            {isLoading ? 'Đang tải...' : `Toàn bộ ${users?.length || 0} người dùng trên nền tảng`}
          </p>
        </div>

        <div className="flex gap-2 p-1 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 w-fit">
          {['all', 'teacher', 'student', 'parent', 'admin'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab
                  ? 'bg-white text-primary shadow-sm ring-1 ring-emerald-100'
                  : 'text-body/40 hover:text-primary'
                }`}
            >
              {tab === 'all' ? 'Tất cả' : tab}
            </button>
          ))}
        </div>
      </header>

      {/* Search & Bulk Actions */}
      <GlassCard variant="white" noPadding className="flex items-center gap-3 px-6 py-4 border-emerald-100/30">
        <Search size={20} className="text-body/30" />
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, email hoặc ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent border-none focus:outline-none text-sm font-bold"
        />
        <div className="h-6 w-px bg-emerald-100 mx-2" />
        <button className="flex items-center gap-2 p-2 hover:bg-emerald-50 rounded-xl transition-colors text-primary font-black text-[10px] uppercase tracking-widest">
          <Filter size={16} /> Lọc nâng cao
        </button>
      </GlassCard>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 size={40} className="text-primary animate-spin" />
          <p className="text-sm font-bold text-body/40">Đang tải danh sách người dùng...</p>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <GlassCard variant="white" className="flex items-center gap-4 border-rose-100 bg-rose-50/20">
          <AlertCircle size={24} className="text-rose-500" />
          <div>
            <h4 className="font-black text-heading">Không thể tải dữ liệu</h4>
            <p className="text-xs text-body/60">{(error as Error)?.message || 'Đã xảy ra lỗi khi kết nối server.'}</p>
          </div>
        </GlassCard>
      )}

      {/* Users List */}
      {!isLoading && !isError && (
        <div className="space-y-4">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-sm font-bold text-body/30">Không tìm thấy người dùng nào.</p>
            </div>
          ) : (
            filteredUsers.map((user) => {
              const status = getStatusInfo(user);
              const StatusIcon = status.icon;
              return (
                <GlassCard key={user.id} variant="white" className="group hover:border-primary/20 transition-all cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg border-2 border-emerald-50 ${!user.is_active ? 'bg-rose-50 text-rose-300' : 'bg-emerald-50 text-primary'
                        }`}>
                        {user.avatar_url ? (
                          <img src={user.avatar_url} alt={user.username} className="w-full h-full rounded-2xl object-cover" />
                        ) : (
                          user.full_name?.charAt(0).toUpperCase() || 'U'
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className={`text-lg font-black italic tracking-tight ${!user.is_active ? 'text-body/20 line-through' : 'text-heading'}`}>{user.full_name}</h3>
                          <StatusBadge variant={user.role === 'teacher' ? 'primary' : user.role === 'admin' ? 'amber' : 'emerald'} size="sm">
                            {user.role}
                          </StatusBadge>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-body/40">
                          <span>{user.email}</span>
                          <span className="w-1 h-1 rounded-full bg-emerald-100" />
                          <span>ID: {user.id.slice(0, 8)}...</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50/50 border border-emerald-100/50">
                        <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${status.variant === 'primary' ? 'text-emerald-600' : status.variant === 'rose' ? 'text-rose-500' : 'text-rose-500'
                          }`}>
                          <StatusIcon size={12} /> {status.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {/* Role change dropdown placeholder */}
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value as 'student' | 'teacher' | 'admin' | 'parent')}
                          className="p-2 rounded-xl bg-white border border-emerald-100 text-[10px] font-black uppercase tracking-widest text-body/60 hover:border-primary/30 transition-all cursor-pointer appearance-none"
                          disabled={updateUserMutation.isPending}
                        >
                          <option value="student">Student</option>
                          <option value="teacher">Teacher</option>
                          <option value="parent">Parent</option>
                          <option value="admin">Admin</option>
                        </select>
                        {user.is_active ? (
                          <button
                            onClick={() => handleBanUser(user.id)}
                            disabled={deleteUserMutation.isPending}
                            className="p-2.5 rounded-xl bg-rose-50 text-rose-400 hover:bg-rose-100 hover:text-rose-600 transition-all disabled:opacity-50"
                            title="Khóa tài khoản"
                          >
                            <ShieldAlert size={18} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUnbanUser(user.id)}
                            disabled={updateUserMutation.isPending}
                            className="p-2.5 rounded-xl bg-emerald-50 text-emerald-400 hover:bg-emerald-100 hover:text-emerald-600 transition-all disabled:opacity-50"
                            title="Mở khóa tài khoản"
                          >
                            <ShieldCheck size={18} />
                          </button>
                        )}
                        <button className="p-2.5 rounded-xl bg-white border border-emerald-100 text-body/40 hover:text-primary transition-all">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                      <button className="p-2.5 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </GlassCard>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
