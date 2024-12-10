import React, { useState } from "react";
import Table from "../../components/Table";
import {
  MdBlock,
  MdDeleteOutline,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import FancyCricket from "./FancyCricket";
import CricketBookmaker from "./CricketBookmaker";
import CricketLiveStreaming from "./CricketLiveStreaming";
import CricketScoreboard from "./CricketScoreboard";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import { FaRegTrashCan } from "react-icons/fa6";

const Cricket = () => {
  const navigate = useNavigate();
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
    ) : match === "HorseRacing" ? null : (
      <>
        <div>ICC Women T20 World Cup</div>
        <div>56789012345678900</div>
      </>
    );

  const cols = [
    { header: "", field: "watch", width: "10%" },
    { header: "Date&Time", field: "date" },
    { header: "Matches/ID", field: "match" },
    ...(match !== "HorseRacing"
      ? [{ header: "Series Name/ID", field: "series" }]
      : []),

    {
      header: (
        <div className="row">
          <div className="col-6 flex-end">Back</div>
          <div className="col-6 d-flex">Lay</div>
        </div>
      ),
      field: "back_lay",
    },
    { header: <div className="flex-start">Back/Lay</div>, field: "bl" },
    { header: <div className="flex-start">Action</div>, field: "action" },
  ];

  const data = [
    {
      watch: (
        <div className="inplay-btn w-fit py-1 px-2 white-space">In-Play</div>
      ),
      date: (
        <div className="d-flex flex-column">
          <div className="white-space">21-09-2024</div>
          <div>08:00:00</div>
        </div>
      ),
      match: [matchContent],
      series: [seriesContent],
      back_lay: (
        <div className="d-flex w-100">
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>3.05</span>
              <span>2k</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>4.05</span>
              <span>953k</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>1.35</span>
              <span>1k</span>
            </div>
          </div>
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>1.73</span>
              <span>2k</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>8.02</span>
              <span>4k</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>4.06</span>
              <span>1k</span>
            </div>
          </div>
        </div>
      ),

      bl: (
        <div className="d-flex">
          <div>
            <div>Back</div>
            <div className="my-1">Lay</div>
          </div>
          <div>
            <div className="back-btn-cricket px-2 ms-1">10000000</div>
            <div className="lay-btn-cricket px-2 ms-1 mt-1">30000000</div>
          </div>
        </div>
      ),
      action: (
        <div class="d-flex">
          <MdBlock
            onClick={handleBlockModal}
            size={18}
            className="pointer grey-clr"
          />
          <FaRegTrashCan
            onClick={handleDeleteModal}
            size={18}
            className="ms-2 pointer grey-clr"
          />
        </div>
      ),
    },
    {
      watch: <div className=" mx-2 my-1">Upcoming </div>,
      date: (
        <div className="d-flex flex-column">
          <div>21-09-2024</div>
          <div>08:00:00</div>
        </div>
      ),
      match: [matchContent],
      series: [seriesContent],

      back_lay: (
        <div className="d-flex w-100">
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>3.05</span>
              <span>2k</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>4.05</span>
              <span>953k</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>1.35</span>
              <span>1k</span>
            </div>
          </div>
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>1.73</span>
              <span>2k</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>8.02</span>
              <span>4k</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>4.06</span>
              <span>1k</span>
            </div>
          </div>
        </div>
      ),
      bl: (
        <div className="d-flex">
          <div>
            <div>Back</div>
            <div className="my-1">Lay</div>
          </div>
          <div>
            <div className="back-btn-cricket px-2 ms-1">10000000</div>
            <div className="lay-btn-cricket px-2 ms-1 mt-1">30000000</div>
          </div>
        </div>
      ),
      action: (
        <div class="d-flex">
          <MdBlock
            onClick={handleBlockModal}
            size={18}
            className="pointer grey-clr"
          />
          <FaRegTrashCan
            onClick={handleDeleteModal}
            size={18}
            className="ms-2 pointer grey-clr"
          />
        </div>
      ),
    },

    {
      watch: <div className="my-1 mx-2">Today</div>,
      date: (
        <div className="d-flex flex-column">
          <div>21-09-2024</div>
          <div>08:00:00</div>
        </div>
      ),
      match: [matchContent],
      series: [seriesContent],

      back_lay: (
        <div className="d-flex w-100">
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>5.05</span>
              <span>97k</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>6.05</span>
              <span>2k</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>8.05</span>
              <span>7k</span>
            </div>
          </div>
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>1.75</span>
              <span>8k</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>2.85</span>
              <span>9k</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>3.05</span>
              <span>2k</span>
            </div>
          </div>
        </div>
      ),
      bl: (
        <div className="d-flex">
          <div>
            <div>Back</div>
            <div className="my-1">Lay</div>
          </div>
          <div>
            <div className="back-btn-cricket px-2 ms-1">10000000</div>
            <div className="lay-btn-cricket px-2 ms-1 mt-1">30000000</div>
          </div>
        </div>
      ),
      action: (
        <div class="d-flex">
          <MdBlock
            onClick={handleBlockModal}
            size={18}
            className="pointer grey-clr"
          />
          <FaRegTrashCan
            onClick={handleDeleteModal}
            size={18}
            className="ms-2 pointer grey-clr"
          />
        </div>
      ),
    },
  ];
  return (
    <div className="">
      <div className="d-flex flex-between mt-3 mb-2">
        <div
          className="large-font pointer flex-center"
          onClick={() => navigate(-1)}
        >
          <span className="grey-clr">
            Sports
            <MdKeyboardArrowRight size={18} />
            {vendor}
            <MdKeyboardArrowRight size={18} />
            {provider}
          </span>
          <span className="black-text4">
            <MdKeyboardArrowRight size={18} />
            {match}
          </span>
        </div>
        <div className="small-font flex-between">
          <span
            className="input-css2 rounded-pill me-4 px-3 text-black py-1 flex-center pointer hover-orange-clr"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="me-1 d-flex" />
            Back
          </span>
          Total P/L : <span className="green-clr mx-1">20000</span>
        </div>
      </div>
      {provider === "Odds" && (
        <Table columns={cols} data={data} itemsPerPage={5} />
      )}
      {provider === "Fancy" && <FancyCricket />}
      {provider === "Bookmaker 1" && <CricketBookmaker />}
      {provider === "Bookmaker 2" && <CricketBookmaker />}
      {provider === "Live Streaming" && <CricketLiveStreaming />}
      {provider === "Scoreboard" && <CricketScoreboard />}
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

export default Cricket;
