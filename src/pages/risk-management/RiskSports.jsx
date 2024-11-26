import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import ScrollTable from "../../components/ScrollTable";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

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
        <div className="orange-bg text-center">
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
          <BsEye size={18} className="black-text" />
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
          <BsEye size={18} className="black-text" />
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
        <div className="orange-bg text-center">
          <div>P/L</div>
          <div className="w-100  flex-around border-top">
            <span>NO</span>
            <span>YES</span>
          </div>
        </div>
      ),
      field: "profit_loss",
      width: "30%",
    },
    { header: "Status", field: "status", width: "10%" },
    { header: "", field: "view", width: "5%" },
  ];
  const FANCY_DATA = [
    {
      dateTime: "01-10-2024  16:11:00",
      sports: "Cricket",
      matchName: (
        <div onClick={() => navigate("/risk-bet-history/matchName")}>
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
      status: <button className="green-btn">Declared</button>,
      view: (
        <div className="w-100 flex-center">
          <BsEye size={18} className="black-text" />
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
      <div className="small-font py-3 d-flex">
        <div className="saffron-btn2 me-3">Top - Exp High Profit Players</div>
        <div className="white-btn2 me-3">Top Last Minute Bet Players</div>
      </div>
      <div className="d-flex">
        <ScrollTable
          columns={HIGH_PROFIT_PLAYERS_COLUMNS}
          data={HIGH_PROFIT_PLAYERS_DATA}
        />
        <ScrollTable
          columns={HIGH_PROFIT_PLAYERS_COLUMNS}
          data={HIGH_PROFIT_PLAYERS_DATA}
        />
      </div>
      <>
        <h6 className="black-text my-3">
          Match Odds (High Risk & Last Bet Players Matches)
        </h6>
        <div className="rounded">
          <ScrollTable
            columns={MATCH_ODDS_COLUMNS}
            data={MATCH_ODDS_DATA}
            headerPadding="py-0"
          />
        </div>
      </>
      <>
        <h6 className="black-text my-3">Book Maker 1</h6>
        <div className="rounded">
          <ScrollTable
            columns={MATCH_ODDS_COLUMNS}
            data={MATCH_ODDS_DATA}
            headerPadding="py-0"
          />
        </div>
      </>
      <>
        <h6 className="black-text my-3"> Book Maker 2</h6>
        <div className="rounded">
          <ScrollTable
            columns={MATCH_ODDS_COLUMNS}
            data={MATCH_ODDS_DATA}
            headerPadding="py-0"
          />
        </div>
      </>
      <>
        <h6 className="black-text my-3">Fancy</h6>
        <div className="rounded">
          <ScrollTable
            columns={FANCY_COLUMNS}
            data={FANCY_DATA}
            headerPadding="py-0"
          />
        </div>
      </>
    </div>
  );
}

export default RiskSports;
