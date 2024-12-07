import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router";
import Table from "../../../components/Table";
import { FaSync } from "react-icons/fa";
import "../../../App.css";
import "../../../index.css";
import "../style.css";
import EditBetPopup from "../../risk-management/EditBetPopup";


const ViewFancyBets = () => {
  const [openEditbetPopup, setOpenEditbetPopup] = useState(false);

  const {sport, fancyType } = useParams();
  const navigate = useNavigate();

  const columns = [
    { header: "S. No", field: "s_no", width: "5%" },
    { header: "Date & Time/IP", field: "date_time", width: "10%" },
    {
      header: "User / Market Name",
      field: "user_market_name",
      width: "15%",
    },
    {
      header: "M. ID- Game Name- Match ID",
      field: "game_match_id",
      width: "15%",
    },
    { header: "Bet Placed", field: "betplaced", width: "8%" },
    { header: "Selection", field: "selection", width: "15%" },
    { header: <div className="text-center">P/L</div>, field: "pl", width: "15%" },
    { header: "Status", field: "status", width: "7%" },
  ];
  
  const fancyTableData = [
    {
      s_no: <span className="">5/3</span>,
      date_time: (
        <div className="">
          <div>01-10-2024</div>
          <div>16:11:00</div>
          <div>IP: 157.47.47.187</div>
        </div>
      ),
      user_market_name: (
        <div className="">
          <div>M.Name: T Exchange</div>
          <div>
            <span className="sky-blu-font">User: Srinivas &gt;</span>Ag: Jayanta
            &gt;
          </div>
          <div>Mas: Lokesh &gt; S M: Sangram &gt; </div>
          <div>S A: Sudheer &gt; Adm: Nani &gt;</div>
          <div>Sup A: Harish &gt; Dir: Sri Lakshmi</div>
        </div>
      ),
      game_match_id: (
        <div className="">
          <div>Match: Chennai Super</div>
          <div>Kings vs Rajasthan</div>
          <div>Royals (T20 World Cup)</div>
          <div>M ID: 1.11045677544</div>
          <div>Match ID: 11023843754858</div>
        </div>
      ),
      betplaced: <span className="">Fancy</span>,
      selection: (
        <div className="">
          <div>Selection: Chennai Super Kings</div>
          <div>10 overs</div>
          <span className="sky-blu-font">Side: 150 Yes</span>
          <div>Odds Rate: 110</div>
          <div className="yellow-font">B. Amount: 100000</div>
          <div>B. ID: 11023843754858</div>
        </div>
      ),
      pl: (
        <div className="fancy-bet-table-td-style text-center">
          <div className="green-font mb-5">10000000</div>
          <div>Result - CSK/10over/155</div>
        </div>
      ),
      status: (
        <div className="d-flex flex-column justify-content-center">
          <button className="green-btn my-3">Live</button>
          <div className="flex-center">
            <GrEdit
              size={20}
              className="me-2 pointer"
              onClick={() => setOpenEditbetPopup(true)}
            />
            <RiDeleteBinLine size={20} className="pointer ms-2" />
          </div>
        </div>
      ),
    },
  
    {
      s_no: <span className="red-font">4</span>,
      date_time: (
        <div className="red-font">
          <div>01-10-2024</div>
          <div>16:11:00</div>
          <div>IP: 157.47.47.187</div>
        </div>
      ),
      user_market_name: (
        <div className="red-font">
          <div>M.Name: T Exchange</div>
          <div>
            <span className="">User: Srinivas &gt;</span>Ag: Jayanta &gt;
          </div>
          <div>Mas: Lokesh &gt; S M: Sangram &gt; </div>
          <div>S A: Sudheer &gt; Adm: Nani &gt;</div>
          <div>Sup A: Harish &gt; Dir: Sri Lakshmi</div>
        </div>
      ),
      game_match_id: (
        <div className="red-font">
          <div>Match: Chennai Super</div>
          <div>Kings vs Rajasthan</div>
          <div>Royals (T20 World Cup)</div>
          <div>M ID: 1.11045677544</div>
          <div>Match ID: 11023843754858</div>
        </div>
      ),
      betplaced: <span className="red-font">Fancy</span>,
      selection: (
        <div className="red-font">
          <div>Selection: Chennai Super Kings</div>
          <div>10 overs</div>
          <span className="">Side: 150 Yes</span>
          <div>Odds Rate: 110</div>
          <div className="">B. Amount: 100000</div>
          <div>B. ID: 11023843754858</div>
        </div>
      ),
      pl: (
        <div className="red-font fancy-bet-table-td-style text-center">
          <div className="mb-5">10000000</div>
          <div>Result - CSK/10over/155</div>
        </div>
      ),
      status: (
        <div className="red-font d-flex flex-column justify-content-center">
          <button className="red-btn my-3">Deleted</button>
          <div className="flex-center">
            <FaSync size={18} className="me-2 pointer" />
          </div>
        </div>
      ),
    },
    {
      s_no: <span className="yellow-font">5/3</span>,
      date_time: (
        <div className="yellow-font">
          <div>01-10-2024</div>
          <div>16:11:00</div>
          <div>IP: 157.47.47.187</div>
        </div>
      ),
      user_market_name: (
        <div className="yellow-font">
          <div>M.Name: T Exchange</div>
          <div>
            <span className="">User: Srinivas &gt;</span>Ag: Jayanta &gt;
          </div>
          <div>Mas: Lokesh &gt; S M: Sangram &gt; </div>
          <div>S A: Sudheer &gt; Adm: Nani &gt;</div>
          <div>Sup A: Harish &gt; Dir: Sri Lakshmi</div>
        </div>
      ),
      game_match_id: (
        <div className="yellow-font">
          <div>Match: Chennai Super</div>
          <div>Kings vs Rajasthan</div>
          <div>Royals (T20 World Cup)</div>
          <div>M ID: 1.11045677544</div>
          <div>Match ID: 11023843754858</div>
        </div>
      ),
      betplaced: <span className="yellow-font">Fancy</span>,
      selection: (
        <div className="yellow-font">
          <div>Selection: Chennai Super Kings</div>
          <div>10 overs</div>
          <span className="yellow-font">Side: 150 Yes</span>
          <div>Odds Rate: 110</div>
          <div className="yellow-font">B. Amount: 100000</div>
          <div>B. ID: 11023843754858</div>
        </div>
      ),
      pl: (
        <div className="yellow-font fancy-bet-table-td-style text-center">
          <div className="mb-5">10000000</div>
          <div>Result - CSK/10over/155</div>
        </div>
      ),
      status: (
        <div className="d-flex flex-column justify-content-center">
          <button className="edit-btn my-3">Edited</button>
        </div>
      ),
    },
    {
      s_no: <span className="">5/3</span>,
      date_time: (
        <div className="">
          <div>01-10-2024</div>
          <div>16:11:00</div>
          <div>IP: 157.47.47.187</div>
        </div>
      ),
      user_market_name: (
        <div className="">
          <div>M.Name: T Exchange</div>
          <div>
            <span className="sky-blu-font">User: Srinivas &gt;</span>Ag: Jayanta
            &gt;
          </div>
          <div>Mas: Lokesh &gt; S M: Sangram &gt; </div>
          <div>S A: Sudheer &gt; Adm: Nani &gt;</div>
          <div>Sup A: Harish &gt; Dir: Sri Lakshmi</div>
        </div>
      ),
      game_match_id: (
        <div className="">
          <div>Match: Chennai Super</div>
          <div>Kings vs Rajasthan</div>
          <div>Royals (T20 World Cup)</div>
          <div>M ID: 1.11045677544</div>
          <div>Match ID: 11023843754858</div>
        </div>
      ),
      betplaced: <span className="">Fancy</span>,
      selection: (
        <div className="">
          <div>Selection: Chennai Super Kings</div>
          <div>10 overs</div>
          <span className="sky-blu-font">Side: 150 Yes</span>
          <div>Odds Rate: 110</div>
          <div className="yellow-font">B. Amount: 100000</div>
          <div>B. ID: 11023843754858</div>
        </div>
      ),
      pl: (
        <div className="fancy-bet-table-td-style text-center">
          <div className="green-font mb-5">10000000</div>
          <div>Result - CSK/10over/155</div>
        </div>
      ),
      status: (
        <div className="d-flex flex-column justify-content-center">
          <button className="green-btn my-3">Live</button>
          <div className="flex-center">
            <GrEdit size={20} className="me-2 pointer" />
            <RiDeleteBinLine size={20} className="pointer ms-2" />
          </div>
        </div>
      ),
    },
    {
      s_no: <span className="">5/3</span>,
      date_time: (
        <div className="">
          <div>01-10-2024</div>
          <div>16:11:00</div>
          <div>IP: 157.47.47.187</div>
        </div>
      ),
      user_market_name: (
        <div className="">
          <div>M.Name: T Exchange</div>
          <div>
            <span className="sky-blu-font">User: Srinivas &gt;</span>Ag: Jayanta
            &gt;
          </div>
          <div>Mas: Lokesh &gt; S M: Sangram &gt; </div>
          <div>S A: Sudheer &gt; Adm: Nani &gt;</div>
          <div>Sup A: Harish &gt; Dir: Sri Lakshmi</div>
        </div>
      ),
      game_match_id: (
        <div className="">
          <div>Match: Chennai Super</div>
          <div>Kings vs Rajasthan</div>
          <div>Royals (T20 World Cup)</div>
          <div>M ID: 1.11045677544</div>
          <div>Match ID: 11023843754858</div>
        </div>
      ),
      betplaced: <span className="">Fancy</span>,
      selection: (
        <div className="">
          <div>Selection: Chennai Super Kings</div>
          <div>10 overs</div>
          <span className="sky-blu-font">Side: 150 Yes</span>
          <div>Odds Rate: 110</div>
          <div className="yellow-font">B. Amount: 100000</div>
          <div>B. ID: 11023843754858</div>
        </div>
      ),
      pl: (
        <div className="fancy-bet-table-td-style text-center">
          <div className="green-font mb-5">10000000</div>
          <div>Result - CSK/10over/155</div>
        </div>
      ),
      status: (
        <div className="d-flex flex-column justify-content-center">
          <button className="green-btn my-3">Live</button>
          <div className="flex-center">
            <GrEdit size={20} className="me-2 pointer" />
            <RiDeleteBinLine size={20} className="pointer ms-2" />
          </div>
        </div>
      ),
    },
  ];
  
  const fancyDeclaredTableData = [
    {
      s_no: <span className="">5/3</span>,
      date_time: (
        <div className="">
          <div>01-10-2024</div>
          <div>16:11:00</div>
          <div>IP: 157.47.47.187</div>
        </div>
      ),
      user_market_name: (
        <div className="">
          <div>M.Name: T Exchange</div>
          <div>
            <span className="sky-blu-font">User: Srinivas &gt;</span>Ag: Jayanta
            &gt;
          </div>
          <div>Mas: Lokesh &gt; S M: Sangram &gt; </div>
          <div>S A: Sudheer &gt; Adm: Nani &gt;</div>
          <div>Sup A: Harish &gt; Dir: Sri Lakshmi</div>
        </div>
      ),
      game_match_id: (
        <div className="">
          <div>Match: Chennai Super</div>
          <div>Kings vs Rajasthan</div>
          <div>Royals (T20 World Cup)</div>
          <div>M ID: 1.11045677544</div>
          <div>Match ID: 11023843754858</div>
        </div>
      ),
      betplaced: <span className="">Fancy</span>,
      selection: (
        <div className="">
          <div>Selection: Chennai Super Kings</div>
          <div>10 overs</div>
          <span className="sky-blu-font">Side: 150 Yes</span>
          <div>Odds Rate: 110</div>
          <div className="yellow-font">B. Amount: 100000</div>
          <div>B. ID: 11023843754858</div>
        </div>
      ),
      pl: (
        <div className="fancy-bet-table-td-style text-center">
          <div className="green-font mb-5">10000000</div>
          <div>Result - CSK/10over/155</div>
        </div>
      ),
      status: (
        <div className="d-flex flex-column justify-content-center">
          <button className="green-btn my-3">Declared</button>
          <div className="flex-center">
            <GrEdit
              size={20}
              className="me-2 pointer"
              onClick={() => setOpenEditbetPopup(true)}
            />
            <RiDeleteBinLine size={20} className="pointer ms-2" />
          </div>
        </div>
      ),
    },
  
    {
      s_no: <span className="">5/3</span>,
      date_time: (
        <div className="">
          <div>01-10-2024</div>
          <div>16:11:00</div>
          <div>IP: 157.47.47.187</div>
        </div>
      ),
      user_market_name: (
        <div className="">
          <div>M.Name: T Exchange</div>
          <div>
            <span className="sky-blu-font">User: Srinivas &gt;</span>Ag: Jayanta
            &gt;
          </div>
          <div>Mas: Lokesh &gt; S M: Sangram &gt; </div>
          <div>S A: Sudheer &gt; Adm: Nani &gt;</div>
          <div>Sup A: Harish &gt; Dir: Sri Lakshmi</div>
        </div>
      ),
      game_match_id: (
        <div className="">
          <div>Match: Chennai Super</div>
          <div>Kings vs Rajasthan</div>
          <div>Royals (T20 World Cup)</div>
          <div>M ID: 1.11045677544</div>
          <div>Match ID: 11023843754858</div>
        </div>
      ),
      betplaced: <span className="">Fancy</span>,
      selection: (
        <div className="">
          <div>Selection: Chennai Super Kings</div>
          <div>10 overs</div>
          <span className="sky-blu-font">Side: 150 Yes</span>
          <div>Odds Rate: 110</div>
          <div className="yellow-font">B. Amount: 100000</div>
          <div>B. ID: 11023843754858</div>
        </div>
      ),
      pl: (
        <div className="fancy-bet-table-td-style text-center">
          <div className="green-font mb-5">10000000</div>
          <div>Result - CSK/10over/155</div>
        </div>
      ),
      status: (
        <div className="d-flex flex-column justify-content-center">
          <button className="green-btn my-3">Declared</button>
          <div className="flex-center">
            <GrEdit size={20} className="me-2 pointer" />
            <RiDeleteBinLine size={20} className="pointer ms-2" />
          </div>
        </div>
      ),
    },
  
    {
      s_no: <span className="">5/3</span>,
      date_time: (
        <div className="">
          <div>01-10-2024</div>
          <div>16:11:00</div>
          <div>IP: 157.47.47.187</div>
        </div>
      ),
      user_market_name: (
        <div className="">
          <div>M.Name: T Exchange</div>
          <div>
            <span className="sky-blu-font">User: Srinivas &gt;</span>Ag: Jayanta
            &gt;
          </div>
          <div>Mas: Lokesh &gt; S M: Sangram &gt; </div>
          <div>S A: Sudheer &gt; Adm: Nani &gt;</div>
          <div>Sup A: Harish &gt; Dir: Sri Lakshmi</div>
        </div>
      ),
      game_match_id: (
        <div className="">
          <div>Match: Chennai Super</div>
          <div>Kings vs Rajasthan</div>
          <div>Royals (T20 World Cup)</div>
          <div>M ID: 1.11045677544</div>
          <div>Match ID: 11023843754858</div>
        </div>
      ),
      betplaced: <span className="">Fancy</span>,
      selection: (
        <div className="">
          <div>Selection: Chennai Super Kings</div>
          <div>10 overs</div>
          <span className="sky-blu-font">Side: 150 Yes</span>
          <div>Odds Rate: 110</div>
          <div className="yellow-font">B. Amount: 100000</div>
          <div>B. ID: 11023843754858</div>
        </div>
      ),
      pl: (
        <div className="fancy-bet-table-td-style text-center">
          <div className="green-font mb-5">10000000</div>
          <div>Result - CSK/10over/155</div>
        </div>
      ),
      status: (
        <div className="d-flex flex-column justify-content-center">
          <button className="green-btn my-3">Declared</button>
          <div className="flex-center">
            <GrEdit size={20} className="me-2 pointer" />
            <RiDeleteBinLine size={20} className="pointer ms-2" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <div className="d-flex align-items-center">
          <IoIosArrowBack
            className="yellow-font me-1 cursor-pointer medium-font"
            onClick={() => navigate(-2)}
          />
          <h6 className="m-0 pointer medium-font" onClick={() => navigate(-2)}>
            Sports Live Settings
          </h6>
          <IoIosArrowForward className="mx-2 medium-font" />
          <h6 className="m-0 pointer medium-font" onClick={() => navigate(-1)}>
            {sport}
          </h6>
          <IoIosArrowForward className="yellow-font mx-2 medium-font" />
          <span className="yellow-font medium-font">{fancyType}</span>
        </div>

        <div className="d-flex gap-3">
          <div className="input-pill d-flex align-items-center rounded-pill px-2">
            <FaSearch size={16} className="grey-clr me-2" />
            <input
              className="small-font all-none border-0 outline-none w-100"
              placeholder="Search..."
            />
          </div>
          <div className="d-flex align-items-center">
            <span>P/L:</span>
            <button className="white-btn2 green-font ms-2">10000000</button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-6 d-flex gap-3">
          <div className="col-4">
            <label htmlFor="paymentMethod" className="small-font fw-400 mb-1">
              Bet Placed
            </label>
            <select
              id="paymentMethod"
              className="w-100 small-font rounded input-css2 select-input"
            >
              <option value="1">Option-1</option>
              <option value="2">Option-2</option>
              <option value="3">Option-3</option>
            </select>
          </div>

          <div className="col-4">
            <label htmlFor="paymentMethod" className="small-font fw-400 mb-1">
              Bet Position
            </label>
            <select
              id="paymentMethod"
              className="w-100 small-font rounded input-css2 select-input"
            >
              <option value="1">Option-1</option>
              <option value="2">Option-2</option>
              <option value="3">Option-3</option>
            </select>
          </div>

          <div className="col-2 align-self-end">
            <button
              type="button"
              className="saffron-btn w-100 rounded small-font mb-1"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="mt-3">
        {fancyType === "View Fancy Bets" ? (
          <Table columns={columns} data={fancyTableData} itemsPerPage={3} />
        ) : (
          <Table
            columns={columns}
            data={fancyDeclaredTableData}
            itemsPerPage={3}
          />
        )}
      </div>

      <EditBetPopup editBetPopupOpen={openEditbetPopup} setEditBetPopupOpen={() => setOpenEditbetPopup(false)}/>
    </div>
  );
};

export default ViewFancyBets;
