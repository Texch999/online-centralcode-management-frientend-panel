import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import Table from "../../components/Table";
import { SlPencil } from "react-icons/sl";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { BsEye } from "react-icons/bs";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";
import ConfirmationPopup from "../popups/ConfirmationPopup";

function SportsReport() {
  const [activeSport, setActiveSport] = useState("All");
  const [reportsDeleteModal, setReportsDeleteModal] = useState(false);
  const [activeRole, setActiveRole] = useState(false);

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

  const SPORTS_BUTTONS = [
    "All",
    "Toss",
    "Cricket",
    "Cricket/Fancy Bet",
    "Football",
    "Tennis",
    "Horse Racing",
    "Greyhound Racing",
    "Kabaddi",
  ];

  const handleSportClick = (sport) => {
    setActiveSport(sport);
  };

  const DIRECTOR_COLUMNS = [
    { header: "S. No", field: "sno" },
    { header: "Date & Time/IP", field: "dateTimeIP" },
    { header: "User / Market Name", field: "userMarketName" },
    { header: "P. ID - Provider Name - T. ID", field: "providerName" },
    { header: "Bet Placed", field: "betPlaced" },
    { header: "Selection ", field: "selection" },
    { header: "P/L", field: "pl" },
    { header: "Status", field: "status" },
  ];

  const DIRECTOR_DATA = Array(6).fill({
    sno: 4,
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
        Provider: Evolution <br />P ID: 1.11045677544 <br />T Name: Roulette{" "}
        <br />T ID: 11023843754858
      </div>
    ),
    betPlaced: <div>Casino</div>,
    selection: (
      <div>
        Selection: Auto Singo Roulette <br />
        Side: 36 <br />
        Odds Rate: 0 <br />
        B. Amount: 100000 <br />
        B. ID: 11023843754858
      </div>
    ),
    pl: (
      <div>
        <span className="green-font">10000000</span> <br />
        Result: ABcd
      </div>
    ),
    status: (
      <div className="d-flex gap-3">
          <SlPencil size={18} className="pointer"/>
          <FaRegTrashCan className="pointer" size={18} onClick={() => setReportsDeleteModal(true)} />
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
    { label: "Users Sports Win", value: "1000000000", color: "red-font" },
    { label: "Users Sports Loss", value: "1000000000", color: "green-font" },
    {
      label: "Users SportsTotal  P/L",
      value: "2000000000",
      color: "green-font",
    },
  ];

  return (
    <div>
      <div className="flex-between mb-3 mt-4">
        <h6 className="d-flex yellow-font mb-0">P/L Reports Sports Wise</h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>

      <div className="col-5 col-lg-4 d-flex mt-4 mb-3">
        <div className="w-100 mb-3 py-3 grey-bg2 rounded">
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

      <div className="col-11 col-lg-8 d-flex flex-between small-font mb-4">
        {SPORTS_BUTTONS?.map((sport, index) => (
          <div
            key={index}
            className={`me-3 ${
              activeSport === sport ? "saffron-btn2" : "white-btn2 pointer"
            }`}
            onClick={() => handleSportClick(sport)}
          >
            {sport}
          </div>
        ))}
      </div>

      <div className="row d-flex flex-between mt-2 mb-4">
        <div className="col flex-column pe-0">
          <label className="black-text4 small-font mb-1">From</label>
          <input className="input-css2 small-font" type="date" />
        </div>
        <div className="col flex-column pe-0">
          <label className="black-text4 small-font mb-1">To</label>
          <input className="input-css2 small-font" type="date" />
        </div>
        <div className="col w-100 flex-column pe-0">
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

        <div className="col flex-column pe-0">
          <label className="black-text4 small-font mb-1">Admin Name</label>
          <Select
            className="small-font w-100"
            options={adminOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
          />
        </div>

        <div className="col flex-column">
          <label className="black-text4 small-font mb-1">User Name</label>
          <Select
            className="small-font w-100"
            options={userOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
          />
        </div>

        <div className="align-self-end saffron-btn2 small-font pointer w-10 me-3">
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
        confirmationPopupOpen={reportsDeleteModal}
        setConfirmationPopupOpen={() => setReportsDeleteModal(false)}
        discription={"are you sure you want to delete this Report"}
        submitButton={"Delete"}
      />

    </div>
  );
}

export default SportsReport;
