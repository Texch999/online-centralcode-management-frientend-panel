import React from "react";
import "../casino/style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Table from "../../components/Table";

const CasinoVendor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { vendor, provider } = location.state || {};

  const handleGamesPage = (game) => {
    navigate("/casino-games", { state: { vendor, provider, game } });
  };

  const cols = [
    { header: <div className="flex-center">S No</div>, field: "sno" },
    { header: "Games", field: "games" },
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
        <div className="pointer" onClick={() => handleGamesPage("Teenpati")}>
          Teenpati
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
        <div className="small-font">
          Total P/L : <span className="green-clr mx-1">20000</span>
        </div>
      </div>
      <div className="radius mt-3">
        <Table columns={cols} data={data} itemsPerPage={3} />
      </div>
    </div>
  );
};

export default CasinoVendor;
