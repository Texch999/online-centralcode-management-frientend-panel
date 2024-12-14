import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdLoop } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../../../components/Table";
import "../../home/style.css";
import { FaRegTrashCan } from "react-icons/fa6";
import { SlPencil } from "react-icons/sl";
import Select from "react-select";
import { customStyles } from "../../../components/ReactSelectStyles";
import "../../add-team/style.css";
import ConfirmationPopup from "../../popups/ConfirmationPopup";
import EditBetPopup from "../../risk-management/EditBetPopup";

const UsersMatchPl = () => {
  const [deleteBetModal, setDeleteBetModal] = useState(false);
  const [editBetPopupOpen, setEditBetPopupOpen] = useState(false);
  const navigate = useNavigate();
  const { matchName, role, userDetails } = useParams();

  const allOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  const cols = [
    { header: "Date & Time", field: "date", width: "15%" },
    { header: "User/Market Name", field: "user" },
    { header: "Game Name-M/match ID", field: "matchid" },
    { header: "Bet Placed", field: "bet" },
    { header: "Selection", field: "selection" },
    { header: <div className="flex-center">P/L</div>, field: "pl" },
    { header: <div className="flex-center">Status</div>, field: "status" },
  ];

  const data = [
    {
      date: (
        <div className="d-flex flex-column">
          <div>01-10-2024</div>
          <div>16:11:00</div>
        </div>
      ),
      user: (
        <div className="d-flex flex-column">
          <div>M.Name: T Exchange </div>
          <div>{"User: Srinivas > Ag: Jayanta >"}</div>
          <div>{"Mas: Lokesh > S M: Sangram > "}</div>
          <div>{"S A: Sudheer > Adm: Nani >  "}</div>
        </div>
      ),
      matchid: (
        <div className="d-flex flex-column">
          <div>
            Match: South Africa Women's vs New Zealand Women's (T20 Women's
            World Cup 2024)
          </div>
          <div>Match ID: 11023843754858</div>
          <div>M ID: 1.11045677544</div>
        </div>
      ),
      bet: <div>Odds</div>,
      selection: (
        <div className="d-flex flex-column">
          <div>Selection: South Africa Wo..</div>
          <divc className="back-clr"> Side: Back</divc>
          <div>Odds Rate: 1.50</div>
          <div>B. Amount: 100000</div>
          <div>B. ID: 11023843754858</div>
        </div>
      ),
      pl: (
        <div className="d-flex flex-column flex-center">
          <div className="green-clr mb-4">10000000</div>
          <div>Result: South Africa Wo..</div>
        </div>
      ),
      status: (
        <div className="d-flex flex-column flex-center ">
          <div className="green-btn">settled</div>
          <div className="flex-between my-2 ">
            <SlPencil
              className="text-black font-20 pointer"
              onClick={() => setEditBetPopupOpen(true)}
            />
            <FaRegTrashCan
              className="text-black font-20 ms-3 pointer"
              onClick={() => setDeleteBetModal(true)}
            />
          </div>
        </div>
      ),
    },
    {
      date: (
        <div className="d-flex flex-column dark-orange-clr">
          <div>01-10-2024</div>
          <div>16:11:00</div>
        </div>
      ),
      user: (
        <div className="d-flex flex-column dark-orange-clr">
          <div>M.Name: T Exchange </div>
          <div>{"User: Srinivas > Ag: Jayanta >"}</div>
          <div>{"Mas: Lokesh > S M: Sangram > "}</div>
          <div>{"S A: Sudheer > Adm: Nani >  "}</div>
        </div>
      ),
      matchid: (
        <div className="d-flex flex-column dark-orange-clr">
          <div>
            Match: South Africa Women's vs New Zealand Women's (T20 Women's
            World Cup 2024)
          </div>
          <div>Match ID: 11023843754858</div>
          <div>M ID: 1.11045677544</div>
        </div>
      ),
      bet: <div className="dark-orange-clr">Odds</div>,
      selection: (
        <div className="d-flex flex-column dark-orange-clr">
          <div>Selection: South Africa Wo..</div>
          <divc className="lay-clr"> Side: Lay</divc>
          <div>Odds Rate: 1.50</div>
          <div>B. Amount: 100000</div>
          <div>B. ID: 11023843754858</div>
        </div>
      ),
      pl: <div className="mb-4 flex-center dark-orange-clr">10000000</div>,
      status: (
        <div className="d-flex flex-column flex-center ">
          <div className="red-btn">Deleted</div>
          <div className="flex-between my-2 ">
            <MdLoop className="dark-orange-clr font-20 pointer" />
          </div>
        </div>
      ),
    },

    {
      date: (
        <div className="d-flex flex-column orange-clr">
          <div>01-10-2024</div>
          <div>16:11:00</div>
        </div>
      ),
      user: (
        <div className="d-flex flex-column orange-clr">
          <div>M.Name: T Exchange </div>
          <div>{"User: Srinivas > Ag: Jayanta >"}</div>
          <div>{"Mas: Lokesh > S M: Sangram > "}</div>
          <div>{"S A: Sudheer > Adm: Nani >  "}</div>
        </div>
      ),
      matchid: (
        <div className="d-flex flex-column orange-clr">
          <div>
            Match: South Africa Women's vs New Zealand Women's (T20 Women's
            World Cup 2024)
          </div>
          <div>Match ID: 11023843754858</div>
          <div>M ID: 1.11045677544</div>
        </div>
      ),
      bet: <div className="orange-clr">Odds</div>,
      selection: (
        <div className="d-flex flex-column orange-clr">
          <div>Selection: South Africa Wo..</div>
          <divc className="lay-clr"> Side: Lay</divc>
          <div>Odds Rate: 1.50</div>
          <div>B. Amount: 100000</div>
          <div>B. ID: 11023843754858</div>
        </div>
      ),
      pl: <div className="mb-4 flex-center orange-clr">10000000</div>,
      status: (
        <div className="d-flex flex-column flex-center ">
          <div className="orange-btn2">Edited</div>
        </div>
      ),
    },
    {
      date: (
        <div className="d-flex flex-column">
          <div>01-10-2024</div>
          <div>16:11:00</div>
        </div>
      ),
      user: (
        <div className="d-flex flex-column">
          <div>M.Name: T Exchange </div>
          <div>{"User: Srinivas > Ag: Jayanta >"}</div>
          <div>{"Mas: Lokesh > S M: Sangram > "}</div>
          <div>{"S A: Sudheer > Adm: Nani >  "}</div>
        </div>
      ),
      matchid: (
        <div className="d-flex flex-column">
          <div>
            Match: South Africa Women's vs New Zealand Women's (T20 Women's
            World Cup 2024)
          </div>
          <div>Match ID: 11023843754858</div>
          <div>M ID: 1.11045677544</div>
        </div>
      ),
      bet: <div>Odds</div>,
      selection: (
        <div className="d-flex flex-column">
          <div>Selection: South Africa Wo.. Side: Back</div>
          <div>Odds Rate: 1.50</div>
          <div>B. Amount: 100000</div>
          <div>B. ID: 11023843754858</div>
        </div>
      ),
      pl: (
        <div className="d-flex flex-column flex-center">
          <div className="green-clr mb-4">10000000</div>
          <div>Result: South Africa Wo..</div>
        </div>
      ),
      status: (
        <div className="d-flex flex-column flex-center ">
          <div className="green-btn">settled</div>
          <div className="flex-between my-2 ">
            <SlPencil className="text-black font-20 pointer" />
            <FaRegTrashCan className="text-black font-20 ms-3 pointer" />
          </div>
        </div>
      ),
    },

    {
      date: (
        <div className="d-flex flex-column orange-clr">
          <div>01-10-2024</div>
          <div>16:11:00</div>
        </div>
      ),
      user: (
        <div className="d-flex flex-column orange-clr">
          <div>M.Name: T Exchange </div>
          <div>{"User: Srinivas > Ag: Jayanta >"}</div>
          <div>{"Mas: Lokesh > S M: Sangram > "}</div>
          <div>{"S A: Sudheer > Adm: Nani >  "}</div>
        </div>
      ),
      matchid: (
        <div className="d-flex flex-column orange-clr">
          <div>
            Match: South Africa Women's vs New Zealand Women's (T20 Women's
            World Cup 2024)
          </div>
          <div>Match ID: 11023843754858</div>
          <div>M ID: 1.11045677544</div>
        </div>
      ),
      bet: <div className="orange-clr">Odds</div>,
      selection: (
        <div className="d-flex flex-column orange-clr">
          <div>Selection: South Africa Wo.. Side: Back</div>
          <div>Odds Rate: 1.50</div>
          <div>B. Amount: 100000</div>
          <div>B. ID: 11023843754858</div>
        </div>
      ),
      pl: <div className="mb-4 flex-center orange-clr">10000000</div>,
      status: (
        <div className="d-flex flex-column flex-center ">
          <div className="orange-btn2">Edited</div>
        </div>
      ),
    },
  ];

  const MATCHWISE_FOOTER = [
    { header: "Total" },
    { header: "" },
    { header: "" },
    { header: "" },
    { header: "" },
    { header: <div className="clr-green">1500000</div> },
    { header: "" },
  ];
  return (
    <div className="d-flex flex-column p-1">
      <div
        className="d-flex medium-font mb-3 align-items-center pointer"
        onClick={() => navigate(-1)}
      >
        <IoIosArrowBack className="orange-clr fw-800 font-20 me-1" />
        <div>Match Wise P/L</div>
        <div onClick={() => navigate(-2)}>
          <IoIosArrowForward className="mx-1" />
          {matchName}
        </div>
        <div onClick={() => navigate(-1)}>
          <IoIosArrowForward className="mx-1" />
          {role}
        </div>
        <div className="orange-clr">
          <IoIosArrowForward className="mx-1" />
          {userDetails}
        </div>
      </div>

      <div className="white-bg col-4 radius-10 py-2 px-2 border-grey flex-between small-font">
        Users P/L
        <span className="green-clr">500000</span>
      </div>

      <div className="d-flex w-100 my-2 align-items-center">
        <div className="flex-column pe-2 small-font col-2">
          <label className="mb-1">Bet Placed</label>
          <Select
            className="small-font"
            options={allOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
          />
        </div>

        <div className="saffron-btn2 align-self-end small-font col-2 pointer">
          Submit
        </div>
      </div>

      <Table
        columns={cols}
        data={data}
        itemsPerPage={3}
        footer={MATCHWISE_FOOTER}
      />

      <ConfirmationPopup
        confirmationPopupOpen={deleteBetModal}
        setConfirmationPopupOpen={() => setDeleteBetModal(false)}
        discription={"are you sure you want to delete this Promotion"}
        submitButton={"Delete"}
      />

      <EditBetPopup
        editBetPopupOpen={editBetPopupOpen}
        setEditBetPopupOpen={setEditBetPopupOpen}
      />
    </div>
  );
};

export default UsersMatchPl;
