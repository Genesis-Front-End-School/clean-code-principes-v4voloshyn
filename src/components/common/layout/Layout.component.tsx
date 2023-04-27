import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Container } from '../../UI/container/Container.component';
import { Footer } from '../footer/Footer.component';
import { Header } from '../header/Header.component';

import './Layout.scss';

export const Layout: FC = () => {
  return (
    <Container>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </Container>
  );
};
