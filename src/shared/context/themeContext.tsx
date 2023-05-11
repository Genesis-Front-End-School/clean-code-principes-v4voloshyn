import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useLocalStorage } from '../hooks/useStorage';

export type ThemeType = 'light' | 'dark';

export interface ITheme {
  theme: ThemeType;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ITheme | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>('light');
  const [localStorageTheme, setLocalStorageTheme] = useLocalStorage<ThemeType>(
    'app-theme',
    'light'
  );

  const toggleTheme = useCallback(() => {
    const newTheme: ThemeType = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setLocalStorageTheme(newTheme);
  }, [theme, setLocalStorageTheme]);

  const themeStore: ITheme = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme]
  );

  useEffect(() => {
    setTheme(localStorageTheme || theme);

    if (theme === 'dark' && !document.body.classList.contains('dark')) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [localStorageTheme, theme]);

  return (
    <ThemeContext.Provider value={themeStore}>{children}</ThemeContext.Provider>
  );
};
