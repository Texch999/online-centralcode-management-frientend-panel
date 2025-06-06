import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import {
  MdBlock,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { getMatchesInSports } from "../../api/apiMethods";
import { useSearchParams } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

const Cricket = () => {
  const navigate = useNavigate();
  const { vendor, provider, match, sportId } = useParams();
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [totalRecords, setTotalRecords] = useState(null);
  const [sportMatchesList, setSportMatchesList] = useState([]);
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const itemsPerPage = 10
  // getMatchesInSports

  const getSportMatchesList = async (sportId, limit, offset) => {
    const data = {
      sport: sportId,
      params: {
        limit,
        offset
      }
    }
    try {
      const response = await getMatchesInSports(data)
      if (response) {
        console.log(response, "==>resposne")
        setSportMatchesList(response?.list)
        setTotalRecords(response?.list)
      }
    } catch (err) {
      setSportMatchesList([])
      console.log(err)
    }
  }

  useEffect(() => {
    const offset = (page - 1) * itemsPerPage
    if (sportId) {
      getSportMatchesList(sportId, itemsPerPage, offset)
    }
  }, [sportId])

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
          <div className="col-6 flex-center">Back</div>
          <div className="col-6 flex-center">Lay</div>
        </div>
      ),
      field: "back_lay",
    },
    { header: <div className="flex-start">Action</div>, field: "action" },
  ];

  const TABLE_DATA = sportMatchesList?.map((match) => {
    // Helper function to render odds for a team
    const renderOdds = (teamOdds) => {
      const odds = teamOdds?.[0]; // Get the first odds object (assuming there's always one)
      return (
        <div className="d-flex w-100">
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>{odds?.back1?.toFixed(2) || '-'}</span>
              <span>{odds?.bkcoun1 > 1000 ? `${(odds.bkcoun1 / 1000).toFixed(1)}k` : odds?.bkcoun1}</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>{odds?.back2?.toFixed(2) || '-'}</span>
              <span>{odds?.bkcoun2 > 1000 ? `${(odds.bkcoun2 / 1000).toFixed(1)}k` : odds?.bkcoun2}</span>
            </div>
            <div className="col d-flex flex-column back-box py-1 px-2 mx-1 text-center">
              <span>{odds?.back3?.toFixed(2) || '-'}</span>
              <span>{odds?.bkcoun3 > 1000 ? `${(odds.bkcoun3 / 1000).toFixed(1)}k` : odds?.bkcoun3}</span>
            </div>
          </div>
          <div className="col-6 flex-between">
            <div className="col d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>{odds?.lay1?.toFixed(2) || '-'}</span>
              <span>{odds?.laycoun1 > 1000 ? `${(odds.laycoun1 / 1000).toFixed(1)}k` : odds?.laycoun1}</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>{odds?.lay2?.toFixed(2) || '-'}</span>
              <span>{odds?.laycoun2 > 1000 ? `${(odds.laycoun2 / 1000).toFixed(1)}k` : odds?.laycoun2}</span>
            </div>
            <div className="col d-flex flex-column lay-box py-1 px-2 mx-1 text-center">
              <span>{odds?.lay3?.toFixed(2) || '-'}</span>
              <span>{odds?.laycoun3 > 1000 ? `${(odds.laycoun3 / 1000).toFixed(1)}k` : odds?.laycoun3}</span>
            </div>
          </div>
        </div>
      );
    };

    return {
      watch: (
        <div className="inplay-btn w-fit py-1 px-2 white-space">In-Play</div>
      ),
      date: (
        <div className="d-flex flex-column">
          <div className="white-space">{match?.openDate}</div>
          <div>{new Date(match?.openDate).toLocaleTimeString()}</div>
        </div>
      ),
      match: (
        <div>
          <div>{match?.eventName}</div>
          <div>{match?.matchId}</div>
        </div>
      ),
      series: match?.compeName,
      back_lay: (
        <div className="d-flex flex-column">
          {/* Team One Odds */}
          {match?.teamOneOdd.length > 0 &&
            <div className="mb-2">
              <div className="font-weight-bold ms-1">{match?.teamOne}</div>
              {renderOdds(match?.teamOneOdd)}
            </div>}

          {/* Team Two Odds */}
          {match?.teamTwoOdd.length > 0 &&
            <div className="mb-2">
              <div className="font-weight-bold ms-1">{match?.teamTwo}</div>
              {renderOdds(match?.teamTwoOdd)}
            </div>}

          {/* Draw Odds (if exists) */}
          {match?.thedraw && match.thedraw.length > 0 && (
            <div>
              <div className="font-weight-bold ms-1">Draw</div>
              {renderOdds(match?.thedraw)}
            </div>
          )}
        </div>
      ),
      action: (
        <div className="d-flex" >
          <FaArrowRight size={23} />
        </div>
      ),
    };
  });


  return (
    <div className="">
      <div className="d-flex flex-between mt-3 mb-2">
        <div className="large-font pointer flex-center">
          <span className="grey-clr" onClick={() => navigate(-2)}>
            Sports
            <MdKeyboardArrowRight size={18} />
            {sportId}
          </span>
          <span onClick={() => navigate(-1)}>
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
          Total P/L : <span className="green-clr mx-1">2000000000</span>
        </div>
      </div>
      <Table columns={cols} data={TABLE_DATA} itemsPerPage={5} />

      {/*{provider === "Odds" && (
        <Table columns={cols} data={data} itemsPerPage={5} />
      )}
      {/* {provider === "Fancy" && <FancyCricket />}
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
      /> */}
    </div>
  );
};

export default Cricket;
