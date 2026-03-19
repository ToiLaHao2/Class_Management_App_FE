import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'white' | 'emerald' | 'gradient';
  noPadding?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  variant = 'white',
  noPadding = false 
}) => {
  const baseStyles = "rounded-[2.5rem] border transition-all duration-300";
  
  const variants = {
    white: "bg-white border-emerald-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5",
    emerald: "bg-emerald-50/30 border-emerald-100/50 hover:bg-white hover:shadow-xl hover:shadow-emerald-900/5",
    gradient: "bg-gradient-to-br from-white to-emerald-50 border-emerald-100 shadow-sm"
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${noPadding ? '' : 'p-8'} ${className}`}>
      {children}
    </div>
  );
};
