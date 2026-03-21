import React from 'react';
import { 
  Users, 
  Activity, 
  Database, 
  TrendingUp, 
  AlertTriangle,
  Server,
  ShieldCheck,
  ChevronRight,
  Plus,
  Loader2
} from 'lucide-react';
import { GlassCard } from '../../shared/components/GlassCard';
import { StatCard } from '../../shared/components/StatCard';
import { useAdminStats, useSystemHealth } from '../../features/admin';

export const DashboardPage: React.FC = () => {
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: health, isLoading: healthLoading } = useSystemHealth();

  const adminStats = [
    { 
      label: 'Tổng người dùng', 
      value: stats?.totalUsers?.toLocaleString() || '...', 
      icon: Users, 
      trend: { value: stats?.recentGrowth || 'Đang cập nhật', isUp: true } 
    },
    { label: 'Doanh thu Market (Ước tính)', value: '45.2M', icon: TrendingUp, trend: { value: '+8.5%', isUp: true } },
    { label: 'Lưu trữ tài nguyên', value: '24.5 GB', icon: Database, trend: { value: 'Dưới giới hạn', isUp: true } },
  ];

  const systemAlerts = [
    { type: 'warning', title: 'Máy chủ phản hồi tốt', desc: `Độ trễ trung bình: ${health?.services[0]?.latency || '...'}`, time: 'Vừa xong' },
    { type: 'info', title: 'Cập nhật bảo mật', desc: 'Đã cấu hình JWT Role-based Guard thành công', time: '1 giờ trước' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Admin Hero Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full w-fit">
            <ShieldCheck size={14} className="text-primary" />
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Administrator Portal</span>
          </div>
          <h1 className="text-4xl font-black text-heading italic tracking-tighter">Bảng điều khiển Admin</h1>
          <p className="text-body/60 font-medium italic">
            Hệ thống đang hoạt động ổn định (Sức khỏe: {healthLoading ? '...' : 'Tốt'})
          </p>
        </div>
        
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-6 py-3 bg-white border border-emerald-100 rounded-2xl text-xs font-black uppercase tracking-widest text-primary shadow-sm hover:translate-y-[-2px] transition-all">
              <Activity size={16} /> Reports
           </button>
           <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
              <Plus size={16} /> New Admin
           </button>
        </div>
      </header>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {adminStats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* System Health / Alerts */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-black text-heading italic tracking-tight flex items-center gap-2">
              <Server size={20} className="text-primary" />
              Sức khỏe hệ thống
            </h3>
            <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline px-2">Chi tiết Log</button>
          </div>
          
          <div className="space-y-4">
            {healthLoading ? (
              <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" /></div>
            ) : (
              health?.services.map((service, i) => (
                <GlassCard key={i} variant="white" className="border-emerald-100/50 hover:border-emerald-200 transition-all overflow-hidden group">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl ${service.status === 'healthy' ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'}`}>
                      {service.status === 'healthy' ? <ShieldCheck size={24} /> : <AlertTriangle size={24} />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                         <h4 className="font-black text-heading italic">{service.name}</h4>
                         <span className="text-[10px] font-bold text-body/30 uppercase">{service.latency}</span>
                      </div>
                      <p className="text-sm text-body/60">Trạng thái: {service.status.toUpperCase()}</p>
                    </div>
                    <button className="self-center p-2 rounded-xl bg-emerald-50 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </GlassCard>
              ))
            )}
            
            <GlassCard variant="emerald" className="text-white relative overflow-hidden group" noPadding={false}>
               <div className="relative z-10">
                  <h4 className="font-black text-lg italic tracking-tight">Cấu hình bảo mật</h4>
                  <p className="text-xs text-white/80 font-medium leading-relaxed mt-1">Hệ thống đang chạy trên giao thức JWT Security với Role-based Guard.</p>
                  <button className="mt-4 px-6 py-2 bg-white text-primary rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl">Kiểm tra ngay</button>
               </div>
               <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:rotate-12 transition-transform">
                  <ShieldCheck size={120} />
               </div>
            </GlassCard>
          </div>
        </section>

        {/* User Distribution / Quick Management */}
        <section className="space-y-6">
           <div className="px-2">
              <h3 className="text-xl font-black text-heading italic tracking-tight">Cơ cấu người dùng</h3>
           </div>
           
           <GlassCard variant="white" className="border-emerald-100/50 space-y-6">
              {statsLoading ? (
                <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" /></div>
              ) : (
                stats?.roleDistribution.map((role, i) => (
                  <div key={i} className="space-y-2">
                     <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                        <span className="text-body/60">{role.label}</span>
                        <span className="text-heading italic">{role.count}</span>
                     </div>
                     <div className="h-1.5 w-full bg-emerald-50 rounded-full overflow-hidden">
                        <div className={`h-full ${role.color} transition-all duration-1000`} style={{ width: `${role.percentage}%` }} />
                     </div>
                  </div>
                ))
              )}
              
              <button className="w-full py-3 mt-4 border border-primary/20 bg-primary/5 text-primary rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                 Quản lý chi tiết
              </button>
           </GlassCard>
        </section>
      </div>
    </div>
  );
};
