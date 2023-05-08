import { FC, useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';

import { ICourse, IVideoLesson } from '../../@types/types';
import { LessonItem } from '../lesson-item/LessonItem.component';

import './LessonsList.scss';

interface LessonsListProps {
  handleChangeLessonData: (videoSrc: string, imagePreviewLink: string) => void;
  activeLessonVideoLink: string;
}

export const LessonsList: FC<LessonsListProps> = ({
  handleChangeLessonData,
  activeLessonVideoLink,
}) => {
  const { lessons } = useLoaderData() as ICourse;

  const sortedVideoLessonsByASCOrder = useMemo((): IVideoLesson[] => {
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
