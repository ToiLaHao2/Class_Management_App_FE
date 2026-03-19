import React from 'react';
import { 
  CreditCard, 
  Download, 
  ArrowUpRight,
  TrendingUp,
  History,
  AlertCircle
} from 'lucide-react';
import { GlassCard } from '../../shared/components/GlassCard';
import { StatCard } from '../../shared/components/StatCard';
import { StatusBadge } from '../../shared/components/StatusBadge';

const FinancePage: React.FC = () => {
  const invoices = [
    { id: 'INV-2026-001', child: 'Minh Quân', amount: '1.200.000đ', date: '15/03/2026', status: 'unpaid', type: 'Tuition' },
    { id: 'INV-2026-002', child: 'Lan Anh', amount: '800.000đ', date: '10/03/2026', status: 'paid', type: 'Tuition' },
    { id: 'INV-2025-099', child: 'Minh Quân', amount: '1.200.000đ', date: '15/02/2026', status: 'paid', type: 'Tuition' },
    { id: 'INV-2025-098', child: 'Lan Anh', amount: '350.000đ', date: '05/02/2026', status: 'paid', type: 'Materials' },
  ];

  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-heading">Học phí & Chi phí</h2>
          <p className="text-sm text-body/60 mt-1 font-bold">Quản lý các khoản phí và lịch sử thanh toán</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-sm">
          <TrendingUp size={18} />
          Báo cáo chi phí
        </button>
      </header>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Tổng đã chi (Quý 1)" 
          value="3.550.000đ" 
          icon={CreditCard} 
        />
        <StatCard 
          label="Chưa thanh toán" 
          value="1.200.000đ" 
          icon={AlertCircle} 
          className="border-rose-100 bg-rose-50/10"
        />
        <StatCard 
          label="Tổng hóa đơn" 
          value="12" 
          icon={History} 
        />
      </div>

      {/* Invoices List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-extrabold text-heading text-lg">Lịch sử hóa đơn</h3>
          <div className="flex gap-2">
             <button className="px-4 py-2 bg-white border border-emerald-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-body/40 hover:text-primary transition-all shadow-sm">Tháng này</button>
             <button className="px-4 py-2 bg-white border border-emerald-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-body/40 hover:text-primary transition-all shadow-sm">Tất cả</button>
          </div>
        </div>

        <div className="space-y-4">
          {invoices.map((inv, i) => (
            <GlassCard key={i} variant="white" className="p-5 flex flex-col md:flex-row md:items-center gap-6 group hover:shadow-md transition-all border-emerald-100/30">
              <div className="flex items-center gap-4 flex-1">
                 <div className={`w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform`}>
                    <CreditCard size={24} />
                 </div>
                 <div>
                    <h4 className="font-extrabold text-heading text-base group-hover:text-primary transition-colors leading-tight italic">{inv.child}</h4>
                    <div className="flex items-center gap-2 mt-1">
                       <span className="text-[10px] font-black text-body/30 uppercase tracking-widest">{inv.id}</span>
                       <span className="w-1 h-1 rounded-full bg-emerald-200" />
                       <span className="text-[10px] font-bold text-body/40">{inv.type === 'Tuition' ? 'Học phí' : 'Học liệu'} • {inv.date}</span>
                    </div>
                 </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 md:w-fit">
                 <div className="text-right">
                    <div className={`text-lg font-black ${inv.status === 'unpaid' ? 'text-rose-500' : 'text-primary'}`}>{inv.amount}</div>
                    <div className="flex justify-end mt-1">
                      <StatusBadge variant={inv.status === 'paid' ? 'primary' : 'amber'} size="sm">
                        {inv.status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                      </StatusBadge>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-2">
                    {inv.status === 'unpaid' ? (
                       <button className="px-5 py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.05] transition-all">
                          Thanh toán
                       </button>
                    ) : (
                       <button className="p-3 bg-emerald-50 text-primary rounded-xl hover:bg-emerald-100 transition-colors">
                          <Download size={18} />
                       </button>
                    )}
                    <button className="p-3 bg-white border border-emerald-100 text-body/30 rounded-xl hover:border-primary/30 hover:text-primary transition-all">
                       <ArrowUpRight size={18} />
                    </button>
                 </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinancePage;
