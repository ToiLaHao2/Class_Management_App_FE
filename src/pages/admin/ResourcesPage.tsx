import React from 'react';
import { 
  HardDrive, 
  Activity, 
  Terminal, 
  Cpu, 
  Cloud,
  CheckCircle2,
  AlertCircle,
  Database,
  Loader2,
  RefreshCw,
  Package
} from 'lucide-react';
import { GlassCard } from '../../shared/components/GlassCard';
import { useSystemHealth, useAdminStats } from '../../features/admin';

/** Map provider key → human-readable label */
const PROVIDER_LABELS: Record<string, string> = {
  local: 'Local Filesystem',
  cloudflare_r2: 'Cloudflare R2',
  cloudinary: 'Cloudinary CDN',
  aws_s3: 'Amazon S3',
};

export const ResourcesPage: React.FC = () => {
  const { data: health, isLoading: healthLoading, refetch: refetchHealth } = useSystemHealth();
  const { data: stats, isLoading: statsLoading } = useAdminStats();

  const providerKey = stats?.systemMetrics?.storageProvider || 'local';
  const providerLabel = PROVIDER_LABELS[providerKey] || providerKey;
  const storageLimitGb = stats?.systemMetrics?.storageLimitGb || 10;
  const usedMb = stats?.systemMetrics?.attachmentsSizeMb || 0;
  const usedGb = usedMb / 1024;
  const storagePercentage = Math.min(100, Math.round((usedGb / storageLimitGb) * 100));
  const fileCount = stats?.systemMetrics?.attachmentsCount || 0;

  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetchHealth();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-heading italic tracking-tighter">Tài nguyên hệ thống</h1>
          <p className="text-xs font-bold text-body/40 uppercase tracking-widest">Giám sát hạ tầng và hiệu năng ứng dụng</p>
        </div>
        
        <div className="flex gap-3">
           <button 
             onClick={handleRefresh}
             className="flex items-center gap-2 px-4 py-2 bg-white border border-emerald-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary hover:bg-emerald-50 transition-all"
           >
              <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} /> Làm mới
           </button>
           <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-primary border border-emerald-100 rounded-xl text-[10px] font-black uppercase tracking-widest">
              <Activity size={14} className="animate-pulse" /> 
              Live Status: {healthLoading ? '...' : health?.services.every(s => s.status === 'healthy') ? 'Online' : 'Warning'}
           </div>
           <div className="flex items-center gap-2 px-4 py-2 bg-white border border-emerald-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-body/40">
              <Cloud size={14} /> {providerLabel}
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
           
           {statsLoading ? (
             <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" /></div>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Storage Card */}
                <GlassCard variant="white" className="space-y-4 hover:border-primary/20 transition-all group md:col-span-2">
                   <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-emerald-50 text-primary">
                         <Package size={20} />
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg ${
                        storagePercentage > 80 ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {storagePercentage}% used
                      </span>
                   </div>
                   <div>
                      <h4 className="font-black text-heading text-sm italic">Tổng dung lượng sử dụng</h4>
                      <p className="text-2xl font-black text-heading italic tracking-tighter mt-1">
                        {usedMb < 1024 ? `${usedMb} MB` : `${usedGb.toFixed(2)} GB`} 
                        <span className="text-sm font-bold text-body/40 ml-2">/ {storageLimitGb} GB</span>
                      </p>
                   </div>
                   <div className="h-2 w-full bg-emerald-50 rounded-full overflow-hidden border border-emerald-100/30">
                      <div 
                        className={`h-full transition-all duration-1000 rounded-full ${
                          storagePercentage > 80 ? 'bg-rose-500' : storagePercentage > 50 ? 'bg-amber-400' : 'bg-primary'
                        }`} 
                        style={{ width: `${storagePercentage}%` }} 
                      />
                   </div>
                   <p className="text-[10px] font-bold text-body/30 uppercase tracking-widest">
                     {fileCount} tệp đã lưu · Free Tier {providerLabel} · Auto-detected
                   </p>
                </GlassCard>

                {/* File Count Card */}
                <GlassCard variant="white" className="space-y-4 hover:border-primary/20 transition-all group">
                   <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-500">
                         <Database size={20} />
                      </div>
                   </div>
                   <div>
                      <h4 className="font-black text-heading text-sm italic">Tổng số tệp</h4>
                      <p className="text-3xl font-black text-heading italic tracking-tighter mt-1">{fileCount}</p>
                      <p className="text-[10px] font-bold text-body/40 mt-1 uppercase tracking-widest">Attachments DB</p>
                   </div>
                </GlassCard>
             </div>
           )}

           <GlassCard variant="white" className="border-dashed border-2 border-emerald-100/50 bg-emerald-50/20 py-10 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:border-primary/20 transition-all">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-primary shadow-xl shadow-emerald-900/5 group-hover:scale-110 transition-transform">
                 <Terminal size={32} />
              </div>
              <div className="text-center">
                 <h4 className="font-extrabold text-heading">Console Logs nâng cao</h4>
                 <p className="text-xs text-body/40 font-bold mt-1 uppercase tracking-widest italic">Đang chờ tích hợp MongoDB Logging Service</p>
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
                 {healthLoading ? (
                   <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" /></div>
                 ) : (
                  health?.services.map((service, i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-emerald-50/30 transition-colors">
                       <div className="flex items-center gap-3">
                          {service.status === 'healthy' 
                            ? <CheckCircle2 size={16} className="text-emerald-500" /> 
                            : <AlertCircle size={16} className="text-rose-500" />
                          }
                          <span className="text-xs font-black text-heading italic">{service.name}</span>
                       </div>
                       <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-lg ${
                         service.status === 'healthy' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                       }`}>
                         {service.latency}
                       </span>
                    </div>
                  ))
                 )}
              </GlassCard>
           </section>

           <section className="space-y-6">
              <div className="px-2">
                 <h3 className="text-xl font-black text-heading italic tracking-tight flex items-center gap-2">
                   <Database size={20} className="text-primary" />
                   Thông tin Provider
                 </h3>
              </div>
              <GlassCard variant="emerald" className="text-white space-y-3">
                <h4 className="font-black text-lg italic">🗄️ {providerLabel}</h4>
                <div className="space-y-2 text-xs text-white/80">
                  <div className="flex justify-between">
                    <span>Giới hạn Free Tier</span>
                    <span className="font-black text-white">{storageLimitGb} GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Đã sử dụng</span>
                    <span className="font-black text-white">{usedMb < 1024 ? `${usedMb} MB` : `${usedGb.toFixed(2)} GB`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Còn trống</span>
                    <span className="font-black text-white">
                      {((storageLimitGb - usedGb) * 1024).toFixed(0)} MB
                    </span>
                  </div>
                </div>
                <p className="text-[10px] text-white/60 italic mt-2">
                  Giới hạn tự động tra từ STORAGE_PROVIDER trong .env
                </p>
              </GlassCard>
           </section>
        </div>
      </div>
    </div>
  );
};
