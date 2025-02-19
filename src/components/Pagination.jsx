import React from "react";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const maxPageButtons = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  const handlePageChange = (page) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      onPageChange(page); // Call onPageChange with new page
    }
  };

  const pageButtons = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => {
      const pageNumber = startPage + i;
      return (
        <div
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={`chat-img flex-center small-font black-text2 mx-1 br-3px ${
            currentPage === pageNumber ? "grey-bg black-border" : "border"
          }`}
        >
          {pageNumber}
        </div>
      );
    }
  );

  return (
    totalPages > 1 && (
      <div className="d-flex align-items-center justify-content-end mt-3 me-3">
        <div className="d-flex">
          <div
            className={`chat-img flex-center black-text2 me-1 br-3px ${
              currentPage > 1 ? "grey-bg black-border" : "border"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <MdOutlineChevronLeft className="d-flex" />
          </div>
          {pageButtons}
          <div
            className={`chat-img flex-center black-text2 ms-1 br-3px ${
              currentPage < totalPages ? "grey-bg black-border" : "border"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <MdOutlineChevronRight className="d-flex" />
          </div>
        </div>
      </div>
    )
  );
};

export default PaginationComponent;
