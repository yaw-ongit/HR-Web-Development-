import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={clsx('animate-pulse rounded-3xl bg-slate-800/80', className)} />;
}
