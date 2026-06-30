import { useState, useMemo } from 'react';

interface UsePaginationOptions {
  total: number;
  pageSize?: number;
  initialPage?: number;
}

/**
 * Simple pagination hook.
 * Returns page controls and the slice range to apply to a dataset.
 */
export function usePagination({ total, pageSize = 10, initialPage = 1 }: UsePaginationOptions) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Clamp page if total changes
  const safePage = Math.min(currentPage, totalPages);

  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  const reset = () => setCurrentPage(1);

  return {
    currentPage: safePage,
    totalPages,
    pageSize,
    startIndex,
    endIndex,
    goToPage,
    reset,
    hasNext: safePage < totalPages,
    hasPrev: safePage > 1,
  };
}
