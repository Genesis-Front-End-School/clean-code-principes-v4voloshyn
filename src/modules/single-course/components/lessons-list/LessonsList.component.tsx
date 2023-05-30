import { motion } from 'framer-motion';
import { FC, useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';

import { ICourse, IVideoLesson } from '../../../../shared/@types/types';
import { LessonItem } from '../lesson-item/LessonItem.component';

import './LessonsList.scss';

interface Props {
  handleChangeLessonData: (videoSrc: string, imagePreviewLink: string) => void;
  activeLessonVideoLink: string;
}

const componentAnimations = {
  initial: { opacity: 0, x: 50 },
  onScreen: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.1, duration: 0.5 },
  },
};

export const LessonsList: FC<Props> = ({
  handleChangeLessonData,
  activeLessonVideoLink,
}) => {
  const { lessons } = useLoaderData() as ICourse;

  const sortedVideoLessonsByASCOrder = useMemo((): IVideoLesson[] => {
    return lessons.sort((lessonA, lessonB) => lessonA.order - lessonB.order);
  }, [lessons]);

  return (
    <motion.div
      variants={componentAnimations}
      initial="initial"
      whileInView="onScreen"
      viewport={{ once: true }}
      className="lesson__list"
    >
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
    </motion.div>
  );
};
