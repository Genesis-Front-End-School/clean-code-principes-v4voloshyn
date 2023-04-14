import React, { FC, useState, useEffect, useMemo } from 'react';
import ReactPaginate from 'react-paginate';

import { CourseItemPreview } from '../../types/types';

import './Pagination.scss';

interface PaginationProps {
  itemsPerPage: number;
  items: CourseItemPreview[];
  setPaginatedCourses: React.Dispatch<
    React.SetStateAction<CourseItemPreview[]>
  >;
}

export const Pagination: FC<PaginationProps> = ({
  itemsPerPage = 10,
  items = [],
  setPaginatedCourses,
}) => {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;

  const currentPageCourses = useMemo(() => {
    return items.slice(itemOffset, endOffset);
  }, [endOffset, itemOffset, items]);

  const totalPageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    const newOffset = (selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setPaginatedCourses(currentPageCourses);
  }, [currentPageCourses, setPaginatedCourses]);

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={totalPageCount}
      previousLabel="< Previous"
      renderOnZeroPageCount={() => null}
      activeClassName="page-active"
      pageClassName="page-link"
      nextClassName="page-next"
      previousClassName="page-previous"
      disabledClassName="page-disabled"
      breakClassName="page-break"
    />
  );
};
