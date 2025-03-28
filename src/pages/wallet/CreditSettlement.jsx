import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { customStyles } from "../../components/ReactSelectStyles";
import Select from "react-select";
import Table from "../../components/Table";
import { IoEye, IoEyeOff, IoEyeOutline } from "react-icons/io5";
import ReturnCreditModal from "./ReturnCreditModal";
import { creditFullSettlement, getCreditUSersList, getOfflineDWDirectors } from "../../api/apiMethods";
import SuccessPopup from "../popups/SuccessPopup";
import { CircleLoader } from "react-spinners";

const CreditSettlement = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role_code");
  const [returnCreditModal, setReturnCreditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pswdVisible, setPswdVisible] = useState(false);
  const [creditUserList, setCreditUserList] = useState([]);
  const [totalRecords, setTotalRecords] = useState([]);
  const [settlementAmounts, setSettlementAmounts] = useState({});
  const [payload, setPayload] = useState([]); // State to store the payload
  const itemsPerPage = 9;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const [currentPage, setCurrentPage] = useState(page);
  const [error, setError] = useState("");
  const [downlines, setDownlines] = useState([]);
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [errors, setErrors] = useState({
    selectedAdminId: "",
  });
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [parentPassword, setParentPassword] = useState("");
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [discription, setDiscription] = useState("");
  const [apiLoading, setApiLoading] = useState(false);

  const GetAllDirectors = () => {
    getOfflineDWDirectors()
      .then((response) => {
        const options = response?.list?.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setDownlines(options);
      })
      .catch((error) => {
        console.error(error?.message || "Failed to fetch directors");
      });
  };

  const getAllCreditUsersList = (limit, offset, adminId) => {
    setApiLoading(true)
    getCreditUSersList({ limit, offset, adminId })
      .then((response) => {
        setApiLoading(false)
        setCreditUserList(response.records);
        setTotalRecords(response.totalCount);
      })
      .catch((error) => {
        setCreditUserList([]);
        setApiLoading(false)
        setError(error?.message || "API request failed");
      });
  };

  useEffect(() => {
    const limit = itemsPerPage;
    const offset = (page - 1) * itemsPerPage;
    getAllCreditUsersList(limit, offset);
  }, []);

  useEffect(() => {
    GetAllDirectors();
  }, []);

  const handleFullSettled = (id, balance) => {

    setSettlementAmounts((prev) => ({
      ...prev,
      [id]: balance,
    }));

    const newPayload = [{ id, amount: balance }];
    setPayload(newPayload);
  };

  const handleFillAll = () => {
    const newSettlementAmounts = {};
    const newPayload = creditUserList.map((user) => {
      newSettlementAmounts[user.id] = user.credit_balance;
      return {
        id: user.id,
        amount: user.credit_balance,
      };
    });

    setSettlementAmounts(newSettlementAmounts);
    setPayload(newPayload);
  };

  const MY_TRANSACTIONS_MANAGEMENT_COLUMNS = [
    { header: "Name & Role", field: "nameRole" },
    {
      header: (
        <div className="d-flex w-100">
          <span className="w-50">Admin Website</span>
        </div>
      ),
      field: "adminweb",
    },
    {
      header: (
        <div className="d-flex w-100">
          <span className="w-50">User Website</span>{" "}
        </div>
      ),
      field: "userwb",
    },
    { header: "Total Credit", field: "TotalC" },
    { header: "Settled Amt.", field: "sAmt" },
    { header: "Bal. Credit", field: "balCredit" },
    { header: "Enter Settlement Amount", field: "entersa" },
    { header: "View", field: "view" },
  ];

  const data = creditUserList?.map((list) => ({
    nameRole: (
      <div className="small-font">
        <span className="dark-yellow px-1 py-1 mx-1">{list?.type == 1 ? "D" : "SA"}</span>{list?.name}
      </div>
    ),
    adminweb: <div>{list?.adminPan}</div>,
    userwb: <div>{list?.userPan}</div>,
    TotalC: <div>{list?.total_credit}</div>,
    sAmt: <div>{list?.settled_credit}</div>,
    balCredit: <div className="red-font">{list?.credit_balance}</div>,
    entersa: (
      <div className="d-flex flex-between">
        <div className="white-btn2">{settlementAmounts[list.id] || "0.0"}</div>
        <div
          className="saffron-btn2 white-space"
          onClick={() => handleFullSettled(list.id, list.credit_balance)}
        >
          Full Settled
        </div>
      </div>
    ),
    view: (
      <div className="d-flex flex-between pointer">
        <IoEyeOutline
          className="mx-1"
          size={18}
          onClick={() => navigate("/settlement-transaction",
            { state: { userId: list.id, userName: list.name, roleType: list.type } }
          )}
        />
        <div
          className="saffron-btn2 white-space pointer"
          onClick={() => {
            setReturnCreditModal(true);
            setSelectedUserId({ id: list.id, name: list.name, role: list.type });
          }}
        >
          Return Credit Chips
        </div>
      </div>
    ),
  }));

  const footer = [
    { header: "Total" },
    { header: "" },
    { header: "" },
    { header: "0.0" },
    { header: "0.0" },
    { header: "0.0" },
    { header: "" },
    { header: "" },
  ];

  const handleFiltrationSubmit = () => {
    const newErrors = {
      selectedAdminId: "",
    };

    if (!selectedAdminId?.value) {
      newErrors.selectedAdminId = "Please select an admin.";
      setErrors(newErrors);
      return;
    }
    const limit = itemsPerPage;
    const offset = (page - 1) * itemsPerPage;
    const userId = selectedAdminId?.value;
    getAllCreditUsersList(limit, offset, userId);
  };

  const handlePageChange = ({ limit, offset }) => {
    if (role === "management") {
      getAllCreditUsersList(limit, offset);
    } else {
      console.log("director panel");
    }
  };

  const hanldeSettlement = () => {
    if (!payload || Object.keys(payload).length === 0) {
      return;
    }

    const data = {
      list: payload,
      parentPassword: parentPassword,
    };
    setIsLoading(true)
    creditFullSettlement(data)
      .then(() => {
        const limit = itemsPerPage;
        const offset = (page - 1) * itemsPerPage;
        getAllCreditUsersList(limit, offset);
        setIsLoading(false)
        setSuccessPopupOpen(true)
        setDiscription("Credit Settled Successfully");
        setPayload([])
        setParentPassword("")
        setTimeout(() => {
          setSuccessPopupOpen(false);
        }, 3000);
      })
      .catch((error) => {
        setApiError(error?.message)
        setIsLoading(false)
      });
  };

  const handleClearAll = () => {
    setPayload([])
  }
  return (
    <>
      <div>
        <div className="flex-between mb-3 mt-1">
          <div className="d-flex align-items-center yellow-font fw-600">
            <span>
              <MdOutlineKeyboardArrowLeft
                size={22}
                onClick={() => navigate(-1)}
              />
            </span>
            <span className="yellow-font">Credit & Settlement</span>
          </div>

          <div className="input-pill d-flex align-items-center rounded-pill px-2 py-1">
            <FaSearch size={16} className="grey-clr me-2" />
            <input
              className="small-font all-none"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="input-css px-2 medium-font">
          <div className="d-flex flex-start">
            {" "}
            <span className="border-right px-1">Your Balance</span>{" "}
            <span className="green-font mx-1">88,414</span>
          </div>
        </div>
        <div className="d-flex my-1">
          <div className="flex-column col-2 me-3">
            <label className="black-text4 small-font mb-1 ms-1">
              Select Admin Name
            </label>
            <Select
              className="small-font"
              options={downlines}
              placeholder="Select"
              styles={customStyles}
              onChange={(option) => {
                setSelectedAdminId(option);
                setErrors((prev) => ({ ...prev, selectedAdminId: "" }));
              }}
              maxMenuHeight={120}
              menuPlacement="auto"
              classNamePrefix="custom-react-select"
            />
            {errors.selectedAdminId && (
              <div className="text-danger small-font">
                {errors.selectedAdminId}
              </div>
            )}
          </div>
          <div className="flex-column col-1 d-flex align-items-end justify-content-end">
            <button className="w-100 saffron-btn2 small-font" onClick={handleFiltrationSubmit}>Submit</button>
          </div>
        </div>
        {apiLoading ? (
          <div className="d-flex flex-column flex-center mt-10rem align-items-center">
            <CircleLoader color="#3498db" size={40} />
            <div className="medium-font black-font my-3">
              Just a moment...............⏳
            </div>
          </div>
        ) : (
          <div className="mt-3" style={{ zIndex: "10" }}>
            <Table
              columns={MY_TRANSACTIONS_MANAGEMENT_COLUMNS}
              data={data}
              footer={footer}
              verLine={true}
              onPageChange={handlePageChange}
              totalRecords={totalRecords}
            />
          </div>
        )}

        <div className="row small-font my-2 align-items-center">
          <div className="small-font my-1 col-2">Management Password</div>

          <div className="col-4">
            <div className="input-bg d-flex br-5 py-2 px-2 flex-between">
              <input
                className="all-none w-100"
                type={pswdVisible ? "text" : "password"}
                placeholder="Enter Password"
                onChange={(e) => setParentPassword(e.target.value)}
              />
              {pswdVisible ? (
                <IoEye
                  className="black-font"
                  size={15}
                  onClick={() => setPswdVisible(false)}
                />
              ) : (
                <IoEyeOff
                  className="black-font"
                  size={15}
                  onClick={() => setPswdVisible(true)}
                />
              )}
            </div>
          </div>
          <div className="col-2">
            <div className="saffron-btn2 pointer" onClick={handleFillAll}>Fill all</div>
          </div>
          <div className="col-2">
            <div className="saffron-btn2 pointer" onClick={hanldeSettlement} disabled={isLoading}
            >
              {isLoading ? (
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                >
                  <span className="visually-hidden">Submiting...</span>
                </div>
              ) : (
                "Settled"
              )}
            </div>
          </div>
          <div className="col-2">
            <div className="white-btn2 pointer" onClick={handleClearAll}>Clear All</div>
          </div>
        </div>
        <div>{apiError}</div>
      </div >

      {returnCreditModal && (
        <ReturnCreditModal
          show={returnCreditModal}
          setShow={setReturnCreditModal}
          selectedUserId={selectedUserId}
          getAllCreditUsersList={getAllCreditUsersList}
        />
      )}
      {successPopupOpen && (
        <SuccessPopup
          successPopupOpen={successPopupOpen}
          setSuccessPopupOpen={setSuccessPopupOpen}
          discription={discription}
        />
      )}
    </>
  );
};

export default CreditSettlement;