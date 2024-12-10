import React, { useState } from "react";
import "../casino/style.css";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../../components/Table";
import { BsEye } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const CasinoVendor = () => {
  const navigate = useNavigate();
  const { vendor, provider } = useParams();
  const [isActive, setIsACtive] = useState(false);
  const handleActiveModal = () => {
    setIsACtive(!isActive);
  };
  const handleGamesPage = (game) => {
    navigate(`/central-casino/${vendor}/${provider}/${game}`);
  };

  const cols = [
    {
      header: <div className="white-space">S No</div>,
      field: "sno",
      width: "5%",
    },
    { header: "Games", field: "games", width: "58%" },
    { field: "eye", width: "5%" },
    {
      header: <div className="flex-center">Status</div>,
      field: "status",
      width: "10%",
    },
    {
      header: <div className="flex-center">Profit & Loss</div>,
      field: "pl",
      width: "12%",
    },
    {
      header: <div className="flex-center">Action</div>,
      field: "action",
      width: "10%",
    },
  ];

  const data = [
    {
      sno: <div>1</div>,
      games: (
        <div className="pointer" onClick={() => handleGamesPage("Poker")}>
          Poker
        </div>
      ),
      eye: (
        <div className=" flex-center">
          <BsEye
            size={18}
            className="orange-clr pointer"
            onClick={() => handleGamesPage("Poker")}
          />
        </div>
      ),
      status: (
        <div className="green-clr flex-center">
          <span className="round-green-dot me-2"></span>ON
        </div>
      ),
      pl: <div className="dark-orange-clr flex-center">500000</div>,
      action: (
        <div
          class="form-check form-switch flex-center"
          onClick={handleActiveModal}
        >
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
        </div>
      ),
    },
    {
      sno: <div>1</div>,
      games: (
        <div className="pointer" onClick={() => handleGamesPage("Poker")}>
          Baccarat
        </div>
      ),
      eye: (
        <div className=" flex-center">
          <BsEye
            size={18}
            className="orange-clr pointer"
            onClick={() => handleGamesPage("Baccarat")}
          />
        </div>
      ),
      status: (
        <div className="red-font flex-center">
          <span className="round-red-dot me-2"></span>OFF
        </div>
      ),
      pl: <div className="dark-orange-clr flex-center">500000</div>,
      action: (
        <div
          class="form-check form-switch flex-center"
          onClick={handleActiveModal}
        >
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="d-flex flex-between mt-3 mb-2">
        <div className="pointer large-font" onClick={() => navigate(-1)}>
          <span className="grey-clr">
            Casino
            <MdKeyboardArrowRight size={18} />
          </span>
          <span className="grey-clr">{vendor}</span>
          <span>
            <MdKeyboardArrowRight size={18} />
            {provider}
          </span>
        </div>
        <div className="medium-font flex-between">
          <span
            className="small-font white-bg rounded-pill grey-border me-3 px-2 flex-center py-1 pointer hover-orange-clr"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft size={12} className="me-2 d-flex" />
            Back
          </span>
          Total P/L : <span className="green-clr mx-1">20000</span>
        </div>
      </div>

      <div className="radius mt-3">
        <Table columns={cols} data={data} itemsPerPage={3} />
      </div>

      <ConfirmationPopup
        confirmationPopupOpen={isActive}
        setConfirmationPopupOpen={setIsACtive}
        discription={"Are You Sure to Active this Match"}
        submitButton={"Active"}
      />
    </div>
  );
};

export default CasinoVendor;
