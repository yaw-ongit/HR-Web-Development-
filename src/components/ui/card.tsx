import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  title?: string;
  description?: string;
  footer?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function Card({ title, description, footer, className, children }: CardProps) {
  return (
    <div className={clsx('rounded-[28px] border border-white/10 bg-slate-900/90 shadow-card backdrop-blur-xl', className)}>
      {(title || description) && (
        <div className="space-y-1 border-b border-white/10 px-6 py-5">
          {title && <h2 className="text-base font-semibold text-slate-100">{title}</h2>}
          {description && <p className="text-sm text-slate-400">{description}</p>}
        </div>
      )}
      <div className="px-6 py-5">{children}</div>
      {footer && <div className="border-t border-white/10 px-6 py-4">{footer}</div>}
    </div>
  );
}
