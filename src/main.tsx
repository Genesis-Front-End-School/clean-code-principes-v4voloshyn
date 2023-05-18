import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { Spinner } from './shared/UI/spinner/Spinner.component';
import { ThemeProvider } from './shared/context/themeContext';
import { router } from './shared/routes/routes';

import './shared/styles/global.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider>
    <RouterProvider
      router={router}
      fallbackElement={<Spinner variant="fullscreen" />}
    />
  </ThemeProvider>
);
