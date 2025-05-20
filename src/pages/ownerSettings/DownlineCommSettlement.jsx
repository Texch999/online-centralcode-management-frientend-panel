import { FaSearch } from "react-icons/fa";
import Table from "../../components/Table";
import { useState } from "react";
import CommSettlementPopup from "./CommSettlementPopup";

function DownlineCommSettlement() {
  const [openCommSettledPopup, setOpenCommSettledPopup] = useState(false);
  const handleOpenCommSettledPopup = () => {
    setOpenCommSettledPopup(true);
  };
  const CRICKET_COLUMNS = [
    { header: "Date & Time", field: "dateTime", width: "15%" },
    { header: "Name", field: "name", width: "15%" },
    { header: "Role", field: "role", width: "15%" },
    { header: "Comm", field: "comm", width: "15%" },
    { header: "Settled Comm", field: "sett_comm", width: "15%" },
    { header: "Balance Comm", field: "bal_comm", width: "15%" },
    { header: "Action", field: "action", width: "10%" },
  ];
  const CRICKET_DATA = [
    {
      dateTime: <div>01-10-2024, 16:11:00</div>,
      name: <div>Jayantapal</div>,
      role: <div>Super Admin</div>,
      comm: <div>1000.00</div>,
      sett_comm: <div>750.00</div>,
      bal_comm: <div>250.00</div>,
      action: (
        <div
          className="saffron-btn2 small-font pointer p-1"
          onClick={handleOpenCommSettledPopup}
        >
          Settled
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="yellow-font mb-0">Downline Comm Settlement</h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>
      <div className="col-8 col-lg-7 d-flex flex-between my-3">
        <div className="col-3 flex-column ">
          <label className="black-text4 small-font mb-1">From</label>
          <input className="input-css2 small-font" type="date" />
        </div>
        <div className="col-3 flex-column mx-2">
          <label className="black-text4 small-font mb-1">To</label>
          <input className="input-css2 small-font" type="date" />
        </div>
        <div className="col-3 flex-column mx-2">
          <label className="black-text4 small-font mb-1">To</label>
          <input
            className="input-css2 small-font"
            type="text"
            placeholder="Search"
          />
        </div>
        <div className="align-self-end saffron-btn2 small-font pointer col-2">
          Submit
        </div>
      </div>
      <Table columns={CRICKET_COLUMNS} data={CRICKET_DATA} itemsPerPage={4} />
      <CommSettlementPopup
        openCommSettledPopup={openCommSettledPopup}
        setOpenCommSettledPopup={setOpenCommSettledPopup}
      />
    </div>
  );
}

export default DownlineCommSettlement;
