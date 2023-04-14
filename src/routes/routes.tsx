import { createBrowserRouter } from 'react-router-dom';

import { Course } from '../pages/course/Course.page';
import { Home } from '../pages/home/Home.page';

import { Layout } from '../components/layout/Layout.component';

import { fetchCourseById, fetchCourses } from '../helpers';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: fetchCourses,
      },
      {
        path: 'course/:courseId',
        element: <Course />,
        loader: ({ params }) => fetchCourseById(String(params.courseId)),
      },
    ],
  },
]);
