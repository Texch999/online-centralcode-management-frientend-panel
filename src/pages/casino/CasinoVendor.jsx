import React, { useState } from "react";
import "../casino/style.css";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../../components/Table";
import { IoEyeOutline } from "react-icons/io5";
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
    { header: <div className="">S No</div>, field: "sno", width:"10%",},
    { header: "Games", field: "games",width:"40%",},
    { header: <div className="flex-center"></div>, field: "eye",width:"10%", },
    { header: <div className="flex-center">Status</div>, field: "status",width:"10%", },
    { header: <div className="flex-center">Profit & Loss</div>, field: "pl" ,width:"10%",},
    { header: <div className="flex-center">Action</div>, field: "action",width:"10%", },
  ];

  const data = [
    {
      sno: <div className="">1</div>,
      games: (
        <div className="pointer" onClick={() => handleGamesPage("Poker")}>
          Poker
        </div>
      ),
      eye: (
        <div className="pointer flex-center">
          <span className=" font-20" onClick={() => handleGamesPage("Poker")}>
            <IoEyeOutline className="orange-clr" />
          </span>
        </div>
      ),
      status: (
        <div className="green-clr flex-center">
          <span className="round-green-dot mx-1"></span>ON
        </div>
      ),
      pl: <div className="dark-orange-clr flex-center">500000</div>,
      action: (
        <div class="form-check form-switch flex-center" onClick={handleActiveModal}>
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
      sno: <div className="">2</div>,
      games: (
        <div className="pointer" onClick={() => handleGamesPage("Teenpati")}>
          Teenpati
        </div>
      ),
      eye: (
        <div className="flex-center">
          <span
            className=" font-20"
            onClick={() => handleGamesPage("Teenpati")}
          >
            <IoEyeOutline className="orange-clr" />
          </span>
        </div>
      ),
      status: (
        <div className="dark-orange-clr align-items-center flex-center">
          <span className="round-red-dot mx-1"></span>OFF
        </div>
      ),
      pl: <div className="dark-orange-clr flex-center">500000</div>,
      action: (
        <div class="form-check form-switch flex-center">
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
      sno: <div className="">3</div>,
      games: (
        <div className="pointer" onClick={() => handleGamesPage("Roulette")}>
          Roulette
        </div>
      ),
      eye: (
        <div className="flex-center">
          <span
            className=" font-20"
            onClick={() => handleGamesPage("Roulette")}
          >
            <IoEyeOutline className="orange-clr" />
          </span>
        </div>
      ),
      status: (
        <div className="green-clr flex-center">
          <span className="round-green-dot mx-1"></span>ON
        </div>
      ),
      pl: <div className="dark-orange-clr flex-center">500000</div>,
      action: (
        <div class="form-check form-switch flex-center">
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
      sno: <div className="">4</div>,
      games: (
        <div className="pointer" onClick={() => handleGamesPage("Sic bo")}>
          Sic bo
        </div>
      ),
      eye: (
        <div className="flex-center">
          <span className=" font-20" onClick={() => handleGamesPage("Sic Bo")}>
            <IoEyeOutline className="orange-clr" />
          </span>
        </div>
      ),
      status: (
        <div className="dark-orange-clr flex-center">
          <span className="round-red-dot mx-1"></span>OFF
        </div>
      ),
      pl: <div className="dark-orange-clr flex-center">500000</div>,
      action: (
        <div class="form-check form-switch flex-center">
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
      sno: <div className="">5</div>,
      games: (
        <div className="pointer" onClick={() => handleGamesPage("Tables Game")}>
          Tables Game
        </div>
      ),
      eye: (
        <div className="flex-center">
          <span
            className=" font-20"
            onClick={() => handleGamesPage("Table Game")}
          >
            <IoEyeOutline className="orange-clr" />
          </span>
        </div>
      ),
      status: (
        <div className="dark-orange-clr flex-center">
          <span className="round-red-dot mx-1"></span>OFF
        </div>
      ),
      pl: <div className="dark-orange-clr flex-center">500000</div>,
      action: (
        <div class="form-check form-switch flex-center">
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
      sno: <div className="">6</div>,
      games: (
        <div className="pointer" onClick={() => handleGamesPage("Black Jack")}>
          Black Jack
        </div>
      ),
      eye: (
        <div className="flex-center">
          <span
            className=" font-20"
            onClick={() => handleGamesPage("Black Jack")}
          >
            <IoEyeOutline className="orange-clr" />
          </span>
        </div>
      ),
      status: (
        <div className="dark-orange-clr flex-center">
          <span className="round-red-dot mx-1"></span>OFF
        </div>
      ),
      pl: <div className="dark-orange-clr flex-center">500000</div>,
      action: (
        <div class="form-check form-switch flex-center">
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
      <div className="d-flex flex-between mt-3 mb-2">
        <div className="pointer large-font" onClick={() => navigate(-1)}>
          <span className="grey-clr">
            Casino<span className=" font-25"><MdKeyboardArrowRight /></span>
          </span>
          <span className="grey-clr">{vendor}</span>
          <span>
            <span className="font-25"><MdKeyboardArrowRight /></span>
            {provider}
          </span>
        </div>
        <div className="medium-font flex-between">
          <span
            className="white-bg rounded-pill grey-border me-4 px-3 flex-center py-1 pointer hover-orange-clr"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="me-2 d-flex" />
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
