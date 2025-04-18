

// import React, { useEffect, useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { customStyles } from "../../components/ReactSelectStyles";
// import Select from "react-select";
// import Table from "../../components/Table";
// import { IoEye, IoEyeOff, IoEyeOutline } from "react-icons/io5";
// import ReturnCreditModal from "./ReturnCreditModal";
// import { creditFullSettlement, getCreditUSersList, getOfflineDWDirectors } from "../../api/apiMethods";
// import SuccessPopup from "../popups/SuccessPopup";
// import { Spinner } from "react-bootstrap";
// import ErrorComponent from "../../components/ErrorComponent";

// const CreditSettlement = () => {
//   const navigate = useNavigate();
//   const role = localStorage.getItem("role_code");
//   const [returnCreditModal, setReturnCreditModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [pswdVisible, setPswdVisible] = useState(false);
//   const [creditUserList, setCreditUserList] = useState([]);
//   const [totalRecords, setTotalRecords] = useState([]);
//   const [settlementAmounts, setSettlementAmounts] = useState({});
//   const [payload, setPayload] = useState([]);
//   const itemsPerPage = 9;
//   const [searchParams, setSearchParams] = useSearchParams();
//   const page = parseInt(searchParams.get("page") || 1);
//   const [currentPage, setCurrentPage] = useState(page);
//   const [error, setError] = useState("");
//   const [downlines, setDownlines] = useState([]);
//   const [selectedAdminId, setSelectedAdminId] = useState(null);
//   const [errors, setErrors] = useState({ selectedAdminId: "" });
//   const [selectedUserId, setSelectedUserId] = useState(null);
//   const [parentPassword, setParentPassword] = useState("");
//   const [apiError, setApiError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [successPopupOpen, setSuccessPopupOpen] = useState(false);
//   const [discription, setDiscription] = useState("");
//   const [apiLoading, setApiLoading] = useState(false);
//   const [errorDiscription, setErrorDiscription] = useState(false);

//   const GetAllDirectors = () => {
//     getOfflineDWDirectors()
//       .then((response) => {
//         const options = response?.list?.map((item) => ({
//           value: item.id,
//           label: item.name,
//         }));
//         setDownlines(options);
//       })
//       .catch((error) => {
//         console.error(error?.message || "Failed to fetch directors");
//       });
//   };

//   const getAllCreditUsersList = (limit, offset, adminId) => {
//     setApiLoading(true);
//     getCreditUSersList({ limit, offset, adminId })
//       .then((response) => {
//         setApiLoading(false);
//         setCreditUserList(response.records);
//         setTotalRecords(response.totalCount);
//       })
//       .catch((error) => {
//         setCreditUserList([]);
//         setApiLoading(false);
//         setError(error?.message || "API request failed");
//       });
//   };

//   useEffect(() => {
//     const limit = itemsPerPage;
//     const offset = (page - 1) * itemsPerPage;
//     getAllCreditUsersList(limit, offset);
//   }, []);

//   useEffect(() => {
//     GetAllDirectors();
//   }, []);

//   const handleFullSettled = (id, balance) => {
//     setSettlementAmounts((prev) => ({
//       ...prev,
//       [id]: balance,
//     }));

//     const newPayload = [{ id, amount: balance }];
//     setPayload(newPayload);
//   };

//   const handleFillAll = () => {
//     const newSettlementAmounts = {};
//     const newPayload = creditUserList.map((user) => {
//       newSettlementAmounts[user.id] = user.credit_balance;
//       return {
//         id: user.id,
//         amount: user.credit_balance,
//       };
//     });

//     setSettlementAmounts(newSettlementAmounts);
//     setPayload(newPayload);
//   };

//   const handleClearAll = () => {
//     setSettlementAmounts({}); // Reset to empty object
//     setPayload([]); // Clear payload
//   };

