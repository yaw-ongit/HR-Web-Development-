import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div
      className={cn(
        'w-full px-4 pb-10 pt-4 sm:px-6 lg:px-6',
        className,
      )}
    >
      {children}
    </div>
  );
}
