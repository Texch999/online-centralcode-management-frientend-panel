import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../../components/Table";
import { BsEye } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import { MdKeyboardArrowRight } from "react-icons/md";

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
    { header: "S No", field: "sno", width: "8%" },
    { header: "Games", field: "games", width: "40%" },
    { header: "", field: "eye", width: "10%" },
    { header: "Status", field: "status", width: "10%" },

    { header: "Profit&Loss", field: "pl", width: "10%" },
    {
      header: <div className="flex-center">Action</div>,
      field: "action",
      width: "10%",
    },
  ];

  const data = [
    {
      sno: 1,
      games: (
        <div className="pointer" onClick={() => handleGameMatches("Cricket")}>
          Cricket
        </div>
      ),
      eye: (
        <div className="pointer d-flex justify-content-end">
          <BsEye
            size={18}
            className="orange-clr"
            onClick={() => handleGameMatches("Cricket")}
          />
        </div>
      ),
      status: (
        <div className="green-clr">
          <span className="round-green-dot mx-1"></span>ON
        </div>
      ),
      pl: <div className="dark-orange-clr">50000000</div>,
      action: (
        <div className="flex-center">
          <div class="form-check form-switch" onClick={handleActiveModal}>
            <input
              class="form-check-input w-40"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
          </div>
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
        <div className="pointer d-flex justify-content-end">
          <BsEye
            className="orange-clr"
            size={18}
            onClick={() => handleGameMatches("Football")}
          />
        </div>
      ),
      status: (
        <div className="dark-orange-clr">
          <span className="round-red-dot mx-1"></span>OFF
        </div>
      ),
      pl: <div className="dark-orange-clr">50000000</div>,
      action: (
        <div className="flex-center">
          <div class="form-check form-switch" onClick={handleActiveModal}>
            <input
              class="form-check-input w-40"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
          </div>
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
        <div className="pointer d-flex justify-content-end">
          <BsEye
            className="orange-clr"
            size={18}
            onClick={() => handleGameMatches("Tennis")}
          />
        </div>
      ),

      status: (
        <div className="green-clr">
          <span className="round-green-dot mx-1"></span>ON
        </div>
      ),
      pl: <div className="dark-orange-clr">50000000</div>,
      action: (
        <div className="flex-center">
          <div class="form-check form-switch" onClick={handleActiveModal}>
            <input
              class="form-check-input w-40"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
          </div>
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
        <div className="pointer d-flex justify-content-end">
          <BsEye
            className="orange-clr"
            size={18}
            onClick={() => handleGameMatches("Kabaddi")}
          />
        </div>
      ),
      status: (
        <div className="dark-orange-clr">
          <span className="round-red-dot mx-1"></span>OFF
        </div>
      ),
      pl: <div className="dark-orange-clr">50000000</div>,
      action: (
        <div className="flex-center">
          <div class="form-check form-switch" onClick={handleActiveModal}>
            <input
              class="form-check-input w-40"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
          </div>
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
        <div className="pointer d-flex justify-content-end">
          <BsEye
            className="orange-clr"
            size={18}
            onClick={() => handleGameMatches("HorseRacing")}
          />
        </div>
      ),
      status: (
        <div className="dark-orange-clr">
          <span className="round-red-dot mx-1"></span>OFF
        </div>
      ),
      pl: <div className="dark-orange-clr">50000000</div>,
      action: (
        <div className="flex-center">
          <div class="form-check form-switch" onClick={handleActiveModal}>
            <input
              class="form-check-input w-40"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
          </div>
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
        <div className="pointer d-flex justify-content-end">
          <BsEye
            className="orange-clr"
            size={18}
            onClick={() => handleGameMatches("GreyhoundRacing")}
          />
        </div>
      ),
      status: (
        <div className="dark-orange-clr">
          <span className="round-red-dot mx-1"></span>OFF
        </div>
      ),
      pl: <div className="dark-orange-clr">50000000</div>,
      action: (
        <div className="flex-center">
          <div class="form-check form-switch" onClick={handleActiveModal}>
            <input
              class="form-check-input w-40"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="d-flex flex-between mt-3 mb-2">
        <div className="pointer large-font">
          <span className="grey-clr" onClick={() => navigate(-2)}>
            Sports
            <MdKeyboardArrowRight size={20} />
          </span>
          <span className="black-text" onClick={() => navigate(-1)}>
            {vendor}
            <MdKeyboardArrowRight size={20} />
            {provider}
          </span>
        </div>

        <div className="small-font flex-between">
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
      <Table columns={cols} data={data} itemsPerPage={10} />
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
