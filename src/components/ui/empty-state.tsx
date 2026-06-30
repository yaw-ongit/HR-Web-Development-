import Link from 'next/link';
import { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  ctaLabel?: string;
  href?: string;
  children?: ReactNode;
}

export function EmptyState({ title, description, ctaLabel, href, children }: EmptyStateProps) {
  return (
    <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-slate-900/90 p-10 text-center shadow-card">
      <div className="mx-auto mb-6 h-16 w-16 rounded-3xl bg-slate-800/80 ring-1 ring-slate-700">
        <span className="mt-4 block text-2xl">⚠️</span>
      </div>
      <h1 className="text-2xl font-semibold text-slate-100">{title}</h1>
      <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
      {children}
      {ctaLabel && href && (
        <Link href={href} className="mt-6 inline-flex rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-400">
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}
