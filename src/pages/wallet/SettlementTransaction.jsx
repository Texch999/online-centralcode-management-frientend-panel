













import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import Table from "../../components/Table";
import SettlementTransModal from "./SettlementTransModal";
import { getOfflineDWDirectors, getSettlementTransactionById } from "../../api/apiMethods";
import { useSearchParams } from "react-router-dom";

const SettlementTransaction = () => {
  const role = localStorage.getItem("role_code");
  const [settleModalShow, setSettleModalShow] = useState(false);
  const [settleModalTransaction, setSettleModalTransaction] = useState([]);
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [downlines, setDownlines] = useState([]);
  const [validationError, setValidationError] = useState("");
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

  // Fetch all directors
  const GetAllDirectors = () => {
    getOfflineDWDirectors()
      .then((response) => {
        if (response.list) {
          const options = response?.list?.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          setDownlines(options);
        } else {
          console.error("Something Went Wrong");
        }
      })
      .catch((error) => {
        console.error(error?.message || "Failed to fetch directors");
      });
  };

  // Fetch settlement transactions
  const getSettleTransaction = (limit, offset, selectType, startDate, endDate) => {
    if (!selectedAdminId?.value) return;

    const userId = selectedAdminId.value;
    const params = {
      limit: limit,
      offset: offset,
      selectType: selectType?.value || "",
      startDate: startDate,
      endDate: endDate,
    };

    getSettlementTransactionById({ userId, params })
      .then((response) => {
        if (response.records) {
          setSettleModalTransaction(response.records);
          setTotalCredit(response.totalCredit);
          setSettledCredit(response.settledCredit);
          setCreditBal(response.creditBalance);
          setTotalrecords(response.count);
        } else {
          console.error("Something Went Wrong");
        }
      })
      .catch((error) => {
        console.error(error?.message || "Failed to fetch transactions");
      });
  };

  // Call API when admin is selected
  useEffect(() => {
    const limit = itemsPerPage;
    const offset = (page - 1) * itemsPerPage;
    if (selectedAdminId?.value) {
      getSettleTransaction(limit, offset, selectedType, fromDate, toDate);
    }
  }, [selectedAdminId, page]);

  // Fetch all directors on component mount
  useEffect(() => {
    GetAllDirectors();
  }, []);

  // Transaction type options
  const TrasactionType = [
    { value: "", label: "All" },
    { value: "1", label: "Credit" },
    { value: "2", label: "Debit" },
  ];

  // Handle submit button click
  const handleSubmit = () => {
    if (!selectedAdminId?.value) {
      setValidationError("Please select an admin.");
      return;
    }
    if (!selectedType?.value) {
      setValidationError("Please select a type.");
      return;
    }
    if (!fromDate || !toDate) {
      setValidationError("Please select both 'From' and 'To' dates.");
      return;
    }
    if (new Date(fromDate) > new Date(toDate)) {
      setValidationError("'From' date cannot be greater than 'To' date.");
      return;
    }

    // If all validations pass, proceed with API call
    setValidationError("");
    const limit = itemsPerPage;
    const offset = (page - 1) * itemsPerPage;
    getSettleTransaction(limit, offset, selectedType, fromDate, toDate);
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
    dt: <div>{trx.crDate}</div>,
    credit: <div className="green-font">{trx.credit}</div>,
    debit: <div className="red-font">{trx.debit}</div>,
    closing: <div>{trx.closBal}</div>,
    desc: <div>{trx.desc}</div>,
    from: <div>{trx.cfrom} → {trx.cto}</div>,
  }));

  // Table footer
  const FOOTER = [
    { header: "Total" },
    { header: <div className="red-font">7500000</div> },
    { header: <div className="green-font">7500000</div> },
    { header: <div className="red-font">7500000</div> },
    { header: "" },
    { header: "" },
  ];

  // Handle page change
  const handlePageChange = ({ limit, offset }) => {
    if (role === "management") {
      getSettleTransaction(limit, offset, selectedType, fromDate, toDate);
    } else {
      console.log("director panel");
    }
  };

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="d-flex yellow-font mb-0">
          <span>Settlement Transaction</span>
        </h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>
      <div className="d-flex flex-column gap-2">
        <div className="col-2">
          <div className="flex-column me-3">
            <label className="black-text4 small-font mb-1">Select Admin Name</label>
            <Select
              className="small-font text-capitalize"
              options={downlines}
              placeholder="Select"
              styles={customStyles}
              maxMenuHeight={120}
              menuPlacement="auto"
              classNamePrefix="custom-react-select"
              onChange={(option) => setSelectedAdminId(option)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-2 me-2 align-self-end">
            <div className="white-btn2 flex-between">
              <span className="small-font">Total Credit</span>
              <span className="small-font red-font">{totalCredit > 0 ? totalCredit : 0}</span>
            </div>
          </div>
          <div className="col-2 me-2 align-self-end">
            <div className="white-btn2 flex-between">
              <span className="small-font">Paid Credit</span>
              <span className="small-font red-font">{settledCredit > 0 ? settledCredit : 0}</span>
            </div>
          </div>
          <div className="col-2 me-2 align-self-end">
            <div className="white-btn2 flex-between">
              <span className="small-font">Bal Credit</span>
              <span className="small-font red-font">{creditBal > 0 ? creditBal : 0}</span>
            </div>
          </div>
          <div className="col-1"></div>
        </div>
        <div className="row justify-content-between align-items-center">
          <div className="col-10 d-flex flex-wrap align-items-center">
            <div className="col-2">
              <div className="d-flex flex-column me-3">
                <label className="black-text4 small-font mb-1">Select Type</label>
                <Select
                  className="small-font"
                  options={TrasactionType}
                  placeholder="Select"
                  styles={customStyles}
                  maxMenuHeight={120}
                  menuPlacement="auto"
                  classNamePrefix="custom-react-select"
                  onChange={(option) => setSelectedType(option)}
                />
              </div>
            </div>

            {["From", "To"].map((label) => (
              <div key={label} className="col-2 d-flex flex-column mx-2">
                <label className="black-text4 small-font mb-1">{label}</label>
                <input
                  className="input-css2 small-font"
                  type="date"
                  onChange={(e) =>
                    label === "From"
                      ? setFromDate(e.target.value)
                      : setToDate(e.target.value)
                  }
                />
              </div>
            ))}

            <div className="col-1 d-flex align-items-end align-self-end ms-3">
              <button className="saffron-btn2 w-100 small-font" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>

          <div className="col-2 d-flex justify-content-end align-self-end pointer">
            <div
              className="white-bg br-5 px-2 py-2 text-center small-font black-border pointer"
              onClick={() => setSettleModalShow(true)}
            >
              Settlement
            </div>
          </div>
        </div>
        {validationError && (
          <div className="small-font red-font mt-2">{validationError}</div>
        )}
      </div>
      <div className="mt-3 py-2">
        <Table
          columns={COLUMNS}
          data={DATA}
          itemsPerPage={itemsPerPage}
          footer={FOOTER}
          totalRecords={totalRecords}
          onPageChange={handlePageChange}
        />
      </div>
      {setSettleModalShow && (
        <SettlementTransModal
          setSettleModalShow={setSettleModalShow}
          settleModalShow={settleModalShow}
        />
      )}

    </div>
  );
};

