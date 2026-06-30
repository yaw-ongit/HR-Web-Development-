import { ReactNode } from 'react';
import clsx from 'clsx';

interface SectionContainerProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function SectionContainer({ title, children, className }: SectionContainerProps) {
  return (
    <section className={clsx('space-y-4', className)}>
      {title && <h3 className="text-lg font-semibold text-slate-100">{title}</h3>}
      {children}
    </section>
  );
}
