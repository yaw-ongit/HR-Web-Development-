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
        'rounded-[28px] border border-white/10 bg-slate-900/90 shadow-card backdrop-blur-xl',
        className,
      )}
    >
      {(title || description || headerActions) && (
        <div
          className={cn(
            'flex items-start justify-between gap-4 border-b border-white/10',
            paddingClasses[padding],
          )}
        >
          <div className="space-y-0.5">
            {title && (
              <h2 className="text-base font-semibold text-slate-100">{title}</h2>
            )}
            {description && (
              <p className="text-sm text-slate-400">{description}</p>
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
        <div className={cn('border-t border-white/10', paddingClasses[padding])}>
          {footer}
        </div>
      )}
    </Tag>
  );
}
