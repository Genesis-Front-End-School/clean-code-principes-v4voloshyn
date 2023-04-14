import { FC, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import { CourseItem } from '../course-item/CourseItem.component';
import { Pagination } from '../pagination/Pagination.component';

import { CourseItemPreview } from '../../types/types';

import './CourseList.scss';

export const CourseList: FC = () => {
  const courses = useLoaderData() as CourseItemPreview[];

  const [paginatedCourses, setPaginatedCourses] =
    useState<CourseItemPreview[]>(courses);

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
        itemsPerPage={10}
        items={courses}
        setPaginatedCourses={setPaginatedCourses}
      />
    </div>
  );
};
