// src/core/config/constants.ts
// Khai báo các hằng số dùng chung toàn app (Roles, Keys, Enum...)

export const STORAGE_KEYS = {
    ACCESS_TOKEN: 'cma_access_token',
    REFRESH_TOKEN: 'cma_refresh_token',
};

export const ROLES = {
    ADMIN: 'admin',
    TEACHER: 'teacher',
    STUDENT: 'student',
    PARENT: 'parent',
} as const;