//   const MY_TRANSACTIONS_MANAGEMENT_COLUMNS = [
//     { header: "Name & Role", field: "nameRole" },
//     {
//       header: (
//         <div className="d-flex w-100">
//           <span className="w-50">Admin Website</span>
//         </div>
//       ),
//       field: "adminweb",
//     },
//     {
//       header: (
//         <div className="d-flex w-100">
//           <span className="w-50">User Website</span>{" "}
//         </div>
//       ),
//       field: "userwb",
//     },
//     { header: "Total Credit", field: "TotalC" },
//     { header: "Settled Amt.", field: "sAmt" },
//     { header: "Bal. Credit", field: "balCredit" },
//     { header: "Enter Settlement Amount", field: "entersa" },
//     { header: "View", field: "view" },
//   ];

//   const data = creditUserList?.map((list) => ({
//     nameRole: (
//       <div className="small-font">
//         <span className="dark-yellow px-1 py-1 mx-1">{list?.type == 1 ? "D" : "SA"}</span>{list?.name}
//       </div>
//     ),
//     adminweb: <div>{list?.adminPan}</div>,
//     userwb: <div>{list?.userPan}</div>,
//     TotalC: <div>{list?.total_credit}</div>,
//     sAmt: <div>{list?.settled_credit}</div>,
//     balCredit: <div className="red-font">{list?.credit_balance}</div>,
//     entersa: (
//       <div className="d-flex flex-between">
//         <div className="white-btn2 col-6">
//           <input
//             className="w-100 small-font rounded all-none"
//             type="text"
//             placeholder="Enter credit"
//             value={settlementAmounts[list.id] || ""}
//             onChange={(e) => {
//               const iptVal = e.target.value.replace(/[^0-9]/g, "");
//               if (Number(iptVal) > list?.credit_balance) {
//                 handleFullSettled(list.id, iptVal);

//               } else {
//                 handleFullSettled(list.id, iptVal);

//               }
//             }}
//           />
//         </div>
//         <div
//           className="saffron-btn2 white-space pointer"
//           onClick={() => handleFullSettled(list.id, list.credit_balance)}
//         >
//           Full Settled
//         </div>
//       </div>
//     ),
//     view: (
//       <div className="d-flex flex-between pointer">
//         <IoEyeOutline
//           className="mx-1"
//           size={18}
//           onClick={() => navigate("/settlement-transaction",
//             { state: { userId: list.id, userName: list.name, roleType: list.type } }
//           )}
//         />
//         <div
//           className="saffron-btn2 white-space pointer"
//           onClick={() => {
//             setReturnCreditModal(true);
//             setSelectedUserId({ id: list.id, name: list.name, role: list.type });
//           }}
//         >
//           Return Credit Chips
//         </div>
//       </div>
//     ),
//   }));

//   const footer = [
//     { header: "Total" },
//     { header: "" },
//     { header: "" },
//     { header: "0.0" },
//     { header: "0.0" },
//     { header: "0.0" },
//     { header: "" },
//     { header: "" },
//   ];

//   const handleFiltrationSubmit = () => {
//     const newErrors = {
//       selectedAdminId: "",
//     };

//     if (!selectedAdminId?.value) {
//       newErrors.selectedAdminId = "Please select an admin.";
//       setErrors(newErrors);
//       return;
//     }

//     const limit = itemsPerPage;
//     const offset = (page - 1) * itemsPerPage;
//     const userId = selectedAdminId?.value;
//     getAllCreditUsersList(limit, offset, userId);
//   };

//   const handlePageChange = ({ limit, offset }) => {
//     if (role === "management" || role === "accounts") {
//       getAllCreditUsersList(limit, offset);
//     } else {
//       console.log("director panel");
//     }
//   };

//   const hanldeSettlement = () => {
//     let errors = [];
//     if (!payload || payload.length === 0) {
//       errors.push("Please select at least one settlement");
//     }
//     if (!parentPassword || parentPassword.trim() === "") {
//       errors.push("Password is required");
//     } else if (parentPassword.length < 6 || parentPassword.length > 36) {
//       errors.push("Password must be at least 6 and max 36 characters");
//     }

//     if (errors.length > 0) {
//       setApiError(errors);
//       return;
//     }

