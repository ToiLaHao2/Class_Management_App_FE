import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string | number;
    isUp?: boolean;
    isPositive?: boolean; // Legacy support
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon: Icon,
  trend,
  className = ''
}) => {
  const isUp = trend?.isUp ?? trend?.isPositive ?? true;
  return (
    <GlassCard className={`group overflow-hidden relative ${className}`} variant="white">
      <div className="absolute top-0 right-0 p-6 text-primary/5 group-hover:scale-110 transition-transform duration-500">
        <Icon size={120} strokeWidth={1} />
      </div>
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-all">
          <Icon size={24} />
        </div>
        <div className="text-[10px] font-black uppercase tracking-widest text-body/40 mb-1">{label}</div>
        <div className="flex items-end gap-3">
          <div className="text-3xl font-black text-heading leading-none">{value}</div>
          {trend && (
            <span className={`text-[10px] font-bold pb-1 ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
              {trend.value}
            </span>
          )}
        </div>
      </div>
    </GlassCard>
  );
};
