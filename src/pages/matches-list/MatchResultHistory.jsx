import React, { useState } from "react";
import { CircleLoader } from "react-spinners";
import Table from "../../components/Table";
import { Spinner } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MatchResultHistory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const cols = [
    { header: "S No", field: "sno" },
    { header: "Date", field: "date" },
    { header: "Upcoming Matches", field: "games" },
    { header: "MatchId", field: "matchid" },
    { header: "Market", field: "market" },
    { header: "Winner", field: "winner" },
    { header: "IP", field: "ip" },
    { header: "Status", field: "status" },
    { header: "Profit & Loss", field: "pl" },
  ];

  const data = [
    {
      sno: 1,
      games: (
        <div className="pointer d-flex gap-2">
          <div>event name</div>
        </div>
      ),
      date: <div className="pointer d-flex ">2025-05-08</div>,
      matchid: <div>1</div>,
      market: <div>Bookmaker</div>,
      winner: <div>-</div>,
      ip: <div>-</div>,
      status: (
        <div>
          <div className="red-clr gap-1 white-space align-items-center">
            <span className="round-red-dot mx-1"></span>Blocked
          </div>
        </div>
      ),
      pl: <div className="dark-orange-clr">0</div>,
    },
  ];
  return (
    <div>
      <div className="d-flex flex-between mt-1 mb-2 align-items-center">
        <div className=" large-font fw-600 yellow-font">Sport Matches Results History</div>
        <div className="small-font flex-between">
          <span
            className="input-css2 rounded-pill me-1 px-3 text-black py-1 flex-center pointer hover-orange-clr"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="me-1 d-flex" />
            Back
          </span>
        </div>
      </div>
      <div className="d-flex flex-between align-items-center">
        <div className="col-7 col-lg-6 d-flex flex-between my-3">
          <div className="col-4 flex-column ">
            <label className="black-text4 small-font mb-1">From</label>
            <input
              className="input-css2 small-font"
              type="date"
              //   value={fromDate}
              //   onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="col-4 flex-column">
            <label className="black-text4 small-font mb-1">To</label>
            <input
              className="input-css2 small-font"
              type="date"
              //   value={toDate}
              //   onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          <div
            className={`align-self-end saffron-btn2 small-font pointer col-2 ${
              loading ? "disabled-btn" : ""
            }`}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="ms-2">Submit</span>
              </>
            ) : (
              <div>Submit</div>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="d-flex flex-column flex-center mt-10rem align-items-center">
          <CircleLoader color="#3498db" size={40} />
          <div className="medium-font black-font my-3">
            Just a moment...............⏳
          </div>
        </div>
      ) : (
        <Table columns={cols} data={data} />
      )}
    </div>
  );
};

export default MatchResultHistory;
