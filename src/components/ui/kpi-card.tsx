import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface KpiCardProps {
  label: string;
  value: string | number;
  trend?: string;
  trendVariant?: 'up' | 'down' | 'neutral';
  icon?: ReactNode;
  className?: string;
  /** Optional sub-label beneath the value */
  subLabel?: string;
}

const trendColorMap = {
  up: 'text-emerald-600',
  down: 'text-rose-600',
  neutral: 'text-slate-400',
};

export function KpiCard({
  label,
  value,
  trend,
  trendVariant = 'neutral',
  icon,
  className,
  subLabel,
}: KpiCardProps) {
  return (
    <div
      className={cn(
        'rounded-[28px] border border-slate-200 bg-slate-50/95 p-5 shadow-card',
        className,
      )}
      role="region"
      aria-label={label}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs uppercase tracking-[0.28em] text-slate-400">{label}</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900 tabular-nums">{value}</p>
          {trend && (
            <p className={cn('mt-2 text-sm', trendColorMap[trendVariant])}>{trend}</p>
          )}
          {subLabel && !trend && (
            <p className="mt-2 text-sm text-slate-400">{subLabel}</p>
          )}
        </div>
        {icon && (
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-3xl bg-white/85 text-blue-600"
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