export default SettlementTransaction;









// import React, { useEffect, useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import Select from "react-select";
// import { customStyles } from "../../components/ReactSelectStyles";
// import Table from "../../components/Table";
// import SettlementTransModal from "./SettlementTransModal";
// import { getOfflineDWDirectors, getSettlementTransactionById } from "../../api/apiMethods";
// import { useSearchParams } from "react-router-dom";

// const SettlementTransaction = () => {
//   const role = localStorage.getItem("role_code");
//   const [settleModalShow, setSettleModalShow] = useState(false);
//   const [settleModalTransaction, setSettleModalTransaction] = useState([]);
//   const [selectedAdminId, setSelectedAdminId] = useState([]);
//   const [downlines, setDownlines] = useState([]);
//   const [validationError, setValidationError] = useState("");
//   const [selectedType, setSelectedType] = useState(null);
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [totalRecords, setTotalrecords] = useState(null)
//   const itemsPerPage = 9;
//   const [searchParams, setSearchParams] = useSearchParams();
//   const page = parseInt(searchParams.get("page") || 1);
//   const [totalCredit, setTotalCredit] = useState("")
//   const [settledCredit, setSettledCredit] = useState("")
//   const [creditBal, setCreditBal] = useState("")
//   const GetAllDirectors = () => {
//     getOfflineDWDirectors()
//       .then((response) => {
//         if (response.list) {
//           const options = response?.list?.map((item) => ({
//             value: item.id,
//             label: item.name,
//           }));
//           setDownlines(options);
//         } else {
//           console.error("Something Went Wrong");
//         }
//       })
//       .catch((error) => {
//         console.error(error?.message || "Failed to fetch directors");
//       });
//   };

