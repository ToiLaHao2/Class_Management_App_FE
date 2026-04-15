import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Database, 
  TrendingUp, 
  AlertTriangle,
  Server,
  ShieldCheck,
  ChevronRight,
  Loader2,
  RefreshCw,
  BookOpen
} from 'lucide-react';
import { GlassCard } from '../../shared/components/GlassCard';
import { StatCard } from '../../shared/components/StatCard';
import { useAdminStats, useSystemHealth } from '../../features/admin';

/** Map provider key → human-readable label */
const PROVIDER_LABELS: Record<string, string> = {
  local: 'Local Dev',
  cloudflare_r2: 'Cloudflare R2',
  cloudinary: 'Cloudinary',
  aws_s3: 'AWS S3',
};

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: health, isLoading: healthLoading, refetch: refetchHealth } = useSystemHealth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Derive overall system status from health data
  const overallStatus = health?.services.every(s => s.status === 'healthy') ? 'Tốt' : 'Cảnh báo';
  const dbService = health?.services.find(s => s.name.includes('PostgreSQL'));
  const providerKey = stats?.systemMetrics?.storageProvider || 'local';
  const providerLabel = PROVIDER_LABELS[providerKey] || providerKey;

  const handleRefreshHealth = async () => {
    setIsRefreshing(true);
    await refetchHealth();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const adminStats = [
    { 
      label: 'Tổng người dùng', 
      value: stats?.totalUsers?.toLocaleString() || '...', 
      icon: Users, 
      trend: { value: stats?.recentGrowth || 'Đang cập nhật', isUp: true } 
    },
    { 
      label: 'Lớp học đang vận hành', 
      value: stats?.systemMetrics?.activeClassesCount?.toLocaleString() || '0', 
      icon: BookOpen, 
      trend: { value: 'Tự động tính từ DB', isUp: true } 
    },
    { 
      label: `Lưu trữ (${providerLabel})`, 
      value: `${stats?.systemMetrics?.attachmentsSizeMb || 0} MB / ${stats?.systemMetrics?.storageLimitGb || 10} GB`, 
      icon: Database, 
      trend: { value: `${stats?.systemMetrics?.attachmentsCount || 0} tệp đã lưu`, isUp: true } 
    },
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
            Hệ thống đang hoạt động ổn định · Sức khỏe: {healthLoading ? '...' : overallStatus} · Storage: {providerLabel}
          </p>
        </div>
        
        <div className="flex gap-3">
           <button 
             onClick={handleRefreshHealth}
             className="flex items-center gap-2 px-6 py-3 bg-white border border-emerald-100 rounded-2xl text-xs font-black uppercase tracking-widest text-primary shadow-sm hover:translate-y-[-2px] transition-all"
           >
              <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} /> Làm mới
           </button>
           <button 
             onClick={() => navigate('/admin/resources')}
             className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
           >
              <Server size={16} /> Hệ thống
           </button>
        </div>
      </header>

      {/* Primary Stats Grid */}
      {statsLoading ? (
        <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {adminStats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* System Health / Alerts */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-black text-heading italic tracking-tight flex items-center gap-2">
              <Server size={20} className="text-primary" />
              Sức khỏe hệ thống
            </h3>
            <button 
              onClick={() => navigate('/admin/resources')}
              className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline px-2"
            >
              Chi tiết Log →
            </button>
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
                         <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-lg ${
                           service.status === 'healthy' 
                             ? 'bg-emerald-50 text-emerald-600' 
                             : 'bg-rose-50 text-rose-600'
                         }`}>
                           {service.latency}
                         </span>
                      </div>
                      <p className="text-sm text-body/60">
                        Trạng thái: <span className={service.status === 'healthy' ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                          {service.status === 'healthy' ? '● ONLINE' : '● OFFLINE'}
                        </span>
                      </p>
                    </div>
                    <button 
                      onClick={() => navigate('/admin/resources')}
                      className="self-center p-2 rounded-xl bg-emerald-50 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </GlassCard>
              ))
            )}
            
            <GlassCard variant="emerald" className="text-white relative overflow-hidden group" noPadding={false}>
               <div className="relative z-10">
                  <h4 className="font-black text-lg italic tracking-tight">Cấu hình bảo mật</h4>
                  <p className="text-xs text-white/80 font-medium leading-relaxed mt-1">
                    JWT Security + Role-based Guard đang hoạt động. 
                    Database Latency: <strong>{dbService?.latency || '...'}</strong>
                  </p>
                  <div className="flex gap-3 mt-4">
                    <span className="px-3 py-1 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest">
                      🔒 JWT Active
                    </span>
                    <span className="px-3 py-1 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest">
                      🛡️ RBAC Guard
                    </span>
                    <span className="px-3 py-1 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest">
                      ⚡ Rate Limiter
                    </span>
                  </div>
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
              
              <button 
                onClick={() => navigate('/admin/users')}
                className="w-full py-3 mt-4 border border-primary/20 bg-primary/5 text-primary rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
              >
                 Quản lý chi tiết →
              </button>
           </GlassCard>
        </section>
      </div>
    </div>
  );
};
