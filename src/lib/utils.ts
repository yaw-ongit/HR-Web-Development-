import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as a locale string with optional compact notation */
export function formatNumber(value: number, compact = false): string {
  if (compact && value >= 1_000) {
    return new Intl.NumberFormat('id-ID', { notation: 'compact', maximumFractionDigits: 1 }).format(value);
  }
  return new Intl.NumberFormat('id-ID').format(value);
}

/** Format a date string or Date object to a readable locale string */
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('id-ID', options ?? { year: 'numeric', month: 'short', day: 'numeric' });
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
  if (['active', 'aktif', 'present', 'approved', 'completed', 'good', 'passed', 'disetujui', 'selesai', 'layak'].includes(s)) return 'success';
  if (['pending', 'on leave', 'review', 'upcoming', 'expiring', 'cuti', 'menunggu', 'sedang berlangsung', 'terjadwal', 'magang', 'kontrak'].includes(s)) return 'warning';
  if (['inactive', 'absent', 'rejected', 'failed', 'critical', 'expired', 'ditolak', 'kedaluwarsa', 'error', 'tidak aktif'].includes(s)) return 'danger';
  if (['wfh', 'info', 'processing', 'submitted', 'dalam proses', 'diproses', 'pending'].includes(s)) return 'info';
  return 'neutral';
}

export const statusVariantClasses: Record<StatusVariant, string> = {
  success: 'bg-emerald-50 text-emerald-200',
  warning: 'bg-amber-50 text-amber-200',
  danger: 'bg-rose-50 text-rose-200',
  info: 'bg-brand-50 text-primary',
  neutral: 'bg-surface/70 text-muted-foreground border border-border/60',
};
