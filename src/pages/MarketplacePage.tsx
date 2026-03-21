import React from 'react';
import { 
  Search, 
  Filter, 
  PlusCircle,
  Hash, 
  Sparkles
} from 'lucide-react';
import { MarketPost } from '../features/marketplace/components/MarketPost';
import { MarketCard } from '../features/marketplace/components/MarketCard';
import { GlassCard } from '../shared/components/GlassCard';
import { useAuthStore } from '../stores/authStore';

const MarketplacePage: React.FC = () => {
  const { user } = useAuthStore();
  const effectiveRole = user?.role;
  const [activeTab, setActiveTab] = React.useState(0);
  
  const isParent = effectiveRole === 'parent';
  const isTeacher = effectiveRole === 'teacher';
  const isStudent = effectiveRole === 'student';

  const categories = ['Toán', 'Lý', 'Hóa', 'Anh', 'Văn', 'STEM', 'Kỹ năng'];

  const parentTabs = ['Gợi ý cho con', 'Yêu cầu của tôi'];
  const teacherTabs = ['Cơ hội mới', 'Đang thương thảo'];
  const studentTabs = ['Khám phá khóa học', 'Đề xuất của em'];
  
  const tabs = isParent ? parentTabs : isTeacher ? teacherTabs : studentTabs;

  // Mock Data
  const suggestions = [
    {
      teacherName: 'Thầy Minh (Toán 9)',
      avatar: '',
      subject: 'Toán học nâng cao',
      largeImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
      description: 'Lộ trình thi chuyên Toán. Tỷ lệ đỗ 95%.',
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
      description: 'Học thông qua trò chơi và tương tác sống động.',
      rating: 4.8,
      reviews: 89,
      price: '200.000đ/buổi',
      students: 45
    }
  ];

  const teacherOpportunities = [
    {
      title: 'Yêu cầu: Gia sư Toán 9',
      author: 'Phụ huynh Minh',
      rating: 4.9,
      reviews: 12,
      price: '300.000đ/buổi',
      image: '📚',
      tag: 'Cần gấp'
    }
  ];

  return (
    <section className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <header className="flex flex-col gap-6 px-2">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black text-heading italic tracking-tighter">
            {isTeacher ? 'Cơ hội giảng dạy' : 'Khám phá tri thức'}
          </h2>
          <div className="flex items-center gap-4">
            <button className="text-primary hover:scale-110 transition-transform"><PlusCircle size={28} /></button>
            <button className="text-heading hover:scale-110 transition-transform"><Hash size={28} /></button>
          </div>
        </div>

        {/* Animated Tab Switcher */}
        <div className="flex p-1.5 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
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

      {/* Shared Stories Bar */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 px-1">
         <div className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer group">
            <div className="w-16 h-16 rounded-full border-2 border-primary p-0.5 group-hover:scale-105 transition-transform">
               <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-white border border-white">
                  <Sparkles size={24} />
               </div>
            </div>
            <span className="text-[10px] font-black text-primary uppercase">Thầy cô HOT</span>
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

      {/* Conditional Content rendering based on Tab */}
      <div className="space-y-6">
        {activeTab === 0 && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <GlassCard variant="white" noPadding className="flex items-center gap-3 px-4 py-3 border-emerald-100/30">
              <Search size={18} className="text-body/30" />
              <input 
                type="text" 
                placeholder={isTeacher ? "Tìm yêu cầu lớp học..." : "Tìm thầy cô, khóa học..."}
                className="flex-1 bg-transparent border-none focus:outline-none text-sm font-bold"
              />
              <div className="h-6 w-px bg-emerald-100" />
              <button className="p-1 hover:text-primary transition-colors"><Filter size={18} /></button>
            </GlassCard>

            <div className="flex gap-2 overflow-x-auto no-scrollbar">
               {categories.map(cat => (
                  <button key={cat} className="px-4 py-2 bg-white border border-emerald-100 rounded-full text-xs font-black text-body/50 hover:bg-primary hover:text-white hover:border-transparent transition-all whitespace-nowrap">
                     #{cat}
                  </button>
               ))}
            </div>
          </div>
        )}

        {/* Feed Content */}
        <div className="space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {(isParent || isStudent) ? (
            activeTab === 0 ? (
              suggestions.map((post, i) => (
                <MarketPost 
                  key={i} 
                  {...post} 
                  ctaLabel={isStudent ? "Đề xuất cho Bố/Mẹ" : "Đăng ký học ngay"}
                />
              ))
            ) : (
              <div className="py-20 text-center text-body/40 font-bold italic">Bạn chưa ghim đề xuất nào</div>
            )
          ) : (
            teacherOpportunities.map((item, i) => <MarketCard key={i} {...item} />)
          )}

          <div className="py-10 text-center space-y-4">
             <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto text-emerald-200">
                <Sparkles size={32} />
             </div>
             <p className="text-xs text-body/40 font-black uppercase tracking-widest italic">Hết nội dung cho mục này!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketplacePage;
