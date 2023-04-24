import { FC, useState, useMemo, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

import { CourseItem } from '../course-item/CourseItem.component';
import { Pagination } from '../pagination/Pagination.component';

import { CourseItemPreview } from '../../types/types';

import './CourseList.scss';

export const CourseList: FC = () => {
  const courses = useLoaderData() as CourseItemPreview[];
  const [paginatedCourses, setPaginatedCourses] = useState(courses);
  const [startOffset, setStartOffset] = useState(0);

  const COURSES_PER_PAGE_COUNT = 10;
  const endOffset = startOffset + COURSES_PER_PAGE_COUNT;

  const totalPageCount = useMemo(() => {
    return Math.ceil(courses.length / COURSES_PER_PAGE_COUNT);
  }, [courses.length]);

  useEffect(() => {
    setPaginatedCourses(courses.slice(startOffset, endOffset));
  }, [startOffset, endOffset, courses]);

  return (
    <div className="course-list">
      <h1 className="course-list__title">Course List</h1>
      <div className="courses">
        {paginatedCourses.map((course) => {
          const {
            id,
            title,
            lessons,
            lessonsCount,
            meta,
            previewImageLink,
            rating,
          } = course;

          return (
            <CourseItem
              key={id}
              id={id}
              title={title}
              previewImageLink={previewImageLink}
              rating={rating}
              lessonsCount={lessonsCount}
              meta={meta}
              lessons={lessons}
            />
          );
        })}
      </div>
      <Pagination
        totalPageCount={totalPageCount}
        setStartOffset={setStartOffset}
        itemsPerPage={COURSES_PER_PAGE_COUNT}
      />
    </div>
  );
};
