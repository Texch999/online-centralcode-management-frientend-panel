import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import { getDownlineTransactionById } from "../../api/apiMethods";
import { useSearchParams } from "react-router-dom";

const DwnlineTransactionHistory = () => {
  const location = useLocation();
  const userId = location.state?.userId || null;
  const navigate = useNavigate();
  const [activeSport, setActiveSport] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [userName, setUserName] = useState("");
  const [trasactionData, setTrasactionData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const itemsPerPage = 9;
  const buttons = ["All", "Deposit", "Withdraw"];
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dateError, setDateError] = useState("");

  const COLUMNS = [
    { header: "S No", field: "sno" },
    { header: "Date & Time", field: "datetime" },
    { header: "Debit", field: "debit" },
    { header: "Credit", field: "credit" },
    { header: "Balance", field: "bal" },
    { header: "Desccription", field: "desc" },
    { header: "From-To", field: "fromto" },
  ];

  const handleSportClick = (sport) => {
    setActiveSport(sport);
    const limit = itemsPerPage;
    const offset = (page - 1) * itemsPerPage;
    getDownlineTransaction(limit, offset, sport, fromDate, toDate);
  };

  const getDownlineTransaction = (limit, offset, type = "", fromDate = "", toDate = "") => {
    const params = {
      limit: limit,
      offset: offset,
      type: type === "All" ? "" : type == "Deposit" ? 1 : 2,
      fromDate: fromDate,
      toDate: toDate,
    };

    const id = userId;
    setLoading(true);
    getDownlineTransactionById({ id, params })
      .then((response) => {
        setTrasactionData(response?.records);
        setUserName(response?.name);
        setTotalRecords(response?.count);
      })
      .catch((error) => {
        console.error(error?.message || "Failed to fetch transactions");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = () => {
    if (!toDate) {
      setDateError("Please select 'To' date.");
      return;
    }

    setDateError("");
    const limit = itemsPerPage;
    const offset = (page - 1) * itemsPerPage;
    getDownlineTransaction(limit, offset, activeSport, fromDate, toDate);
  };

  useEffect(() => {
    const limit = itemsPerPage;
    const offset = (page - 1) * itemsPerPage;
    getDownlineTransaction(limit, offset, activeSport, fromDate, toDate);
  }, [userId, page, activeSport, fromDate, toDate]);

  const DATA = trasactionData?.map((trx, index) => ({
    sno: <div>{trx.id}</div>,
    datetime: <div className="black-font">{trx?.created_date}</div>,
    desc: <div>{trx?.description}</div>,
    credit: <div className="green-font">{trx?.deposit}</div>,
    debit: <div className="red-font">{trx?.withdraw}</div>,
    bal: <div>{trx?.balance}</div>,
    fromto: <div>{`${trx?.cfrom == 0 ? "Management" : userName} - ${trx?.cto == 0 ? "Management" : userName}`}</div>,
  }));
  const handlePageChange = ({ limit, offset }) => {
    getDownlineTransaction(limit, offset);
  };

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <div className="d-flex align-items-center black-font fw-600">
          <span>
            <MdOutlineKeyboardArrowLeft size={22} onClick={() => navigate(-1)} />
          </span>
          <span className="black-font">Transaction History</span>
        </div>
        <div className="d-flex align-items-center">
          <div className="input-pill d-flex align-items-center rounded-pill px-2 py-1 me-3">
            <FaSearch size={16} className="grey-clr me-2" />
            <input
              className="small-font all-none"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="my-2 d-flex flex-between">
        <div className="d-flex">
          {buttons?.map((sport, index) => (
            <div
              key={index}
              className={`me-3 pointer small-font ${activeSport === sport ? "saffron-btn2" : "white-btn2"
                }`}
              onClick={() => handleSportClick(sport)}
            >
              {sport}
            </div>
          ))}
        </div>
        <div className="d-flex">
          <div className="flex-column me-2">
            <label className="black-text4 small-font mb-1">From</label>
            <input
              className="input-css2 small-font"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="flex-column me-2">
            <label className="black-text4 small-font mb-1">To</label>
            <input
              className="input-css2 small-font"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <div className="flex-column d-flex align-items-end justify-content-end me-1">
            <button className="w-100 saffron-btn2 small-font" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
      {dateError && <div className="text-danger small-font mt-1">{dateError}</div>}
      <div className="mt-1">
        <Table columns={COLUMNS} data={DATA} itemsPerPage={itemsPerPage} totalRecords={totalRecords} handlePageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default DwnlineTransactionHistory;