//   const getSettleTransaction = (limit, offset, selectType, startDate, fromDate) => {
//     if (!selectedAdminId?.value) return;

//     const userId = selectedAdminId.value;
//     const params = {
//       limit: limit,
//       offset: offset,
//       selectType: selectType,
//       startDate: startDate,
//       fromDate: fromDate,
//     };

//     getSettlementTransactionById({ userId, params })
//       .then((response) => {
//         if (response.records) {
//           setSettleModalTransaction(response.records);
//           setTotalCredit(response.totalCredit);
//           setSettledCredit(response.settledCredit);
//           setCreditBal(response.creditBalance);
//           setTotalrecords(response.count)
//         } else {
//           console.error("Something Went Wrong");
//         }
//       })
//       .catch((error) => {
//         console.error(error?.message || "Failed to fetch transactions");
//       });
//   };

//   useEffect(() => {
//     const limit = itemsPerPage
//     const offset = (page - 1) * itemsPerPage
//     if (selectedAdminId?.value) {
//       getSettleTransaction(limit, offset);
//     }
//   }, [selectedAdminId]);

//   useEffect(() => {
//     GetAllDirectors();
//   }, []);

//   const TrasactionType = [
//     { value: "", label: "All" },
//     { value: "1", label: "Credit" },
//     { value: "2", label: "Debit" },
//   ];

//   const handleSubmit = () => {
//     const limit = itemsPerPage
//     const offset = (page - 1) * itemsPerPage
//     if (!selectedType?.value) {
//       setValidationError("Please select a type.");
//       return;
//     }
//     if (!fromDate || !toDate) {
//       setValidationError("Please select both 'From' and 'To' dates.");
//       return;
//     }

//     setValidationError("");
//     console.log("Submitting with:", { limit, offset, selectedAdminId, selectedType, fromDate, toDate });
//     getSettleTransaction(selectedType, fromDate, toDate)
//   };

//   const COLUMNS = [
//     { header: "Date & Time", field: "dt" },
//     { header: "Credit", field: "credit" },
//     { header: "Debit", field: "debit" },
//     { header: "Closing", field: "closing" },
//     { header: "Description", field: "desc" },
//     { header: "From → To", field: "from" },
//   ];

//   const DATA = settleModalTransaction.map((trx) => ({
//     dt: <div>{trx.crDate}</div>,
//     credit: <div className="green-font">{trx.credit}</div>,
//     debit: <div className="red-font">{trx.debit}</div>,
//     closing: <div>{trx.closBal}</div>,
//     desc: <div>{trx.desc}</div>,
//     from: <div>{trx.cfrom} → {trx.cto}</div>,
//   }));

