import { useState, useEffect, useRef } from "react";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";

function Table({
  data = [],
  columns = [],
  footer = [],
  itemsPerPage,
  rowColor,
  customPadding = "px-3 py-2",
  onPageChange,
  totalRecords,
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pageFromParams = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromParams);

  const prevPage = useRef(currentPage);
  const totalPages = Math.max(Math.ceil(totalRecords / itemsPerPage));
  const hasData = data.length > 0;
  console.log(totalRecords, itemsPerPage, "=====>");
  useEffect(() => {
    setCurrentPage(pageFromParams);
  }, [pageFromParams]);

  useEffect(() => {
    if (prevPage.current === currentPage) return;
    prevPage.current = currentPage;

    if (onPageChange) {
      const limit = itemsPerPage;
      const offset = (currentPage - 1) * itemsPerPage;
      onPageChange({ limit, offset });
    }

    navigate(`?page=${currentPage}`, { replace: true });
  }, [currentPage, itemsPerPage, onPageChange]);

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      navigate(`?page=${page}`, { replace: true });
    }
  };

  const maxPageButtons = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  return (
    <div>
      {/* Table */}
      <div className="w-100 table-wrapper scroll-x">
        <table
          className="w-100 fixed-table white-bg"
          style={{ borderRadius: "10px" }}
        >
          <thead>
            <tr className="border-bottom">
              {columns.map((column, index) => (
                <th
                  key={index}
                  style={{ width: column.width }}
                  className={`border-bottom small-font fw-600 black-text ${customPadding}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hasData ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-top">
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      style={{ width: column.width }}
                      className={`${
                        rowColor ? rowColor(row) : "black-text"
                      } align-top small-font ${customPadding}`}
                    >
                      {row[column.field]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="border-top">
                <td
                  colSpan={columns.length}
                  className="text-center black-text p-2"
                >
                  <h6 className="mb-0">No Data Available</h6>
                </td>
              </tr>
            )}
          </tbody>
          {footer.length > 0 && (
            <tfoot className="border-top footer-bg">
              <tr>
                {footer.map((column, index) => (
                  <th
                    key={index}
                    style={{ width: column.width }}
                    className="small-font fw-600 black-text px-3 py-3"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex align-items-center justify-content-end mt-3 me-3">
          <div className="d-flex">
            {/* Previous Button */}
            <div
              className={`chat-img flex-center black-text2 me-1 br-3px cursor-pointer ${
                currentPage > 1 ? "grey-bg black-border" : "border"
              }`}
              onClick={
                currentPage > 1 ? () => handlePageChange(currentPage - 1) : null
              }
            >
              <MdOutlineChevronLeft className="d-flex" />
            </div>

            {/* Page Buttons */}
            {Array.from(
              { length: endPage - startPage + 1 },
              (_, i) => startPage + i
            ).map((pageNumber) => (
              <div
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`chat-img flex-center small-font black-text2 mx-1 br-3px cursor-pointer ${
                  currentPage === pageNumber ? "grey-bg black-border" : "border"
                }`}
              >
                {pageNumber}
              </div>
            ))}

            {/* Next Button */}
            <div
              className={`chat-img flex-center black-text2 ms-1 br-3px cursor-pointer ${
                currentPage < totalPages ? "grey-bg black-border" : "border"
              }`}
              onClick={
                currentPage < totalPages
                  ? () => handlePageChange(currentPage + 1)
                  : null
              }
            >
              <MdOutlineChevronRight className="d-flex" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;
