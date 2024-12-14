import { FaSearch } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { SlPencil } from "react-icons/sl";
import { IoTrashOutline } from "react-icons/io5";
import Table from "./../../components/Table";
import EditBetPopup from "./EditBetPopup";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";
import ConfirmationPopup from "../popups/ConfirmationPopup";

function RiskBetHistory() {
  const [deleteBetModal, setDeleteBetModal] = useState(false);

  const betPlacedOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  const bedPositionOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  const { matchName } = useParams();
  const [editBetPopupOpen, setEditBetPopupOpen] = useState(false);
  const handleEditBetPopupOpen = () => {
    setEditBetPopupOpen(true);
  };

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
        <div className="flex-column flex-center">
          <button className="green-btn px-3">Expo</button>
          <div className="d-flex gap-3 mt-3">
            <SlPencil
              size={18}
              className="black-text pointer"
              onClick={handleEditBetPopupOpen}
            />
            <IoTrashOutline
              size={18}
              className="black-text pointer"
              onClick={() => setDeleteBetModal(true)}
            />
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
        <div className="flex-column flex-center">
          <button className="green-btn px-3">Expo</button>
          <div className="d-flex gap-3 mt-3">
            <SlPencil
              size={18}
              className="black-text pointer"
              onClick={handleEditBetPopupOpen}
            />
            <IoTrashOutline
              size={18}
              className="black-text pointer"
              onClick={() => setDeleteBetModal(true)}
            />
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
        <div className="flex-column flex-center">
          <button className="green-btn px-3">Expo</button>
          <div className="d-flex gap-3 mt-3">
            <SlPencil
              size={18}
              className="black-text pointer"
              onClick={handleEditBetPopupOpen}
            />
            <IoTrashOutline
              size={18}
              className="black-text pointer"
              onClick={() => setDeleteBetModal(true)}
            />
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
        <div className="flex-column flex-center">
          <button className="green-btn px-3">Expo</button>
          <div className="d-flex gap-3 mt-3">
            <SlPencil
              size={18}
              className="black-text pointer"
              onClick={handleEditBetPopupOpen}
            />
            <IoTrashOutline
              size={18}
              className="black-text pointer"
              onClick={() => setDeleteBetModal(true)}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <div className="d-flex align-items-center">
          <h5 className="black-font medium-font mb-0">
            Risk Management - Sports
          </h5>
          <h6 className="d-flex align-items-center medium-font yellow-font mb-0">
            <FiChevronRight /> Risk Bet History({matchName})
          </h6>
        </div>
        <div className="d-flex align-items-center">
          <div className="input-pill d-flex align-items-center rounded-pill px-2">
            <FaSearch size={16} className="grey-clr me-2" />
            <input className="small-font all-none" placeholder="Search..." />
          </div>
          <div className="small-font ms-2">
            P/L : <span className="white-btn2 green-font">10000000</span>
          </div>
        </div>
      </div>
      <div className="col-8 col-lg-6 d-flex pb-3">
        <div className="col-4 flex-column me-3">
          <label className="black-text4 small-font mb-1">Bet Palced</label>
          <Select
            className="small-font"
            options={betPlacedOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
          />
        </div>
        <div className="col-4 flex-column me-3">
          <label className="black-text4 small-font mb-1">Bet Position</label>
          <Select
            className="small-font"
            options={bedPositionOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
          />
        </div>
        <div className="col-2 d-flex align-items-end justify-content-end">
          <button className="w-100 saffron-btn2 small-font">Submit</button>
        </div>
      </div>
      <Table
        columns={BET_HISTORY_COLUMNS}
        data={BET_HISTORY_DATA}
        itemsPerPage={2}
      />
      <EditBetPopup
        editBetPopupOpen={editBetPopupOpen}
        setEditBetPopupOpen={setEditBetPopupOpen}
      />

      <ConfirmationPopup
        confirmationPopupOpen={deleteBetModal}
        setConfirmationPopupOpen={() => setDeleteBetModal(false)}
        discription={"are you sure you want to delete this Promotion"}
        submitButton={"Delete"}
      />
    </div>
  );
}

export default RiskBetHistory;
