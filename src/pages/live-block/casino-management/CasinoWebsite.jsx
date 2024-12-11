import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../../../components/Table";
import { MdBlockFlipped } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import ConfirmationPopup from "../../popups/ConfirmationPopup";

const CasinoWebsite = () => {
  const navigation = useNavigate();
  const [activeBtn, setActiveBtn] = useState("Websites");
  const [onBlockPopup, setOnBlockPopup] = useState(false);

  const ACTIVE_BTNS = ["Websites", "Casino Providers"];
  const handleMatchClick = (matchName) => {
    navigation(`/management-casino/${encodeURIComponent(matchName)}`);
  };

  const handleCasinoProvider = (matchName) => {
    navigation(`/management-casino-provider/${encodeURIComponent(matchName)}`);
  };

  const handleSportClick = (item) => {
    setActiveBtn(activeBtn === item ? null : item);
  };

  const CASINO_COLUMNS = [
    { header: "Website Name", field: "websiteName", width: "20%" },
    { header: "Website URL", field: "websiteURL", width: "25%" },
    {
      header: <div className="text-center">P/L</div>,
      field: "pl",
      width: "20%",
    },
    {
      header: <div className="text-center">Status</div>,
      field: "status",
      width: "10%",
    },
  ];
  const CASINO_DATA = [
    {
      websiteName: <div> Diamond Exchange</div>,
      websiteURL: <div>www.diamondexchange.com</div>,
      pl: <div className="green-font text-center">5000000</div>,

      status: (
        <div className="pointer d-flex justify-content-center gap-3">
          <BsEye
            size={18}
            onClick={() => handleCasinoProvider("Pragmatic Play")}
          />
          <MdBlockFlipped size={18} onClick={() => setOnBlockPopup(true)} />
          <span className="active-btn-table">Live</span>
        </div>
      ),
    },
  ];

  const CASINO_DATA_DUPLICATES = Array(10).fill(CASINO_DATA[0]);

  const CRICKET_COLUMNS = [
    { header: "Providers Name", field: "providersName", width: "35%" },
    {
      header: <div className="text-center">P/L</div>,
      field: "posterType",
      width: "30%",
    },
    {
      header: <div className="text-center">Status</div>,
      field: "status",
      width: "10%",
    },
  ];

  const CRICKET_DATA = [
    {
      providersName: <div>Ezugi Games</div>,
      posterType: <div className="green-font text-center">5000000</div>,
      status: (
        <div className="d-flex justify-content-center gap-3 pointer">
          <BsEye
            size={18}
            onClick={() => handleCasinoProvider("Pragmatic Play")}
          />
          <MdBlockFlipped size={18} onClick={() => setOnBlockPopup(true)} />
          <span className="active-btn-table">Live</span>
        </div>
      ),
    },
  ];

  const CRICKET_DATA_DUPLICATES = Array(10).fill(CRICKET_DATA[0]);

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="yellow-font mb-0 medium-font">Casino Live Settings</h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>

      <div className="flex-between border-bottom small-font pb-3">
        <div className="d-flex">
          {ACTIVE_BTNS?.map((sport, index) => (
            <div
              key={index}
              className={`pointer me-3 ${
                activeBtn === sport ? "saffron-btn2" : "white-btn2"
              }`}
              onClick={() => handleSportClick(sport)}
            >
              {sport}
            </div>
          ))}
        </div>
        <div>
          P/L : <span className="white-btn2 green-font">10000000</span>
        </div>
      </div>

      <div className="mt-4 ">
        {activeBtn === "Websites" ? (
          <Table
            columns={CASINO_COLUMNS}
            data={CASINO_DATA_DUPLICATES}
            itemsPerPage={8}
          />
        ) : (
          <Table
            columns={CRICKET_COLUMNS}
            data={CRICKET_DATA_DUPLICATES}
            itemsPerPage={8}
          />
        )}
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

export default CasinoWebsite;
