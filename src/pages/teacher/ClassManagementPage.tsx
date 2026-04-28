import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Layers,
  Loader2
} from 'lucide-react';
import { ClassCard } from '../../features/teacher/components/ClassCard';
import { GlassCard } from '../../shared/components/GlassCard';
import { useTeacherClasses } from '../../features/teacher/hooks/useTeacherClasses';
import { CreateClassModal } from '../../features/teacher/components/CreateClassModal';

const ClassManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'inactive'>('active');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: classes, isLoading } = useTeacherClasses();

  const filteredClasses = (classes || [])
    .filter(c => {
      // Tạm thời map status (active/inactive). Backend có thể trả status khác, ta map cứng tạm
      const isStatusMatch = activeTab === 'active' 
        ? c.status !== 'inactive' 
        : c.status === 'inactive';
      
      const isSearchMatch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (c.description?.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return isStatusMatch && isSearchMatch;
    });

  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-heading">Quản lý Lớp học</h2>
          <p className="text-sm text-body/60 mt-1 font-bold">Tổ chức và theo dõi các lớp học của bạn</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-sm"
        >
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
            Đang hoạt động ({(classes || []).filter(c => c.status !== 'inactive').length})
          </button>
          <button 
            onClick={() => setActiveTab('inactive')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'inactive' ? 'bg-white text-primary shadow-sm' : 'text-body/50 hover:text-body'}`}
          >
            Đã kết thúc ({(classes || []).filter(c => c.status === 'inactive').length})
          </button>
        </div>
        <div className="relative md:w-64 px-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-body/30" size={16} />
          <input 
            type="text" 
            placeholder="Tìm lớp học..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-emerald-50/50 border-none rounded-xl focus:outline-none text-sm font-bold"
          />
        </div>
      </GlassCard>

      {/* Class Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.length > 0 ? filteredClasses.map((cls) => (
            <ClassCard 
              key={cls.id} 
              id={cls.id}
              title={cls.name}
              description={cls.description}
              students={cls.studentCount || 0}
              schedule={cls.description || 'Chưa có lịch'}
              status={cls.status === 'inactive' ? 'inactive' : 'active'}
              type="Lớp học"
            />
          )) : (
            <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border border-dashed border-emerald-200">
              <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4 text-emerald-200">
                <Layers size={40} />
              </div>
              <h3 className="font-bold text-heading text-lg">Không tìm thấy lớp học nào</h3>
              <p className="text-sm text-body/50 mt-1">Bắt đầu bằng cách tạo một lớp học mới!</p>
            </div>
          )}
        </div>
      )}

      <CreateClassModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </section>
  );
};

export default ClassManagementPage;
