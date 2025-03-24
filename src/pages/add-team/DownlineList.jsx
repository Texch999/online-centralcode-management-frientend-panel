import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Images } from "../../images/index";
import Table from "../../components/Table";
import "../../App.css";
import "./style.css";
import CreditReferencePopup from "./popups/CreditReferencePopup";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import {
  dwnlineDSASuspend,
  managemnetViewDownlinelist,
} from "../../api/apiMethods";
import { useSelector } from "react-redux";
import { CircleLoader } from "react-spinners";
import ErrorPopup from "../popups/ErrorPopup";
import { BsEye } from "react-icons/bs";
import { MdLockReset, MdBlockFlipped, MdOutlinePersonOutline } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { SlPencil } from "react-icons/sl";
import { IoPersonCircle } from "react-icons/io5";


const DownlineList = () => {
  const location = useLocation()
  const selctedDownlineUserId = location.state?.userId
  const [onBlockPopup, setOnBlockPopup] = useState(false);
  const role = localStorage.getItem("role");
  const [showCreditAmountPopup, setShowCreditAmountPopup] = useState(false);
  const [error, setError] = useState([]);
  const [downlineList, setDownlineList] = useState([]);
  const dataFetched = useRef(false);
  const allCountries = useSelector((item) => item?.allCountries);
  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState("");
  const navigate = useNavigate();
  const role_code = localStorage.getItem("role_name");
  const [selectedRole, setSelectedRole] = useState("");
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [statusId, setStatusId] = useState(null);
  const [errorPopup, setErrorPopup] = useState(false);
  const [selectedDirectorId, setSelectedDirectorId] = useState(null);
  const [selectedSuperAdminId, setSelectedSuperAdminId] = useState(null);
  const [resetPasswordPopup, setResetPasswordPopup] = useState(false);
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value ? Number(e.target.value) : "");
  };

  const getCountry = (id) => {
    const country = allCountries.find((c) => c?.id === id);
    return country ? country?.name : "unknown";
  };

  const handleNavigateUserDashboard = (id) => {
    navigate(`/user-profile-dashboard/${id}`);
  };

  const handleNaviagte = (user, userid, adminwebsite, adminwebsiteId) => {
    navigate(
      `/downline-list/${user}/${userid}/${adminwebsite}/${adminwebsiteId}`
    );
  };

  const handleResetPasswordOpen = (id) => {
    setSelectedDirectorId(id);
    setSelectedSuperAdminId(id);
    setResetPasswordPopup(true);
  };

  const totalDeposit = downlineList?.reduce(
    (sum, item) => sum + Number(item?.toatalCustomerDiposite || 0),
    0
  );

  const totalWithdraw = downlineList?.reduce(
    (sum, item) => sum + Number(item?.totalCustomerWithdrawl || 0),
    0
  );
  const totalBal = downlineList?.reduce(
    (sum, item) => sum + Number(item?.wall_bal || 0),
    0
  );
  const options = [
    { value: 1, name: "Director" },
    { value: 2, name: "Super Admin" },
  ];

  const handleBlock = (id, name, status) => {
    setOnBlockPopup(true);
    setUserId(id);
    setUserName(name);
    setStatusId(status);
  };

  const cardData = [
    {
      title:
        role === "Super Admin" ? "Received Rental Amount" : "Share Revenue",
      backgroundColor: "#7DA0FA",
      value: "500000000",
      icon: (
        <img
          src={Images.adminProfileShareRevenue}
          alt="ShareRevenue"
          className="chat-img"
        />
      ),
      bootstrapClassesTop: "downline-list-card-top",
      bootstrapClassesBottom: "mb-0 fw-bold downline-list-card-bottom",
    },
    {
      title: role === "Super Admin" ? "Share/Royalty Amount" : "Rental Revenue",
      backgroundColor: "#7DA0FA",
      value: "500000000",
      icon: (
        <img
          src={Images.adminProfileShareRevenue}
          alt="ShareRevenue"
          className="chat-img"
        />
      ),
      bootstrapClassesTop: "downline-list-card-top",
      bootstrapClassesBottom: "mb-0 fw-bold downline-list-card-bottom",
    },
    {
      title: role === "Super Admin" ? "Total Withdraw" : "Total Paid",
      backgroundColor: "#7DA0FA",
      value: "0.00",
      icon: (
        <img
          src={Images.adminProfileShareRevenue}
          alt="ShareRevenue"
          className="chat-img"
        />
      ),
      bootstrapClassesTop: "downline-list-card-top",
      bootstrapClassesBottom: "mb-0 fw-bold downline-list-card-bottom",
    },
    {
      title: role === "Super Admin" ? "Net P/L" : "Another Revenue",
      backgroundColor: "#7DA0FA",
      value: "300000000",
      icon: (
        <img
          src={Images.adminProfileShareRevenue}
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
        <p className={`medium-font fw-600 ${bootstrapClassesBottom}`}>
          {value}
        </p>
      </div>
    );
  };

  const fetchAllViewDownlineList = () => {
    setLoading(true);
    managemnetViewDownlinelist()
      .then((response) => {
        if (response?.status === true) {
          console.log(response?.list);
          setDownlineList(response?.list);
        } else {
          setError("something went wrong");
        }
      })
      .catch((error) => {
        setError(error?.message);
        setErrorPopup(true);
        setTimeout(() => {
          setErrorPopup(false);
        }, 2000);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (role_code === "management") {
      if (dataFetched.current) return;
      dataFetched.current = true;
      fetchAllViewDownlineList();
    }
  });

  const suspend = () => {
    dwnlineDSASuspend(userId)
      .then((response) => {
        if (response?.status === true) {
          console.log(response?.data);
          fetchAllViewDownlineList();
        } else {
          setError("something went wrong");
        }
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  const filterData = downlineList?.filter(
    (item) =>
      (selectedRole === "" || item?.roleId === Number(selectedRole)) &&
      (searchName === "" ||
        item?.name?.toLowerCase().includes(searchName.toLowerCase()))
  );
  const getLocationName = (locationId) => {
    const country = allCountries.find((country) => country.id === locationId);
    return country?.name.charAt(0).toUpperCase() + country?.name.slice(1);
  };
  const ACCOUNT_COLUMNS = [
    { header: "Name", field: "role" },
    { header: "Credit Ref.", field: "creditref" },
    { header: "Credit", field: "credit" },
    { header: "Deposit", field: "deposit" },
    { header: "Withdraw", field: "withdraw" },
    { header: "Available Bal.", field: "availableBal" },
    { header: "P/L", field: "pl" },
    { header: "Exposure", field: "exposure" },
    { header: "AD Lock", field: "ADLock" },
    { header: "Bet Lock", field: "BetLock" },
    {
      header: <div className="text-center">Action</div>,
      field: "action",
      width: "8%",
    },
  ];
  const data = filterData?.map((user) => ({
    role: <div className="d-flex flex-row">
      <div className="me-1" > <span className="role-bg p-1">{user.type === 1 ? "Dir" : "SA"}</span> </div>
      <div className="me-2 pointer" onClick={() => handleNavigateUserDashboard(user?.id)}> <span className="role-bg p-1"><IoPersonCircle size={16} /></span> </div>
      <div className="d-lex flex-column">
        <div className="text-capitalize">{user.name}</div>
        <div>{getLocationName(user.county)}</div>
      </div>
    </div>,
    creditref: <div>{user.creditAllowed == 1 ? user.maxCreditLimit : "--"}</div>,
    credit: <div className="red-font">{user.creditAllowed == 1 ? user.creditBalance : "--"}</div>,
    deposit: <div className="green-block"> {user.totalDeposits > 0 ? user.totalDeposits : 0}</div>,
    withdraw: <div className="red-font">{user.totalWithdraws > 0 ? user.totalWithdraws : 0}</div>,
    availableBal: <div className="green-block">0</div>,
    pl: <div className="red-font">{user.pl ? user.pl : 0}</div>,
    exposure: <div className="red-font">{user.expo ? user.expo : 0}</div>,
    ADLock: <div className="red-font"><input type="checkbox" style={{ border: "1px solid rgba(0, 0, 0, 0.2)" }} /></div>,
    BetLock: <div className="red-font"><input type="checkbox" style={{ border: "1px solid rgba(0, 0, 0, 0.2)" }} /></div>,
    action: (
      <div className="d-flex flex-center gap-3">
        <SlPencil
          size={20}
          className={`black-text pointer ${user.status === 2 ? "disabled" : ""
            }`}
          onClick={() =>
            user.status !== 2 &&
            navigate(`/director-admin/editDirector`, {
              state: { userId: user.id, mode: "edit" },
            })
          }
        />

        <MdLockReset
          size={20}
          className={`black-text pointer ${user.status === 2 ? "disabled" : ""
            }`}
          onClick={() =>
            user.status !== 2 && handleResetPasswordOpen(user.id)
          }
        />

        <GrTransaction
          size={20}
          className={`black-text pointer ${user.status === 2 ? "disabled" : ""
            }`}
          style={{ transform: "rotate(90deg)", transition: "transform 0.3s ease" }}
          onClick={() => navigate("/downline-transaction-history", {
            state: { userId: user.id },
          })}
        />

        <BsEye
          size={20}
          className={`black-text pointer ${user.status === 2 ? "disabled" : ""}`}
          onClick={() => navigate("/dir-sa-websites-details", { state: { userId: user?.id, name: user.name, roleId: user.type } })}
        />

        <MdOutlinePersonOutline
          size={20}
          className={`black-text pointer ${user.status === 2 ? "disabled" : ""
            }`}
          onClick={() => navigate("/downline-list", { state: { userId: user?.id, } })}
        />

      </div>)
  }));

  const ACCOUNT_FOOTER = [
    { header: <span className="fw-700">Total</span> },
    { header: "" },
    { header: <span className="fw-700">{totalDeposit}</span> },
    { header: <span className="fw-700">{totalWithdraw}</span> },
    { header: <span className="fw-700 yellow-font">{totalBal}</span> },
    { header: "" },
  ];

  return (
    <div>
      {loading ? (
        <>
          <div className="d-flex flex-column flex-center mt-10rem align-items-center">
            <CircleLoader color="#3498db" size={40} />
            <div className="medium-font black-font my-3">
              Just a moment...............⏳
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <div className="row d-flex justify-content-between align-items-center mb-3">
              <div className="col-md-3">
                <h6 className="yellow-font medium-font mb-0">Downline List</h6>
              </div>

              <div className="col-md-9 d-flex flex-end align-items-center gap-3">
                <select
                  className="input-pill rounded-pill px-4 small-font"
                  value={selectedRole}
                  onChange={handleRoleChange}
                >
                  <option value="">All</option>
                  {options?.map((item) => (
                    <option value={item?.value}>{item?.name}</option>
                  ))}
                </select>

                <div className="input-pill d-flex align-items-center rounded-pill px-3">
                  <FaSearch size={18} className="grey-clr me-2" />
                  <input
                    className="small-font all-none w-100"
                    placeholder="Search..."
                    type="text"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />
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
                data={data}
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
              discription={`Are you sure you want to Block this ${userName}`}
              submitButton={"Block"}
              onSubmit={suspend}
            />
            <ErrorPopup
              discription={error}
              errorPopupOpen={errorPopup}
              setErrorPopupOpen={setErrorPopup}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DownlineList;
