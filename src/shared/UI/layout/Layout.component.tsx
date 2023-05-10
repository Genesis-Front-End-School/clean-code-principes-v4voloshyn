import { FC, PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '../../components/footer/Footer.component';
import { Header } from '../../components/header/Header.component';
import { Container } from '../container/Container.component';

import './Layout.scss';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container>
      <Header />
      <main className="main">
        <Outlet />
        {children}
      </main>
      <Footer />
    </Container>
  );
};
