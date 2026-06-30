import { useState, useCallback } from 'react';

/**
 * Persist state in localStorage with automatic JSON serialisation.
 * Falls back gracefully when localStorage is unavailable (SSR).
 *
 * @param key           localStorage key.
 * @param initialValue  Default value when key is absent.
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = typeof value === 'function' ? (value as (prev: T) => T)(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          // Ignore write errors (e.g., private browsing storage full)
        }
        return next;
      });
    },
    [key],
  );

  return [storedValue, setValue];
}
