import { useEffect, useState } from 'react';

/**
 * Debounce a rapidly-changing value.
 * Useful for search inputs to avoid re-filtering on every keystroke.
 *
 * @param value  The value to debounce.
 * @param delay  Delay in milliseconds (default 300ms).
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedValue(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
