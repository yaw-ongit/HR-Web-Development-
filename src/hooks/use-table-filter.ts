import { useState, useMemo } from 'react';
import { useDebounce } from './use-debounce';

interface FilterConfig<T> {
  data: T[];
  searchFields: (keyof T)[];
  filters?: Record<string, (item: T, value: string) => boolean>;
}

/**
 * Generic table filter hook.
 * Handles search debouncing and multi-field filtering.
 *
 * @example
 * const { search, setSearch, filterValues, setFilter, filteredData } = useTableFilter({
 *   data: employees,
 *   searchFields: ['fullName', 'email', 'department'],
 *   filters: {
 *     department: (e, v) => v === 'All' || e.department === v,
 *     status: (e, v) => v === 'All' || e.status === v,
 *   },
 * });
 */
export function useTableFilter<T>({ data, searchFields, filters = {} }: FilterConfig<T>) {
  const [search, setSearch] = useState('');
  const [filterValues, setFilterValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(Object.keys(filters).map((k) => [k, 'All'])),
  );

  const debouncedSearch = useDebounce(search, 250);

  const setFilter = (key: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const filteredData = useMemo(() => {
    const q = debouncedSearch.toLowerCase();
    return data.filter((item) => {
      const matchesSearch =
        !q ||
        searchFields.some((field) =>
          String(item[field] ?? '').toLowerCase().includes(q),
        );

      const matchesFilters = Object.entries(filters).every(([key, fn]) =>
        fn(item, filterValues[key] ?? 'All'),
      );

      return matchesSearch && matchesFilters;
    });
  }, [data, debouncedSearch, searchFields, filters, filterValues]);

  return { search, setSearch, filterValues, setFilter, filteredData };
}
