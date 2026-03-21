import React from 'react';
import { Clock, MapPin, Video, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { GlassCard } from '../../shared/components/GlassCard';

export const SchedulePage: React.FC = () => {
  const weekDays = [
    { name: 'T2', date: '21', active: false },
    { name: 'T3', date: '22', active: true },
    { name: 'T4', date: '23', active: false },
    { name: 'T5', date: '24', active: false },
    { name: 'T6', date: '25', active: false },
    { name: 'T7', date: '26', active: false },
    { name: 'CN', date: '27', active: false },
  ];

  const events = [
    { time: '08:00 - 09:30', title: 'Toán học nâng cao 9', teacher: 'Thầy Minh', room: 'Phòng 402', color: 'primary' },
    { time: '10:00 - 11:30', title: 'Vật lý 9 (Cơ bản)', teacher: 'Thầy Hùng', room: 'Online (Zoom)', color: 'emerald' },
    { time: '14:00 - 15:30', title: 'Tiếng Anh Giao tiếp', teacher: 'Ms. Lan', room: 'Trung tâm Star', color: 'primary' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <header className="flex items-center justify-between px-2">
        <h1 className="text-3xl font-black text-heading italic tracking-tighter">Thời gian biểu</h1>
        <div className="flex items-center gap-4 bg-white p-1.5 rounded-2xl shadow-sm border border-emerald-50">
          <button className="p-2 hover:bg-emerald-50 rounded-xl transition-colors"><ChevronLeft size={18} /></button>
          <span className="text-xs font-black text-heading uppercase tracking-widest">Tháng 3, 2026</span>
          <button className="p-2 hover:bg-emerald-50 rounded-xl transition-colors"><ChevronRight size={18} /></button>
        </div>
      </header>

      {/* Week View */}
      <div className="flex justify-between gap-2 overflow-x-auto no-scrollbar py-2">
        {weekDays.map((day, i) => (
          <button 
            key={i} 
            className={`flex-1 min-w-[60px] flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 ${
              day.active 
                ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' 
                : 'bg-white hover:bg-emerald-50 text-body/40 hover:text-primary'
            }`}
          >
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">{day.name}</span>
            <span className="text-xl font-black italic">{day.date}</span>
            {day.active && <div className="w-1 h-1 bg-white rounded-full" />}
          </button>
        ))}
      </div>

      {/* Events Timeline */}
      <div className="space-y-6">
        <div className="px-2">
          <h2 className="text-lg font-black text-heading italic tracking-tight">Chi tiết ngày hôm nay</h2>
        </div>
        
        <div className="space-y-4 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-emerald-100/50">
          {events.map((event, i) => (
            <div key={i} className="flex gap-6 items-start group relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-bg-app z-10 transition-transform group-hover:scale-110 ${
                event.color === 'primary' ? 'bg-primary text-white' : 'bg-emerald-500 text-white'
              }`}>
                <Clock size={16} />
              </div>
              
              <GlassCard variant="white" className="flex-1 hover:border-primary/20 transition-all cursor-pointer">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs font-black text-primary uppercase tracking-widest">{event.time}</div>
                    <h3 className="text-lg font-black text-heading group-hover:text-primary transition-colors italic">{event.title}</h3>
                    <div className="flex items-center gap-4 text-[10px] font-bold text-body/40 uppercase tracking-widest mt-2">
                      <span className="flex items-center gap-1"><User size={12} /> {event.teacher}</span>
                      <span className="flex items-center gap-1">
                        {event.room.includes('Online') ? <Video size={12} /> : <MapPin size={12} />}
                        {event.room}
                      </span>
                    </div>
                  </div>
                  <button className="px-6 py-2 bg-emerald-50 text-primary border border-emerald-100 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                    Vào học
                  </button>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
