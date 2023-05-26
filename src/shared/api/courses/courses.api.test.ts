import { vi } from 'vitest';

import {
  mockCourses,
  mockSingleCourse,
} from '../../../tests/__mocks__/api-data';

import { getAllCourses, getCourseById } from './courses.api';

vi.mock('./courses.api.ts', () => ({
  getAllCourses: vi.fn(() => Promise.resolve(mockCourses)),
  getCourseById: vi.fn(() => Promise.resolve(mockSingleCourse)),
}));

describe('getAllCourses', () => {
  it('should return an array of courses', async () => {
    const courses = await getAllCourses();

    expect(courses).toEqual(mockCourses);
    expect(getAllCourses).toHaveBeenCalledTimes(1);
  });
});

describe('getCourseById', () => {
  it('should return a course with the given id', async () => {
    const courseId = '3';

    const result = await getCourseById(courseId);

    expect(getCourseById).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockSingleCourse);
  });
});
