import { useState, useEffect } from 'react';
import { useCurrentUser } from '../../features/auth/hooks/useCurrentUser';
import type { User } from '../../features/auth';

const ProfilePage = () => {
    const { data, isLoading, isError, updateProfile, updating } = useCurrentUser();
    const user = data as User | undefined;
    const [fullName, setFullName] = useState('');
    const [avatar, setAvatar] = useState('');
    useEffect(() => {
        if (user) {
            setFullName(user.fullName);
            setAvatar(user.avatar ?? '');
        }
    }, [user]);

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen bg-bg-app">Đang tải hồ sơ...</div>;
    }

    if (isError || !user) {
        return <div className="flex items-center justify-center min-h-screen bg-bg-app">Không tải được thông tin hồ sơ.</div>;
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile({ fullName, avatar: avatar || undefined });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-bg-app p-4">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl shadow-emerald-900/5 p-8 border border-emerald-100">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                        {user.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-heading">Hồ sơ cá nhân</h1>
                        <p className="text-sm text-body">
                            {user.email} • <span className="capitalize">{user.role}</span>
                        </p>
                    </div>
                </div>

                <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-heading mb-1.5">Họ và tên</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-4 py-3 bg-bg-app border border-emerald-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all placeholder:text-body/40"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-heading mb-1.5">Avatar URL</label>
                        <input
                            type="url"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                            placeholder="https://..."
                            className="w-full px-4 py-3 bg-bg-app border border-emerald-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all placeholder:text-body/40"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={updating}
                        className="w-full py-3 px-4 bg-primary hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold rounded-xl transition-all duration-200 cursor-pointer disabled:cursor-not-allowed shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98]"
                    >
                        {updating ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;

