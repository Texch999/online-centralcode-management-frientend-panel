import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/Table";
import { MdOutlineDelete, MdOutlineModeEditOutline } from "react-icons/md";
import EditBetPopup from "./EditBetPopup";

function LiveBetList() {
  const [activeSport, setActiveSport] = useState("All");
  const [editBetPopupOpen, setEditBetPopupOpen] = useState(false);
  const handleSportClick = (sport) => {
    setActiveSport(activeSport === sport ? null : sport);
  };
  const handleEditBetPopupOpen = () => {
    setEditBetPopupOpen(true);
  };
  const SPORTS_BUTTONS = [
    "All",
    "Toss",
    "Cricket",
    "Cricket/Fancy Bet",
    "Cricket/Fancy 1 Bet",
    "Football",
    "Tennis",
    "Horse Racing",
    "Greyhound Racing",
    "Kabaddi",
    "Casino",
  ];
  const BET_HISTORY_COLUMNS = [
    { header: "Date & Time/IP Add", field: "dateTime" },
    { header: "User / Market Name", field: "users" },
    { header: "M.ID - Game Name - Match.ID", field: "matchName" },
    { header: "Bet Placed", field: "betPlaced" },
    { header: "Selection ", field: "selection" },
    { header: "Back", field: "back" },
    { header: "Lay", field: "lay" },
    { header: "Status", field: "status", width: "10%" },
  ];
  const BET_HISTORY_DATA = [
    {
      dateTime: (
        <div>
          01-10-2024
          <br />
          16:11:00
          <br />
          IP: 157.47.47.187
        </div>
      ),
      users: (
        <div>
          M.Name: T Exchange
          <br />
          User: Srinivas {">"} Ag: Jayanta {">"} <br />
          Mas: Lokesh {">"} S M: Sangram {">"}
          <br />S A: Sudheer {">"} Adm: Nani {">"}
          <br />
          Sup A: Harish {">"} Dir: Sri Lakshmi
        </div>
      ),
      matchName: (
        <div>
          M ID: 1.11045677544
          <br />
          Match: Chennai Super Kings <br /> vs Rajasthan Royals (T20 World Cup)
          <br />
          Match ID: 11023843754858
        </div>
      ),
      betPlaced: <div>Odds</div>,
      selection: (
        <div>
          <div>Selection: Chennai Super Kings</div>
          <div>Side: Back</div>
          <div>Odds Rate: 1.50</div>
          <div>B. Amount: 100000</div>
          <div>B. ID: 11023843754858</div>
        </div>
      ),
      back: <div className="back-btn">10000000</div>,
      lay: <div className="lay-btn">10000000</div>,
      status: (
        <div>
          <div className="green-btn">Settled</div>
          <div className="flex-around mt-2">
            <MdOutlineModeEditOutline
              size={18}
              onClick={handleEditBetPopupOpen}
            />
            <MdOutlineDelete size={18} />
          </div>
        </div>
      ),
    },
    {
      dateTime: (
        <div>
          01-10-2024
          <br />
          16:11:00
          <br />
          IP: 157.47.47.187
        </div>
      ),
      users: (
        <div>
          M.Name: T Exchange
          <br />
          User: Srinivas {">"} Ag: Jayanta {">"} <br />
          Mas: Lokesh {">"} S M: Sangram {">"}
          <br />S A: Sudheer {">"} Adm: Nani {">"}
          <br />
          Sup A: Harish {">"} Dir: Sri Lakshmi
        </div>
      ),
      matchName: (
        <div>
          M ID: 1.11045677544
          <br />
          Match: Chennai Super Kings <br /> vs Rajasthan Royals (T20 World Cup)
          <br />
          Match ID: 11023843754858
        </div>
      ),
      betPlaced: <div>Odds</div>,
      selection: (
        <div>
          <div>Selection: Chennai Super Kings</div>
          <div>Side: Back</div>
          <div>Odds Rate: 1.50</div>
          <div>B. Amount: 100000</div>
          <div>B. ID: 11023843754858</div>
        </div>
      ),
      back: <div className="back-btn">10000000</div>,
      lay: <div className="lay-btn">10000000</div>,
      status: (
        <div>
          <div className="green-btn">Deleted</div>
          <div className="flex-around mt-2">
            <MdOutlineModeEditOutline
              size={18}
              onClick={handleEditBetPopupOpen}
            />
            <MdOutlineDelete size={18} />
          </div>
        </div>
      ),
    },
    {
      dateTime: (
        <div>
          01-10-2024
          <br />
          16:11:00
          <br />
          IP: 157.47.47.187
        </div>
      ),
      users: (
        <div>
          M.Name: T Exchange
          <br />
          User: Srinivas {">"} Ag: Jayanta {">"} <br />
          Mas: Lokesh {">"} S M: Sangram {">"}
          <br />S A: Sudheer {">"} Adm: Nani {">"}
          <br />
          Sup A: Harish {">"} Dir: Sri Lakshmi
        </div>
      ),
      matchName: (
        <div>
          M ID: 1.11045677544
          <br />
          Match: Chennai Super Kings <br /> vs Rajasthan Royals (T20 World Cup)
          <br />
          Match ID: 11023843754858
        </div>
      ),
      betPlaced: <div>Odds</div>,
      selection: (
        <div>
          <div>Selection: Chennai Super Kings</div>
          <div>Side: Back</div>
          <div>Odds Rate: 1.50</div>
          <div>B. Amount: 100000</div>
          <div>B. ID: 11023843754858</div>
        </div>
      ),
      back: <div className="back-btn">10000000</div>,
      lay: <div className="lay-btn">10000000</div>,
      status: (
        <div>
          <div className="green-btn">Edited</div>
          <div className="flex-around mt-2">
            <MdOutlineModeEditOutline
              size={18}
              onClick={handleEditBetPopupOpen}
            />
            <MdOutlineDelete size={18} />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="yellow-font mb-0">Live Bet List - Sports/Casino</h6>
        <div className="d-flex align-items-center">
          <div className="input-pill d-flex align-items-center rounded-pill px-2 me-3">
            <FaSearch size={16} className="grey-clr me-2" />
            <input className="small-font all-none" placeholder="Search..." />
          </div>
          <div className="small-font">
            P/L : <span className="white-btn2 green-font">10000000</span>
          </div>
        </div>
      </div>
      <div className="d-flex small-font pb-3">
        {SPORTS_BUTTONS?.map((sport, index) => (
          <div
            key={index}
            className={`me-3 px-3 ${
              activeSport === sport ? "saffron-btn2" : "white-btn2"
            }`}
            onClick={() => handleSportClick(sport)}
          >
            {sport}
          </div>
        ))}
      </div>
      <div className="row mb-3">
        <div className="col flex-column">
          <label className="black-text4 small-font mb-1">
            Order of Display
          </label>
          <select className="input-css2 small-font">
            <option>Select</option>
          </select>
        </div>
        <div className="col flex-column">
          <label className="black-text4 small-font mb-1">High Value</label>
          <select className="input-css2 small-font">
            <option>Select</option>
          </select>
        </div>
        <div className="col flex-column">
          <label className="black-text4 small-font mb-1">Last</label>
          <select className="input-css2 small-font">
            <option>Select</option>
          </select>
        </div>
        <div className="col flex-column">
          <label className="black-text4 small-font mb-1">Bet Status</label>
          <select className="input-css2 small-font">
            <option>Select</option>
          </select>
        </div>
        <div className="col  flex-column d-flex align-items-end justify-content-end">
          <button className="w-100 saffron-btn2 small-font">Submit</button>
        </div>
      </div>
      <Table
        columns={BET_HISTORY_COLUMNS}
        data={BET_HISTORY_DATA}
        itemsPerPage={5}
      />{" "}
      <EditBetPopup
        editBetPopupOpen={editBetPopupOpen}
        setEditBetPopupOpen={setEditBetPopupOpen}
      />
    </div>
  );
}

export default LiveBetList;
