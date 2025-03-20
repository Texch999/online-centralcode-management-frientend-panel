import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";

const DwnlineTransactionHistory = () => {
  const navigate = useNavigate();
  const [activeSport, setActiveSport] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const buttons = ["All", , "Deposit", "Withdraw"];
  const handleSportClick = (sport) => {
    setActiveSport(sport);
  };

  const COLUMNS = [
    { header: "S No", field: "sno" },
    { header: "Date & Time", field: "datetime" },
    { header: "Desccription", field: "desc" },
    { header: "Credit", field: "credit" },
    { header: "Debit", field: "debit" },
    { header: "Sports/Casino ", field: "spc" },
    { header: "Balance", field: "bal" },
    { header: "From-To", field: "fromto" },
  ];

  const DATA = [
    {
      sno: <div>1</div>,
      datetime: <div className="black-font">10-03-2025</div>,
      desc: <div>Withdraw</div>,
      credit: <div className="green-font">-</div>,
      debit: <div className="red-font">1000</div>,
      spc: <div>Casino</div>,
      bal: <div>0</div>,
      fromto: <div>Srinivas Director - Owner</div>,
    },
    {
      sno: <div>2</div>,
      datetime: <div>10-03-2025</div>,
      desc: <div>Deposit</div>,
      credit: <div>-</div>,
      debit: <div>1000</div>,
      spc: <div>Casino</div>,
      bal: <div>0</div>,
      fromto: <div>Lokesh Director - Owner</div>,
    },
    {
        sno: <div>3</div>,
        datetime: <div>10-03-2025</div>,
        desc: <div>Deposit</div>,
        credit: <div>-</div>,
        debit: <div>1000</div>,
        spc: <div>Casino</div>,
        bal: <div>0</div>,
        fromto: <div>Lokesh Director - Owner</div>,
      },
  ];
  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <div className="d-flex align-items-center black-font fw-600">
          <span>
            <MdOutlineKeyboardArrowLeft
              size={22}
              onClick={() => navigate(-1)}
            />
          </span>
          <span className="black-font">Transaction History</span>
        </div>
        <div className="d-flex align-items-center">
          <div className="input-pill d-flex align-items-center rounded-pill px-2 py-1 me-3">
            <FaSearch size={16} className="grey-clr me-2" />
            <input
              className="small-font all-none"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select
              className="input-pill rounded-pill px-4 py-1 small-font"
              //   value={selectedRole}
              //   onChange={handleRoleChange}
            >
              <option value="">All</option>
              <option value="">All</option>
              <option value="">All</option>
              {/* {options?.map((item) => (
                <option value={item?.value}>{item?.name}</option>
              ))} */}
            </select>
          </div>
        </div>
      </div>
      <div className="my-2 d-flex flex-between">
        <div className="d-flex">
          {buttons?.map((sport, index) => (
            <div
              key={index}
              className={`me-3 pointer small-font ${
                activeSport === sport ? "saffron-btn2" : "white-btn2"
              }`}
              onClick={() => handleSportClick(sport)}
            >
              {sport}
            </div>
          ))}
        </div>
        <div className="d-flex">
          <div className="flex-column me-2">
            <label className="black-text4 small-font mb-1">From</label>
            <input className="input-css2 small-font" type="date" />
          </div>
          <div className="flex-column me-2">
            <label className="black-text4 small-font mb-1">To</label>
            <input className="input-css2 small-font" type="date" />
          </div>
          <div className="flex-column d-flex align-items-end justify-content-end me-1">
            <button className="w-100 saffron-btn2 small-font">Submit</button>
          </div>
        </div>
      </div>
      <di className="mt-1">
        <Table columns={COLUMNS} data={DATA} itemsPerPage={2} />
      </di>
    </div>
  );
};

export default DwnlineTransactionHistory;
