import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/Table";

function MyDepositWithdraw() {
  const [activeSport, setActiveSport] = useState("All");
  const handleSportClick = (sport) => {
    setActiveSport(sport);
  };
  const SPORTS_BUTTONS = ["All", "Deposit", "Withdraw"];

  const MY_TRANSACTIONS_COLUMNS = [
    { header: "S No", field: "serialNo" },
    { header: "Date & Time", field: "dateTime" },
    { header: "Description", field: "description" },
    { header: "Credit", field: "credit" },
    { header: "Debit", field: "debit" },
    { header: "Sports / Casino", field: "category" },
    { header: "Balance", field: "balance" },
    { header: "From - To", field: "fromTo" },
  ];

  const MY_TRANSACTIONS_DATA = [
    {
      serialNo: 1,
      dateTime: "07-10-2024, 17:17:00",
      description: "Withdraw",
      credit: <div className="green-font">-</div>,
      debit: <div className="red-font">100000</div>,
      category: "Casino",
      balance: "0",
      fromTo: "Srinivas Director - Owner",
    },
    {
      serialNo: 2,
      dateTime: "07-10-2024, 17:17:00",
      description: "Deposit",
      credit: <div className="green-font">100000</div>,
      debit: <div className="red-font">-</div>,
      category: "Sports",
      balance: "0",
      fromTo: "Jayanta SM - Owner",
    },
    {
      serialNo: 2,
      dateTime: "07-10-2024, 17:17:00",
      description: "Deposit",
      credit: <div className="green-font">100000</div>,
      debit: <div className="red-font">-</div>,
      category: "Sports & Casino",
      balance: "0",
      fromTo: "Lokesh Director - Owner",
    },
  ];

  const MY_TRANSACTIONS_FOOTER = [
    { header: "Total" },
    { header: "" },
    { header: "" },
    { header: <div className="green-font">10000000</div> },
    { header: <div className="red-font">10000000</div> },
    { header: "" },
    { header: "10000000" },
    { header: "" },
  ];

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="d-flex yellow-font mb-0">My Deposit & Withdraw</h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>
      <div className="w-100 flex-between mb-3 py-3 grey-bg2 rounded">
        <div className="col-3 px-3">
          <div className="white-btn2 flex-between">
            <span className="small-font">Sports Rental Amt.</span>
            <span className="medium-font green-font">1000000000</span>
          </div>
        </div>
        <div className="col-3 px-3">
          <div className="white-btn2 flex-between">
            <span className="small-font">Sports & Casino Amt.</span>
            <span className="medium-font green-font">1000000000</span>
          </div>
        </div>
        <div className="col-3 px-3">
          <div className="white-btn2 flex-between">
            <span className="small-font">Total Withdraw</span>
            <span className="medium-font green-font">1000000000</span>
          </div>
        </div>
        <div className="col-3 px-3">
          <div className="white-btn2 flex-between">
            <span className="small-font">Net P/L</span>
            <span className="medium-font green-font">1000000000</span>
          </div>
        </div>
      </div>
      <div className="w-100 flex-between mb-3">
        <div className="d-flex small-font">
          {SPORTS_BUTTONS?.map((sport, index) => (
            <div
              key={index}
              className={`me-3 ${
                activeSport === sport ? "saffron-btn2" : "white-btn2"
              }`}
              onClick={() => handleSportClick(sport)}
            >
              {sport}
            </div>
          ))}
        </div>
        <div className="w-50 row">
          <div className="col flex-column">
            <label className="black-text4 small-font mb-1">From</label>
            <input className="input-css2 small-font" type="date" />
          </div>
          <div className="col flex-column">
            <label className="black-text4 small-font mb-1">To</label>
            <input className="input-css2 small-font" type="date" />
          </div>
          <div className="col flex-column d-flex align-items-end justify-content-end">
            <button className="w-100 saffron-btn2 small-font">Submit</button>
          </div>
        </div>
      </div>
      <Table
        columns={MY_TRANSACTIONS_COLUMNS}
        data={MY_TRANSACTIONS_DATA}
        footer={MY_TRANSACTIONS_FOOTER}
        itemsPerPage={2}
      />
    </div>
  );
}

export default MyDepositWithdraw;
