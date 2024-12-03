import React, { useState } from "react";
import "../casino/style.css";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../../components/Table";
import { IoEyeOutline } from "react-icons/io5";
import ActionPopup from "./ActionPopup";
import { FaArrowLeft } from "react-icons/fa";

const CasinoVendor = () => {
  const navigate = useNavigate();
  const { vendor, provider } = useParams();
  const [isActive, setIsACtive] = useState(false);
  const handleActiveModal = () => {
    setIsACtive(!isActive);
  };

  const handleGamesPage = (game) => {
    navigate(`/casino/${vendor}/${provider}/${game}`);
  };

  const cols = [
    { header: <div className="flex-center">S No</div>, field: "sno" },
    { header: "Games", field: "games" },
    { header: "", field: "eye" },
    { header: "Status", field: "status" },
    { header: "Profit & Loss", field: "pl" },
    { header: "Action", field: "action" },
  ];

  const data = [
    {
      sno: <div className="flex-center">1</div>,
      games: (
        <div className="pointer" onClick={() => handleGamesPage("Poker")}>
          Poker
        </div>
      ),
      eye: (
        <div className="d-flex flex-column pointer">
          <span className=" font-20" onClick={() => handleGamesPage("Poker")}>
            <IoEyeOutline className="orange-clr" />
          </span>
        </div>
      ),
      status: (
        <div className="green-clr">
          <span className="round-green-dot mx-1"></span>ON
        </div>
      ),
      pl: <div className="dark-orange-clr">500000</div>,
      action: (
        <div class="form-check form-switch" onClick={handleActiveModal}>
          <input
            class="form-check-input w-40"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
        </div>
      ),
    },
    {
      sno: <div className="flex-center">2</div>,
      games: (
        <div className="pointer" onClick={() => handleGamesPage("Teenpati")}>
          Teenpati
        </div>
      ),
      eye: (
        <div className="d-flex flex-column">
          <span
            className=" font-20"
            onClick={() => handleGamesPage("Teenpati")}
          >
            <IoEyeOutline className="orange-clr" />
          </span>
        </div>
      ),
      status: (
        <div className="dark-orange-clr align-items-center">
          <span className="round-red-dot mx-1"></span>OFF
        </div>
      ),
      pl: <div className="dark-orange-clr">500000</div>,
      action: (
        <div class="form-check form-switch">
          <input
            class="form-check-input w-40"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
        </div>
      ),
    },
    {
      sno: <div className="flex-center">3</div>,
      games: (
        <div className="pointer" onClick={() => handleGamesPage("Roulette")}>
          Roulette
        </div>
      ),
      eye: (
        <div className="d-flex flex-column">
          <span
            className=" font-20"
            onClick={() => handleGamesPage("Roulette")}
          >
            <IoEyeOutline className="orange-clr" />
          </span>
        </div>
      ),
      status: (
        <div className="green-clr">
          <span className="round-green-dot mx-1"></span>ON
        </div>
      ),
      pl: <div className="dark-orange-clr">500000</div>,
      action: (
        <div class="form-check form-switch">
          <input
            class="form-check-input w-40"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
        </div>
      ),
    },
    {
      sno: <div className="flex-center">4</div>,
      games: (
        <div className="pointer" onClick={() => handleGamesPage("Sic bo")}>
          Sic bo
        </div>
      ),
      eye: (
        <div className="d-flex flex-column">
          <span className=" font-20" onClick={() => handleGamesPage("Sic Bo")}>
            <IoEyeOutline className="orange-clr" />
          </span>
        </div>
      ),
      status: (
        <div className="dark-orange-clr">
          <span className="round-red-dot mx-1"></span>OFF
        </div>
      ),
      pl: <div className="dark-orange-clr">500000</div>,
      action: (
        <div class="form-check form-switch">
          <input
            class="form-check-input w-40"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
        </div>
      ),
    },
    {
      sno: <div className="flex-center">5</div>,
      games: (
        <div className="pointer" onClick={() => handleGamesPage("Tables Game")}>
          Tables Game
        </div>
      ),
      eye: (
        <div className="d-flex flex-column">
          <span
            className=" font-20"
            onClick={() => handleGamesPage("Table Game")}
          >
            <IoEyeOutline className="orange-clr" />
          </span>
        </div>
      ),
      status: (
        <div className="dark-orange-clr">
          <span className="round-red-dot mx-1"></span>OFF
        </div>
      ),
      pl: <div className="dark-orange-clr">500000</div>,
      action: (
        <div class="form-check form-switch">
          <input
            class="form-check-input w-40"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
        </div>
      ),
    },
    {
      sno: <div className="flex-center">6</div>,
      games: (
        <div className="pointer" onClick={() => handleGamesPage("Black Jack")}>
          Black Jack
        </div>
      ),
      eye: (
        <div className="d-flex flex-column">
          <span
            className=" font-20"
            onClick={() => handleGamesPage("Black Jack")}
          >
            <IoEyeOutline className="orange-clr" />
          </span>
        </div>
      ),
      status: (
        <div className="dark-orange-clr">
          <span className="round-red-dot mx-1"></span>OFF
        </div>
      ),
      pl: <div className="dark-orange-clr">500000</div>,
      action: (
        <div class="form-check form-switch">
          <input
            class="form-check-input w-40"
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
      <div className="d-flex flex-between">
        <div className="pointer my-2 large-font" onClick={() => navigate(-1)}>
          <span className="grey-clr">
            Casino<span className="mx-1">{">"}</span>
          </span>
          <span className="grey-clr">{vendor}</span>
          <span>
            <span className="mx-1">{">"}</span>
            {provider}
          </span>
        </div>
        <div className="medium-font">
          <span
            className="white-bg rounded-pill grey-border me-4 px-3 py-1 pointer hover-orange-clr"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="me-2" />
            Back
          </span>
          Total P/L : <span className="green-clr mx-1">20000</span>
        </div>
      </div>
      <div className="radius mt-3">
        <Table columns={cols} data={data} itemsPerPage={3} />
      </div>
      <ActionPopup show={isActive} setShow={setIsACtive} />
    </div>
  );
};

export default CasinoVendor;
