import React from 'react';
import { User, BookOpen, Award, Loader2, AlertCircle, Edit3, Save, X } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { ProfileHeader } from '../../features/teacher/components/ProfileHeader';
import { CertificationsCard } from '../../features/teacher/components/CertificationsCard';
import { ClassCard } from '../../features/teacher/components/ClassCard';
import { GlassCard } from '../../shared/components/GlassCard';
import { useMyProfile, useUpdateMyProfile } from '../../features/profiles';
import { useTeacherClasses } from '../../features/teacher/hooks/useTeacherClasses';
import type { TeacherProfile, UpdateTeacherProfileRequest } from '../../features/profiles';

const TeacherProfilePage: React.FC = () => {
  const user = useAuthStore((s) => s.user);

  const { data: profile, isLoading, isError } = useMyProfile<TeacherProfile | null>();
  const updateMutation = useUpdateMyProfile();
  const { data: classes } = useTeacherClasses();

  const [isEditing, setIsEditing] = React.useState(false);
  const [editBio, setEditBio] = React.useState('');
  const [editExperience, setEditExperience] = React.useState('');

  const handleEdit = () => {
    setEditBio(profile?.bio || '');
    setEditExperience(profile?.experience || '');
    setIsEditing(true);
  };

  const handleSave = () => {
    const payload: UpdateTeacherProfileRequest = {
      bio: editBio,
      experience: editExperience,
    };
    updateMutation.mutate(payload, {
      onSuccess: () => setIsEditing(false),
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center gap-3 p-6 bg-rose-50 rounded-3xl text-rose-600 border border-rose-100">
        <AlertCircle size={20} />
        <span className="font-semibold text-sm">Không thể tải hồ sơ. Vui lòng thử lại sau.</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Header / Banner Profile */}
      <ProfileHeader
        user={user}
        rating={4.9}
        bio={profile?.bio}
        isVerified={profile?.is_verified}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        {/* Left Column: Bio & Info */}
        <div className="space-y-6">
          {/* Bio Card */}
          <GlassCard variant="gradient" className="relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <Award size={80} />
            </div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-heading italic flex items-center gap-2">
                <User size={18} className="text-primary" />
                Giới thiệu bản thân
              </h3>
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="p-2 hover:bg-emerald-100 rounded-xl transition-colors text-primary"
                  title="Chỉnh sửa"
                >
                  <Edit3 size={15} />
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-3">
                <textarea
                  className="w-full text-sm p-3 rounded-2xl border border-emerald-200 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white/80 min-h-[100px]"
                  placeholder="Giới thiệu về bản thân..."
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={updateMutation.isPending}
                    className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-2xl text-xs font-bold hover:bg-emerald-600 disabled:opacity-50 transition-colors"
                  >
                    {updateMutation.isPending
                      ? <Loader2 size={12} className="animate-spin" />
                      : <Save size={12} />
                    }
                    Lưu
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-body rounded-2xl text-xs font-bold hover:bg-gray-200 transition-colors"
                  >
                    <X size={12} />
                    Hủy
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-body/70 leading-relaxed font-medium">
                {profile?.bio || (
                  <span className="italic text-body/40">
                    Chưa có giới thiệu. Nhấn chỉnh sửa để thêm.
                  </span>
                )}
              </p>
            )}
          </GlassCard>

          {/* Experience */}
          {(profile?.experience || isEditing) && (
            <GlassCard variant="white">
              <h3 className="font-extrabold text-heading italic flex items-center gap-2 mb-3">
                <Award size={18} className="text-primary" />
                Kinh nghiệm
              </h3>
              {isEditing ? (
                <textarea
                  className="w-full text-sm p-3 rounded-2xl border border-emerald-200 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white/80 min-h-[80px]"
                  placeholder="Mô tả kinh nghiệm giảng dạy..."
                  value={editExperience}
                  onChange={(e) => setEditExperience(e.target.value)}
                />
              ) : (
                <p className="text-sm text-body/70 leading-relaxed font-medium">
                  {profile?.experience}
                </p>
              )}
            </GlassCard>
          )}

          {/* Subjects (from categories names joined as string) */}
          {profile?.subjects && (
            <CertificationsCard
              certifications={profile.subjects.split(',').map((s) => s.trim()).filter(Boolean)}
            />
          )}
        </div>

        {/* Right Column: Classes */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-[3rem] p-8 border border-emerald-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-extrabold text-heading text-xl flex items-center gap-3">
                <BookOpen size={24} className="text-primary" />
                Lớp học của tôi
              </h3>
              <span className="text-xs font-bold text-body/40 uppercase tracking-widest">
                {classes?.length ?? 0} lớp
              </span>
            </div>

            {classes && classes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {classes.map((cls) => (
                  <ClassCard
                    key={cls.id}
                    title={cls.name}
                    students={cls.studentCount}
                    schedule={cls.description || 'Chưa cập nhật'}
                    type="Lớp học"
                    rating={5.0}
                  />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center border-2 border-dashed border-emerald-100 rounded-3xl italic text-body/40">
                Bạn chưa có lớp học nào.
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfilePage;
