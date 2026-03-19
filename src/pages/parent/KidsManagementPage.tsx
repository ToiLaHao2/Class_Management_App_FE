import React from 'react';
import { 
  UserPlus, 
  Settings, 
  BookOpen, 
  ShieldCheck,
  ChevronRight,
  Plus
} from 'lucide-react';
import { GlassCard } from '../../shared/components/GlassCard';
import { StatusBadge } from '../../shared/components/StatusBadge';

const KidsManagementPage: React.FC = () => {
  const kids = [
    { name: 'Minh Quân', grade: 'Lớp 9', status: 'active', classes: 4, lastActive: '10 phút trước' },
    { name: 'Lan Anh', grade: 'Lớp 6', status: 'active', classes: 3, lastActive: '2 giờ trước' },
  ];

  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-heading">Quản lý Con cái</h2>
          <p className="text-sm text-body/60 mt-1 font-bold">Quản lý tài khoản và lộ trình học của các con</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-sm">
          <UserPlus size={18} />
          Thêm tài khoản con
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {kids.map((kid, i) => (
          <GlassCard key={i} variant="white" className="p-8 group relative overflow-hidden h-full flex flex-col">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-125 transition-transform duration-700">
               <ShieldCheck size={160} />
            </div>
            
            <div className="flex items-start justify-between mb-8 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-[2rem] bg-emerald-50 text-primary flex items-center justify-center font-black text-2xl border-2 border-primary/10">
                  {kid.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-black text-heading leading-tight italic">{kid.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <StatusBadge variant="primary" size="sm">{kid.grade}</StatusBadge>
                    <span className="text-[10px] text-body/40 font-bold uppercase tracking-widest">{kid.lastActive}</span>
                  </div>
                </div>
              </div>
              <button className="p-3 hover:bg-emerald-50 rounded-2xl transition-colors text-body/30 hover:text-primary">
                <Settings size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8 relative z-10 flex-1">
               <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                  <div className="flex items-center gap-2 text-primary mb-2">
                     <BookOpen size={16} />
                     <span className="text-[10px] font-black uppercase tracking-widest">Lớp học</span>
                  </div>
                  <div className="text-xl font-black text-heading">{kid.classes} <span className="text-xs font-bold text-body/40 lowercase">đang học</span></div>
               </div>
               <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                  <div className="flex items-center gap-2 text-primary mb-2">
                     <ShieldCheck size={16} />
                     <span className="text-[10px] font-black uppercase tracking-widest">Trạng thái</span>
                  </div>
                  <div className="text-xl font-black text-emerald-600">Hoạt động</div>
               </div>
            </div>

            <div className="flex gap-3 relative z-10">
               <button className="flex-1 py-3 bg-white border border-emerald-100 rounded-xl text-xs font-black text-primary hover:bg-primary hover:text-white hover:border-transparent transition-all shadow-sm">
                  Xem báo cáo
               </button>
               <button className="px-5 py-3 bg-emerald-50 text-primary rounded-xl hover:bg-emerald-100 transition-colors">
                  <ChevronRight size={18} />
               </button>
            </div>
          </GlassCard>
        ))}

        <button className="group border-4 border-dashed border-emerald-100 rounded-[2.5rem] p-10 flex flex-col items-center justify-center gap-4 hover:border-primary/30 transition-all hover:bg-emerald-50/30">
          <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-200 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all flex items-center justify-center">
            <Plus size={32} />
          </div>
          <div className="text-center">
            <h4 className="font-extrabold text-heading text-lg">Liên kết tài khoản con</h4>
            <p className="text-xs text-body/40 font-bold mt-1">Dành cho con đã có tài khoản sẵn</p>
          </div>
        </button>
      </div>
    </section>
  );
};

export default KidsManagementPage;
