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
  up: 'text-success',
  down: 'text-danger',
  neutral: 'text-muted',
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
        'rounded-[28px] border border-border/70 bg-card/80 p-5 shadow-[0_18px_48px_rgba(2,34,74,0.16)]',
        className,
      )}
      role="region"
      aria-label={label}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs uppercase tracking-[0.28em] text-muted-foreground">{label}</p>
          <p className="mt-3 text-3xl font-semibold text-foreground tabular-nums">{value}</p>
          {trend && (
            <p className={cn('mt-2 text-sm', trendColorMap[trendVariant])}>{trend}</p>
          )}
          {subLabel && !trend && (
            <p className="mt-2 text-sm text-muted">{subLabel}</p>
          )}
        </div>
        {icon && (
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-700 to-brand-500 text-white"
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
