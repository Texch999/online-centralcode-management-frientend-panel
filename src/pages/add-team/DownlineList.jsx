import React, { useEffect, useRef, useState } from "react";
import { MdBlockFlipped } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { Images } from "../../images/index";
import Table from "../../components/Table";
import "../../App.css";
import "./style.css";
import CreditReferencePopup from "./popups/CreditReferencePopup";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import { GiClick } from "react-icons/gi";
import {
  dwnlineDSASuspend,
  managemnetViewDownlinelist,
} from "../../api/apiMethods";
import { useSelector } from "react-redux";
import { CircleLoader } from "react-spinners";
import e from "cors";
import { CgUnblock } from "react-icons/cg";

const DownlineList = () => {
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

  const ACCOUNT_COLUMNS = [
    { header: "Account", field: "account" },
    { header: "Website List", field: "websitelist" },
    { header: "Total Cus D", field: "totalCusD" },
    { header: "Total Cus W", field: "totalCusW" },
    { header: "Wall. Bal", field: "walletBalance" },
    // { header: "Exposure", field: "exposure" },
    // { header: "Wall Pay. Bal", field: "walletPlayingBalance" },
    // { header: "Ref P/L", field: "referralPL" },
    { header: <div className="text-center">Action</div>, field: "action" },
  ];
  const data = filterData?.map((item) => ({
    account: (
      <div>
        <div>
          {item?.roleName} - {item?.name}
        </div>
        <div>{getCountry(item?.currency_id)}</div>
      </div>
    ),

    websitelist: (
      <div className="d-flex flex-column">
        {item?.adminSName?.map((wbsite, index) => (
          <div className="d-flex flex-column my-1">
            <div
              key={index}
              className="d-flex align-items-center gap-2 pointer"
              onClick={() =>
                handleNaviagte(item?.name, item?.id, wbsite?.name, wbsite?.id)
              }
            >
              <span>{wbsite?.name}</span>
              <GiClick className="yellow-font mx-1" size={18} />
            </div>
          </div>
        ))}
      </div>
    ),

    totalCusD: <div>{item?.toatalCustomerDiposite}</div>,
    totalCusW: <div>{item?.totalCustomerWithdrawl}</div>,
    walletBalance: <span className="yellow-font">{item?.wall_bal}</span>,
    action: (
      <div className="d-flex flex-column justify-content-center gap-2 align-items-center">
        {item?.status === 1 ? (
          <button className="payment-gateway-status-badge mb-1 p-2 badge rounded">
            Active
          </button>
        ) : (
          <button className="red-btn mb-1 p-2 badge rounded">In-Active</button>
        )}

        <div className="d-flex">
          <BsPerson
            size={20}
            className="icon-action me-2 pointer"
            onClick={() => handleNavigateUserDashboard(item?.id)}
          />
          <span>
            {item?.status === 1 ? (
              <CgUnblock
                size={20}
                className="icon-action me-2 pointer green-clr"
                onClick={() => handleBlock(item?.id, item?.name, item?.status)}
              />
            ) : (
              <MdBlockFlipped
                size={20}
                className="icon-action me-2 pointer red-clr"
                onClick={() => handleBlock(item?.id)}
              />
            )}
          </span>
        </div>
      </div>
    ),
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
              discription={`are you sure you want to ${
                statusId === 1 ? "Block" : "Un-Block"
              } this ${userName}`}
              submitButton={statusId === 1 ? "Block" : "Un-Block"}
              onSubmit={suspend}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DownlineList;
