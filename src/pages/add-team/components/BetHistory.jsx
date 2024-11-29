import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import { FaSync } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import Table from "../../../components/Table"
import EditBetPopup from "../../risk-management/EditBetPopup";

const columns = [
  { header: "Role/Name", field: "roleName", width: "15%" },
  { header: "Website", field: "website", width: "10%" },
  {
    header: "Sports - Series/Company Name",
    field: "sportsCompanyName",
    width: "20%",
  },
  { header: "Date & Time", field: "dateTime", width: "10%" },
  { header: "Bet Place", field: "betPlace", width: "20%" },
  { header: "P/L", field: "pl", width: "10%" },
  { header: "IP Address", field: "ipAddress", width:"8%" },
  { header: "Action", field: "action", width: "25%" },
];


const BetHistory = () => {
  const [editBetPopupOpen, setEditBetPopupOpen] = useState(false);

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
        <>
          <GrEdit size={20} className="yellow-font m-2 pointer" onClick={handleEditBetPopupOpen}/>
          <RiDeleteBinLine size={20} className="pointer"/>
        </>
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
          <div>Side: <span className="sky-blu-font">Back</span></div>
          <div className="yellow-font">Match Odds - 1.50</div>
          <div className="yellow-font">Amount - 1000000</div>
          <div>Bet ID: 298960884003</div>
          <div>Win/Loss: <span className="green-font">Win</span></div>
        </>
      ),
      pl: <span className="green-font">100000000000</span>,
      ipAddress: "127.0.0.1",
      action: (
        <>
          <GrEdit size={20} className="m-2 pointer" />
          <RiDeleteBinLine size={20} className="pointer"/>
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
          <GrEdit size={20} className="m-2 pointer" />
          <RiDeleteBinLine size={20} className="pointer"/>
        </>
      ),
    },
  ];


  return (
    <div className="py-4 bg-white shadow rounded">
      <div className="px-4 d-flex justify-content-between align-items-center mb-3">
        <h6 className="medium-font">Bet History</h6>
        <div className="d-flex align-items-center">
          <span className="me-2 black-text medium-font">Active</span>
          <Form>
            <Form.Check
              type="switch"
              id="custom-switch"
              className="director-admin-profile-toggle-btn"
            />
          </Form>
          <span className="me-2 black-text medium-font">In-active</span>
        </div>
      </div>

      <div className="row gap-1 px-3">
        <div className="col-2">
          <label htmlFor="date-picker" className="mb-1">
            From
          </label>
          <div className="position-relative">
            <input
              type="date"
              id="date-picker"
              className="custom-date-input form-control bg-light border rounded pr-5"
            />
            {/* <CiCalendarDate className="input-icon" /> */}
          </div>
        </div>

        <div className="col-2">
          <label htmlFor="date-picker" className="mb-1">
            To
          </label>
          <div className="position-relative">
            <input
              type="date"
              id="date-picker"
              className="custom-date-input form-control bg-light border rounded pr-5"
            />
            {/* <CiCalendarDate className="input-icon" /> */}
          </div>
        </div>

        <div className="col-2">
          <label className="medium-font mb-1 d-block">Website</label>
          <div className="position-relative">
            <select className="form-select custom-select bg-light border rounded px-3 w-100">
              <option className="medium-font">texchange.com</option>
              <option className="medium-font">fun77.com</option>
              <option className="medium-font">tcasinopark.com</option>
              <option className="medium-font">diamondexchange.com</option>
            </select>
          </div>
        </div>

        <div className="col-2">
          <label className="medium-font mb-1 d-block">Admin</label>
          <div className="position-relative">
            <select className="form-select custom-select bg-light border rounded px-3 w-100">
              <option className="medium-font">Director - Srinivas</option>
              <option className="medium-font">Super Admin - Ranjit</option>
              <option className="medium-font">Admin - Rajesh</option>
              <option className="medium-font">SA- Jitah</option>
              <option className="medium-font">Agent - Lokesh</option>
              <option className="medium-font">Agent - Suresh</option>
            </select>
          </div>
        </div>

        <div className="col-2">
          <label className="medium-font mb-1 d-block">Admin</label>
          <div className="position-relative">
            <select className="form-select custom-select bg-light border rounded px-3 w-100">
              <option className="medium-font">Jitendra</option>
              <option className="medium-font">Jayanta</option>
              <option className="medium-font">Sri</option>
              <option className="medium-font">Rahul</option>
              <option className="medium-font">Raj</option>
              <option className="medium-font">Sri Varma</option>
            </select>
          </div>
        </div>

        <div className="col-1 d-flex align-items-end">
          <button className="text-white rounded saffron-btn px-4">
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
    </div>
  );
};

export default BetHistory;
