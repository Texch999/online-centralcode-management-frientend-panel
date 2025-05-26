import React, { useEffect, useState } from "react";
import ScrollTable from "./../../components/ScrollTable";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { BsEye } from "react-icons/bs";
import { whiteReactSelect } from "../../components/ReactSelectStyles";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import {
  getFancyResults,
  getSportsListCentral,
  setFancyResults,
  suspendFancymatch,
  suspendFancyResult,
} from "../../api/apiMethods";
import SuccessPopup from "../popups/SuccessPopup";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import { CircleLoader } from "react-spinners";
import Table from "../../components/Table";

const FancyResult = () => {
  const navigate = useNavigate();
  const { sportId, matchId } = useParams();
  const [sportsData, setSportsData] = useState([]);
  const [error, setError] = useState("");
  const [fancyData, setFancyData] = useState([]);
  const [result, setResult] = useState({});
  const [successPopup, setSuccessPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [resultError, setResultError] = useState({});
  const [isActive, setIsACtive] = useState(false);
  const [status, setStatus] = useState(null);
  const [fancy, setFancy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeBtn, setActiveBtn] = useState(0);

  const handleActive = (fancyId, status) => {
    setIsACtive(!isActive);
    setStatus(status);
    setFancy(fancyId);
  };

  const btns = ["Fancy Result", "Declared Fancy"];

  const fancycols = [
    { header: "Sport", field: "sport" },

    { header: "Fancy Name", field: "fname" },
    { header: "Fancy ID", field: "fid" },
    { header: "Match Name", field: "match" },
  ];

  const decdata = fancyData?.declaredFancy?.map((item) => ({
    sport: (
      <div className="d-flex flex-column small-font">
        <div className="mb-1">{fancyData?.matchDetails?.sportName}</div>

        <input
          type="text"
          placeholder="Enter Result"
          className="white-input w-fit"
          value={item?.result || 0}
          readOnly
        />
      </div>
    ),
    fid: (
      <div className="d-flex flex-column small-font">
        <div className="mb-1 ">{item?.fancyId}</div>
      </div>
    ),
    fname: (
      <div className="d-flex flex-column small-font">
        <div className="mb-1">{item?.name}</div>
        {item?.status === 1 ? (
          <div className="green-btn w-fit px-4 pointer">Active</div>
        ) : (
          <div className="rust-red-btn w-fit px-4 pointer">Suspended</div>
        )}
      </div>
    ),
    match: <div>{fancyData?.matchDetails?.eventName}</div>,
  }));

  const cols = [
    { header: "Sport", field: "sport" },
    { header: "Fancy ID", field: "fid" },
    { header: "Fancy Name", field: "fname" },
    { header: "Match Name", field: "match" },
  ];
  const data = fancyData?.fancy?.map((item) => ({
    sport: (
      <div className="d-flex flex-column small-font">
        <div className="mb-1">{fancyData?.matchDetails?.sportName}</div>

        <input
          type="text"
          maxLength={11}
          placeholder="Enter Result"
          className={`white-input w-fit ${status === 2 ? "disabled-btn" : ""}`}
          value={result[item?.fancyId] || ""}
          disabled={item.status === 2}
          onChange={(e) => {
            let inputVal = e.target.value;

            if (!/^\d*\.?\d{0,2}$/.test(inputVal)) return;

            if (/^0\d+/.test(inputVal)) return;

            if (inputVal.startsWith(".")) {
              inputVal = "0" + inputVal;
            }

            if (inputVal === "") {
              setResult((prev) => ({ ...prev, [item.fancyId]: "" }));
              setResultError((prev) => ({ ...prev, [item.fancyId]: "" }));
              return;
            }

            const numericValue = parseFloat(inputVal);

            if (numericValue > 99999999999) {
              setResultError((prev) => ({
                ...prev,
                [item.fancyId]: "Value must be between 0 and 99999999999",
              }));
            } else {
              setResult((prev) => ({ ...prev, [item.fancyId]: inputVal }));
              setResultError((prev) => ({ ...prev, [item.fancyId]: "" }));
            }
          }}
        />

        {resultError[item?.fancyId] && (
          <div className="red-font small-font">
            {resultError[item?.fancyId]}
          </div>
        )}
      </div>
    ),
    fid: (
      <div className="d-flex flex-column small-font">
        <div className="mb-1 ">{item?.fancyId}</div>
        {item?.status === 1 ? (
          <div
            className="px-4 saffron-btn2 w-fit pointer"
            onClick={() => submitFancyResults(item?.fancyId)}
          >
            Set
          </div>
        ) : (
          <div
            className="px-4 saffron-btn2 w-fit disabled-btn"
            // onClick={() => submitFancyResults(item?.fancyId)}
          >
            Set
          </div>
        )}
      </div>
    ),
    fname: (
      <div className="d-flex flex-column small-font">
        <div className="mb-1">{item?.name}</div>
        {item?.status === 1 ? (
          <div
            className="green-btn w-fit px-4 pointer"
            onClick={() => handleActive(item?.fancyId, item?.status)}
          >
            Active
          </div>
        ) : (
          <div
            className="rust-red-btn w-fit px-4 pointer"
            title="You don't have access to active!"
            // onClick={() => handleActive(item?.fancyId, item?.status)}
          >
            Suspended
          </div>
        )}
      </div>
    ),
    match: <div>{fancyData?.matchDetails?.eventName}</div>,
  }));

  const fetchFancyResults = () => {
    setLoading(true);
    getFancyResults(sportId, matchId)
      .then((response) => {
        if (response) {
          setFancyData(response?.records);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error?.message);
      });
  };
  useEffect(() => {
    fetchFancyResults();
  }, []);

  // facny result
  // const submitFancyResults = (fancyId) => {
  //   if (!result) {
  //     setResultError("Please Enter match result");
  //   }
  //   const payload = {
  //     matchId: matchId,
  //     fancy_id: fancyId,
  //     fancy_value: result,
  //   };
  //   setFancyResults({ sportId: sportId, matchId: matchId }, payload)
  //     .then((response) => {
  //       if (response) {
  //         console.log(response?.data);
  //         setMessage(response?.message);
  //         setSuccessPopup(true);
  //         setTimeout(() => {
  //           setSuccessPopup(false);
  //         }, 3000);
  //         setResult("");
  //         setResultError("");

  //         setFancyData((prevData) => {
  //           const newFancy = prevData.fancy?.filter(
  //             (item) => item.fancyId !== fancyId
  //           );
  //           return { ...prevData, fancy: newFancy };
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       setError(error?.message);
  //     });
  // };

  const submitFancyResults = (fancyId) => {
    if (!result[fancyId]) {
      setResultError((prev) => ({
        ...prev,
        [fancyId]: "Please Enter match result",
      }));
      return;
    }

    const payload = {
      matchId: matchId,
      fancy_id: fancyId,
      fancy_value: result[fancyId],
    };

    setFancyResults({ sportId: sportId, matchId: matchId }, payload)
      .then((response) => {
        if (response) {
          setMessage(response?.message);

          setSuccessPopup(true);
          setTimeout(() => {
            setSuccessPopup(false);
          }, 3000);

          setResult((prev) => {
            const updated = { ...prev };
            delete updated[fancyId];
            return updated;
          });
          setResultError((prev) => {
            const updated = { ...prev };
            delete updated[fancyId];
            return updated;
          });

          setFancyData((prevData) => {
            const newFancy = prevData.fancy?.filter(
              (item) => item.fancyId !== fancyId
            );
            return { ...prevData, fancy: newFancy };
          });
          fetchFancyResults(sportId,matchId)
        }
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  const suspendFancy = () => {
    const payload = {
      matchId: matchId,
      fancy_id: fancy,
    };

    suspendFancyResult({ sportId: sportId, matchId: matchId }, payload)
      .then((response) => {
        if (response) {
          setMessage(response?.message);
          setSuccessPopup(true);
          setIsACtive(false);
          setTimeout(() => {
            setSuccessPopup(false);
          }, 3000);
          fetchFancyResults();
        }
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  return (
    <div>
      <div className="d-flex flex-between mb-2">
        <h6 className="my-2 yellow-font large-font">Fancy Results</h6>

        <span
          className="input-css2 rounded-pill me-1 px-2 text-black py-1 flex-center pointer hover-orange-clr small-font"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="me-1 d-flex" />
          Back
        </span>
      </div>

      <div className="d-flex gap-4 mb-3">
        {btns?.map((btn, index) => (
          <div
            key={index}
            className={`${
              activeBtn === index ? "saffron-btn" : "white-btn"
            } br-5 medium-font pointer black-font`}
            onClick={() => setActiveBtn(index)}
          >
            {btn}
          </div>
        ))}
      </div>

      {loading ? (
        <div className="d-flex flex-column flex-center mt-10rem align-items-center">
          <CircleLoader color="#3498db" size={40} />
          <div className="medium-font black-font my-3">
            Just a moment...............⏳
          </div>
        </div>
      ) : (
        <>
          {activeBtn === 0 ? (
            <ScrollTable
              columns={cols}
              data={data}
              tableHeight={"table-80vh"}
            />
          ) : (
            <Table columns={fancycols} data={decdata} />
          )}
        </>
      )}

      <SuccessPopup
        successPopupOpen={successPopup}
        setSuccessPopupOpen={setSuccessPopup}
        discription={message}
      />

      <ConfirmationPopup
        confirmationPopupOpen={isActive}
        setConfirmationPopupOpen={setIsACtive}
        discription={`Are You Sure want to ${
          status === 1 ? "In-Active" : "Active"
        } this Match`}
        submitButton={` ${status === 1 ? "In-Active" : "Active"}`}
        onSubmit={suspendFancy}
        setSuccessPopup={setSuccessPopup}
        message={message}
      />
    </div>
  );
};

export default FancyResult;
