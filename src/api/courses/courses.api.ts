import { ICourse } from '../../@types/types';
import { getRequest } from '../api';
import { COURSES } from '../endpoints';

export const getAllCourses = async (): Promise<ICourse[]> => {
  const { courses } = await getRequest<{ courses: ICourse[] }>(COURSES.PREVIEW);
  return courses;
};

export const getCourseById = async (courseId: string): Promise<ICourse> => {
  const course = await getRequest<ICourse>(`${COURSES.PREVIEW}/${courseId}`);

  return course;
};
