import React from 'react';
import { User, Star, Award, PlayCircle } from 'lucide-react';
import { GlassCard } from '../../shared/components/GlassCard';

export const MyClassesPage: React.FC = () => {
  const classes = [
    { 
      title: 'Toán học nâng cao 9', 
      teacher: 'Thầy Minh', 
      progress: 75, 
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400',
      rating: 4.9,
      totalLessons: 24,
      completedLessons: 18
    },
    { 
      title: 'Tiếng Anh Giao tiếp', 
      teacher: 'Ms. Lan', 
      progress: 40, 
      image: 'https://images.unsplash.com/photo-1543165796-5426273ea4d1?auto=format&fit=crop&q=80&w=400',
      rating: 4.8,
      totalLessons: 12,
      completedLessons: 5
    },
    { 
      title: 'Vật lý 9 (Cơ bản)', 
      teacher: 'Thầy Hùng', 
      progress: 90, 
      image: 'https://images.unsplash.com/photo-1636466484294-282600d3dce1?auto=format&fit=crop&q=80&w=400',
      rating: 4.7,
      totalLessons: 20,
      completedLessons: 18
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-heading italic tracking-tighter">Lớp của tôi</h1>
          <p className="text-xs font-bold text-body/40 uppercase tracking-widest">Bạn đang tham gia 3 khóa học tích cực</p>
        </div>
        <div className="flex items-center gap-3 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100">
          <Award size={20} className="text-primary" />
          <span className="text-xs font-black text-primary uppercase tracking-widest">2 Chứng chỉ đạt được</span>
        </div>
      </header>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((item, i) => (
          <GlassCard key={i} variant="white" noPadding className="group overflow-hidden hover:border-primary/30 transition-all flex flex-col">
            <div className="relative h-40 overflow-hidden">
               <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
               <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg border border-white/20">
                    {item.completedLessons}/{item.totalLessons} Bài học
                  </span>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-yellow-400 fill-current" />
                    <span className="text-xs font-black italic">{item.rating}</span>
                  </div>
               </div>
               <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform border border-white/30">
                  <PlayCircle size={32} fill="currentColor" className="text-white" />
               </button>
            </div>
            
            <div className="p-6 space-y-4 flex-1 flex flex-col">
               <div className="space-y-1">
                  <h3 className="font-black text-heading italic tracking-tight group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-[10px] text-body/40 font-bold uppercase tracking-widest flex items-center gap-1">
                    <User size={12} /> {item.teacher}
                  </p>
               </div>
               
               <div className="space-y-2 mt-auto">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-primary">
                    <span>Tiến độ</span>
                    <span>{item.progress}%</span>
                  </div>
                  <div className="h-2 bg-emerald-50 rounded-full overflow-hidden border border-emerald-100/50">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-1000" 
                      style={{ width: `${item.progress}%` }} 
                    />
                  </div>
               </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
