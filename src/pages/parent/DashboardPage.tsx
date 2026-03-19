import React from 'react';
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  MessageSquare,
  ChevronRight,
  ArrowUpRight,
  Settings,
  Phone,
  Mail,
  ShieldCheck,
  UserPlus,
  LogOut
} from 'lucide-react';
import { StatCard } from '../../shared/components/StatCard';
import { GlassCard } from '../../shared/components/GlassCard';
import { StatusBadge } from '../../shared/components/StatusBadge';

const ParentDashboardPage: React.FC = () => {
  const children = [
    { name: 'Minh Quân', grade: 'Lớp 9', attendance: '98%', avgScore: 8.5, nextClass: 'Toán nâng cao - 14:00' },
    { name: 'Lan Anh', grade: 'Lớp 6', attendance: '95%', avgScore: 9.0, nextClass: 'Tiếng Anh - 16:30' },
  ];

  const recentFeedback = [
    { child: 'Minh Quân', teacher: 'Thầy Minh', content: 'Quân có tiến bộ rỗ rệt trong phần Hình học không gian.', date: '2 giờ trước' },
    { child: 'Lan Anh', teacher: 'Cô Lan', content: 'Lan Anh hoàn thành bài tập về nhà rất tốt.', date: 'Hôm qua' },
  ];

  return (
    <section className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Profile-Integrated Dashboard Header */}
      <GlassCard variant="white" noPadding className="relative overflow-hidden border-emerald-100 shadow-xl shadow-emerald-900/5 group">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-emerald-50/50 to-transparent pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-center gap-8 p-8 relative z-10">
          {/* Parent Avatar Section */}
          <div className="relative group/avatar cursor-pointer">
             <div className="w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-primary to-emerald-600 p-1 shadow-2xl shadow-primary/20 transition-transform group-hover/avatar:scale-105 duration-500">
                <div className="w-full h-full rounded-[2.2rem] bg-white flex items-center justify-center text-4xl font-black text-primary border-4 border-white">
                  P
                </div>
             </div>
             <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-white border-4 border-bg-app shadow-lg flex items-center justify-center text-primary hover:scale-110 transition-transform">
                <Settings size={18} />
             </div>
          </div>

          {/* Parent Info */}
          <div className="flex-1 text-center md:text-left space-y-2">
             <div className="flex items-center justify-center md:justify-start gap-3">
                <h2 className="text-3xl font-black text-heading italic tracking-tight">Chào, Phụ huynh Minh!</h2>
                <StatusBadge variant="primary" size="sm" className="font-black">VERIFIED</StatusBadge>
             </div>
             <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-bold text-body/40 uppercase tracking-widest">
                <div className="flex items-center gap-1.5"><Phone size={14} className="text-primary/60" /> 098****456</div>
                <div className="flex items-center gap-1.5"><Mail size={14} className="text-primary/60" /> parent@classify.edu</div>
                <div className="flex items-center gap-1.5 text-primary font-black"><ShieldCheck size={14} /> ID: CMAP-8829</div>
             </div>
          </div>

          {/* Linked Kids Quick Switch */}
          <div className="flex flex-col items-center md:items-end gap-3 border-t md:border-t-0 md:border-l border-emerald-100 pt-6 md:pt-0 md:pl-8">
             <span className="text-[10px] font-black text-body/30 uppercase tracking-[0.2em]">Con của bạn</span>
             <div className="flex -space-x-3">
                {children.map((child, i) => (
                  <div key={i} className="w-12 h-12 rounded-2xl bg-white text-primary border-4 border-emerald-50 flex items-center justify-center font-black text-sm shadow-sm hover:translate-y-[-4px] hover:shadow-lg transition-all cursor-pointer ring-1 ring-emerald-100/30">
                    {child.name.charAt(0)}
                  </div>
                ))}
                <button className="w-12 h-12 rounded-2xl bg-emerald-50 border-4 border-emerald-50 flex items-center justify-center font-black text-primary shadow-sm hover:scale-110 active:scale-95 transition-all">
                  <UserPlus size={18} />
                </button>
             </div>
          </div>
        </div>
        
        {/* Banner Footer Actions */}
        <div className="bg-emerald-50/30 border-t border-emerald-100 flex items-center justify-center md:justify-start px-8 py-3 gap-6">
           <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline flex items-center gap-1.5">
              <Settings size={12} /> Cài đặt tài khoản
           </button>
           <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline flex items-center gap-1.5">
              <ShieldCheck size={12} /> Bảo mật
           </button>
           <button className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline ml-auto flex items-center gap-1.5">
              <LogOut size={12} /> Đăng xuất
           </button>
        </div>
      </GlassCard>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Tổng buổi học" 
          value="24" 
          icon={Calendar} 
          trend={{ value: 4, isUp: true }} 
        />
        <StatCard 
          label="Điểm trung bình" 
          value="8.75" 
          icon={TrendingUp} 
          trend={{ value: 0.5, isUp: true }} 
        />
        <StatCard 
          label="Sự kiện sắp tới" 
          value="03" 
          icon={Users} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Children Progress Grid */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-extrabold text-heading text-lg">Tiến độ học tập</h3>
            <button className="text-xs font-black text-primary uppercase tracking-widest hover:underline flex items-center gap-1">
              Xem chi tiết <ChevronRight size={14} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {children.map((child, i) => (
              <GlassCard key={i} variant="white" className="group cursor-pointer hover:shadow-xl transition-all border-emerald-100/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Users size={24} />
                  </div>
                  <StatusBadge variant="primary">{child.grade}</StatusBadge>
                </div>
                <h4 className="font-black text-heading text-lg mb-4">{child.name}</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-body/50">Chuyên cần</span>
                    <span className="text-emerald-600 font-extrabold">{child.attendance}</span>
                  </div>
                  <div className="w-full h-1.5 bg-emerald-50 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: child.attendance }}></div>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold pt-2">
                    <span className="text-body/50">Điểm TB</span>
                    <span className="text-heading font-black">{child.avgScore}/10</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-tighter text-primary pt-2">
                    <span>Lớp tiếp theo:</span>
                    <span>{child.nextClass}</span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Recent Feedback & Sidebar */}
        <div className="space-y-6">
           <GlassCard variant="white" className="relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <MessageSquare size={80} />
              </div>
              <h3 className="font-extrabold text-heading mb-6 flex items-center gap-2 relative z-10">
                 <MessageSquare size={20} className="text-primary" />
                 Nhận xét mới
              </h3>
              <ul className="space-y-6 relative z-10">
                 {recentFeedback.map((fb, i) => (
                    <li key={i} className="group cursor-pointer border-b border-emerald-50 last:border-0 pb-4 last:pb-0">
                       <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-black text-primary uppercase tracking-widest">{fb.child}</span>
                          <span className="text-[10px] font-bold text-body/30 italic">{fb.date}</span>
                       </div>
                       <p className="text-[13px] text-heading font-bold leading-relaxed group-hover:text-primary transition-colors">
                          "{fb.content}"
                       </p>
                       <div className="mt-2 text-[10px] font-black text-body/40">
                         - {fb.teacher}
                       </div>
                    </li>
                 ))}
              </ul>
              <button className="w-full mt-6 py-3 px-4 bg-emerald-50 text-primary font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                 Tất cả nhận xét
              </button>
           </GlassCard>

           <div className="bg-gradient-to-br from-primary to-emerald-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-primary/20 relative overflow-hidden group border-4 border-white/10">
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
              <h3 className="text-xl font-black mb-2 italic">Học phí tháng 3</h3>
              <p className="text-sm text-white/80 leading-relaxed font-medium">
                Bạn có 1 hóa đơn chưa thanh toán cho Minh Quân.
              </p>
              <button className="mt-6 flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-xl text-xs font-black uppercase tracking-widest hover:shadow-lg transition-all group/btn">
                 Thanh toán ngay
                 <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
           </div>
        </div>
      </div>
    </section>
  );
};

export default ParentDashboardPage;
