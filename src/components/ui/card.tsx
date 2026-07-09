import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  title?: string;
  description?: string;
  footer?: ReactNode;
  headerActions?: ReactNode;
  className?: string;
  children: ReactNode;
  /** If set, renders an <article> with the given aria-label */
  ariaLabel?: string;
  /** Padding override — defaults to 'normal' (px-6 py-5) */
  padding?: 'none' | 'tight' | 'normal';
}

const paddingClasses = {
  none: '',
  tight: 'px-4 py-4',
  normal: 'px-6 py-5',
};

export function Card({
  title,
  description,
  footer,
  headerActions,
  className,
  children,
  ariaLabel,
  padding = 'normal',
}: CardProps) {
  const Tag = ariaLabel ? 'article' : 'div';

  return (
    <Tag
      {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
      className={cn(
        'rounded-[28px] border border-brand-100/70 bg-white/95 shadow-[0_16px_45px_rgba(2,34,74,0.08)]',
        className,
      )}
    >
      {(title || description || headerActions) && (
        <div
          className={cn(
            'flex items-start justify-between gap-4 border-b border-brand-100/80 bg-gradient-to-r from-white to-brand-50/40',
            paddingClasses[padding],
          )}
        >
          <div className="space-y-0.5">
            {title && (
              <h2 className="text-base font-semibold text-brand-900">{title}</h2>
            )}
            {description && (
              <p className="text-sm text-slate-500">{description}</p>
            )}
          </div>
          {headerActions && (
            <div className="flex shrink-0 items-center gap-2">{headerActions}</div>
          )}
        </div>
      )}

      <div className={cn(!(title || description) && padding !== 'none' ? paddingClasses[padding] : paddingClasses[padding])}>
        {children}
      </div>

      {footer && (
        <div className={cn('border-t border-brand-100/80', paddingClasses[padding])}>
          {footer}
        </div>
      )}
    </Tag>
  );
}
