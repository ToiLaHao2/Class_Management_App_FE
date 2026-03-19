import React from 'react';

interface StatusBadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'blue' | 'amber' | 'gray' | 'primary';
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  children, 
  variant = 'emerald', 
  size = 'xs',
  className = '' 
}) => {
  const variants = {
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    gray: "bg-gray-50 text-gray-400 border-gray-100",
    primary: "bg-primary/10 text-primary border-primary/20",
  };

  const sizes = {
    xs: "px-2 py-0.5 text-[10px]",
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  };

  return (
    <span className={`inline-flex items-center font-black uppercase tracking-widest rounded-full border ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};
