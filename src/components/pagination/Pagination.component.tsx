import React, { FC, useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate, useSearchParams } from 'react-router-dom';

import './Pagination.scss';

interface PaginationProps {
  totalPageCount: number;
  itemsPerPage: number;
  setStartOffset: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination: FC<PaginationProps> = ({
  totalPageCount,
  itemsPerPage,
  setStartOffset,
}) => {
  const [initialPage, setInitialPage] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handlePageClick = ({ selected }: { selected: number }) => {
    setStartOffset(itemsPerPage * selected);
    setSearchParams({ page: `${selected + 1}` });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const initialPageFromParams = Number(searchParams.get('page') || 1);

    if (initialPageFromParams > totalPageCount || initialPageFromParams < 1) {
      navigate('/', { replace: true });
      setInitialPage(0);
    } else {
      setInitialPage(initialPageFromParams - 1);
      setStartOffset((initialPageFromParams - 1) * itemsPerPage);
    }
  }, [navigate, itemsPerPage, searchParams, setStartOffset, totalPageCount]);

  return (
    <ReactPaginate
      forcePage={initialPage}
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
