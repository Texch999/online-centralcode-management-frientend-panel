import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { useNavigate, useParams } from "react-router-dom";
import { customStyles } from "../../components/ReactSelectStyles";
import Select from "react-select";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { getDirById } from "../../api/apiMethods";
import OfflineDepositPopup from "../popups/OfflineDepositPopup";

const OfflineDWUser = () => {
  const navigate = useNavigate();
  const params = useParams();
   const [actionType, setActionType] = useState([]);
   const [depositWithdrawPopup, setDepositWithdrawPopup] = useState(false);
   const [selectedDetails, setSelectedDetails] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const itemsPerPage = 4;
  const handlePageChange = ({ limit, offset }) => {
    console.log(limit, offset);
  };

  const adminOptions = [
    { value: "Option 1", label: "Director-Jayanta" },
    { value: "Option 2", label: "Director-Jayanta" },
    { value: "Option 3", label: "Director-Jayanta" },
  ];
  const [dataById, setDataById] = useState([]);
  const [error, setError] = useState("");
  const userId = params?.id;

  const fetchDirById = () => {
    const params = {
      adminPanId: 1,
      userPanId: 1,
    };
    getDirById({ userId, params })
      .then((response) => {
        console.log(response?.list);
        setDataById(response?.list);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };
  useEffect(() => {
    fetchDirById();
  }, []);

  const ActionButtons = ({ onDeposit, onWithdraw }) => (
    <div className="d-flex flex-row justify-content-center align-items-center">
      <button
        className="saffron-btn3 px-2"
        style={{ borderTopLeftRadius: "6px", borderBottomLeftRadius: "6px" }}
        onClick={onDeposit}
      >
        D
      </button>
      <div
        className="saffron-btn3 white-text"
        style={{ pointerEvents: "none" }}
      >
        |
      </div>
      <button
        className="me-2 saffron-btn3 px-2 "
        style={{ borderTopRightRadius: "6px", borderBottomRightRadius: "6px" }}
        onClick={onWithdraw}
      >
        W
      </button>
    </div>
  );

  const COLUMNS = [
    { header: "Website", field: "Website", width: "10%" },
    {
      header: (
        <div className="d-flex w-100">
          <span className="w-50 white-space">Credit Deposit Chips</span>{" "}
          <span className="w-50 white-space">Credit Withdraw Chips</span>
        </div>
      ),
      field: "CreditD",
      width: "30%",
    },
    {
      header: (
        <div className="d-flex w-100">
          <span className="w-50">Credit Amt</span>{" "}
          <span className="w-50 white-space">Settled Credit Amt</span>
        </div>
      ),
      field: "CreditA",
      width: "30%",
    },
    {
      header: <div className="white-space">Total Credit Bal</div>,
      field: "TotalC",
      width: "10%",
    },
    {
      header: <div className="d-felx flex-end">Credit Transaction</div>,
      field: "CreditTrans",
      width: "30%",
    },
  ];
  const tableData = dataById?.map((item) => ({
    Website: (
      <div className="d-flex flex-wrap">
        <span>{item?.adminPanel}</span>
        <span>{item?.userPanel}</span>
        <span>
          {item?.shareType === 1 && <span>Rental -{item?.share}%</span>}
        </span>
      </div>
    ),
    CreditD: (
      <div className="d-flex w-100">
        <span className="w-50">{item?.totalDepost}</span>
        <span className="w-50">{item?.titalWith}</span>
      </div>
    ),
    CreditA: (
      <div className="d-flex w-100">
        <span className="w-50">-</span>
        <span className="w-50">-</span>
      </div>
    ),

    TotalC: <div>-</div>,
    CreditTrans: (
      <div className="d-flex gap-2 align-items-center">
        <div className="d-flex">
          <input type="checkbox" />
          <span className="white-space mx-1">Site Lock</span>
        </div>
        <div className="d-flex">
          {" "}
          <input type="checkbox" />
          <span className="white-space mx-1">Bet Lock</span>
        </div>
        <div className="d-flex">
          {" "}
          <input type="checkbox" />
          <span className="white-space mx-1">Casino Lock</span>
        </div>
        <div>
          <ActionButtons />
        </div>
      </div>
    ),
  }));
  return (
    <>
      <div>
        <div className="flex-between mb-3 mt-2">
          <h6
            className="d-flex yellow-font mb-0 medium-font pointer"
            onClick={() => navigate(-1)}
          >
            Credit/Other Manual D-W -{` ${params?.name}`}
          </h6>
        </div>

        <div className="row">
          <div className="col-3">
            <div className="flex-column me-3">
              <label className="black-text4 small-font mb-1 ms-1">
                Select Admin Panel
              </label>
              <Select
                className="small-font"
                options={adminOptions}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
                classNamePrefix="custom-react-select"
              />
            </div>
          </div>

          <div className="col-3">
            <div className="flex-column me-3">
              <label className="black-text4 small-font mb-1 ms-1">
                Select User Panel
              </label>
              <Select
                className="small-font"
                options={adminOptions}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
                classNamePrefix="custom-react-select"
              />
            </div>
          </div>
        </div>

        <div className="mt-3" style={{ zIndex: "10" }}>
          <Table
            columns={COLUMNS}
            data={tableData}
            itemsPerPage={itemsPerPage}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
            verLine={true}
          />
        </div>
      </div>

      <OfflineDepositPopup
        // actionType={actionType}
        depositWithdrawPopup={depositWithdrawPopup}
        // selectedDetails={selectedDetails}
        setDepositWithdrawPopup={setDepositWithdrawPopup}
      />
    </>
  );
};

export default OfflineDWUser;