//     const data = {
//       list: payload,
//       parentPassword: parentPassword,
//     };
//     setApiError('');
//     setIsLoading(true);
//     const limit = itemsPerPage;
//     const offset = (page - 1) * itemsPerPage;
//     creditFullSettlement(data)
//       .then(() => {
//         getAllCreditUsersList(limit, offset);
//         setParentPassword("");
//         setIsLoading(false);
//         setSuccessPopupOpen(true);
//         setDiscription("Credit Settled Successfully");
//         setPayload([]);
//         setTimeout(() => {
//           setSuccessPopupOpen(false);
//         }, 3000);
//       })
//       .catch((error) => {
//         setApiError(error?.message);
//         setIsLoading(false);
//       });
//   };

//   return (
//     <>
//       <div>
//         {!apiLoading && (
//           <>
//             <div className="flex-start mb-3 mt-1">
//               <div className="d-flex align-items-center yellow-font fw-600">
//                 <span>
//                   <MdOutlineKeyboardArrowLeft
//                     size={22}
//                   />
//                 </span>
//                 <span className="yellow-font">Credit & Settlement</span>
//               </div>

//               {/* <div className="input-pill d-flex align-items-center rounded-pill px-2 py-1">
//                 <FaSearch size={16} className="grey-clr me-2" />
//                 <input
//                   className="small-font all-none"
//                   placeholder="Search..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div> */}
//             </div>
//             <div className="input-css px-2 medium-font">
//               <div className="d-flex flex-start">
//                 {" "}
//                 <span className="border-right px-1">Your Balance</span>{" "}
//                 <span className="green-font mx-1">88,414</span>
//               </div>
//             </div>
//             <div className="flex-column">
//               <div className="d-flex my-1">
//                 <div className="flex-column col-2 me-3">
//                   <label className="black-text4 small-font mb-1 ms-1">
//                     Select Admin Name
//                   </label>
//                   <Select
//                     className="small-font"
//                     options={downlines}
//                     placeholder="Select"
//                     styles={customStyles}
//                     onChange={(option) => {
//                       setSelectedAdminId(option);
//                       setErrors((prev) => ({ ...prev, selectedAdminId: "" }));
//                     }}
//                     maxMenuHeight={120}
//                     menuPlacement="auto"
//                     classNamePrefix="custom-react-select"
//                   />
//                 </div>
//                 <div className="flex-column col-1 d-flex align-items-end justify-content-end">
//                   <button className="w-100 saffron-btn2 small-font" onClick={handleFiltrationSubmit}>Submit</button>
//                 </div>
//               </div>
//               {errors.selectedAdminId && (
//                 <div className="text-danger small-font ps-1">
//                   {errors.selectedAdminId}
//                 </div>
//               )}
//             </div>
//           </>
//         )}


//         <ErrorComponent error={apiError} />
//         {apiLoading ? (
//           <div className="spinner">
//             <div className="spinner-circle"></div>
//           </div>
//         ) : (
//           <div className="mt-3" style={{ zIndex: "10" }}>
//             <Table
//               columns={MY_TRANSACTIONS_MANAGEMENT_COLUMNS}
//               data={data}
//               footer={footer}
//               verLine={true}
//               onPageChange={handlePageChange}
//               totalRecords={totalRecords}
//             />
//           </div>
//         )}

//         <div className="row flex-even small-font my-2 align-items-center">
//           <div className="col-2 small-font">Management Password</div>

//           <div className="col-4">
//             <div className="input-bg d-flex br-5 py-2 px-2 flex-between border-grey3">
//               <input
//                 className="w-100 small-font rounded all-none"
//                 type={pswdVisible ? "text" : "password"}
//                 placeholder="Enter Password"
//                 onChange={(e) => setParentPassword(e.target.value)}
//               />
//               {pswdVisible ? (
//                 <IoEye
//                   className="black-font"
//                   size={15}
//                   onClick={() => setPswdVisible(false)}
//                 />
//               ) : (
//                 <IoEyeOff
//                   className="black-font"
//                   size={15}
//                   onClick={() => setPswdVisible(true)}
//                 />
//               )}
//             </div>
//           </div>

