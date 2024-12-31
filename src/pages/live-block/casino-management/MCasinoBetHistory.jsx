import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Table from "../../../components/Table";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import { SlPencil } from "react-icons/sl";
import ConfirmationPopup from "../../popups/ConfirmationPopup";
import EditBetPopup from "../../risk-management/EditBetPopup";
import Select from "react-select";
import { customStyles } from "../../../components/ReactSelectStyles";
import "../../add-team/style.css";

const MCasinoBetHistory = () => {
  const [onBlockPopup, setOnBlockPopup] = useState(false);
  const [onEditBetPopup, setOnEditBetPopup] = useState(false);

  const selectOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  const { gamename, usergame, bethistory } = useParams();
  console.log(gamename, usergame, bethistory, "==>priya");
  const navigate = useNavigate();
  const BET_HISTORY_COLUMNS = [
    { header: "S. No", field: "sno" },
    { header: "Date & Time/IP Add", field: "dateTime" },
    { header: "User / Market Name", field: "users" },
    { header: "P. ID - Provider Name - T. ID", field: "matchName" },
    { header: "Bet Placed", field: "betPlaced" },
    { header: "Selection ", field: "selection" },
    { header: "P/L", field: "pl" },
    {
      header: <div className="text-center">Status</div>,
      field: "status",
      width: "10%",
    },
  ];
  const BET_HISTORY_DATA = [
    {
      sno: <div>1</div>,
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
      pl: <div className="back-btn">10000000</div>,
      status: (
        <div className="d-flex gap-3 flex-between">
          <div className="d-flex gap-3">
            <SlPencil
              className="pointer"
              size={18}
              onClick={() => setOnEditBetPopup(true)}
            />
            <FaRegTrashCan
              className="pointer"
              size={18}
              onClick={() => setOnBlockPopup(true)}
            />
          </div>
          <div className="green-btn">Settled</div>
        </div>
      ),
    },
    {
      sno: <div>1</div>,
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
      pl: <div className="back-btn">10000000</div>,
      status: (
        <div className="d-flex gap-3 flex-between">
          <div className="d-flex gap-3">
            <SlPencil size={18} />
            <FaRegTrashCan size={18} />
          </div>
          <div className="green-btn">Settled</div>
        </div>
      ),
    },
    {
      sno: <div>1</div>,
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
      pl: <div className="back-btn">10000000</div>,
      status: (
        <div className="d-flex gap-3 flex-between">
          <div className="d-flex gap-3">
            <SlPencil size={18} />
            <FaRegTrashCan size={18} />
          </div>
          <div className="green-btn">Settled</div>
        </div>
      ),
    },
    {
      sno: <div>1</div>,
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
      pl: <div className="back-btn">10000000</div>,
      status: (
        <div className="d-flex gap-3 flex-between">
          <div className="d-flex gap-3">
            <SlPencil size={18} />
            <FaRegTrashCan size={18} />
          </div>
          <div className="green-btn">Settled</div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <div className="d-flex align-items-center">
          <h6 className="mb-0 pointer medium-font" onClick={() => navigate(-3)}>
            <FiChevronLeft size={18} className="yellow-font mb-1" />
            Casino Live Settings
            <FiChevronRight /> website
            <FiChevronRight />
          </h6>
          <span className="pointer medium-font" onClick={() => navigate(-2)}>
            {gamename}
          </span>
          <span className="pointer medium-font" onClick={() => navigate(-1)}>
            <FiChevronRight />
            {usergame}
          </span>
          <span className="yellow-font medium-font">
            <FiChevronRight />
            {bethistory}
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
      <div className="d-flex col">
        <div className=" flex-column me-3 col-3 col-lg-2">
          <label className="black-text4 small-font mb-1">Website</label>
          <Select
            className="small-font"
            options={selectOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
          />
        </div>

        <div className=" flex-column me-3 col-3 col-lg-2">
          <label className="black-text4 small-font mb-1">Table</label>
          <Select
            className="small-font"
            options={selectOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
          />
        </div>
        <div className="col-2 col-lg-1 d-flex align-items-end">
          <button className="w-75 saffron-btn2 small-font px-3">
            Submit
          </button>
        </div>
      </div>

      <div className="mt-4 ">
        <Table
          columns={BET_HISTORY_COLUMNS}
          data={BET_HISTORY_DATA}
          itemsPerPage={3}
        />
      </div>

      <EditBetPopup
        editBetPopupOpen={onEditBetPopup}
        setEditBetPopupOpen={() => setOnEditBetPopup(false)}
      />

      <ConfirmationPopup
        confirmationPopupOpen={onBlockPopup}
        setConfirmationPopupOpen={() => setOnBlockPopup(false)}
        discription={"are you sure you want to delete this Bet?"}
        submitButton={"Delete"}
      />
    </div>
  );
};

export default MCasinoBetHistory;
