import React from "react";
import PropTypes from "prop-types";

function ScrollTable({
  data = [],
  columns = [],
  footer = [],
  tableHeight = "table-body-height",
  customPadding = "py-2 px-3",
  greyBackground = "white-bg",
}) {
  return (
    <div className={`w-100 table-wrapper ${tableHeight}`}>
      <table className="w-100 fixed-table white-bg">
        {/* Table Header */}
        <thead className="white-bg">
          <tr className="border-bottom">
            {columns.map(({ header, width }, index) => (
              <th
                key={index}
                className={`border-bottom small-font fw-600 black-text ${customPadding}`}
                style={{ width: width || "auto" }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="white-bg">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-top">
                {columns.map(({ field, width }, colIndex) => (
                  <td
                    key={colIndex}
                    className={`align-top small-font black-text px-3 py-2`}
                    style={{ width: width || "auto" }}
                  >
                    {row[field]}
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

        {/* Table Footer */}
        {footer.length > 0 && (
          <tfoot className={`border-top ${greyBackground}`}>
            <tr>
              {footer.map(({ header, width }, footerIndex) => (
                <th
                  key={footerIndex}
                  className={`small-font fw-600 black-text ${customPadding}`}
                  style={{ width: width || "auto" }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

export default ScrollTable;
