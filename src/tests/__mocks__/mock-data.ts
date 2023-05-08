import { ICourse } from '../../@types/types';

export const fakeSingleCourse: Partial<ICourse> = {
  id: '3',
  title: 'Course 3',
  description: 'Awesome course 3',
};

export const fakeCourses: Partial<ICourse>[] = [
  { id: '1', title: 'Course 1', description: 'Awesome course 1' },
  { id: '2', title: 'Course 2', description: 'Awesome course 2' },
  { id: '3', title: 'Course 3', description: 'Awesome course 3' },
];

export const fakeTokenData = { token: 'uuid123' };
export const fakeResponseData = { foo: 'bar' };
