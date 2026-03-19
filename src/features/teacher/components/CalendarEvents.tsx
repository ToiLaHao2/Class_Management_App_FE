import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { GlassCard } from '../../../shared/components/GlassCard';

interface CalendarEvent {
   title: string;
   time: string;
   room: string;
   tag: string;
}

interface CalendarEventsProps {
  events: CalendarEvent[];
}

export const CalendarEvents: React.FC<CalendarEventsProps> = ({ events }) => {
  return (
    <GlassCard variant="white" className="self-start">
      <h3 className="font-extrabold text-heading mb-6 flex items-center gap-2">
         <Clock size={20} className="text-primary" />
         Lịch trình sắp tới
      </h3>
      
      <ul className="space-y-6">
         {events.map((event, i) => (
            <li key={i} className="group cursor-pointer">
               <div className="flex items-start justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary/50 group-hover:text-primary transition-colors">{event.tag}</span>
                  <span className="text-[10px] font-bold text-body/30 italic">{event.time}</span>
               </div>
               <h4 className="font-extrabold text-heading mt-1 group-hover:text-primary transition-colors leading-tight">{event.title}</h4>
               <div className="flex items-center gap-2 mt-2">
                  <MapPin size={12} className="text-body/30" />
                  <span className="text-xs text-body/50 font-medium">{event.room}</span>
               </div>
            </li>
         ))}
      </ul>

      <button className="w-full mt-8 py-4 px-6 bg-emerald-50 text-primary font-bold rounded-2xl border border-emerald-100 hover:bg-primary hover:text-white hover:border-transparent transition-all shadow-sm">
         Xem toàn bộ lịch dạy
      </button>
    </GlassCard>
  );
};
