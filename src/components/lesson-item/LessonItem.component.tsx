import clsx from 'clsx';
import { FC } from 'react';
import { FaLock, FaPlayCircle, FaUnlink } from 'react-icons/fa';

import { IVideoLesson } from '../../@types/types';
import { formatPreviewImageURL } from '../../pages/course/utils/utils';

import './LessonItem.scss';

interface Props {
  lessonData: IVideoLesson;
  handleChangeLessonData: (videoSrc: string, imagePreviewLink: string) => void;
  activeLessonVideoLink: string;
}

export const LessonItem: FC<Props> = ({
  lessonData,
  handleChangeLessonData,
  activeLessonVideoLink,
}) => {
  const { status, title, duration, link, previewImageLink, order } = lessonData;
  const isLessonLocked = status === 'locked';
  const noVideoLink = !link || link.length === 0;
  const isLessonActive = !noVideoLink && activeLessonVideoLink === link;
  const lessonDurationInMin = Math.round(duration / 60);

  const selectLessonToView = () => {
    if (!isLessonLocked) {
      handleChangeLessonData(
        link,
        formatPreviewImageURL(previewImageLink, order)
      );

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const itemStyles = clsx(`lesson__item`, {
    lesson__item_active: isLessonActive,
    lesson__item_locked: isLessonLocked || noVideoLink,
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
          {order}. {title}
        </div>
        <div className="lesson__description">
          {isLessonLocked && <FaLock />}
          {noVideoLink && <FaUnlink />} <FaPlayCircle />
          {lessonDurationInMin}min
        </div>
      </button>
    </div>
  );
};
