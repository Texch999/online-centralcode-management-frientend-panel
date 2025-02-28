import React, { useEffect, useReducer, useRef, useState } from "react";
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
import {
  dwnlineUserWebsites,
  getDwnlineWebsiteList,
} from "../../api/apiMethods";
import { CgUnblock } from "react-icons/cg";
import { CircleLoader } from "react-spinners";
import ErrorPopup from "../popups/ErrorPopup";

const DownlineWebsiteList = () => {
  const [onBlockPopup, setOnBlockPopup] = useState(false);
  const role = localStorage.getItem("role");
  const [showCreditAmountPopup, setShowCreditAmountPopup] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [userWebsitesData, setUserWebsitesData] = useState([]);
  console.log(userWebsitesData, "userr");
  const dataFetched = useRef(false);
  const { user, userId, adminWebsite, adminWebsiteId } = useParams();
  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [selectedWebsite, setSelectedWebsite] = useState("");
  const [errorPopup, setErrorPopup] = useState(false);
  const [wName, setWName] = useState("");
  const [statusId, setStatusId] = useState(null);
  const[userWebsiteId,setUserWebsiteId]=useState(null)

  const handleNavigateUserDashboard = (userwebisite) => {
    navigate(`/downline-list/${userwebisite}`);
  };
  const ACCOUNT_COLUMNS = [
    { header: "User Websites", field: "websitelist" },
    { header: "Total Cus D", field: "totalCusD" },
    { header: "Total Cus W", field: "totalCusW" },
    { header: "Wall. Bal", field: "walletBalance" },
    { header: <div className="text-center">Action</div>, field: "action" },
  ];

  const filterData = userWebsitesData?.filter(
    (item) =>
      (searchName === "" ||
        item?.websiteName?.toLowerCase().includes(searchName.toLowerCase())) &&
      (selectedWebsite === "" || item?.websiteName === selectedWebsite)
  );

  const fetchDownlineUserWebsitesList = () => {
    setLoading(true);
    getDwnlineWebsiteList(userId, adminWebsiteId)
      .then((response) => {
        if (response?.status === true) {
          setUserWebsitesData(response?.data);
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
    if (dataFetched.current) return;
    dataFetched.current = true;
    fetchDownlineUserWebsitesList();
  }, []);

  const handleBlock = (id, wname, status) => {
    setOnBlockPopup(true);
    setUserWebsiteId(id);
    setWName(wname);
    setStatusId(status);
  };

  const suspend = () => {
    dwnlineUserWebsites()
      .then((response) => {
        if (response.status === true) {
          console.log(response?.data);
        } else {
          setError("something went wrong");
        }
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  const data = filterData?.map((item) => ({
    websitelist: (
      <>
        <div className="pointer">{item?.websiteName}</div>
      </>
    ),
    totalCusD: item?.toatalCustomerDiposite,
    totalCusW: item?.totalCustomerWithdrawl,
    walletBalance: <span className="yellow-font">{item?.wall_bal}</span>,
    action: (
      <div className="d-flex flex-column justify-content-center align-items-center">
        {item?.status === 1 ? (
          <button className="payment-gateway-status-badge mb-1 p-2 badge rounded">
            Active
          </button>
        ) : (
          <button className="red-btn mb-1 p-2 badge rounded">In-Active</button>
        )}
        <div className="d-flex">
          <span>
            {item?.status === 1 ? (
              <CgUnblock
                size={20}
                className="icon-action me-2 pointer green-clr"
                onClick={() =>
                  handleBlock(item?.id, item?.websiteName, item?.status)
                }
              />
            ) : (
              <MdBlockFlipped
                size={20}
                className="icon-action me-2 pointer red-clr"
                onClick={() => handleBlock(item?.id)}
              />
            )}
          </span>
          <MdSwapVert
            size={20}
            className="icon-action pointer"
            onClick={() => handleNavigateUserDashboard(item?.websiteName)}
          />
        </div>
      </div>
    ),
  }));

  const totalDeposit = userWebsitesData?.reduce(
    (sum, item) => sum + Number(item?.toatalCustomerDiposite || 0),
    0
  );

  const totalWithdraw = userWebsitesData?.reduce(
    (sum, item) => sum + Number(item?.totalCustomerWithdrawl || 0),
    0
  );
  const totalBal = userWebsitesData?.reduce(
    (sum, item) => sum + Number(item?.wall_bal || 0),
    0
  );

  const ACCOUNT_FOOTER = [
    { header: <span className="fw-700">Total</span> },
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
        <div>
          <div className="row d-flex justify-content-between align-items-center mb-3">
            <div className="col-md-3">
              <div
                className="yellow-font medium-font mb-0 white-space pointer align-items-center"
                onClick={() => navigate(-1)}
              >
                <span>
                  <FaChevronLeft className="mx-1 pointer" />
                </span>

                <span>
                  {user}-{adminWebsite}-downline website list
                </span>
              </div>
            </div>

            <div className="col-md-9 d-flex flex-end align-items-center gap-3">
              <select
                className="input-pill rounded-pill px-4 small-font"
                value={selectedWebsite}
                onChange={(e) => setSelectedWebsite(e.target.value)}
              >
                <option value="">All</option>
                {userWebsitesData?.map((item, index) => (
                  <option key={index} value={item?.websiteName}>
                    {item?.websiteName}
                  </option>
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
            } this ${wName}`}
            submitButton={statusId === 1 ? "Block" : "Un-Block"}
            onSubmit={suspend}
          />

          <ErrorPopup
            discription={error}
            errorPopupOpen={errorPopup}
            setErrorPopupOpen={setErrorPopup}
          />
        </div>
      )}
    </div>
  );
};

export default DownlineWebsiteList;
