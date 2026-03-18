// src/pages/auth/LoginPage.tsx
import { Link } from 'react-router-dom';
import { LoginForm } from '../../features/auth';

const LoginPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-bg-app p-4">
            <div className="w-full max-w-md">
                {/* Logo & Branding */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                        <span className="text-3xl">📚</span>
                    </div>
                    <h1 className="text-3xl font-bold text-heading">Chào mừng trở lại!</h1>
                    <p className="text-body mt-2">Đăng nhập vào <span className="font-semibold text-primary">Classify</span> để tiếp tục</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-xl shadow-emerald-900/5 p-8 border border-emerald-100">
                    <LoginForm />

                    <div className="mt-6 pt-5 border-t border-emerald-100 text-center">
                        <p className="text-sm text-body">
                            Chưa có tài khoản?{' '}
                            <Link to="/register" className="text-primary hover:text-emerald-700 font-semibold transition-colors">
                                Đăng ký miễn phí →
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-body/60 mt-6">
                    © 2026 Classify — Không gian học tập thú vị 🌱
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
