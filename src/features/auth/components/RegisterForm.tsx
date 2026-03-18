// src/features/auth/components/RegisterForm.tsx
import { useState } from 'react';
import { useRegister } from '../hooks/useRegister';
import type { RegisterRequest } from '../types';

const ROLE_OPTIONS = [
    { value: 'teacher', label: '👨‍🏫 Giáo viên / Gia sư', desc: 'Quản lý lớp học và học sinh' },
    { value: 'student', label: '🎓 Học sinh', desc: 'Theo dõi bài tập và lịch học' },
    { value: 'parent', label: '👨‍👩‍👧 Phụ huynh', desc: 'Theo dõi con và tìm gia sư' },
] as const;

export const RegisterForm = () => {
    const [formData, setFormData] = useState<RegisterRequest>({
        fullName: '',
        email: '',
        password: '',
        role: 'student',
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { mutate: register, isPending, isError, error } = useRegister();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== confirmPassword) {
            setPasswordError('Mật khẩu xác nhận không khớp!');
            return;
        }
        setPasswordError('');
        register(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Selector - Card Style */}
            <div>
                <label className="block text-sm font-semibold text-heading mb-2">
                    Bạn là ai?
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {ROLE_OPTIONS.map((opt) => (
                        <button
                            type="button"
                            key={opt.value}
                            onClick={() => setFormData((prev) => ({ ...prev, role: opt.value }))}
                            className={`p-3 rounded-xl border-2 text-center transition-all duration-200 cursor-pointer ${
                                formData.role === opt.value
                                    ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                                    : 'border-emerald-100 bg-white hover:border-emerald-200 hover:bg-bg-app'
                            }`}
                        >
                            <span className="text-2xl block mb-1">{opt.label.split(' ')[0]}</span>
                            <span className={`text-xs font-medium block ${
                                formData.role === opt.value ? 'text-primary' : 'text-body'
                            }`}>
                                {opt.label.split(' ').slice(1).join(' ')}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label htmlFor="register-fullname" className="block text-sm font-semibold text-heading mb-1.5">
                    Họ và tên
                </label>
                <input
                    id="register-fullname"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Nguyễn Văn A"
                    required
                    className="w-full px-4 py-3 bg-bg-app border border-emerald-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all placeholder:text-body/40"
                />
            </div>

            <div>
                <label htmlFor="register-email" className="block text-sm font-semibold text-heading mb-1.5">
                    Email
                </label>
                <input
                    id="register-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 bg-bg-app border border-emerald-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all placeholder:text-body/40"
                />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label htmlFor="register-password" className="block text-sm font-semibold text-heading mb-1.5">
                        Mật khẩu
                    </label>
                    <input
                        id="register-password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                        minLength={6}
                        className="w-full px-4 py-3 bg-bg-app border border-emerald-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all placeholder:text-body/40"
                    />
                </div>

                <div>
                    <label htmlFor="register-confirm" className="block text-sm font-semibold text-heading mb-1.5">
                        Xác nhận
                    </label>
                    <input
                        id="register-confirm"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            if (passwordError) setPasswordError('');
                        }}
                        placeholder="••••••••"
                        required
                        minLength={6}
                        className={`w-full px-4 py-3 bg-bg-app border rounded-xl focus:ring-2 outline-none transition-all placeholder:text-body/40 ${
                            passwordError
                                ? 'border-accent focus:ring-accent/30 focus:border-accent'
                                : 'border-emerald-200 focus:ring-primary/30 focus:border-primary'
                        }`}
                    />
                </div>
            </div>

            {passwordError && (
                <p className="text-sm text-accent flex items-center gap-1">
                    <span>⚠️</span> {passwordError}
                </p>
            )}

            {isError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                    <span className="text-red-400">⚠️</span>
                    <p className="text-sm text-red-600">
                        {(error as any)?.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.'}
                    </p>
                </div>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 px-4 bg-primary hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold rounded-xl transition-all duration-200 cursor-pointer disabled:cursor-not-allowed shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98]"
            >
                {isPending ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Đang tạo tài khoản...
                    </span>
                ) : 'Tạo tài khoản'}
            </button>
        </form>
    );
};
