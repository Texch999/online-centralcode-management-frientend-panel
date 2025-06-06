import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Table from "../../components/Table";
import { BsEye } from "react-icons/bs";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import { getSportsList, getSportsListCentral } from "../../api/apiMethods";
import { CircleLoader } from "react-spinners";
import { MdManageHistory } from "react-icons/md";

const MatchesList = () => {
  const navigate = useNavigate();
  const [isActive, setIsACtive] = useState(false);
  const [sportsData, setSportsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalRecords, setTotalRecords] = useState(null);
  const itemsPerPage = 4;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const [currentPage, setCurrentPage] = useState(page);

  const handleGameMatches = (match, id) => {
    navigate(`/matches-list/${match}/${id}`);
  };

  const handleHistory = (id, match) => {
    navigate(`/matches-result-history/${id}`, {
      state: { match },
    });
  };

  // const cols = [
  //   { header: "S No", field: "sno", width: "8%" },
  //   { header: "Games", field: "games", width: "40%" },
  //   { header: "Games", field: "games", width: "40%" },
  //   {
  //     header: <div className="flex-center">Action</div>,
  //     field: "eye",
  //     width: "5%",
  //   },
  //   {
  //     header: <div className="flex-center">History</div>,
  //     field: "history",
  //     width: "5%",
  //   },
  // ];
  const cols = [
    { header: "S No", field: "sno" },
    { header: "Games", field: "games" },
    { header: "Odds", field: "odds" },
    {
      header: <div className="flex-center">Action</div>,
      field: "eye",
    },
    {
      header: <div className="flex-center">History</div>,
      field: "history",
    },
  ];

  const data = sportsData?.map((item, index) => ({
    sno: index + 1,
    games: <div className="pointer">
      {console.log(item)}
      {item?.name}</div>,
    odds: <div className="pointer"
      onClick={() => navigate(`/central-sports/odds/${item?.name}`)}>
      <BsEye size={18} className="orange-clr" /></div>,
    eye: (
      <div
        className="pointer d-flex flex-center"
        onClick={() => handleGameMatches(item?.name, item?.id)}
      >
        <BsEye size={18} className="orange-clr" />
      </div>
    ),
    history: (
      <div
        className="flex-center pointer"
        onClick={() => handleHistory(item?.id, item?.name)}
      >
        <MdManageHistory size={18} className="orange-clr" />
      </div>
    ),
  }));

  //integration
  const getSports = (limit, offset) => {
    setLoading(true);
    getSportsListCentral({ limit, offset })
      .then((response) => {
        if (response) {
          setLoading(false);
          setSportsData(response?.data);
          setTotalRecords(response?.count);
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
    getSports(limit, offset);
  }, []);

  const handlePageChange = () => {
    const limit = itemsPerPage;
    const offset = (currentPage - 1) * itemsPerPage;
    getSports(limit, offset);
  };
  return (
    <div className="">
      <div className="d-flex flex-between mt-3 mb-2">
        <div className="large-font pointer flex-center">
          <span
            className="yellow-font fw-600 large-font"
            onClick={() => navigate(-2)}
          >
            Matches List
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
        discription={"Are You Sure to Active this Match"}
        submitButton={"Active"}
      />
    </div>
  );
};

export default MatchesList;
