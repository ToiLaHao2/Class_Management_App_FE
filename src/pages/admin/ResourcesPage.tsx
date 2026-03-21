import React from 'react';
import { 
  Database, 
  HardDrive, 
  Activity, 
  Terminal, 
  Cpu, 
  Cloud,
  CheckCircle2,
  AlertCircle,
  FileVideo,
  FileImage,
  Files,
  Loader2
} from 'lucide-react';
import { GlassCard } from '../../shared/components/GlassCard';
import { useSystemHealth } from '../../features/admin';

export const ResourcesPage: React.FC = () => {
  const { data: health, isLoading } = useSystemHealth();

  const storageMetrics = [
    { label: 'Video bài giảng', used: '18.4 GB', total: '50 GB', percentage: 37, icon: FileVideo, color: 'text-primary' },
    { label: 'Hình ảnh & Avatar', used: '4.2 GB', total: '20 GB', percentage: 21, icon: FileImage, color: 'text-emerald-500' },
    { label: 'Tài liệu PDF', used: '1.9 GB', total: '10 GB', percentage: 19, icon: Files, color: 'text-amber-500' },
  ];

  const recentLogs = [
    { level: 'info', msg: 'User management API call', time: '10:45:22', module: 'Admin' },
    { level: 'info', msg: 'RoleGuard access verification', time: '10:42:10', module: 'Auth' },
    { level: 'info', msg: 'Admin Stats fetched', time: '10:30:05', module: 'Stats' },
    { level: 'warning', msg: 'Potential brute force logged', time: '10:15:30', module: 'Security' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-heading italic tracking-tighter">Tài nguyên hệ thống</h1>
          <p className="text-xs font-bold text-body/40 uppercase tracking-widest">Giám sát hạ tầng và hiệu năng ứng dụng</p>
        </div>
        
        <div className="flex gap-3">
           <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-primary border border-emerald-100 rounded-xl text-[10px] font-black uppercase tracking-widest">
              <Activity size={14} className="animate-pulse" /> Live Status: {isLoading ? '...' : 'Online'}
           </div>
           <div className="flex items-center gap-2 px-4 py-2 bg-white border border-emerald-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-body/40">
              <Cloud size={14} /> Region: VN1
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Storage Monitoring */}
        <div className="lg:col-span-2 space-y-6">
           <div className="px-2">
              <h3 className="text-xl font-black text-heading italic tracking-tight flex items-center gap-2">
                <HardDrive size={20} className="text-primary" />
                Lưu trữ & Assets
              </h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {storageMetrics.map((metric, i) => (
                <GlassCard key={i} variant="white" className="space-y-4 hover:border-primary/20 transition-all group">
                   <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-xl bg-emerald-50 ${metric.color}`}>
                         <metric.icon size={20} />
                      </div>
                      <span className="text-[10px] font-black text-body/30 uppercase tracking-widest">{metric.percentage}% Used</span>
                   </div>
                   <div>
                      <h4 className="font-black text-heading text-sm italic">{metric.label}</h4>
                      <p className="text-[10px] font-bold text-body/40 mt-1 uppercase tracking-widest">{metric.used} / {metric.total}</p>
                   </div>
                   <div className="h-1.5 w-full bg-emerald-50 rounded-full overflow-hidden border border-emerald-100/30">
                      <div className={`h-full bg-primary transition-all duration-1000`} style={{ width: `${metric.percentage}%` }} />
                   </div>
                </GlassCard>
              ))}
           </div>

           <GlassCard variant="white" className="border-dashed border-2 border-emerald-100/50 bg-emerald-50/20 py-10 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:border-primary/20 transition-all">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-primary shadow-xl shadow-emerald-900/5 group-hover:scale-110 transition-transform">
                 <Terminal size={32} />
              </div>
              <div className="text-center">
                 <h4 className="font-extrabold text-heading">Xem Console Logs nâng cao</h4>
                 <p className="text-xs text-body/40 font-bold mt-1 uppercase tracking-widest italic">Truy cập bộ lọc log chi tiết theo cụm</p>
              </div>
           </GlassCard>
        </div>

        {/* Health Checks & Activity Logs */}
        <div className="space-y-8">
           <section className="space-y-6">
              <div className="px-2 flex items-center justify-between">
                 <h3 className="text-xl font-black text-heading italic tracking-tight flex items-center gap-2">
                   <Cpu size={20} className="text-primary" />
                   Health Check
                 </h3>
              </div>
              <GlassCard variant="white" className="divide-y divide-emerald-50 noPadding overflow-hidden">
                 {isLoading ? (
                   <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" /></div>
                 ) : (
                  health?.services.map((service, i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-emerald-50/30 transition-colors">
                       <div className="flex items-center gap-3">
                          {service.status === 'healthy' ? <CheckCircle2 size={16} className="text-emerald-500" /> : <AlertCircle size={16} className="text-amber-500" />}
                          <span className="text-xs font-black text-heading italic">{service.name}</span>
                       </div>
                       <span className="text-[10px] font-bold text-body/30 uppercase tracking-widest">{service.latency}</span>
                    </div>
                  ))
                 )}
              </GlassCard>
           </section>

           <section className="space-y-6">
              <div className="px-2">
                 <h3 className="text-xl font-black text-heading italic tracking-tight flex items-center gap-2">
                   <Database size={20} className="text-primary" />
                   Recent Activity
                 </h3>
              </div>
              <div className="space-y-3">
                 {recentLogs.map((log, i) => (
                    <div key={i} className={`p-4 rounded-2xl border flex flex-col gap-1 transition-all hover:translate-x-1 ${
                       log.level === 'error' ? 'bg-rose-50 border-rose-100' : 'bg-white border-emerald-50'
                    }`}>
                       <div className="flex items-center justify-between">
                          <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg ${
                             log.level === 'error' ? 'bg-rose-500 text-white shadow-lg shadow-rose-200' : 'bg-emerald-500 text-white shadow-lg shadow-emerald-200'
                          }`}>
                             {log.level}
                          </span>
                          <span className="text-[9px] font-bold text-body/30 uppercase">{log.time}</span>
                       </div>
                       <p className="text-xs font-bold text-heading mt-1 leading-tight">{log.msg}</p>
                       <span className="text-[9px] font-black text-body/20 uppercase tracking-[0.2em] mt-1">{log.module}</span>
                    </div>
                 ))}
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};
