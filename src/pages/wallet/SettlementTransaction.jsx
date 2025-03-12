import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import Table from "../../components/Table";
import SettlementTransModal from "./SettlementTransModal";

const SettlementTransaction = () => {
  const [settleModalShow, setSettleModalShow] = useState(false);
  const adminOptions = [
    { value: "Option 1", label: "Director-Jayanta" },
    { value: "Option 2", label: "Director-Jayanta" },
    { value: "Option 3", label: "Director-Jayanta" },
  ];

  const COLUMNS = [
    { header: "Date & Time", field: "dt" },
    { header: "Credit", field: "credit" },
    { header: "Debit", field: "debit" },
    { header: "Closing", field: "closing" },
    { header: "Description", field: "desc" },
    { header: "From → To", field: "from" },
  ];

  const DATA = [
    {
      dt: <div>11-02-2025, 12:00:00 AM</div>,
      credit: <div className="green-font">5000</div>,
      debit: <div>-</div>,
      closing: <div>15000</div>,
      desc: (
        <div>
          Settlement on 03/03/2025 08:34:14 by vignesh1993 [49.43.202.64] :
          (13.47)
        </div>
      ),
      from: <div>vignesh1993 → sri56789</div>,
    },
    {
      dt: <div>11-02-2025, 12:00:00 AM</div>,
      credit: <div className="green-font">5000</div>,
      debit: <div>-</div>,
      closing: <div>15000</div>,
      desc: (
        <div>
          Settlement on 03/03/2025 08:34:14 by vignesh1993 [49.43.202.64] :
          (13.47)
        </div>
      ),
      from: <div>vignesh1993 → sri56789</div>,
    },
    {
      dt: <div>11-02-2025, 12:00:00 AM</div>,
      credit: <div className="green-font">5000</div>,
      debit: <div>-</div>,
      closing: <div>15000</div>,
      desc: (
        <div>
          Settlement on 03/03/2025 08:34:14 by vignesh1993 [49.43.202.64] :
          (13.47)
        </div>
      ),
      from: <div>vignesh1993 → sri56789</div>,
    },
    {
      dt: <div>11-02-2025, 12:00:00 AM</div>,
      credit: <div className="green-font">5000</div>,
      debit: <div>-</div>,
      closing: <div>15000</div>,
      desc: (
        <div>
          Settlement on 03/03/2025 08:34:14 by vignesh1993 [49.43.202.64] :
          (13.47)
        </div>
      ),
      from: <div>vignesh1993 → sri56789</div>,
    },
    {
      dt: <div>11-02-2025, 12:00:00 AM</div>,
      credit: <div className="green-font">5000</div>,
      debit: <div>-</div>,
      closing: <div>15000</div>,
      desc: (
        <div>
          Settlement on 03/03/2025 08:34:14 by vignesh1993 [49.43.202.64] :
          (13.47)
        </div>
      ),
      from: <div>vignesh1993 → sri56789</div>,
    },
  ];

  const FOOTER = [
    { header: "Total" },
    { header: <div className="red-font">7500000</div> },
    { header: <div className="green-font">7500000</div> },
    { header: <div className="red-font">7500000</div> },
    { header: "" },
    { header: "" },
  ];
  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="d-flex yellow-font mb-0">
          <span>Settlement Transaction</span>
        </h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>
      <div className="d-flex flex-column gap-3">
        <div className="row">
          <div className="col-2">
            <div className="flex-column me-3">
              <label className="black-text4 small-font mb-1">
                Select Admin Name
              </label>
              <Select
                className="small-font"
                options={adminOptions}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
                classNamePrefix="custom-react-select"
              />
            </div>
          </div>
          <div className="col-2 me-3 align-self-end">
            <div className="white-btn2 flex-between">
              <span className="small-font">Total Credit</span>
              <span className=" medium-font red-font">40000</span>
            </div>
          </div>
          <div className="col-2 me-3 align-self-end">
            <div className="white-btn2 flex-between">
              <span className="small-font">Paid Credit</span>
              <span className=" medium-font red-font">40000</span>
            </div>
          </div>
          <div className="col-2 me-3 align-self-end">
            <div className="white-btn2 flex-between">
              <span className="small-font">Bal Credit</span>
              <span className=" medium-font red-font">40000</span>
            </div>
          </div>
          <div className="col-1"></div>
        </div>
        <div className="row">
          <div className="col-2">
            <div className="flex-column me-3">
              <label className="black-text4 small-font mb-1">
                Select Admin Panel
              </label>
              <Select
                className="small-font"
                options={adminOptions}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
                classNamePrefix="custom-react-select"
              />
            </div>
          </div>
          <div className="col-2">
            <div className="flex-column me-3">
              <label className="black-text4 small-font mb-1">
                Select User Panel
              </label>
              <Select
                className="small-font"
                options={adminOptions}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
                classNamePrefix="custom-react-select"
              />
            </div>
          </div>
          <div className="col-1">
            <div className="flex-column me-3">
              <label className="black-text4 small-font mb-1">Select Type</label>
              <Select
                className="small-font"
                options={adminOptions}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
                classNamePrefix="custom-react-select"
              />
            </div>
          </div>

          {["From", "To"].map((label) => (
            <div key={label} className="col-2 flex-column mx-2">
              <label className="black-text4 small-font mb-1">{label}</label>
              <input className="input-css2 small-font" type="date" />
            </div>
          ))}

          <div className="d-flex align-self-end small-font pointer col-1">
            <button className="saffron-btn2">Submit</button>
          </div>

          <div className="col-1 me-3 align-self-end" onClick={()=>setSettleModalShow(true)}>
            <div className="white-bg br-5 px-1 py-2 text-center black-border">
              Settlement
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 py-2">
        <Table columns={COLUMNS} data={DATA} itemsPerPage={4} footer={FOOTER} />
      </div>

      <SettlementTransModal setSettleModalShow={setSettleModalShow} settleModalShow={settleModalShow}/>
    </div>
  );
};

export default SettlementTransaction;
