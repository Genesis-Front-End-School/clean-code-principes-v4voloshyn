import React, { FC, useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { FIRST_PAGE, DEFAULT_ITEMS_PER_PAGE, PAGE_RANGE } from './constants';

import './Pagination.scss';

interface Props {
  totalPageCount: number;
  itemsPerPage: number;
  setStartOffset: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination: FC<Props> = ({
  totalPageCount,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
  setStartOffset,
}) => {
  const [initialPage, setInitialPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handlePageClick = ({ selected }: { selected: number }) => {
    setStartOffset(itemsPerPage * selected);
    setSearchParams({ page: `${selected + 1}` });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const initialPageFromParams = Number(
      searchParams.get('page') || FIRST_PAGE
    );

    if (
      initialPageFromParams > totalPageCount ||
      initialPageFromParams < FIRST_PAGE
    ) {
      navigate('/', { replace: true });
      setInitialPage(1);
    } else {
      setInitialPage(initialPageFromParams);
      setStartOffset((initialPageFromParams - 1) * itemsPerPage);
    }
  }, [navigate, itemsPerPage, searchParams, setStartOffset, totalPageCount]);

  return (
    <ReactPaginate
      forcePage={initialPage - 1}
      breakLabel="..."
      nextLabel="Next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={PAGE_RANGE}
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
