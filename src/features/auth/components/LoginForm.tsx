// src/features/auth/components/LoginForm.tsx
import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { mutate: login, isPending, isError, error } = useLogin();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login({ email, password });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label htmlFor="login-email" className="block text-sm font-semibold text-heading mb-1.5">
                    Email
                </label>
                <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 bg-bg-app border border-emerald-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all placeholder:text-body/40"
                />
            </div>

            <div>
                <label htmlFor="login-password" className="block text-sm font-semibold text-heading mb-1.5">
                    Mật khẩu
                </label>
                <input
                    id="login-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full px-4 py-3 bg-bg-app border border-emerald-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all placeholder:text-body/40"
                />
            </div>

            {isError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                    <span className="text-red-400">⚠️</span>
                    <p className="text-sm text-red-600">
                        {(error as any)?.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.'}
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
                        Đang xử lý...
                    </span>
                ) : 'Đăng nhập'}
            </button>
        </form>
    );
};
