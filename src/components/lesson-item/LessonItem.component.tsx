import { FC } from 'react';
import { FaLock, FaPlayCircle, FaUnlink } from 'react-icons/fa';
import clsx from 'clsx';

import { formatPreviewImageURL } from '../../pages/course/utils/utils';

import { VideoLesson } from '../../types/types';

import './LessonItem.scss';

interface LessonItemProps {
  index: number;
  title: VideoLesson['title'];
  status: VideoLesson['status'];
  link: VideoLesson['link'];
  order: number;
  duration: VideoLesson['duration'];
  handleChangeLessonData: (videoSrc: string, imagePreviewLink: string) => void;
  activeLessonVideoLink: string;
  previewImageLink: string;
}

export const LessonItem: FC<LessonItemProps> = ({
  index,
  status,
  title,
  link,
  order,
  duration,
  handleChangeLessonData,
  activeLessonVideoLink,
  previewImageLink,
}) => {
  const lockedStatus = status === 'locked';
  const noVideoLink = !link || link.length === 0;
  const isLessonActive = link && activeLessonVideoLink === link;

  const selectLessonToView = () => {
    if (!lockedStatus) {
      handleChangeLessonData(
        link,
        formatPreviewImageURL(previewImageLink, order)
      );

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const itemStyles = clsx(`lesson__item`, {
    lesson__item_active: isLessonActive,
    lesson__item_locked: lockedStatus || noVideoLink,
  });

  return (
    <div className={itemStyles}>
      <input type="checkbox" name="lesson-viewed" className="lesson__viewed" />
      <button
        type="button"
        className="lesson__info"
        onClick={selectLessonToView}
      >
        <div className="lesson__title" title="">
          {index}. {title}
        </div>
        <div className="lesson__description">
          {lockedStatus && <FaLock />}
          {noVideoLink && <FaUnlink />} <FaPlayCircle />
          {Math.round(duration / 60)}min
        </div>
      </button>
    </div>
  );
};