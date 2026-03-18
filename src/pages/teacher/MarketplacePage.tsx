import React from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  ArrowRight,
  BookOpen,
  GraduationCap
} from 'lucide-react';

const MarketplacePage: React.FC = () => {
  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-heading">Khám phá Marketplace</h2>
          <p className="text-sm text-body/60 mt-1 font-medium">Tìm kiếm cơ hội giảng dạy và học liệu mới nhất</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-body/30" size={18} />
            <input 
              type="text" 
              placeholder="Tìm môn học, giáo viên..." 
              className="w-full pl-11 pr-4 py-3 bg-white border border-emerald-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
            />
          </div>
          <button className="p-3 bg-white border border-emerald-100 rounded-2xl text-body/60 hover:text-primary hover:border-primary/30 transition-all shadow-sm">
            <Filter size={20} />
          </button>
        </div>
      </header>

      {/* Featured Packs / Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
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
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-[2.5rem] p-6 border border-emerald-100 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex gap-6">
            <div className="w-24 h-24 rounded-3xl bg-emerald-50 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform">
              {item.image}
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-full">{item.tag}</span>
              <h3 className="font-bold text-heading mt-2 group-hover:text-primary transition-colors">{item.title}</h3>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs font-bold">{item.rating}</span>
                </div>
                <span className="text-[10px] text-body/40 font-bold uppercase tracking-tight">({item.reviews} đánh giá)</span>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="font-bold text-primary">{item.price}</span>
                <button className="p-2 bg-emerald-50 rounded-xl text-primary opacity-0 group-hover:opacity-100 transition-all">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-bold text-heading mb-4 px-1">Danh mục phổ biến</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Toán học', icon: GraduationCap, color: 'emerald' },
            { name: 'Ngoại ngữ', icon: BookOpen, color: 'blue' },
            { name: 'Nghệ thuật', icon: GraduationCap, color: 'rose' },
            { name: 'Kỹ năng mềm', icon: BookOpen, color: 'amber' },
          ].map((cat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm hover:border-primary/30 transition-all cursor-pointer text-center group">
              <div className={`w-12 h-12 rounded-2xl bg-${cat.color}-50 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <cat.icon size={24} className={`text-${cat.color}-600`} />
              </div>
              <span className="font-bold text-heading text-sm">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketplacePage;
