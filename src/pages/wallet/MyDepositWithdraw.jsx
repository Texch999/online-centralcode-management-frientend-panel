import React, { useEffect, useRef, useState } from "react";
import Table from "../../components/Table";
import DepositePopup from "../popups/DepositePopup";
import WithdrawPopup from "../popups/WithdrawPopup";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  depositTikcetDetailsById, getDirectorDepositeTicketsList,
  getOwnerDownlineDepositeTicketsList, managementDepositTikcetDetailsById,
  DeleteDirectorTicketsById
} from "../../api/apiMethods";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import DepositWithdrawPopup from "./DepositWithdrawPopup";
import { BsEye } from "react-icons/bs";
import { useSelector } from "react-redux";
import { MdAutoDelete } from "react-icons/md";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import SuccessPopup from "../popups/SuccessPopup";
import ErrorPopup from "../popups/ErrorPopup";



function MyDepositWithdraw() {
  const [depositePopup, setDepositePopup] = useState(false);
  const [withdrawPopup, setWithdrawPopup] = useState(false);
  const navigate = useNavigate()
  const [deposiTikcteslist, setDeposiTikcteslist] = useState([])
  const [ticketDetails, setTicketDetails] = useState(null)
  const [error, setError] = useState([])
  const [totalRecords, setTotalRecords] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const [currentPage, setCurrentPage] = useState(page);
  const itemsPerPage = 4
  const limit = itemsPerPage
  const offset = (currentPage - 1) * itemsPerPage
  const userRole = localStorage.getItem("role_code");
  const [depositWithdrawPopupOpen, setDepositWithdrawPopupOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState(null);
  const [rejectionReasons, setRejectionReasons] = useState(null);
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [ticketId, setTicketId] = useState(null);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [ErroDiscription, setErroDiscription] = useState("");
  const initialRendering = useRef(true)

  const handleDepositWithdrawPopupOpen = () => {
    setDepositWithdrawPopupOpen(true);
  };

  const typeOptions = [
    { label: "All", value: "" },
    { label: "Deposit", value: "1" },
    { label: "Withdraw", value: "2" },
  ];
  const [selectedType, setSelectedType] = useState("")

  const getDepositTickets = async (limit, offset, startDate, fromDate, type) => {

    let fetchDeposits;
    if (userRole === "management") {
      fetchDeposits = getOwnerDownlineDepositeTicketsList;
    } else {
      fetchDeposits = getDirectorDepositeTicketsList;
    }

    await fetchDeposits({ limit, offset, startDate, fromDate, type })
      .then((response) => {
        setDeposiTikcteslist(response?.records);
        setTotalRecords(response?.total)
      })
      .catch((error) => {
        setError(error?.message);
        console.log("fetchDeposits error", error);
      })
  };


  useEffect(() => {
    if (initialRendering.current) {
      initialRendering.current = false
      return
    }

    getDepositTickets(limit, offset)
  }, [])


  const allCountries = useSelector((item) => item?.allCountries);
  const getCurrency = (id) => {
    const country = allCountries.find((item) => item.id === id);
    return country?.currency_name
  };


  const MY_TRANSACTIONS_DIRECTOR_COLUMNS = [
    { header: "Date & Time", field: "dateTime" },
    { header: "Name & Role", field: "nameRole" },
    { header: "Admin/User Website", field: "adminuserwebiste" },
    { header: "UTR No/ DepositeType", field: "utrno" },
    { header: "D/W", field: "dw" },
    { header: "Chips", field: "chips" },
    { header: "Curr Type/Amt.", field: "currtypeamount" },
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

  const getTicketDetailsById = async (id) => {

    let fetchDeposits;
    if (userRole === "management") {
      fetchDeposits = managementDepositTikcetDetailsById;
    } else {
      fetchDeposits = depositTikcetDetailsById;
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

  const handleDepositAndWithdraw = (id) => {
    if (id) {
      getTicketDetailsById(id)
      handleDepositWithdrawPopupOpen(true)
    }
  }

  const ConfirmationDeleteTicket = (id) => {
    if (id) {
      setTicketId(id)
      setConfirmationPopupOpen(true)
    }
  }

  const handleDeleteTicket = async (page, pageSize) => {

    const limit = pageSize
    const offset = (page - 1) * pageSize

    await DeleteDirectorTicketsById(ticketId)
      .then((response) => {
        if (response.status === true || "true") {
          getDepositTickets(limit, offset)
          setSuccessPopupOpen(true)
        } else {
          console.log(response, "=====> response")
        }
      })
      .catch((error) => {
        setError(error?.message);
        setErrorPopupOpen(true)
        if (error?.message?.errorCode === "DB_ERROR" || "VALID_ERROR") {
          setErroDiscription("Unable to delete the record. Please try again.")
        } else {
          setErroDiscription("Unable to delete the record. Please try again.")
        }

      })
  }

  const MY_TRANSACTIONS_DIRECTOR_DATA =
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
        utrno: <div >{record.transacId}  <br /> {record?.accDtl}</div>,
        dw: <div style={{ color: `${record.ticketType === 1 || 0 ? "#18B962" : "#D0431C"}` }}>
          {record.ticketType === 1 || 0 ? "Deposit" : "Withdaw"}</div>,
        chips: <div style={{ color: `${record.ticketType === 1 || 0 ? "#18B962" : "#D0431C"}` }}>{record?.requChips || "--"}</div>,
        currtypeamount: <div >{record.paidAmount}<br />{getCurrency(record?.reqCurrency)}</div>,

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
              { }
              < MdAutoDelete
                size={22}
                className="eye-icon pointer m-2 pointer"
                onClick={() => ConfirmationDeleteTicket(record.id)}
              />
            </div>
          </div >
        ),
      }
    ));


  const handleDeposit = (action) => {
    navigate("/addnew-payments", {
      state: { actionType: action },
    });
  }

  const handlePageChange = ({ limit, offset }) => {
    getDepositTickets(limit, offset);
  };

  const handleDataFilter = () => {
    if (startDate && fromDate && type) {
      getDepositTickets(limit, offset, startDate, fromDate, type);
    }
  }

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="d-flex yellow-font mb-0">
          My Deposit & Withdraw</h6>
        <div className="d-flex align-items-center gap-1">
          <button className={`me-3 dark-green-bg px-3`} onClick={() =>
            handleDeposit("Deposit")
          }>Deposit</button>
          <button className={`me-3 saffron-btn2 px-3`} onClick={() =>
            handleDeposit("Withdraw")
          } > Withdraw</button>
        </div>
      </div>
      <div className="w-100 flex-between mb-3 py-3 grey-bg2 rounded">
        <div className="col-3 px-3">
          <div className="white-btn2 flex-between">
            <span className="small-font">Sports Rental Amt.</span>
            <span className="medium-font green-font">1000000000</span>
          </div>
        </div>
        <div className="col-3 px-3">
          <div className="white-btn2 flex-between">
            <span className="small-font">Sports & Casino Amt.</span>
            <span className="medium-font green-font">1000000000</span>
          </div>
        </div>
        <div className="col-3 px-3">
          <div className="white-btn2 flex-between">
            <span className="small-font">Total Withdraw</span>
            <span className="medium-font green-font">1000000000</span>
          </div>
        </div>
        <div className="col-3 px-3">
          <div className="white-btn2 flex-between">
            <span className="small-font">Net P/L</span>
            <span className="medium-font green-font">1000000000</span>
          </div>
        </div>
      </div>
      <div className="w-100 flex-between mb-3">
        {/* <div className="d-flex small-font">
          {SPORTS_BUTTONS?.map((sport, index) => (
            <div
              key={index}
              className={`me-3 ${activeSport === sport ? "saffron-btn2" : "white-btn2 pointer"
                }`}
              onClick={() => handleSportClick(sport)}
            >
              {sport}
            </div>
          ))}
        </div> */}
        <div className="w-70 row">
          <div className="col flex-column">
            <label className="black-text4  small-font mb-1">Type</label>
            <Select
              className="small-font white-bg input-border rounded"
              options={typeOptions}
              placeholder="Select Type"
              styles={{
                ...customStyles,
                control: (base) => ({
                  ...base,
                  backgroundColor: "white",
                }),
              }}
              value={selectedType}
              onChange={(option) => setSelectedType(option)}
            />
          </div>
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
      </div>

      <Table
        columns={MY_TRANSACTIONS_DIRECTOR_COLUMNS}
        data={MY_TRANSACTIONS_DIRECTOR_DATA}
        itemsPerPage={itemsPerPage}
        totalRecords={totalRecords}
        onPageChange={handlePageChange}
      />

      {depositePopup && (
        <DepositePopup
          setDepositePopup={setDepositePopup}
          depositePopup={depositePopup}
        />
      )}

      {withdrawPopup && (
        <WithdrawPopup
          setWithdrawPopup={setWithdrawPopup}
          withdrawPopup={withdrawPopup}
        />
      )}

      {depositWithdrawPopupOpen && (
        <DepositWithdrawPopup
          depositWithdrawPopupOpen={depositWithdrawPopupOpen}
          setDepositWithdrawPopupOpen={setDepositWithdrawPopupOpen}
          ticketData={ticketDetails}
          setTicketDetails={setTicketDetails}
          rejectionReasons={rejectionReasons}
          setRejectionReasons={setRejectionReasons}
          fromPath="mydepositwithdraw"
        />
      )}

      {
        confirmationPopupOpen && (
          <ConfirmationPopup
            confirmationPopupOpen={confirmationPopupOpen}
            setConfirmationPopupOpen={setConfirmationPopupOpen}
            discription="Are you sure you want to delete this ticket?"
            submitButton="Confirm"
            onSubmit={handleDeleteTicket}
          />
        )
      }
      {successPopupOpen && (
        <SuccessPopup
          successPopupOpen={successPopupOpen}
          setSuccessPopupOpen={setSuccessPopupOpen}
          discription="Ticket deleted successfully"
        />
      )}

      {errorPopupOpen && (
        <ErrorPopup
          errorPopupOpen={errorPopupOpen}
          setErrorPopupOpen={setErrorPopupOpen}
          discription={ErroDiscription}

        />
      )}

    </div>
  );
}

export default MyDepositWithdraw;
