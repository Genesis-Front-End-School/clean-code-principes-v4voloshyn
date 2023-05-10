import { FC } from 'react';

import './Spinner.scss';

export interface SpinnerProps {
  variant?: 'small' | 'fullscreen';
}

export const Spinner: FC<SpinnerProps> = ({ variant = 'small' }) => {
  if (variant === 'fullscreen') {
    return (
      <div className="spinner-wrapper_full">
        <div className="spinner" role="status" aria-label="loading" />
      </div>
    );
  }

  return (
    <div className="spinner-wrapper">
      <span>Loading...</span>
      <div
        className="spinner spinner-small"
        role="status"
        aria-label="loading"
      />
    </div>
  );
};
