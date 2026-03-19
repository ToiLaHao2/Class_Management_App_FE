import React from 'react';
import { 
  Search, 
  Filter, 
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { MarketplaceCard } from '../../features/teacher/components/MarketplaceCard';
import { GlassCard } from '../../shared/components/GlassCard';

const MarketplacePage: React.FC = () => {
  const featuredPacks = [
    {
      title: 'Gói học liệu Toán 9 Ôn thi vào 10',
      author: 'Teacher Minh',
      rating: 4.9,
      reviews: 128,
      price: '250.000đ',
      image: '📚',
      tag: 'Học liệu'
    },
    {
      title: 'Lớp Tiếng Anh Giao tiếp cấp tốc',
      author: 'Ms. Lan English',
      rating: 4.8,
      reviews: 56,
      price: '1.200.000đ',
      image: '🇬🇧',
      tag: 'Lớp học'
    }
  ];

  const categories = [
    { name: 'Toán học', icon: GraduationCap, color: 'emerald' },
    { name: 'Ngoại ngữ', icon: BookOpen, color: 'blue' },
    { name: 'Nghệ thuật', icon: GraduationCap, color: 'rose' },
    { name: 'Kỹ năng mềm', icon: BookOpen, color: 'amber' },
  ];

  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-heading">Khám phá Marketplace</h2>
          <p className="text-sm text-body/60 mt-1 font-bold">Tìm kiếm cơ hội giảng dạy và học liệu mới nhất</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-body/30" size={18} />
            <input 
              type="text" 
              placeholder="Tìm môn học, giáo viên..." 
              className="w-full pl-11 pr-4 py-3 bg-white border border-emerald-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-bold shadow-sm"
            />
          </div>
          <GlassCard noPadding className="p-3 cursor-pointer">
            <Filter size={20} className="text-body/60" />
          </GlassCard>
        </div>
      </header>

      {/* Featured Packs / Opportunities */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {featuredPacks.map((item, i) => (
          <MarketplaceCard key={i} {...item} />
        ))}
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-extrabold text-heading text-xl mb-6 px-1 italic">Danh mục phổ biến</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <GlassCard key={i} variant="white" className="text-center group p-6 cursor-pointer">
              <div className={`w-14 h-14 rounded-3xl bg-${cat.color}-50 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform group-hover:bg-primary group-hover:text-white`}>
                <cat.icon size={26} className={`text-${cat.color}-600 group-hover:text-white`} />
              </div>
              <span className="font-extrabold text-heading text-sm">{cat.name}</span>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketplacePage;
