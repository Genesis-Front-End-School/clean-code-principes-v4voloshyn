import { motion } from 'framer-motion';
import { FC, useState, useMemo, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

import { CourseItemPreview } from './@types/types';
import { MCourseCard } from './components/course-card/CourseCard.component';
import { Pagination } from './components/pagination/Pagination.component';

import './CourseList.scss';

const componentAnimations = {
  initial: { opacity: 0, y: 20 },
  onScreen: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.1, duration: 0.5 },
  },
  titleInit: {
    opacity: 0,
  },
  titleOnScreen: {
    opacity: 1,
    transition: { delay: 0.1, duration: 0.5 },
  },
};

export const CourseList: FC = () => {
  const courses = useLoaderData() as CourseItemPreview[];
  const [paginatedCourses, setPaginatedCourses] =
    useState<CourseItemPreview[]>(courses);
  const [startOffset, setStartOffset] = useState(0);

  const COURSES_PER_PAGE_COUNT = 10;
  const endOffset: number = startOffset + COURSES_PER_PAGE_COUNT;

  const totalPageCount: number = useMemo(() => {
    return Math.ceil(courses.length / COURSES_PER_PAGE_COUNT);
  }, [courses.length]);

  useEffect(() => {
    setPaginatedCourses(courses.slice(startOffset, endOffset));
  }, [startOffset, endOffset, courses]);

  return (
    <div className="course-list">
      <motion.h1
        className="course-list__title"
        variants={componentAnimations}
        initial="titleInit"
        whileInView="titleOnScreen"
        viewport={{ once: true }}
      >
        Course List
      </motion.h1>
      <div className="courses">
        {paginatedCourses.map((course) => (
          <MCourseCard
            key={course.id}
            courseData={course}
            variants={componentAnimations}
            initial="initial"
            whileInView="onScreen"
            viewport={{ once: true, amount: 0.2 }}
          />
        ))}
      </div>
      <Pagination
        totalPageCount={totalPageCount}
        setStartOffset={setStartOffset}
        itemsPerPage={COURSES_PER_PAGE_COUNT}
      />
    </div>
  );
};
