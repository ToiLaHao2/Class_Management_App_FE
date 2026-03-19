import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Star,
  Zap,
  CheckCircle2,
  Calendar,
  MoreHorizontal
} from 'lucide-react';
import { GlassCard } from '../../../shared/components/GlassCard';
import { StatusBadge } from '../../../shared/components/StatusBadge';

interface MarketPostProps {
  teacherName: string;
  avatar: string;
  subject: string;
  largeImage: string;
  description: string;
  rating: number;
  reviews: number;
  price: string;
  students: number;
  isVerified?: boolean;
  ctaLabel?: string;
}

export const MarketPost: React.FC<MarketPostProps> = ({
  teacherName,
  avatar,
  subject,
  largeImage,
  description,
  rating,
  reviews,
  price,
  students,
  isVerified = true,
  ctaLabel = "Đăng ký học thử ngay"
}) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <GlassCard variant="white" noPadding className="mb-8 overflow-hidden border-emerald-100/50 shadow-xl shadow-emerald-900/5">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4 bg-white/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-50 border-2 border-primary/20 flex items-center justify-center font-bold text-primary overflow-hidden">
            {avatar ? <img src={avatar} alt={teacherName} className="w-full h-full object-cover" /> : teacherName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-heading text-[13px]">{teacherName}</span>
              {isVerified && <CheckCircle2 size={12} className="text-blue-500 fill-blue-500/10" />}
            </div>
            <div className="text-[10px] font-bold text-body/50">Gợi ý từ Classify • {subject}</div>
          </div>
        </div>
        <button className="p-2 hover:bg-emerald-50 rounded-full transition-colors text-body/30">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Large Image Content */}
      <div className="relative aspect-video group overflow-hidden bg-emerald-50">
        <img 
          src={largeImage} 
          alt={subject} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2">
           <StatusBadge variant="primary" size="sm" className="bg-white/90 backdrop-blur-md shadow-lg border-none px-3 py-1.5 font-black text-primary">
              <Zap size={10} className="mr-1 fill-primary" /> HOT
           </StatusBadge>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
           <div className="flex items-center gap-4 text-white">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-xl border border-white/20">
                 <Star size={14} className="fill-amber-400 text-amber-400" />
                 <span className="text-sm font-black">{rating}</span>
                 <span className="text-[10px] opacity-70">({reviews})</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-xl border border-white/20">
                 <Calendar size={14} />
                 <span className="text-sm font-black">2 buổi/tuần</span>
              </div>
           </div>
        </div>
      </div>

      {/* Interactions Bar */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLiked(!liked)}
            className={`transition-all active:scale-125 ${liked ? 'text-rose-500' : 'text-heading hover:text-rose-500'}`}
          >
            <Heart size={24} fill={liked ? "currentColor" : "none"} strokeWidth={liked ? 0 : 2} />
          </button>
          <button className="text-heading hover:text-primary transition-colors">
            <MessageCircle size={24} />
          </button>
          <button className="text-heading hover:text-primary transition-colors">
            <Share2 size={24} />
          </button>
        </div>
        <button 
          onClick={() => setBookmarked(!bookmarked)}
          className={`transition-all active:scale-125 ${bookmarked ? 'text-amber-500' : 'text-heading hover:text-amber-500'}`}
        >
          <Bookmark size={24} fill={bookmarked ? "currentColor" : "none"} strokeWidth={bookmarked ? 0 : 2} />
        </button>
      </div>

      {/* Post Details */}
      <div className="px-5 pb-6 space-y-4">
        <div>
          <span className="font-extrabold text-heading text-[13px] mr-2">{teacherName}</span>
          <span className="text-[13px] text-body/80 font-medium leading-relaxed">
            {description}
          </span>
          <button className="text-[11px] text-body/40 font-bold ml-1 hover:text-primary">xem thêm...</button>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-black text-body/30 uppercase tracking-widest border-t border-emerald-50 pt-4">
          <span>{students} học sinh đang học</span>
          <span className="w-1 h-1 rounded-full bg-emerald-200" />
          <span>Học phí: {price}</span>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 py-3.5 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
            {ctaLabel}
          </button>
          <button className="px-5 py-3.5 bg-emerald-50 text-primary rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-100 transition-all">
            Nhắn tin
          </button>
        </div>
      </div>
    </GlassCard>
  );
};
