import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FaSearch } from "react-icons/fa";
import Table from "../../../components/Table";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MdBlockFlipped } from "react-icons/md";
import { BsEye } from "react-icons/bs";
import ConfirmationPopup from "../../popups/ConfirmationPopup";

const McasinoGDetails = () => {
  const [onBlockPopup, setOnBlockPopup] = useState(false)
  const { gamename, usergame } = useParams();

  

  const navigation = useNavigate();
  const handleMatchClick = (matchName) => {
    navigation(
      `/management-casino/${encodeURIComponent(gamename)}/${encodeURIComponent(
        usergame
      )}/${encodeURIComponent(
        matchName
      )}`
    );
  };

  const CASINO_COLUMNS = [
    { header: "Provider ID/Name", field: "provider", width: "15%" },
    { header: "Game Name", field: "game_name", width: "10%" },
    { header: "Market Id", field: "market_id", width: "10%" },
    { header: "Table Number", field: "table_number", width: "10%" },
    { header: "P/L", field: "pl", width: "10%" },
    { header: <div className="text-center">Status</div>, field: "status", width: "4%" },
  ];

  const CASINO_DATA = [
    {
      provider: (
        <div>
          <div>Ezugi</div>
          <div>1234567891234567</div>
        </div>
      ),
      game_name: <div>Roulette</div>,
      market_id: <div>1234567891234567</div>,
      table_number: <div>Table No 1</div>,
      pl: <div className="green-font">5000000</div>,

      status: (
        <div className="w-100 flex-between  pointer">
          <BsEye size={18} onClick={() => handleMatchClick("Bet History")} />
          <span>
            <MdBlockFlipped size={18} onClick={() => setOnBlockPopup(true)}/>
          </span>
          <span className="active-btn-table px-1">Live</span>
        </div>
      ),
    },
  ];
  const CASINO_DATA_DUPLICATES = Array(10).fill(CASINO_DATA[0]);

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <div className="d-flex align-items-center">
          <h6 className=" mb-0 pointer medium-font" onClick={() => navigation(-2)}>
            <FiChevronLeft className="yellow-font mb-1" />
            Casino Live Settings<FiChevronRight /> Website <FiChevronRight />
          </h6>
          <span className="pointer medium-font" onClick={() => navigation(-1)}>
            {gamename}
          </span>
          <span className="yellow-font medium-font"> <FiChevronRight /> {usergame}</span>
        </div>
        <div className="d-flex ">
          <div className="input-pill d-flex align-items-center rounded-pill px-2">
            <FaSearch size={16} className="grey-clr me-2" />
            <input className="small-font all-none" placeholder="Search..." />
          </div>
          <div className="small-font mt-2 ms-2">
            P/L : <span className="white-btn2 green-font">10000000</span>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-end">
        <div className=" flex-column me-3 col-2">
          <label className="black-text4 small-font mb-1">Providers</label>
          <select className="input-css2 small-font ">
            <option>Select</option>
          </select>
        </div>
        <div>
          <button className="saffron-btn rounded">Submit</button>
        </div>
      </div>

      <div className="mt-4 ">
        <Table
          columns={CASINO_COLUMNS}
          data={CASINO_DATA_DUPLICATES}
          itemsPerPage={6}
        />
      </div>
      <ConfirmationPopup
        confirmationPopupOpen={onBlockPopup}
        setConfirmationPopupOpen={() => setOnBlockPopup(false)}
        discription={"are you sure you want to block this Website?"}
        submitButton={"Block"}
      />
    </div>
  );
};

export default McasinoGDetails;
