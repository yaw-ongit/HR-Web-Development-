import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionContainerProps {
  title?: string;
  description?: string;
  headerActions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function SectionContainer({
  title,
  description,
  headerActions,
  children,
  className,
}: SectionContainerProps) {
  return (
    <section className={cn('space-y-4', className)}>
      {(title || description || headerActions) && (
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            )}
            {description && (
              <p className="mt-0.5 text-sm text-muted">{description}</p>
            )}
          </div>
          {headerActions && (
            <div className="flex shrink-0 flex-wrap items-center gap-2">{headerActions}</div>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
