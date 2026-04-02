// src/features/parent/pages/RegisterChildPage.tsx
import { useState } from 'react';
import { useRegisterChild } from '../hooks/useRegisterChild';
import { useNavigate } from 'react-router-dom';

export default function RegisterChildPage() {
    const [username, setUsername] = useState('');
    const [full_name, setFullName] = useState('');
    const { mutate: registerChild, isPending, isSuccess, isError, error } = useRegisterChild();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        registerChild({ username, full_name });
    };

    if (isSuccess) {
        return (
            <div className="max-w-2xl mx-auto p-8 text-center bg-white rounded-3xl shadow-xl mt-10">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                    ✅
                </div>
                <h1 className="text-2xl font-bold text-heading mb-4">Đăng ký thành công!</h1>
                <p className="text-body mb-8">
                    Tài khoản của <span className="font-bold text-primary">{username}</span> đã được tạo sẵn sàng.
                    <br />
                    Mật khẩu mặc định là: <code className="bg-emerald-50 px-2 py-1 rounded text-primary font-mono">Classify@123</code>
                </p>
                <button 
                    onClick={() => navigate('/kids')}
                    className="px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all"
                >
                    Quay lại danh sách con
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto py-10 px-4">
            <div className="bg-white rounded-3xl shadow-xl shadow-emerald-900/5 p-8 border border-emerald-100">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-heading">Đăng ký tài khoản cho con</h1>
                    <p className="text-body text-sm mt-2">Tạo tài khoản học tập riêng để con có thể theo dõi bài giảng và nộp bài.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-heading mb-2">Họ và tên của con</label>
                        <input 
                            id="child-fullname"
                            type="text"
                            required
                            placeholder="VD: Nguyễn Văn A"
                            className="w-full px-4 py-3 bg-bg-app border border-emerald-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                            value={full_name}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-heading mb-2">Tên đăng nhập (Username)</label>
                        <input 
                            id="child-username"
                            type="text"
                            required
                            placeholder="VD: van_a_2024"
                            className="w-full px-4 py-3 bg-bg-app border border-emerald-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <p className="text-xs text-body/60 mt-2 italic">
                            * Lưu ý: Con sẽ dùng tên này để đăng nhập vào ứng dụng.
                        </p>
                    </div>

                    <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                        <p className="text-xs text-amber-700 leading-relaxed">
                            💡 <strong>Ghi nhớ:</strong> Mật khẩu mặc định sau khi tạo là <span className="font-mono font-bold">Classify@123</span>. 
                            Bạn nên yêu cầu con đổi mật khẩu ở lần đăng nhập đầu tiên để bảo mật.
                        </p>
                    </div>

                    {isError && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
                            {(error as any)?.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.'}
                        </div>
                    )}

                    <button 
                        type="submit"
                        disabled={isPending}
                        className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-emerald-700 disabled:bg-emerald-300 shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
                    >
                        {isPending ? 'Đang tạo tài khoản...' : 'Xác nhận tạo tài khoản 🚀'}
                    </button>
                </form>
            </div>
        </div>
    );
}
