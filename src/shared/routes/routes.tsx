import { createBrowserRouter } from 'react-router-dom';

import { App } from '../../app/App';
import { Course } from '../../pages/course/Course.page';
import { ErrorPage } from '../../pages/error/Error.page';
import { Home } from '../../pages/home/Home.page';
import { getAllCourses, getCourseById } from '../api/courses/courses.api';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => getAllCourses(),
      },
      {
        path: 'course/:courseId',
        element: <Course />,
        loader: ({ params }) => getCourseById(String(params.courseId)),
        errorElement: <ErrorPage />,
      },
    ],
  },
]);
