import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/Table";
import ScrollTable from "../../components/ScrollTable";

function MyStatement() {
  const [activeSport, setActiveSport] = useState("My Statements");
  const handleSportClick = (sport) => {
    setActiveSport(activeSport === sport ? null : sport);
  };
  const SPORTS_BUTTONS = ["My Statements", "My Gateway Transaction",];
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
      serialNo: 3,
      dateTime: "07-10-2024, 17:17:00",
      description: "Deposit",
      credit: <div className="green-font">100000</div>,
      debit: <div className="red-font">-</div>,
      category: "Sports & Casino",
      balance: "0",
      fromTo: "Lokesh Director - Owner",
    },
    {
        serialNo: 4,
        dateTime: "07-10-2024, 17:17:00",
        description: "Deposit",
        credit: <div className="green-font">100000</div>,
        debit: <div className="red-font">-</div>,
        category: "Sports & Casino",
        balance: "0",
        fromTo: "Lokesh Director - Owner",
      },
      {
        serialNo: 5,
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
         <div className="d-flex small-font">
          {SPORTS_BUTTONS?.map((sport, index) => (
            <div
              key={index}
              className={`me-3 px-3 ${
                activeSport === sport ? "saffron-btn2" : "white-btn2 pointer"
              }`}
              onClick={() => handleSportClick(sport)}
            >
              {sport}
            </div>
          ))}
        </div>
      <div className="flex-between mb-3 mt-4">
        <h6 className="d-flex yellow-font mb-0">My Statement</h6>
        
      </div>
      <div className="w-50 flex-between flex-wrap mb-3 py-3 grey-bg2 rounded">
        <div className="col-6 px-3">
          <div className="white-btn2 flex-between">
            <span className="small-font">Own D/W. P&L</span>
            <span className="medium-font green-font">1000000000</span>
          </div>
        </div>
        <div className="col-6 px-3">
          <div className="white-btn2 flex-between">
            <span className="small-font">Vend Pays</span>
            <span className="medium-font red-font">1000000000</span>
          </div>
        </div>
        <div className="col-6 px-3 mt-2">
          <div className="white-btn2 flex-between">
            <span className="small-font">Own Gateway P&L</span>
            <span className="medium-font green-font">2000000000</span>
          </div>
        </div>
        <div className="col-6 px-3 mt-2">
          <div className="white-btn2 flex-between">
            <span className="small-font">Own Net P/L</span>
            <span className="medium-font red-font">2000000000</span>
          </div>
        </div>
       
      </div>
      <h6 className="fw-600">Vendors Account</h6>
      <div>

      <ScrollTable
        columns={MY_TRANSACTIONS_COLUMNS}
        data={MY_TRANSACTIONS_DATA}
        footer={MY_TRANSACTIONS_FOOTER}
        itemsPerPage={2}
        greyBackround="footer-bg"
      />
      </div>
     
   
    </div>
  );
}

export default MyStatement;


