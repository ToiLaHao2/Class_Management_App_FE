import React from 'react';
import { 
  Sparkles, 
  Flame, 
  BookOpen, 
  ClipboardList, 
  Zap,
  ChevronRight,
  TrendingUp,
  Clock
} from 'lucide-react';
import { GlassCard } from '../../shared/components/GlassCard';
import { StatCard } from '../../shared/components/StatCard';
import { useAuthStore } from '../../stores/authStore';

export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();

  const todayClasses = [
    { time: '08:00', title: 'Toán học nâng cao 9', teacher: 'Thầy Minh', type: 'Live Class' },
    { time: '14:30', title: 'Luyện thi IELTS', teacher: 'Ms. Lan', type: 'Video' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Hero Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full w-fit">
            <Sparkles size={14} className="text-primary" />
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Học tập mỗi ngày</span>
          </div>
          <h1 className="text-4xl font-black text-heading italic tracking-tighter">
            Chào {user?.fullName || 'bạn'}! 👋
          </h1>
          <p className="text-body/60 font-medium">Hôm nay bạn có 2 tiết học và 3 bài tập cần hoàn thành.</p>
        </div>
        
        <GlassCard variant="white" className="flex items-center gap-4 px-6 py-4 border-orange-100 bg-orange-50/30">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 shadow-inner">
            <Flame size={24} fill="currentColor" />
          </div>
          <div>
            <div className="text-2xl font-black text-orange-600 italic">12 Ngày</div>
            <div className="text-[10px] font-black text-orange-400 uppercase tracking-widest leading-none">Chuỗi học tập 🔥</div>
          </div>
        </GlassCard>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Khóa học đang học" 
          value="4" 
          icon={BookOpen} 
          trend={{ value: "+1 tháng này", isUp: true }}
        />
        <StatCard 
          label="Bài tập hoàn thành" 
          value="28" 
          icon={ClipboardList} 
          trend={{ value: "Top 5% lớp", isUp: true }}
        />
        <StatCard 
          label="Điểm trung bình" 
          value="8.5" 
          icon={TrendingUp} 
          trend={{ value: "Tăng 0.2", isUp: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Schedule */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-black text-heading italic tracking-tight flex items-center gap-2">
              <Clock size={20} className="text-primary" />
              Lịch học hôm nay
            </h3>
            <button className="text-xs font-black text-primary uppercase tracking-widest hover:underline px-2">Xem tất cả</button>
          </div>
          
          <div className="space-y-4">
            {todayClasses.map((item, i) => (
              <GlassCard key={i} variant="white" className="group cursor-pointer hover:border-primary/30 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="px-3 py-2 rounded-xl bg-emerald-50 text-primary font-black text-xs">
                      {item.time}
                    </div>
                    <div>
                      <h4 className="font-bold text-heading group-hover:text-primary transition-colors">{item.title}</h4>
                      <p className="text-[10px] text-body/40 font-bold uppercase tracking-widest">{item.teacher} • {item.type}</p>
                    </div>
                  </div>
                  <button className="p-2 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Quick Actions / Streaks */}
        <section className="space-y-6">
           <div className="px-2">
              <h3 className="text-xl font-black text-heading italic tracking-tight">Thử thách</h3>
           </div>
           <GlassCard variant="emerald" className="text-white relative overflow-hidden group">
              <div className="relative z-10 space-y-4">
                <Zap size={32} fill="currentColor" className="text-emerald-300" />
                <div>
                  <h4 className="font-black text-lg italic tracking-tight">Về đích sớm!</h4>
                  <p className="text-xs text-white/80 font-medium leading-relaxed mt-1">Hoàn thành tất cả bài tập toán trước 20:00 tối nay để nhận 50 điểm tích lũy.</p>
                </div>
                <button className="w-full py-3 bg-white text-primary rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-transform">
                  Bắt đầu ngay
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                <Sparkles size={120} />
              </div>
           </GlassCard>
        </section>
      </div>
    </div>
  );
};
