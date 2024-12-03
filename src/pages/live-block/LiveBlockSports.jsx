import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import TopExposurePlayer from "./components/TopExposurePlayer";
import TopMatchedAmountPlayer from "./components/TopMatchedAmountPlayer";

import "../add-team/style.css";
import "./style.css";
import { useNavigate } from "react-router-dom";

function LiveBlockSports() {
  const [activeSport, setActiveSport] = useState("Cricket");
  const [tabTopTenPlayer, setTabTopTenPlayer] = useState("matched-amount-player");

  const SPORTS_BUTTONS = [
    "Cricket",
    "Football",
    "Tennis",
    "Horse Racing",
    "Greyhound Racing",
    "Kabaddi",
  ];

  const handleSportClick = (sport) => {
    setActiveSport(activeSport === sport ? null : sport);
  };

  const handleTabTopPlayer = (activeTab) => {
    setTabTopTenPlayer(activeTab);
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex-between mb-3 mt-2">
        <h6 className="yellow-font mb-0">Sports Live Settings</h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>

      {/* Sports Buttons Section */}
      <div className="flex-between border-bottom small-font pb-3">
        <div className="d-flex">
          {SPORTS_BUTTONS?.map((sport, index) => (
            <div
              key={index}
              className={`me-3 px-3 ${
                activeSport === sport ? "saffron-btn2" : "white-btn2"
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

      {/* Tabs for Top Players */}
      <div className="small-font py-3 d-flex">
        <button
          className={`me-3 px-3 py-2 ${
            tabTopTenPlayer === "matched-amount-player" ? "saffron-btn2" : "white-btn2"
          }`}
          onClick={() => handleTabTopPlayer("matched-amount-player")}
        >
          Top 10 Matched Amount Player
        </button>
        <button
          className={`me-3 px-3 py-2 ${
            tabTopTenPlayer === "exposure-player" ? "saffron-btn2" : "white-btn2"
          }`}
          onClick={() => handleTabTopPlayer("exposure-player")}
        >
          Top 10 Exposure Player
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {tabTopTenPlayer === "matched-amount-player" ? (
          <TopMatchedAmountPlayer />
        ) : (
          <TopExposurePlayer />
        )}
      </div>
    </div>
  );
}

export default LiveBlockSports;
