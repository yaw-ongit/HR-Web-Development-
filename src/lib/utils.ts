import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as a locale string with optional compact notation */
export function formatNumber(value: number, compact = false): string {
  if (compact && value >= 1_000) {
    return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value);
  }
  return new Intl.NumberFormat('en-US').format(value);
}

/** Format a date string or Date object to a readable locale string */
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', options ?? { year: 'numeric', month: 'short', day: 'numeric' });
}

/** Truncate a string to the given length with an ellipsis */
export function truncate(str: string, length: number): string {
  return str.length > length ? `${str.slice(0, length)}…` : str;
}

/** Generate initials from a full name */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

/** Get a status badge variant */
export type StatusVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export function getStatusVariant(status: string): StatusVariant {
  const s = status.toLowerCase();
  if (['active', 'present', 'approved', 'completed', 'good', 'passed'].includes(s)) return 'success';
  if (['pending', 'on leave', 'review', 'upcoming', 'expiring'].includes(s)) return 'warning';
  if (['inactive', 'absent', 'rejected', 'failed', 'critical', 'expired'].includes(s)) return 'danger';
  if (['wfh', 'info', 'processing', 'submitted'].includes(s)) return 'info';
  return 'neutral';
}

export const statusVariantClasses: Record<StatusVariant, string> = {
  success: 'bg-emerald-50 text-emerald-200',
  warning: 'bg-amber-50 text-amber-200',
  danger: 'bg-rose-50 text-rose-200',
  info: 'bg-brand-50 text-brand-500',
  neutral: 'bg-slate-200/40 text-slate-700',
};
