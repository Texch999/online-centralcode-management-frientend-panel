import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import Table from "../../components/Table";
import { SlPencil } from "react-icons/sl";
import { FaRegTrashCan } from "react-icons/fa6";
import SettledPopup from "./SettledPopup";
import { useNavigate } from "react-router-dom";
import { deleteVendorpayment, getSettledHistory } from "../../api/apiMethods";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import { useSelector } from "react-redux";
import SuccessPopup from "../popups/SuccessPopup";
import moment from "moment/moment";

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
  const [paymentId, setPayId] = useState(null);
  const handleSettledPopupOpen = () => {
    setSettledPopupOpen(true);
  };
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);
  const handleDelete = (vid, payid, status) => {
    setConfirmationModal(true);
    setVId(vid);
    setPayId(payid);
    setStatusId(status);
  };

  const getCurrencyName = (id) => {
    const currency = allCountries.find((c) => c.id === id);
    console.log(currency);
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

  const getPayemnts = () => {
    getSettledHistory()
      .then((response) => {
        if (response) {
          setData(response?.venPayments);
        }
      })
      .catch((error) => {
        setError(error?.message);
      });
  };
  useEffect(() => {
    getPayemnts();
  }, []);

  // suspend pay
  const suspendVendorPayment = () => {
    setBlockLoader(true);
    setConfirmationModal(true);
    deleteVendorpayment(venId, paymentId)
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

  const SETTLED_HISTORY_DATA = data?.map((item) => ({
    date_time: moment(item?.created_date).format("YYYY-MM-DD hh:mm A"),
    pay_from: item?.payfrom,
    received_to: item?.name, // no field from api
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
              onClick={handleSettledPopupOpen}
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
          <input className="small-font all-none" placeholder="Search..." />
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
        <div className="white-btn2 medium-font px-3">Settled History</div>
      </div>
      <div className="row mb-3 w-50">
        <div className="col flex-column">
          <label className="black-text4 small-font mb-1">From</label>
          <input className="input-css2 small-font" type="date" />
        </div>
        <div className="col flex-column">
          <label className="black-text4 small-font mb-1">To</label>
          <input className="input-css2 small-font" type="date" />
        </div>
        <div className="col  flex-column d-flex align-items-end justify-content-end">
          <button className="w-100 saffron-btn2 small-font">Submit</button>
        </div>
      </div>
      <Table
        columns={SETTLED_HISTORY_COLUMNS}
        data={SETTLED_HISTORY_DATA}
        itemsPerPage={2}
      />
      <SettledPopup
        setteledPopupOpen={setteledPopupOpen}
        setSettledPopupOpen={setSettledPopupOpen}
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
