import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdBlock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import { BsEye } from "react-icons/bs";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import { getSportsList } from "../../api/apiMethods";
import { CircleLoader } from "react-spinners";

const MatchesList = () => {
  const navigate = useNavigate();
  const [isActive, setIsACtive] = useState(false);
  const [sportsData, setSportsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGameMatches = (match) => {
    navigate(`/matches-list/${match}`);
  };

  const cols = [
    { header: "S No", field: "sno", width: "8%" },
    { header: "Games", field: "games", width: "40%" },
    { header: "", field: "eye", width: "10%" },
  ];

  const data = sportsData?.map((item, index) => ({
    sno: index + 1,
    games: <div className="pointer">{item?.name}</div>,
    eye: (
      <div
        className="pointer d-flex justify-content-end"
        onClick={() => handleGameMatches(item?.name)}
      >
        <BsEye size={18} className="orange-clr" />
      </div>
    ),
  }));

  //integration
  const getSports = () => {
    setLoading(true);
    getSportsList()
      .then((response) => {
        if (response) {
          setLoading(false);
          console.log(response?.data);
          setSportsData(response?.data);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error?.message);
      });
  };
  useEffect(() => {
    getSports();
  }, []);
  return (
    <div className="">
      <div className="d-flex flex-between mt-3 mb-2">
        <div className="large-font pointer flex-center">
          <span
            className="black- fw-600 large-font"
            onClick={() => navigate(-2)}
          >
            Matches List
          </span>
        </div>
        <div className="small-font flex-between">
          {/* <span
            className="input-css2 rounded-pill me-4 px-3 text-black py-1 flex-center pointer hover-orange-clr"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="me-1 d-flex" />
            Back
          </span> */}
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
        <Table columns={cols} data={data} itemsPerPage={5} />
      )}
      <ConfirmationPopup
        confirmationPopupOpen={isActive}
        setConfirmationPopupOpen={setIsACtive}
        discription={"Are You Sure to Active this Match"}
        submitButton={"Active"}
      />
    </div>
  );
};

export default MatchesList;
