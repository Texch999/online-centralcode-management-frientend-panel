import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Table from "../../components/Table";
import { BsEye } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import { MdKeyboardArrowRight } from "react-icons/md";
import {
  getProviders,
  getProvidersById,
  suspendProvider,
} from "../../api/apiMethods";
import { CircleLoader } from "react-spinners";
import SuccessPopup from "../popups/SuccessPopup";

const SportProviders = () => {
  const navigate = useNavigate();
  const { vendor, provider } = useParams();
  const location = useLocation();
  const { vId, mId } = location.state || {};
  const [providersData, setProvidersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [msg, setMsg] = useState("");
  // const handleGameMatches = (match) => {
  //   if (provider === "Odds") {
  //     navigate(`/central-sports/${vendor}/${provider}/${match}`);
  //   } else if (provider === "Fancy") {
  //     navigate(`/central-sports/${vendor}/${provider}/${match}`);
  //   } else if (provider === "Bookmaker 1") {
  //     navigate(`/central-sports/${vendor}/${provider}/${match}`);
  //   } else if (provider === "Bookmaker 2") {
  //     navigate(`/central-sports/${vendor}/${provider}/${match}`);
  //   } else if (provider === "Live Streaming") {
  //     navigate(`/central-sports/${vendor}/${provider}/${match}`);
  //   } else if (provider === "Scoreboard") {
  //     navigate(`/central-sports/${vendor}/${provider}/${match}`);
  //   }
  // };
  const [isActive, setIsACtive] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState(null);
  const [prvId, setPrvId] = useState(null);
  const handleActiveModal = (id, status) => {
    console.log(id, status, "sangrammmmmmmmm");
    setIsACtive(!isActive);
    setPrvId(id);
    setStatus(status);
  };
  const cols = [
    { header: "S No", field: "sno", width: "8%" },
    { header: "Games", field: "games", width: "40%" },
    { header: "Posistion", field: "pos", width: "10%" },

    // { header: "", field: "eye", width: "10%" },
    { header: "Status", field: "status", width: "10%" },

    { header: "Profit&Loss", field: "pl", width: "10%" },
    {
      header: <div className="flex-center">Action</div>,
      field: "action",
      width: "10%",
    },
  ];

  const data = providersData?.map((item, index) => ({
    sno: index + 1,
    games: (
      <div
        className="pointer"
        // onClick={() => handleGameMatches(item?.prvName)}
      >
        {item?.prvName}
      </div>
    ),
    pos: <div className="">{item?.position}</div>,
    status: (
      <div>
        {item?.status === 1 ? (
          <div className="green-clr">
            <span className="round-green-dot mx-1"></span>ON
          </div>
        ) : (
          <div className="red-clr">
            <span className="round-red-dot mx-1"></span>OFF
          </div>
        )}
      </div>
    ),
    pl: <div className="dark-orange-clr">{item?.pnl || 0}</div>,
    action: (
      <div className="flex-center">
        <div
          class="form-check form-switch"
          onClick={() => handleActiveModal(item?.id, item?.status)}
        >
          <input
            class="form-check-input w-40"
            type="checkbox"
            role="switch"
            checked={item?.status === 2}
            id="flexSwitchCheckDefault"
            readOnly
          />
        </div>
      </div>
    ),
  }));

  const fetchProviders = () => {
    setLoading(true);
    getProvidersById(vId, mId)
      .then((response) => {
        if (response) {
          setLoading(false);
          setProvidersData(response?.data);
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
    fetchProviders();
  }, [vId, mId]);

  const statusId = status === 1 ? 2 : 1;

  const blockProvider = () => {
    setLoading(true);
    suspendProvider({ vId, statusId, prvId })
      .then((response) => {
        if (response) {
          setLoading(false);
          setMsg(response?.message);
          setSuccessPopupOpen(true);
          setIsACtive(false);
          setTimeout(() => {
            setSuccessPopupOpen(false);
          }, 3000);
          fetchProviders();
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error?.message);
      });
  };

  return (
    <div>
      <div className="d-flex flex-between mt-3 mb-2">
        <div className="pointer large-font">
          <span className="grey-clr" onClick={() => navigate(-2)}>
            Sports
            <MdKeyboardArrowRight size={20} />
          </span>
          <span className="black-text" onClick={() => navigate(-1)}>
            {vendor}
            <MdKeyboardArrowRight size={20} />
            {provider}
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
      {loading ? (
        <div className="d-flex flex-column flex-center mt-10rem align-items-center">
          <CircleLoader color="#3498db" size={40} />
          <div className="medium-font black-font my-3">
            Just a moment...............⏳
          </div>
        </div>
      ) : (
        <Table columns={cols} data={data} itemsPerPage={10} />
      )}
      <ConfirmationPopup
        confirmationPopupOpen={isActive}
        setConfirmationPopupOpen={setIsACtive}
        discription={`Are You Sure to ${
          status === 1 ? "In-Active" : "Active"
        } this Provider`}
        submitButton={`${status === 1 ? "In-Active" : "Active"}`}
        onSubmit={blockProvider}
        blockLoader={loading}
      />
      <SuccessPopup
        successPopupOpen={successPopupOpen}
        setSuccessPopupOpen={setSuccessPopupOpen}
        discription={msg}
        loader={loading}
      />
    </div>
  );
};

export default SportProviders;
