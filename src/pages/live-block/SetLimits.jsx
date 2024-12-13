import React, { useState } from "react";
import Table from "../../components/Table";
import "../live-block/style.css";

function SetLimits() {
  const BONUS_COLUMNS = [
    { header: "Date & Time", field: "dateTime" },
    { header: "Limit For", field: "limitfor" },
    { header: "Min Bet Limit", field: "minbetlimit" },
    { header: "Max Bet Limit", field: "maxbetlimit" },
    { header: "Max Bhav", field: "maxbhav" },
    { header: "Bet Delay", field: "betdelay" },
    { header: "Login Name", field: "loginname" },
    { header: "Role", field: "role" },
    { header: "Status", field: "status" },
  ];

  const BONUS_DATA = [
    {
      dateTime: "07-10-2024, 17:17:00",
      limitfor: <div>odds</div>,
      minbetlimit: "100",
      maxbetlimit: "125000000",
      maxbhav: "2000",
      betdelay: <div>3 Sec</div>,
      loginname: <div>Srinivas</div>,
      role: <div>Company</div>,
      status: <div className="red-btn">In-Active</div>,
    },
    {
      dateTime: "07-10-2024, 17:17:00",
      limitfor: <div>odds</div>,
      minbetlimit: "100",
      maxbetlimit: "125000000",
      maxbhav: "2000",
      betdelay: <div>3 Sec</div>,
      loginname: <div>Srinivas</div>,
      role: <div>Company</div>,
      status: <div className="green-btn">Active</div>,
    },
    {
      dateTime: "07-10-2024, 17:17:00",
      limitfor: <div>odds</div>,
      minbetlimit: "100",
      maxbetlimit: "125000000",
      maxbhav: "2000",
      betdelay: <div>3 Sec</div>,
      loginname: <div>Srinivas</div>,
      role: <div>Company</div>,
      status: <div className="green-btn">Active</div>,
    },
    {
      dateTime: "07-10-2024, 17:17:00",
      limitfor: <div>odds</div>,
      minbetlimit: "100",
      maxbetlimit: "125000000",
      maxbhav: "2000",
      betdelay: <div>3 Sec</div>,
      loginname: <div>Srinivas</div>,
      role: <div>Company</div>,
      status: <div className="green-btn">Active</div>,
    },
    {
      dateTime: "07-10-2024, 17:17:00",
      limitfor: <div>odds</div>,
      minbetlimit: "100",
      maxbetlimit: "125000000",
      maxbhav: "2000",
      betdelay: <div>3 Sec</div>,
      loginname: <div>Srinivas</div>,
      role: <div>Company</div>,
      status: <div className="green-btn">Active</div>,
    },
    {
      dateTime: "07-10-2024, 17:17:00",
      limitfor: <div>odds</div>,
      minbetlimit: "100",
      maxbetlimit: "125000000",
      maxbhav: "2000",
      betdelay: <div>3 Sec</div>,
      loginname: <div>Srinivas</div>,
      role: <div>Company</div>,
      status: <div className="green-btn">Active</div>,
    },
    {
      dateTime: "07-10-2024, 17:17:00",
      limitfor: <div>odds</div>,
      minbetlimit: "100",
      maxbetlimit: "125000000",
      maxbhav: "2000",
      betdelay: <div>3 Sec</div>,
      loginname: <div>Srinivas</div>,
      role: <div>Company</div>,
      status: <div className="green-btn">Active</div>,
    },
    {
      dateTime: "07-10-2024, 17:17:00",
      limitfor: <div>odds</div>,
      minbetlimit: "100",
      maxbetlimit: "125000000",
      maxbhav: "2000",
      betdelay: <div>3 Sec</div>,
      loginname: <div>Srinivas</div>,
      role: <div>Company</div>,
      status: <div className="green-btn">Active</div>,
    },
  ];

  const buttons = ["Odds", "Book Maker 1", "Book Maker 2", "Fancy", "Casino"];
  const [activeIndex, setActiveIndex] = useState(0);
  const handleActiveIndex = (index) => {
    setActiveIndex(index);
  };
  const bets = [
    { id: 1, label: "Minimum Bet", placeholder: "enter" },
    { id: 2, label: "Maximum Bet", placeholder: "enter" },
    { id: 3, label: "Maximum Bhav", placeholder: "enter" },
    { id: 4, label: "Bet Delay Sec", placeholder: "enter" },
  ];
  return (
    <div>
      <div className="flex-column mb-3 mt-2">
        <h6 className="d-flex medium-font yellow-font my-3">Set Limits</h6>
        <div className="col-8 col-lg-10 d-flex small-font">
          {buttons.map((btn, index) => (
            <div
              key={index}
              className={`col-2 col-lg-1 me-3 ${
                activeIndex === index ? "saffron-btn2" : "pointer white-btn2"
              }`}
              onClick={() => handleActiveIndex(index)}
            >
              {btn}
            </div>
          ))}
        </div>
      </div>

      <div className="liveblock-setlimit-header-top d-flex w-100 white-bg px-3 pt-3 pb-4">
        {bets.map((bet) => (
          <div className="col mx-2" key={bet.id}>
            <div className="w-100 d-flex flex-column">
              <div className="small-font mb-1">{bet.label}</div>
              <input
                className="input-css2 small-font"
                type="number"
                placeholder={bet.placeholder}
              />
            </div>
          </div>
        ))}
        <div className="col-1 align-self-end">
          <button className="w-100 saffron-btn2 small-font">Submit</button>
        </div>
      </div>

      <div className="liveblock-setlimit-table-parent-bottom">
        <Table
          className="table-wrapper"
          columns={BONUS_COLUMNS}
          data={BONUS_DATA}
          itemsPerPage={4}
        />
      </div>
    </div>
  );
}

export default SetLimits;
