import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { FaSync } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { SlPencil } from "react-icons/sl";
import Table from "../../../components/Table";
import EditBetPopup from "../../risk-management/EditBetPopup";
import SuccessPopup from "../../popups/ConfirmationPopup";

const columns = [
  { header: "Role/Name", field: "roleName"},
  { header: "Website", field: "website"},
  {
    header: "Sports - Series/Company Name",
    field: "sportsCompanyName"
  },
  { header: "Date & Time", field: "dateTime"},
  { header: "Bet Place", field: "betPlace"},
  { header: "P/L", field: "pl"},
  { header: "IP Address", field: "ipAddress" },
  { header: <div className="text-center">Action</div>, field: "action"},
];

const BetHistory = () => {
  const [editBetPopupOpen, setEditBetPopupOpen] = useState(false);
  const [onDeleteBetpopup, setOnDeleteBetpopup] = useState(false);

  const handleEditBetPopupOpen = () => {
    setEditBetPopupOpen(true);
  };

  const data = [
    {
      roleName: (
        <div className="yellow-font">
          <div>User - Jitendra</div>
          <div>Director - Srinivas</div>
          <div>Super Admin - Ray</div>
          <div>Admin - Sri</div>
          <div>SA - Ranjit</div>
        </div>
      ),
      website: <span className="yellow-font">texchange.com</span>,
      sportsCompanyName: (
        <div className="yellow-font">
          <div>Cricket</div>
          <div>ICC Cricket World Cup</div>
          <div>ID: 23456787653</div>
          <div>Chennai Super King vs Rajasthan Royals</div>
          <div>Match ID: 298785754643</div>
        </div>
      ),
      dateTime: (
        <div className="yellow-font">
          <div>27-09-2024</div>
          <div>19:13:00</div>
        </div>
      ),
      betPlace: (
        <div className="yellow-font">
          <div>Bet Place: Chennai Super Kings/</div>
          <div>Side: Back</div>
          <div>Match Odds - 1.50</div>
          <div>Amount - 1000000</div>
          <div>Bet ID: 298960884003</div>
          <div>Win/Loss: Win</div>
        </div>
      ),
      pl: <span className="yellow-font">100000000000</span>,
      ipAddress: <span className="yellow-font">127.0.0.1</span>,
      action: (
        <div className="d-flex align-items-center">
          <SlPencil
            size={20}
            className="yellow-font m-2 pointer"
            onClick={handleEditBetPopupOpen}
          />
          <FaRegTrashCan
            size={20}
            className="pointer"
            onClick={() => setOnDeleteBetpopup(true)}
          />
        </div>
      ),
    },
    {
      roleName: (
        <div className="red-font">
          <div>User - Jitendra</div>
          <div>Director - Srinivas</div>
          <div>Super Admin - Ray</div>
          <div>Admin - Sri</div>
          <div>SA - Ranjit</div>
        </div>
      ),
      website: <span className="red-font">tcasinopark.com</span>,
      sportsCompanyName: (
        <div className="red-font">
          <div>Casino</div>
          <div>Evolution Gaming</div>
          <div>ID: 2345667823</div>
          <div>Auto-Roulette</div>
          <div>Match ID: 2987584382191</div>
        </div>
      ),
      dateTime: (
        <div className="red-font">
          <div>26-09-2024</div>
          <div>19:13:00</div>
        </div>
      ),
      betPlace: (
        <div className="red-font">
          <div>Bet Place: Benelux Slingshot (Auto-Roulette La Partage)</div>
          <div>Table ID: 298960884003</div>
          <div>Side - 20</div>
          <div>Bet - 100000</div>
          <div>Bet ID: 298960884003</div>
          <div>Win/Loss: Loss</div>
        </div>
      ),
      pl: <span className="red-font">150000</span>,
      ipAddress: <span className="red-font">127.0.0.1</span>,
      action: (
        <div className="text-center">
          <FaSync size={17} className="red-font pointer" />
        </div>
      ),
    },
    {
      roleName: (
        <>
          <div className="green-font">User - Jitendra</div>
          <div className="green-font">Director - Srinivas</div>
          <div>Super Admin - Ray</div>
          <div>Admin - Sri</div>
          <div>SA - Ranjit</div>
        </>
      ),
      website: "texchange.com",
      sportsCompanyName: (
        <>
          <div>Cricket</div>
          <div>ICC Cricket World Cup</div>
          <div>ID: 23456787653</div>
          <div>Chennai Super King vs Rajasthan Royals</div>
          <div>Match ID: 298785754643</div>
        </>
      ),
      dateTime: (
        <>
          <div>27-09-2024</div>
          <div>19:13:00</div>
        </>
      ),
      betPlace: (
        <>
          <div>Bet Place: Chennai Super Kings/</div>
          <div>
            Side: <span className="sky-blu-font">Back</span>
          </div>
          <div className="yellow-font">Match Odds - 1.50</div>
          <div className="yellow-font">Amount - 1000000</div>
          <div>Bet ID: 298960884003</div>
          <div>
            Win/Loss: <span className="green-font">Win</span>
          </div>
        </>
      ),
      pl: <span className="green-font">100000000000</span>,
      ipAddress: "127.0.0.1",
      action: (
        <>
          <SlPencil size={20} className="m-2 pointer" />
          <FaRegTrashCan size={20} className="pointer" />
        </>
      ),
    },
    {
      roleName: (
        <>
          <div>User - Jitendra</div>
          <div>Director - Srinivas</div>
          <div>Super Admin - Ray</div>
          <div>Admin - Sri</div>
          <div>SA - Ranjit</div>
        </>
      ),
      website: "texchange.com",
      sportsCompanyName: (
        <>
          <div>Cricket</div>
          <div>ICC Cricket World Cup</div>
          <div>ID: 23456787653</div>
          <div>Chennai Super King vs Rajasthan Royals</div>
          <div>Match ID: 298785754643</div>
        </>
      ),
      dateTime: (
        <>
          <div>27-09-2024</div>
          <div>19:13:00</div>
        </>
      ),
      betPlace: (
        <>
          <div>Bet Place: Chennai Super Kings/</div>
          <div>Side: Back</div>
          <div>Match Odds - 1.50</div>
          <div>Amount - 1000000</div>
          <div>Bet ID: 298960884003</div>
          <div>Win/Loss: Win</div>
        </>
      ),
      pl: "100000000000",
      ipAddress: "127.0.0.1",
      action: (
        <>
          <SlPencil size={20} className="m-2 pointer" />
          <FaRegTrashCan size={20} className="pointer" />
        </>
      ),
    },
  ];

  return (
    <div className="py-4 bg-white shadow rounded">
      <div className="px-3 d-flex justify-content-between align-items-center mb-3">
        <h6 className="medium-font">Bet History</h6>
        <div className="d-flex align-items-center">
          <span className="me-2 black-text small-font">Active</span>
          <Form>
            <Form.Check
              type="switch"
              id="custom-switch"
              className="director-admin-profile-toggle-btn"
            />
          </Form>
          <span className="me-2 black-text small-font">In-active</span>
        </div>
      </div>

      <div className="row px-3">
        <div className="col-2">
          <label htmlFor="date-picker small-font" className="mb-1">
            From
          </label>
          <input
            type="date"
            id="date-picker"
            className="rounded small-font input-css w-100 "
          />
        </div>

        <div className="col-2">
          <label htmlFor="date-picker small-font" className="mb-1">
            To
          </label>
          <input
            type="date"
            id="date-picker"
            className="small-font input-css w-100 rounded"
          />
        </div>

        <div className="col-2 mt-1">
          <label className="small-font mb-1">Website</label>
          <select className="small-font input-css rounded px-3 w-100">
            <option className="small-font">texchange.com</option>
            <option className="small-font">fun77.com</option>
            <option className="small-font">tcasinopark.com</option>
            <option className="small-font">diamondexchange.com</option>
          </select>
        </div>

        <div className="col-2 mt-1">
          <label className="small-font mb-1">Admin</label>
          <select className="small-font input-css rounded px-3 w-100">
            <option className="small-font">Director - Srinivas</option>
            <option className="small-font">Super Admin - Ranjit</option>
            <option className="small-font">Admin - Rajesh</option>
            <option className="small-font">SA- Jitah</option>
            <option className="small-font">Agent - Lokesh</option>
            <option className="small-font">Agent - Suresh</option>
          </select>
        </div>

        <div className="col-2 mt-1">
          <label className="small-font mb-1">Admin</label>
          <select className="small-font input-css rounded px-3 w-100">
            <option className="small-font">Jitendra</option>
            <option className="small-font">Jayanta</option>
            <option className="small-font">Sri</option>
            <option className="small-font">Rahul</option>
            <option className="small-font">Raj</option>
            <option className="small-font">Sri Varma</option>
          </select>
        </div>

        <div className="col-1 d-flex align-items-end">
          <button className="rounded small-font saffron-btn px-3">
            Search
          </button>
        </div>
      </div>

      <div className="table-parent-container mt-3">
        <Table data={data} columns={columns} itemsPerPage={3} />
      </div>
      <EditBetPopup
        editBetPopupOpen={editBetPopupOpen}
        setEditBetPopupOpen={setEditBetPopupOpen}
      />
      <SuccessPopup
        confirmationPopupOpen={onDeleteBetpopup}
        setConfirmationPopupOpen={() => setOnDeleteBetpopup(false)}
        discription={"Are You Sure to Delete This Bet"}
        submitButton={"Delete"}
      />
    </div>
  );
};

export default BetHistory;
