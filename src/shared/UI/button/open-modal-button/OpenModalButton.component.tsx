/* eslint-disable react/jsx-props-no-spreading */
import { ButtonHTMLAttributes, FC } from 'react';

import './OpenModalButton.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  openModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OpenModalButton: FC<Props> = ({ openModal, ...props }) => {
  return (
    <button
      type="button"
      className="question-button"
      onClick={() => openModal(true)}
      {...props}
    >
      Chat
    </button>
  );
};
