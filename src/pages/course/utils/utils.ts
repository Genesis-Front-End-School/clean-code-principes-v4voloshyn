import { VideoLesson } from '../../../types/types';

export const getTotalLessonsDurationInMin = (
  lessonsList: VideoLesson[]
): number => {
  const totalDuration =
    lessonsList.reduce((acc, lesson) => acc + lesson.duration, 0) / 60;
  return Math.round(totalDuration);
};

export const formatSlug = (slug: string): string => {
  return (slug[0].toUpperCase() + slug.slice(1)).split('-').join(' ');
};
