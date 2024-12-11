import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import ScrollTable from "../../components/ScrollTable";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "../add-team/style.css";
import "../live-block/style.css"

function RiskSports() {
  const navigate = useNavigate();
  const [activeSport, setActiveSport] = useState("Cricket");
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

  const HIGH_PROFIT_PLAYERS_COLUMNS = [
    { header: "S.NO", field: "s_no" },
    { header: "U.ID", field: "name" },
    { header: "Exposure", field: "exposure" },
    { header: "Exp Profit", field: "exp_profit" },
  ];
  const HIGH_PROFIT_PLAYERS_DATA = [
    {
      s_no: "1",
      name: "Srinivas",
      exposure: <div className="red-font">10000000</div>,
      exp_profit: "10000000",
    },
    {
      s_no: "2",
      name: "Srinivas",
      exposure: <div className="red-font">10000000</div>,
      exp_profit: "10000000",
    },
    {
      s_no: "3",
      name: "Srinivas",
      exposure: <div className="red-font">10000000</div>,
      exp_profit: "10000000",
    },
    {
      s_no: "4",
      name: "Srinivas",
      exposure: <div className="red-font">10000000</div>,
      exp_profit: "10000000",
    },
    
  ];

  const MATCH_ODDS_COLUMNS = [
    { header: "Market Date & Time", field: "dateTime", width: "15%" },
    { header: "Sports", field: "sports", width: "10%" },
    { header: "Match Name", field: "matchName", width: "40%" },
    {
      header: (
        <div className="orange-bg text-center border-left border-right">
          <div>P/L</div>
          <div className="w-100  flex-around border-top">
            <span>1</span>
            <span>X</span>
            <span>2</span>
          </div>
        </div>
      ),
      field: "profit_loss",
      width: "30%",
    },
    { header: "", field: "view", width: "5%" },
  ];
  const MATCH_ODDS_DATA = [
    {
      dateTime: "01-10-2024  16:11:00",
      sports: "Cricket",
      matchName: (
        <div>
          New Zealand Wo vs South Africa Wo - Match ODDS <br />
          M. ID: 12345678934567
        </div>
      ),
      profit_loss: (
        <div className="w-100 flex-around">
          <span className="red-font">10000000</span>
          <span>10000000</span>
          <span className="green-font">10000000</span>
        </div>
      ),
      view: (
        <div className="w-100 flex-center">
          <BsEye
            size={18}
            onClick={() => navigate("/risk-sports/matchName")}
            className="black-text pointer"
          />
        </div>
      ),
    },
    {
      dateTime: "01-10-2024  16:11:00",
      sports: "Cricket",
      matchName: (
        <div>
          New Zealand Wo vs South Africa Wo - Match ODDS <br />
          M. ID: 12345678934567
        </div>
      ),
      profit_loss: (
        <div className="w-100 flex-around">
          <span className="red-font">10000000</span>
          <span>10000000</span>
          <span className="green-font">10000000</span>
        </div>
      ),
      view: (
        <div className="w-100 flex-center">
          <BsEye
            size={18}
            onClick={() => navigate("/risk-sports/matchName")}
            className="black-text pointer"
          />
        </div>
      ),
    },
    {
      dateTime: "01-10-2024  16:11:00",
      sports: "Cricket",
      matchName: (
        <div>
          New Zealand Wo vs South Africa Wo - Match ODDS <br />
          M. ID: 12345678934567
        </div>
      ),
      profit_loss: (
        <div className="w-100 flex-around">
          <span className="red-font">10000000</span>
          <span>10000000</span>
          <span className="green-font">10000000</span>
        </div>
      ),
      view: (
        <div className="w-100 flex-center">
          <BsEye
            size={18}
            onClick={() => navigate("/risk-sports/matchName")}
            className="black-text pointer"
          />
        </div>
      ),
    },
  ];

  const FANCY_COLUMNS = [
    { header: "Market Date & Time", field: "dateTime", width: "15%" },
    { header: "Sports", field: "sports", width: "10%" },
    { header: "Match Name", field: "matchName", width: "30%" },
    {
      header: (
        <div className="orange-bg text-center border-left border-right">
          <div>P/L</div>
          <div className="w-100  flex-around border-top">
            <span>NO</span>
            <span></span>
            <span>YES</span>
          </div>
        </div>
      ),
      field: "profit_loss",
      width: "30%",
    },
    {
      header: <div className="text-center">Status</div>,
      field: "status",
      width: "10%",
    },
    { header: "", field: "view", width: "5%" },
  ];
  const FANCY_DATA = [
    {
      dateTime: "01-10-2024  16:11:00",
      sports: "Cricket",
      matchName: (
        <div onClick={() => navigate("/risk-sports/matchName")}>
          New Zealand Wo vs South Africa Wo - Match ODDS <br />
          M. ID: 12345678934567
        </div>
      ),
      profit_loss: (
        <div className="w-100 flex-around">
          <span className="red-font">10000000</span>
          <span>10000000</span>
          <span className="green-font">10000000</span>
        </div>
      ),
      status: (
        <div className="text-center">
          <button className="green-btn">Declared</button>
        </div>
      ),
      view: (
        <div className="w-100 flex-center">
          <BsEye
            size={18}
            onClick={() => navigate("/risk-sports/matchName")}
            className="black-text pointer"
          />
        </div>
      ),
    },
    {
      dateTime: "01-10-2024  16:11:00",
      sports: "Cricket",
      matchName: (
        <div>
          New Zealand Wo vs South Africa Wo - Match ODDS <br />
          M. ID: 12345678934567
        </div>
      ),
      profit_loss: (
        <div className="w-100 flex-around">
          <span className="red-font">-</span>
          <span>10000000</span>
          <span className="green-font">-</span>
        </div>
      ),
      status: (
        <div className="text-center">
          <button className="green-btn">Live</button>
        </div>
      ),
      view: (
        <div className="w-100 flex-center">
          <BsEye
            size={18}
            onClick={() => navigate("/risk-sports/matchName")}
            className="black-text pointer"
          />
        </div>
      ),
    },
    {
      dateTime: "01-10-2024  16:11:00",
      sports: "Cricket",
      matchName: (
        <div onClick={() => navigate("/risk-sports/matchName")}>
          New Zealand Wo vs South Africa Wo - Match ODDS <br />
          M. ID: 12345678934567
        </div>
      ),
      profit_loss: (
        <div className="w-100 flex-around">
          <span className="red-font">10000000</span>
          <span>10000000</span>
          <span className="green-font">10000000</span>
        </div>
      ),
      status: (
        <div className="text-center">
          <button className="green-btn">Declared</button>
        </div>
      ),
      view: (
        <div className="w-100 flex-center">
          <BsEye
            size={18}
            onClick={() => navigate("/risk-sports/matchName")}
            className="black-text pointer"
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="yellow-font mb-0">Risk Management - Sports</h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>
      <div className="flex-between border-bottom small-font pb-3">
        <div className="d-flex">
          {SPORTS_BUTTONS?.map((sport, index) => (
            <div
              key={index}
              className={`pointer me-3 px-3 ${
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
      <div className="small-font py-3 d-flex">
        <div className="pointer saffron-btn2 me-3">Top - Exp High Profit Players</div>
        <div className="pointer white-btn2 me-3">Top Last Minute Bet Players</div>
      </div>

      <div className="d-flex table-parent-container">
        <div className="table-wrapper me-3 w-50 table-special-effect border-start">
          <ScrollTable
            columns={HIGH_PROFIT_PLAYERS_COLUMNS}
            data={HIGH_PROFIT_PLAYERS_DATA}
          />
        </div>
        <div className="table-wrapper w-50 table-special-effect border-start border-end">
          <ScrollTable
            columns={HIGH_PROFIT_PLAYERS_COLUMNS}
            data={HIGH_PROFIT_PLAYERS_DATA}
          />
        </div>
      </div>

      <>
        <h6 className="black-text mt-4 mb-3">
          Match Odds (High Risk & Last Bet Players Matches)
        </h6>
        <ScrollTable
          columns={MATCH_ODDS_COLUMNS}
          data={MATCH_ODDS_DATA}
          customPadding="py-0 px-3"
        />
      </>
      <>
        <h6 className="black-text mt-4 mb-3">Book Maker 1</h6>
        <ScrollTable
          columns={MATCH_ODDS_COLUMNS}
          data={MATCH_ODDS_DATA}
          customPadding="py-0 px-3"
        />
      </>
      <>
        <h6 className="black-text mt-4 mb-3"> Book Maker 2</h6>
        <ScrollTable
          columns={MATCH_ODDS_COLUMNS}
          data={MATCH_ODDS_DATA}
          customPadding="py-0 px-3"
        />
      </>
      <>
        <h6 className="black-text mt-4 mb-3">Fancy</h6>
        <ScrollTable
          columns={FANCY_COLUMNS}
          data={FANCY_DATA}
          customPadding="py-0 px-3"
        />
      </>
    </div>
  );
}

export default RiskSports;
