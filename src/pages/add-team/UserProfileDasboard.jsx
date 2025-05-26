import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { MdLockReset } from "react-icons/md";
import { FaUserTie, FaMapMarkerAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";
import { Images } from "../../images";
import PaymentGateway from "./components/PaymentGateway";
import BetHistory from "./components/BetHistory";
import ResetPasswordPopup from "../../pages/popups/ResetPasswordPopup";
import EditProfilePopup from "./popups/EditProfilePopup";
import SuccessPopup from "../popups/SuccessPopup";
import "bootstrap/dist/css/bootstrap.min.css";
import "../add-team/style.css";
import "../../App.css";
import "../../index.css";
import { useNavigate, useParams } from "react-router-dom";
import { imgUrl } from "../../api/baseUrl";
import {
  dirProfileBlockUnblock,
  getDirectorDetailsById,
  resetDirectorPassword,
  resetDirectorPasswordInProfile,
  updateDirectorProfileDetails,
} from "../../api/apiMethods";
import ErrorPopup from "../popups/ErrorPopup";
import { useDispatch, useSelector } from "react-redux";
import { setDirProfileData } from "../../redux/action";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import { IoArrowBack } from "react-icons/io5";
import MultimarketDashboard from "./components/MultimarketDashboard";
const login_role_name = localStorage.getItem("role_name");

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
  // {
  //   title: "Buying Chips",
  //   backgroundColor: "#7DA0FA",
  //   value: "500000000",
  //   valueClass: "text-dark",
  //   icon: (
  //     <img
  //       src={Images.adminProfileBuyingChips}
  //       alt="ShareRevenue"
  //       className="chat-img"
  //     />
  //   ),
  //   bootstrapClassesTop: "downline-list-card-top",
  //   bootstrapClassesBottom: "mb-0 fw-bold downline-list-card-bottom",
  // },
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
  // {
  //   title: "Sale Chips",
  //   backgroundColor: "#7DA0FA",
  //   value: "500000000",
  //   valueClass: "text-dark",
  //   icon: (
  //     <img
  //       src={Images.adminProfileTotalPaid}
  //       alt="ShareRevenue"
  //       className="chat-img"
  //     />
  //   ),
  //   bootstrapClassesTop: "downline-list-card-top",
  //   bootstrapClassesBottom: "mb-0 fw-bold downline-list-card-bottom",
  // },
  // {
  //   title: "Downline Available Chips",
  //   backgroundColor: "#7DA0FA",
  //   value: "500000000",
  //   valueClass: "text-dark",
  //   icon: (
  //     <img
  //       src={Images.adminProfileAvailableChips}
  //       alt="ShareRevenue"
  //       className="chat-img"
  //     />
  //   ),
  //   bootstrapClassesTop: "downline-list-card-top",
  //   bootstrapClassesBottom: "mb-0 fw-bold downline-list-card-bottom",
  // },
  // {
  //   title: "Balance Chips",
  //   backgroundColor: "#7DA0FA",
  //   value: "500000000",
  //   valueClass: "text-dark",
  //   icon: (
  //     <img
  //       src={Images.adminProfileBalanceChips}
  //       alt="ShareRevenue"
  //       className="chat-img"
  //     />
  //   ),
  //   bootstrapClassesTop: "downline-list-card-top",
  //   bootstrapClassesBottom: "mb-0 fw-bold downline-list-card-bottom",
  // },
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
      <p
        className={`medium-font fw-600 ${bootstrapClassesBottom} ${valueClass}`}
      >
        {value}
      </p>
    </div>
  );
};

