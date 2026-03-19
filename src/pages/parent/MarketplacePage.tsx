import React from 'react';
import { 
  Search, 
  Filter, 
  PlusCircle,
  Hash,
  Sparkles
} from 'lucide-react';
import { MarketPost } from '../../features/parent/components/MarketPost';
import { GlassCard } from '../../shared/components/GlassCard';

const MarketplacePage: React.FC = () => {
  const posts = [
    {
      teacherName: 'Thầy Minh (Toán 9)',
      avatar: '',
      subject: 'Toán học nâng cao',
      largeImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
      description: 'Lớp luyện thi vào 10 chuyên Toán với lộ trình 3 giai đoạn: Nắm chắc cơ bản - Tư duy nâng cao - Luyện đề thực chiến. Tỷ lệ đỗ chuyên 95%.',
      rating: 5.0,
      reviews: 142,
      price: '250.000đ/buổi',
      students: 120
    },
    {
      teacherName: 'Ms. Lan English',
      avatar: '',
      subject: 'Tiếng Anh Giao tiếp',
      largeImage: 'https://images.unsplash.com/photo-1543165796-5426273ea4d1?auto=format&fit=crop&q=80&w=800',
      description: 'Phương pháp học thông qua trò chơi và tương tác sống động cho các bé lớp 6-9. Giúp con tự tin nói tiếng Anh sau 3 tháng.',
      rating: 4.8,
      reviews: 89,
      price: '200.000đ/buổi',
      students: 45
    }
  ];

  const categories = ['Toán', 'Lý', 'Hóa', 'Anh', 'Văn', 'STEM', 'Kỹ năng'];

  return (
    <section className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <header className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-black text-heading italic tracking-tight">Khám phá</h2>
        <div className="flex items-center gap-4">
          <button className="text-primary hover:scale-110 transition-transform"><PlusCircle size={28} /></button>
          <button className="text-heading hover:scale-110 transition-transform"><Hash size={28} /></button>
        </div>
      </header>

      {/* Stories / Top Teachers Bar */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 px-1">
         <div className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer group">
            <div className="w-16 h-16 rounded-full border-2 border-primary p-0.5 group-hover:scale-105 transition-transform">
               <div className="w-full h-full rounded-full bg-emerald-50 flex items-center justify-center text-primary border border-white">
                  <Sparkles size={24} />
               </div>
            </div>
            <span className="text-[10px] font-black text-primary uppercase">Gợi ý</span>
         </div>
         {['Cô Lan', 'Thầy Minh', 'Ms. Hoa', 'Mr. Robert', 'Cô Thu', 'Thầy Hùng'].map((name, i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer group">
               <div className="w-16 h-16 rounded-full border-2 border-emerald-100 p-0.5 group-hover:border-primary transition-colors group-hover:scale-105">
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-emerald-50 to-white flex items-center justify-center text-heading font-black border border-white">
                     {name.charAt(0)}
                  </div>
               </div>
               <span className="text-[10px] font-bold text-body/60 truncate w-16 text-center">{name}</span>
            </div>
         ))}
      </div>

      {/* Search Header */}
      <GlassCard variant="white" noPadding className="flex items-center gap-3 px-4 py-3 border-emerald-100/30">
        <Search size={18} className="text-body/30" />
        <input 
          type="text" 
          placeholder="Tìm kiếm thầy cô, môn học..." 
          className="flex-1 bg-transparent border-none focus:outline-none text-sm font-bold"
        />
        <div className="h-6 w-px bg-emerald-100" />
        <button className="p-1 hover:text-primary transition-colors"><Filter size={18} /></button>
      </GlassCard>

      {/* Categories Bar */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
         {categories.map(cat => (
            <button key={cat} className="px-4 py-2 bg-white border border-emerald-100 rounded-full text-xs font-black text-body/50 hover:bg-primary hover:text-white hover:border-transparent transition-all whitespace-nowrap">
               #{cat}
            </button>
         ))}
      </div>

      {/* Marketplace Posts Feed */}
      <div className="space-y-6 pb-20">
        {posts.map((post, i) => (
          <MarketPost key={i} {...post} />
        ))}

        <div className="py-10 text-center space-y-4">
           <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto text-emerald-200">
              <Sparkles size={32} />
           </div>
           <h3 className="font-bold text-heading">Đã hết bài đăng hôm nay</h3>
           <p className="text-xs text-body/40 font-medium">Hãy thử quay lại sau hoặc tìm kiếm danh mục khác nhé!</p>
        </div>
      </div>
    </section>
  );
};

export default MarketplacePage;
