import React from "react";

const ErrorComponent = ({ error }) => {
  return (
    <>
      {error && (
        <div className="error-bg br-5 fw-600 small-font">
          <div className="my-2">
            <ul className="py-3 s-errors">
              {Array.isArray(error) ? (
                error.map((err, index) => (
                  <li key={index}>{err.message || err}</li>
                ))
              ) : (
                <li>{error.message || error}</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default ErrorComponent;
