import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-200/40 text-slate-700',
  primary: 'bg-brand-50 text-brand-500',
  success: 'bg-emerald-50 text-emerald-200',
  warning: 'bg-amber-50 text-amber-200',
  danger: 'bg-rose-50 text-rose-200',
  info: 'bg-brand-50 text-brand-500',
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
