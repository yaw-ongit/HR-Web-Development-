'use client';

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  className?: string;
  /** Label for screen readers */
  label?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  className,
  label = 'Table pagination',
}: PaginationProps) {
  const start = totalItems && pageSize ? (currentPage - 1) * pageSize + 1 : undefined;
  const end = totalItems && pageSize ? Math.min(currentPage * pageSize, totalItems) : undefined;

  const buttonBase =
    'inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-brand-200 bg-white/90 text-sm text-slate-700 transition hover:border-brand-500 hover:bg-brand-50 hover:text-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <nav
      aria-label={label}
      className={cn(
        'flex flex-col items-center justify-between gap-3 border-t border-brand-100/80 px-4 py-4 sm:flex-row',
        className,
      )}
    >
      {/* Count info */}
      <p className="text-xs text-slate-500" aria-live="polite">
        {start && end && totalItems
          ? `Showing ${start}–${end} of ${totalItems} results`
          : `Page ${currentPage} of ${totalPages}`}
      </p>

      {/* Controls */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          aria-label="First page"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={buttonBase}
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Previous page"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={buttonBase}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Page numbers */}
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          let page: number;
          if (totalPages <= 5) {
            page = i + 1;
          } else if (currentPage <= 3) {
            page = i + 1;
          } else if (currentPage >= totalPages - 2) {
            page = totalPages - 4 + i;
          } else {
            page = currentPage - 2 + i;
          }
          return (
            <button
              key={page}
              type="button"
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
              onClick={() => onPageChange(page)}
              className={cn(
                buttonBase,
                currentPage === page && 'border-brand-500 bg-brand-50 text-brand-600',
              )}
            >
              {page}
            </button>
          );
        })}

        <button
          type="button"
          aria-label="Next page"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={buttonBase}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Last page"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={buttonBase}
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
    </nav>
  );
}
