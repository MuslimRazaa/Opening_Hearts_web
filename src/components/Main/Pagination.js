import React, { useState } from 'react';
import '../../media/style/style.css';

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    let pageNumbers = [];

    // Show only the first few pages, ellipsis, current page, ellipsis, and the last page
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage < 4) {
        pageNumbers = [1, 2, 3, 4, '...', totalPages];
      } else if (currentPage > totalPages - 3) {
        pageNumbers = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pageNumbers = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
      }
    }

    return pageNumbers.map((page, index) =>
      page === '...' ? (
        <span key={index} className="pagination-ellipsis">
          ...
        </span>
      ) : (
        <button
          key={index}
          className={`pagination-button ${page === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      )
    );
  };

  return (
    <div className="pagination">
      <button
        className="pagination-nav"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        className="pagination-nav"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
