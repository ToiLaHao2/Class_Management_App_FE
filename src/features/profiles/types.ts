// src/features/profiles/types.ts
// TypeScript types cho Profiles domain, đồng bộ với BE model

export interface TeacherProfile {
    id: string;
    user_id: string;
    bio?: string;
    subjects?: string;
    experience?: string;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
}

export interface StudentProfile {
    id: string;
    user_id: string;
    parent_id?: string;
    school?: string;
    grade?: string;
    academic_level?: string;
    learning_goal?: string;
    health_notes?: string;
    nickname?: string;
    special_notes?: string;
    created_at: string;
    updated_at: string;
}

export interface ParentProfile {
    id: string;
    user_id: string;
    created_at: string;
    updated_at: string;
}

export interface UpdateTeacherProfileRequest {
    bio?: string;
    experience?: string;
    subject_ids?: string[];
}

export interface UpdateStudentProfileRequest {
    school?: string;
    grade?: string;
    learning_goal?: string;
    nickname?: string;
}
