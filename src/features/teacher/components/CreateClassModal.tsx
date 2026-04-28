import React, { useState } from 'react';
import { X, BookOpen, FileText, Loader2 } from 'lucide-react';
import { useCreateClass } from '../hooks/useTeacherClasses';
import { useMyProfile } from '../../profiles/hooks/useProfile';
import type { TeacherProfile } from '../../profiles/types';

interface CreateClassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateClassModal: React.FC<CreateClassModalProps> = ({ isOpen, onClose }) => {
  const { data: profile } = useMyProfile<TeacherProfile>();
  const createClassMutation = useCreateClass();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createClassMutation.mutate(
      {
        owner_id: profile?.id || '', // Lấy ID của teacher profile thay vì user ID
        name: name.trim(),
        description: description.trim(),
      },
      {
        onSuccess: () => {
          setName('');
          setDescription('');
          onClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-emerald-100">
        <div className="px-6 py-4 border-b border-emerald-50 flex items-center justify-between bg-emerald-50/50">
          <h3 className="font-extrabold text-heading text-lg flex items-center gap-2">
            <BookOpen size={20} className="text-primary" />
            Tạo lớp học mới
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-emerald-100 rounded-xl text-body/50 hover:text-body transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-heading ml-1">Tên lớp học</label>
            <div className="relative">
              <BookOpen size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-body/30" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="VD: Toán nâng cao 9A"
                className="w-full pl-10 pr-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-bold"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-heading ml-1">Mô tả (lịch học, mục tiêu...)</label>
            <div className="relative">
              <FileText size={16} className="absolute left-4 top-4 text-body/30" />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Thứ 2, 4, 6 lúc 19h00..."
                className="w-full pl-10 pr-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-bold min-h-[100px] resize-none"
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-body font-bold rounded-2xl transition-colors text-sm"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={createClassMutation.isPending || !name.trim()}
              className="flex-1 py-3 bg-primary hover:bg-emerald-600 text-white font-bold rounded-2xl transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {createClassMutation.isPending && <Loader2 size={16} className="animate-spin" />}
              Tạo lớp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
