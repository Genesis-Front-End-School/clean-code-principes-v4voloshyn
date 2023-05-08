import { createBrowserRouter } from 'react-router-dom';

import { getAllCourses, getCourseById } from '../api/courses/courses.api';
import { Layout } from '../components/common/layout/Layout.component';
import { Course } from '../pages/course/Course.page';
import { ErrorPage } from '../pages/error/Error.page';
import { Home } from '../pages/home/Home.page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
