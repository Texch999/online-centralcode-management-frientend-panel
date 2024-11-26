import React from "react";
import { CiSearch } from "react-icons/ci";

const Result = () => {
  return (
    <div>
    <div className="d-flex justify-content-between w-100">
      <h5 className="saffron-clr">Result</h5>
      <div className="grey-border rounded-pill grey-clr d-flex align-items-center px-2">
        <CiSearch className="large-font" />
        <input
          type="text"
          id="search"
          className="all-none white-bg p-1"
          placeholder="Search.."
          style={{ fontSize: "10px" }} 
        />
      </div>
    </div>
    <div className="d-flex w-10 flex-between">
        <div className="saffron-btn br-10 w-50 mx-2">Sports</div>
        <div className="saffron-btn br-10 w-50">Casino</div>
    </div>
  </div>
  
  );
};

export default Result;
