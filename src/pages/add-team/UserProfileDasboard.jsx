import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { MdLockReset, MdRemoveRedEye, MdOutlineVisibilityOff } from "react-icons/md";
import { FaUserTie, FaMapMarkerAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";
import { Images } from "../../images";
import PaymentGateway from "./components/PaymentGateway";
import Transaction from "./components/Transaction";
import BetHistory from "./components/BetHistory";
import ResetPasswordPopup from "../../pages/popups/ResetPasswordPopup";
import EditProfilePopup from "./popups/EditProfilePopup";
import "bootstrap/dist/css/bootstrap.min.css";
import "../add-team/style.css";
import "../../App.css";
import "../../index.css";

const cardData = [
  {
    title: "Share Revenue",
    backgroundColor: "#7DA0FA",
    value: "500000000",
    valueClass: "text-dark",
    icon: (
      <img
        src={Images.adminProfileShareRevenue}
        alt="ShareRevenue"
        className="chat-img m-1"
      />
    ),
    bootstrapClassesTop: "downline-list-card-top",
    bootstrapClassesBottom: "mb-0 fw-bold downline-list-card-bottom",
  },
  {
    title: "Rental Revenue",
    backgroundColor: "#7DA0FA",
    value: "500000000",
    valueClass: "text-dark",
    icon: (
      <img
        src={Images.adminProfileShareRevenue}
        alt="ShareRevenue"
        className="chat-img m-1"
      />
    ),
    bootstrapClassesTop: "downline-list-card-top",
    bootstrapClassesBottom: "mb-0 fw-600 downline-list-card-bottom",
  },
  {
    title: "Total Paid",
    backgroundColor: "#7DA0FA",
    value: "500000000",
    valueClass: "text-danger",
    icon: (
      <img
        src={Images.adminProfileTotalPaid}
        alt="ShareRevenue"
        className="chat-img m-1"
      />
    ),
    bootstrapClassesTop: "downline-list-card-top",
    bootstrapClassesBottom: "mb-0 fw-600 downline-list-card-bottom",
  },
  {
    title: "Net Profit/Loss",
    backgroundColor: "#7DA0FA",
    value: "300000000",
    valueClass: "text-dark",
    icon: (
      <img
        src={Images.adminProfileNetProfit}
        alt="ShareRevenue"
        className="chat-img m-1"
      />
    ),
    bootstrapClassesTop: "downline-list-card-top",
    bootstrapClassesBottom: "mb-0 fw-600 downline-list-card-bottom",
  },
];

const addDirectorTabsRowCardsData = [
  {
    title: "Total Admins",
    backgroundColor: "#7DA0FA",
    value: "500000000",
    valueClass: "text-dark",
    icon: (
      <img
        src={Images.adminProfileTotalAdmins}
        alt="TotalAdmins"
        className="chat-img"
      />
    ),
    bootstrapClassesTop: "downline-list-card-top",
    bootstrapClassesBottom: "mb-0 fw-600 downline-list-card-bottom",
  },
  {
    title: "Total Users",
    backgroundColor: "#7DA0FA",
    value: "500000000",
    valueClass: "text-dark",
    icon: (
      <img
        src={Images.adminProfileTotalUsers}
        alt="TotalAdmins"
        className="chat-img"
      />
    ),
    bootstrapClassesTop: "downline-list-card-top",
    bootstrapClassesBottom: "mb-0 fw-600 downline-list-card-bottom",
  },
];

const bottomCardsData = [
  {
    title: "Buying Chips",
    backgroundColor: "#7DA0FA",
    value: "500000000",
    valueClass: "text-dark",
    icon: (
      <img
        src={Images.adminProfileBuyingChips}
        alt="ShareRevenue"
        className="chat-img"
      />
    ),
    bootstrapClassesTop: "downline-list-card-top",
    bootstrapClassesBottom: "mb-0 fw-bold downline-list-card-bottom",
  },
  {
    title: "Exposer",
    backgroundColor: "#7DA0FA",
    value: "25000",
    valueClass: "text-danger",
    icon: (
      <img
        src={Images.adminProfileExposer}
        alt="ShareRevenue"
        className="chat-img"
      />
    ),
    bootstrapClassesTop: "downline-list-card-top",
    bootstrapClassesBottom: "mb-0 fw-bold downline-list-card-bottom",
  },
  {
    title: "Sale Chips",
    backgroundColor: "#7DA0FA",
    value: "500000000",
    valueClass: "text-dark",
    icon: (
      <img
        src={Images.adminProfileTotalPaid}
        alt="ShareRevenue"
        className="chat-img"
      />
    ),
    bootstrapClassesTop: "downline-list-card-top",
    bootstrapClassesBottom: "mb-0 fw-bold downline-list-card-bottom",
  },
  {
    title: "Downline Available Chips",
    backgroundColor: "#7DA0FA",
    value: "500000000",
    valueClass: "text-dark",
    icon: (
      <img
        src={Images.adminProfileAvailableChips}
        alt="ShareRevenue"
        className="chat-img"
      />
    ),
    bootstrapClassesTop: "downline-list-card-top",
    bootstrapClassesBottom: "mb-0 fw-bold downline-list-card-bottom",
  },
  {
    title: "Balance Chips",
    backgroundColor: "#7DA0FA",
    value: "500000000",
    valueClass: "text-dark",
    icon: (
      <img
        src={Images.adminProfileBalanceChips}
        alt="ShareRevenue"
        className="chat-img"
      />
    ),
    bootstrapClassesTop: "downline-list-card-top",
    bootstrapClassesBottom: "mb-0 fw-bold downline-list-card-bottom",
  },
  {
    title: "Downline P/L Chips",
    backgroundColor: "#7DA0FA",
    value: "500000000",
    valueClass: "text-dark",
    icon: (
      <img
        src={Images.adminProfileDownlinePlChips}
        alt="ShareRevenue"
        className="chat-img"
      />
    ),
    bootstrapClassesTop: "downline-list-card-top",
    bootstrapClassesBottom: "mb-0 fw-bold downline-list-card-bottom",
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
      <p className={`medium-font fw-600 ${bootstrapClassesBottom} ${valueClass}`}>{value}</p>
    </div>
  );
};

const DefaultBottomShow = () => {
  return (
    <div className="py-4 bg-white shadow rounded">
      <div className="px-4 d-flex justify-content-between align-items-center mb-3">
        <h6 className="small-font">
          Texchange I{" "}
          <span className="yellow-font">
            texch.com - Share 10% - Rental 0.00
          </span>
        </h6>
        <div className="d-flex align-items-center">
          <span className="me-3 black-text small-font black-font">Active</span>

          <Form>
            <Form.Check
              type="switch"
              id="custom-switch"
              className="director-admin-profile-toggle-btn"
            />
          </Form>

          <span className="ms-2 black-text small-font black-font">
            In-active
          </span>
        </div>
      </div>

      <hr className="dashed-line mb-4" style={{ color: "black" }} />

      {/* Main Content Container */}

      <div className="row px-4">
        <div className="col-8">
          <div className="row d-flex gap-3 ">
            <h6 className="small-font">Sports/Casino</h6>
            {bottomCardsData.map((card, index) => (
              <div
                className="col-4 card border border-grey p-0 direct-admin-profile-bottom-card"
                key={index}
              >
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

        {/* Right Side Container */}
        <div className="col-4 align-self-end">
          <div className="bg-white director-admin-profile-bottom-section-right p-4">
            <h5 className="yellow-font small-font">Total Amount</h5>
            <input
              type="text"
              value="500000"
              className="w-100 input-css fw-600 mb-2 small-font"
              readOnly
            />

            <h5 className="yellow-font small-font">Paid Amount</h5>
            <input
              type="text"
              value="500000"
              className="w-100 input-css fw-600 small-font mb-2"
              readOnly
            />

            <h5 className="yellow-font small-font">Net P/L</h5>
            <input
              type="text"
              value="500000"
              className="w-100 input-css fw-600 small-font mb-2"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const UserProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState("websitesLimit");
  const [showResetPasswordPopup, setShowResetPasswordPopup] = useState(false);
  const [showEditProfilePopup, setShowEditProfilePopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleResetPasswordClose = () => {
    setShowResetPasswordPopup(false);
  };

  return (
    <div>
      <div className="gap-3 director-admin-profile-top-con rounded">
        {/* User Information Section */}
        <div className="d-flex w-100 justify-content-end mb-3 gap-4 px-3">
          <div className="director-admin-profile-top-bg-dark d-flex align-items-center gap-4 px-3 text-white rounded-pill">
            <span className="fw-600 small-font">User Name</span>
            <span className="fw-600 small-font">Jayanta</span>
          </div>

          <div className="director-admin-profile-top-bg-dark d-flex align-items-center gap-1 text-white rounded-pill px-3">
            <div className="d-flex align-items-center gap-4 px-2">
              <span className="fw-600 small-font">Password</span>
              <span className="fw-600 small-font"> {showPassword ? "1234567823" : "********"}</span>
            </div>

            <div className="d-flex align-items-center gap-1 my-1">
              {/* <div className="director-top-bg-icon px-2 py-1">
                <MdRemoveRedEye className="text-warning large-font pointer" />
              </div> */}
              <div
                className="director-top-bg-icon px-2 py-1 pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <MdOutlineVisibilityOff className="text-warning large-font" />
                ) : (
                  <MdRemoveRedEye className="text-warning large-font" />
                )}
              </div>
              <div className="director-top-bg-icon px-2 py-1">
                <MdLockReset
                  className="text-warning large-font pointer"
                  onClick={() => setShowResetPasswordPopup(true)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Top Container */}
        <div className="director-admin-profile-top-bg-dark px-3 py-2 text-white rounded">
          {/* Profile Details */}
          <div className="row">
            <div className="col-2 super-admin-top-container">
              <img
                src={Images.dashboardProfile}
                alt="UserDashboard"
                className="super-admin-profile-img-con"
              />
              <div
                className="d-flex gap-2 super-admin-img-down-content align-items-end"
                style={{ marginTop: "20px" }}
              >
                <h6 className="small-font mb-0">Jayanta Pal</h6>
                <FaPen
                  className="yellow-font pointer medium-font mt-1"
                  onClick={() => setShowEditProfilePopup(true)}
                />
              </div>
            </div>
            <div className="col-10">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <div className="d-flex gap-4 align-items-center">
                  <div className="d-flex gap-2 align-items-end">
                    <FaUserTie className="large-font" />
                    <span className="small-font">Director</span>
                  </div>
                  <div className="d-flex gap-2 align-items-end">
                    <FaMapMarkerAlt className="large-font" />
                    <span className="small-font">India</span>
                  </div>
                </div>
                <span className="director-admin-profile-active-btn rounded-pill py-2 px-4 small-font m-1">
                  Active
                </span>
              </div>

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
        </div>
      </div>

      <ResetPasswordPopup
        resetPasswordPopup={showResetPasswordPopup}
        setResetPasswordPopup={handleResetPasswordClose}
      />
      <EditProfilePopup
        show={showEditProfilePopup}
        onHide={() => setShowEditProfilePopup(false)}
      />

      {/* Tabs Section */}
      <div className="row py-3 px-3">
        <div className="col-7 p-0">
          <div className="d-flex justify-content-between align-items-center director-profile-tab-btn h-100 gap-3">
            <button
              className={`small-font rounded p-2 w-25 ${activeTab === "websitesLimit" && "saffron-btn"
                }`}
              onClick={() => handleTabClick("websitesLimit")}
            >
              Websites/Limit
            </button>
            <button
              className={`small-font rounded p-2 text-center w-25 ${activeTab === "paymentGateway" && "saffron-btn"
                }`}
              onClick={() => handleTabClick("paymentGateway")}
            >
              Payment Gateway
            </button>
            <button
              className={`small-font rounded p-2 text-center w-25 ${activeTab === "transaction" && "saffron-btn"
                }`}
              onClick={() => handleTabClick("transaction")}
            >
              Transaction
            </button>
            <button
              className={`small-font rounded p-2 text-center w-25 ${activeTab === "betHistory" && "saffron-btn"
                }`}
              onClick={() => handleTabClick("betHistory")}
            >
              Bet History
            </button>
          </div>
        </div>

        {/* Right Section Cards */}
        <div className="col-5">
          <div className="row gap-3 d-flex justify-content-end">
            {addDirectorTabsRowCardsData.map((card, index) => (
              <div className="col-5 card border border-grey p-0" key={index}>
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

      {/* Conditional Rendering of Components */}
      <div className="table-parent-container mt-2">
        {activeTab === "websitesLimit" && <DefaultBottomShow />}
        {activeTab === "paymentGateway" && <PaymentGateway />}
        {activeTab === "transaction" && <Transaction />}
        {activeTab === "betHistory" && <BetHistory />}
      </div>
    </div>
  );
};

export default UserProfileDashboard;
