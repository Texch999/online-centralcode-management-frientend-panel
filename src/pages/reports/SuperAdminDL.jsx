import React, { useState } from "react";
import ScrollTable from "../../components/ScrollTable";
import { useNavigate, useParams } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import DepositWithdrawPopup from "../wallet/DepositWithdrawPopup";
import { BsEye } from "react-icons/bs";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";

function SuperAdminDL() {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState(false);
  const [depositWithdrawPopupOpen, setDepositWithdrawPopupOpen] =
    useState(false);
  const { superadmin } = useParams();
  const [activeBtn, setActiveBtn] = useState("Admins");
  const ACTIVE_BTNS = ["Admins", "Users"];
  const handleOpenUserDetails = () => {
    setActiveRole(true);
    setDepositWithdrawPopupOpen(true);
  };

  const handleMatchClick = (matchName) => {
    navigate(`/superadmin/${matchName}`);
  };

  const handleSportClick = (item) => {
    setActiveBtn(activeBtn === item ? null : item);
  };

  const superAdminOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  const ADMIN_COLUMNS = [
    { header: "Admin Details", field: "adminDetails" },
    { header: "Type", field: "type" },
    { header: "Sp Rental", field: "spRental" },
    { header: "Casino Share/Royalty", field: "casinoShareRoyalty" },
    { header: "Sp & Ca Share/Royalty", field: "spCaShareRoyalty" },
    { header: "Withdraw", field: "withdraw" },
    { header: "Total P/L", field: "totalPL" },
    { header: "Upper Payments", field: "upperPayments" },
    { header: "Net P/L", field: "netPL" },
    { header: "Downline", field: "downline" },
  ];

  const ADMIN_DATA = Array(6).fill({
    adminDetails: "Jayanta Director",
    type: "Share/Royalty",
    spRental: <div>10000</div>,
    casinoShareRoyalty: <div>10000</div>,
    spCaShareRoyalty: <div>500000</div>,
    withdraw: <div className="red-font">500000</div>,
    totalPL: <div className="green-font">500000</div>,
    upperPayments: <div className="red-font">500000</div>,
    netPL: <div className="green-font">500000</div>,
    downline: (
      <div className="w-60 flex-center">
        <BsEye size={18} onClick={handleOpenUserDetails} className="pointer" />
      </div>
    ),
  });

  const ADMIN_FOOTER = [
    { header: "Total" },
    { header: "" },
    { header: "" },
    { header: "" },
    { header: "" },
    { header: <div className="red-font">7500000</div> },
    { header: <div className="green-font">7500000</div> },
    { header: <div className="red-font">7500000</div> },
    { header: <div className="green-font">7500000</div> },
    { header: "" },
  ];

  const USER_COLUMNS = [
    { header: "User Details", field: "userDetails", width: "20%" },
    { header: "Admin Details", field: "adminDetails", width: "20%" },
    { header: "Deposit", field: "deposit", width: "20%" },
    { header: "Withdraw", field: "withdraw", width: "10%" },
    { header: "Total P/L", field: "totalPL", width: "20%" },
    { header: "Downline", field: "downline", width: "10%" },
  ];

  const USER_DATA = Array(6).fill({
    userDetails: "Rabin User",
    adminDetails: "Rajesh Admin",
    deposit: <div className="green-font">100000</div>,
    withdraw: <div className="red-font">100000</div>,
    totalPL: <div className="green-font">5000000</div>,
    downline: (
      <div className="w-60 flex-center">
        <BsEye
          size={18}
          onClick={() => handleMatchClick("User - Rabin")}
          className="pointer"
        />
      </div>
    ),
  });

  const USER_FOOTER = [
    { header: "Total" },
    { header: "" },
    { header: <div className="green-font">7500000</div> },
    { header: <div className="red-font">7500000</div> },
    { header: <div className="green-font">7500000</div> },
    { header: "" },
  ];

  const summaryData = [
    { label: "Sp Rental", value: "1000000000", color: "green-font" },
    { label: "Withdraw", value: "1000000000", color: "red-font" },
    { label: "Casino Share/Royalty", value: "2000000000", color: "green-font" },
    { label: "Total P/L", value: "2000000000", color: "red-font" },
    { label: "Sp & Ca Share/Royalty", value: "2000000000", color: "red-font" },
    { label: "Upper Payments", value: "2000000000", color: "red-font" },
  ];

  const userData = [
    { label: "User Win", value: "500000000", color: "green-font" },
    { label: "User Loss", value: "10000000", color: "red-font" },
    { label: "User Total P/L", value: "2000000000", color: "green-font" },
  ];

  return (
    <div>
      <div className="flex-between mb-3 mt-4">
        <h6 className="d-flex  mb-0">
          <div>
            P/L Reports Downline Admins
            <span>
              <FiChevronRight />
              Owner - Jayanta (Director)
            </span>
            <span className="yellow-font">
              {" "}
              <FiChevronRight />
              {superadmin}
            </span>
          </div>
        </h6>
      </div>

      <div className="d-flex w-10 flex-between small-font">
        {ACTIVE_BTNS?.map((item, index) => (
          <div
            key={index}
            className={`me-3 ${
              activeBtn === item
                ? "saffron-btn2  px-4"
                : "white-btn2 pointer px-4"
            }`}
            onClick={() => handleSportClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="d-flex w-90  mt-4">
        {activeBtn === "Admins" && (
          <>
            <div className="w-100  flex-between flex-wrap mb-3 py-3 grey-bg2 rounded">
              {summaryData.map(({ label, value, color }) => (
                <div key={label} className="col-6 px-3 ">
                  <div className="white-btn2 flex-between">
                    <span className="small-font">{label}</span>
                    <span className={`medium-font ${color}`}>{value}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="netpl-btn mb-3 ms-3  col-2   pointer">
              <div className="white-btn2 d-flex small-font w-80 flex-between ">
                Net P/L <span className="green-font">1000000</span>
              </div>
            </div>
          </>
        )}

        {activeBtn === "Users" && (
          <>
            <div className="w-40   flex-wrap mb-3 py-3 grey-bg2 rounded">
              {userData.map(({ label, value, color }) => (
                <div key={label} className="col-112 px-3 ">
                  <div className="white-btn2 flex-between">
                    <span className="small-font">{label}</span>
                    <span className={`medium-font ${color}`}>{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="d-flex w-80 mb-3">
        <div className="col-2 flex-column me-3">
          <label className="black-text4 small-font mb-1">Select Admin</label>
          <Select
            className="small-font"
            options={superAdminOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
          />
        </div>
        <div className="d-flex align-items-end col-1">
          <button className="saffron-btn2 small-font pointer">Submit</button>
        </div>
      </div>

      {activeBtn === "Admins" && (
        <ScrollTable
          columns={ADMIN_COLUMNS}
          data={ADMIN_DATA}
          footer={ADMIN_FOOTER}
          itemsPerPage={1}
          greyBackground="footer-bg"
        />
      )}

      {activeBtn === "Users" && (
        <ScrollTable
          columns={USER_COLUMNS}
          data={USER_DATA}
          footer={USER_FOOTER}
          itemsPerPage={1}
          greyBackground="footer-bg"
        />
      )}
      <DepositWithdrawPopup
        depositWithdrawPopupOpen={depositWithdrawPopupOpen}
        setDepositWithdrawPopupOpen={setDepositWithdrawPopupOpen}
        userDetails="Srinivas - (Sp Rental: 100000) (Ca : 10%)"
        userDetails2="Exp Rental - 31-01-2025"
      />
    </div>
  );
}

export default SuperAdminDL;
