import { IVideoLesson } from '../../../shared/@types/types';

export const getTotalLessonsDurationInMin = (
  lessonsList: Pick<IVideoLesson, 'duration'>[]
): number => {
  const SECONDS_IN_ONE_MIN = 60;
  const totalDurationInMin =
    lessonsList.reduce((acc, lesson) => acc + lesson.duration, 0) /
    SECONDS_IN_ONE_MIN;
  return Math.round(totalDurationInMin);
};

export const formatSlug = (slug: string): string => {
  if (slug.length <= 0 || typeof slug !== 'string') {
    return '';
  }

  return (slug[0].toUpperCase() + slug.slice(1)).split('-').join(' ');
};

export const formatPreviewImageURL = (
  previewImageLink: string,
  order: number
): string => {
  return `${previewImageLink}/lesson-${order}.webp`;
};
