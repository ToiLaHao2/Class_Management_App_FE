import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Plus,
  Search
} from 'lucide-react';

const CalendarPage: React.FC = () => {
  const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  const date = new Date();
  const monthNames = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];

  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-heading">Lịch dạy & Sự kiện</h2>
          <p className="text-sm text-body/60 mt-1 font-medium">Quản lý thời gian biểu cá nhân của bạn</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3 bg-white border border-emerald-100 rounded-2xl text-body/60 hover:text-primary transition-all shadow-sm">
             <Search size={20} />
          </button>
          <button className="flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-sm">
            <Plus size={18} />
            Thêm sự kiện
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-emerald-100 shadow-sm relative overflow-hidden">
             {/* Calendar Header */}
             <div className="flex items-center justify-between mb-8 px-2">
                <div className="flex items-center gap-4">
                   <h3 className="text-xl font-bold text-heading">{monthNames[date.getMonth()]}, {date.getFullYear()}</h3>
                   <div className="flex gap-2">
                      <button className="p-2 hover:bg-emerald-50 rounded-xl transition-colors text-body/40 hover:text-primary">
                         <ChevronLeft size={20} />
                      </button>
                      <button className="p-2 hover:bg-emerald-50 rounded-xl transition-colors text-body/40 hover:text-primary">
                         <ChevronRight size={20} />
                      </button>
                   </div>
                </div>
                <div className="flex p-1 bg-emerald-50 rounded-xl text-xs font-bold text-body/50">
                   <button className="px-4 py-2 rounded-lg bg-white text-primary shadow-sm">Tháng</button>
                   <button className="px-4 py-2 rounded-lg hover:text-body">Tuần</button>
                   <button className="px-4 py-2 rounded-lg hover:text-body">Ngày</button>
                </div>
             </div>

             {/* Days of week */}
             <div className="grid grid-cols-7 border-b border-emerald-50 pb-4 mb-4">
                {days.map(day => (
                   <div key={day} className="text-center text-[10px] font-black uppercase tracking-widest text-body/40">{day}</div>
                ))}
             </div>

             {/* Calendar Cells (Dummy) */}
             <div className="grid grid-cols-7 gap-px bg-emerald-100/30 rounded-2xl overflow-hidden border border-emerald-50">
                {Array.from({ length: 35 }).map((_, i) => {
                   const dayNum = (i - 2) > 0 && (i - 2) <= 31 ? (i - 2) : null;
                   const isToday = dayNum === date.getDate();
                   const hasEvent = [5, 12, 18, 24].includes(dayNum || 0);

                   return (
                      <div key={i} className={`h-24 md:h-32 bg-white p-3 transition-colors hover:bg-emerald-50 cursor-pointer group relative ${!dayNum ? 'opacity-20' : ''}`}>
                         <span className={`text-sm font-bold ${isToday ? 'w-7 h-7 bg-primary text-white rounded-lg flex items-center justify-center' : 'text-body/60 group-hover:text-primary'}`}>
                            {dayNum}
                         </span>
                         {hasEvent && (
                            <div className="mt-2 space-y-1 hidden md:block">
                               <div className="text-[10px] p-1 bg-emerald-100 text-emerald-700 rounded-md truncate font-bold">Lớp Toán 9A</div>
                               <div className="text-[10px] p-1 bg-blue-100 text-blue-700 rounded-md truncate font-bold">Học liệu Lý</div>
                            </div>
                         )}
                         {hasEvent && (
                            <div className="md:hidden mt-2 flex justify-center">
                               <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            </div>
                         )}
                      </div>
                   );
                })}
             </div>
        </div>

        {/* Schedule Sidebar */}
        <div className="space-y-6 lg:sticky lg:top-8 self-start">
           <div className="bg-white rounded-[2.5rem] p-8 border border-emerald-100 shadow-sm">
              <h3 className="font-bold text-heading mb-6 flex items-center gap-2">
                 <Clock size={20} className="text-primary" />
                 Lịch trình sắp tới
              </h3>
              
              <ul className="space-y-6">
                 {[
                   { title: 'Toán nâng cao 9', time: '14:00 - 15:30', room: 'Phòng 204', tag: 'Lớp học' },
                   { title: 'Tư vấn phụ huynh', time: '16:00 - 16:30', room: 'Online Meet', tag: 'Họp' },
                   { title: 'Ôn thi Lý 10', time: '19:00 - 20:30', room: 'Phòng 101', tag: 'Dạy thêm' },
                 ].map((event, i) => (
                    <li key={i} className="group cursor-pointer">
                       <div className="flex items-start justify-between">
                          <span className="text-[10px] font-black uppercase tracking-widest text-primary/50 group-hover:text-primary transition-colors">{event.tag}</span>
                          <span className="text-[10px] font-bold text-body/30 italic">{event.time}</span>
                       </div>
                       <h4 className="font-bold text-heading mt-1 group-hover:text-primary transition-colors">{event.title}</h4>
                       <div className="flex items-center gap-2 mt-2">
                          <MapPin size={12} className="text-body/30" />
                          <span className="text-xs text-body/50 font-medium">{event.room}</span>
                       </div>
                    </li>
                 ))}
              </ul>

              <button className="w-full mt-8 py-4 px-6 bg-emerald-50 text-primary font-bold rounded-2xl border border-emerald-100 hover:bg-primary hover:text-white hover:border-transparent transition-all shadow-sm">
                 Xem toàn bộ lịch dạy
              </button>
           </div>

           <div className="bg-gradient-to-br from-primary to-emerald-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-500">
                 <CalendarIcon size={120} />
              </div>
              <h3 className="text-xl font-bold mb-2">Tối ưu lịch trình?</h3>
              <p className="text-sm text-white/80 leading-relaxed font-medium">
                Sử dụng tính năng gợi ý lịch dạy để tránh xung đột và tối đa hóa thời gian nghỉ ngơi.
              </p>
              <button className="mt-6 px-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-xs font-bold transition-all border border-white/30">
                 Tìm hiểu thêm
              </button>
           </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarPage;
