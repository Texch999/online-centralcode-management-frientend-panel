import React, { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import Table from "../../components/Table";
import { SlPencil } from "react-icons/sl";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";
import ConfirmationPopup from "../popups/ConfirmationPopup";


function UserReports() {
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);


  const handleConfirmDeletePopupOpen = () => {
    setShowConfirmPopup(true);
  };

  const websiteOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  const adminOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  const userOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  const DIRECTOR_COLUMNS = [
    { header: "Date & Time/IP Add.", field: "dateTimeIP" },
    { header: "User / Market Name", field: "userMarketName" },
    { header: "Game Name - M/Match ID ", field: "providerName" },
    { header: "Bet Placed", field: "betPlaced" },
    { header: "Selection ", field: "selection" },
    { header: "P/L", field: "pl" },
    { header: "Status", field: "status" },
  ];

  const DIRECTOR_DATA = Array(6).fill({
    dateTimeIP: (
      <div>
        09-10-2024 <br />
        16:11:00 <br />
        IP: 157.47.47.187
      </div>
    ),
    userMarketName: (
      <div>
        M.Name: T Exchange <br /> User: Srinivas <FiChevronRight size={10} />{" "}
        Ag: Jayanta <FiChevronRight size={10} /> <br /> Mas: Lokesh{" "}
        <FiChevronRight size={10} /> S M: Sangram <FiChevronRight size={10} />{" "}
        <br /> S A: Sudheer <FiChevronRight size={10} /> Adm: Nani{" "}
        <FiChevronRight size={10} /> <br /> Sup A: Harish{" "}
        <FiChevronRight size={10} /> Dir: Sri Lakshmi{" "}
      </div>
    ),
    providerName: (
      <div>
        Match: Chennai Super Kings <br /> vs Rajasthan Royals (T20 World Cup){" "}
        <br />
        Match ID: 11023843754858 <br />M ID: 1.11045677544
      </div>
    ),
    betPlaced: <div>Odds</div>,
    selection: (
      <div>
        Selection: Chennai Super Kings <br />
        Side: Back <br /> Odds Rate: 1.50 <br /> B. Amount: 100000 <br /> B. ID:
        11023843754858
      </div>
    ),
    pl: (
      <div>
        <span className="green-font">10000000</span> <br />
        Result: Rajasthan Royals Win
      </div>
    ),
    status: (
      <div className="d-flex gap-3">
        <SlPencil size={18} className="pointer" />
        <FaRegTrashCan
          size={18}
          className="pointer"
          onClick={handleConfirmDeletePopupOpen}
        />
        <span className="active-btn-table small-font ms-2">Settled</span>
      </div>
    ),
  });

  const DIRECTOR_FOOTER = [
    { header: "Total" },
    { header: "" },
    { header: "" },
    { header: "" },
    { header: "" },
    { header: "" },
    { header: <div className="green-font">7500000</div> },
    { header: "" },
  ];

  const summaryData = [
    { label: "Users Win", value: "1000000000", color: "red-font" },
    { label: "Users  Loss", value: "1000000000", color: "green-font" },
    { label: "Users Total P/L", value: "2000000000", color: "green-font" },
  ];

  return (
    <div>
      <div className="flex-between mb-3 mt-4">
        <h6 className="d-flex yellow-font mb-0">P/L Reports by Users</h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>

      <div className="d-flex w-40 mt-4">
        <div className="w-100   mb-3 py-3 grey-bg2 rounded">
          {summaryData.map(({ label, value, color }) => (
            <div key={label} className="col-12 px-3 mt-2">
              <div className="white-btn2 flex-between">
                <span className="small-font">{label}</span>
                <span className={`medium-font ${color}`}>{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex w-50 flex-between mt-2 mb-2">
        <div className="col-3 flex-column mx-2">
          <label className="black-text4 small-font mb-1">From</label>
          <input className="input-css2 small-font" type="date" />
        </div>
        <div className="col-3 flex-column mx-2">
          <label className="black-text4 small-font mb-1">To</label>
          <input className="input-css2 small-font" type="date" />
        </div>
        <div className="col-3 flex-column me-3">
          <label className="black-text4 small-font mb-1">Website</label>
          <Select
            className="small-font"
            options={websiteOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
          />
        </div>

        <div className="col-3 flex-column me-3">
          <label className="black-text4 small-font mb-1">Admin Name</label>
          <Select
            className="small-font"
            options={adminOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
          />
        </div>

        <div className="col-3 flex-column me-3">
          <label className="black-text4 small-font mb-1">User Name</label>
          <Select
            className="small-font"
            options={userOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
          />
        </div>

        <div className="align-self-end saffron-btn2 small-font pointer col-2">
          Submit
        </div>
      </div>

      <Table
        columns={DIRECTOR_COLUMNS}
        data={DIRECTOR_DATA}
        footer={DIRECTOR_FOOTER}
        greyBackground="footer-bg"
        itemsPerPage={5}
      />
      <ConfirmationPopup
        confirmationPopupOpen={showConfirmPopup}
        setConfirmationPopupOpen={setShowConfirmPopup}
        discription="Are you sure you want to block this Report?"
        submitButton="Block"
      />
    </div>
  );
}

export default UserReports;
