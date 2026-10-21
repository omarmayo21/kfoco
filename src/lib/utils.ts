import { type ClassValue, clsx } from './clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Detect if a content string is a TODO placeholder (rendered with a marker style) */
export const isTodo = (value: string) => value.trim().toUpperCase().startsWith('TODO');

/** Format an ISO date for display (e.g. "12 Nov 2025" / "12 نوفمبر 2025") */
export function formatDate(iso: string, locale: string) {
  const date = new Date(iso);
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}
