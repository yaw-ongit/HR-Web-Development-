import { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  style?: CSSProperties;
}

export function Skeleton({ className, style }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-3xl bg-slate-800/80', className)}
      style={style}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'rounded-[28px] border border-white/10 bg-slate-900/90 p-6 shadow-card',
        className,
      )}
      aria-hidden="true"
    >
      <Skeleton className="mb-4 h-4 w-1/3" />
      <Skeleton className="mb-2 h-8 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div
      className="rounded-[28px] border border-white/10 bg-slate-900/90 shadow-card overflow-hidden"
      aria-hidden="true"
      aria-label="Loading table"
    >
      {/* Header */}
      <div className="flex gap-4 border-b border-white/10 bg-slate-950/95 px-4 py-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-3 flex-1 rounded-full" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="flex gap-4 border-b border-white/5 px-4 py-4 last:border-0"
        >
          {Array.from({ length: cols }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              className={cn('h-4 flex-1 rounded-full', colIndex === 0 && 'max-w-[160px]')}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonChart({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'rounded-[28px] border border-white/10 bg-slate-900/90 p-6 shadow-card',
        className,
      )}
      aria-hidden="true"
    >
      <Skeleton className="mb-2 h-4 w-1/4" />
      <Skeleton className="mb-6 h-3 w-1/3" />
      <div className="flex h-48 items-end gap-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex-1 rounded-t-3xl rounded-b-none"
            style={{ height: `${30 + Math.random() * 70}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function SkeletonForm({ fields = 4 }: { fields?: number }) {
  return (
    <div className="space-y-5" aria-hidden="true" aria-label="Loading form">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-3 w-1/4 rounded-full" />
          <Skeleton className="h-12 w-full rounded-3xl" />
        </div>
      ))}
      <Skeleton className="h-12 w-1/3 rounded-full" />
    </div>
  );
}

export function SkeletonPageHeader() {
  return (
    <div
      className="rounded-[28px] border border-white/10 bg-slate-900/95 px-6 py-6"
      aria-hidden="true"
    >
      <Skeleton className="mb-2 h-3 w-24 rounded-full" />
      <Skeleton className="mb-3 h-8 w-64 rounded-full" />
      <Skeleton className="h-4 w-96 rounded-full" />
    </div>
  );
}
