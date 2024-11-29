import React from "react";
import PropTypes from "prop-types";

function ScrollTable({
  data = [],
  columns = [],
  footer = [],
  tableHeight = "",
  headerPadding = "",
}) {
  return (
    <div
      className={`w-100 table-wrapper overflow ${
        tableHeight ? tableHeight : "table-body-height"
      }`}
    >
      <table className="w-100 white-bg fixed-table">
        <thead className="border-bottom">
          <tr className="border-bottom">
            {columns?.map((column, index) => (
              <th
                key={index}
                className={`border-bottom small-font black-text px-3 ${
                  headerPadding ? headerPadding : "py-2"
                }`}
                style={{ width: column?.width || "auto" }}
              >
                {typeof column?.header === "string"
                  ? column.header
                  : column?.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-top">
                {columns?.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="align-top small-font black-text px-3 py-2"
                    style={{ width: column?.width || "auto" }}
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
        {footer?.length > 0 && (
          <tfoot className="border-top">
            <tr>
              {footer.map((column, footerIndex) => (
                <th
                  key={footerIndex}
                  className="text-center small-font black-text p-2"
                  style={{ width: column?.width || "auto" }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

ScrollTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
        .isRequired,
      field: PropTypes.string.isRequired,
      width: PropTypes.string,
    })
  ),
  footer: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    })
  ),
  tableHeight: PropTypes.string,
  headerPadding: PropTypes.string,
};

export default ScrollTable;
