import React, { useEffect, useState } from "react";
import { IoTrash } from "react-icons/io5";
import { MdBlock, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Table from "../../components/Table";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { getAllMatches, suspendMatchCentral } from "../../api/apiMethods";
import { CircleLoader } from "react-spinners";
import moment from "moment";
import { CgUnblock } from "react-icons/cg";
import { BsEye } from "react-icons/bs";
import SuccessPopup from "../popups/SuccessPopup";
import utcDate from "../../utils/utcDateConversion";
import { customStyles } from "../../components/ReactSelectStyles";
import Select from "react-select";

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

  const handleFancy = (sport, match) => {
    navigate(`/fancy-results/${sport}/${match}`);
  };

  const filterData = matchesData?.filter((item) =>
    item?.eventName?.toLowerCase().includes(search.toLowerCase())
  );

  const selectOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

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
    const localTime=new Date(item?.startDate) 

    let isLive = false;
    if (currentTimeUTC.diff(startDateUTC) > 0) {
      isLive = true;
    }

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
          {moment(localTime).format("YYYY-MM-DD HH:mm")}
        </div>
      ),
      matchid: <div>{item?.id}</div>,
      market: (
        <div>
          {item?.isBookmac === true && "BookMark"}
          {item?.isFancy === true && "Fancy"}
          {item?.isOdds === true && "Odds"}
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

          {item?.isClosed === 2 ? (
            <div className="pointer d-flex">
              <BsEye
                size={18}
                className="orange-clr"
                onClick={() => handleFancy(item?.sportId, item?.id)}
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

          <div className="rust-red-btn w-fit pointer ">Rollback</div>
          {/* <div className="green-dark-bg w-fit pointer">Active</div> */}
        </div>
      ),
    };
  });

  //integration
  const fetchAllMatches = (limit, offset, id) => {
    setLoading(true);
    const params = {
      limit: limit,
      offset: offset,
      id: id,
    };
    console.log(params, "params==>");
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

  const statusId = status === 2 ? 1 : 2;
  const suspendMatch = () => {
    const limit = itemsPerPage;
    const offset = (currentPage - 1) * itemsPerPage;
    const payload = {
      matchId: matchId,
      status: statusId,
    };
    suspendMatchCentral({ sportId: sportId, matchId: matchId }, payload)
      .then((response) => {
        if (response) {
          console.log(response?.data);
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
      });
  };

  const handlePageChange = ({ limit, offset }) => {
    console.log(id);
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

      <div className="white-btn my-2 br-5 py-3 px-2 box-shadow col-12 d-flex flex-between">
        <div className="col-2 flex-column ">
          <label className="black-text4 small-font mb-1">Select Sports</label>
          <Select
            className="small-font"
            options={selectOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
          />
        </div>

        <div className="col-2 flex-column ">
          <label className="black-text4 small-font mb-1">Select Match</label>
          <Select
            className="small-font"
            options={selectOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
          />
        </div>

        <div className="col-2 flex-column ">
          <label className="black-text4 small-font mb-1">Select Market</label>
          <Select
            className="small-font"
            options={selectOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
          />
        </div>

        <div className="col-2 flex-column ">
          <label className="black-text4 small-font mb-1">Select Winner</label>
          <Select
            className="small-font"
            options={selectOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
          />
        </div>

        <div className="align-self-end saffron-btn2 small-font pointer col-2">
          Set Results
        </div>
      </div>

      <div className="d-flex flex-between align-items-center">
        <div className="col-8 col-lg-7 d-flex flex-between my-3">
          <div className="col-3 flex-column me-3">
            <label className="black-text4 small-font mb-1">Sports</label>
            <Select
              className="small-font"
              options={selectOptions}
              placeholder="Select"
              styles={customStyles}
              maxMenuHeight={120}
              menuPlacement="auto"
              classNamePrefix="custom-react-select"
            />
          </div>
          <div className="col-3 flex-column ">
            <label className="black-text4 small-font mb-1">From</label>
            <input className="input-css2 small-font" type="date" />
          </div>
          <div className="col-3 flex-column mx-2">
            <label className="black-text4 small-font mb-1">To</label>
            <input className="input-css2 small-font" type="date" />
          </div>

          <div className="align-self-end saffron-btn2 small-font pointer col-2">
            Submit
          </div>
        </div>

        <div className="col-2 col-lg-2 mt-4">
          <div className="white-btn d-flex align-items-center br-5 px-1">
            <input className="small-font all-none" placeholder="Search..." />
            <FaSearch
              size={16}
              className="grey-clr me-1"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
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
