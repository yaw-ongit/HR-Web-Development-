import { ReactNode } from 'react';
import clsx from 'clsx';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={clsx('mx-auto max-w-[1680px] px-4 pb-10 pt-6 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
}
