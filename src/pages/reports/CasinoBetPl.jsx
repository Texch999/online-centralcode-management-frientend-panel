import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import Table from "../../components/Table";
import { SlPencil } from "react-icons/sl";
import { FaRegTrashCan } from "react-icons/fa6";
import { BsEye } from "react-icons/bs";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css"

function CasinoBetPl() {
  const navigate = useNavigate();
  const [activeSport, setActiveSport] = useState("Admins");
  const [activeRole, setActiveRole] = useState(false);
  const { username } = useParams();

  const SPORTS_BUTTONS = ["Admins", "Users"];

  const handleMatchClick = (matchName) => {
    navigate(`/downline/${encodeURIComponent(matchName)}`);
  };

  const websiteOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  const providerOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  const casinoOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  const tableOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  const ADMIN_COLUMNS = [
    { header: "Admin Details", field: "adminDetails" },
    { header: "Share/Royalty", field: "shareRoyalty" },
    { header: "My User Win", field: "myUserWin" },
    { header: "My User Loss", field: "myUserLoss" },
    { header: "My Casino P/L", field: "myCasinoPL" },
    { header: "DL User Win", field: "dLUserWin" },
    { header: "DL User Loss", field: "dLUserLoss" },
    { header: "DL Casino P/L", field: "dLCasinoPL" },
    { header: "Casino Net P/L", field: "netPL" },
    { header: "Downline", field: "downline" },
  ];

  const ADMIN_DATA = Array(6).fill({
    adminDetails: "Jayanta Admin",
    shareRoyalty: "5%",
    myUserWin: <div className="red-font">10000</div>,
    myUserLoss: <div className="green-font">10000</div>,
    myCasinoPL: <div className="green-font">500000</div>,
    dLUserWin: <div className="red-font">500000</div>,
    dLUserLoss: <div className="green-font">500000</div>,
    dLCasinoPL: <div className="red-font">500000</div>,
    netPL: <div className="green-font">500000</div>,
    downline: (
      <div className="w-60 flex-center">
        <BsEye
          size={18}
          onClick={() => setActiveRole(true)}
          className="pointer"
        />
      </div>
    ),
  });

  const ADMIN_FOOTER = [
    { header: "Total" },
    { header: "" },
    { header: <div className="red-font">7500000</div> },
    { header: <div className="green-font">7500000</div> },
    { header: <div className="green-font">7500000</div> },
    { header: <div className="red-font">7500000</div> },
    { header: <div className="green-font">7500000</div> },
    { header: <div className="red-font">7500000</div> },
    { header: <div className="green-font">7500000</div> },
    { header: "" },
  ];

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
      <div className="large-font d-flex w-50 flex-between">
        <span>
          <SlPencil size={18} />
        </span>
        <span className="ms-2">
          <FaRegTrashCan size={18} />
        </span>
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
    { label: "Total Users Win", value: "1000000000", color: "red-font" },
    { label: "Total Users Loss", value: "1000000000", color: "green-font" },
    { label: "Total Casino P/L", value: "2000000000", color: "green-font" },
  ];

  return (
    <div>
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
          <label className="black-text4 small-font mb-1">Provider</label>
          <Select
            className="small-font"
            options={providerOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
          />
        </div>

        <div className="col-3 flex-column me-3">
          <label className="black-text4 small-font mb-1">Casino Game</label>
          <Select
            className="small-font"
            options={casinoOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
          />
        </div>
        <div className="col-3 flex-column me-3">
          <label className="black-text4 small-font mb-1">Table</label>
          <Select
            className="small-font"
            options={tableOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
          />
        </div>

        <div className="saffron-btn2 small-font pointer mt-4  col-2">
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
    </div>
  );
}

export default CasinoBetPl;
