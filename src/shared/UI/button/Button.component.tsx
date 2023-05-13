/* eslint-disable react/jsx-props-no-spreading */
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

import { Spinner } from '../spinner/Spinner.component';
import './Button.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText?: string | ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick?: () => void;
}

export const Button: FC<Props> = ({
  buttonText,
  onClick = () => {},
  startIcon,
  endIcon,
  ...rest
}) => {
  return (
    <button className="button" type="button" onClick={onClick} {...rest}>
      {startIcon}
      <span className="button__text">{buttonText}</span>
      {endIcon}
    </button>
  );
};
