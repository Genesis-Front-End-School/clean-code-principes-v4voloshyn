import { FC, useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';

import { LessonItem } from '../lesson-item/LessonItem.component';

import { ICourseItem, VideoLesson } from '../../types/types';

import './LessonsList.scss';

interface LessonsListProps {
  handleChangeLessonData: (videoSrc: string, imagePreviewLink: string) => void;
  activeLessonVideoLink: string;
}

export const LessonsList: FC<LessonsListProps> = ({
  handleChangeLessonData,
  activeLessonVideoLink,
}) => {
  const { lessons } = useLoaderData() as ICourseItem;

  const sortedVideoLessonsByASCOrder = useMemo((): VideoLesson[] => {
    return lessons.sort((lessonA, lessonB) => lessonA.order - lessonB.order);
  }, [lessons]);

  return (
    <div className="lesson__list">
      {sortedVideoLessonsByASCOrder.map((lesson) => {
        return (
          <LessonItem
            key={lesson.id}
            lessonData={lesson}
            handleChangeLessonData={handleChangeLessonData}
            activeLessonVideoLink={activeLessonVideoLink}
          />
        );
      })}
    </div>
  );
};
