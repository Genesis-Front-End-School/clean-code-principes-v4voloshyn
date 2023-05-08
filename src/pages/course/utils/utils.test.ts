import { IVideoLesson } from '../../../@types/types';

import {
  getTotalLessonsDurationInMin,
  formatSlug,
  formatPreviewImageURL,
} from './utils';

describe('Course utils', () => {
  type LessonsListDurationType = Pick<IVideoLesson, 'duration'>[];

  describe('getTotalLessonsDurationInMin function', () => {
    it('should return 0 if the lessons list is empty', () => {
      const lessonsList: LessonsListDurationType = [];
      const result = getTotalLessonsDurationInMin(lessonsList);
      expect(result).toBe(0);
    });

    it('returns the total duration of lessons in minutes', () => {
      const lessonsList: LessonsListDurationType = [
        { duration: 100 },
        { duration: 202 },
        { duration: 90 },
      ];
      const expectedDuration = 7;
      const totalDurationInMin = getTotalLessonsDurationInMin(lessonsList);
      expect(totalDurationInMin).toBe(expectedDuration);
    });

    it('should return the correct total duration when the lessons list has one lesson', () => {
      const lessonsList: LessonsListDurationType = [{ duration: 300 }];
      const result = getTotalLessonsDurationInMin(lessonsList);
      expect(result).toBe(5);
    });
  });

  describe('formatSlug', () => {
    it('formats a slug correctly', () => {
      const slug = 'some-informative-slug';
      const expectedFormattedSlug = 'Some informative slug';
      const formattedSlug = formatSlug(slug);
      expect(formattedSlug).toBe(expectedFormattedSlug);
    });

    it('should return the correct formatted string for a single word slug', () => {
      const slug = 'awesome';
      const result = formatSlug(slug);
      expect(result).toBe('Awesome');
    });

    it('should return an empty string if the input string is empty', () => {
      const slug = '';
      const result = formatSlug(slug);
      expect(result).toBe('');
    });
  });

  describe('formatPreviewImageURL', () => {
    it('formats a preview image URL correctly', () => {
      const previewImageLink = 'https://domain.com/preview-image';
      const order = 7;
      const expectedFormattedURL =
        'https://domain.com/preview-image/lesson-7.webp';
      const formattedURL = formatPreviewImageURL(previewImageLink, order);
      expect(formattedURL).toBe(expectedFormattedURL);
    });
  });
});
