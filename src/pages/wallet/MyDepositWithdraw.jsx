import React from "react";

function MyDepositWithdraw() {
  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="d-flex yellow-font mb-0">My Deposit & Withdraw</h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>
    </div>
  );
}

export default MyDepositWithdraw;
