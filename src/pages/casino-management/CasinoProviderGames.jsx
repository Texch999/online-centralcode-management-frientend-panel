import React from "react";
import { useNavigate, useParams } from "react-router";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/Table";
import { MdBlockFlipped, MdOutlineRemoveRedEye } from "react-icons/md";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const CasinoProviderGames = () => {
  const { provider, gamename } = useParams();
  const navigation = useNavigate();
  const handleMatchClick = (matchName) => {
    navigation(
      `/management-casino-provider/${encodeURIComponent(
        provider
      )}/${encodeURIComponent(gamename)}/${encodeURIComponent(matchName)}`
    );
  };

  const CASINO_COLUMNS = [
    { header: "Provider ID/Name", field: "provider", width: "15%" },
    { header: "Game Name", field: "game_name", width: "10%" },
    { header: "Market Id", field: "market_id", width: "10%" },
    { header: "Table Number", field: "table_number", width: "10%" },
    { header: "P/L", field: "pl", width: "10%" },
    { header: "Status", field: "status", width: "4%" },
  ];

  const CASINO_DATA = [
    {
      provider: (
        <div>
          <div>Ezugi</div>
          <div>1234567891234567</div>
        </div>
      ),
      game_name: <div>Roulette</div>,
      market_id: <div>1234567891234567</div>,
      table_number: <div>Table No 1</div>,
      pl: <div className="green-font">5000000</div>,

      status: (
        <div className="w-100 flex-between  pointer">
          <MdOutlineRemoveRedEye
            size={18}
            onClick={() => handleMatchClick("Bet History")}
          />
          <span>
            <MdBlockFlipped size={18} />
          </span>
          <span className="active-btn-table px-1">Live</span>
        </div>
      ),
    },
  ];
  const CASINO_DATA_DUPLICATES = Array(10).fill(CASINO_DATA[0]);

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <div className="d-flex align-items-center">
          <h6 className=" mb-0 pointer" onClick={() => navigation(-2)}>
            <FiChevronLeft size={18} className="yellow-font mb-1" />
            Casino Live Settings
            <span>
              <FiChevronRight /> Casino Providers
            </span>
          </h6>
          <span className="pointer" onClick={() => navigation(-1)}>
            <FiChevronRight />
            {provider}
          </span>
          <span className="yellow-font">
            <FiChevronRight />
            {gamename}
          </span>
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
          itemsPerPage={5}
        />
      </div>
    </div>
  );
};

export default CasinoProviderGames;
