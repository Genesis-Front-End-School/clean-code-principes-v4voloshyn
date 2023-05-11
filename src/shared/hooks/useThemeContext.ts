import { useContext } from 'react';

import { ThemeContext } from '../context/themeContext';

export const useThemeContext = () => {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error('Cannot use Theme context outside of the Provider');
  }

  return theme;
};
