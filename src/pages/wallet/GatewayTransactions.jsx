import React, { useState } from "react";
import Table from "../../components/Table";
import { BsEye } from "react-icons/bs";
import DepositWithdrawPopup from "./DepositWithdrawPopup";
import { FaSearch } from "react-icons/fa";

function GatewayTransactions() {
  const [depositWithdrawPopupOpen, setDepositWithdrawPopupOpen] =
    useState(false);
  const handleDepositWithdrawPopupOpen = () => {
    setDepositWithdrawPopupOpen(true);
  };
  const TICKETS_COLUMNS = [
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
      dateTime: "07-10-2024, 17:17:00",
      nameRole: (
        <div>
          Srinivas - Director
          <br />
          Share/Royalty - 10%
        </div>
      ),
      transactionId: "123456781234",
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
      depositType: <div>Payment Gateway</div>,
      status: <div className="edit-btn">New</div>,
      view: (
        <div className="w-100 flex-center">
          <BsEye
            size={18}
            className="black-text pointer"
            onClick={handleDepositWithdrawPopupOpen}
          />
        </div>
      ),
    },
    {
      dateTime: "07-10-2024, 17:17:00",
      nameRole: (
        <div>
          Srinivas - Director
          <br />
          Rental (SP) - 100000 <br />
          Casino - 10%
        </div>
      ),
      transactionId: "123456781234",
      dw: (
        <div>
          <div>Deposit</div>
          <div>Casino</div>
        </div>
      ),
      chips: <div>120000</div>,
      currency: <div>USD</div>,
      currencyAmount: <div>4000</div>,
      amountInRs: <div>400000</div>,
      depositType: <div>Payment Gateway</div>,
      status: <div className="red-btn">Rejected</div>,
      view: (
        <div className="w-100 flex-center">
          <BsEye
            size={18}
            className="black-text pointer"
            onClick={handleDepositWithdrawPopupOpen}
          />
        </div>
      ),
    },
    {
      dateTime: "07-10-2024, 17:17:00",
      nameRole: (
        <div>
          Srinivas - Director
          <br />
          Rental (SP) - 100000 <br />
          Casino - 10%
        </div>
      ),
      transactionId: "123456781234",
      dw: (
        <div>
          <div>Deposit</div>
          <div>Casino</div>
        </div>
      ),
      chips: <div>120000</div>,
      currency: <div>USD</div>,
      currencyAmount: <div>4000</div>,
      amountInRs: <div>400000</div>,
      depositType: <div>Payment Gateway</div>,
      status: <div className="green-btn">Approved</div>,
      view: (
        <div className="w-100 flex-center">
          
          <BsEye
            size={18}
            className="black-text pointer"
            onClick={handleDepositWithdrawPopupOpen}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="d-flex medium-font yellow-font mb-0">Gateway Transaction</h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <div className="white-bg border rounded small-font">
            <div className="yellow-bg p-2 text-center white-text rounded-top">
              Total Deposit
            </div>
            <div className="white-bg p-2 text-center green-font rounded-bottom">
              10000000
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="white-bg border rounded small-font">
            <div className="yellow-bg p-2 text-center white-text rounded-top">
              Total Withdraw
            </div>
            <div className="white-bg p-2 text-center red-font rounded-bottom">
              10000000
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="white-bg border rounded small-font">
            <div className="yellow-bg p-2 text-center white-text rounded-top">
              Net Balance
            </div>
            <div className="white-bg p-2 text-center green-font rounded-bottom">
              10000000
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-3">
          <div className="white-bg border rounded small-font">
            <div className="yellow-bg p-2 text-center white-text rounded-top">
              Total Tickets
            </div>
            <div className="white-bg p-2 text-center black-text4 fw-600 rounded-bottom">
              10000000
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="white-bg border rounded small-font">
            <div className="yellow-bg p-2 text-center white-text rounded-top">
              New Tickets
            </div>
            <div className="white-bg p-2 text-center black-text4 fw-600 rounded-bottom">
              10000000
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="white-bg border rounded small-font">
            <div className="yellow-bg p-2 text-center white-text rounded-top">
              Approved Tickets
            </div>
            <div className="white-bg p-2 text-center black-text4 fw-600 rounded-bottom">
              10000000
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="white-bg border rounded small-font">
            <div className="yellow-bg p-2 text-center white-text rounded-top">
              Rejected Tickets
            </div>
            <div className="white-bg p-2 text-center black-text4 fw-600 rounded-bottom">
              10000000
            </div>
          </div>
        </div>
      </div>

      <div className="col-8 row my-3">
        <div className="col-4 col-lg-3 flex-column pe-0">
          <label className="black-text4 small-font mb-1">From</label>
          <input className="input-css2 small-font" type="date" />
        </div>
        <div className="col-4 col-lg-3 flex-column pe-0">
          <label className="black-text4 small-font mb-1">To</label>
          <input className="input-css2 small-font" type="date" />
        </div>
        <div className="col-2 flex-column d-flex align-items-end justify-content-end">
          <button className="w-100 saffron-btn2 small-font">Submit</button>
        </div>
      </div>
      <Table columns={TICKETS_COLUMNS} data={TICKETS_DATA} itemsPerPage={2} />
      <DepositWithdrawPopup
        depositWithdrawPopupOpen={depositWithdrawPopupOpen}
        setDepositWithdrawPopupOpen={setDepositWithdrawPopupOpen}
      />
    </div>
  );
}

export default GatewayTransactions;
