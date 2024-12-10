import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/Table";
import { MdLoop } from "react-icons/md";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";

function DeletedBetHistory() {
  const [activeSport, setActiveSport] = useState("All");
  const handleSportClick = (sport) => {
    setActiveSport(activeSport === sport ? null : sport);
  };

  const userOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  const websiteOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

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
          <div className="back-clr">Side: Back</div>
          <div>Odds Rate: 1.50</div>
          <div>B. Amount: 100000</div>
          <div>B. ID: 11023843754858</div>
        </div>
      ),
      back: <div className="back-btn">10000000</div>,
      lay: <div className="lay-btn">10000000</div>,
      status: (
        <div>
          <div className="red-btn">Deleted</div>
          <div className="flex-around mt-2">
            <MdLoop size={20} className="red-font" />
          </div>
        </div>
      ),
      rowColor: "red-font",
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
          <div className="lay-clr">Side: Lay</div>
          <div>Odds Rate: 1.50</div>
          <div>B. Amount: 100000</div>
          <div>B. ID: 11023843754858</div>
        </div>
      ),
      back: <div className="back-btn">10000000</div>,
      lay: <div className="lay-btn">10000000</div>,
      status: (
        <div>
          <div className="red-btn">Deleted</div>
          <div className="flex-around mt-2">
            <MdLoop size={20} className="red-font" />
          </div>
        </div>
      ),
      rowColor: "red-font",
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
          <div className="red-btn">Deleted</div>
          <div className="flex-around mt-2">
            <MdLoop size={20} className="red-font" />
          </div>
        </div>
      ),
      rowColor: "red-font",
    },
  ];
  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="yellow-font mb-0">Deleted Bet History</h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
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
      <div className="row w-75 mb-3">
        <div className="col flex-column">
          <label className="black-text4 small-font mb-1">From</label>
          <input className="input-css2 small-font" type="date" />
        </div>
        <div className="col flex-column">
          <label className="black-text4 small-font mb-1">To</label>
          <input className="input-css2 small-font" type="date" />
        </div>
        <div className="col flex-column">
          <label className="black-text4 small-font mb-1">User Name</label>
          <Select
            className="small-font"
            options={userOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
          />
        </div>
        <div className="col flex-column">
          <label className="black-text4 small-font mb-1">Website Name</label>
          <Select
            className="small-font"
            options={websiteOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
          />
        </div>
        <div className="col flex-column d-flex align-items-end justify-content-end">
          <button className="w-100 saffron-btn2 small-font">Submit</button>
        </div>
      </div>
      <Table
        columns={BET_HISTORY_COLUMNS}
        data={BET_HISTORY_DATA}
        itemsPerPage={2}
        rowColor={(row) => row?.rowColor}
      />
    </div>
  );
}

export default DeletedBetHistory;
