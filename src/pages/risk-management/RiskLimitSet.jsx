import React from "react";
import { FaSearch } from "react-icons/fa";

function RiskLimitSet() {
  return (
    <div>
      <div className="flex-between">
        <h6 className="yellow-font my-2">
          Sports & Casino High Risk Limit Set
        </h6>
        <div className="input-pill d-flex align-items-cente rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search" />
        </div>
      </div>
      <div className="d-flex w-75">
        <div className="col-5 flex-column me-3">
          <label className="black-text4 small-font mb-1">Role</label>
          <input className="input-css2 small-font" placeholder="Enter" />
        </div>
        <div className="col-5 flex-column me-3">
          <label className="black-text4 small-font mb-1">Admin</label>
          <input className="input-css2 small-font" placeholder="Enter" />
        </div>
        <div className="col-2  flex-column d-flex align-items-end justify-content-end">
          <button className="w-100 saffron-btn2">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default RiskLimitSet;
