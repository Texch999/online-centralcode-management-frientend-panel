import { FaSearch } from "react-icons/fa";
import Table from "../../../components/Table";
import { MdBlockFlipped } from "react-icons/md";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import ConfirmationPopup from "../../popups/ConfirmationPopup";
import { useState } from "react";

const MCasinoGames = () => {
  const [onBlockPopup, setOnBlockPopup] = useState(false)
  const navigation = useNavigate();
  const { gamename } = useParams();


  const handleMatchClick = (matchName) => {
    navigation(
      `/management-casino/${encodeURIComponent(gamename)}/${encodeURIComponent(
        matchName
      )}`
    );
  };

  const CASINO_COLUMNS = [
    { header: "Games", field: "games", width: "15%" },
    { header: <div className="text-center">P/L</div>, field: "pl", width: "40%" },
    { header: <div className="text-center">Status</div>, field: "status", width: "3%" },
  ];
  const CASINO_DATA = [
    {
      games: <div>Roulette</div>,
      pl: <div className="green-font text-center">5000000</div>,

      status: (
        <div className="w-100 flex-between  pointer">
          <BsEye size={18} onClick={() => handleMatchClick("Roulette")} />
          <MdBlockFlipped size={18} onClick={() => setOnBlockPopup(true)}/>
          <span className="active-btn-table">Live</span>
        </div>
      ),
    },
  ];
  const CASINO_DATA_DUPLICATES = Array(10).fill(CASINO_DATA[0]);

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <div className="d-flex align-items-center">
          <h6
            className="mb-0 text-center pointer medium-font"
            onClick={() => navigation(-1)}
          >
            <FiChevronLeft size={18} className="yellow-font mb-1 medium-font" />
            Casino Live Settings<FiChevronRight /> Website <FiChevronRight />
          </h6>
          <span className="yellow-font medium-font">{gamename}</span>
        </div>
        <div className="d-flex ">
          <div className="input-pill d-flex align-items-center rounded-pill px-2">
            <FaSearch size={16} className="grey-clr me-2" />
            <input className="small-font all-none" placeholder="Search..." />
          </div>
          <div className="small-font mt-2 ms-2">
            P/L : <span className="white-btn2 green-font">10000000</span>
          </div>
        </div>
      </div>

      <div className="mt-4 ">
        <Table
          columns={CASINO_COLUMNS}
          data={CASINO_DATA_DUPLICATES}
          itemsPerPage={9}
        />
      </div>
      <ConfirmationPopup
        confirmationPopupOpen={onBlockPopup}
        setConfirmationPopupOpen={() => setOnBlockPopup(false)}
        discription={"are you sure you want to block this Website?"}
        submitButton={"Block"}
      />
    </div>
  );
};

export default MCasinoGames;
