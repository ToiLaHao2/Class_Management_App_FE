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
import { useTeacherClasses } from '../../features/teacher/hooks/useTeacherClasses';
import { ClassCard } from '../../features/teacher/components/ClassCard';
import { GlassCard } from '../../shared/components/GlassCard';

const TeacherDashboardPage: React.FC = () => {
  const { data: classes, isLoading } = useTeacherClasses();

  const stats = [
    { label: 'Lớp học', value: classes?.length.toString() || '0', icon: BookOpen, trend: { value: 'Theo thời gian thực', isPositive: true } },
    { label: 'Học sinh', value: classes?.reduce((acc, curr) => acc + curr.studentCount, 0).toString() || '0', icon: Users, trend: { value: 'Tổng số học sinh', isPositive: true } },
    { label: 'Trạng thái', value: 'Hoạt động', icon: CheckCircle2, trend: { value: 'Hệ thống ổn định', isPositive: true } },
  ];

  const activities = [
    {
      title: 'Chào mừng bạn quay lại!',
      time: 'Vừa xong',
      meta: 'Hệ thống',
      desc: 'Dữ liệu lớp học của bạn đã được đồng bộ hóa hoàn toàn với server Classify.',
      type: 'class'
    },
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
          <h3 className="font-bold text-heading text-xl">Lớp học hiện tại</h3>
          <button className="text-xs font-bold text-primary hover:underline uppercase tracking-wider">Xem tất cả</button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="h-48 bg-emerald-50/50 animate-pulse rounded-3xl border border-emerald-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {classes?.map((cls) => (
              <ClassCard 
                key={cls.id} 
                title={cls.name}
                students={cls.studentCount}
                schedule={cls.description || 'Chưa cập nhật mô tả'}
                type="Lớp học của tôi" 
                rating={5.0} 
              />
            ))}
            {classes?.length === 0 && (
              <div className="col-span-full p-12 text-center bg-white rounded-3xl border-2 border-dashed border-emerald-100 italic text-body/40">
                Bạn chưa có lớp học nào. Hãy tạo lớp học đầu tiên!
              </div>
            )}
          </div>
        )}
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
