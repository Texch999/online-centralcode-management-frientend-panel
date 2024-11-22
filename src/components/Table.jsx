import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Table({ data, columns, title, footer, itemsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data?.length);
  const currentData = data && data?.slice(startIndex, endIndex);

  // Disable pagination if there is no data
  const hasData = data?.length > 0;

  const handlePageChange = (page) => {
    if (hasData) setCurrentPage(page);
  };

  const maxPageButtons = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  const pageButtons = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => {
      const pageNumber = startPage + i;
      return (
        <div
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={`page-btn large-font me-2 br-3 fw-600 ${
            currentPage === pageNumber
              ? "pink-bg clr-white"
              : "input-bg cursor-pointer"
          }`}
        >
          {pageNumber}
        </div>
      );
    }
  );

  // Conditionally render the pagination arrows and buttons only if there is data and pages to navigate
  const renderPagination = hasData && totalPages > 1;

  return (
    <div className="table-bg mt-2">
      {title && <div className="table-title table-row mb-1">{title}</div>}
      <div className="w-100 table-container">
        <table className="w-100">
          <thead className="py-2 border">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="table-head small-font text-center px-1 border-top"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="py-2 border">
            {hasData && currentData.length > 0 ? (
              currentData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="table-row sub-heading-text white-bg border text-start fw-500"
                >
                  {columns.map((column) => (
                    <td
                      key={column.field}
                      className="white-space small-font text-center p-2 border-bottom"
                    >
                      {row[column.field]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="table-row sub-heading-text white-bg border">
                <td
                  colSpan={columns.length}
                  className="text-center p-2 medium-font fw-600 "
                >
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>
          {footer && footer?.length > 0 && (
            <tfoot className="py-2 border">
              <tr>
                {footer.map((column, footerIndex) => (
                  <th
                    key={footerIndex}
                    className="text-center table-head small-font px-1 border-top"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* Pagination controls */}
      {renderPagination && (
        <div className="d-flex justify-content-end mt-2">
          <div className="d-flex">
            <div
              className={`page-btn br-3 input-bg large-font me-2 cursor-pointer fw-600 ${
                currentPage === 1 ? "disabled" : ""
              }`}
              onClick={
                currentPage > 1 ? () => handlePageChange(currentPage - 1) : null
              }
            >
              <FaChevronLeft />
            </div>
            {pageButtons}
            <div
              className={`page-btn br-3 input-bg large-font cursor-pointer fw-600 ${
                currentPage === totalPages ? "disabled" : ""
              }`}
              onClick={
                currentPage < totalPages
                  ? () => handlePageChange(currentPage + 1)
                  : null
              }
            >
              <FaChevronRight />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;
