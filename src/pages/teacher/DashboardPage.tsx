import React from 'react';
import { 
  BookOpen, 
  Users, 
  ClipboardList, 
  TrendingUp, 
  MoreVertical,
  CheckCircle2
} from 'lucide-react';
import { StatCard } from '../../shared/components/StatCard';
import { ClassCard } from '../../features/teacher/components/ClassCard';
import { GlassCard } from '../../shared/components/GlassCard';

const TeacherDashboardPage: React.FC = () => {
  const stats = [
    { label: 'Lớp học', value: '12', icon: BookOpen, trend: { value: '+2 tháng này', isPositive: true } },
    { label: 'Học sinh', value: '48', icon: Users, trend: { value: '+5 học sinh mới', isPositive: true } },
    { label: 'Chờ chấm', value: '5', icon: ClipboardList, trend: { value: 'Cần hoàn thành sớm', isPositive: false } },
  ];

  const featuredClasses = [
    { title: 'Toán 9A', students: 12, schedule: 'Thứ 2, 4, 6' },
    { title: 'Lý 10B', students: 8, schedule: 'Thứ 3, 5' },
    { title: 'Hóa 11C', students: 15, schedule: 'Thứ 7, CN' },
    { title: 'Anh 9D', students: 10, schedule: 'Thứ 2, 5' },
  ];

  const activities = [
    {
      title: 'Bài tập mới trong lớp Toán 9A',
      time: '2 phút trước',
      meta: 'Hạn nộp: 3 ngày nữa',
      desc: 'Hoàn thành 5 bài tập về hệ phương trình bậc nhất hai ẩn trong sách bài tập, trang 45.',
      type: 'assignment'
    },
    {
      title: 'Lớp tiếng Anh mới được mở',
      time: '30 phút trước',
      meta: 'Teacher Linh',
      desc: 'Luyện nói theo chủ đề với giáo viên nước ngoài, tối thứ 3 & 5 hàng tuần.',
      type: 'class'
    }
  ];

  return (
    <section className="space-y-8 animate-in fade-in duration-500">
      {/* Header / Stats Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Quick Access / Active Classes */}
      <div>
        <div className="flex items-center justify-between mb-6 px-1">
          <h3 className="font-bold text-heading text-xl">Lớp học tiêu biểu</h3>
          <button className="text-xs font-bold text-primary hover:underline uppercase tracking-wider">Xem tất cả</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredClasses.map((cls, idx) => (
            <ClassCard 
              key={idx} 
              {...cls} 
              type="Môn học" 
              rating={5.0} 
            />
          ))}
        </div>
      </div>

      {/* Feed cards */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-2 px-1">
          <TrendingUp size={22} className="text-primary" />
          <h3 className="font-bold text-heading text-xl">Hoạt động mới nhất</h3>
        </div>

        {activities.map((item, idx) => (
          <GlassCard key={idx} variant="white" className="hover:-translate-y-1">
            <header className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-primary border border-emerald-100">
                  {item.type === 'assignment' ? <ClipboardList size={24} /> : <BookOpen size={24} />}
                </div>
                <div>
                  <div className="font-extrabold text-heading text-base leading-snug">{item.title}</div>
                  <div className="flex items-center gap-2 text-xs text-body/50 font-bold mt-1">
                    <span>{item.time}</span>
                    <span className="w-1 h-1 rounded-full bg-emerald-200" />
                    <span className="text-primary">{item.meta}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-emerald-50 rounded-xl transition-colors">
                <MoreVertical size={18} className="text-body/30" />
              </button>
            </header>
            <p className="text-sm text-body/70 leading-relaxed mb-6 px-1">
              {item.desc}
            </p>
            <div className="flex items-center gap-3">
              <button className="flex-1 py-3.5 bg-emerald-50 hover:bg-primary hover:text-white text-primary text-sm font-bold rounded-2xl transition-all duration-300">
                Xem chi tiết
              </button>
              <button className="p-3.5 bg-white border border-emerald-100 hover:border-emerald-300 rounded-2xl transition-colors group">
                <CheckCircle2 size={22} className="text-emerald-500 transition-transform group-hover:scale-110" />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

export default TeacherDashboardPage;
