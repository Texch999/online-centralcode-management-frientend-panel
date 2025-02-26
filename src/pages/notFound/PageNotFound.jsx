import React from "react";
import { Link } from "react-router-dom";
import "./page.css";
import { Images } from "../../images";

function PageNotFound() {
  return (
    <div className="page-not-found">
      <h1 className="error-code">404</h1>
      <p className="error-message">Oops! Page not found.</p>
      <img src={Images.ErrorImage} alt="Not Found" className="error-image" />
      <Link to="/master/login" className="home-button">
        Go Home
      </Link>
    </div>
  );
}

export default PageNotFound;
