'use client';

/**
 * ThemeProvider — currently the application runs in dark-only mode.
 * This provider is retained as a placeholder for future light/dark toggle support.
 * When light mode is needed, extend this with next-themes or a custom CSS class strategy.
 */
import { createContext, useContext, ReactNode } from 'react';

interface ThemeContextValue {
  theme: 'dark';
}

const ThemeContext = createContext<ThemeContextValue>({ theme: 'dark' });

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeContext.Provider value={{ theme: 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}
