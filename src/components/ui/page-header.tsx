import { ReactNode } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  module?: string;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({
  module,
  title,
  description,
  breadcrumbs,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        'rounded-[28px] border border-white/10 bg-slate-900/95 px-6 py-6 shadow-card',
        className,
      )}
    >
      {/* Breadcrumb */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-3">
          <ol className="flex flex-wrap items-center gap-1 text-xs text-slate-500">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center gap-1">
                {index > 0 && (
                  <ChevronRight className="h-3 w-3 text-slate-600" aria-hidden="true" />
                )}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="uppercase tracking-[0.24em] transition hover:text-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 rounded"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className="uppercase tracking-[0.24em] text-sky-300"
                    aria-current="page"
                  >
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          {module && !breadcrumbs && (
            <p className="text-xs uppercase tracking-[0.3em] text-sky-300">{module}</p>
          )}
          <h1 className="text-3xl font-semibold text-slate-100">{title}</h1>
          {description && (
            <p className="max-w-2xl text-sm text-slate-400">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex shrink-0 flex-wrap items-center gap-3">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}
