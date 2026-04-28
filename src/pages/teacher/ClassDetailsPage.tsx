import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Loader2, AlertCircle, Plus } from 'lucide-react';
import { useClassDetails, useClassStudents } from '../../features/teacher/hooks/useTeacherClasses';
import { GlassCard } from '../../shared/components/GlassCard';
import { StatusBadge } from '../../shared/components/StatusBadge';

const ClassDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'lessons'>('students');

  const { data: classData, isLoading: isLoadingClass, isError: isErrorClass } = useClassDetails(id || '');
  const { data: students, isLoading: isLoadingStudents } = useClassStudents(id || '');

  if (isLoadingClass) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 size={40} className="animate-spin text-primary" />
      </div>
    );
  }

  if (isErrorClass || !classData) {
    return (
      <div className="p-8 text-center bg-rose-50 rounded-3xl text-rose-600 border border-rose-100">
        <AlertCircle size={40} className="mx-auto mb-4" />
        <h2 className="text-xl font-bold">Không tìm thấy lớp học</h2>
        <button onClick={() => navigate('/classes')} className="mt-4 text-primary font-bold hover:underline">
          Quay lại danh sách
        </button>
      </div>
    );
  }

  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/classes')}
            className="p-3 bg-white border border-emerald-100 hover:bg-emerald-50 rounded-2xl transition-colors text-body/60 hover:text-primary"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-heading">{classData.name}</h2>
              <StatusBadge variant={classData.status === 'inactive' ? 'gray' : 'emerald'}>
                {classData.status === 'inactive' ? 'Đã kết thúc' : 'Đang hoạt động'}
              </StatusBadge>
            </div>
            <p className="text-sm text-body/60 mt-1 font-bold">Mã lớp: {classData.id.split('-')[0].toUpperCase()} • {classData.studentCount || 0} Học viên</p>
          </div>
        </div>
        <div className="flex gap-3">
          {activeTab === 'students' && (
            <button className="flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-sm">
              <Plus size={18} />
              Thêm học sinh
            </button>
          )}
        </div>
      </header>

      {/* Navigation Tabs */}
      <GlassCard variant="white" noPadding className="flex p-2">
        <div className="flex p-1 bg-emerald-50 rounded-[1.5rem] w-full overflow-x-auto hide-scrollbar">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex items-center justify-center min-w-[120px] px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'overview' ? 'bg-white text-primary shadow-sm' : 'text-body/50 hover:text-body'}`}
          >
            Tổng quan
          </button>
          <button 
            onClick={() => setActiveTab('students')}
            className={`flex items-center justify-center min-w-[120px] gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'students' ? 'bg-white text-primary shadow-sm' : 'text-body/50 hover:text-body'}`}
          >
            <Users size={16} />
            Học sinh ({students?.length || 0})
          </button>
          <button 
            onClick={() => setActiveTab('lessons')}
            className={`flex items-center justify-center min-w-[120px] px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'lessons' ? 'bg-white text-primary shadow-sm' : 'text-body/50 hover:text-body'}`}
          >
            Bài giảng
          </button>
        </div>
      </GlassCard>

      {/* Content Area */}
      <div className="mt-6">
        {activeTab === 'overview' && (
          <GlassCard variant="white" className="space-y-4">
            <h3 className="font-bold text-lg text-heading">Mô tả lớp học</h3>
            <p className="text-body/70 leading-relaxed font-medium">
              {classData.description || 'Chưa có mô tả nào cho lớp học này.'}
            </p>
          </GlassCard>
        )}

        {activeTab === 'students' && (
          <GlassCard variant="white" noPadding>
            {isLoadingStudents ? (
              <div className="flex justify-center p-12">
                <Loader2 size={32} className="animate-spin text-primary" />
              </div>
            ) : students && students.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-emerald-50/50 border-b border-emerald-100 text-xs uppercase tracking-widest text-body/40">
                      <th className="p-4 font-black">Học viên</th>
                      <th className="p-4 font-black">Ngày tham gia</th>
                      <th className="p-4 font-black">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-b border-emerald-50 hover:bg-emerald-50/30 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-primary font-bold">
                              {student.studentInfo?.full_name?.charAt(0) || 'S'}
                            </div>
                            <div>
                              <p className="font-bold text-heading text-sm">{student.studentInfo?.full_name || 'Học sinh ẩn danh'}</p>
                              <p className="text-xs text-body/50 mt-0.5">{student.studentInfo?.email || 'Chưa cập nhật email'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm font-medium text-body/70">
                          {new Date(student.enrollment_date).toLocaleDateString('vi-VN')}
                        </td>
                        <td className="p-4">
                          <StatusBadge variant={student.status === 'active' ? 'emerald' : 'gray'}>
                            {student.status || 'active'}
                          </StatusBadge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center text-body/40 italic font-medium">
                Lớp học chưa có học sinh nào. Hãy chia sẻ mã lớp hoặc thêm thủ công!
              </div>
            )}
          </GlassCard>
        )}

        {activeTab === 'lessons' && (
          <div className="p-12 text-center bg-white rounded-[3rem] border border-dashed border-emerald-200">
            <h3 className="font-bold text-heading text-lg">Giáo án & Bài giảng</h3>
            <p className="text-sm text-body/50 mt-1">Tính năng này sẽ được hoàn thiện trong Phase tiếp theo.</p>
          </div>
        )}
      </div>

    </section>
  );
};

export default ClassDetailsPage;
