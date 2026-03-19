import React, { useState } from 'react';
import { 
  FileText, 
  Video, 
  BookOpen, 
  Plus, 
  Search, 
  Filter, 
  FolderPlus,
  ArrowRight
} from 'lucide-react';
import { MaterialCard } from '../../features/teacher/components/MaterialCard';
import { GlassCard } from '../../shared/components/GlassCard';

const MaterialsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'assignments' | 'lessons'>('assignments');

  const materials = [
    { title: 'Bài tập Hệ phương trình 9A', type: 'assignments', date: '18/03/2026', size: '2.4 MB', icon: FileText, color: 'blue' },
    { title: 'Video bài giảng: Dòng diện xoay chiều', type: 'lessons', date: '15/03/2026', size: '156 MB', icon: Video, color: 'rose' },
    { title: 'Tài liệu ôn thi HSG Toán 9', type: 'assignments', date: '12/03/2026', size: '5.1 MB', icon: FileText, color: 'emerald' },
    { title: 'Slide bài giảng: Cấu tạo nguyên tử', type: 'lessons', date: '10/03/2026', size: '12 MB', icon: BookOpen, color: 'amber' },
  ];

  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-heading">Kho Học liệu</h2>
          <p className="text-sm text-body/60 mt-1 font-bold">Quản lý bài tập và bài giảng của bạn</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-6 py-3 bg-emerald-50 text-primary rounded-2xl font-bold border border-emerald-100/50 hover:bg-emerald-100 transition-all text-sm">
             <FolderPlus size={18} />
             Thư mục mới
           </button>
           <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-sm">
             <Plus size={18} />
             Tải lên
           </button>
        </div>
      </header>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <GlassCard noPadding className="p-1.5 flex w-fit" variant="white">
          <button 
            onClick={() => setActiveTab('assignments')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-[1.5rem] text-sm font-bold transition-all ${activeTab === 'assignments' ? 'bg-primary text-white shadow-md' : 'text-body/50 hover:text-body'}`}
          >
            <FileText size={16} />
            Bài tập (12)
          </button>
          <button 
            onClick={() => setActiveTab('lessons')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-[1.5rem] text-sm font-bold transition-all ${activeTab === 'lessons' ? 'bg-primary text-white shadow-md' : 'text-body/50 hover:text-body'}`}
          >
            <Video size={16} />
            Bài giảng (8)
          </button>
        </GlassCard>
        
        <div className="flex items-center gap-3">
          <div className="relative md:w-64">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-body/30" size={16} />
             <input 
               type="text" 
               placeholder="Tìm theo tên bài học..." 
               className="w-full pl-10 pr-4 py-3 bg-white border border-emerald-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-bold shadow-sm"
             />
          </div>
          <GlassCard noPadding className="p-3 cursor-pointer">
             <Filter size={20} className="text-body/60" />
          </GlassCard>
        </div>
      </div>

      {/* Materials List */}
      <div className="space-y-4">
        {materials.filter(item => item.type === activeTab).map((item, i) => (
          <MaterialCard key={i} {...item} />
        ))}
      </div>

      {/* Suggested / Storage Info */}
      <div className="bg-emerald-50 rounded-[3rem] p-10 flex flex-col md:flex-row items-center gap-8 border border-emerald-100/50 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-10 opacity-5">
            <BookOpen size={160} />
         </div>
         <div className="w-20 h-20 rounded-[2.5rem] bg-white flex items-center justify-center text-primary shadow-sm border border-emerald-100 relative z-10">
            <BookOpen size={40} />
         </div>
         <div className="flex-1 text-center md:text-left relative z-10">
            <h3 className="text-xl font-extrabold text-heading leading-tight italic">Tăng cường kho học liệu của bạn?</h3>
            <p className="text-sm text-body/60 mt-2 font-bold">Khám phá thư viện bài giảng mẫu từ cộng đồng giáo viên Classify để tiết kiệm 40% thời gian soạn bài.</p>
         </div>
         <button className="flex items-center gap-3 py-4 px-8 bg-white text-primary rounded-2xl font-bold shadow-sm hover:shadow-md hover:-translate-x-1 transition-all group border border-emerald-100 relative z-10">
            Đến Marketplace
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
         </button>
      </div>
    </section>
  );
};

export default MaterialsPage;
