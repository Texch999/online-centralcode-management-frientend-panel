import React, { useEffect, useState } from "react";
import { IoTrash } from "react-icons/io5";
import { MdBlock, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Table from "../../components/Table";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import {
  announceCricketResults,
  getAllMatches,
  getMatchesList,
  suspendMatchCentral,
} from "../../api/apiMethods";
import { CircleLoader } from "react-spinners";
import moment from "moment";
import { CgUnblock } from "react-icons/cg";
import { BsEye } from "react-icons/bs";
import SuccessPopup from "../popups/SuccessPopup";
import utcDate from "../../utils/utcDateConversion";
import { customStyles } from "../../components/ReactSelectStyles";
import Select from "react-select";
import { useSelector } from "react-redux";
import ErrorComponent from "../../components/ErrorComponent";
import { Spinner } from "react-bootstrap";

const SportMatches = () => {
  const navigate = useNavigate();
  const { match, id } = useParams();

  const [isActive, setIsACtive] = useState(false);
  const [matchId, setMatchId] = useState(null);
  const [status, setStatus] = useState(null);
  const [sportId, setSportId] = useState(null);
  const [message, setMessage] = useState("");
  const handleActiveModal = (id, status, sport) => {
    setIsACtive(!isActive);
    setMatchId(id);
    setStatus(status);
    setSportId(sport);
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalRecords, setTotalRecords] = useState(null);
  const itemsPerPage = 4;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const [currentPage, setCurrentPage] = useState(page);
  const [matchesData, setMatchesData] = useState([]);
  const [successPopup, setSuccessPopup] = useState(false);
  const [search, setSearch] = useState("");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [matchDropdownData, setMatchDropdownData] = useState([]);
  const [selectedMatchId, setSelectedMatchId] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  console.log(matchDropdownData, "=====matchDropdownData");

  const handleFancy = (sport, match) => {
    navigate(`/fancy-results/${sport}/${match}`);
  };

  const matchOptions = matchDropdownData?.map((item) => ({
    value: item.id,
    label: item.eventName,
  }));

  const selectedMatch = matchDropdownData.find(
    (item) => item.id === selectedMatchId
  );

  const teamOptions =
    selectedMatch?.selectOpt?.map((opt) => ({
      value: opt.key,
      label: opt.value,
    })) || [];

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
    {
      header: <div className="flex-center">Action</div>,
      field: "action",
    },
  ];

  const data = matchesData?.map((item, index) => {
    const currentTimeUTC = moment().utc();
    const startDateUTC = moment(item?.startDate);
    // const localTime = new Date(item?.startDate);

    let isLive = false;
    if (currentTimeUTC === startDateUTC) {
      isLive = true;
    }
    // if (currentTimeUTC.diff(startDateUTC) > 0) {
    //   isLive = true;
    // }

    return {
      sno: index + 1,
      games: (
        <div className="pointer d-flex gap-2">
          <div>{item?.eventName}</div>
          <div>
            {isLive && <div className="green-bg black-font px-2">Live</div>}
          </div>
        </div>
      ),
      date: (
        <div className="pointer d-flex ">
          {moment(item?.startDate).format("YYYY-MM-DD HH:mm:ss")}
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
            .join(", ")}
        </div>
      ),
      winner: <div>-</div>,
      ip: <div>-</div>,
      status: (
        <div>
          {item?.isClosed === 1 ? (
            <div className="red-clr gap-1 white-space align-items-center">
              <span className="round-red-dot mx-1"></span>Blocked
            </div>
          ) : (
            <div className="green-clr gap-1 align-items-center white-space">
              <span className="round-green-dot mx-1"></span>Active
            </div>
          )}
        </div>
      ),
      pl: <div className="dark-orange-clr">{item?.pl || 0}</div>,
      action: (
        <div className="flex-center gap-3">
          {item?.isFancy === true && (
            <>
              {item?.isClosed === 2 ? (
                <div className="pointer d-flex">
                  <BsEye
                    size={18}
                    className="orange-clr"
                    onClick={() => {
                      handleFancy(item?.sportId, item?.id);
                    }}
                  />
                </div>
              ) : (
                <div className="d-flex">
                  <BsEye
                    size={18}
                    className="orange-clr disabled"
                    title="Access denied"
                  />
                </div>
              )}
            </>
          )}
          {item?.isClosed === 2 ? (
            <CgUnblock
              size={18}
              className="green-font pointer"
              onClick={() =>
                handleActiveModal(item?.id, item?.isClosed, item?.sportId)
              }
            />
          ) : (
            <MdBlock
              size={18}
              className="red-font"
              title="You don't have access to active!"
              // onClick={() => handleActiveModal(item?.id, item?.isClosed)}
            />
          )}

          <div className="rust-red-btn w-fit pointer ">Rollback</div>
          {/* <div className="green-dark-bg w-fit pointer">Active</div> */}
        </div>
      ),
    };
  });

  //integration
  const fetchAllMatches = (limit, offset, id, startDate, endDate) => {
    setLoading(true);
    const params = {
      limit: limit,
      offset: offset,
      id: id,
      startDate: startDate,
      endDate: endDate,
    };

    getAllMatches(params)
      .then((response) => {
        if (response) {
          setLoading(false);
          setMatchesData(response?.list);
          setTotalRecords(response?.total);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error?.message);
      });
  };
  useEffect(() => {
    const limit = itemsPerPage;
    const offset = (currentPage - 1) * itemsPerPage;
    fetchAllMatches(limit, offset, id);
  }, [id]);
  const [dateError, setDateError] = useState("");

  const handleSubmit = () => {
    if (!fromDate || !toDate) {
      setDateError("Please select both From and To dates");
      return;
    }

    const limit = itemsPerPage;
    const offset = (currentPage - 1) * itemsPerPage;
    fetchAllMatches(limit, offset, id, fromDate, toDate);
  };

  const statusId = status === 2 ? 1 : 2;
  const suspendMatch = () => {
    const limit = itemsPerPage;
    const offset = (currentPage - 1) * itemsPerPage;
    const payload = {
      matchId: matchId,
      status: statusId,
    };
    setLoading(true);
    suspendMatchCentral({ sportId: sportId, matchId: matchId }, payload)
      .then((response) => {
        if (response) {
          setLoading(false);
          setMessage(response?.message);
          setSuccessPopup(true);
          setIsACtive(false);
          setTimeout(() => {
            setSuccessPopup(false);
          }, 3000);
          fetchAllMatches(limit, offset, id);
        }
      })
      .catch((error) => {
        setError(error?.message);
        setLoading(false);
      });
  };

  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //announce cricket results
  const announceResults = (match) => {
    if (!selectedMatchId) {
      setFormError("select match");
      return;
    } else if (!selectedTeam) {
      setFormError("select winner team");
      return;
    }
    setFormError("");

    const payload = {
      matchId: match,
      winningName: selectedTeam,
    };
    setIsLoading(true);
    announceCricketResults({ sportId: id, matchId: match }, payload)
      .then((response) => {
        if (response) {
          setIsLoading(false);
          setMessage(response?.message);
          setSuccessPopup(true);
          setTimeout(() => {
            setSuccessPopup(false);
          }, 3000);
          setSelectedMatchId("");
          setSelectedTeam("");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        const errMsg = error?.message;
        if (Array.isArray(errMsg)) {
          setError(errMsg);
        } else {
          setError([errMsg]);
        }
      });
  };

  const fetchSportMatches = () => {
    getMatchesList(id)
      .then((response) => {
        if (response) {
          setMatchDropdownData(response?.list);
        }
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  useEffect(() => {
    fetchSportMatches();
  }, []);

  const handlePageChange = ({ limit, offset }) => {
    fetchAllMatches(limit, offset, id);
  };

  return (
    <div className="">
      <div className="d-flex flex-between mt-1 mb-2 align-items-center">
        <div className="large-font pointer flex-center">
          <span
            className="black- fw-600 large-font grey-clr align-items-center"
            onClick={() => navigate(-1)}
          >
            Matches List
            <MdKeyboardArrowRight size={20} />
          </span>
          <span className="black-text" onClick={() => navigate(-1)}>
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

      {error && <ErrorComponent error={error} />}

      <div className="input-bg my-2 br-5 py-3 px-2 box-shadow col-12 d-flex flex-between">
        <div className="col-4 flex-column ">
          <label className=" black-text4 small-font mb-1">Select Match</label>
          <Select
            className="small-font"
            options={matchOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
            onChange={(selected) => {
              setSelectedMatchId(selected.value);
              setSelectedTeam("");
            }}
          />
        </div>

        <div className="col-4 flex-column mx-2">
          <label className="black-text4 small-font mb-1">Select Winner</label>
          <Select
            className="small-font"
            options={teamOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
            value={
              teamOptions.find((opt) => opt.value === selectedTeam) || null
            }
            onChange={(selected) => setSelectedTeam(selected.value)}
          />
        </div>

        <div
          className={`align-self-end saffron-btn2 small-font pointer col-3 ${
            isLoading ? "disabled-btn" : ""
          }`}
          onClick={() => announceResults(selectedMatchId)}
        >
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="ms-2">Set Results</span>
            </>
          ) : (
            <div>Set Results</div>
          )}
        </div>
      </div>

      {formError && <div className="small-font red-font">{formError}</div>}

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
            className="align-self-end saffron-btn2 small-font pointer col-2"
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
      <ConfirmationPopup
        confirmationPopupOpen={isActive}
        setConfirmationPopupOpen={setIsACtive}
        discription={`Are You Sure want to ${
          status === 2 ? "In-Active" : "Active"
        } this Match`}
        submitButton={` ${status === 2 ? "In-Active" : "Active"}`}
        onSubmit={suspendMatch}
        setSuccessPopup={setSuccessPopup}
        message={message}
        blockLoader={loading}
      />
      <SuccessPopup
        successPopupOpen={successPopup}
        setSuccessPopupOpen={setSuccessPopup}
        discription={message}
      />
    </div>
  );
};

export default SportMatches;
