import { createBrowserRouter } from 'react-router-dom';

import { Course } from '../pages/course/Course.page';
import { Home } from '../pages/home/Home.page';

import { Layout } from '../components/common/layout/Layout.component';

import { getAllCourses, getCourseById } from '../api/courses/courses.api';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
      },
    ],
  },
]);
