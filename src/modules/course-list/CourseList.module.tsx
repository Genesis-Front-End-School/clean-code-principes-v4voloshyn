import { FC, useState, useMemo, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

import { OpenModalButton } from '../../shared/UI/button/open-modal-button/OpenModalButton.component';
import { Modal } from '../../shared/components/modal/Modal.component';
import { Chat } from '../chat/Chat.module';

import { CourseItemPreview } from './@types/types';
import { CourseCard } from './components/course-card/CourseCard.component';
import { Pagination } from './components/pagination/Pagination.component';

import './CourseList.scss';

export const CourseList: FC = () => {
  const courses = useLoaderData() as CourseItemPreview[];
  const [paginatedCourses, setPaginatedCourses] =
    useState<CourseItemPreview[]>(courses);
  const [isModalActive, setIsModalActive] = useState(false);
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
      <h1 className="course-list__title">Course List</h1>
      <div className="courses">
        {paginatedCourses.map((course) => (
          <CourseCard key={course.id} courseData={course} />
        ))}
      </div>
      <Pagination
        totalPageCount={totalPageCount}
        setStartOffset={setStartOffset}
        itemsPerPage={COURSES_PER_PAGE_COUNT}
      />
      {!isModalActive && <OpenModalButton openModal={setIsModalActive} />};
      <Modal active={isModalActive} setActive={setIsModalActive}>
        <Chat />
      </Modal>
    </div>
  );
};