//   const FOOTER = [
//     { header: "Total" },
//     { header: <div className="red-font">7500000</div> },
//     { header: <div className="green-font">7500000</div> },
//     { header: <div className="red-font">7500000</div> },
//     { header: "" },
//     { header: "" },
//   ];
//   const handlePageChange = ({ limit, offset }) => {
//     if (role === "management") {
//       getSettleTransaction(limit, offset);
//     } else {
//       console.log("director panel")
//     }
//   };
//   console.log(validationError,"==setValidationError")
//   return (
//     <div>
//       <div className="flex-between mb-3 mt-2">
//         <h6 className="d-flex yellow-font mb-0">
//           <span>Settlement Transaction</span>
//         </h6>
//         <div className="input-pill d-flex align-items-center rounded-pill px-2">
//           <FaSearch size={16} className="grey-clr me-2" />
//           <input className="small-font all-none" placeholder="Search..." />
//         </div>
//       </div>
//       <div className="d-flex flex-column gap-2">
//         <div className="col-2">
//           <div className="flex-column me-3">
//             <label className="black-text4 small-font mb-1">
//               Select Admin Name
//             </label>
//             <Select
//               className="small-font text-capitalize"
//               options={downlines}
//               placeholder="Select"
//               styles={customStyles}
//               maxMenuHeight={120}
//               menuPlacement="auto"
//               classNamePrefix="custom-react-select"
//               onChange={(option) => setSelectedAdminId(option)}
//             />
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-2 me-2 align-self-end">
//             <div className="white-btn2 flex-between">
//               <span className="small-font">Total Credit</span>
//               <span className="small-font red-font">{totalCredit > 0 ? totalCredit : 0}</span>
//             </div>
//           </div>
//           <div className="col-2 me-2 align-self-end">
//             <div className="white-btn2 flex-between">
//               <span className="small-font">Paid Credit</span>
//               <span className=" small-font red-font">{settledCredit > 0 ? settledCredit : 0}</span>
//             </div>
//           </div>
//           <div className="col-2 me-2 align-self-end">
//             <div className="white-btn2 flex-between">
//               <span className="small-font">Bal Credit</span>
//               <span className=" small-font red-font">{creditBal > 0 ? creditBal : 0}</span>
//             </div>
//           </div>
//           <div className="col-1"></div>
//         </div>
//         <div className="row justify-content-between align-items-center">
//           <div className="col-10 d-flex flex-wrap align-items-center">
//             <div className="col-2">
//               <div className="d-flex flex-column me-3">
//                 <label className="black-text4 small-font mb-1">
//                   Select Type
//                 </label>
//                 <Select
//                   className="small-font"
//                   options={TrasactionType}
//                   placeholder="Select"
//                   styles={customStyles}
//                   maxMenuHeight={120}
//                   menuPlacement="auto"
//                   classNamePrefix="custom-react-select"
//                   onChange={(option)=>setSelectedType(option)}
//                 />
//               </div>
//             </div>

//             {["From", "To"].map((label) => (
//               <div key={label} className="col-2 d-flex flex-column mx-2">
//                 <label className="black-text4 small-font mb-1">{label}</label>
//                 <input className="input-css2 small-font" type="date" />
//               </div>
//             ))}

//             <div className="col-1 d-flex align-items-end align-self-end ms-3">
//               <button className="saffron-btn2 w-100 small-font" onClick={handleSubmit}>Submit</button>
//             </div>
//           </div>

//           <div className="col-2 d-flex justify-content-end  align-self-end pointer">
//             <div
//               className="white-bg br-5 px-2 py-2 text-center small-font black-border pointer"
//               onClick={() => setSettleModalShow(true)}
//             >
//               Settlement
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="mt-3 py-2">
//         <Table columns={COLUMNS} data={DATA} itemsPerPage={itemsPerPage} footer={FOOTER} totalRecords={totalRecords} onPageChange={handlePageChange} />
//       </div>

//       <SettlementTransModal
//         setSettleModalShow={setSettleModalShow}
//         settleModalShow={settleModalShow}
//       />
//     </div>
//   );
// };

// export default SettlementTransaction;
