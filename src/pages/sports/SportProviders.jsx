import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import { IoEyeOutline } from "react-icons/io5";

const SportProviders = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { vendor, provider } = location.state || {};
  const handleGameMatches = (match) => {
    navigate("/sports-matches", { state: { vendor, provider, match } });
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
        <div className="d-flex flex-column">
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
      sno: <div className="flex-center">2</div>,
      games: (
        <div className="pointer" onClick={() => handleGameMatches("Football")}>
          Football
        </div>
      ),
      eye: (
        <div className="d-flex flex-column">
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
        <div className="d-flex flex-column">
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
        <div className="pointer" onClick={() => handleGameMatches("Sic Bo")}>
          Sic bo
        </div>
      ),
      eye: (
        <div className="d-flex flex-column">
          <span
            className=" font-20"
            onClick={() => handleGameMatches("Sic Bo")}
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
          onClick={() => handleGameMatches("Table Game")}
        >
          Tables Game
        </div>
      ),
      eye: (
        <div className="d-flex flex-column">
          <span
            className=" font-20"
            onClick={() => handleGameMatches("Table Game")}
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
          onClick={() => handleGameMatches("Black Jack")}
        >
          Black Jack
        </div>
      ),
      eye: (
        <div className="d-flex flex-column">
          <span
            className=" font-20"
            onClick={() => handleGameMatches("Black Jack")}
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
      <div className="pointer large-font" onClick={() => navigate(-1)}>
        <span className="grey-clr">
          Sports <span className="mx-1 font-20">{">"}</span>
        </span>
        <span className="text-black">{vendor}</span>
        <span>
          <span className="mx-1 font-20">{">"}</span>
          {provider}
        </span>
      </div>
      <div className="radius mt-3">
        <Table columns={cols} data={data} itemsPerPage={3} />
      </div>
    </div>
  );
};

export default SportProviders;
