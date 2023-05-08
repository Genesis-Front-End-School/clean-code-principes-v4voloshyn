import { FC } from 'react';

import './Spinner.scss';

interface SpinnerProps {
  variant?: 'small' | 'fullscreen';
}

export const Spinner: FC<SpinnerProps> = ({ variant = 'small' }) => {
  if (variant === 'fullscreen') {
    return <div className="spinner" />;
  }

  return (
    <div className="spinner-wrapper">
      <span>Loading...</span>
      <div className="spinner spinner-small" />
    </div>
  );
};
