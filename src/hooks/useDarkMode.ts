import React, { useCallback, useLayoutEffect, useState } from 'react';

enum Theme {
  Light = 'light',
  Dark = 'dark',
}

const useDarkMode = () => {
  const isBrowser = typeof window !== 'undefined';

  const prefersTheme =
    isBrowser && window.matchMedia(`(prefers-color-scheme: ${Theme.Dark})`).matches ? Theme.Dark : Theme.Light;
  const isValidTheme = isBrowser && 'theme' in localStorage && Object.values(Theme).includes(localStorage.theme);
  const initialTheme = isValidTheme ? (localStorage.theme as Theme) : prefersTheme;

  const [theme, setTheme] = useState(initialTheme);

  const darkMode = theme === Theme.Dark;

  const setLayout = useCallback((targetTheme: Theme) => {
    if (targetTheme === Theme.Dark) {
      document.documentElement.classList.add(Theme.Dark);
    } else {
      document.documentElement.classList.remove(Theme.Dark);
    }

    localStorage.theme = targetTheme;
    setTheme(targetTheme);
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentTheme = event.target.checked ? Theme.Dark : Theme.Light;

    setLayout(currentTheme);
    localStorage.theme = currentTheme;
  };

  useLayoutEffect(() => {
    setLayout(initialTheme);
  }, [initialTheme, setLayout]);

  return { theme, darkMode, onChange };
};

export default useDarkMode;
