/* eslint-disable react/jsx-props-no-spreading */
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

import { Spinner } from '../spinner/Spinner.component';

import './Button.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText?: string | ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
}

export const Button: FC<Props> = ({
  buttonText = 'Click me',
  onClick = () => {},
  isLoading = false,
  ...rest
}) => {
  return (
    <button
      className="button"
      type="button"
      onClick={onClick}
      disabled={isLoading}
      {...rest}
    >
      <span className="button__text">
        {isLoading ? <Spinner /> : buttonText}
      </span>
    </button>
  );
};
