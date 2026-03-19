import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { GlassCard } from '../../../shared/components/GlassCard';
import { StatusBadge } from '../../../shared/components/StatusBadge';

interface MarketCardProps {
  title: string;
  author: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
  tag: string;
}

export const MarketCard: React.FC<MarketCardProps> = ({
  title,
  author,
  rating,
  reviews,
  price,
  image,
  tag
}) => {
  return (
    <GlassCard variant="white" className="group flex gap-6 cursor-pointer" noPadding>
      <div className="w-24 h-full min-h-[6rem] sm:w-32 sm:h-32 rounded-[2rem] bg-emerald-50 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform m-2 flex-shrink-0">
        {image}
      </div>
      <div className="flex-1 py-4 pr-6 flex flex-col justify-center">
        <div className="flex items-center justify-between">
           <StatusBadge variant="primary">{tag}</StatusBadge>
           <span className="text-[10px] font-bold text-body/40">bởi {author}</span>
        </div>
        <h3 className="font-extrabold text-heading mt-2 group-hover:text-primary transition-colors leading-tight">{title}</h3>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-black">{rating}</span>
          </div>
          <span className="text-[10px] text-body/40 font-bold uppercase tracking-tight">({reviews} đánh giá)</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="font-black text-primary text-base">{price}</span>
          <button className="p-2 bg-emerald-50 rounded-xl text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </GlassCard>
  );
};
