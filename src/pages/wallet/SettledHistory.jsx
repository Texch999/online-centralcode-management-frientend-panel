import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import Table from "../../components/Table";
import { SlPencil } from "react-icons/sl";
import { FaRegTrashCan } from "react-icons/fa6";
import SettledPopup from "./SettledPopup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { deleteVendorpayment, getSettledHistory } from "../../api/apiMethods";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import { useSelector } from "react-redux";
import SuccessPopup from "../popups/SuccessPopup";
import moment from "moment/moment";
import { Spinner } from "react-bootstrap";

function SettledHistory() {
  const navigate = useNavigate();
  const [setteledPopupOpen, setSettledPopupOpen] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [statusId, setStatusId] = useState(null);
  const [blockLoader, setBlockLoader] = useState(false);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const allCountries = useSelector((item) => item?.allCountries);
  const [msg, setMsg] = useState("");
  const [venId, setVId] = useState(null);
  const [payId, setPayId] = useState(null);
  const [editPaymentId, setEditPaymentId] = useState();
  const [settledName, setSettledName] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const itemsPerPage = 5;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const [currentPage, setCurrentPage] = useState(page);
  const [totalRecords, setTotalRecords] = useState([]);
  const handleSettledPopupOpen = (id, name, vid) => {
    setSettledPopupOpen(true);
    setEditPaymentId(id);
    setSettledName(name);
    setVId(vid);
  };
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [dateError, setDateError] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const filteredData = data?.filter((item) =>
    item?.name?.toLowerCase().includes(searchInput.toLowerCase())
  );
  const handleDelete = (vid, payid, status) => {
    setConfirmationModal(true);
    setVId(vid);
    setPayId(payid);
    setStatusId(status);
  };

  const getCurrencyName = (id) => {
    const currency = allCountries.find((c) => c.id === id);
    return currency ? currency.currency_name : "Unknown";
  };
  const SETTLED_HISTORY_COLUMNS = [
    { header: "Date & Time", field: "date_time" },
    { header: "Pay From", field: "pay_from" },
    { header: "Received To", field: "received_to" },
    { header: "Trn Type", field: "transaction_type" },
    { header: "Paid Amt", field: "paid_amount" },
    { header: "Currency", field: "currency" },
    { header: "Paid Amt. (Rs)", field: "paid_amount_rs" },
    { field: "action", width: "5%" },
  ];

  const getPayemnts = (limit, offset, fromDate, toDate, callback) => {
    const params = {
      offset: offset,
      limit: limit,
      fromDate: fromDate,
      toDate: toDate,
    };

    setLoading(true);
    getSettledHistory(params)
      .then((response) => {
        if (response) {
          setLoading(false);
          if (callback) callback();
          setData(response?.venPayments);
          setTotalRecords(response?.totalCount);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error?.message);
      });
  };
  useEffect(() => {
    const limit = itemsPerPage;
    const offset = (page - 1) * itemsPerPage;
    getPayemnts(limit, offset);
  }, []);

  const handleSubmit = () => {
    if (!fromDate || !toDate) {
      setDateError("Please select both From and To dates");
      return;
    }
    setDateError("");
    const limit = itemsPerPage;
    const offset = (currentPage - 1) * itemsPerPage;
    getPayemnts(limit, offset, fromDate, toDate, () => {
      setSubmitLoading(false);
    });
  };

  const handlePageChange = ({ limit, offset }) => {
    getPayemnts(limit, offset);
  };

  // suspend pay
  const suspendVendorPayment = () => {
    setBlockLoader(true);
    setConfirmationModal(true);
    deleteVendorpayment(venId, payId)
      .then((response) => {
        if (response) {
          setBlockLoader(false);
          setMsg(response?.message);
          setSuccessPopupOpen(true);
          setTimeout(() => {
            setSuccessPopupOpen(false);
            setConfirmationModal(false);
          }, 3000);
        }
      })
      .catch((error) => {
        setBlockLoader(false);
        setError(error?.message);
      });
  };

  const SETTLED_HISTORY_DATA = filteredData?.map((item) => ({
    date_time: moment(item?.created_date).format("YYYY-MM-DD hh:mm A"),
    pay_from: item?.payfrom,
    received_to: item?.name,
    transaction_type: item?.paymentMode,
    paid_amount: item?.amount, // here whic amount need to dispaly inr or cur amount
    currency: getCurrencyName(item?.currency),
    paid_amount_rs: <div className="yellow-font">{item?.inrAmount}</div>,
    action: (
      <div className="flex-end">
        <div>
          {item?.status === 1 ? (
            <SlPencil
              size={18}
              className="black-text me-2"
              onClick={() =>
                handleSettledPopupOpen(item?.id, item?.name, item?.venId)
              }
            />
          ) : (
            <SlPencil
              size={18}
              className="black-text me-2 disabled-btn"
              // onClick={handleSettledPopupOpen}
            />
          )}
        </div>
        <div>
          {item?.status === 1 ? (
            <FaRegTrashCan
              size={18}
              className="black-text"
              onClick={() => handleDelete(item?.venId, item?.id, item?.status)}
            />
          ) : (
            <FaRegTrashCan size={18} className="black-text disabled-btn" />
          )}
        </div>
      </div>
    ),
  }));

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="d-flex yellow-font mb-0">
          <span onClick={() => navigate(-1)}>My Vendors Account</span>
          <span className="ms-2 flex-center">
            <FiChevronRight />
            Settled History
          </span>
        </h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input
            className="small-font all-none"
            placeholder="Search by receiver... "
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-between mb-3">
        <div className="w-50 d-flex p-3 grey-bg2 rounded">
          <div className="col-4 pe-3 flex-center">
            <span className="w-100 saffron-btn2 medium-font">
              Owner Balance
            </span>
          </div>
          <div className="col-8 white-btn2 flex-between">
            <span className="small-font">Casino Balance Chips</span>
            <span className=" medium-font">1000000000</span>
          </div>
        </div>
        {/* <div className="white-btn2 medium-font px-3">Settled History</div> */}
      </div>
      <div className="row mb-3 w-50">
        <div className="col flex-column">
          <label className="black-text4 small-font mb-1">From</label>
          {/* <input className="input-css2 small-font" type="date" /> */}
          <input
            className="input-css2 small-font"
            type="date"
            value={fromDate}
            onChange={(e) => {
              setFromDate(e.target.value);
              setDateError("");
            }}
          />
        </div>
        <div className="col flex-column">
          <label className="black-text4 small-font mb-1">To</label>
          {/* <input className="input-css2 small-font" type="date" /> */}
          <input
            className="input-css2 small-font"
            type="date"
            value={toDate}
            onChange={(e) => {
              setToDate(e.target.value);
              setDateError("");
            }}
          />
        </div>
        <div className="col  flex-column d-flex align-items-end justify-content-end">
          <button
            className={`w-100 saffron-btn2 small-font ${
              submitLoading ? "disabled-btn" : ""
            }`}
            onClick={handleSubmit}
          >
            {submitLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="ms-2">Submit</span>
              </>
            ) : (
              <div>Submit</div>
            )}
          </button>
        </div>
      </div>
      {loading ? (
        <div className="spinner">
          <div className="spinner-circle"></div>
        </div>
      ) : (
        <Table
          columns={SETTLED_HISTORY_COLUMNS}
          data={SETTLED_HISTORY_DATA}
          handlePageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalRecords={totalRecords}
        />
      )}
      <SettledPopup
        setteledPopupOpen={setteledPopupOpen}
        setSettledPopupOpen={setSettledPopupOpen}
        setEditPaymentId={setEditPaymentId}
        editPaymentId={editPaymentId}
        settledName={settledName}
        venId={venId}
      />

      <ConfirmationPopup
        confirmationPopupOpen={confirmationModal}
        setConfirmationPopupOpen={() => setConfirmationModal(false)}
        discription={`Are you sure you want to ${
          statusId === 1 ? "In-Active" : "Active"
        } this Payment Mode?`}
        submitButton={`${statusId === 1 ? "In-Active" : "Active"}`}
        onSubmit={suspendVendorPayment}
        blockLoader={blockLoader}
        setBlockLoader={setBlockLoader}
      />

      {successPopupOpen && (
        <SuccessPopup
          successPopupOpen={successPopupOpen}
          setSuccessPopupOpen={setSuccessPopupOpen}
          discription={msg}
        />
      )}
    </div>
  );
}

export default SettledHistory;
