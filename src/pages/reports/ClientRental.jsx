import React, { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Table from "../../components/Table";
import { FiChevronRight } from "react-icons/fi";

function ClientRental() {
  const [rentalTickets, setRentalTickets] = useState(false);
  const DIRECTOR_COLUMNS = [
    { header: "Start Date", field: "startDate" },
    { header: "Name & Role", field: "nameRole" },
    { header: "Website Name ", field: "websiteName" },
    { header: "Rental Amt", field: "rentalAmt" },
    { header: "Exp Date", field: "expDate" },
    { header: "Total Months", field: "totalMonths" },
    { header: "Total Rental Amt", field: "totalRentalAmt" },
    { header: "Paid Rental", field: "paidRental" },
    { header: "Bal Rental", field: "balRental" },
    { header: "", field: "icons" },
  ];

  const DIRECTOR_DATA = Array(6).fill({
    startDate: <div>01-10-2024</div>,
    nameRole: (
      <div>
        Jayanta <br />
        Director
      </div>
    ),
    websiteName: (
      <div>
        T Exchange <br /> Diamond Exchange <br /> Spark Book
      </div>
    ),
    rentalAmt: <div>400000</div>,
    expDate: <div>31-12-2024</div>,
    totalMonths: <div>6m</div>,
    totalRentalAmt: <div className="green-font">24000000</div>,
    paidRental: <div className="green-font">24000000</div>,
    balRental: <div className="yellow-font">24000000</div>,
    icons: (
      <div
        className="flex-center large-font pointer"
        onClick={() => setRentalTickets(true)}
      >
        <MdOutlineRemoveRedEye size={18} />
      </div>
    ),
  });

  const DIRECTOR_FOOTER = [
    { header: "Total" },
    { header: "" },
    { header: "" },
    { header: "" },
    { header: "" },
    { header: "" },
    { header: <div className="green-font">7500000</div> },
    { header: <div className="green-font">7500000</div> },
    { header: <div className="yellow-font">7500000</div> },
    { header: "" },
  ];

  const RENTAL_COLUMNS = [
    { header: "Date & Time", field: "dateTime" },
    { header: "Name & Role", field: "nameRole" },
    { header: "Trn ID", field: "trnD" },
    { header: "D/W", field: "dw" },
    { header: "Exp Date", field: "expDate" },
    { header: "Rental Amt", field: "rentalAmt" },
    { header: "Balance", field: "balance" },
    { header: "Paid Amt", field: "paidAmt" },
    { header: "Currency", field: "Currency" },
    { header: "Paid Amt INR", field: "paidAmtINR" },
    { header: "Net Bal", field: "netBal" },
    { header: "", field: "icons" },
  ];

  const RENTAL_DATA = Array(6).fill({
    dateTime: (
      <div>
        07-10-2024 <br />
        17:22:00
      </div>
    ),
    nameRole: (
      <div>
        Srinivas - Director <br />
        Rental (SP) - 100000 <br />
        Casino - 10%
      </div>
    ),
    trnD: <div>123456781234</div>,
    dw: (
      <div>
        <span className="green-font">Deposit</span>Sp Rent
      </div>
    ),
    expDate: <div>31-12-2024</div>,
    rentalAmt: <div>40000</div>,
    balance: <div className="green-font">24000000</div>,
    paidAmt: <div>24000000</div>,
    Currency: <div>USD</div>,
    paidAmtINR: <div className="green-font">24000000</div>,
    netBal: <div className="green-font">24000000</div>,
    icons: (
      <div className="flex-center large-font pointer">
        <MdOutlineRemoveRedEye size={18} />  <span className="active-btn-table small-font ms-2">Approved</span>
      </div>
    ),
  });



  const summaryData = [
    { label: "Total Rental Amount", value: "1000000000", color: "green-font" },
    { label: "Paid Amount", value: "1000000000", color: "green-font" },
    { label: "Total Balance", value: "2000000000", color: "green-font" },
  ];

  return (
    <div>
      <div className="flex-between mb-3 mt-4">
        <h6 className="d-flex  mb-0">
          {" "}
          {rentalTickets === true ? (
            <span>
              Client Rental Sheets{" "}
              <span className="yellow-font">
                <FiChevronRight size={18} /> Rental Tickets
              </span>{" "}
            </span>
          ) : (
            <span className="yellow-font">Client Rental Sheets</span>
          )}
        </h6>
      </div>

      <div className="d-flex w-40 mt-4">
        <div className="w-100   mb-3 py-3 grey-bg2 rounded">
          {summaryData.map(({ label, value, color }) => (
            <div key={label} className="col-12 px-3 mt-2">
              <div className="white-btn2 flex-between">
                <span className="small-font">{label}</span>
                <span className={`medium-font ${color}`}>{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex w-50 flex-between mt-2 mb-2">
        {rentalTickets === true ? (
          <>
            <div className="col-4 flex-column mx-2">
              <label className="black-text4 small-font mb-1">From</label>
              <input className="input-css2 small-font" type="date" />
            </div>
            <div className="col-4 flex-column mx-2">
              <label className="black-text4 small-font mb-1">To</label>
              <input className="input-css2 small-font" type="date" />
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="col-4 flex-column me-3">
              <label className="black-text4 small-font mb-1">Role</label>
              <select className="input-css2 small-font">
                <option>All</option>
              </select>
            </div>
            <div className="col-4 flex-column me-3">
              <label className="black-text4 small-font mb-1">Name</label>
              <select className="input-css2 small-font">
                <option>Select</option>
              </select>
            </div>
          </>
        )}

        <div className="saffron-btn2 small-font pointer mt-4  col-4">
          Submit
        </div>
      </div>

      {rentalTickets === true ? (
        <Table columns={RENTAL_COLUMNS} data={RENTAL_DATA} itemsPerPage={5} />
      ) : (
        <Table
          columns={DIRECTOR_COLUMNS}
          data={DIRECTOR_DATA}
          footer={DIRECTOR_FOOTER}
          greyBackground="footer-bg"
          itemsPerPage={5}
        />
      )}
    </div>
  );
}

export default ClientRental;
