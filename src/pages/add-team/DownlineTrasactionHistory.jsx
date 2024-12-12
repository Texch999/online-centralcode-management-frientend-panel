import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/Table";
import { useParams } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";

const DownlineTrasactionHistory = () => {
  const { transactionHistory } = useParams();

  // State for active button
  const [activeButton, setActiveButton] = useState("All");

  // Button labels
  const buttons = ["All", "Deposit", "Withdraw"];

  // Handle button click
  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const TRANSACTION_COLUMNS = [
    { header: "S No", field: "sNo", width: "5%" },
    { header: "Date & Time", field: "dateTime", width: "15%" },
    { header: "Description", field: "description", width: "10%" },
    { header: "Credit", field: "credit", width: "10%" },
    { header: "Debit", field: "debit", width: "10%" },
    { header: "Sports / Casino", field: "sportsCasino", width: "10%" },
    { header: "Balance", field: "balance", width: "10%" },
    { header: "From - To", field: "fromTo", width: "25%" },
  ];

  const TRANSACTION_DATA = [
    {
      sNo: 1,
      dateTime: "07-10-2024, 17:17:00",
      description: "Withdraw",
      credit: "-",
      debit: <span className="red-font">100000</span>,
      sportsCasino: "Casino",
      balance: "0",
      fromTo: "Srinivas Director - Owner",
    },
    {
      sNo: 2,
      dateTime: "07-10-2024, 17:17:00",
      description: "Deposit",
      credit: <span className="green-font">250000</span>,
      debit: "-",
      sportsCasino: "Sports",
      balance: "0",
      fromTo: "Jayanta SM - Owner",
    },
    {
      sNo: 3,
      dateTime: "07-10-2024, 17:17:00",
      description: "Deposit",
      credit: <span className="green-font">100000</span>,
      debit: "-",
      sportsCasino: "Sports & Casino",
      balance: "0",
      fromTo: "Lokesh Director - Owner",
    },
    {
      sNo: 4,
      dateTime: "07-10-2024, 17:17:00",
      description: "Deposit",
      credit: <span className="green-font">250000</span>,
      debit: "-",
      sportsCasino: "Casino",
      balance: "0",
      fromTo: "Srinivas Director - Owner",
    },
    {
      sNo: 5,
      dateTime: "07-10-2024, 17:17:00",
      description: "Withdraw",
      credit: "-",
      debit: <span className="red-font">500000</span>,
      sportsCasino: "Casino",
      balance: "0",
      fromTo: "Srinivas Director - Owner",
    },
    {
      sNo: 6,
      dateTime: "07-10-2024, 17:17:00",
      description: "Withdraw",
      credit: "-",
      debit: <span className="red-font">300000</span>,
      sportsCasino: "Casino",
      balance: "0",
      fromTo: "Srinivas Director - Owner",
    },
    {
      sNo: 7,
      dateTime: "07-10-2024, 17:17:00",
      description: "Deposit",
      credit: <span className="green-font">550000</span>,
      debit: "-",
      sportsCasino: "Sports",
      balance: "0",
      fromTo: "Jayanta SM - Owner",
    },
    {
      sNo: 8,
      dateTime: "07-10-2024, 17:17:00",
      description: "Deposit",
      credit: <span className="green-font">450000</span>,
      debit: "-",
      sportsCasino: "Sports & Casino",
      balance: "0",
      fromTo: "Lokesh Director - Owner",
    },
    {
      sNo: 9,
      dateTime: "07-10-2024, 17:17:00",
      description: "Deposit",
      credit: <span className="green-font">250000</span>,
      debit: "-",
      sportsCasino: "Casino",
      balance: "0",
      fromTo: "Srinivas Director - Owner",
    },
    {
      sNo: 10,
      dateTime: "07-10-2024, 17:17:00",
      description: "Withdraw",
      credit: "-",
      debit: <span className="red-font">100000</span>,
      sportsCasino: "Casino",
      balance: "0",
      fromTo: "Srinivas Director - Owner",
    },
    {
      sNo: 11,
      dateTime: "07-10-2024, 17:17:00",
      description: "Withdraw",
      credit: "-",
      debit: <span className="red-font">200000</span>,
      sportsCasino: "Casino",
      balance: "0",
      fromTo: "Srinivas Director - Owner",
    },
    {
      sNo: 12,
      dateTime: "07-10-2024, 17:17:00",
      description: "Deposit",
      credit: <span className="green-font">300000</span>,
      debit: "-",
      sportsCasino: "Sports",
      balance: "0",
      fromTo: "Jayanta SM - Owner",
    },
    {
      sNo: 13,
      dateTime: "07-10-2024, 17:17:00",
      description: "Deposit",
      credit: <span className="green-font">300000</span>,
      debit: "-",
      sportsCasino: "Sports & Casino",
      balance: "0",
      fromTo: "Lokesh Director - Owner",
    },
    {
      sNo: 14,
      dateTime: "07-10-2024, 17:17:00",
      description: "Deposit",
      credit: <span className="green-font">250000</span>,
      debit: "-",
      sportsCasino: "Casino",
      balance: "0",
      fromTo: "Srinivas Director - Owner",
    },
    {
      sNo: 15,
      dateTime: "07-10-2024, 17:17:00",
      description: "Withdraw",
      credit: "-",
      debit: <span className="red-font">400000</span>,
      sportsCasino: "Casino",
      balance: "0",
      fromTo: "Srinivas Director - Owner",
    },
  ];

  const TRANSACTION_FOOTER = [
    { header: "Total", width: "5%" },
    { header: "", width: "15%" },
    { header: "", width: "10%" },
    { header: <span className="green-font">12500000</span>, width: "10%" },
    { header: <span className="red-font">80000000</span>, width: "10%" },
    { header: "", width: "10%" },
    { header: <span className="black-font">500000</span>, width: "10%" },
    { header: "", width: "10%" },
  ];

  return (
    <div>
      <div className="row d-flex justify-content-between align-items-center mb-4 mt-2">
        <h6 className="col-3 mb-0 d-flex align-items-center">
          <FiChevronLeft className="medium-font black-text" />
          <span className="yellow-font medium-font">{transactionHistory}</span>
        </h6>
        <div className="col-4 d-flex justify-content-end gap-3 medium-font">
          <div className="input-pill d-flex align-items-center rounded-pill px-2 w-60">
            <FaSearch size={16} className="grey-clr me-2" />
            <input className="small-font all-none" placeholder="Search..." />
          </div>
        </div>
      </div>

      <div className="row justify-content-between align-items-center">
        <div className="col-4 d-flex gap-2 small-font">
          {buttons.map((button) => (
            <button
              key={button}
              className={`col-3 col-lg-2
                ${button === activeButton ? "saffron-btn rounded" : "white-btn rounded"}`
              }
              onClick={() => handleButtonClick(button)}
            >
              {button}
            </button>
          ))}
        </div>

        <div className="col-6 d-flex justify-content-end gap-3 small-font">
          <input type="date" className="input-css2 clr-white" />
          <input type="date" className="input-css2 clr-white" />
          <button className="saffron-btn w-25 rounded">Submit</button>
        </div>
        
      </div>

      <div className="mt-3">
        <Table
          columns={TRANSACTION_COLUMNS}
          data={TRANSACTION_DATA}
          footer={TRANSACTION_FOOTER}
          itemsPerPage={9}
          rowColor={(row) => (row.debit > 0 ? "red-text" : "green-text")}
        />
      </div>
    </div>
  );
};

export default DownlineTrasactionHistory;