const DefaultBottomShow = ({ userData, id, getById }) => {
  const [status, setStatus] = useState(1); // Default active (1)
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
 

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleToggle = (e) => {
    setStatus(e.target.checked ? 1 : 2);
    setConfirmationPopupOpen(true);
  };

  const blockUnblock = () => {
    dirProfileBlockUnblock(id)
      .then((response) => {
        if (response?.status === true) {
          setMsg(response?.message);
          setShowSuccessPopup(true);
          setTimeout(() => {
            setShowSuccessPopup(false);
          }, 2000);
        }
        getById();
      })
      .catch((error) => {
        setError(error?.message);
        setErrorPopupOpen(true);
        setTimeout(() => {
          setErrorPopupOpen(false);
        }, 2000);
      });
  };


  return (
    <div>
      <div className="py-4 bg-white shadow rounded">
        <div className="px-4 d-flex justify-content-between align-items-center mb-3">
          <h6 className="small-font">
            Texchange I{" "}
            <span className="yellow-font">
              texch.com - Share 10% - Rental 0.00
            </span>
          </h6>
          <div className="d-flex align-items-center">
            <span className="me-3 black-text small-font black-font">
              Active
            </span>

            <Form>
              <Form.Check
                type="switch"
                id="custom-switch"
                className="director-admin-profile-toggle-btn"
                checked={userData?.status === 1}
                onChange={handleToggle}
              />
            </Form>

            <span className="ms-2 black-text small-font black-font">
              In-active
            </span>
          </div>
        </div>

        <hr className="dashed-line mb-4" style={{ color: "black" }} />

        {/* Main Content Container */}

        <div className="px-4">
          {/* <div className="col"> */}
            <div className="row d-flex gap-3">
              <h6 className="small-font">Sports/Casino</h6>
              {bottomCardsData.map((card, index) => (
                <div
                  className="col-6 card border border-grey p-0 direct-admin-profile-bottom-card"
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
            {/* </div> */}
          </div>

          {/* Right Side Container */}
          {/* <div className="col-4 align-self-end">
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
          </div> */}

        </div>

        
      </div>
      <ConfirmationPopup
        confirmationPopupOpen={confirmationPopupOpen}
        setConfirmationPopupOpen={setConfirmationPopupOpen}
        discription={`Are you sure want to ${
          userData?.status === 1 ? "In-Acctive" : "Active"
        }`}
        submitButton={`${userData?.status === 1 ? "In-Active" : "Active"}`}
        onSubmit={blockUnblock}
      />

      <SuccessPopup
        successPopupOpen={showSuccessPopup}
        setSuccessPopupOpen={() => setShowSuccessPopup(false)}
        discription={msg}
      />
      <ErrorPopup
        errorPopupOpen={errorPopupOpen}
        setErrorPopupOpen={setErrorPopupOpen}
        discription={error}
      />
    </div>
  );
};

const UserProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState("websitesLimit");
  const [showResetPasswordPopup, setShowResetPasswordPopup] = useState(false);
  const [showEditProfilePopup, setShowEditProfilePopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [directorData, setDirectorData] = useState([]);
  const [error, setError] = useState("");
  const [editData, setEditData] = useState([]);
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [resetPasswordPopup, setResetPasswordPopup] = useState(false);
  const [description, setDesciption] = useState("");
  const [editedDtat, setEditedDtat] = useState([]);
  const [passwordLoader,setPasswordLoader]=useState(false)
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    setShowEditProfilePopup(true);
    getDirectorDetailsById(id);
  };
  const resetDirectorPswd = (data) => {
    if (!id) {
      setDesciption("Invalid Id");
      setErrorPopupOpen(true);
      return;
    }

    const payload = {
      password: data.password,
      confirm_password: data.confirmPassword,
      parent_password: data.managementPassword,
    };

    setPasswordLoader(true)

    resetDirectorPassword(id, payload)
      .then((response) => {
        if (response.status === true) {
          setPasswordLoader(false)
          setEditedDtat(response.data);
          setDesciption(response.message);
          handleResetPasswordClose();
          setShowSuccessPopup(true);
          setTimeout(() => {
            setShowSuccessPopup(false);
          }, 3000);
        } else {
          setDesciption("Something went Wrong");
        }
      })
      .catch((error) => {
        setError(error?.message);
        setPasswordLoader(false)
      });
  };

  const getById = () => {
    getDirectorDetailsById(id)
      .then((response) => {
        if (response) {
          setDirectorData(response.data);
          dispatch(setDirProfileData(response?.data));
        } else {
          setError("No employee data found");
        }
      })
      .catch((error) => {
        console.error("API Call Error:", error);
        setError(error?.message || "Login failed");
        setDesciption(error.message);
        setErrorPopupOpen(true);
        setShowResetPasswordPopup(false);
      });
  };

  useEffect(() => {
    if (id) {
      getById(id);
    }
  }, [id]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleResetPasswordClose = () => {
    setShowResetPasswordPopup(false);
  };
  const allCountries = useSelector((item) => item.allCountries);

  const getCountryName = (id) => {
    const country = allCountries.find((c) => c.id === id);
    return country ? country.name : "Unknown";
  };

  return (
    <div>
      <div className="gap-3 director-admin-profile-top-con rounded">
        <div className="d-flex w-100 justify-content-end mb-3 gap-4 px-3">
          <div
            className="director-admin-profile-top-bg-dark d-flex align-items-center pointer gap-2 px-3 text-white rounded-pill"
            onClick={() => navigate(-1)}
          >
            <span className="fw-600 small-font">
              <IoArrowBack className="yellow-font" size={20} />
            </span>
            <span className="fw-600 small-font">Back</span>
          </div>

          <div className="director-admin-profile-top-bg-dark d-flex align-items-center gap-4 px-3 text-white rounded-pill">
            <span className="fw-600 small-font">User Name</span>
            <span className="fw-600 small-font">{directorData.login_name}</span>
          </div>

          <div className="director-admin-profile-top-bg-dark d-flex align-items-center gap-1 text-white rounded-pill px-3">
            <div className="d-flex align-items-center gap-4 px-2">
              <span className="fw-600 small-font">Reset Password</span>
              {/* <span className="fw-600 small-font">
                {" "}
                {showPassword ? "1234567823" : "********"}
              </span> */}
            </div>

            <div className="d-flex align-items-center gap-1 my-1">
              {/* <div
                className="director-top-bg-icon px-2 py-1 pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <MdOutlineVisibilityOff className="text-warning large-font" />
                ) : (
                  <MdRemoveRedEye className="text-warning large-font" />
                )}
              </div> */}
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
              <div className="profile-default super-admin-profile-img-con br-5">
                <img
                  src={`${imgUrl}/directorProfilePhotos/${directorData?.photo}`}
                  loading="lazy"
                  alt="Profile Photo Loading"
                  className="br-5"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>

              <div
                className="d-flex gap-2 super-admin-img-down-content align-items-end"
                style={{ marginTop: "20px" }}
              >
                <FaPen
                  className="yellow-font pointer medium-font mt-1"
                  onClick={() => handleEdit(id)}
                />
                <h6 className="small-font mb-0">{directorData?.name}</h6>
              </div>
            </div>
            <div className="col-1"></div>
            <div className="col-9">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <div className="d-flex gap-4 align-items-center">
                  <div className="d-flex gap-2 align-items-end">
                    <FaUserTie className="large-font" />
                    <span className="small-font">{`${
                      directorData?.type === 2 ? "Super Admin" : "Director"
                    }`}</span>
                  </div>
                  <div className="d-flex gap-2 align-items-end">
                    <FaMapMarkerAlt className="large-font" />
                    <span className="small-font">
                      {getCountryName(directorData?.county)}
                    </span>
                  </div>
                </div>
                <span
                  className={`${
                    directorData?.status === 1
                      ? "director-admin-profile-active-btn"
                      : "red-btn"
                  } rounded-pill py-2 px-4 small-font m-1`}
                >
                  {`${directorData?.status === 1 ? "Active" : "In-Active"}`}
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
        onSubmit={resetDirectorPswd}
        passwordLoader={passwordLoader}
        resetPasswordErrrors={error}
      />
      <EditProfilePopup
        show={showEditProfilePopup}
        data={directorData}
        // reload = {getDirectorDetailsById}
        onHide={setShowEditProfilePopup}
        getById={getById}
      />
      <SuccessPopup
        successPopupOpen={showSuccessPopup}
        // onHide={() => setShowSuccessPopup(false)}
        setSuccessPopupOpen={() => setShowSuccessPopup(false)}
        discription={description}
      />
      <ErrorPopup
        errorPopupOpen={errorPopupOpen}
        setErrorPopupOpen={setErrorPopupOpen}
        discription={description}
      />

      {/* Tabs Section */}
      <div className="row py-3 px-3">
        <div className="col-7 p-0">
          <div className="d-flex justify-content-between align-items-center director-profile-tab-btn h-100 gap-3">
            <button
              className={`small-font rounded p-2 w-25 ${
                activeTab === "websitesLimit" && "saffron-btn"
              }`}
              onClick={() => handleTabClick("websitesLimit")}
            >
              Websites/Limit
            </button>
            <button
              className={`small-font rounded p-2 text-center w-25 ${
                activeTab === "paymentGateway" && "saffron-btn"
              }`}
              onClick={() => handleTabClick("paymentGateway")}
            >
              Payment Gateway
            </button>
            {/* <button
              className={`small-font rounded p-2 text-center w-25 ${
                activeTab === "transaction" && "saffron-btn"
              }`}
              onClick={() => handleTabClick("transaction")}
            >
              Transaction
            </button> */}
            <button
              className={`small-font rounded p-2 text-center w-25 ${
                activeTab === "betHistory" && "saffron-btn"
              }`}
              onClick={() => handleTabClick("betHistory")}
            >
              Bet History
            </button>
            <button
              className={`small-font rounded p-2 text-center w-25 ${
                activeTab === "multimarket" && "saffron-btn"
              }`}
              onClick={() => handleTabClick("multimarket")}
            >
              MultiMarket
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
        {activeTab === "websitesLimit" && (
          <DefaultBottomShow
            id={id}
            userData={directorData}
            getById={getById}
          />
        )}
        {activeTab === "paymentGateway" && <PaymentGateway dwnlnId={id} />}
        {/* {activeTab === "transaction" && <Transaction />} */}
        {activeTab === "betHistory" && <BetHistory />}
        {activeTab === "multimarket" && <MultimarketDashboard dwnlnId={id} />}
      </div>
    </div>
  );
};

export default UserProfileDashboard;
