import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import Table from "../../components/Table";
import { SlPencil } from "react-icons/sl";
import { IoTrashOutline } from "react-icons/io5";
import SettledPopup from "./SettledPopup";

function SettledHistory() {
  const [setteledPopupOpen, setSettledPopupOpen] = useState(false);
  const handleSettledPopupOpen = () => {
    setSettledPopupOpen(true);
  };
  const SETTLED_HISTORY_COLUMNS = [
    { header: "Date & Time", field: "date_time" },
    { header: "Pay From", field: "pay_from" },
    { header: "Received To", field: "received_to" },
    { header: "Trn Type", field: "transaction_type" },
    { header: "Paid Amt", field: "paid_amount" },
    { header: "Currency", field: "currency" },
    { header: "Paid Amt. (Rs)", field: "paid_amount_rs" },
    { field: "action", width: "5%" },
  ];
  const SETTLED_HISTORY_DATA = [
    {
      date_time: "07-10-2024, 16:25:00",
      pay_from: "Owner",
      received_to: "Mishra - Dubai - Sports",
      transaction_type: "NEFT/RTGS",
      paid_amount: 4000,
      currency: "USD",
      paid_amount_rs: <div className="yellow-font">4000000</div>,
      action: (
        <div className="flex-end">
          <SlPencil
            size={18}
            className="black-text me-2"
            onClick={handleSettledPopupOpen}
          />
          <IoTrashOutline size={18} className="black-text" />
        </div>
      ),
    },
    {
      date_time: "07-10-2024, 16:25:00",
      pay_from: "Owner",
      received_to: "Mishra - Dubai - Sports",
      transaction_type: "NEFT/RTGS",
      paid_amount: 4000,
      currency: "USD",
      paid_amount_rs: <div className="yellow-font">4000000</div>,
      action: (
        <div className="flex-end">
          <SlPencil size={18} className="black-text me-2" />
          <IoTrashOutline size={18} className="black-text" />
        </div>
      ),
    },
    {
      date_time: "07-10-2024, 16:25:00",
      pay_from: "Owner",
      received_to: "Mishra - Dubai - Sports",
      transaction_type: "NEFT/RTGS",
      paid_amount: 4000,
      currency: "USD",
      paid_amount_rs: <div className="yellow-font">4000000</div>,
      action: (
        <div className="flex-end">
          <SlPencil size={18} className="black-text me-2" />
          <IoTrashOutline size={18} className="black-text" />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="d-flex yellow-font mb-0">
          <span>My Vendors Account</span>
          <span className="ms-2 flex-center">
            <FiChevronRight />
            Settled History
          </span>
        </h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>
      <div className="flex-between mb-3">
        <div className="w-50 d-flex p-3 grey-bg2 rounded">
          <div className="col-4 pe-3 flex-center">
            <span className="w-100 saffron-btn2 medium-font">
              Owner Balance
            </span>
          </div>
          <div className="col-8 white-btn2 flex-between">
            <span className="small-font">Casino Balance Chips</span>
            <span className=" medium-font">1000000000</span>
          </div>
        </div>
        <div className="white-btn2 medium-font px-3">Settled History</div>
      </div>
      <div className="row mb-3 w-50">
        <div className="col flex-column">
          <label className="black-text4 small-font mb-1">From</label>
          <input className="input-css2 small-font" type="date" />
        </div>
        <div className="col flex-column">
          <label className="black-text4 small-font mb-1">To</label>
          <input className="input-css2 small-font" type="date" />
        </div>
        <div className="col  flex-column d-flex align-items-end justify-content-end">
          <button className="w-100 saffron-btn2 small-font">Submit</button>
        </div>
      </div>
      <Table
        columns={SETTLED_HISTORY_COLUMNS}
        data={SETTLED_HISTORY_DATA}
        itemsPerPage={2}
      />
      <SettledPopup
        setteledPopupOpen={setteledPopupOpen}
        setSettledPopupOpen={setSettledPopupOpen}
      />
    </div>
  );
}

export default SettledHistory;
