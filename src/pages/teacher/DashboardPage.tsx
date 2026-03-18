import React from 'react';
import { 
  BookOpen, 
  Users, 
  ClipboardList, 
  TrendingUp, 
  MoreVertical,
  CheckCircle2
} from 'lucide-react';

const TeacherDashboardPage: React.FC = () => {
  return (
    <section className="space-y-8 animate-in fade-in duration-500">
      {/* Header / Stats Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Lớp học', value: '12', icon: BookOpen, color: 'emerald' },
          { label: 'Học sinh', value: '48', icon: Users, color: 'blue' },
          { label: 'Chờ chấm', value: '5', icon: ClipboardList, color: 'amber' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-emerald-100/50 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <stat.icon size={24} className={`text-${stat.color}-600`} />
            </div>
            <div className="text-3xl font-bold text-heading leading-tight">{stat.value}</div>
            <div className="text-xs font-bold text-body/40 uppercase tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Access / Active Classes */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="font-bold text-heading text-lg">Lớp học tiêu biểu</h3>
          <button className="text-xs font-bold text-primary hover:underline uppercase tracking-wider">Xem tất cả</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {['Toán 9A', 'Lý 10B', 'Hóa 11C', 'Anh 9D', 'Toán 12'].map((cls, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-36 h-44 rounded-[2.5rem] bg-white border border-emerald-100/50 p-6 flex flex-col items-center justify-center text-center transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <span className="text-2xl">📚</span>
              </div>
              <span className="font-bold text-heading text-sm">{cls}</span>
              <span className="text-[11px] text-body/50 mt-1 font-medium">12 học viên</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feed cards */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-2 px-1">
          <TrendingUp size={20} className="text-primary" />
          <h3 className="font-bold text-heading text-lg">Hoạt động mới nhất</h3>
        </div>

        {[
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
        ].map((item, idx) => (
          <article key={idx} className="bg-white rounded-[2.5rem] shadow-sm border border-emerald-100/50 p-6 hover:shadow-md transition-all">
            <header className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-primary border border-emerald-100">
                  {item.type === 'assignment' ? <ClipboardList size={24} /> : <BookOpen size={24} />}
                </div>
                <div>
                  <div className="font-bold text-heading text-base leading-snug">{item.title}</div>
                  <div className="flex items-center gap-2 text-xs text-body/50 font-semibold mt-1">
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
            <p className="text-sm text-body/80 leading-relaxed mb-6 px-1">
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
          </article>
        ))}
      </div>
    </section>
  );
};

export default TeacherDashboardPage;
