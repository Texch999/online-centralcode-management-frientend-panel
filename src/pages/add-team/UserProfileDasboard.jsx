import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import { MdLockReset, MdRemoveRedEye } from "react-icons/md";
import { FaUserTie, FaMapMarkerAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";
import { Images } from "../../images";
import "../add-team/style.css";
import "../../App.css";
import "../../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PaymentGateway from "./components/PaymentGateway";
import Transaction from "./components/Transaction";
import BetHistory from "./components/BetHistory";
import ManagementResetPasswordPopup from "./ManagementResetPasswordPopup";
import EditProfilePopup from "./popups/EditProfilePopup";


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
        className="chat-img"
      />
    ),
    bootstrapClassesTop: "p-3",
    bootstrapClassesBottom: "mb-0 fw-bold px-3 p-2",
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
        className="chat-img"
      />
    ),
    bootstrapClassesTop: "p-3",
    bootstrapClassesBottom: "mb-0 fw-bold px-3 p-2",
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
        className="chat-img"
      />
    ),
    bootstrapClassesTop: "p-3",
    bootstrapClassesBottom: "mb-0 fw-bold px-3 p-2",
  },
  {
    title: "Another Revenue",
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
    bootstrapClassesBottom: "mb-0 fw-bold px-3 p-2",
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
    bootstrapClassesTop: "p-2",
    bootstrapClassesBottom: "mb-0 fw-bold p-2 px-2",
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
    bootstrapClassesTop: "p-2",
    bootstrapClassesBottom: "mb-0 fw-bold p-2 px-2",
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
    bootstrapClassesTop: "p-3",
    bootstrapClassesBottom: "mb-0 fw-bold px-3 p-2",
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
    bootstrapClassesTop: "p-3",
    bootstrapClassesBottom: "mb-0 fw-bold px-3 p-2",
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
    bootstrapClassesTop: "p-3",
    bootstrapClassesBottom: "mb-0 fw-bold px-3 p-2",
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
    bootstrapClassesTop: "p-3",
    bootstrapClassesBottom: "mb-0 fw-bold px-3 p-2",
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
    bootstrapClassesTop: "p-3",
    bootstrapClassesBottom: "mb-0 fw-bold px-3 p-2",
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
    bootstrapClassesTop: "p-3",
    bootstrapClassesBottom: "mb-0 fw-bold px-3 p-2",
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
        <h6 className="mb-0 text-white">{title}</h6>
        {icon}
      </div>
      <p className={`${bootstrapClassesBottom} ${valueClass}`}>{value}</p>
    </div>
  );
};

const DefaultBottomShow = () => {
  return (
    <div className="py-4 bg-white shadow rounded">
      <div className="px-4 d-flex justify-content-between align-items-center mb-3">
        <h6 className="medium-font">
          Texchange I{" "}
          <span className="yellow-font">
            texch.com - Share 10% - Rental 0.00
          </span>
        </h6>
        <div className="d-flex align-items-center">
          <span className="me-2 black-text medium-font">Active</span>

          <Form>
            <Form.Check
              type="switch"
              id="custom-switch"
              className="director-admin-profile-toggle-btn"
            />
          </Form>

          <span className="me-2 black-text medium-font">In-active</span>
        </div>
      </div>

      <hr
        className="dashed-line mb-4"
        style={{ color: "black" }}
      />

      {/* Main Content Container */}

      <div className="row px-4">
        <div className="col-8">
          <div className="row d-flex gap-3 ">
            <h6>Sports/Casino</h6>
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
        <div className="col-4 h-100">
          <div className="bg-white director-admin-profile-bottom-section-right p-4">
            <h5 className="yellow-font medium-font">Total Amount</h5>
            <input
              type="text"
              value="500000"
              className="form-control mb-3"
              readOnly
            />

            <h5 className="yellow-font medium-font">Paid Amount</h5>
            <input
              type="text"
              value="500000"
              className="form-control mb-3"
              readOnly
            />

            <h5 className="yellow-font medium-font">Net P/L</h5>
            <input
              type="text"
              value="500000"
              className="form-control mb-3"
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
  const [showResetPasswordPopup, setShowResetPasswordPopup] = useState(false)
  const [showEditProfilePopup,setShowEditProfilePopup] = useState(false)


  // Handler function to change the active tab
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
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
              <span className="fw-600 small-font">1234567823</span>
            </div>

            <div className="d-flex align-items-center gap-1 my-1">
              <div className="director-top-bg-icon px-2 py-1">
                <MdRemoveRedEye size={18} className="text-warning pointer" />
              </div>
              <div className="director-top-bg-icon px-2 py-1">
                <MdLockReset size={18} className="text-warning pointer" onClick={() => setShowResetPasswordPopup(true)}/>
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
              <div className="d-flex gap-2 super-admin-img-down-content" style={{ marginTop: "20px" }}>
                <h6>Jayanta Pal</h6>
                <FaPen className="yellow-font pointer" size={13} onClick={() => setShowEditProfilePopup(true)}/>
              </div>
            </div>
            <div className="col-10">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <div className="d-flex gap-4 align-items-center">
                  <div className="d-flex gap-2 align-items-center">
                    <FaUserTie />
                    <span>Director</span>
                  </div>
                  <div className="d-flex gap-2 align-items-center">
                    <FaMapMarkerAlt />
                    <span>India</span>
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

      <ManagementResetPasswordPopup isOpen={showResetPasswordPopup} onRequestClose={() => setShowResetPasswordPopup(false)}/>
      <EditProfilePopup show={showEditProfilePopup} onHide={() => setShowEditProfilePopup(false)}/>


      {/* Tabs Section */}
      <div className="row py-3 px-3">
        <div className="col-8 p-0">
          <div className="d-flex justify-content-between align-items-center director-profile-tab-btn h-100 gap-3">
            <button
              className={`rounded p-2 w-25 ${
                activeTab === "websitesLimit" && "saffron-btn"
              }`}
              onClick={() => handleTabClick("websitesLimit")}
            >
              Websites/Limit
            </button>
            <button
              className={`rounded p-2 text-center w-25 ${
                activeTab === "paymentGateway" && "saffron-btn"
              }`}
              onClick={() => handleTabClick("paymentGateway")}
            >
              Payment Gateway
            </button>
            <button
              className={`rounded p-2 text-center w-25 ${
                activeTab === "transaction" && "saffron-btn"
              }`}
              onClick={() => handleTabClick("transaction")}
            >
              Transaction
            </button>
            <button
              className={`rounded p-2 text-center w-25 ${
                activeTab === "betHistory" && "saffron-btn"
              }`}
              onClick={() => handleTabClick("betHistory")}
            >
              Bet History
            </button>
          </div>
        </div>

        {/* Right Section Cards */}
        <div className="col-4">
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
        {/* {activeTab === "betHistory" && <CustomModal />} */}
      </div>
    </div>
  );
};

export default UserProfileDashboard;
