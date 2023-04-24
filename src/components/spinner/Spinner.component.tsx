import { FC } from 'react';

import './Spinner.scss';

interface SpinnerProps {
  size?: 'small' | 'fullscreen';
}

export const Spinner: FC<SpinnerProps> = ({ size = 'small' }) => {
  if (size === 'fullscreen') {
    return <div className="spinner" />;
  }

  return (
    <div className="spinner-wrapper">
      <span>Loading...</span>
      <div className="spinner spinner-small" />
    </div>
  );
};
