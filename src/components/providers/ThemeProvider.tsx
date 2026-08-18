'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange {...props}>
      {children}
    </NextThemesProvider>
  );
}

// Keep the old hook interface for backwards compatibility with ThemeToggle
export const useTheme = () => {
  const { theme, setTheme, systemTheme } = useNextTheme();
  
  const toggleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else if (systemTheme === 'dark') setTheme('light');
    else setTheme('dark');
  };

  return { theme: theme === 'system' ? systemTheme : theme, setTheme, toggleTheme };
};