//           <div className="col-2">
//             <label className="small-font pb-2">{" "}</label>
//             <button className="w-100 saffron-btn rounded medium-font" onClick={handleFillAll}>Fill all</button>
//           </div>

//           <div className="col-2">
//             <label className="small-font pb-2">{" "}</label>
//             <button
//               className="w-100 saffron-btn rounded medium-font"
//               type="submit"
//               disabled={isLoading}
//               onClick={hanldeSettlement}>
//               {isLoading ? (
//                 <Spinner
//                   as="span"
//                   animation="border"
//                   size="sm"
//                   role="status"
//                   aria-hidden="true"
//                 />
//               ) : null}
//               <span className="ps-2">
//                 {isLoading ? "Submitting..." : "Settle"}
//               </span>
//             </button>
//           </div>

//           <div className="col-2">
//             <label className="small-font pb-2">{" "}</label>
//             <button className="w-100 white-btn2 pointer" onClick={handleClearAll}>Clear All</button>
//           </div>
//         </div>
//         {/* <div>{validation.parentPassword && (
//           <span className="text-danger smallfont">{validation.parentPassword}</span>
//         )}</div> */}
//       </div>

//       {returnCreditModal && (
//         <ReturnCreditModal
//           show={returnCreditModal}
//           setShow={setReturnCreditModal}
//           selectedUserId={selectedUserId}
//           getAllCreditUsersList={getAllCreditUsersList}
//           setSuccessPopupOpen={setSuccessPopupOpen}
//           setDiscription={setDiscription}
//         />
//       )}

//       {successPopupOpen && (
//         <SuccessPopup
//           successPopupOpen={successPopupOpen}
//           setSuccessPopupOpen={setSuccessPopupOpen}
//           discription={discription}
//         />
//       )}
//     </>
//   );
// };

// export default CreditSettlement;
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
import { Spinner } from "react-bootstrap";
import ErrorComponent from "../../components/ErrorComponent";

