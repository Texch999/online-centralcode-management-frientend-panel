import React, { useRef, useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/Table";
import { BsEye } from "react-icons/bs";
import DepositWithdrawPopup from "./DepositWithdrawPopup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ErrorPopup from "../popups/ErrorPopup";
import SuccessPopup from "../popups/SuccessPopup";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import {
  getOwnerDownlineDepositeTicketsList,
  managementDepositTikcetDetailsById,
  ownerTicketApprove,
  ownerTicketRejection,
  ownerWithdrawTicketApprove,
  ownerWithdrawTicketRejection,
} from "../../api/apiMethods";
import utcDate from "../../utils/utcDateConversion";
import { rfloor } from "../../utils/mathFunctions";
import { CircleLoader } from "react-spinners";

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
  const handleDepositWithdrawPopupOpen = () => { setDepositWithdrawPopupOpen(true) };
  const navigate = useNavigate()
  const [deposiTikcteslist, setDeposiTikcteslist] = useState([])
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
  const [rejectionReasons, setRejectionReasons] = useState(null);
  const [error, setError] = useState([])
  const initialRendering = useRef(true)
  const [ticketDetails, setTicketDetails] = useState(null)
  const [ticketId, setTicketId] = useState(null)
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [ErroDiscription, setErroDiscription] = useState("");
  const [ticketAction, setTicketAction] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [ticketType, setTicketType] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [errors, setErrors] = useState({ startDate: "", fromDate: "", selectedType: "" });

  const typeOptions = [
    { label: "All", value: null },
    { label: "Deposit", value: 1 },
    { label: "Withdraw", value: 2 },
  ];

  // getting all countries details from the redux
  const allCountries = useSelector((item) => item?.allCountries);
  const getCurrency = (id) => {
    const country = allCountries.find((item) => item.id === id);
    return country?.currency_name
  };

  const getDepositTickets = async (limit, offset, startDate, fromDate, type) => {

    let fetchDeposits;
    if (userRole === "management") {
      fetchDeposits = getOwnerDownlineDepositeTicketsList;
    } else {            // director Downline Tickets
      fetchDeposits = getOwnerDownlineDepositeTicketsList
    }
    setApiLoading(true)
    await fetchDeposits({ limit, offset, startDate, fromDate, type })
      .then((response) => {
        setApiLoading(false)
        setDeposiTikcteslist(response?.records);
        setTotalRecords(response?.total)
      })
      .catch((error) => {
        setApiLoading(false)
        setError(error?.message);
        console.log("fetchDeposits error", error);
      })
  };

  // ticket details by the ticket id
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



  const MY_TRANSACTIONS_MANAGEMENT_COLUMNS = [
    { header: "Date & Time", field: "dateTime" },
    { header: "Name & Role", field: "nameRole" },
    { header: "Admin/User Website", field: "adminuserwebiste" },
    { header: "UTR No/ DepositeType", field: "utrno" },
    { header: "D/W", field: "dw" },
    { header: "IsCredit", field: "iscredit" },
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

  // <====================== Deposit  Approve and Rejection =====================>
  const handleTikcetApproveRejection = async (action, reason, ticketType) => {
    const limit = itemsPerPage
    const offset = (page - 1) * itemsPerPage
    let apiCAll
    setTicketAction(action)
    setTicketType(ticketType)
    const data = {
      rejId: reason
    }

    if (action === "APPROVE") {
      apiCAll = ownerTicketApprove
    } else {
      apiCAll = ownerTicketRejection
    }

    await apiCAll(ticketId, data)
      .then((response) => {
        if (response.status === true) {
          getDepositTickets(limit, offset);
          setSuccessPopupOpen(true)
          setDepositWithdrawPopupOpen(false)
          setErroDiscription("")
          setSpinner(false)
        }
      })
      .catch((error) => {
        setError(error?.message);
        setErroDiscription(error?.message)
        setErrorPopupOpen(true)
      })
  }

  // <====================== Withdraw Approve and Rejection =====================>

  const handleWithdrwaTicketApproveRejection = async (action, reason, ticketType) => {
    const limit = itemsPerPage
    const offset = (page - 1) * itemsPerPage
    let apiCAll
    setTicketAction(action)
    setTicketType(ticketType)

    const data = {
      rejId: reason
    }

    if (action === "APPROVE") {
      apiCAll = ownerWithdrawTicketApprove
    } else {
      apiCAll = ownerWithdrawTicketRejection
    }

    await apiCAll(ticketId, data)
      .then((response) => {
        if (response.status === true) {
          getDepositTickets(limit, offset);
          setSuccessPopupOpen(true)
          setDepositWithdrawPopupOpen(false)
          setErroDiscription("")

        }
      })
      .catch((error) => {
        setError(error?.message);
        setErroDiscription(error?.message)
        setErrorPopupOpen(true)
      })
  }


  const MY_TRANSACTIONS_MANAGEMENT_DATA =
    deposiTikcteslist.map((record, index) => (
      {
        dateTime: utcDate(record.date),
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
        dw: <div style={{ color: `${record.ticketType === 1 || record.ticketType === 0 ? "#18B962" : "#D0431C"}` }}>
          {record.ticketType === 1 || record.ticketType === 0 ? "Deposit" : "Withdaw"}</div>,
        iscredit: <div >{record?.iscredit == 1 ? "YES" : "NO"}</div>,
        chips: <div style={{ color: `${record.ticketType === 1 || record.ticketType === 0 ? "#18B962" : "#D0431C"}` }}>{record?.requChips}</div>,
        currtypeamount: <div >{Number(record.paidAmount).toFixed(2)}<br />{getCurrency(record.reqCurrency)}</div>,
        currRate: <div >{record?.curRate ? rfloor((record?.curRate), -6) : 0}<br />{getCurrency(record.reqCurrency)}</div>,
        yourChips: <div >{Number(record?.inrChips).toFixed(2)}</div>,
        yourcurramount: <div >{Number(record?.totCur).toFixed(2)}<br />{getCurrency(107)}</div>,
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
            </div>
          </div >
        ),
      }
    ));

  useEffect(() => {
    getDepositTickets(limit, offset)
  }, [])

  // const handleDeposit = (action) => {
  //   navigate("/addnew-payments", {
  //     state: { actionType: action },
  //   });
  // }

  const handleDepositAndWithdraw = (id) => {
    if (id) {
      setTicketId(id)
      getTicketDetailsById(id)
      handleDepositWithdrawPopupOpen(true)
    }
  }

  const handlePageChange = ({ limit, offset }) => {
    getDepositTickets(limit, offset);
  };

  const handleDataFilter = () => {
    let newErrors = { startDate: "", fromDate: "", selectedType: "" };
    let isValid = true;

    if (!startDate) {
      newErrors.startDate = "Start date is required";
      isValid = false;
    }

    if (!fromDate) {
      newErrors.fromDate = "From date is required";
      isValid = false;
    }

    if (!selectedType) {
      newErrors.selectedType = "Type selection is required";
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }
    const limit = itemsPerPage
    const offset = (page - 1) * itemsPerPage

    setErrors({ startDate: "", fromDate: "", selectedType: "" });
    getDepositTickets(limit, offset, startDate, fromDate, selectedType.value);
  };

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="d-flex yellow-font mb-0">Downline Tickets</h6>
        {/* <---------- deposit and withdraw buttons ------->*/}

        {/* {userRole !== "management" ?
          <div className="d-flex align-items-center gap-1">
            <button className={`me-3 dark-green-bg px-3`} onClick={() =>
              handleDeposit("Deposit")
            }>Deposit</button>
            <button className={`me-3 saffron-btn2 px-3`} onClick={() =>
              handleDeposit("Withdraw")
            } > Withdraw</button>
          </div>
          :
          <div className="input-pill d-flex align-items-center rounded-pill px-2">
            <FaSearch size={16} className="grey-clr me-2" />
            <input className="small-font all-none" placeholder="Search..." />
          </div>} */}

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

      <div className="w-70 row mt-3">
        <div className="col flex-column">
          <label className="black-text4  small-font mb-1">Ticket Type</label>
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
          <p className="small-font red-font">{errors.selectedType}</p>
        </div>

        <div className="col flex-column">
          <label className="black-text4 small-font mb-1">From</label>
          <input
            className="input-css2 small-font"
            type="date"
            value={new Date(startDate).toISOString().split("T")[0]}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <p className="small-font red-font">{errors.startDate}</p>
        </div>

        <div className="col flex-column">
          <label className="black-text4 small-font mb-1">To</label>
          <input
            className="input-css2 small-font"
            value={new Date(fromDate).toISOString().split("T")[0]}
            onChange={(e) => setFromDate(e.target.value)}
            type="date" />
          <p className="small-font red-font">{errors.fromDate}</p>
        </div>

        <div className="col flex-column  justify-content-center">
          <button className="w-100 saffron-btn2 small-font" onClick={handleDataFilter}>Submit</button>
        </div>
      </div>
      {apiLoading ? (
        <div className="d-flex flex-column flex-center mt-10rem align-items-center">
          <CircleLoader color="#3498db" size={40} />
          <div className="medium-font black-font my-3">
            Just a moment...............⏳
          </div>
        </div>) : <Table
        columns={MY_TRANSACTIONS_MANAGEMENT_COLUMNS}
        data={MY_TRANSACTIONS_MANAGEMENT_DATA}
        itemsPerPage={itemsPerPage}
        totalRecords={totalRecords}
        onPageChange={handlePageChange}
      />}


      {depositWithdrawPopupOpen && (
        <DepositWithdrawPopup
          depositWithdrawPopupOpen={depositWithdrawPopupOpen}
          setDepositWithdrawPopupOpen={setDepositWithdrawPopupOpen}
          ticketData={ticketDetails}
          setTicketDetails={setTicketDetails}
          setRejectionReasons={setRejectionReasons}
          rejectionReasons={rejectionReasons}
          fromPath="tickets"
          handleTikcetApproveRejection={handleTikcetApproveRejection}
          handleWithdrwaTicketApproveRejection={handleWithdrwaTicketApproveRejection}
          spinner={spinner}
          setSpinner={setSpinner}
        />
      )}

      {successPopupOpen && (
        <SuccessPopup
          successPopupOpen={successPopupOpen}
          setSuccessPopupOpen={setSuccessPopupOpen}
          discription={`${ticketType} Ticket ${ticketAction === "APPROVE" ? "Approved" : "Rejected"} successfully`}
        />
      )}

      {errorPopupOpen && (
        <ErrorPopup
          errorPopupOpen={errorPopupOpen}
          setErrorPopupOpen={setErrorPopupOpen}
          discription={ErroDiscription}

        />
      )}

    </div >
  );
}

export default Tickets;
