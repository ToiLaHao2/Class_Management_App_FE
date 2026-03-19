import React from 'react';
import { ClipboardList, Clock, CheckCircle2, AlertCircle, Bookmark, ChevronRight } from 'lucide-react';
import { GlassCard } from '../../shared/components/GlassCard';

export const AssignmentsPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const tabs = ['Đang đến hạn (3)', 'Đã nộp (12)', 'Đã chấm điểm'];

  const assignments = [
    { 
      title: 'Vật lý 9: Bài tập Chuyên đề Điện học', 
      subject: 'Vật lý', 
      dueDate: 'Hôm nay, 23:59', 
      status: 'urgent', 
      difficulty: 'Khó', 
      points: 10 
    },
    { 
      title: 'Toán 9: Giải bài tập SGK trang 45-48', 
      subject: 'Toán học', 
      dueDate: 'Ngày mai, 17:00', 
      status: 'pending', 
      difficulty: 'Trung bình', 
      points: 5 
    },
    { 
      title: 'English: Write a short essay about your dream city', 
      subject: 'Tiếng Anh', 
      dueDate: 'Thứ 6, 25/03', 
      status: 'pending', 
      difficulty: 'Dễ', 
      points: 5 
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-heading italic tracking-tighter">Bài tập & Nhiệm vụ</h1>
          <p className="text-xs font-bold text-body/40 uppercase tracking-widest">Hoàn thành bài tập để nhận thêm điểm Streak!</p>
        </div>
        
        {/* Tab Switcher */}
        <div className="flex p-1 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 w-fit">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`py-2 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === i 
                  ? 'bg-white text-primary shadow-sm ring-1 ring-emerald-100' 
                  : 'text-body/40 hover:text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {/* Assignments List */}
      <div className="space-y-4">
        {assignments.map((item, i) => (
          <GlassCard key={i} variant="white" className="group cursor-pointer hover:border-primary/30 transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
               <div className="flex items-start gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner ${
                    item.status === 'urgent' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-primary'
                  }`}>
                    {item.status === 'urgent' ? <AlertCircle size={24} /> : <Bookmark size={24} />}
                  </div>
                  <div className="space-y-1 overflow-hidden">
                    <div className="flex items-center gap-2">
                       <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${
                         item.status === 'urgent' ? 'bg-rose-100 text-rose-600 animate-pulse' : 'bg-emerald-100 text-primary'
                       }`}>
                         {item.subject}
                       </span>
                       <span className="text-[10px] font-bold text-body/30 uppercase tracking-widest leading-none">• Mức độ: {item.difficulty}</span>
                    </div>
                    <h3 className="text-lg font-black text-heading italic tracking-tight truncate group-hover:text-primary transition-colors">{item.title}</h3>
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-body/40">
                       <span className="flex items-center gap-1"><Clock size={12} /> Hạn nộp: {item.dueDate}</span>
                       <span className="flex items-center gap-1"><CheckCircle2 size={12} /> {item.points} Điểm</span>
                    </div>
                  </div>
               </div>
               <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                  Làm bài ngay
                  <ChevronRight size={14} />
               </button>
            </div>
          </GlassCard>
        ))}
        
        <div className="py-10 text-center space-y-4">
           <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto text-emerald-200">
              <ClipboardList size={32} />
           </div>
           <p className="text-[10px] text-body/40 font-black uppercase tracking-widest italic tracking-widest">Sắp xếp theo hạn nộp gần nhất</p>
        </div>
      </div>
    </div>
  );
};
