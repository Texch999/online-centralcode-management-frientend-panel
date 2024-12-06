import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../../components/Table";
import { IoEyeOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const SportProviders = () => {
  const navigate = useNavigate();
  const { vendor, provider } = useParams();
  const handleGameMatches = (match) => {
    if (provider === "Odds") {
      navigate(`/central-sports/${vendor}/${provider}/${match}`);
    } else if (provider === "Fancy") {
      navigate(`/central-sports/${vendor}/${provider}/${match}`);
    } else if (provider === "Bookmaker 1") {
      navigate(`/central-sports/${vendor}/${provider}/${match}`);
    } else if (provider === "Bookmaker 2") {
      navigate(`/central-sports/${vendor}/${provider}/${match}`);
    } else if (provider === "Live Streaming") {
      navigate(`/central-sports/${vendor}/${provider}/${match}`);
    } else if (provider === "Scoreboard") {
      navigate(`/central-sports/${vendor}/${provider}/${match}`);
    }
  };
  const [isActive, setIsACtive] = useState(false);
  const handleActiveModal = () => {
    setIsACtive(!isActive);
  };
  const cols = [
    { header: <div className="">S No</div>, field: "sno", width:"10%" },
    { header: "Games", field: "games", width:"40%" },
    { header: "", field: "eye",width:"10%" },
    { header: "Status", field: "status",width:"10%" },

    { header: "Profit & Loss", field: "pl",width:"10%" },
    { header: <div className="">Action</div>, field: "action", width:"10%" },
  ];

  const data = [
    {
      sno: <div className="">1</div>,
      games: (
        <div className="pointer" onClick={() => handleGameMatches("Cricket")}>
          Cricket{" "}
        </div>
      ),
      eye: (
        <div className="pointer">
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
      sno: <div className="">2</div>,
      games: (
        <div className="pointer" onClick={() => handleGameMatches("Football")}>
          Football
        </div>
      ),
      eye: (
        <div className="pointer">
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
      sno: <div className="">3</div>,
      games: (
        <div className="pointer" onClick={() => handleGameMatches("Tennis")}>
          Tennis
        </div>
      ),
      eye: (
        <div className="pointer">
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
      sno: <div className="">4</div>,
      games: (
        <div className="pointer" onClick={() => handleGameMatches("Kabbadi")}>
          Kabbadi
        </div>
      ),
      eye: (
        <div className="pointer">
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
      sno: <div className="">5</div>,
      games: (
        <div
          className="pointer"
          onClick={() => handleGameMatches("HorseRacing")}
        >
          Horse Racing
        </div>
      ),
      eye: (
        <div className="pointer">
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
      sno: <div className="">6</div>,
      games: (
        <div
          className="pointer"
          onClick={() => handleGameMatches("Greyhound Racing")}
        >
          GreyHound Racing
        </div>
      ),
      eye: (
        <div className="pointer">
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
      <div className="d-flex flex-between mt-3 mb-2">
        <div className="pointer large-font" onClick={() => navigate(-1)}>
          <span className="grey-clr">
            Sports <span className="font-25"><MdKeyboardArrowRight /></span>
          </span>
          <span className="grey-clr">{vendor}</span>
          <span>
          <span className="font-25"><MdKeyboardArrowRight /></span>

            <span className="fw-800"> {provider}</span>
          </span>
        </div>

        <div className="medium-font flex-between">
          <span
            className="input-css2 rounded-pill me-4 px-3 text-black py-1 flex-center pointer hover-orange-clr"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="me-1 d-flex" />
            Back
          </span>

          Total P/L : <span className="green-clr mx-1">20000</span>
        </div>
      </div>

      <div className="radius mt-3">
        <Table columns={cols} data={data} itemsPerPage={10} />
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

export default SportProviders;
