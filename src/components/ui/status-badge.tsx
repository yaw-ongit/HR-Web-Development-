import { cn, getStatusVariant, statusVariantClasses } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variant = getStatusVariant(status);
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]',
        statusVariantClasses[variant],
        className,
      )}
    >
      {status}
    </span>
  );
}
