import { ICourse, IVideoLesson } from '../../shared/@types/types';

export const fakeLessons: Partial<IVideoLesson>[] = [
  {
    title: 'Sample Lesson Title 1',
    link: 'http://example.com/lesson1.m3u8',
    previewImageLink: 'http://example.com/lesson1-preview.png',
    order: 1,
    duration: 120,
  },
  {
    title: 'Sample Lesson Title 2',
    link: 'http://example.com/lesson2.m3u8',
    previewImageLink: 'http://example.com/lesson2-preview.png',
    order: 2,
    duration: 180,
  },
];

export const fakeCourse: Partial<ICourse> = {
  id: '1',
  title: 'Course 1',
  description: 'This is course 1',
  meta: {
    slug: 'Course 1',
    courseVideoPreview: { duration: 100, link: '', previewImageLink: '' },
    skills: [],
  },
  lessons: fakeLessons as IVideoLesson[],
};

export const fakeCourses: Partial<ICourse>[] = [
  {
    id: '1',
    title: 'Course 1',
    description: 'This is course 1',
    meta: {
      slug: 'Course 1',
      courseVideoPreview: { duration: 100, link: '', previewImageLink: '' },
      skills: [],
    },
    lessons: [],
  },
  {
    id: '2',
    title: 'Course 2',
    description: 'This is course 2',
    meta: {
      slug: 'Course 2',
      courseVideoPreview: { duration: 200, link: '', previewImageLink: '' },
      skills: [],
    },
    lessons: [],
  },
  {
    id: '3',
    title: 'Course 3',
    description: 'This is course 3',
    meta: {
      slug: 'Course 3',
      courseVideoPreview: { duration: 120, link: '', previewImageLink: '' },
      skills: [],
    },
    lessons: [],
  },
];
