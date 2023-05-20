import { Spinner } from 'gfs-components-lib';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { ThemeProvider } from './shared/context/themeContext';
import { router } from './shared/routes/router';

import '../node_modules/gfs-components-lib/dist/style.css';
import './shared/styles/global.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider>
    <RouterProvider
      router={router}
      fallbackElement={<Spinner variant="fullscreen" />}
    />
  </ThemeProvider>
);
