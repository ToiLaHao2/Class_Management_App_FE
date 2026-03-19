import React from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  Facebook, 
  MessageCircle, 
  ExternalLink 
} from 'lucide-react';
import { GlassCard } from '../../../shared/components/GlassCard';

interface ContactCardProps {
  email: string;
  phone: string;
  facebook: string;
  zalo: string;
}

export const ContactCard: React.FC<ContactCardProps> = ({ 
  email, 
  phone, 
  facebook, 
  zalo 
}) => {
  const items = [
    { icon: Phone, label: 'Số điện thoại', value: phone },
    { icon: Mail, label: 'Email', value: email },
    { icon: Facebook, label: 'Facebook', value: facebook },
    { icon: MessageCircle, label: 'Zalo', value: zalo },
  ];

  return (
    <GlassCard variant="white">
      <h3 className="font-bold text-heading mb-6 flex items-center gap-2">
         <User size={18} className="text-primary" />
         Thông tin liên hệ
      </h3>
      <ul className="space-y-5">
         {items.map((item, i) => (
           <li key={i} className="flex items-center gap-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                 <item.icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                 <div className="text-[10px] font-black uppercase tracking-widest text-body/30">{item.label}</div>
                 <div className="text-sm font-bold text-heading truncate">{item.value}</div>
              </div>
              <ExternalLink size={14} className="text-body/20 opacity-0 group-hover:opacity-100 transition-all" />
           </li>
         ))}
      </ul>
    </GlassCard>
  );
};
