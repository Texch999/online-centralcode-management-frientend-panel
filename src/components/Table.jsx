import { useState } from "react";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";

function Table({ data, columns, footer, itemsPerPage, rowColor }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data?.length);
  const currentData = data?.slice(startIndex, endIndex);
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
          className={`chat-img flex-center small-font black-text2 mx-1 br-3px ${
            currentPage === pageNumber ? "grey-bg black-border" : "border"
          }`}
        >
          {pageNumber}
        </div>
      );
    }
  );

  const renderPagination = hasData && totalPages > 1;

  return (
    <div>
      <div className="w-100 table-wrapper">
        <table className="w-100 white-bg" style={{ borderRadius: "10px" }}>
          <thead className="border-bottom">
            <tr className="border-bottom">
              {columns?.map((column, index) => (
                <th
                  key={index}
                  style={{ width: column?.width }}
                  className="border-bottom small-font black-text px-3 py-2"
                >
                  {column?.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hasData && currentData?.length > 0 ? (
              currentData.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-top">
                  {columns?.map((column) => (
                    <td
                      key={column?.field}
                      style={{ width: column?.width }}
                      className={`${
                        rowColor ? rowColor(row) : "black-text"
                      } align-top small-font px-3 py-2`}
                    >
                      {row[column?.field]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="border-top">
                <td
                  colSpan={columns?.length}
                  className="text-center black-text p-2"
                >
                  <h6 className="mb-0">No Data Available</h6>
                </td>
              </tr>
            )}
          </tbody>
          {footer && footer?.length > 0 && (
            <tfoot className="border-top">
              <tr>
                {footer.map((column, footerIndex) => (
                  <th
                    key={footerIndex}
                    style={{ width: column?.width }}
                    className="text-center small-font black-text p-2"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </tfoot>
          )}
        </table>
      </div>
      {renderPagination && (
        <div className="d-flex align-items-center justify-content-end mt-3 me-3">
          <div className="d-flex">
            <div
              className={`chat-img flex-center black-text2 me-1 br-3px ${
                currentPage > 1 ? "grey-bg black-border" : "border"
              }`}
              onClick={
                currentPage > 1 ? () => handlePageChange(currentPage - 1) : null
              }
            >
              <MdOutlineChevronLeft className="d-flex" />
            </div>
            {pageButtons}
            <div
              className={`chat-img flex-center black-text2 ms-1 br-3px ${
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
