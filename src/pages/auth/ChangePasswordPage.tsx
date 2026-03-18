import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { changePasswordApi } from '../../features/auth/api';
import { useAuthStore } from '../../stores/authStore';

const ChangePasswordPage = () => {
    const navigate = useNavigate();
    const user = useAuthStore((s) => s.user);
    const setUser = useAuthStore((s) => s.setUser);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [localError, setLocalError] = useState('');

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: () => changePasswordApi({ currentPassword, newPassword }),
        onSuccess: () => {
            if (user) {
                setUser({ ...user, mustChangePassword: false });
            }
            navigate('/', { replace: true });
        },
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword.length < 6) {
            setLocalError('Mật khẩu mới phải có ít nhất 6 ký tự.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setLocalError('Mật khẩu xác nhận không khớp.');
            return;
        }
        setLocalError('');
        mutate();
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-bg-app p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                        <span className="text-3xl">🔐</span>
                    </div>
                    <h1 className="text-3xl font-bold text-heading">Đổi mật khẩu</h1>
                    <p className="text-body mt-2">
                        {user?.mustChangePassword
                            ? 'Bạn cần đổi mật khẩu trước khi tiếp tục.'
                            : 'Cập nhật mật khẩu tài khoản của bạn.'}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl shadow-emerald-900/5 p-8 border border-emerald-100">
                    <form onSubmit={onSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="cp-current" className="block text-sm font-semibold text-heading mb-1.5">
                                Mật khẩu hiện tại
                            </label>
                            <input
                                id="cp-current"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full px-4 py-3 bg-bg-app border border-emerald-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all placeholder:text-body/40"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label htmlFor="cp-new" className="block text-sm font-semibold text-heading mb-1.5">
                                    Mật khẩu mới
                                </label>
                                <input
                                    id="cp-new"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                    className="w-full px-4 py-3 bg-bg-app border border-emerald-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all placeholder:text-body/40"
                                />
                            </div>

                            <div>
                                <label htmlFor="cp-confirm" className="block text-sm font-semibold text-heading mb-1.5">
                                    Xác nhận
                                </label>
                                <input
                                    id="cp-confirm"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                    className="w-full px-4 py-3 bg-bg-app border border-emerald-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all placeholder:text-body/40"
                                />
                            </div>
                        </div>

                        {localError && (
                            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                                <span className="text-red-400">⚠️</span>
                                <p className="text-sm text-red-600">{localError}</p>
                            </div>
                        )}

                        {isError && (
                            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                                <span className="text-red-400">⚠️</span>
                                <p className="text-sm text-red-600">
                                    {(error as any)?.response?.data?.message || 'Đổi mật khẩu thất bại. Vui lòng thử lại.'}
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full py-3 px-4 bg-primary hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold rounded-xl transition-all duration-200 cursor-pointer disabled:cursor-not-allowed shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98]"
                        >
                            {isPending ? 'Đang cập nhật...' : 'Đổi mật khẩu'}
                        </button>
                    </form>

                    {!user?.mustChangePassword && (
                        <div className="mt-6 pt-5 border-t border-emerald-100 text-center">
                            <Link to="/" className="text-primary hover:text-emerald-700 font-semibold transition-colors">
                                ← Quay lại
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordPage;

