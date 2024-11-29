import React from "react";
import PropTypes from "prop-types";

function ScrollTable({
  data = [],
  columns = [],
  footer = [],
  tableHeight = "",
  customPadding = "",
  greyBackround = "",
}) {
  return (
    <div
      className={`w-100 table-wrapper ${
        tableHeight ? tableHeight : "table-body-height"
      }`}
    >
      <table
        className="w-100 fixed-table white-bg"
        // className={`w-100 fixed-table white-bg ${
        //   greyBackround ? greyBackround : "white-bg"
        // }`}
      >
        <thead className="white-bg">
          <tr className="border-bottom">
            {columns?.map((column, index) => (
              <th
                key={index}
                className={`border-bottom small-font fw-600 black-text ${
                  customPadding ? customPadding : "py-2 px-3"
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
        <tbody className="white-bg">
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
          <tfoot
            className={`border-top ${
              greyBackround ? greyBackround : "white-bg"
            }`}
          >
            <tr>
              {footer.map((column, footerIndex) => (
                <th
                  key={footerIndex}
                  className="small-font fw-600 black-text p-2"
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
  customPadding: PropTypes.string,
};

export default ScrollTable;
