import React, { useEffect, useRef, useState } from "react";
import Table from "../../components/Table";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { getOfflineDWDirectors } from "../../api/apiMethods";
import { useNavigate, useSearchParams } from "react-router-dom";

const OfflineDW = () => {
  const [activeSport, setActiveSport] = useState("Sports & Casino");
  const SPORTS_BUTTONS = ["Sports & Casino", "Sports", "Casino"];
  const [totalRecords, setTotalRecords] = useState(0);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const dataFetched = useRef(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const [currentPage, setCurrentPage] = useState(page);
  const itemsPerPage = 4;
  const limit = itemsPerPage;
  const offset = (currentPage - 1) * itemsPerPage;
  const handlePageChange = ({ limit, offset }) => {
    fetchData(limit, offset);
  };
  const navigate = useNavigate();

  const handleNextpage = (id, name) => {
    navigate(`/offline-deposit-withdraw/${id}/${name}`);
  };

  const MY_TRANSACTIONS_MANAGEMENT_COLUMNS = [
    { header: "Name & Role", field: "nameRole" },
    {
      header: (
        <div className="d-flex w-100">
          <span className="w-50">Deposit Chips</span>{" "}
          <span className="w-50 white-space">Withdraw Chips</span>
        </div>
      ),
      field: "CreditD",
    },
    {
      header: (
        <div className="d-flex w-100">
          <span className="w-50">Total Credit Amt</span>{" "}
          <span className="w-50 white-space">Settled Credit Amt</span>
        </div>
      ),
      field: "CreditA",
    },
    { header: "Total Credit Bal", field: "TotalC" },
    { header: "Credit Reference", field: "CreditR" },
    { header: "View Website P/L", field: "userSView" },
  ];

  const fetchData = (limit, offset) => {
    const params = {
      limit: limit,
      offset: offset,
    };
    getOfflineDWDirectors(params)
      .then((response) => {
        console.log(response?.list);
        setData(response?.list);
        setTotalRecords(response?.count);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };
  useEffect(() => {
    if (dataFetched.current) return;
    dataFetched.current = true;
    fetchData(limit, offset);
  }, []);

  const tableData = data?.map((item) => ({
    nameRole: (
      <div>
        <span className="dark-yellow px-1 py-1 black-font small-font mx-2">
          {item?.roal === 1 ? "D" : "SA"}
        </span>
        {item?.name}
      </div>
    ),
    CreditD: (
      <div className="d-flex w-100">
        <span className="w-50">{item?.totalDeposits}</span>
        <span className="w-50">{item?.totalWithdraws}</span>
      </div>
    ),
    CreditA:
      item?.creditAllowed === 2 ? (
        <div className="d-flex w-100">
          <span className="w-50">-</span>
          <span className="w-50">-</span>
        </div>
      ) : (
        <div className="d-flex w-100">
          <span className="w-50">{item?.totalCredit}</span>
          <span className="w-50">{item?.settledCredit}</span>
        </div>
      ),
    TotalC:
      item?.creditAllowed === 2 ? (
        <div>-</div>
      ) : (
        <div>{item?.creditBalance}</div>
      ),
    CreditR:
      item?.creditAllowed === 2 ? (
        <div>
          -{" "}
          <span className="mx-2 white-font yellow-bg br-5 px-2 py-1 disabled-btn">
            Edit
          </span>
        </div>
      ) : (
        <div>
          {item?.maxCreditLimit}
          <span className="mx-2 white-font yellow-bg br-5 px-2 py-1">Edit</span>
        </div>
      ),
    userSView: (
      <div className="d-flex flex-center">
        {item?.creditAllowed === 2 ? (
          <MdOutlineRemoveRedEye size={20} className="disable-eye" />
        ) : (
          <MdOutlineRemoveRedEye
            size={20}
            className="black-font pointer"
            onClick={() => handleNextpage(item?.id, item?.name)}
          />
        )}
      </div>
    ),
  }));

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="d-flex yellow-font mb-0 medium-font">Credit/Other Manual D-W</h6>
      </div>
      {/* <div className="d-flex small-font mb-3">
        {SPORTS_BUTTONS.map((sport, index) => (
          <div
            key={index}
            className={`me-3 ${
              activeSport === sport ? "saffron-btn2" : "white-btn2 pointer"
            }`}
            // onClick={() => handleSportClick(sport)}
          >
            {sport}
          </div>
        ))}
      </div> */}
      {/* <div className="w-100 grey-bg2 d-flex py-3 rounded mb-3">
        <span className="small-font border-right px-3">Your Balance</span>
        <h6 className="green-font fw-600 mb-0 px-3 border-left2">50000000</h6>
      </div> */}
      <div style={{ zIndex: "10" }}>
        <Table
          columns={MY_TRANSACTIONS_MANAGEMENT_COLUMNS}
          data={tableData}
          itemsPerPage={itemsPerPage}
          totalRecords={totalRecords}
          onPageChange={handlePageChange}
          verLine={true}
        />
      </div>
    </div>
  );
};

export default OfflineDW;
