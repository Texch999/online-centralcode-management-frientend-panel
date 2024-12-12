import React, { useState } from "react";
import Table from "../../../components/Table";
import { useNavigate, useParams } from "react-router-dom";
import { MdBlock, MdDeleteOutline, MdSportsCricket } from "react-icons/md";
import { IoTennisballOutline } from "react-icons/io5";
import TennisScoreBoard from "../../cricket/TennisScoreBoard";
import HorseRacingScoreBoard from "../../cricket/HorseRacingScoreBoard";
import FootballScoreboard from "../../cricket/FootballScoreboard";
import { Images } from "../../../images";
import { FaEllipsisV, FaExpand } from "react-icons/fa";
import { HiOutlineVolumeUp, HiOutlineVolumeOff } from "react-icons/hi";
import { FaRegCirclePause } from "react-icons/fa6";
import "../../add-team/style.css";
import "../style.css";
import ScoreboardCricket from "../../cricket/ScoreboardCricket";

const LiveScoreBoard = ({ sport }) => {
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlayPauseClick = () => {
    const video = document.getElementById("video");
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    const video = document.getElementById("video");
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  const handleBlockModal = () => {
    setShowBlockModal(!showBlockModal);
  };
  const handleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

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
      <>
        <FootballScoreboard />
      </>
    ) : sport === "Tennis" ? (
      <>
        <TennisScoreBoard />
      </>
    ) : sport === "Horse Racing" ? (
      <>
        <HorseRacingScoreBoard />
      </>
    ) : (
      <ScoreboardCricket />
    );

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
        <div
          className="position-relative bg-dark rounded overflow-hidden"
          style={{ width: "300px", height: "140px" }}
        >
          <video
            id="video"
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
            poster={Images.LiveImagePoster}
            onClick={handlePlayPauseClick}
            onEnded={handleVideoEnd}
          >
            <source
              // src="https://www.w3schools.com/html/mov_bbb.mp4"
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
              type="video/mp4"
            />
          </video>

          <div
            className="position-absolute top-50 start-50 translate-middle"
            style={{ pointerEvents: "none" }}
          >
            {!isPlaying ? (
              <img
                src={Images.VideoPlayIcon}
                alt="Play Icon"
                style={{ width: "40px", height: "40px" }}
              />
            ) : (
              <FaRegCirclePause
                alt="Pause Icon"
                style={{ width: "40px", height: "40px" }}
                className="text-white"
              />
            )}
          </div>

          <div className="position-absolute bottom-0 end-0 p-2 d-flex gap-2">
            {/* Mute/Unmute Icon */}
            <div
              className="d-flex align-items-center justify-content-center pointer"
              style={{
                backgroundColor: "rgba(92, 92, 92, 0.6)",
                padding: "8px",
                borderRadius: "50%",
              }}
              onClick={handleMuteToggle}
            >
              {isMuted ? (
                <HiOutlineVolumeOff size={18} className="text-white fs-5" />
              ) : (
                <HiOutlineVolumeUp size={18} className="text-white fs-5" />
              )}
            </div>

            <div
              className="d-flex align-items-center justify-content-center pointer"
              style={{
                backgroundColor: "rgba(92, 92, 92, 0.6)",
                padding: "8px",
                borderRadius: "50%",
              }}
            >
              <FaExpand size={18} className="text-white fs-5" />
            </div>

            <div
              className="d-flex align-items-center justify-content-center pointer"
              style={{
                backgroundColor: "rgba(92, 92, 92, 0.6)",
                padding: "8px",
                borderRadius: "50%",
              }}
            >
              <FaEllipsisV size={18} className="text-white fs-5" />
            </div>
          </div>
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
