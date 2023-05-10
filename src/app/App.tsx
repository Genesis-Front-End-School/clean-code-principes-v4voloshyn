import { RouterProvider } from 'react-router-dom';

import { Spinner } from '../shared/UI/spinner/Spinner.component';
import { router } from '../shared/routes/routes';

export const App = () => {
  return (
    <RouterProvider
      router={router}
      fallbackElement={<Spinner variant="fullscreen" />}
    />
  );
};
