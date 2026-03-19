import React from 'react';
import { 
  Users, 
  Calendar, 
  Star, 
  ExternalLink, 
  MoreVertical 
} from 'lucide-react';
import { GlassCard } from '../../../shared/components/GlassCard';
import { StatusBadge } from '../../../shared/components/StatusBadge';

interface ClassCardProps {
  title: string;
  description?: string;
  students: number;
  schedule: string;
  rating?: number;
  status?: 'active' | 'inactive';
  code?: string;
  type?: string;
  className?: string;
}

export const ClassCard: React.FC<ClassCardProps> = ({ 
  title, 
  description, 
  students, 
  schedule, 
  rating, 
  status = 'active',
  code,
  type,
  className = ''
}) => {
  return (
    <GlassCard variant="emerald" className={`group ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          {type && <StatusBadge variant="primary" className="mb-2">{type}</StatusBadge>}
          {status && (
            <StatusBadge 
              variant={status === 'active' ? 'emerald' : 'gray'} 
              className={type ? 'ml-2' : ''}
            >
              {status === 'active' ? 'Đang hoạt động' : 'Tạm dừng'}
            </StatusBadge>
          )}
        </div>
        <button className="p-2 hover:bg-emerald-100 rounded-xl text-body/30 transition-colors">
          <MoreVertical size={16} />
        </button>
      </div>

      <h4 className="font-extrabold text-heading text-lg group-hover:text-primary transition-colors leading-tight">
        {title}
      </h4>
      {code && <p className="text-[10px] font-black text-primary/70 mt-1 uppercase tracking-tighter">Mã lớp: {code}</p>}
      {description && <p className="text-xs text-body/50 mt-1 font-medium italic">{description}</p>}

      <div className="mt-6 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-body/60">
          <Users size={14} className="text-primary/40" />
          <span className="text-xs font-bold">{students} học viên</span>
        </div>
        <div className="flex items-center gap-2 text-body/60">
          <Calendar size={14} className="text-primary/40" />
          <span className="text-xs font-bold">{schedule}</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between pt-4 border-t border-emerald-100/30">
        <div className="flex items-center gap-1.5 text-amber-500 bg-amber-50 px-2 py-1 rounded-lg">
          <Star size={12} fill="currentColor" />
          <span className="text-xs font-black">{rating || 5.0}</span>
        </div>
        <button className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white hover:scale-110 active:scale-95 transition-all">
          <ExternalLink size={16} />
        </button>
      </div>
    </GlassCard>
  );
};
