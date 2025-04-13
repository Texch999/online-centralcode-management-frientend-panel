import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import Table from "../../components/Table";
import SettlementTransModal from "./SettlementTransModal";
import {
  getOfflineDWDirectors,
  getSettlementTransactionById,
} from "../../api/apiMethods";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Spinner } from "react-bootstrap";
import SuccessPopup from "../popups/SuccessPopup";

const SettlementTransaction = () => {

  const location = useLocation();
  const { userId, userName, roleType } = location.state || {};
  const role = localStorage.getItem("role_code");
  const [settleModalShow, setSettleModalShow] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [settleModalTransaction, setSettleModalTransaction] = useState([]);
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [downlines, setDownlines] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [totalRecords, setTotalrecords] = useState(null);
  const itemsPerPage = 9;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const [totalCredit, setTotalCredit] = useState("");
  const [settledCredit, setSettledCredit] = useState("");
  const [creditBal, setCreditBal] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [successPopupOpen, setSuccessPopupOpen] = useState(false)
  const [discription, setDiscription] = useState("")

  const [errors, setErrors] = useState({
    selectedAdminId: "",
    selectedType: "",
    fromDate: "",
    toDate: "",
  });

  const getSettleTransaction = (
    limit,
    offset,
    selectType,
    startDate,
    endDate
  ) => {
    const params = {
      limit: limit,
      offset: offset,
      selectType: selectType?.value || "",
      startDate: startDate,
      endDate: endDate,
    };
    setApiLoading(true)
    getSettlementTransactionById({ userId, params })
      .then((response) => {
        setApiLoading(false)
        setLoading(false)
        if (response.records) {
          setSettleModalTransaction(response.records);
          setTotalCredit(response.totalCredit);
          setSettledCredit(response.settledCredit);
          setCreditBal(response.creditBalance);
          setTotalrecords(response.count);
          setName(response.name);
        } else {
          setLoading(false)
          setApiLoading(false)
          console.error("Something Went Wrong");
        }
      })
      .catch((error) => {
        setLoading(false)
        setApiLoading(false)
        console.error(error?.message || "Failed to fetch transactions");
      });
  };

  useEffect(() => {
    const limit = itemsPerPage;
    const offset = (page - 1) * itemsPerPage;
    if (userId) {
      getSettleTransaction(limit, offset, selectedType, fromDate, toDate);
    }
  }, [selectedAdminId, page]);

  // Transaction type options
  const TrasactionType = [
    { value: "0", label: "All" },
    { value: "1", label: "Credit" },
    { value: "2", label: "Debit" },
  ];

  // Validate fields
  const validateFields = () => {
    const newErrors = {
      selectedType: "",
      fromDate: "",
      toDate: "",
    };


    if (!fromDate) {
      newErrors.fromDate = "Please select a 'From' date.";
    }

    if (fromDate && !toDate) {
      newErrors.toDate = "Please select a To date.";
    }

    if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
      newErrors.toDate = "From date cannot be greater than To date.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);

  };

  // Handle submit button click
  const handleSubmit = () => {
    const isValid = validateFields();
    if (!isValid) return;
    const type = selectedType.value == "0" ? "" : selectedType
    // If all validations pass, proceed with API call
    const limit = itemsPerPage;
    const offset = (page - 1) * itemsPerPage;
    setLoading(true)
    getSettleTransaction(limit, offset, type, fromDate, toDate);
  };

  // Handle settlement button click
  const hanldeSettlement = () => {
    if (!userId) {
      return;
    }
    setSettleModalShow(true);
  };

  // Table columns
  const COLUMNS = [
    { header: "Date & Time", field: "dt" },
    { header: "Credit", field: "credit" },
    { header: "Debit", field: "debit" },
    { header: "Closing", field: "closing" },
    { header: "Description", field: "desc" },
    { header: "From → To", field: "from" },
  ];

  // Map transaction data to table rows
  const DATA = settleModalTransaction.map((trx) => ({
    dt: <div>{`${new Date(trx.crDate).toLocaleDateString()} ${new Date(trx.crDate).toLocaleTimeString()}`}</div>,
    credit: <div className="green-font">{trx.credit}</div>,
    debit: <div className="red-font">{trx.debit}</div>,
    closing: <div>{trx.closBal}</div>,
    desc: <div>{trx.desc}</div>,
    from: <div>{trx.cfrom == 0 ? "Management" : name} → {trx.cto == 0 ? "Management" : name}</div>,
  }));

  // Handle page change
  const handlePageChange = ({ limit, offset }) => {
    if (role === "management" || role === "accounts") {
      getSettleTransaction(limit, offset, selectedType, fromDate, toDate);
    } else {
      console.log("director panel");
    }
  };

  return (
    <div>
      {!apiLoading && (
        <div className="flex-start mb-3 mt-2 align-items-center">
          <div className="d-flex fw-600 yellow-font mb-0 align-items-center">
            <span>
              <MdOutlineKeyboardArrowLeft
                size={25}
                onClick={() => navigate(-1)}
              />
            </span>
            <span> Credit Settlement History</span>
            <span className="Breadcrumbs px-2 rounded medium-font ms-1 text-capitalize black-text "> {userName}</span>
            <span className="ms-1 black-text medium-font"> {roleType == "1" ? "Director" : "Super Admin"} <MdOutlineKeyboardArrowRight size={17} /> </span>
          </div>
        </div>
      )}

      {!apiLoading && (
        <div className="d-flex flex-column gap-2">
          <div className="row">
            <div className="col-2 me-2 align-self-end">
              <div className="white-btn2 flex-between">
                <span className="small-font">Total Credit</span>
                <span className="small-font red-font">
                  {totalCredit > 0 ? totalCredit : 0}
                </span>
              </div>
            </div>
            <div className="col-2 me-2 align-self-end">
              <div className="white-btn2 flex-between">
                <span className="small-font">Paid Credit</span>
                <span className="small-font red-font">
                  {settledCredit > 0 ? settledCredit : 0}
                </span>
              </div>
            </div>
            <div className="col-2 me-2 align-self-end">
              <div className="white-btn2 flex-between">
                <span className="small-font">Bal Credit</span>
                <span className="small-font red-font">
                  {creditBal > 0 ? creditBal : 0}
                </span>
              </div>
            </div>
            <div className="col-1"></div>
          </div>
          <div className="row justify-content-between align-items-center">
            <div className="col-10 d-flex flex-wrap align-items-center">
              <div className="col-2">
                <div className="d-flex flex-column me-3">
                  <label className="black-text4 small-font mb-1">
                    Select Type
                  </label>
                  <Select
                    className="small-font"
                    options={TrasactionType}
                    placeholder="Select"
                    styles={customStyles}
                    maxMenuHeight={120}
                    menuPlacement="auto"
                    classNamePrefix="custom-react-select"
                    onChange={(option) => {
                      setSelectedType(option);
                      setErrors((prev) => ({ ...prev, selectedType: "" })); // Clear error when type is selected
                    }}
                  />

                </div>
              </div>

              {["From", "To"].map((label) => (
                <div key={label} className="col-2 d-flex flex-column mx-2">
                  <label className="black-text4 small-font mb-1">{label}</label>
                  <input
                    className="input-css2 small-font"
                    type="date"
                    onChange={(e) => {
                      if (label === "From") {
                        setFromDate(e.target.value);
                        setErrors((prev) => ({ ...prev, fromDate: "" })); // Clear error when From date is selected
                      } else {
                        setToDate(e.target.value);
                        setErrors((prev) => ({ ...prev, toDate: "" })); // Clear error when To date is selected
                      }
                    }}
                  />
                </div>
              ))}

              <div className="col-1 d-flex align-items-end align-self-end ms-3">
                <button
                  className="saffron-btn2 w-100 small-font"
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : null}

                  {loading ? "Submiting..." : "Submit"}
                </button>
              </div>
            </div>
            <div className="col-10 d-flex flex-wrap align-items-center">
              <div className="col-2">

              </div>

              {["From", "To"].map((label) => (
                <div key={label} className="col-2 d-flex flex-column mx-2">

                  {label === "From" && errors.fromDate && (
                    <div className="text-danger small-font">
                      {errors.fromDate}
                    </div>
                  )}
                  {label === "To" && errors.toDate && (
                    <div className="text-danger small-font">{errors.toDate}</div>
                  )}
                </div>
              ))}
            </div>

            <div className="col-2 d-flex justify-content-end align-self-end pointer">
              <div
                className="white-bg br-5 px-2 py-2 text-center small-font black-border pointer"
                onClick={hanldeSettlement}
              >
                Settlement
              </div>
            </div>
          </div>
        </div>
      )}

      {apiLoading ?
        <div className="spinner">
          <div className="spinner-circle"></div>
        </div>
        :
        <div className="mt-3 py-2">
          <Table
            columns={COLUMNS}
            data={DATA}
            itemsPerPage={itemsPerPage}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
          />
        </div>
      }

      {settleModalShow && userId && (
        <SettlementTransModal
          setSettleModalShow={setSettleModalShow}
          settleModalShow={settleModalShow}
          selectedDirSAId={userId}
          getApi={getSettleTransaction}
          setSuccessPopupOpen={setSuccessPopupOpen}
          setDiscription={setDiscription}
        />
      )}
      {successPopupOpen && (
        <SuccessPopup
          successPopupOpen={successPopupOpen}
          setSuccessPopupOpen={setSuccessPopupOpen}
          discription={discription}
        />
      )}
    </div>
  );
};

export default SettlementTransaction;
