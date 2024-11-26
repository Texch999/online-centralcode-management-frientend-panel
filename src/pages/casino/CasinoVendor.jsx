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
    { header: "S No", field: "sno" },
    { header: "Games", field: "games" },
    { header: "Status", field: "status" },
    { header: "Profit & Loss", field: "pl" },
    { header: "Action", field: "action" },
  ];

  const data = [
    {
      sno: <div>1</div>,
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
      sno: <div>2</div>,
      games: (
        <div className="pointer" onClick={() => handleGamesPage("Teenpati")}>
          Teenpati
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
      sno: <div>3</div>,
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
      sno: <div>4</div>,
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
      sno: <div>5</div>,
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
      sno: <div>6</div>,
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
      <div className="pointer" onClick={() => navigate(-1)}>
        <span className="grey-clr">Casino {">"}</span>{" "}
        <span className="grey-clr">{vendor}</span>{" "}
        <span>
          {">"}
          {provider}
        </span>
      </div>
      <div className="white-bg radius mt-3">
        <Table columns={cols} data={data} itemsPerPage={3} />
      </div>
    </div>
  );
};

export default CasinoVendor;
