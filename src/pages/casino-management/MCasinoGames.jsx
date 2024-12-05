import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/Table";
import { MdBlockFlipped, MdOutlineRemoveRedEye } from "react-icons/md";
import { LiaPenSolid } from "react-icons/lia";
import { FaRegTrashCan } from "react-icons/fa6";
import { Images } from "../../images";
import { TbArrowsDiagonal } from "react-icons/tb";
import { FiChevronRight } from "react-icons/fi";

const MCasinoGames = () => {
  const [activeBtn, setActiveBtn] = useState("Websites");
  const [fullPoster, setFullPoster] = useState(false);
  const [editPoster, setEditPoster] = useState(false);
  const ACTIVE_BTNS = ["Websites", "Casino Providers"];

  const handleSportClick = (item) => {
    setActiveBtn(activeBtn === item ? null : item);
  };

  const CASINO_COLUMNS = [
    { header: "Games", field: "games", width: "25%" },
    { header: "P/L", field: "pl", width: "35%" },
    { header: "Status", field: "status", width: "10%" },
  ];
  const CASINO_DATA = [
    {
      games: <div>Roulette</div>,
      pl: <div className="green-font">5000000</div>,

      status: (
        <div className="w-100 flex-between  pointer">
          <MdOutlineRemoveRedEye size={18} />
          <span>
            <MdBlockFlipped size={18} />
          </span>
          <span className="active-btn-table">Live</span>
        </div>
      ),
    },
  ];
  const CASINO_DATA_DUPLICATES = Array(10).fill(CASINO_DATA[0]);
 

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className=" mb-0">
          Casino Live Settings <FiChevronRight /> Website <FiChevronRight />{" "}
          <span className="yellow-font">T Casino Park</span>{" "}
        </h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>

      <div className="mt-4 ">
        <Table
          columns={CASINO_COLUMNS}
          data={CASINO_DATA_DUPLICATES}
          itemsPerPage={5}
        />
      </div>
    </div>
  );
};

export default MCasinoGames;
