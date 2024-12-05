import React, { useState } from "react";
import { MdBlockFlipped, MdSwapVert } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import { GrEdit } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import { Images } from "../../images/index";
import Table from "../../components/Table";
import "../../App.css";
import "./style.css";
import CreditReferencePopup from "./popups/CreditReferencePopup";



const DownlineList = () => {
  const role = localStorage.getItem("role")
  const [showCreditAmountPopup, setShowCreditAmountPopup] = useState(false);

  const cardData = [
    {
      title: role === "Super Admin" ? "Received Rental Amount" : "Share Revenue",
      backgroundColor: "#7DA0FA",
      value: "500000000",
      valueClass: "text-dark",
      icon: (
        <img
          src={Images.adminProfileShareRevenue}
          alt="ShareRevenue"
          className="chat-img"
        />
      ),
      bootstrapClassesTop: "p-3",
      bootstrapClassesBottom: "mb-0 fw-bold px-3 p-3",
    },
    {
      title: role === "Super Admin" ? "Share/Royalty Amount" : "Rental Revenue",
      backgroundColor: "#7DA0FA",
      value: "500000000",
      valueClass: "text-dark",
      icon: (
        <img
          src={Images.adminProfileShareRevenue}
          alt="ShareRevenue"
          className="chat-img"
        />
      ),
      bootstrapClassesTop: "p-3",
      bootstrapClassesBottom: "mb-0 fw-bold px-3 p-3",
    },
    {
      title: role === "Super Admin" ? "Total Withdraw" : "Total Paid",
      backgroundColor: "#7DA0FA",
      value: "0.00",
      valueClass: "",
      icon: (
        <img
          src={Images.adminProfileTotalPaid}
          alt="ShareRevenue"
          className="chat-img"
        />
      ),
      bootstrapClassesTop: "p-3",
      bootstrapClassesBottom: "mb-0 fw-bold px-3 p-3",
    },
    {
      title: role === "Super Admin" ? "Net P/L" : "Another Revenue",
      backgroundColor: "#7DA0FA",
      value: "300000000",
      valueClass: "text-dark",
      icon: (
        <img
          src={Images.adminProfileTotalPaid}
          alt="ShareRevenue"
          className="chat-img"
        />
      ),
      bootstrapClassesTop: "p-3",
      bootstrapClassesBottom: "mb-0 fw-bold px-3 p-3",
    },
  ];
  
  const Card = ({
    title,
    backgroundColor,
    value,
    valueClass,
    icon,
    bootstrapClassesTop,
    bootstrapClassesBottom,
  }) => {
    return (
      <div className="mini-container bg-white">
        <div
          className={`top-section rounded-top d-flex justify-content-between align-items-center ${bootstrapClassesTop}`}
          style={{ backgroundColor: backgroundColor }}
        >
          <h6 className="mb-0 text-white small-font">{title}</h6>
          {icon}
        </div>
        <p className={`${bootstrapClassesBottom} ${valueClass}`}>{value}</p>
      </div>
    );
  };
  const navigate = useNavigate();

  const handleNavigateUserDashboard = () => {
    navigate("/transactions-history");
  };

  const ACCOUNT_COLUMNS = [
    { header: "Account", field: "account" },
    { header: "Credit Ref.", field: "creditRef" },
    { header: "Total Cus D", field: "totalCusD" },
    { header: "Total Cus W", field: "totalCusW" },
    { header: "Wall. Bal", field: "walletBalance" },
    { header: "Exposure", field: "exposure" },
    { header: "Wall Ply. Bal", field: "walletPlayingBalance" },
    { header: "Ref P/L", field: "referralPL" },
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
      creditRef: (
        <>
          0{" "}
          <GrEdit
            className="icon-edit ms-2 pointer"
            size={15}
            onClick={() => setShowCreditAmountPopup(true)}
          />
        </>
      ),
      totalCusD: 10000,
      totalCusW: 5000,
      walletBalance: <spanc className="yellow-font">2000</spanc>,
      exposure: <span className="red-font">1000</span>,
      walletPlayingBalance: 1000,
      referralPL: <div className="green-font">3000</div>,
      action: (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <button className="payment-gateway-status-badge mb-1 p-2 badge rounded">
            Active
          </button>
          <div className="d-flex">
            <BsPerson size={20} className="icon-action me-2 pointer" />
            <MdBlockFlipped size={20} className="icon-action me-2 pointer" />
            <MdSwapVert
              size={20}
              className="icon-action pointer"
              onClick={handleNavigateUserDashboard}
            />
          </div>
        </div>
      ),
    },
    {
      account: (
        <div>
          <div>Super Admin - Lokesh</div>
          <div>India - Delhi</div>
        </div>
      ),
      creditRef: (
        <>
          0 <GrEdit className="icon-edit ms-2" size={15} />
        </>
      ),
      totalCusD: 10000,
      totalCusW: 5000,
      walletBalance: <spanc className="yellow-font">2000</spanc>,
      exposure: <span className="red-font">1000</span>,
      walletPlayingBalance: 1000,
      referralPL: <div className="green-font">3000</div>,
      action: (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <button className="payment-gateway-status-badge mb-1 p-2 badge rounded">
            Active
          </button>
          <div className="d-flex">
            <BsPerson size={20} className="icon-action me-2" />
            <MdBlockFlipped size={20} className="icon-action me-2" />
            <MdSwapVert size={20} className="icon-action" />
          </div>
        </div>
      ),
    },
    {
      account: (
        <div>
          <div>Super Admin - Jayanta</div>
          <div>India - Hyderabad</div>
        </div>
      ),
      creditRef: (
        <>
          0 <GrEdit className="icon-edit ms-2" size={15} />
        </>
      ),
      totalCusD: 10000,
      totalCusW: 5000,
      walletBalance: <spanc className="yellow-font">2000</spanc>,
      exposure: <span className="red-font">1000</span>,
      walletPlayingBalance: 1000,
      referralPL: <div className="green-font">3000</div>,
      action: (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <button className="payment-gateway-status-badge mb-1 p-2 badge rounded">
            Active
          </button>
          <div className="d-flex">
            <BsPerson size={20} className="icon-action me-2" />
            <MdBlockFlipped size={20} className="icon-action me-2" />
            <MdSwapVert size={20} className="icon-action" />
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
      creditRef: (
        <>
          0 <GrEdit className="icon-edit ms-2" size={15} />
        </>
      ),
      totalCusD: 10000,
      totalCusW: 5000,
      walletBalance: <spanc className="yellow-font">2000</spanc>,
      exposure: <span className="red-font">1000</span>,
      walletPlayingBalance: 1000,
      referralPL: <div className="green-font">3000</div>,
      action: (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <button className="payment-gateway-status-badge mb-1 p-2 badge rounded">
            Active
          </button>
          <div className="d-flex">
            <BsPerson size={20} className="icon-action me-2" />
            <MdBlockFlipped size={20} className="icon-action me-2" />
            <MdSwapVert size={20} className="icon-action" />
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
      creditRef: (
        <>
          0 <GrEdit className="icon-edit ms-2" size={15} />
        </>
      ),
      totalCusD: 10000,
      totalCusW: 5000,
      walletBalance: <spanc className="yellow-font">2000</spanc>,
      exposure: <span className="red-font">1000</span>,
      walletPlayingBalance: 1000,
      referralPL: <div className="green-font">3000</div>,
      action: (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <button className="payment-gateway-status-badge mb-1 p-2 badge rounded">
            Active
          </button>
          <div className="d-flex">
            <BsPerson size={20} className="icon-action me-2" />
            <MdBlockFlipped size={20} className="icon-action me-2" />
            <MdSwapVert size={20} className="icon-action" />
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
      creditRef: (
        <>
          0 <GrEdit className="icon-edit ms-2" size={15} />
        </>
      ),
      totalCusD: 10000,
      totalCusW: 5000,
      walletBalance: <spanc className="yellow-font">2000</spanc>,
      exposure: <span className="red-font">1000</span>,
      walletPlayingBalance: 1000,
      referralPL: <div className="green-font">3000</div>,
      action: (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <button className="payment-gateway-status-badge mb-1 p-2 badge rounded">
            Active
          </button>
          <div className="d-flex">
            <BsPerson size={20} className="icon-action me-2" />
            <MdBlockFlipped size={20} className="icon-action me-2" />
            <MdSwapVert size={20} className="icon-action" />
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
    { header: <span className="fw-700 red-font">5000</span> },
    { header: <span className="fw-700">500</span> },
    { header: <span className="fw-700 green-font">15000</span> },
    { header: "" },
  ];

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="d-flex yellow-font medium-font mb-0">Downline List</h6>
        <div className="d-flex flex-between w-30">
          <div>
            <select className="input-pill rounded-pill px-5">
              <option>All</option>
            </select>
          </div>
          <div className="input-pill d-flex align-items-center rounded-pill px-2 w-60">
            <FaSearch size={16} className="grey-clr me-2" />
            <input className="small-font all-none" placeholder="Search..." />
          </div>
        </div>
      </div>

      <div className="row ps-2 gap-3">
        <div className="col-10">
          <div className="row">
            {cardData.map((card, index) => (
              <div className="col-3 px-1" key={index}>
                <Card
                  title={card.title}
                  backgroundColor={card.backgroundColor}
                  value={card.value}
                  valueClass={card.valueClass}
                  icon={card.icon}
                  bootstrapClassesTop={card.bootstrapClassesTop}
                  bootstrapClassesBottom={card.bootstrapClassesBottom}
                />
              </div>
            ))}
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
    </div>
  );
};

export default DownlineList;
