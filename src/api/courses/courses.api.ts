import { ICourseItem } from '../../types/types';
import { getRequest } from '../api';
import { COURSES } from '../endpoints';

export const getAllCourses = async () => {
  const { courses } = await getRequest<{ courses: ICourseItem[] }>(
    COURSES.PREVIEW
  );
  return courses;
};

export const getCourseById = async (courseId: string) => {
  const course = await getRequest<ICourseItem>(
    `${COURSES.PREVIEW}/${courseId}`
  );

  return course;
};
