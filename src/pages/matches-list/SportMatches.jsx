import React, { useEffect, useState } from "react";
import { IoTrash } from "react-icons/io5";
import { MdBlock, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Table from "../../components/Table";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import { FaArrowLeft } from "react-icons/fa";
import { getAllMatches, suspendMatchCentral } from "../../api/apiMethods";
import { CircleLoader } from "react-spinners";
import moment from "moment";
import { CgUnblock } from "react-icons/cg";
import { BsEye } from "react-icons/bs";

const SportMatches = () => {
  const navigate = useNavigate();
  const { match, id } = useParams();
  const [isActive, setIsACtive] = useState(false);
  const [matchId, setMatchId] = useState(null);
  const [status, setStatus] = useState(null);
  const [sportId, setSportId] = useState(null);
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

  const cols = [
    { header: "S No", field: "sno", width: "8%" },
    { header: "Upcoming Matches", field: "games", width: "20%" },
    { header: "Date", field: "date", width: "20%" },
    { header: "Status", field: "status", width: "10%" },

    { header: "Profit & Loss", field: "pl", width: "10%" },
    {
      header: <div className="flex-center">Action</div>,
      field: "action",
      width: "10%",
    },
  ];

  const data = matchesData?.map((item, index) => {
    const currentTimeUTC = new Date().toISOString();
    const isLive =
      new Date(item?.startDate).getTime() >= currentTimeUTC &&
      item?.isClosed === 2;

    return {
      sno: index + 1,
      games: (
        <div className="pointer d-flex gap-2">
          <div>{item?.eventName}</div>
          <div>
            {isLive && (
              <div className="green-bg black-font br-5 px-2">Live</div>
            )}
          </div>
        </div>
      ),
      date: (
        <div className="pointer d-flex ">
          {moment(item?.startDate).utc().format("YYYY-MM-DD HH:mm")}
        </div>
      ),
      status: (
        <div>
          {item?.isClosed === 1 ? (
            <div className="red-clr">
              <span className="round-red-dot mx-1"></span>Blocked
            </div>
          ) : (
            <div className="green-clr">
              <span className="round-green-dot mx-1"></span>Active
            </div>
          )}
        </div>
      ),
      pl: <div className="dark-orange-clr">{item?.pl || 0}</div>,
      action: (
        <div className="flex-center gap-2">
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
              className="red-font pointer"
              // onClick={() => handleActiveModal(item?.id, item?.isClosed)}
            />
          )}

          <div className="pointer d-flex ">
            <BsEye size={18} className="orange-clr" />
          </div>
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
          setSuccessPopup(true);
          setTimeout(() => {
            setSuccessPopup(false);
          });
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
      />
    </div>
  );
};

export default SportMatches;
