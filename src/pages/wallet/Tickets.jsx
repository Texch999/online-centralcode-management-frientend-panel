import React from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/Table";
import { BsEye } from "react-icons/bs";

function Tickets() {
  const TICKETS_COLUMNS = [
    { header: "S No", field: "serialNo" },
    { header: "Date & Time", field: "dateTime" },
    { header: "Name & Role", field: "nameRole" },
    { header: "Trn ID", field: "transactionId" },
    { header: "D/W", field: "dw" },
    { header: "Chips", field: "chips" },
    { header: "Currency", field: "currency" },
    { header: "Currency Amt.", field: "currencyAmount" },
    { header: "Amt. in Rs", field: "amountInRs" },
    { header: "Deposit Type", field: "depositType" },
    { header: "Status", field: "status" },
    { header: "", field: "view" },
  ];

  const TICKETS_DATA = [
    {
      serialNo: 1,
      dateTime: "07-10-2024, 17:17:00",
      nameRole: (
        <div>
          Srinivas - Director
          <br />
          Share/Royalty - 10%
        </div>
      ),
      transactionId: "TRN123456781234",
      dw: (
        <div>
          <div>Withdraw</div>
          <div>Sp/Cas</div>
        </div>
      ),
      chips: <div>-</div>,
      currency: <div>-</div>,
      currencyAmount: <div>-</div>,
      amountInRs: <div>-</div>,
      depositType: <div>-</div>,
      status: <div className="edit-btn">New</div>,
      view: (
        <div className="w-100 flex-center">
          <BsEye size={18} className="black-text" />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="d-flex yellow-font mb-0">Tickets</h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>
      <div className="grey-bg2 d-flex w-100 py-3 rounded">
        <div className="col-3 px-3">
          <div className="white-bg rounded flex-between">
            <span className="saffron-btn small-font rounded">
              Total Tickets
            </span>
            <span className="medium-font black-text4 pe-2">1000000</span>
          </div>
        </div>
        <div className="col-3 px-3">
          <div className="white-bg rounded flex-between">
            <span className="saffron-btn small-font rounded">
              Total Tickets
            </span>
            <span className="medium-font black-text4 pe-2">1000000</span>
          </div>
        </div>{" "}
        <div className="col-3 px-3">
          <div className="white-bg rounded flex-between">
            <span className="saffron-btn small-font rounded">
              Approved Tickets
            </span>
            <span className="medium-font black-text4 pe-2">9000</span>
          </div>
        </div>{" "}
        <div className="col-3 px-3">
          <div className="white-bg rounded flex-between">
            <span className="saffron-btn small-font rounded">
              Rejected Tickets
            </span>
            <span className="medium-font black-text4 pe-2">100</span>
          </div>
        </div>
      </div>
      <div className="w-50 row my-3">
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
      <Table columns={TICKETS_COLUMNS} data={TICKETS_DATA} itemsPerPage={2} />
    </div>
  );
}

export default Tickets;
