import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Users, 
  Calendar,
  Layers,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const ClassManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'inactive'>('active');

  const classes = [
    { id: 1, name: 'Toán nâng cao 9A', students: 12, schedule: 'Thứ 2, 4, 6', status: 'active', code: 'MATH9A' },
    { id: 2, name: 'Lý đại cương 10B', students: 8, schedule: 'Thứ 3, 5', status: 'active', code: 'PHYS10B' },
    { id: 3, name: 'Hóa hữu cơ 11C', students: 15, schedule: 'Thứ 7, CN', status: 'active', code: 'CHEM11C' },
    { id: 4, name: 'Ôn thi Toán 12 (Cấp tốc)', students: 20, schedule: 'Mọi ngày', status: 'inactive', code: 'MATH12F' },
  ];

  const filteredClasses = classes.filter(c => c.status === activeTab);

  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-heading">Quản lý Lớp học</h2>
          <p className="text-sm text-body/60 mt-1 font-medium">Tổ chức và theo dõi các lớp học của bạn</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-sm">
          <Plus size={18} />
          Tạo lớp mới
        </button>
      </header>

      {/* Tabs & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-2 rounded-[2rem] border border-emerald-100 shadow-sm">
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
            className="w-full pl-10 pr-4 py-2 bg-emerald-50/50 border-none rounded-xl focus:outline-none text-sm font-medium"
          />
        </div>
      </div>

      {/* Class Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.length > 0 ? filteredClasses.map((cls) => (
          <div key={cls.id} className="bg-white rounded-[2.5rem] border border-emerald-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
            {/* Status Badge */}
            <div className="absolute top-0 right-0 p-3">
               <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${cls.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                 {cls.status === 'active' ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                 {cls.status === 'active' ? 'Sống' : 'Tắt'}
               </div>
            </div>

            <div className="w-14 h-14 rounded-3xl bg-emerald-50 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <Layers size={24} />
            </div>

            <h3 className="text-lg font-bold text-heading leading-tight group-hover:text-primary transition-colors">{cls.name}</h3>
            <p className="text-xs font-bold text-primary/70 mt-1">Mã lớp: {cls.code}</p>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-body/60 font-medium">
                <Users size={16} className="text-emerald-300" />
                <span>{cls.students} học viên</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-body/60 font-medium">
                <Calendar size={16} className="text-emerald-300" />
                <span>{cls.schedule}</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-emerald-50 flex items-center justify-between">
              <button className="text-xs font-bold text-primary hover:underline">Quản lý lớp →</button>
              <button className="p-2 hover:bg-emerald-50 rounded-xl transition-colors">
                <MoreVertical size={16} className="text-body/30" />
              </button>
            </div>
          </div>
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
