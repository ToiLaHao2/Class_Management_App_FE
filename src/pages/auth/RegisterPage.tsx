// src/pages/auth/RegisterPage.tsx
import { Link } from 'react-router-dom';
import { RegisterForm } from '../../features/auth';

const RegisterPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-bg-app p-4">
            <div className="w-full max-w-lg">
                {/* Logo & Branding */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                        <span className="text-3xl">🎓</span>
                    </div>
                    <h1 className="text-3xl font-bold text-heading">Tham gia Classify</h1>
                    <p className="text-body mt-2">Tạo tài khoản và bắt đầu hành trình học tập</p>
                </div>

                {/* Register Card */}
                <div className="bg-white rounded-2xl shadow-xl shadow-emerald-900/5 p-8 border border-emerald-100">
                    <RegisterForm />

                    <div className="mt-6 pt-5 border-t border-emerald-100 text-center">
                        <p className="text-sm text-body">
                            Đã có tài khoản?{' '}
                            <Link to="/login" className="text-primary hover:text-emerald-700 font-semibold transition-colors">
                                ← Đăng nhập
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

export default RegisterPage;
