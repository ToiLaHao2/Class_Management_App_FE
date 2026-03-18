# Class Management App - Frontend Boilerplate (Currently Setup)

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

## 🎨 Phong cách thiết kế (Design Style)

Ứng dụng được định hướng theo phong cách **"Clean & Friendly UI"**, biến một công cụ quản lý khô khan thành một **"không gian học tập thú vị"** dành cho trẻ em và Gen Z.

### 🍱 Hệ thống Bento Grid
Chúng tôi sử dụng cấu trúc **Bento Grid** cho các Dashboard. Các chức năng được chia thành các ô (cards) với kích thước khác nhau, bo tròn mềm mại, giúp giao diện trực quan, hiện đại và cực kỳ dễ thao tác trên cả desktop lẫn mobile.

### 🍭 Palette "Tươi Mới & Cảm Hứng"
Màu sắc được tuyển chọn để tạo cảm giác thư giãn nhưng vẫn đầy năng lượng:

| Thành phần | Màu sắc | Mã màu | Ý nghĩa |
|---|---|---|---|
| **Nền ứng dụng** | ![#F0FDF4](https://via.placeholder.com/15/F0FDF4/000000?text=+) | `#F0FDF4` | Xanh lá bạc hà cực nhạt, tạo sự thư giãn. |
| **Thẻ chức năng** | ![#FFFFFF](https://via.placeholder.com/15/FFFFFF/000000?text=+) | `#FFFFFF` | Trắng tinh khiết cho các ô Bento. |
| **Màu chủ đạo** | ![#059669](https://via.placeholder.com/15/059669/000000?text=+) | `#059669` | Xanh Emerald - Màu của sự phát triển. |
| **Tiêu đề** | ![#064E3B](https://via.placeholder.com/15/064E3B/000000?text=+) | `#064E3B` | Xanh lá đậm sâu, tạo sự tin cậy. |
| **Nội dung** | ![#475569](https://via.placeholder.com/15/475569/000000?text=+) | `#475569` | Xám trung tính, dễ đọc. |
| **Màu nhấn** | ![#FB7185](https://via.placeholder.com/15/FB7185/000000?text=+) | `#FB7185` | Hồng san hô - Dùng cho nút "Tim" hoặc "Yêu thích". |

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

---

## 📝 Use Cases (Các kịch bản sử dụng)

*Phần này dành cho bạn để liệt kê chi tiết các tính năng và luồng xử lý của ứng dụng (Ví dụ: Đăng ký giáo viên, Tạo lớp học mới, Điểm danh sinh viên...)*

### 1. Phân hệ Giáo viên / Gia sư (Teacher & Tutor)
- **Người dùng:** Giáo viên, Gia sư.
- **Mục tiêu:** Quản lý toàn diện quy trình dạy học và tương tác với học sinh.
- **Kịch bản chính:**
    - **Quản lý Học sinh/Nhóm:** Thêm, sửa, xóa học sinh và phân nhóm học tập để quản lý hiệu quả.
    - **Quản lý Buổi học:** Theo dõi số buổi học của từng học sinh để phục vụ điểm danh và tính học phí.
    - **Quản lý Học liệu:** Đăng tải bài giảng (lectures) và giao bài tập (assignments) trực tuyến.
    - **Tìm kiếm:** Tra cứu thông tin học sinh nhanh chóng trong hệ thống.

### 2. Phân hệ Học sinh (Student)
- **Người dùng:** Học sinh.
- **Mục tiêu:** Tự quản lý tiến độ học tập và thời gian cá nhân.
- **Kịch bản chính:**
    - **Quản lý Bài tập:** Xem danh sách bài tập được giao, nộp bài và xem phản hồi từ giáo viên.
    - **Lịch học & Thời gian biểu:** Theo dõi lịch học cố định và quản lý thời gian biểu cá nhân (Edge case: Tích hợp quản lý việc riêng).

### 3. Phân hệ Phụ huynh (Parents)
- **Người dùng:** Phụ huynh.
- **Mục tiêu:** Theo dõi sát sao việc học của con và kết nối với giáo viên phù hợp.
- **Kịch bản chính:**
    - **Theo dõi kết quả:** Xem điểm số, nhận xét và tiến độ học tập của học con theo thời gian thực.
    - **Tìm kiếm Giáo viên:** Đăng bài tuyển gia sư hoặc tìm kiếm giáo viên phù hợp dựa trên các tiêu chí (môn học, khu vực, đánh giá).
    - **Tạo tài khoản cho học sinh:** Tạo tài khoản cho riêng học sinh để dễ quản lý (hỗ trợ báo cáo tổng quan riêng cho từng trẻ nếu gia đình có nhiều con).

### 4. Phân hệ Quản trị viên (Admin)
- **Người dùng:** Admin hệ thống.
- **Mục tiêu:** Vận hành ổn định và tối ưu tài nguyên của nền tảng SAAS.
- **Kịch bản chính:**
    - **Quản lý Tài khoản:** Phê duyệt, khóa hoặc phân quyền cho các tài khoản trên hệ thống.
    - **Quản trị Tài nguyên:** Giám sát lưu trữ, băng thông và các tài nguyên dùng chung.
    - **Báo cáo & Dashboard:** Tổng hợp dữ liệu, xuất báo cáo doanh thu/tăng trưởng và giám sát hoạt động qua Dashboard tổng quan.

---

## 🔄 Business Workflows (Luồng xử lý nghiệp vụ)

*Mục này mô tả chi tiết các bước xử lý logic cho từng tính năng cụ thể, được tổ chức theo các **Domain (Bounded Context)** trong mô hình DDD.*

---

### Domain 1: `Auth` — Xác thực

#### 1.1. Đăng ký tài khoản (Registration)
- **Đối tượng:** Khách (Guest).
- **Luồng xử lý:**
    1. Chọn vai trò (Teacher / Student / Parent).
    2. Điền thông tin (Họ tên, Email, Mật khẩu, SĐT).
    3. Validation (Client-side + Server-side kiểm tra trùng lặp).
    4. Gửi yêu cầu tới API `POST /auth/register`.
    5. Xác thực qua OTP (nếu có).
    6. Khởi tạo Profile mặc định.
    7. Đăng nhập tự động hoặc chuyển hướng về trang Login.

#### 1.2. Đăng nhập (Login)
- **Đối tượng:** Tất cả người dùng.
- **Luồng xử lý:**
    1. Nhập Email/SĐT + Mật khẩu.
    2. Gửi yêu cầu tới API `POST /auth/login`.
    3. Nhận Access Token + Refresh Token (JWT).
    4. Lưu token vào bộ nhớ (Zustand Store / localStorage).
    5. Điều hướng về Dashboard theo vai trò.

#### 1.3. Khôi phục mật khẩu (Forgot Password)
- **Đối tượng:** Người dùng quên mật khẩu.
- **Luồng xử lý:**
    1. Nhập Email đã đăng ký.
    2. Gửi yêu cầu tới API `POST /auth/forgot-password`.
    3. Nhận mã OTP hoặc link đặt lại mật khẩu qua Email.
    4. Nhập mật khẩu mới + Xác nhận.
    5. Cập nhật thành công, chuyển về trang Login.

---

### Domain 2: `User` — Người dùng

#### 2.1. Xem & Cập nhật Profile
- **Đối tượng:** Tất cả người dùng đã đăng nhập.
- **Luồng xử lý:**
    1. Truy cập trang Profile cá nhân.
    2. Xem thông tin hiện tại (Avatar, Họ tên, Bio, Email, SĐT).
    3. Chỉnh sửa các trường cho phép.
    4. Gửi yêu cầu `PUT /users/me`.
    5. Cập nhật lại state trên UI (Zustand).

#### 2.2. Đổi mật khẩu (Change Password)
- **Đối tượng:** Tất cả người dùng đã đăng nhập.
- **Luồng xử lý:**
    1. Nhập mật khẩu cũ + mật khẩu mới.
    2. Validation (Client-side kiểm tra độ mạnh).
    3. Gửi yêu cầu `PUT /users/me/password`.
    4. Hiện thông báo thành công / thất bại.

---

### Domain 3: `Classroom` — Lớp học

#### 3.1. Tạo lớp học
- **Đối tượng:** Teacher.
- **Luồng xử lý:**
    1. Điền thông tin lớp (Tên, Mô tả, Môn học).
    2. Gửi yêu cầu `POST /classrooms`.
    3. Hệ thống tự sinh **Mã lớp (Class Code)** duy nhất.
    4. Chuyển hướng đến trang chi tiết lớp vừa tạo.

#### 3.2. Tham gia lớp học
- **Đối tượng:** Student.
- **Luồng xử lý:**
    1. Nhập Mã lớp (Class Code).
    2. Gửi yêu cầu `POST /classrooms/join`.
    3. Chờ Teacher phê duyệt (hoặc tự động vào nếu lớp mở).
    4. Nhận thông báo kết quả qua Socket.io.

#### 3.3. Quản lý thành viên
- **Đối tượng:** Teacher.
- **Luồng xử lý:**
    1. Xem danh sách sinh viên trong lớp.
    2. Phê duyệt / Từ chối yêu cầu vào lớp.
    3. Mời sinh viên ra khỏi lớp (Kick).
    4. Phân nhóm học tập (Grouping) trong lớp.

---

### Domain 4: `Course` — Học liệu

#### 4.1. Quản lý bài giảng (Lectures)
- **Đối tượng:** Teacher.
- **Luồng xử lý:**
    1. Chọn lớp học cần đăng tải.
    2. Tải lên file (PDF, Video, Link) kèm tiêu đề và mô tả.
    3. Gửi yêu cầu `POST /courses/{classId}/lectures`.
    4. Hệ thống thông báo cho học sinh trong lớp qua Socket.io.

#### 4.2. Giao & Nộp bài tập (Assignments)
- **Đối tượng:** Teacher (giao), Student (nộp).
- **Luồng xử lý (Teacher):**
    1. Tạo bài tập (Tiêu đề, Nội dung, Hạn nộp).
    2. Gửi yêu cầu `POST /courses/{classId}/assignments`.
    3. Học sinh nhận thông báo bài tập mới.
- **Luồng xử lý (Student):**
    1. Xem danh sách bài tập được giao.
    2. Nộp bài (File/Text) trước hạn.
    3. Gửi yêu cầu `POST /assignments/{id}/submit`.
    4. Xem phản hồi và điểm từ giáo viên.

---

### Domain 5: `Schedule` — Lịch trình

#### 5.1. Quản lý buổi học & Điểm danh
- **Đối tượng:** Teacher.
- **Luồng xử lý:**
    1. Lên lịch buổi học (Ngày, Giờ, Phòng/Online).
    2. Khi buổi học diễn ra, mở trang Điểm danh.
    3. Ghi nhận trạng thái từng học sinh (Có mặt / Vắng / Muộn).
    4. Gửi yêu cầu `POST /schedules/{id}/attendance`.
    5. Hệ thống tự động cộng dồn số buổi đã học.

#### 5.2. Thời gian biểu cá nhân
- **Đối tượng:** Student.
- **Luồng xử lý:**
    1. Xem lịch học cố định từ tất cả các lớp đã tham gia.
    2. Thêm sự kiện cá nhân (Edge: quản lý việc riêng).
    3. Giao diện hiển thị dạng Calendar (Ngày/Tuần/Tháng).

---

### Domain 6: `Family` — Gia đình

#### 6.1. Tạo tài khoản cho con
- **Đối tượng:** Parent.
- **Luồng xử lý:**
    1. Vào trang Quản lý Gia đình.
    2. Nhấn "Thêm con" -> Điền thông tin (Họ tên, Ngày sinh).
    3. Hệ thống tạo tài khoản Student liên kết với Parent.
    4. Cấp thông tin đăng nhập cho trẻ (hoặc tự động liên kết).

#### 6.2. Xem báo cáo học tập theo từng con
- **Đối tượng:** Parent.
- **Luồng xử lý:**
    1. Chọn Profile con cần xem (Switch Profile).
    2. Xem tổng quan: Điểm số, Tỷ lệ chuyên cần, Nhận xét từ giáo viên.
    3. Xem biểu đồ tiến bộ theo thời gian.

---

### Domain 7: `Market` — Thị trường

#### 7.1. Tìm kiếm giáo viên
- **Đối tượng:** Parent.
- **Luồng xử lý:**
    1. Nhập tiêu chí tìm kiếm (Môn học, Khu vực, Mức giá, Đánh giá).
    2. Hệ thống trả về danh sách giáo viên phù hợp.
    3. Xem Profile chi tiết của giáo viên.
    4. Gửi yêu cầu kết nối / liên hệ.

#### 7.2. Đăng bài tuyển gia sư
- **Đối tượng:** Parent.
- **Luồng xử lý:**
    1. Tạo bài đăng (Môn học, Lịch học mong muốn, Mức giá, Yêu cầu).
    2. Gửi yêu cầu `POST /market/posts`.
    3. Giáo viên xem và ứng tuyển.
    4. Phụ huynh chọn giáo viên phù hợp.

---

### Domain 8: `Finance` — Tài chính

#### 8.1. Quản lý học phí
- **Đối tượng:** Teacher (tạo), Parent (thanh toán).
- **Luồng xử lý:**
    1. Hệ thống tự động tính học phí dựa trên số buổi đã điểm danh.
    2. Tạo hóa đơn (Invoice) gửi đến Phụ huynh.
    3. Phụ huynh thanh toán online (nếu tích hợp cổng thanh toán).
    4. Hệ thống cập nhật trạng thái thanh toán.

---

### Domain 9: `System` — Hệ thống

#### 9.1. Quản trị tài khoản (Admin)
- **Đối tượng:** Admin.
- **Luồng xử lý:**
    1. Xem danh sách toàn bộ tài khoản trên hệ thống.
    2. Phê duyệt / Khóa / Phân quyền tài khoản.
    3. Xem nhật ký hoạt động (Audit Logs).

#### 9.2. Dashboard báo cáo
- **Đối tượng:** Admin.
- **Luồng xử lý:**
    1. Xem tổng quan: Số lượng User, Lớp học, Bài tập.
    2. Biểu đồ tăng trưởng người dùng theo thời gian.
    3. Giám sát tài nguyên hệ thống (Lưu trữ, Băng thông).
    4. Xuất báo cáo (CSV/PDF).
