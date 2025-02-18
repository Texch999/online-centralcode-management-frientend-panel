import React, { useRef, useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/Table";
import { BsEye } from "react-icons/bs";
import DepositWithdrawPopup from "./DepositWithdrawPopup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getOwnerDownlineDepositeTicketsList, managementDepositTikcetDetailsById, DeleteDirectorTicketsById } from "../../api/apiMethods";
import { MdAutoDelete } from "react-icons/md";
import { useSelector } from "react-redux";


function Tickets() {
  const [depositWithdrawPopupOpen, setDepositWithdrawPopupOpen] =
    useState(false);
  const [totalRecords, setTotalRecords] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const [currentPage, setCurrentPage] = useState(page);
  const itemsPerPage = 4
  const limit = itemsPerPage
  const offset = (currentPage - 1) * itemsPerPage
  const userRole = localStorage.getItem("role_code");
  const handleDepositWithdrawPopupOpen = () => {
    setDepositWithdrawPopupOpen(true);
  };
  const navigate = useNavigate()
  const [deposiTikcteslist, setDeposiTikcteslist] = useState([])
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
  const [rejectionReasons, setRejectionReasons] = useState(null);
  const [error, setError] = useState([])
  const initialRendering = useRef(true)
  const [ticketDetails, setTicketDetails] = useState(null)

  const getDepositTickets = async (limit, offset, startDate, fromDate) => {

    let fetchDeposits;
    if (userRole === "management") {
      fetchDeposits = getOwnerDownlineDepositeTicketsList;
    } else { // director Downline Tickets
      fetchDeposits = getOwnerDownlineDepositeTicketsList
    }
    await fetchDeposits({ limit, offset, startDate, fromDate })
      .then((response) => {
        setDeposiTikcteslist(response?.records);
        setTotalRecords(response?.total)
      })
      .catch((error) => {
        setError(error?.message);
        console.log("fetchDeposits error", error);
      })
  };

  const getTicketDetailsById = async (id) => {
    let fetchDeposits;
    if (userRole === "management") {
      fetchDeposits = managementDepositTikcetDetailsById;
    } else {
      fetchDeposits = managementDepositTikcetDetailsById;
    }
    await fetchDeposits(id)
      .then((response) => {
        if (userRole === "management") {
          setTicketDetails(response?.records?.details);
          setRejectionReasons(response?.records?.reasons)
        } else {
          setTicketDetails(response?.records);

        }
      })
      .catch((error) => {
        setError(error?.message);
        console.log("fetchDeposits error", error);
      })
  }

  const allCountries = useSelector((item) => item?.allCountries);
  const getCurrency = (id) => {
    const country = allCountries.find((item) => item.id === id);
    return country?.currency_name
  };

  const MY_TRANSACTIONS_MANAGEMENT_COLUMNS = [
    { header: "Date & Time", field: "dateTime" },
    { header: "Name & Role", field: "nameRole" },
    { header: "Admin/User Website", field: "adminuserwebiste" },
    { header: "UTR No/ DepositeType", field: "utrno" },
    { header: "D/W", field: "dw" },
    { header: "Chips", field: "chips" },
    { header: "Curr Type/Amt.", field: "currtypeamount" },
    { header: "Curr Rate", field: "currRate" },
    { header: "Your Chips", field: "yourChips" },
    { header: "Your Curr/Amount", field: "yourcurramount" },
    { header: "", field: "view" },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 0:
        return "#FFE2B3";// Yellow background 
      case 1:
        return "#B3FFD6";  // Green background
      case 2:
        return "#FFCAC3"; // Red background
      default:
        return "bg-gray"; // Default gray background
    }
  };

  const getStatusBorderClass = (status) => {
    switch (status) {
      case 0:
        return "#FFA310";// Yellow background 
      case 1:
        return "#18B962";  // Green background
      case 2:
        return "#F43A23"; // Red background
      default:
        return "bg-gray"; // Default gray background
    }
  };


  const MY_TRANSACTIONS_MANAGEMENT_DATA =
    deposiTikcteslist.map((record, index) => (
      {
        dateTime: new Date(record.date).toLocaleString(),
        nameRole: (
          <div>
            {record.dirName} - Director
            <br />
            {record.shareType === 1 ? "Rental" : "Share Royalty"} - {record.sharePer}%
          </div>
        ),
        adminuserwebiste: (<div>
          {record.admPanNam}
          <br />
          {record.usePanNam}
        </div>),
        utrno: <div >{record.transacId}</div>,
        dw: <div style={{ color: `${record.ticketType === 1 || 0 ? "#18B962" : "#D0431C"}` }}>
          {record.ticketType === 1 || 0 ? "Deposit" : "Withdaw"}</div>,
        chips: <div style={{ color: `${record.ticketType === 1 || 0 ? "#18B962" : "#D0431C"}` }}>{record.requChips}</div>,
        currtypeamount: <div >{record.paidAmount}<br />{getCurrency(record.reqCurrency)}</div>,
        currRate: <div >{record.curRate}<br />{getCurrency(record.reqCurrency)}</div>,
        yourChips: <div >{record.paidAmount}<br />{getCurrency(record.reqCurrency)}</div>,
        yourcurramount: <div >{record.totCur}<br />{getCurrency(record.reqCurrency)}</div>,
        view: (
          <div className="w-100 flex-center status-container d-flex flex-column justify-content-center">
            {/* Status Bar Button */}
            <span
              className="status-bar"
              style={{
                background: getStatusClass(record.status),
                border: `1px solid ${getStatusBorderClass(record.status)}`,
                color: getStatusBorderClass(record.status),
              }}
            >
              {record.status === 0 ? "Pending" : (record.status === 1 ? " Approved" : "Rejected")}
            </span>

            {/* Eye Icon Button */}
            <div className="w-100 flex-center status-container d-flex flex-row justify-content-center">
              < BsEye
                size={22}
                className="eye-icon pointer m-2 pointer"
                onClick={() => {
                  handleDepositAndWithdraw(record?.id)
                }
                }
              />
              {/* < MdAutoDelete
                size={22}
                className="eye-icon pointer m-2 pointer"
              onClick={() => handleDepositWithdrawPopupOpen(1)
              }
              /> */}
            </div>
          </div >
        ),
      }
    ));

  useEffect(() => {
    if (initialRendering.current) {
      initialRendering.current = false
      return
    }

    getDepositTickets(limit, offset)
  }, [])

  const handleDeposit = (action) => {
    navigate("/addnew-payments", {
      state: { actionType: action }, // Pass data here
    });
  }

  const handleDepositAndWithdraw = (id) => {
    console.log(id, "====>id")
    if (id) {
      getTicketDetailsById(id)
      handleDepositWithdrawPopupOpen(true)
    }
  }

  const handlePageChange = ({ limit, offset }) => {
    getDepositTickets(limit, offset);
  };

  const handleDataFilter = () => {
    if (startDate && fromDate) {
      getDepositTickets(limit, offset, startDate, fromDate);

    }
  }
  console.log(rejectionReasons, "=====>rejectionReasons tikcets")
  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="d-flex yellow-font mb-0">Downline Tickets</h6>
        {userRole !== "management" ?
          //search input 
          <div className="d-flex align-items-center gap-1">
            <button className={`me-3 dark-green-bg px-3`} onClick={() =>
              handleDeposit("Deposit")
              // setDepositePopup(true)
            }>Deposit</button>
            <button className={`me-3 saffron-btn2 px-3`} onClick={() =>
              //  setWithdrawPopup(true)
              handleDeposit("Withdraw")
            } > Withdraw</button>
          </div>
          :
          // deposit and withdraw buttons
          <div className="input-pill d-flex align-items-center rounded-pill px-2">
            <FaSearch size={16} className="grey-clr me-2" />
            <input className="small-font all-none" placeholder="Search..." />
          </div>}

      </div>
      <div className="grey-bg2 d-flex w-100 py-3 rounded">
        <div className="col-3 px-3">
          <div className="white-bg rounded flex-between">
            <span className="saffron-btn small-font rounded">
              Total Tickets
            </span>
            <span className="medium-font black-text4 pe-2">1000000</span>
          </div>
        </div>
        <div className="col-3 px-3">
          <div className="white-bg rounded flex-between">
            <span className="saffron-btn small-font rounded">
              Total Tickets
            </span>
            <span className="medium-font black-text4 pe-2">1000000</span>
          </div>
        </div>{" "}
        <div className="col-3 px-3">
          <div className="white-bg rounded flex-between">
            <span className="saffron-btn small-font rounded">
              Approved Tickets
            </span>
            <span className="medium-font black-text4 pe-2">9000</span>
          </div>
        </div>{" "}
        <div className="col-3 px-3">
          <div className="white-bg rounded flex-between">
            <span className="saffron-btn small-font rounded">
              Rejected Tickets
            </span>
            <span className="medium-font black-text4 pe-2">100</span>
          </div>
        </div>
      </div>
      <div className="w-50 row my-3">
        <div className="col flex-column">
          <label className="black-text4 small-font mb-1">From</label>
          <input
            className="input-css2 small-font"
            type="date"
            value={new Date(startDate).toISOString().split("T")[0]}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col flex-column">
          <label className="black-text4 small-font mb-1">To</label>
          <input
            className="input-css2 small-font"
            value={new Date(fromDate).toISOString().split("T")[0]}
            onChange={(e) => setFromDate(e.target.value)}
            type="date" />
        </div>
        <div className="col flex-column d-flex align-items-end justify-content-end">
          <button className="w-100 saffron-btn2 small-font" onClick={handleDataFilter}>Submit</button>
        </div>
      </div>

      <Table
        columns={MY_TRANSACTIONS_MANAGEMENT_COLUMNS}
        data={MY_TRANSACTIONS_MANAGEMENT_DATA}
        // footer={MY_TRANSACTIONS_FOOTER}
        itemsPerPage={itemsPerPage}
        totalRecords={totalRecords}
        onPageChange={handlePageChange}
      />

      {depositWithdrawPopupOpen && (
        <DepositWithdrawPopup
          depositWithdrawPopupOpen={depositWithdrawPopupOpen}
          setDepositWithdrawPopupOpen={setDepositWithdrawPopupOpen}
          ticketData={ticketDetails}
          setTicketDetails={setTicketDetails}
          setRejectionReasons={setRejectionReasons}
          rejectionReasons={rejectionReasons}
          fromPath="tickets"
        />
      )}

    </div >
  );
}

export default Tickets;
