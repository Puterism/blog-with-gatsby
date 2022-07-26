import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
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

  useEffect(() => {
    updateLayout(initialTheme);
  }, [initialTheme, updateLayout]);

  return (
    <ThemeContext.Provider value={{ theme, darkMode, onChange }}>
      <Helmet>
        <script>
          {`
            if (typeof window !== 'undefined') {
              const theme = localStorage.getItem('theme');

              if (theme === 'dark') {
                document.documentElement.setAttribute('class', 'dark');
              } else if (theme !== 'light' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.setAttribute('class', 'dark');
              }
            }
          `}
        </script>
      </Helmet>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
