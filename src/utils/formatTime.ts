// src/utils/formatTime.ts

/**
 * Hiển thị ngày tháng theo định dạng DD/MM/YYYY
 */
export const formatDate = (dateString: string | Date): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

/**
 * Hiển thị thời gian theo dạng "vài phút trước", "hôm qua"...
 */
export const timeAgo = (dateString: string | Date): string => {
    // Logic time ago
    return formatDate(dateString); // Tạm thời trả về formatDate
}
