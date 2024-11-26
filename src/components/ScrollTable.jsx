function ScrollTable({ data, columns, footer, tableHeight, headerPadding }) {
  console.log(headerPadding, "===>headerPadding");
  return (
    <div className={`w-100 table-body-height ${tableHeight}`}>
      <table className="w-100 white-bg fixed-table">
        <thead>
          <tr className="border">
            {columns?.map((column, index) => (
              <th key={index} className="small-font black-text p-2">
                {column?.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border">
                {columns?.map((column) => (
                  <td
                    key={column?.field}
                    className={`${headerPadding} small-font black-text p-2`}
                  >
                    {row[column?.field]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="border">
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
          <tfoot className="border">
            <tr>
              {footer.map((column, footerIndex) => (
                <th
                  key={footerIndex}
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
  );
}

export default ScrollTable;
