import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Layers,
} from 'lucide-react';
import { ClassCard } from '../../features/teacher/components/ClassCard';
import { GlassCard } from '../../shared/components/GlassCard';

const ClassManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'inactive'>('active');

  const classes = [
    { title: 'Toán nâng cao 9A', students: 12, schedule: 'Thứ 2, 4, 6', status: 'active' as const, code: 'MATH9A' },
    { title: 'Lý đại cương 10B', students: 8, schedule: 'Thứ 3, 5', status: 'active' as const, code: 'PHYS10B' },
    { title: 'Hóa hữu cơ 11C', students: 15, schedule: 'Thứ 7, CN', status: 'active' as const, code: 'CHEM11C' },
    { title: 'Ôn thi Toán 12 (Cấp tốc)', students: 20, schedule: 'Mọi ngày', status: 'inactive' as const, code: 'MATH12F' },
  ];

  const filteredClasses = classes.filter(c => c.status === activeTab);

  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-heading">Quản lý Lớp học</h2>
          <p className="text-sm text-body/60 mt-1 font-bold">Tổ chức và theo dõi các lớp học của bạn</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-sm">
          <Plus size={18} />
          Tạo lớp mới
        </button>
      </header>

      {/* Tabs & Search */}
      <GlassCard variant="white" noPadding className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-2">
        <div className="flex p-1 bg-emerald-50 rounded-[1.5rem] w-fit">
          <button 
            onClick={() => setActiveTab('active')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'active' ? 'bg-white text-primary shadow-sm' : 'text-body/50 hover:text-body'}`}
          >
            Đang hoạt động ({classes.filter(c => c.status === 'active').length})
          </button>
          <button 
            onClick={() => setActiveTab('inactive')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'inactive' ? 'bg-white text-primary shadow-sm' : 'text-body/50 hover:text-body'}`}
          >
            Đã kết thúc ({classes.filter(c => c.status === 'inactive').length})
          </button>
        </div>
        <div className="relative md:w-64 px-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-body/30" size={16} />
          <input 
            type="text" 
            placeholder="Tìm lớp học..." 
            className="w-full pl-10 pr-4 py-2 bg-emerald-50/50 border-none rounded-xl focus:outline-none text-sm font-bold"
          />
        </div>
      </GlassCard>

      {/* Class Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.length > 0 ? filteredClasses.map((cls, idx) => (
          <ClassCard key={idx} {...cls} />
        )) : (
          <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border border-dashed border-emerald-200">
            <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4 text-emerald-200">
              <Layers size={40} />
            </div>
            <h3 className="font-bold text-heading text-lg">Không có lớp học nào</h3>
            <p className="text-sm text-body/50 mt-1">Bắt đầu bằng cách tạo một lớp học mới!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClassManagementPage;
