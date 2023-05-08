import { AxiosError } from 'axios';
import { FC } from 'react';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

import { Layout } from '../../components/common/layout/Layout.component';

import './Error.scss';

export const ErrorPage: FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Layout>
        <div className="error-page error">
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>
              {error.status} {error.statusText} - {error.error?.message}
            </i>
            <p>
              <Link to="/" className="error__link">
                Go to main
              </Link>
            </p>
          </p>
        </div>
      </Layout>
    );
  }

  const apiError = error as AxiosError;

  return (
    <div className="error-page error">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>Error code: {apiError?.message}</p>
      <div>
        <Link to="/" className="error__link">
          <span className="error__link_text">Go to main</span>
        </Link>
      </div>
    </div>
  );
};
