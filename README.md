# Class Management App - Frontend Boilerplate

Chào mừng bạn đến với dự án **Class Management App (Frontend)**! 

Dự án này được thiết kế dựa trên triết lý **"Lego" (Feature-Based Architecture / FSD - Feature-Sliced Design)**. Kiến trúc này mang âm hưởng của **DDD (Domain-Driven Design)** từ Backend nhưng được tinh chỉnh thực dụng và gọn nhẹ nhất cho Frontend, giúp dự án linh hoạt, dễ mở rộng và đặc biệt: **Dễ dàng xóa bỏ/thêm mới tính năng mà không để lại rác (side-effects)**.

---

## 🛠 Tech Stack (Bộ công cụ)

Sự kết hợp hoàn hảo này mang lại hiệu suất cao, phát triển nhanh và quản lý state rạch ròi:

- **Core:** [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/) (Nhanh, nhẹ, HMR tức thời)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Module hóa UI, không lo đụng độ CSS)
- **Client State Management:** [Zustand](https://github.com/pmndrs/zustand) (Quản lý state UI gọn nhẹ, thay thế Redux)
- **Server State Management:** [TanStack Query](https://tanstack.com/query/latest) (Tự động fetch, cache, và đồng bộ dữ liệu API)
- **Real-time Communication:** [Socket.io-client](https://socket.io/) (Xử lý kết nối WebSocket hai chiều theo thời gian thực)
- **Routing:** [React Router](https://reactrouter.com/)

---

## 🏛 Kiến trúc thư mục (Lego Architecture)

Kiến trúc thư mục được chia làm hai khu vực chính: **Phần Lõi (Core/Shared)** và **Các Khối Tính Năng (Features/Domains)**.

```text
src/
├── assets/             # Hình ảnh, fonts, file tĩnh (logo.png, icons...)
│
├── components/         # 🧩 CÁC MẢNH LEGO DÙNG CHUNG (UI Components)
│   ├── Button/         # Ví dụ: Nút bấm (dùng chung toàn app)
│   ├── Modal/          # Ví dụ: Modal/Dialog
│   └── index.ts        # Export tập trung các UI components
│
├── core/               # ⚙️ CẤU HÌNH CỐT LÕI (Align với BE)
│   ├── config/         # Cấu hình tĩnh (env.ts, constants.ts)
│   ├── http/           # Cấu hình gọi API (tương đương axios.ts)
│   ├── socket/         # Khởi tạo kết nối Socket.io toàn app
│   └── query/          # Cấu hình mặc định cho TanStack Query
│
├── hooks/              # 🪝 CÁC CUSTOM HOOKS DÙNG CHUNG TOÀN APP
│   └── useDebounce.ts  # Logic delay hỗ trợ tìm kiếm...
│
├── stores/             # 📦 CLIENT STATE TOÀN CỤC (ZUSTAND)
│   └── authStore.ts    # Lưu thông tin user đang UI (Navbar, Profile)
│
├── features/           # 🚀 NƠI ĐẶT CÁC TÍNH NĂNG (THEO CHUẨN LEGO / DOMAIN)
│   │                   # Quy tắc: Tính năng nào nằm trọn thư mục đó!
│   │
│   ├── auth/           # Domain: Xác thực người dùng
│   │   ├── api.ts      # Gọi API (login, register) của TanStack Query
│   │   ├── hooks/      # Hook riêng (VD: useLogin.ts)
│   │   ├── components/ # Component giao diện riêng (LoginForm.tsx, ...)
│   │   └── index.ts    # Public API của feature này ra ngoài
│   │
│   └── classes/        # Tương đương module: courses/assignments (Bên BE)
│       ├── api.ts      # Gọi API (getClasses, createClass...)
│       ├── hooks/      # (VD: useClasses.ts, useCreateClass.ts)
│       ├── components/ # (VD: ClassList.tsx, ClassDetail.tsx...)
│       ├── socket/     # Lắng nghe/phát event socket riêng cho Class (VD: Cập nhật sĩ số realtime)
│       ├── types/      # Định nghĩa TypeScript riêng cho Class
│       └── index.ts    
│
├── pages/              # 🖥 CÁC TRANG DIỆN MẠO (Composed Views)
│   ├── Login/          # Lắp ghép tính năng Auth
│   │   └── LoginPage.tsx
│   ├── Dashboard/      # Trang tổng quan
│   │   └── DashboardPage.tsx
│   └── index.ts        # Export tập trung các pages
│
├── routes/             # 🛣 QUẢN LÝ ĐIỀU HƯỚNG BẰNG REACT ROUTER
│   ├── AppRoutes.tsx   # Định nghĩa đường dẫn (Gọi các Pages tại đây)
│   └── ProtectedRoute.tsx # Phân quyền truy cập
│
├── types/              # 🏷 KHAI BÁO KIỂU DỮ LIỆU TYPESCRIPT TOÀN CỤC
│   └── index.ts        # (VD: CommonResponse, Pagination...)
│
├── utils/              # 🧰 CÁC HÀM TIỆN ÍCH DÙNG CHUNG
│   ├── formatTime.ts   # Xử lý ngày tháng
│   └── formatCurrency.ts # Xử lý tiền tệ
│
├── App.tsx             # Gốc của ứng dụng, bọc các Provider (React Query, Router)
└── main.tsx            # Điểm bắt đầu (Mount React vào HTML)
```

---

## 🔌 Xử lý Real-time (Socket.io)

Với hệ thống có tính năng thời gian thực (real-time) tương tác với qua Socket.io, chúng ta sẽ quản lý như sau để không làm bề bộn kiến trúc:

1. **Khởi tạo tập trung (Singleton):** File `src/core/socket/index.ts` sẽ chịu trách nhiệm `io.connect(URL)` và export duy nhất *một* instance socket. Nơi này cũng sẽ xử lý các logic chung như: Re-connect, gắn Token vào WebSocket...
2. **Lắng nghe phân tán (Feature-based Events):** Không dồn tất cả `socket.on(...)` vào chung một file `App.tsx`! Điều này sẽ biến file App thành mớ hỗn độn.
   Thay vào đó, những event thuộc về ai, người đó tự `on/off`:
   * Ví dụ: Khi user vào màn hình danh sách Lớp học, tại *Component* của thư mục `features/classes/`, chúng ta sẽ dùng hook (hoặc useEffect) để `socket.on('NEW_CLASS_CREATED')`. Khi Component unmount (user rời đi), chúng ta sẽ `socket.off(...)`.
   * **Kết hợp hoàn hảo với TanStack Query:** Khi socket nhận event mới, ta thường gọi `queryClient.invalidateQueries(['classes'])` để TanStack Query tự *chạy ngầm API* lấy dữ liệu mới nhét vào View, ta không cần phải tự chèn data bằng tay vào State phức tạp!

---

## 🧱 Hướng dẫn "Chơi Lego" (Phát triển tính năng)

### 1. Luồng Lắp Ráp Nâng Cao (Page Composition)
Mô hình "Lego" hoạt động hoàn hảo khi bạn phân tách rõ **Logic (Feature)** và **Hiển thị (Page)**:

* **Feature (`src/features/...`):** Là những khối Lego đặc. Mỗi khối chứa đủ Logic, API, UI cục bộ (Ví dụ: `LoginForm.tsx` có nút Đăng nhập, có gọi API kiểm tra mật khẩu).
* **Page (`src/pages/...`):** Là TẤM BẢN ĐỒ. Nó **KHÔNG THEO ĐUỔI LOGIC PHỨC TẠP**, nó chỉ làm nhiệm vụ sắp xếp các khối Lego lên màn hình.
  * _Ví dụ:_ File `pages/Login/LoginPage.tsx` chỉ đơn giản là gọi thẻ `<Header />` (từ components chung), ghép với `<LoginForm />` (import từ feature `auth`), và thêm một cái Footer.
* **Router (`src/routes/AppRoutes.tsx`):** Chỉ làm việc với `pages/`. Khi url là `/login`, nó render `<LoginPage />`.

### 2. Tạo một tính năng mới (Thêm khối Lego)
Khi bạn cần làm một tính năng mới, ví dụ: **Quản lý Sinh viên (Students)**.
Hãy tạo một thư mục mới tại `src/features/students/` và cô lập toàn bộ logic, giao diện, API của sinh viên vào trong thư mục này.
- `students/api.ts`: Nơi chứa config gọi API lấy danh sách sinh viên.
- `students/hooks/useStudents.ts`: Sử dụng TanStack Query gọi file API trên.
- `students/components/StudentList.tsx`: Gọi Hook trên để render danh sách ra UI.
- `students/index.ts`: Export `StudentList` ra ngoài.

Sau đó, qua `src/pages/Students/` tạo `StudentsPage.tsx` để import và bọc `StudentList` vào Layout.

Cuối cùng, vào `src/routes/AppRoutes.tsx` để gán `StudentsPage` vào Route `/students`. Xong!

### 3. Xóa một tính năng (Tháo khối Lego)
Giả sử dự án này được deploy cho một trung tâm không cần tính năng **Quản lý Sinh viên**.
1. Vào thư mục `src/features/`, **xóa thẳng tay thư mục `students/`**.
2. Vào thư mục `src/pages/`, **xóa thư mục `Students/`**.
3. Vào thư mục `src/routes/AppRoutes.tsx`, xóa dòng config đường dẫn chứa chữ `/students`.
🎉 **Kết quả:** Dự án sạch bóng tính năng Sinh viên! CSS bị xóa, API bị xóa, Logic (Query/Zustand) bị xóa. Không để lại mã rác tàn dư nào.

---

## ⚔️ Quy tắc "Sạch" (Clean Rules)

1. **Feature KHÔNG gọi Feature khác:** Thư mục `features/classes/` không được can thiệp sâu (import file ở tít bên trong) của `features/auth/` và ngược lại. Khối Lego nên độc lập bề mặt.
2. **Chỉ giao tiếp qua `index.ts`:** Bất kỳ file nào ngoài `features/A/` muốn dùng đồ của `features/A/` thì CHỈ ĐƯỢC PHÉP import thông qua `features/A/index.ts` (Giống như interface public của Domain).
3. **Phân định rạch ròi State:**
   - Dữ liệu gọi từ Backend về UI ➡️ Dùng **TanStack Query** (Khai báo trong `features/.../hooks/`).
   - Trạng thái UI (Theme, Sidebar, Form Step) ➡️ Dùng **Zustand** (Khai báo trong `stores/` hoặc `features/.../stores/`).
