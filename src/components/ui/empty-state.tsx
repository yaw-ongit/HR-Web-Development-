import Link from 'next/link';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  /** Icon to display — can be a string emoji or a ReactNode (e.g. a Lucide icon) */
  icon?: ReactNode;
  title: string;
  description: string;
  ctaLabel?: string;
  href?: string;
  onCtaClick?: () => void;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
  children?: ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  ctaLabel,
  href,
  onCtaClick,
  secondaryLabel,
  secondaryHref,
  className,
  children,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      aria-label={title}
      className={cn(
        'flex w-full flex-col items-center rounded-[28px] border border-white/10 bg-slate-900/90 p-10 text-center shadow-card',
        className,
      )}
    >
      {/* Icon */}
      {icon && (
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-800/80 ring-1 ring-white/10 text-slate-400">
          {icon}
        </div>
      )}

      <h2 className="text-xl font-semibold text-slate-100">{title}</h2>
      <p className="mt-3 max-w-sm text-sm leading-7 text-slate-400">{description}</p>

      {children}

      {/* Actions */}
      {(ctaLabel || secondaryLabel) && (
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {ctaLabel && (
            href ? (
              <Link
                href={href}
                className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                {ctaLabel}
              </Link>
            ) : (
              <button
                type="button"
                onClick={onCtaClick}
                className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                {ctaLabel}
              </button>
            )
          )}
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/90 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

/** Pre-composed empty states for common HRIS use cases */
export function NoEmployeesEmptyState({ onAdd }: { onAdd?: () => void }) {
  return (
    <EmptyState
      icon={<span className="text-2xl">👥</span>}
      title="No employees found"
      description="Your employee directory is empty or no records match the current filters. Add employees or adjust your search criteria."
      ctaLabel="Add employee"
      onCtaClick={onAdd}
      secondaryLabel="Import from CSV"
      secondaryHref="/people"
    />
  );
}

export function NoAttendanceEmptyState() {
  return (
    <EmptyState
      icon={<span className="text-2xl">📅</span>}
      title="No attendance records"
      description="No attendance data is available for the selected period or filters. Try adjusting the date range or department."
      ctaLabel="View today"
      href="/workforce/attendance"
    />
  );
}

export function NoTrainingEmptyState() {
  return (
    <EmptyState
      icon={<span className="text-2xl">📚</span>}
      title="No training programs"
      description="No training programs have been assigned. Create a new program or enroll employees from the talent module."
      ctaLabel="Manage training"
      href="/talent/training"
    />
  );
}

export function NoClaimsEmptyState() {
  return (
    <EmptyState
      icon={<span className="text-2xl">📋</span>}
      title="No claims submitted"
      description="No claims have been submitted yet. Eligible employees can submit medical and welfare claims through the compensation module."
      ctaLabel="View claims"
      href="/compensation/claims"
    />
  );
}

export function NoReportsEmptyState() {
  return (
    <EmptyState
      icon={<span className="text-2xl">📊</span>}
      title="No reports available"
      description="No reports have been generated for this period. Generate a report to analyze workforce data and trends."
      ctaLabel="Go to analytics"
      href="/analytics"
    />
  );
}

export function NoNotificationsEmptyState() {
  return (
    <EmptyState
      icon={<span className="text-2xl">🔔</span>}
      title="All caught up"
      description="You have no new notifications. We'll notify you when something requires your attention."
    />
  );
}

export function NoDataEmptyState({ module }: { module?: string }) {
  return (
    <EmptyState
      icon={<span className="text-2xl">📂</span>}
      title={`No ${module ?? 'data'} available`}
      description="There are no records to display at this time. This section will populate once data is available."
      ctaLabel="Return home"
      href="/"
    />
  );
}
