/* eslint-disable react/jsx-props-no-spreading */
import { FC, ReactNode } from 'react';

import { Spinner } from '../spinner/Spinner.component';

import './Button.scss';

interface ButtonProps {
  buttonText: string | ReactNode;
  onClick: () => void;
  isLoading?: boolean;
}

export const Button: FC<ButtonProps> = ({
  buttonText = 'Click me',
  onClick = () => {},
  isLoading = false,
}) => {
  return (
    <button
      className="button"
      type="button"
      onClick={onClick}
      disabled={isLoading}
    >
      <span className="button__text">
        {isLoading ? <Spinner /> : buttonText}
      </span>
    </button>
  );
};
