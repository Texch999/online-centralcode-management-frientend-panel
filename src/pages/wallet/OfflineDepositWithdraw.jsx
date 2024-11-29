import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function OfflineDepositWithdraw() {
  const [activeSport, setActiveSport] = useState("Sports & Casino");
  const handleSportClick = (sport) => {
    setActiveSport(activeSport === sport ? null : sport);
  };
  const SPORTS_BUTTONS = ["Sports & Casino", "Sports", "Casino"];
  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="d-flex yellow-font mb-0">My Deposit & Withdraw</h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>
      <div className="d-flex small-font mb-3">
        {SPORTS_BUTTONS?.map((sport, index) => (
          <div
            key={index}
            className={`me-3 px-3 ${
              activeSport === sport ? "saffron-btn2" : "white-btn2"
            }`}
            onClick={() => handleSportClick(sport)}
          >
            {sport}
          </div>
        ))}
      </div>
      <div className="w-100 grey-bg2 d-flex py-3 rounded">
        <span className="small-font border-right px-3">Your Balance</span>
        <h6 className="green-font fw-600 mb-0 px-3 border-left2">50000000</h6>
      </div>
    </div>
  );
}

export default OfflineDepositWithdraw;
