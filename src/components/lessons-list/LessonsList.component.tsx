import { FC } from 'react';
import { useLoaderData } from 'react-router-dom';

import { ICourseItem } from '../../types/types';

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
  const { lessons } = useLoaderData() as ICourseItem;

  return (
    <div className="lesson__list">
      {lessons
        .sort((a, b) => a.order - b.order)
        .map((lesson, index) => {
          const { id, status, title, duration, link, previewImageLink, order } =
            lesson;
          return (
            <LessonItem
              key={id}
              index={index + 1}
              title={title}
              status={status}
              order={order}
              duration={duration}
              handleChangeLessonData={handleChangeLessonData}
              link={link}
              activeLessonVideoLink={activeLessonVideoLink}
              previewImageLink={previewImageLink}
            />
          );
        })}
    </div>
  );
};
