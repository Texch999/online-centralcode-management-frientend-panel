import React, { useState } from "react";
import { MdBlockFlipped, MdSwapVert } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/Table";
import "../../App.css";
import "./style.css";
import CreditReferencePopup from "./popups/CreditReferencePopup";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import { useParams } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";

const DownlineWebsiteList = () => {
  const [onBlockPopup, setOnBlockPopup] = useState(false);
  const role = localStorage.getItem("role");
  const [showCreditAmountPopup, setShowCreditAmountPopup] = useState(false);
  const navigate = useNavigate();
  const { director, website } = useParams();
  console.log(director, "director");

  const handleNavigateUserDashboard = (userwebisite) => {
    navigate(`/downline-list/${userwebisite}`);
  };
  const ACCOUNT_COLUMNS = [
    // { header: "Account", field: "account" },
    { header: "User Websites", field: "websitelist" },
    { header: "Total Cus D", field: "totalCusD" },
    { header: "Total Cus W", field: "totalCusW" },
    { header: "Wall. Bal", field: "walletBalance" },
    // { header: "Exposure", field: "exposure" },
    // { header: "Wall Pay. Bal", field: "walletPlayingBalance" },
    // { header: "Ref P/L", field: "referralPL" },
    { header: <div className="text-center">Action</div>, field: "action" },
  ];

  const ACCOUNT_DATA = [
    {
      account: (
        <div>
          <div>Director - Srinivas</div>
          <div>India - Hyderabad</div>
        </div>
      ),
      websitelist: (
        <>
          <div>diamond.com</div>
        </>
      ),
      totalCusD: 10000,
      totalCusW: 5000,
      walletBalance: <span className="yellow-font">2000</span>,
      exposure: <span className="red-font">1000</span>,
      walletPlayingBalance: 1000,
      referralPL: <div className="green-font">3000</div>,
      action: (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <button className="payment-gateway-status-badge mb-1 p-2 badge rounded">
            Active
          </button>
          <div className="d-flex">
            {/* <BsPerson
              size={20}
              className="icon-action me-2 pointer"
    
            /> */}
            <MdBlockFlipped
              size={20}
              className="icon-action me-2 pointer"
              onClick={() => setOnBlockPopup(true)}
            />
            <MdSwapVert
              size={20}
              className="icon-action pointer"
              onClick={() => handleNavigateUserDashboard("diamond")}
            />
          </div>
        </div>
      ),
    },
    {
      account: (
        <div>
          <div>Director - Srinivas</div>
          <div>India - Hyderabad</div>
        </div>
      ),
      websitelist: (
        <>
          <div>diamond.com</div>
        </>
      ),
      totalCusD: 10000,
      totalCusW: 5000,
      walletBalance: <span className="yellow-font">2000</span>,
      // exposure: <span className="red-font">1000</span>,
      walletPlayingBalance: 1000,
      referralPL: <div className="green-font">3000</div>,
      action: (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <button className="payment-gateway-status-badge mb-1 p-2 badge rounded">
            Active
          </button>
          <div className="d-flex">
            {/* <BsPerson
                size={20}
                className="icon-action me-2 pointer"
      
              /> */}
            <MdBlockFlipped
              size={20}
              className="icon-action me-2 pointer"
              onClick={() => setOnBlockPopup(true)}
            />
            <MdSwapVert
              size={20}
              className="icon-action pointer"
              // onClick={() => handleNavigateUserDashboard("Trasactions History")}
            />
          </div>
        </div>
      ),
    },
    {
      account: (
        <div>
          <div>Director - Srinivas</div>
          <div>India - Hyderabad</div>
        </div>
      ),
      websitelist: (
        <>
          <div>diamond.com</div>
        </>
      ),
      totalCusD: 10000,
      totalCusW: 5000,
      walletBalance: <span className="yellow-font">2000</span>,
      exposure: <span className="red-font">1000</span>,
      walletPlayingBalance: 1000,
      referralPL: <div className="green-font">3000</div>,
      action: (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <button className="payment-gateway-status-badge mb-1 p-2 badge rounded">
            Active
          </button>
          <div className="d-flex">
            {/* <BsPerson
                size={20}
                className="icon-action me-2 pointer"
      
              /> */}
            <MdBlockFlipped
              size={20}
              className="icon-action me-2 pointer"
              onClick={() => setOnBlockPopup(true)}
            />
            <MdSwapVert
              size={20}
              className="icon-action pointer"
              // onClick={() => handleNavigateUserDashboard("Trasactions History")}
            />
          </div>
        </div>
      ),
    },
  ];

  const ACCOUNT_FOOTER = [
    { header: <span className="fw-700">Total</span> },
    { header: "" },
    { header: <span className="fw-700">50000</span> },
    { header: <span className="fw-700">25000</span> },
    { header: <span className="fw-700 yellow-font">10000</span> },
    // { header: <span className="fw-700 red-font">5000</span> },
    // { header: <span className="fw-700">500</span> },
    // { header: <span className="fw-700 green-font">15000</span> },
    { header: "" },
  ];

  return (
    <div>
      <div className="row d-flex justify-content-between align-items-center mb-3">
        <div className="col-md-3">
          <div className="yellow-font large-font mb-0">
            <span onClick={() => navigate(-1)}>
              <FaChevronLeft className="mx-1" />
            </span>

            <span>
              {director}-{website}-downline website list
            </span>
          </div>
        </div>

        <div className="col-md-9 d-flex flex-end align-items-center gap-3">
          <select className="input-pill rounded-pill px-4 small-font">
            <option value="all">All</option>
          </select>

          <div className="input-pill d-flex align-items-center rounded-pill px-3">
            <FaSearch size={18} className="grey-clr me-2" />
            <input
              className="small-font all-none w-100"
              placeholder="Search..."
              type="text"
            />
          </div>
        </div>
      </div>

      <div className="mt-3">
        <Table
          columns={ACCOUNT_COLUMNS}
          data={ACCOUNT_DATA}
          footer={ACCOUNT_FOOTER}
          itemsPerPage={5}
          rowColor={(row) =>
            row.walletBalance > 0 ? "orange-text" : "black-text"
          }
        />
      </div>

      <CreditReferencePopup
        show={showCreditAmountPopup}
        onHide={() => setShowCreditAmountPopup(false)}
      />

      <ConfirmationPopup
        confirmationPopupOpen={onBlockPopup}
        setConfirmationPopupOpen={() => setOnBlockPopup(false)}
        discription={"are you sure you want to block this Account?"}
        submitButton={"Block"}
      />
    </div>
  );
};

export default DownlineWebsiteList;
