'use client';

import { ReactNode, createContext, useState } from 'react';

interface ThemeContextValue {
  theme: 'dark' | 'light';
  setTheme: (value: 'dark' | 'light') => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  setTheme: () => undefined,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme === 'dark' ? 'theme-dark' : 'theme-light'}>{children}</div>
    </ThemeContext.Provider>
  );
}
