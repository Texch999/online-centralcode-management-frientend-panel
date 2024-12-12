import React, { useState } from "react";
import Table from "../../components/Table";
import { useNavigate, useParams } from "react-router-dom";
import { MdBlock } from "react-icons/md";
import FootballScoreboard from "./FootballScoreboard";
import TennisScoreBoard from "./TennisScoreBoard";
import HorseRacingScoreBoard from "./HorseRacingScoreBoard";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import ScoreboardCricket from "./ScoreboardCricket";
import { FaRegTrashCan } from "react-icons/fa6";

const CricketScoreboard = () => {
  const { vendor, provider, match } = useParams();
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleBlockModal = () => {
    setShowBlockModal(!showBlockModal);
  };
  const handleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const matchContent =
    match === "Football" ? (
      <div>
        Santos vs Cruzeiro MG <br />
        12345678912343455
      </div>
    ) : match === "HorseRacing" ? (
      <div>
        BathRust
        <br />
        67890123456789012
      </div>
    ) : match === "Tennis" ? (
      <div>
        Guangzhou Challenger 2023
        <br />
        67890123456789012
      </div>
    ) : (
      <div>
        ICC Women T20 World Cup
        <br />
        09876543211234567
      </div>
    );
  const seriesContent =
    match === "Football" ? (
      <div>
        Brazilian Series A<br />
        12345678912343455
      </div>
    ) : match === "Tennis" ? (
      <div>
        Evgeny Donskoy vs Omar Jasika
        <br />
        67890123456789012
      </div>
    ) : (
      <div>
        ICC Women T20 World Cup
        <br />
        56789012345678900
      </div>
    );
  const liveGameScoreBoardContent =
    match === "Football" ? (
      <FootballScoreboard />
    ) : match === "Tennis" ? (
      <TennisScoreBoard />
    ) : match === "HorseRacing" ? (
      <HorseRacingScoreBoard />
    ) : (
      <ScoreboardCricket />
    );

  const cols = [
    { header: "", field: "watch" },
    { header: "Date&Time", field: "date" },
    { header: "Matches/ID", field: "match" },
    ...(match !== "HorseRacing"
      ? [{ header: "Series Name/ID", field: "series" }]
      : []),
    {
      header: <div className="flex-center">Live Scoreboard</div>,
      field: "live",
      width: "100%",
    },
    { header: <div className="flex-end">Action</div>, field: "action" },
  ];

  const data = [
    {
      watch: <div className="inplay-btn w-fit p-1 white-space">In-Play</div>,
      date: (
        <div>
          <div className="white-space">21-09-2024</div>
          <div>08:00:00</div>
        </div>
      ),
      match: [matchContent],
      series: [seriesContent],
      live: [liveGameScoreBoardContent],
      action: (
        <div class="flex-end grey-clr">
          <MdBlock onClick={handleBlockModal} size={18} className="pointer" />
          <FaRegTrashCan
            onClick={handleDeleteModal}
            size={18}
            className="ms-2 pointer"
          />
        </div>
      ),
    },

    {
      watch: <div className="inplay-btn w-fit p-1 white-space">In-Play</div>,
      date: (
        <div className="d-flex flex-column">
          <div>21-09-2024</div>
          <div>08:00:00</div>
        </div>
      ),
      match: [matchContent],
      series: [seriesContent],
      live: [liveGameScoreBoardContent],
      action: (
        <div class="flex-end grey-clr">
          <MdBlock onClick={handleBlockModal} size={18} className="pointer" />
          <FaRegTrashCan
            onClick={handleDeleteModal}
            size={18}
            className="ms-2 pointer"
          />
        </div>
      ),
    },
    {
      watch: <div className="mx-2">Today</div>,
      date: (
        <div className="d-flex flex-column">
          <div>21-09-2024</div>
          <div>08:00:00</div>
        </div>
      ),
      match: [matchContent],
      series: [seriesContent],
      live: <div className="d-flex flex-center"></div>,
      action: (
        <div class="flex-end grey-clr">
          <MdBlock onClick={handleBlockModal} size={18} className="pointer" />
          <FaRegTrashCan
            onClick={handleDeleteModal}
            size={18}
            className="ms-2 pointer"
          />
        </div>
      ),
    },
    {
      watch: <div className=" mx-2">Upcoming</div>,
      date: (
        <div className="d-flex flex-column">
          <div>21-09-2024</div>
          <div>08:00:00</div>
        </div>
      ),
      match: [matchContent],
      series: [seriesContent],
      action: (
        <div class="flex-end grey-clr">
          <MdBlock onClick={handleBlockModal} size={18} className="pointer" />
          <FaRegTrashCan
            onClick={handleDeleteModal}
            size={18}
            className="ms-2 pointer"
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table columns={cols} data={data} itemsPerPage={2} customPadding="p-2" />
      <ConfirmationPopup
        confirmationPopupOpen={showBlockModal}
        setConfirmationPopupOpen={setShowBlockModal}
        discription={"Are You Sure to Block this Match"}
        submitButton={"Block"}
      />
      <ConfirmationPopup
        confirmationPopupOpen={showDeleteModal}
        setConfirmationPopupOpen={setShowDeleteModal}
        discription={"Are You Sure to Delete this Match"}
        submitButton={"Delete"}
      />
    </div>
  );
};

export default CricketScoreboard;
