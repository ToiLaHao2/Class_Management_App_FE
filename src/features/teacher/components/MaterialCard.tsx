import React from 'react';
import { Download, MoreHorizontal } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { GlassCard } from '../../../shared/components/GlassCard';

interface MaterialCardProps {
  title: string;
  date: string;
  size: string;
  icon: LucideIcon;
  color?: string;
}

export const MaterialCard: React.FC<MaterialCardProps> = ({
  title,
  date,
  size,
  icon: Icon,
  color = 'emerald'
}) => {
  return (
    <GlassCard variant="white" className="group flex items-center gap-5 p-5 hover:shadow-md transition-all">
      <div className={`w-14 h-14 rounded-3xl bg-${color}-50 flex items-center justify-center text-${color}-600 group-hover:scale-110 transition-transform duration-300`}>
         <Icon size={28} />
      </div>
      <div className="flex-1">
         <h4 className="font-extrabold text-heading text-base group-hover:text-primary transition-colors leading-tight">{title}</h4>
         <div className="flex items-center gap-2 text-xs text-body/40 font-black uppercase tracking-widest mt-1">
            <span>{date}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-200" />
            <span>{size}</span>
         </div>
      </div>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
         <button className="p-3 bg-emerald-50 text-primary rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm">
            <Download size={18} />
         </button>
         <button className="p-3 bg-white border border-emerald-100 text-body/40 rounded-xl hover:border-primary/30 hover:text-primary transition-all">
            <MoreHorizontal size={18} />
         </button>
      </div>
    </GlassCard>
  );
};
