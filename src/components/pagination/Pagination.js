import React from "react";
import "./pagination.css";

const Pagination = ({ currentPage, totalPages, onChangePage }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onChangePage(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <span
          key={i}
          className={i === currentPage ? "active" : ""}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </span>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="Pagination">
      <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
      {renderPageNumbers()}
      <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
    </div>
  );
};

export default Pagination;
