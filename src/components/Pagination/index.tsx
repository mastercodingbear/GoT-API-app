import React from 'react';
import './Pagination.css';

type Props = {
  page: number;
  pageSize: number;
  totalPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

const Pagination: React.FC<Props> = ({
  page,
  pageSize,
  totalPage,
  onPageChange,
  onPageSizeChange,
}) => {
  const moveToFirst = () => {
    onPageChange(1);
  };
  const moveToLast = () => {
    onPageChange(totalPage);
  };
  const moveToNext = () => {
    const nextPage = page + 1 <= totalPage ? page + 1 : totalPage;
    onPageChange(nextPage);
  };
  const moveToPrev = () => {
    const prevPage = page - 1 >= 1 ? page - 1 : 1;
    onPageChange(prevPage);
  };

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        {page} page of {totalPage} pages
      </div>
      <div className="pagination">
        Rows per page:{' '}
        <select
          value={pageSize}
          className="pagesize-select"
          onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
        >
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>
        <button className="page-link" onClick={moveToFirst}>
          First
        </button>
        <button
          className="page-link"
          onClick={moveToPrev}
          disabled={page === 1}
        >
          Prev
        </button>
        <button
          className="page-link"
          onClick={moveToNext}
          disabled={page === totalPage}
        >
          Next
        </button>
        <button className="page-link" onClick={moveToLast}>
          Last
        </button>
      </div>
    </div>
  );
};

export default Pagination;
