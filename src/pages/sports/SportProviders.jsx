import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../../components/Table";
import { IoEyeOutline } from "react-icons/io5";
import ActionPopup from "../casino/ActionPopup";
import { FaArrowLeft } from "react-icons/fa";

const SportProviders = () => {
  const navigate = useNavigate();
  const { vendor, provider } = useParams();
  const handleGameMatches = (match) => {
    if (provider === "Odds") {
      navigate(`/cricket/${vendor}/${provider}/${match}`);
    } else if (provider === "fancy") {
      navigate(`/fancy-cricket/${vendor}/${provider}/${match}`);
    } else if (provider === "Bookmaker 1") {
      navigate(`/cricket-bookmaker/${vendor}/${provider}/${match}`);
    } else if (provider === "Bookmaker 2") {
      navigate(`/cricket-bookmaker/${vendor}/${provider}/${match}`);
    } else if (provider === "Live Streaming") {
      navigate(`/cricket-livestreaming/${vendor}/${provider}/${match}`);
    } else if (provider === "Scoreboard") {
      navigate(`/cricket-scoreboard/${vendor}/${provider}/${match}`);
    }
  };
  const [isActive, setIsACtive] = useState(false);
  const handleActiveModal = () => {
    setIsACtive(!isActive);
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
        <div className="pointer" onClick={() => handleGameMatches("Cricket")}>
          Cricket{" "}
        </div>
      ),
      eye: (
        <div className="d-flex flex-column pointer">
          <span
            className=" font-20"
            onClick={() => handleGameMatches("Cricket")}
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
        <div className="pointer" onClick={() => handleGameMatches("Football")}>
          Football
        </div>
      ),
      eye: (
        <div className="d-flex flex-column pointer">
          <span
            className=" font-20"
            onClick={() => handleGameMatches("Football")}
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
      sno: <div className="flex-center">3</div>,
      games: (
        <div className="pointer" onClick={() => handleGameMatches("Tennis")}>
          Tennis
        </div>
      ),
      eye: (
        <div className="d-flex flex-column pointer">
          <span
            className=" font-20"
            onClick={() => handleGameMatches("Tennis")}
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
        <div className="pointer" onClick={() => handleGameMatches("Kabbadi")}>
          Kabbadi
        </div>
      ),
      eye: (
        <div className="d-flex flex-column">
          <span
            className=" font-20"
            onClick={() => handleGameMatches("Kabbadi")}
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
      sno: <div className="flex-center">5</div>,
      games: (
        <div
          className="pointer"
          onClick={() => handleGameMatches("HorseRacing")}
        >
          Horse Racing
        </div>
      ),
      eye: (
        <div className="d-flex flex-column">
          <span
            className=" font-20"
            onClick={() => handleGameMatches("HorseRacing")}
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
        <div
          className="pointer"
          onClick={() => handleGameMatches("Greyhound Racing")}
        >
          GreyHound Racing
        </div>
      ),
      eye: (
        <div className="d-flex flex-column">
          <span
            className=" font-20"
            onClick={() => handleGameMatches("Greyhound Racing")}
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
        <div className="pointer large-font" onClick={() => navigate(-1)}>
          <span className="grey-clr">
            Sports <span className="mx-1 font-20">{">"}</span>
          </span>
          <span className="grey-clr">{vendor}</span>
          <span>
            <span className="mx-1 font-20">{">"}</span>

            <span className="fw-800"> {provider}</span>
          </span>
        </div>

        <div className="medium-font">
          <span
            className="white-bg rounded-pill me-4 px-3 py-1 pointer hover-orange-clr"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="me-1" />
            Back
          </span>
          Total P/L : <span className="green-clr mx-1">20000</span>
        </div>
      </div>

      <div className="radius mt-3">
        <Table columns={cols} data={data} itemsPerPage={10} />
      </div>
      <ActionPopup show={isActive} setShow={setIsACtive} />
    </div>
  );
};

export default SportProviders;
