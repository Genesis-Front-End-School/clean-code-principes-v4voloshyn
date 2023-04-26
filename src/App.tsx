import { RouterProvider } from 'react-router-dom';

import { Spinner } from './components/spinner/Spinner.component';

import { router } from './routes/routes';

export const App = () => {
  return (
    <RouterProvider
      router={router}
      fallbackElement={<Spinner variant="fullscreen" />}
    />
  );
};
