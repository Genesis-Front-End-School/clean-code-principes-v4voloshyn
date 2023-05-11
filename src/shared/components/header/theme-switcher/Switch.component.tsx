import { FC } from 'react';

import { ITheme } from '../../../context/themeContext';

import './Switch.scss';

type SwitchProps = ITheme;

export const Switch: FC<SwitchProps> = ({ theme, toggleTheme }) => {
  return (
    <span className="switch-wrapper">
      <label id="switch" htmlFor="slider" className="switch">
        <input
          type="checkbox"
          onClick={toggleTheme}
          id="slider"
          checked={theme === 'dark'}
        />
        <span className="slider round" />
      </label>
    </span>
  );
};
