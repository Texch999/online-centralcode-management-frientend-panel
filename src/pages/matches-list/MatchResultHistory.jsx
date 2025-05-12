import React, { useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";
import Table from "../../components/Table";
import { Spinner } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getOldMatchesHistory } from "../../api/apiMethods";
import { useLocation, useParams } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import moment from "moment";

const MatchResultHistory = () => {
  const { id } = useParams();
  const location = useLocation();
  const match = location?.state?.match;

  console.log(id, "paramsss");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [matchData, setMatchData] = useState([]);
  const [error, setError] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [totalRecords, setTotalRecords] = useState(null);
  const itemsPerPage = 4;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const [currentPage, setCurrentPage] = useState(page);
  const [dateError, setDateError] = useState("");

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

  const data = matchData?.map((item, index) => ({
    sno: index + 1,
    games: (
      <div className="pointer d-flex flex-column gap-2">
        <div>{item?.competitionName}</div>
        <div>{item?.eventName}</div>
      </div>
    ),
    date: (
      <div className="pointer d-flex ">
        {moment(item?.startDate).format("hh-mm A")}
      </div>
    ),
    matchid: <div>{item?.id}</div>,
    market: (
      <div>
        {[
          item?.isBookmac === true && "BookMaker",
          item?.isFancy === true && "Fancy",
          item?.isOdds === true && "Odds",
        ]
          .filter(Boolean)
          .join(", ") || "-"}
      </div>
    ),
    winner: <div>{item?.winningTeam}</div>,
    ip: <div>{item?.ip}</div>,
    status: (
      <div>
        {item?.isClosed === 1 ? (
          <div className="red-clr gap-1 white-space align-items-center">
            <span className="mx-1"></span>Closed
          </div>
        ) : (
          <div className="red-clr gap-1 white-space align-items-center">
            <span className=" mx-1"></span>Not Closed
          </div>
        )}
      </div>
    ),
    pl: <div className="dark-orange-clr">{item?.totalpl}</div>,
  }));

  const fetchMatchesHistory = (limit, offset, id, startDate, endDate) => {
    setLoading(true);
    const params = {
      limit: limit,
      offset: offset,
      id: id,
      startDate: startDate,
      endDate: endDate,
    };
    getOldMatchesHistory(params)
      .then((response) => {
        setLoading(false);
        if (response) {
          setMatchData(response?.list);
          setTotalRecords(response?.total);
        }
      })
      .catch((error) => {
        setLoading(false);
        const errMsg = error?.message;
        if (Array.isArray(errMsg)) {
          setError(errMsg);
        } else {
          setError([errMsg]);
        }
      });
  };
  useEffect(() => {
    const limit = itemsPerPage;
    const offset = (currentPage - 1) * itemsPerPage;
    fetchMatchesHistory(limit, offset, id);
  }, [id]);
  const handlePageChange = ({ limit, offset }) => {
    fetchMatchesHistory(limit, offset, id);
  };

  const handleSubmit = () => {
    if (!fromDate || !toDate) {
      setDateError("Please select both From and To dates");
      return;
    }
    setDateError("");

    const limit = itemsPerPage;
    const offset = (currentPage - 1) * itemsPerPage;
    fetchMatchesHistory(limit, offset, id, fromDate, toDate);
  };
  return (
    <div>
      <div className="d-flex flex-between mt-1 mb-2 align-items-center">
        <div className="large-font pointer flex-center">
          <span
            className=" fw-600 large-font grey-clr align-items-center"
            onClick={() => navigate(-1)}
          >
            Matches History
            <MdKeyboardArrowRight size={20} />
          </span>
          <span className="yellow-font" onClick={() => navigate(-1)}>
            {match}
          </span>
        </div>
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
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="col-4 flex-column">
            <label className="black-text4 small-font mb-1">To</label>
            <input
              className="input-css2 small-font"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          <div
            className={`align-self-end saffron-btn2 small-font pointer col-2 ${
              loading ? "disabled-btn" : ""
            }`}
            onClick={handleSubmit}
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
      {dateError && <div className="red-font small-font mb-2">{dateError}</div>}

      {loading ? (
        <div className="d-flex flex-column flex-center mt-10rem align-items-center">
          <CircleLoader color="#3498db" size={40} />
          <div className="medium-font black-font my-3">
            Just a moment...............⏳
          </div>
        </div>
      ) : (
        <Table
          columns={cols}
          data={data}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          totalRecords={totalRecords}
        />
      )}
    </div>
  );
};

export default MatchResultHistory;
