import React from 'react';
import { Camera, Globe, Edit3, Star } from 'lucide-react';
import { StatusBadge } from '../../../shared/components/StatusBadge';

interface ProfileHeaderProps {
  user: {
    full_name: string;
    avatar_url?: string;
    avatar?: string;
  } | null;
  rating?: number;
  bio?: string;
  isVerified?: boolean;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, rating = 4.9 }) => {
  return (
    <div className="relative">
      <div className="h-64 w-full bg-gradient-to-r from-emerald-500 to-primary rounded-[3rem] shadow-lg overflow-hidden relative border-4 border-white shadow-emerald-900/10">
         <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         
         <div className="absolute inset-0 p-8 flex items-end justify-between gap-8">
            {/* Left Side: Avatar + Info */}
            <div className="flex items-center gap-6 pb-2">
               <div className="relative group flex-shrink-0">
                  <div className="w-32 h-32 rounded-[2.5rem] bg-white p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/20 transition-transform group-hover:scale-105">
                     <div className="w-full h-full rounded-[2.2rem] bg-emerald-50 flex items-center justify-center text-4xl font-black text-primary overflow-hidden">
                        {user?.full_name?.charAt(0).toUpperCase() ?? '?'}
                     </div>
                  </div>
                  <button className="absolute bottom-1 right-1 p-2.5 bg-white rounded-2xl shadow-xl border border-emerald-100 text-primary hover:scale-110 active:scale-95 transition-all group-hover:bg-primary group-hover:text-white">
                     <Camera size={18} />
                  </button>
               </div>
               <div className="space-y-1.5">
                  <h1 className="text-3xl font-black text-white leading-tight drop-shadow-md">
                     {user?.full_name || 'Giáo viên'}
                  </h1>
                  <div className="flex items-center gap-3">
                     <StatusBadge variant="primary" className="bg-emerald-400/30 border-white/20 text-white">Giáo viên xác thực</StatusBadge>
                     <div className="flex items-center gap-1.5 text-amber-400 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                        <Star size={16} fill="currentColor" />
                        <span className="text-sm font-black text-white">{rating}</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Side: Actions */}
            <div className="flex gap-4 pb-4">
               <button className="flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-2xl font-bold border border-white/20 transition-all text-sm whitespace-nowrap shadow-lg">
                  <Globe size={18} />
                  Xem trang công khai
               </button>
               <button className="flex items-center gap-2 px-6 py-3.5 bg-white text-primary rounded-2xl font-bold shadow-xl shadow-emerald-900/20 hover:scale-[1.02] active:scale-95 transition-all text-sm whitespace-nowrap border border-white">
                  <Edit3 size={18} />
                  Chỉnh sửa hồ sơ
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};
