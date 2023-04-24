import { FC, ReactNode } from 'react';

import './Container.scss';

interface ContainerProps {
  children: ReactNode;
}

export const Container: FC<ContainerProps> = ({ children }) => {
  return <div className="container">{children}</div>;
};
