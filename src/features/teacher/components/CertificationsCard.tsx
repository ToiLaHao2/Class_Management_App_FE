import React from 'react';
import { Award } from 'lucide-react';

interface CertificationsCardProps {
  certifications: string[];
}

export const CertificationsCard: React.FC<CertificationsCardProps> = ({ certifications }) => {
  return (
    <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-lg shadow-emerald-900/10">
      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-all duration-700">
         <Award size={100} />
      </div>
      <div className="relative z-10">
         <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Award size={20} />
            Chứng chỉ & Giải thưởng
         </h3>
         <div className="flex flex-wrap gap-3">
            {certifications.map((badge, idx) => (
               <div key={idx} className="px-3 py-2 bg-white/20 backdrop-blur-md rounded-xl text-[10px] font-bold border border-white/30 whitespace-nowrap group-hover:bg-white/30 transition-colors">
                  {badge}
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};
