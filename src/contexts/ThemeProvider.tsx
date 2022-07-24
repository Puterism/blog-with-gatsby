import React, { useCallback, useContext, useLayoutEffect, useState } from 'react';
import { Theme } from '../@types';

interface ThemeContextValue {
  theme: Theme;
  darkMode: boolean;
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | null;
}

const initialValue: ThemeContextValue = {
  theme: Theme.Light,
  darkMode: false,
  onChange: null,
};

export const ThemeContext = React.createContext(initialValue);

export const useTheme = () => {
  const context = useContext(ThemeContext);

  return context;
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const isBrowser = typeof window !== 'undefined';

  const prefersTheme =
    isBrowser && window.matchMedia(`(prefers-color-scheme: ${Theme.Dark})`).matches ? Theme.Dark : Theme.Light;
  const isValidTheme = isBrowser && 'theme' in localStorage && Object.values(Theme).includes(localStorage.theme);
  const initialTheme = isValidTheme ? (localStorage.theme as Theme) : prefersTheme;

  const [theme, setTheme] = useState(initialTheme);

  const darkMode = theme === Theme.Dark;

  const updateLayout = useCallback((targetTheme: Theme) => {
    if (targetTheme === Theme.Dark) {
      document.documentElement.classList.add(Theme.Dark);
    }

    if (targetTheme === Theme.Light) {
      document.documentElement.classList.remove(Theme.Dark);
    }

    localStorage.theme = targetTheme;
    setTheme(targetTheme);
  }, []);

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const currentTheme = event.target.checked ? Theme.Dark : Theme.Light;

      updateLayout(currentTheme);
      localStorage.theme = currentTheme;
    },
    [updateLayout]
  );

  useLayoutEffect(() => {
    updateLayout(initialTheme);
  }, [initialTheme, updateLayout]);

  return <ThemeContext.Provider value={{ theme, darkMode, onChange }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
