import clsx from 'clsx';
import { FC } from 'react';

import './Modal.scss';

interface ModalProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  withOverlay?: boolean;
  children: React.ReactNode;
}
export const Modal: FC<ModalProps> = ({
  active,
  setActive,
  withOverlay = true,
  children,
}) => {
  const modalStyle = clsx('modal', {
    'modal-active': active,
    'modal-overlay': withOverlay,
  });
  return (
    <div className={modalStyle}>
      <div className="modal__content">
        <button
          type="button"
          className="modal__close"
          onClick={() => setActive(false)}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};
