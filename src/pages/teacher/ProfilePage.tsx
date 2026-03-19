import React from 'react';
import { 
  User, 
  BookOpen, 
  Award, 
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { ProfileHeader } from '../../features/teacher/components/ProfileHeader';
import { ContactCard } from '../../features/teacher/components/ContactCard';
import { CertificationsCard } from '../../features/teacher/components/CertificationsCard';
import { ClassCard } from '../../features/teacher/components/ClassCard';
import { GlassCard } from '../../shared/components/GlassCard';

const TeacherProfilePage: React.FC = () => {
  const user = useAuthStore((s) => s.user);

  const featuredContent = [
    { title: 'Toán nâng cao lớp 9', description: 'Luyện thi vào 10 chuyên Toán', students: 128, rating: 5.0, type: 'Môn học', schedule: 'Thứ 2, 4, 6' },
    { title: 'Hệ phương trình bậc nhất', description: 'Bộ bài giảng chi tiết & bài tập', students: 450, rating: 4.8, type: 'Bài giảng', schedule: 'Video sẵn có' },
    { title: 'Hình học không gian 12', description: 'Chinh phục kỳ thi THPT Quốc gia', students: 89, rating: 4.9, type: 'Môn học', schedule: 'Thứ 7, CN' },
    { title: 'Bí quyết giải nhanh Trắc nghiệm', description: 'Tối ưu thời gian làm bài thi', students: 1200, rating: 5.0, type: 'Bài giảng', schedule: 'Video sẵn có' },
  ];

  const certifications = [
    'GV Giỏi Cấp Thành phố', 
    'IELTS 8.0', 
    'Tốt nghiệp loại Xuất sắc'
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Header / Banner Profile */}
      <ProfileHeader user={user} rating={4.9} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
         {/* Left Column: Contact & Info */}
         <div className="space-y-6">
            <ContactCard 
              phone="0987 654 321" 
              email={user?.email || 'teacher@classify.edu.vn'}
              facebook="fb.com/teacher.classify"
              zalo="0987 654 321"
            />

            <GlassCard variant="gradient" className="relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-5">
                  <Award size={80} />
               </div>
               <h3 className="font-extrabold text-heading mb-4 italic flex items-center gap-2">
                  <User size={18} className="text-primary" />
                  Giới thiệu bản thân
               </h3>
               <p className="text-sm text-body/70 leading-relaxed font-medium">
                  "Với hơn 5 năm kinh nghiệm giảng dạy Toán cấp 2 và cấp 3, tôi luôn hướng tới việc truyền cảm hứng học tập thông qua các phương pháp tư duy logic và thực tế."
               </p>
            </GlassCard>

            <CertificationsCard certifications={certifications} />
         </div>

         {/* Right Column: Featured Subjects & Lessons */}
         <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-[3rem] p-8 border border-emerald-100 shadow-sm">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="font-extrabold text-heading text-xl flex items-center gap-3">
                     <BookOpen size={24} className="text-primary" />
                     Môn học & Bài giảng tiêu biểu
                  </h3>
                  <button className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">Thêm mới</button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredContent.map((item, i) => (
                    <ClassCard key={i} {...item} />
                  ))}
               </div>
            </section>
         </div>
      </div>
    </div>
  );
};

export default TeacherProfilePage;
