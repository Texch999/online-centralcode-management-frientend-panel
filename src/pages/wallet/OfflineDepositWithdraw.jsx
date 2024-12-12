import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function OfflineDepositWithdraw() {
  const [activeSport, setActiveSport] = useState("Sports & Casino");
  const handleSportClick = (sport) => {
    setActiveSport(sport);
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
            className={`me-3 ${
              activeSport === sport ? "saffron-btn2" : "white-btn2 pointer"
            }`}
            onClick={() => handleSportClick(sport)}
          >
            {sport}
          </div>
        ))}
      </div>
      <div className="w-100 grey-bg2 d-flex py-3 rounded mb-3">
        <span className="small-font border-right px-3">Your Balance</span>
        <h6 className="green-font fw-600 mb-0 px-3 border-left2">50000000</h6>
      </div>
      {/* Header */}
      <div className="w-100 d-flex grey-bg2 rounded-top black-text small-font border">
        <div className="col-4 d-flex p-2">
          <span className="col-4">UID</span>
          <span className="col">Balance</span>
          <span className="col">Available D/W</span>
          <span className="col d-flex justify-content-end">Exposure</span>
        </div>
        <div className="col-3 border-left p-2 flex-center">
          Deposit/Withdraw
        </div>
        <div className="col-2 flex-between border-left p-2">
          <span>Credit Reference</span>
          <span>Reference P/L</span>
        </div>
        <div className="col-2 border-left p-2">Remark</div>
        <div className="col-1 p-2 flex-center border-left">Logs</div>
      </div>
      {/* Body */}
      <div className="w-100 d-flex black-text small-font border white-bg">
        <div className="col-4 d-flex px-2 py-1">
          <span className="col-4 d-flex align-items-center">
            1.Abhi - 10% <br />
            Director
          </span>
          <span className="col d-flex align-items-center">23484</span>
          <span className="col d-flex align-items-center">22037</span>
          <span className="col d-flex align-items-center justify-content-end red-font">
            1347
          </span>
        </div>
        <div className="col-3 border-left flex-between px-2 py-1">
          <span className="yellow-bg br-4px py-1 px-2 white-text">D | W</span>
          <input
            className="border br-4px py-1 px-2 all-none"
            placeholder="0"
            type="number"
          />
          <span className="border br-4px py-1 px-2">Full</span>
        </div>
        <div className="col-2 flex-between border-left px-2 py-1">
          <span>
            0
            <span className="ms-2 yellow-bg br-4px py-1 px-2 white-text">
              Edit
            </span>
          </span>
          <span>23384</span>
        </div>
        <div className="col-2 border-left px-2 py-1 flex-center">
          <input
            className="border br-4px py-1 px-2 all-none"
            placeholder="Remarks"
            type="text"
          />
        </div>
        <div className="col-1 px-2 py-1 flex-center border-left">
          <span className="br-4px border px-3 py-1">Log</span>
        </div>
      </div>
      <div className="w-100 d-flex black-text small-font border white-bg">
        <div className="col-4 d-flex px-2 py-1">
          <span className="col-4 d-flex align-items-center">
            1.Abhi - 10% <br />
            Director
          </span>
          <span className="col d-flex align-items-center">23484</span>
          <span className="col d-flex align-items-center">22037</span>
          <span className="col d-flex align-items-center justify-content-end red-font">
            1347
          </span>
        </div>
        <div className="col-3 border-left flex-between px-2 py-1">
          <span className="yellow-bg br-4px py-1 px-2 white-text">D | W</span>
          <input
            className="border br-4px py-1 px-2 all-none"
            placeholder="0"
            type="number"
          />
          <span className="border br-4px py-1 px-2">Full</span>
        </div>
        <div className="col-2 flex-between border-left px-2 py-1">
          <span>
            0
            <span className="ms-2 yellow-bg br-4px py-1 px-2 white-text">
              Edit
            </span>
          </span>
          <span>23384</span>
        </div>
        <div className="col-2 border-left px-2 py-1 flex-center">
          <input
            className="border br-4px py-1 px-2 all-none"
            placeholder="Remarks"
            type="text"
          />
        </div>
        <div className="col-1 px-2 py-1 flex-center border-left">
          <span className="br-4px border px-3 py-1">Log</span>
        </div>
      </div>
      {/* Footer */}
      <div className="w-100 d-flex grey-bg2 rounded-bottom black-text small-font">
        <div className="col-7 p-2 d-flex justify-content-end align-items-center">
          <span className="pointer white-bg border py-2 px-3 br-4px">
            Clear All
          </span>
        </div>
        <div className="col-2 p-2 flex-center">
          <input
            className="white-bg all-none2 border p-2 br-4px"
            placeholder="Password"
            type="password"
          />
        </div>
        <div className="col p-2">
          <div className="yellow-bg px-2 py-1 br-4px white-text flex-between">
            <button className="pointer">Submit</button>
            <span className="rounded-circle white-bg py-1 px-2 black-text">
              0
            </span>{" "}
            Payment
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfflineDepositWithdraw;
