// src/utils/formatCurrency.ts

/**
 * Format tiền tệ VNĐ
 * @example formatCurrency(100000) => "100.000 đ"
 */
export const formatCurrency = (amount: number): string => {
    if (isNaN(amount)) return '0 đ';

    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};
