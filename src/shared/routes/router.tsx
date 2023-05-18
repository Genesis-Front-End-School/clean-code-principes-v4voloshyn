import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { ErrorPage } from '../../pages/error/Error.page';
import { getAllCourses, getCourseById } from '../api/courses/courses.api';

const Course = React.lazy(async () => import('../../pages/course/Course.page'));
const Home = React.lazy(async () => import('../../pages/home/Home.page'));
const App = React.lazy(async () => import('../../app/App'));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <React.Suspense>
          <App />
        </React.Suspense>
      }
      errorElement={<ErrorPage />}
    >
      <Route
        index
        element={<Home />}
        loader={() => getAllCourses()}
        errorElement={<ErrorPage />}
      />
      <Route
        element={<Course />}
        path="course/:courseId"
        loader={({ params }) => getCourseById(String(params.courseId))}
        errorElement={<ErrorPage />}
      />
    </Route>
  )
);

//   {
//     path: '/',
//     element: <App />,
//     errorElement: ,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//         loader: () => getAllCourses(),
//       },
//       {
//         path: 'course/:courseId',
//         lazy: () => import('../../pages/course/Course.page'),
//         loader: ({ params }) => getCourseById(String(params.courseId)),
//         errorElement: <ErrorPage />,
//       },
//     ],
//   },
// ]);
