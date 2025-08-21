import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number as currency with specified decimal places
 */
export function formatCurrency(amount: number, decimals: number = 4): string {
  if (isNaN(amount)) return '0.00';

  // For small numbers, show more decimals to avoid showing 0.0000
  if (amount > 0 && amount < 0.0001) {
    return amount.toFixed(8);
  }

  return amount.toFixed(decimals);
}

export const debounce = <T extends unknown[]>(
  func: (...args: T) => void,
  wait: number
) => {
  let timeout: NodeJS.Timeout | undefined;

  return (...args: T) => {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
