import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BsEye } from "react-icons/bs";
import TopExposurePlayer from "./components/TopExposurePlayer";
import TopMatchedAmountPlayer from "./components/TopMatchedAmountPlayer";
import "../add-team/style.css";
import "./style.css";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";

function LiveBlockSports() {
  const [activeSport, setActiveSport] = useState("Cricket");
  const [tabTopTenPlayer, setTabTopTenPlayer] = useState(
    "matched-amount-player"
  );

  const navigate = useNavigate();

  const handleClickCricketPage = (sport) => {
    navigate(`/live-block-sports/${sport}`);
  };

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

  const live_data_details_columns = [
    { header: "Live / Open Date & Time", field: "dateTime", width: "13%" },
    { header: "Series Name", field: "seriesName", width: "15%" },
    { header: "Match ID", field: "matchID" },
    { header: "Match Name", field: "matchName" },
    { header: "Back", field: "back" },
    { header: "Lay", field: "lay" },
    { header: "Exposure", field: "exposure" },
    { header: "Declare Bets P/L", field: "declareBets" },
    { header: <div className="">Action</div>, field: "action", width: "10%" },
  ];

  const cricketData = [
    {
      live: "Live",
      dateTime: (
        <>
          <div className="green-font">Live</div>
          <div className="">01-10-2024 16:11:00</div>
        </>
      ),
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: (
        <BsEye
          size={18}
          className="pointer ms-2"
          onClick={() => handleClickCricketPage(activeSport)}
        />
      ),
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
  ];

  const footballData = [
    {
      live: "live",
      dateTime: (
        <>
          <div className="green-font">Live</div>
          <div className="">01-10-2024 16:11:00</div>
        </>
      ),
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: (
        <BsEye
          size={18}
          className="pointer ms-2"
          onClick={() => handleClickCricketPage(activeSport)}
        />
      ),
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
  ];

  const tennisData = [
    {
      live: "Live",
      dateTime: (
        <>
          <div className="green-font">Live</div>
          <div className="">01-10-2024 16:11:00</div>
        </>
      ),
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: (
        <BsEye
          size={18}
          className="pointer ms-2"
          onClick={() => handleClickCricketPage(activeSport)}
        />
      ),
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
  ];

  const horseRacingData = [
    {
      live: "Live",
      dateTime: (
        <>
          <div className="green-font">Live</div>
          <div className="">01-10-2024 16:11:00</div>
        </>
      ),
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: (
        <BsEye
          size={18}
          className="pointer ms-2"
          onClick={() => handleClickCricketPage("Horse Racing")}
        />
      ),
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
    {
      live: "Live",
      dateTime: "01-10-2024 16:11:00",
      seriesName: (
        <>
          <div>ICICI T20 Women World Cup</div>
          <div>2024</div>
          <div>M. ID: 1.11045677544</div>
        </>
      ),
      matchID: "11023843754858",
      matchName: (
        <>
          <div>New Zealand Wo</div>
          <div>vs South Africa Wo</div>
        </>
      ),
      back: <span className="sky-blu-font">5000000</span>,
      lay: <span className="red-font">0</span>,
      exposure: <span className="red-font">471.19</span>,
      declareBets: <span className="green-font">5000000</span>,
      action: <BsEye size={18} className="pointer ms-2" />,
    },
  ];

  const getSportData = (sport) => {
    switch (sport) {
      case "Cricket":
        return cricketData;
      case "Football":
        return footballData;
      case "Tennis":
        return tennisData;
      case "Horse Racing":
        return horseRacingData;
      default:
        return cricketData;
    }
  };

  return (
    <div>
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
              className={`me-3 px-3 pointer ${
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
      {activeSport === "Cricket" || activeSport === "Football" ? (
        <div>
          <div className="small-font py-3 d-flex">
            <button
              className={`me-3 px-3 py-2 ${
                tabTopTenPlayer === "matched-amount-player"
                  ? "saffron-btn2"
                  : "white-btn2"
              }`}
              onClick={() => handleTabTopPlayer("matched-amount-player")}
            >
              Top 10 Matched Amount Player
            </button>
            <button
              className={`me-3 px-3 py-2 ${
                tabTopTenPlayer === "exposure-player"
                  ? "saffron-btn2"
                  : "white-btn2"
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
      ) : (
        ""
      )}

      <div className="mt-4">
        <Table
          data={getSportData(activeSport)}
          columns={live_data_details_columns}
          itemsPerPage={6}
        />
      </div>
    </div>
  );
}

export default LiveBlockSports;
