import React, { useState } from "react";
import BlockPopup from "./../popups/BlockPopup";
import DeletePopup from "./../popups/DeletePopup";
import Table from "../../components/Table";
import { useNavigate, useParams } from "react-router-dom";
import { MdBlock, MdDeleteOutline, MdSportsCricket } from "react-icons/md";
import { IoTennisballOutline } from "react-icons/io5";
import FootballScoreboard from "./FootballScoreboard";
import TennisScoreBoard from "./TennisScoreBoard";
import HorseRacingScoreBoard from "./HorseRacingScoreBoard";
import { FaArrowLeft } from "react-icons/fa";

const CricketScoreboard = () => {
  const navigate = useNavigate();
  const { vendor, provider, match } = useParams();

  const matchContent =
    match === "Football" ? (
      <>
        <div>Santos vs Cruzeiro MG</div>
        <div>12345678912343455</div>
      </>
    ) : match === "HorseRacing" ? (
      <>
        <div>BathRust</div>
        <div>67890123456789012</div>
      </>
    ) : match === "Tennis" ? (
      <>
        <div>Guangzhou Challenger 2023</div>
        <div>67890123456789012</div>
      </>
    ) : (
      <>
        <div>ICC Women T20 World Cup</div>
        <div>09876543211234567</div>
      </>
    );

  const seriesContent =
    match === "Football" ? (
      <>
        <div>Brazilian Series A</div>
        <div>12345678912343455</div>
      </>
    ) : match === "Tennis" ? (
      <>
        <div>Evgeny Donskoy vs Omar Jasika</div>
        <div>67890123456789012</div>
      </>
    ) : (
      <>
        <div>ICC Women T20 World Cup</div>
        <div>56789012345678900</div>
      </>
    );
  const liveGameScoreBoardContent =
    match === "Football" ? (
      <>
        <FootballScoreboard />
      </>
    ) : match === "Tennis" ? (
      <>
        <TennisScoreBoard />
      </>
    ) : match === "HorseRacing" ? (
      <>
        <HorseRacingScoreBoard />
      </>
    ) : (
      <>
        <div className="d-flex flex-center flex-column w-100">
          <div className="rounded-grey-box my-2 px-1 py-1 w-100 small-font">
            <div className="d-flex flex-between">
              <span className="rounded-white-box">
                <MdSportsCricket className="orange-clr fw-800 icon" />
              </span>
              <span className="medium-font text-white fw-600">NZ</span>
              <span className="medium-font text-white">14-2</span>
              <span className="small-font text-white">3.3 ov</span>
              <span className="rounded-black-box text-white px-3 medium-font py-1 fw-600">
                Ball Start
              </span>
              <span className="medium-font text-white fw-600  ">0-0</span>
              <span className="small-font text-white">0.0 ov</span>
              <span className="medium-font text-white fw-600">IND</span>
              <span className="rounded-white-box">
                <IoTennisballOutline className="orange-clr fw-800 icon" />
              </span>
            </div>
          </div>
          <div className="black-score-box w-100 text-white small-font">
            <div className="d-flex flex-column w-100">
              <div className="d-flex flex-between px-2">
                <div className="flex-column w-100 small-font">
                  <div className="row">
                    <div className="col-2">Batsmen</div>
                    <div className="col-2">R</div>
                    <div className="col-2">B</div>
                    <div className="col-2">4s</div>
                    <div className="col-2">6s</div>
                    <div className="col-2">SR</div>
                  </div>
                  <div className="hor-white-top my-1"></div>
                  <div className="row">
                    <div className="col-2">David Malan</div>
                    <div className="col-2">100</div>
                    <div className="col-2">10</div>
                    <div className="col-2">2</div>
                    <div className="col-2">0</div>
                    <div className="col-2">800</div>
                  </div>

                  <div className="row">
                    <div className="col-2">Ben Stokes*</div>
                    <div className="col-2">0</div>
                    <div className="col-2">4</div>
                    <div className="col-2">0</div>
                    <div className="col-2">0</div>
                    <div className="col-2">0</div>
                  </div>
                </div>
                <div className="grey-box-table flex-column flex-center py-3 w-50 px-2 small-font">
                  <div className="d-flex">
                    <div className="yellow-round text-black px-2 py-1 mx-1">
                      6
                    </div>
                    <div className="dark-blue-round text-white px-2 py-1 mx-1">
                      0
                    </div>
                    <div className="green-round text-white px-2 py-1 mx-1">
                      4
                    </div>
                    <div className="dark-blue-round text-white px-2 py-1 mx-1">
                      0
                    </div>
                    <div className="light-blue-round text-white px-2 py-1 mx-1">
                      2
                    </div>
                    <div className="red-round text-white px-2 py-1 mx-1">w</div>
                  </div>
                  <div className="medium-font fw-600 pt-3 text-white">
                    CRR.6.50
                  </div>
                </div>
                <div className="flex-column w-100 small-font">
                  <div className="row ps-2">
                    <div className="col-2">Bowler</div>
                    <div className="col-2">O</div>
                    <div className="col-2">M</div>
                    <div className="col-2">R</div>
                    <div className="col-2">W</div>
                    <div className="col-2">ECO</div>
                  </div>
                  <div className="hor-white-top my-1"></div>
                  <div className="row ps-2">
                    <div className="col-2">Kyle Jamieson</div>
                    <div className="col-2">1.3</div>
                    <div className="col-2">0</div>
                    <div className="col-2">20</div>
                    <div className="col-2">1</div>
                    <div className="col-2">4.00</div>
                  </div>

                  <div className="row ps-2">
                    <div className="col-2">Ben Stokes*</div>
                    <div className="col-2">0</div>
                    <div className="col-2">4</div>
                    <div className="col-2">0</div>
                    <div className="col-2">0</div>
                    <div className="col-2">0</div>
                  </div>
                </div>
              </div>
              <div className="hor-white-top my-1">
                <div className="d-flex flex-between px-2 my-1">
                  <div>63%</div>
                  <progress
                    value="63"
                    max="100"
                    className="w-100 mx-1"
                  ></progress>
                  <div>36%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
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
    { header: "", field: "watch" },
    { header: "Date & Time", field: "date" },
    { header: "Matches/ID", field: "match" },
    ...(match !== "HorseRacing"
      ? [{ header: "Series Name/ID", field: "series" }]
      : []),
    {
      header: <div className="flex-center">Live Scoreboard</div>,
      field: "live",
    },
    { header: <div className="flex-end">Action</div>, field: "action" },
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
        <div class="d-flex mt-1 flex-end">
          <div onClick={handleBlockModal} className="pointer">
            <MdBlock className="font-20 grey-clr" />
          </div>
          <div onClick={handleDeleteModal} className="pointer">
            <MdDeleteOutline className="font-20 ms-3" />
          </div>
        </div>
      ),
    },

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
        <div class="d-flex mt-1 flex-end">
          <div onClick={handleBlockModal} className="pointer">
            <MdBlock className="font-20 grey-clr" />
          </div>
          <div onClick={handleDeleteModal} className="pointer">
            <MdDeleteOutline className="font-20 ms-3" />
          </div>
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
        <div class="d-flex mt-1 flex-end">
          <div onClick={handleBlockModal} className="pointer">
            <MdBlock className="font-20 grey-clr" />
          </div>
          <div onClick={handleDeleteModal} className="pointer">
            <MdDeleteOutline className="font-20 ms-3" />
          </div>
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
      live: (
        <div className="d-flex flex-center">
          {/* <img src={Images.cricket} alt="cricket" className="match-img"/> */}
        </div>
      ),
      action: (
        <div class="d-flex mt-1 flex-end">
          <div onClick={handleBlockModal} className="pointer">
            <MdBlock className="font-20 grey-clr" />
          </div>
          <div onClick={handleDeleteModal} className="pointer">
            <MdDeleteOutline className="font-20 ms-3" />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="p-1">
      {/* <div className="d-flex flex-between">
        <div className="mb-2 pointer large-font" onClick={() => navigate(-1)}>
          <span className="grey-clr">
            Sports <span className="mx-1 font-20">{">"}</span>
          </span>
          <span className="grey-clr">{vendor}</span>
          <span className="grey-clr">
            <span className="mx-1 font-20 grey-clr">{">"}</span>
            {provider}
          </span>
          <span>
            <span className="mx-1 font-20">{">"}</span>
            <span className="fw-800">{match}</span>
          </span>
        </div>

        <div className="medium-font">
          <span
            className="white-bg rounded-pill me-4 px-3 grey-border hover-orange-clr py-1 pointer"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="me-2" />
            Back
          </span>
          Total P/L : <span className="green-clr mx-1">20000</span>
        </div>
      </div> */}

      <div>
        <Table columns={cols} data={data} itemsPerPage={5} />
      </div>

      <BlockPopup
        show={showBlockModal}
        setShow={setShowBlockModal}
        title={"Match"}
      />
      <DeletePopup
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        title={"Match"}
      />
    </div>
  );
};

export default CricketScoreboard;
