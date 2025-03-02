import React from "react";
import { Link } from "react-router-dom";
import "./page.css";

function PageNotFound() {
  return (
    <div className="page-not-found position-relative">
      <div className="position-error">
        <h1 style={{fontSize:"200px"}}>404</h1>
        <p>Oops! Page not found.</p>
        <Link
          to="/master/login"
          className="saffron-btn w-100 rounded-4 py-2 px-2"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