const CreditSettlement = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role_code");
  const [returnCreditModal, setReturnCreditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pswdVisible, setPswdVisible] = useState(false);
  const [creditUserList, setCreditUserList] = useState([]);
  const [totalRecords, setTotalRecords] = useState([]);
  const [settlementAmounts, setSettlementAmounts] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  const [payload, setPayload] = useState([]);
  const itemsPerPage = 9;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const [currentPage, setCurrentPage] = useState(page);
  const [error, setError] = useState("");
  const [downlines, setDownlines] = useState([]);
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [errors, setErrors] = useState({ selectedAdminId: "" });
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [parentPassword, setParentPassword] = useState("");
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [discription, setDiscription] = useState("");
  const [apiLoading, setApiLoading] = useState(false);
  const [errorDiscription, setErrorDiscription] = useState(false);

  const GetAllDirectors = () => {
    getOfflineDWDirectors()
      .then((response) => {
        const directorOptions = response?.list?.map((item) => ({
          value: item.id,
          label: item.name,
        })) || [];

        const options = [
          { value: null, label: "All" },
          ...directorOptions
        ];

        setDownlines(options);
      })
      .catch((error) => {
        console.error(error?.message || "Failed to fetch directors");
        setDownlines([{ value: null, label: "All" }]);
      });
  };

  const getAllCreditUsersList = (limit, offset, adminId) => {
    setApiLoading(true);
    getCreditUSersList({ limit, offset, adminId })
      .then((response) => {
        setApiLoading(false);
        setApiError(null);
        setCreditUserList(response.records);
        setTotalRecords(response.totalCount);
        setSettlementAmounts({});
        setPayload([]);
        setInputErrors({});
      })
      .catch((error) => {
        setCreditUserList([]);
        setApiError(null);
        setApiLoading(false);
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

  const validateInputAmount = (id, value, balance) => {
    if (value === "") {
      // Remove from state if empty
      setSettlementAmounts(prev => {
        const newState = {...prev};
        delete newState[id];
        return newState;
      });
      setPayload(prev => prev.filter(item => item.id !== id));
      setInputErrors(prev => {
        const newState = {...prev};
        delete newState[id];
        return newState;
      });
      return false;
    }

    const amount = Number(value);
    if (isNaN(amount)) {
      setInputErrors(prev => ({ ...prev, [id]: "Please enter a valid number" }));
      return false;
    }

    if (amount <= 0) {
      setInputErrors(prev => ({ ...prev, [id]: "Amount must be greater than 0" }));
      return false;
    }

    if (amount > balance) {
      setInputErrors(prev => ({ ...prev, [id]: `Amount cannot exceed credit ${balance}` }));
      return false;
    }

    setInputErrors(prev => ({ ...prev, [id]: "" }));
    return true;
  };

  const handleFullSettled = (id, value) => {
    if (value === "") {
      // Completely remove the entry if empty
      setSettlementAmounts(prev => {
        const newState = {...prev};
        delete newState[id];
        return newState;
      });
      setPayload(prev => prev.filter(item => item.id !== id));
      setInputErrors(prev => {
        const newState = {...prev};
        delete newState[id];
        return newState;
      });
      return;
    }

    const user = creditUserList.find(user => user.id === id);
    if (!user) return;

    const isValid = validateInputAmount(id, value, user.credit_balance);
    if (!isValid) return;

    setSettlementAmounts(prev => ({ ...prev, [id]: value }));
    setPayload(prev => {
      const filtered = prev.filter(item => item.id !== id);
      return [...filtered, { id, amount: value }];
    });
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
    setInputErrors({});
  };

  const handleClearAll = () => {
    setSettlementAmounts({});
    setPayload([]);
    setInputErrors({});
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
      <div className="d-flex flex-column">
        <div className="d-flex flex-between">
          <div className="white-btn2 col-6">
            <input
              className={`w-100 small-font rounded all-none ${inputErrors[list.id] ? "border-danger" : ""}`}
              type="text"
              placeholder="Enter credit"
              value={settlementAmounts[list.id] ?? ""}
              onChange={(e) => {
                const iptVal = e.target.value.replace(/[^0-9]/g, "");
                if (iptVal === "") {
                  handleFullSettled(list.id, "");
                } else {
                  const isValid = validateInputAmount(list.id, iptVal, list.credit_balance);
                  if (isValid) {
                    handleFullSettled(list.id, iptVal);
                  }
                }
              }}
            />
          </div>
          <div
            className="saffron-btn2 white-space pointer"
            onClick={() => handleFullSettled(list.id, list.credit_balance)}
          >
            Full Settled
          </div>
        </div>
        {inputErrors[list.id] && (
          <div className="text-danger small-font ps-1">
            {inputErrors[list.id]}
          </div>
        )}
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

    if (!selectedAdminId?.value && selectedAdminId?.label != "All") {
      newErrors.selectedAdminId = "Please select an admin.";
      setErrors(newErrors);
      return;
    }

    const limit = itemsPerPage;
    const offset = (page - 1) * itemsPerPage;
    const userId = selectedAdminId?.label == "All" ? undefined : selectedAdminId?.value;
    getAllCreditUsersList(limit, offset, userId);
  };

  const handlePageChange = ({ limit, offset }) => {
    if (role === "management" || role === "accounts") {
      getAllCreditUsersList(limit, offset);
    } else {
      console.log("director panel");
    }
  };

  const hanldeSettlement = () => {
    let errors = [];

    // Check if any settlement amount is entered
    const hasSettlementAmounts = Object.keys(settlementAmounts).length > 0;
    if (!hasSettlementAmounts) {
      errors.push("Please select at least one settlement");
    } else {
      // Check if all settlement amounts are valid
      const invalidEntries = creditUserList.filter(user => {
        if (settlementAmounts[user.id] !== undefined) {
          return settlementAmounts[user.id] === "" || 
                 isNaN(Number(settlementAmounts[user.id])) ||
                 Number(settlementAmounts[user.id]) > user.credit_balance ||
                 Number(settlementAmounts[user.id]) <= 0;
        }
        return false;
      });

      if (invalidEntries.length > 0) {
        errors.push("Please enter valid settlement amounts for all selected fields");
      }
    }

    if (!parentPassword || parentPassword.trim() === "") {
      errors.push("Password is required");
    } else if (parentPassword.length < 6 || parentPassword.length > 36) {
      errors.push("Password must be at least 6 and max 36 characters");
    }

    if (errors.length > 0) {
      setApiError(errors);
      return;
    }

    const data = {
      list: payload.filter(item => item.amount !== "" && item.amount > 0),
      parentPassword: parentPassword,
    };

    if (data.list.length === 0) {
      setApiError(["Please select at least one settlement"]);
      return;
    }

    setApiError('');
    setIsLoading(true);
    const limit = itemsPerPage;
    const offset = (page - 1) * itemsPerPage;
    creditFullSettlement(data)
      .then(() => {
        getAllCreditUsersList(limit, offset);
        setParentPassword("");
        setIsLoading(false);
        setSuccessPopupOpen(true);
        setDiscription("Credit Settled Successfully");
        setPayload([]);
        setSettlementAmounts({});
        setTimeout(() => {
          setSuccessPopupOpen(false);
        }, 3000);
      })
      .catch((error) => {
        setApiError(error?.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      <div>
        {!apiLoading && (
          <>
            <div className="flex-start mb-3 mt-1">
              <div className="d-flex align-items-center yellow-font fw-600">
                <span>
                  <MdOutlineKeyboardArrowLeft
                    size={22}
                  />
                </span>
                <span className="yellow-font">Credit & Settlement</span>
              </div>
            </div>
            <div className="input-css px-2 medium-font">
              <div className="d-flex flex-start">
                {" "}
                <span className="border-right px-1">Your Balance</span>{" "}
                <span className="green-font mx-1">88,414</span>
              </div>
            </div>
            <div className="flex-column">
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
                    value={selectedAdminId}
                    onChange={(option) => {
                      setSelectedAdminId(option);
                      setErrors((prev) => ({ ...prev, selectedAdminId: "" }));
                    }}
                    maxMenuHeight={120}
                    menuPlacement="auto"
                    classNamePrefix="custom-react-select"
                  />
                </div>
                <div className="flex-column col-1 d-flex align-items-end justify-content-end">
                  <button className="w-100 saffron-btn2 small-font" onClick={handleFiltrationSubmit}>Submit</button>
                </div>
              </div>
              {errors.selectedAdminId && (
                <div className="text-danger small-font ps-1">
                  {errors.selectedAdminId}
                </div>
              )}
            </div>
          </>
        )}

        <ErrorComponent error={apiError} />
        {apiLoading ? (
          <div className="spinner">
            <div className="spinner-circle"></div>
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

        <div className="row flex-even small-font my-2 align-items-center">
          <div className="col-2 small-font">Management Password</div>

          <div className="col-4">
            <div className="input-bg d-flex br-5 py-2 px-2 flex-between border-grey3">
              <input
                className="w-100 small-font rounded all-none"
                type={pswdVisible ? "text" : "password"}
                placeholder="Enter Password"
                value={parentPassword}
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
            <label className="small-font pb-2">{" "}</label>
            <button className="w-100 saffron-btn rounded medium-font" onClick={handleFillAll}>Fill all</button>
          </div>

          <div className="col-2">
            <label className="small-font pb-2">{" "}</label>
            <button
              className="w-100 saffron-btn rounded medium-font"
              type="submit"
              disabled={isLoading}
              onClick={hanldeSettlement}>
              {isLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : null}
              <span className="ps-2">
                {isLoading ? "Submitting..." : "Settle"}
              </span>
            </button>
          </div>

          <div className="col-2">
            <label className="small-font pb-2">{" "}</label>
            <button className="w-100 white-btn2 pointer" onClick={handleClearAll}>Clear All</button>
          </div>
        </div>
      </div>

      {returnCreditModal && (
        <ReturnCreditModal
          show={returnCreditModal}
          setShow={setReturnCreditModal}
          selectedUserId={selectedUserId}
          getAllCreditUsersList={getAllCreditUsersList}
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
    </>
  );
};

export default CreditSettlement;