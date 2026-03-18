import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const navByRole = (role: string | undefined) => {
  const base = [
    { to: '/', label: 'Trang chủ' },
    { to: '/profile', label: 'Hồ sơ' },
  ];

  if (role === 'teacher') {
    return [
      { to: '/', label: 'Trang chủ' },
      { to: '/classes', label: 'Lớp học' },
      { to: '/assignments', label: 'Bài tập' },
      { to: '/messages', label: 'Tin nhắn' },
      { to: '/notifications', label: 'Thông báo' },
      { to: '/profile', label: 'Hồ sơ' },
    ];
  }

  if (role === 'student') {
    return [
      { to: '/', label: 'Trang chủ' },
      { to: '/classes', label: 'Lớp của tôi' },
      { to: '/assignments', label: 'Bài tập của tôi' },
      { to: '/messages', label: 'Tin nhắn' },
      { to: '/notifications', label: 'Thông báo' },
      { to: '/profile', label: 'Hồ sơ' },
    ];
  }

  if (role === 'parent') {
    return [
      { to: '/', label: 'Trang chủ' },
      { to: '/children', label: 'Con của tôi' },
      { to: '/classes', label: 'Lớp học' },
      { to: '/notifications', label: 'Thông báo' },
      { to: '/profile', label: 'Hồ sơ' },
    ];
  }

  if (role === 'admin') {
    return [
      { to: '/', label: 'Dashboard' },
      { to: '/users', label: 'Tài khoản' },
      { to: '/reports', label: 'Báo cáo' },
      { to: '/notifications', label: 'Thông báo' },
      { to: '/profile', label: 'Hồ sơ' },
    ];
  }

  return base;
};

export const MainLayout = () => {
  const user = useAuthStore((s) => s.user);

  const navItems = navByRole(user?.role);

  return (
    <div className="min-h-screen bg-bg-app text-body">
      <div className="max-w-6xl mx-auto flex">
        {/* Sidebar left */}
        <aside className="hidden md:flex md:flex-col md:w-60 border-r border-emerald-100 py-6 px-4">
          <div className="flex items-center gap-2 mb-8 px-2">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-xl">
              📚
            </div>
            <div>
              <div className="font-bold text-heading leading-tight">Classify</div>
              <div className="text-xs text-body/70">Không gian học tập thú vị</div>
            </div>
          </div>

          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-emerald-50 text-sm font-medium text-heading"
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {user && (
            <div className="mt-4 px-2">
              <div className="flex items-center gap-3 p-2 rounded-xl bg-white shadow-sm border border-emerald-100">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <div className="text-xs">
                  <div className="font-semibold text-heading truncate max-w-[8rem]">{user.fullName}</div>
                  <div className="text-body/60 truncate max-w-[8rem]">{user.email}</div>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Main + right panel */}
        <main className="flex-1 grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-6 py-6 px-4 md:px-6">
          {/* Center feed */}
          <section>
            {/* Stories row */}
            <div className="flex gap-3 overflow-x-auto pb-3 mb-4">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-20 h-24 rounded-2xl bg-white border border-emerald-100 flex flex-col items-center justify-center text-xs text-body/80"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 mb-2" />
                  <span className="truncate max-w-[4rem]">Lớp {idx + 1}</span>
                </div>
              ))}
            </div>

            {/* Feed cards */}
            <div className="space-y-4">
              <article className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-4">
                <header className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10" />
                  <div>
                    <div className="text-sm font-semibold text-heading">
                      Bài tập mới trong lớp Toán 9A
                    </div>
                    <div className="text-xs text-body/60">2 phút trước • Hạn nộp: 3 ngày nữa</div>
                  </div>
                </header>
                <p className="text-sm text-body mb-3">
                  Hoàn thành 5 bài tập về hệ phương trình bậc nhất hai ẩn trong sách bài tập, trang 45.
                </p>
                <button className="text-sm font-semibold text-primary hover:text-emerald-700">
                  Xem chi tiết →
                </button>
              </article>

              <article className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-4">
                <header className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10" />
                  <div>
                    <div className="text-sm font-semibold text-heading">
                      Lớp tiếng Anh mới được mở
                    </div>
                    <div className="text-xs text-body/60">30 phút trước • Teacher Linh</div>
                  </div>
                </header>
                <p className="text-sm text-body mb-3">
                  Luyện nói theo chủ đề với giáo viên nước ngoài, tối thứ 3 & 5 hàng tuần.
                </p>
                <button className="text-sm font-semibold text-primary hover:text-emerald-700">
                  Xem lớp học →
                </button>
              </article>
            </div>
          </section>

          {/* Right panel */}
          <aside className="hidden md:block">
            <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-4 mb-4">
              <div className="text-sm font-semibold text-heading mb-2">
                Gợi ý cho bạn
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-heading">Lớp Toán nâng cao</div>
                    <div className="text-xs text-body/60">Thứ 2,4,6 • 19:00</div>
                  </div>
                  <button className="text-xs font-semibold text-primary hover:text-emerald-700">
                    Xem
                  </button>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-heading">Tiếng Anh giao tiếp</div>
                    <div className="text-xs text-body/60">Thứ 7, CN • 9:00</div>
                  </div>
                  <button className="text-xs font-semibold text-primary hover:text-emerald-700">
                    Xem
                  </button>
                </li>
              </ul>
            </div>

            <div className="bg-bg-app rounded-2xl border border-dashed border-emerald-200 p-4 text-xs text-body/80">
              <div className="font-semibold text-heading mb-1">Mẹo nhỏ ✨</div>
              <p>
                Đây chỉ là layout demo. Khi triển khai thật, mỗi card sẽ hiển thị dữ liệu thật từ
                API (classrooms, assignments, notifications) dựa trên role của bạn.
              </p>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

