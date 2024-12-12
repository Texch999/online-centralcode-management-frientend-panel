import React, { useState } from "react";
import Table from "../../../components/Table";
import { useNavigate, useParams } from "react-router-dom";
import { MdBlock, MdDeleteOutline, MdSportsCricket } from "react-icons/md";
import { IoTennisballOutline } from "react-icons/io5";
import TennisScoreBoard from "../../cricket/TennisScoreBoard";
import HorseRacingScoreBoard from "../../cricket/HorseRacingScoreBoard";
import FootballScoreboard from "../../cricket/FootballScoreboard";
import { Images } from "../../../images";
import "../../add-team/style.css";
import "../style.css";
import ScoreboardCricket from "../../cricket/ScoreboardCricket";

const LiveScoreBoard = ({ sport }) => {
  const navigate = useNavigate();
  // const { vendor, provider, match } = useParams();

  const matchContent =
    sport === "Football" ? (
      <>
        <div>Santos vs Cruzeiro MG</div>
        <div>11023843754858</div>
      </>
    ) : sport === "HorseRacing" ? (
      <>
        <div>BathRust</div>
        <div>11023843754858</div>
      </>
    ) : sport === "Tennis" ? (
      <>
        <div>Evgeny Donskoy vs Omar Jasika</div>
        <div>11023843754858</div>
      </>
    ) : (
      <>
        <div>ICC Women T20 World Cup</div>
        <div>09876543211234567</div>
      </>
    );

  const seriesContent =
    sport === "Football" ? (
      <>
        <div>Brazilian Series A</div>
        <div>1.11045677544</div>
      </>
    ) : sport === "Tennis" ? (
      <>
        <div>Guangzhou Challenger 2023</div>
        <div>1.11045677544</div>
      </>
    ) : (
      <>
        <div>ICC Women T20 World Cup</div>
        <div>56789012345678900</div>
      </>
    );
  const liveGameScoreBoardContent =
    sport === "Football" ? (
      <FootballScoreboard />
    ) : sport === "Tennis" ? (
      <TennisScoreBoard />
    ) : sport === "Horse Racing" ? (
      <HorseRacingScoreBoard />
    ) : (
      <ScoreboardCricket />
    );

  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleBlockModal = () => {
    setShowBlockModal(!showBlockModal);
  };
  const handleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const cols = [
    { header: "Scoreboard", field: "watch", width: "8%" },
    { header: "", field: "date", width: "7%" },
    { header: "", field: "match" },
    ...(sport !== "HorseRacing" ? [{ header: "", field: "series" }] : []),
    {
      header: "",
      field: "live",
    },
    { header: <div className="flex-end">status</div>, field: "action" },
  ];

  const cols2 = [
    { header: "Live Streaming", field: "watch", width: "10%" },
    { header: "", field: "date", width: "7%" },
    { header: "", field: "match" },
    ...(sport !== "HorseRacing" ? [{ header: "", field: "series" }] : []),
    {
      header: "",
      field: "live",
    },
    { header: <div className="flex-center">status</div>, field: "action" },
  ];

  const data = [
    {
      watch: <div className="inplay-btn w-fit py-1 px-2 mx-2">In Play</div>,
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
        <div class="mt-1 text-center live-score-action-icons">
          <div onClick={handleBlockModal} className="pointer">
            <MdBlock size={18} className="font-20 grey-clr" />
          </div>
          <div onClick={handleDeleteModal} className="pointer">
            <MdDeleteOutline size={18} className="font-20 mt-3" />
          </div>
        </div>
      ),
    },
  ];

  const data2 = [
    {
      watch: <div className="inplay-btn w-fit py-1 px-2 mx-2">In Play</div>,
      date: (
        <div className="d-flex flex-column">
          <div>21-09-2024</div>
          <div>08:00:00</div>
        </div>
      ),
      match: [matchContent],
      series: [seriesContent],
      live: (
        <div class="video-container">
          <video
            controls
            width="300"
            height="150"
            className="rounded"
            poster={Images.LiveImagePoster}
          >
            <source src="video-file.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ),

      action: (
        <div class="mt-1 text-center live-score-action-icons">
          <div onClick={handleBlockModal} className="pointer">
            <MdBlock size={18} className="font-20 grey-clr" />
          </div>
          <div onClick={handleDeleteModal} className="pointer">
            <MdDeleteOutline size={18} className="font-20 mt-3" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="p-1">
      <div className="mt-3 table-items-centerd live-score-board-table-item-top">
        <Table columns={cols} data={data} itemsPerPage={5} />
      </div>

      <div className="mt-3 table-items-centerd live-score-board-table-item-top">
        <Table columns={cols2} data={data2} itemsPerPage={5} />
      </div>
    </div>
  );
};

export default LiveScoreBoard;
