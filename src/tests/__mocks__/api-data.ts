import { ICourse } from '../../shared/@types/types';

export const mockSingleCourse: Partial<ICourse> = {
  id: '3',
  title: 'Course 3',
  description: 'Awesome course 3',
};

export const mockCourses: Partial<ICourse>[] = [
  { id: '1', title: 'Course 1', description: 'Awesome course 1' },
  { id: '2', title: 'Course 2', description: 'Awesome course 2' },
  { id: '3', title: 'Course 3', description: 'Awesome course 3' },
];

export const mockTokenData = { token: 'uuid123' };
export const mockResponseData = { foo: 'bar' };
