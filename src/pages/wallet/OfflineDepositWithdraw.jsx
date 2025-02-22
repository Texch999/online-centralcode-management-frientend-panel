// import React, { useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import DepositePopup from "../popups/DepositePopup";
// import WithdrawPopup from "../popups/WithdrawPopup";
// import Table from "../../components/Table";
// function OfflineDepositWithdraw() {
//   const [activeSport, setActiveSport] = useState("Sports & Casino");
//   const [depositePopup, setDepositePopup] = useState(false);
//   const [withdrawPopup, setWithdrawPopup] = useState(false);
//   const handleSportClick = (sport) => {
//     setActiveSport(sport);
//   };
//   const SPORTS_BUTTONS = ["Sports & Casino", "Sports", "Casino"];

//   const AdminSiteDropdown = ({ onChange }) => {
//     const adminSites = ["Admin Site 1", "Admin Site 2", "Admin Site 3"]; // Example data
//     return (
//       <select onChange={(e) => onChange(e.target.value)}>
//         <option value="">Select Admin Site</option>
//         {adminSites.map((site, index) => (
//           <option key={index} value={site}>
//             {site}
//           </option>
//         ))}
//       </select>
//     );
//   };

//   const UserSiteDropdown = ({ adminSite, onChange }) => {
//     const userSites = {
//       "Admin Site 1": ["User 1", "User 2"],
//       "Admin Site 2": ["User 3", "User 4"],
//       "Admin Site 3": ["User 5", "User 6"],
//     }; // Example data
//     return (
//       <select onChange={(e) => onChange(e.target.value)}>
//         <option value="">Select User Site</option>
//         {userSites[adminSite]?.map((user, index) => (
//           <option key={index} value={user}>
//             {user}
//           </option>
//         ))}
//       </select>
//     );
//   };

//   const ActionButtons = ({ onDeposit, onWithdraw }) => {
//     return (
//       <div>
//         <button onClick={onDeposit}>Deposit/Credit</button>
//         <button onClick={onWithdraw}>Withdraw</button>
//       </div>
//     );
//   };

//   const ChildRow = ({ walletBalance, exposure, inrChips, currentChips }) => {
//     return (
//       <div>
//         <p>Available Wallet Balance: {walletBalance}</p>
//         <p>Exposure: {exposure}</p>
//         <p>INR Chips: {inrChips}</p>
//         <p>Current Chips: {currentChips}</p>
//       </div>
//     );
//   };

//   const [data, setData] = useState([
//     {
//       uid: <div>1</div>,
//       details: <div>1</div>,
//       usdChips: <div>1</div>,
//       usdAmount: <div>1</div>,
//       action: <div>1</div>,
//       childRow: null,
//     },
//   ]);

//   const handleAdminSiteChange = (index, adminSite) => {
//     const newData = [...data];
//     newData[index].adminSite = adminSite;
//     setData(newData);
//   };

//   const handleUserSiteChange = (index, userSite) => {
//     const newData = [...data];
//     newData[index].userSite = userSite;
//     setData(newData);
//   };

//   const handleDeposit = (index) => {
//     const newData = [...data];
//     newData[index].childRow = (
//       <ChildRow
//         walletBalance={1000} // Example data
//         exposure={500} // Example data
//         inrChips={200} // Example data
//         currentChips={300} // Example data
//       />
//     );
//     setData(newData);
//   };

//   const handleWithdraw = (index) => {
//     const newData = [...data];
//     newData[index].childRow = (
//       <ChildRow
//         walletBalance={1000} // Example data
//         exposure={500} // Example data
//         inrChips={200} // Example data
//         currentChips={300} // Example data
//       />
//     );
//     setData(newData);
//   };

//   const MY_TRANSACTIONS_MANAGEMENT_COLUMNS = [
//     { header: "UID", field: "uid" },
//     { header: "Details", field: "details" },
//     { header: "USD Chips", field: "usdChips" },
//     { header: "USD Amount", field: "usdAmount" },
//     { header: "Action", field: "action" },
//     // { header: "Chips", field: "chips" },
//     // { header: "Curr Type/Amt.", field: "currtypeamount" },
//     // { header: "Curr Rate", field: "currRate" },
//     // { header: "Your Chips", field: "yourChips" },
//     // { header: "Your Curr/Amount", field: "yourcurramount" },
//     // { header: "", field: "view" },
//   ];


//   const offlineDepositAndWithdrawData =
//     data.map((row, index) => ({
//       ...row,
//       details: (
//         <div>
//           <AdminSiteDropdown
//             onChange={(value) => handleAdminSiteChange(index, value)}
//           />
//           <UserSiteDropdown
//             adminSite={row.adminSite}
//             onChange={(value) => handleUserSiteChange(index, value)}
//           />
//         </div>
//       ),
//       action: (
//         <ActionButtons
//           onDeposit={() => handleDeposit(index)}
//           onWithdraw={() => handleWithdraw(index)}
//         />
//       ),
//       childRow: row.childRow,
//     }))


//   return (
//     <>
//       <div>
//         <div className="flex-between mb-3 mt-2">
//           {/* <h6 className="d-flex yellow-font mb-0">My Deposit & Withdraw</h6> */}
//           <h6 className="d-flex yellow-font mb-0"> <h6 className="d-flex yellow-font mb-0">Offline Deposit & Withdraw</h6></h6>

//           {/* <div className="input-pill d-flex align-items-center rounded-pill px-2">
//           <FaSearch size={16} className="grey-clr me-2" />
//           <input className="small-font all-none" placeholder="Search..." />
//         </div> */}
//           <div className="d-flex align-items-center gap-1">
//             <button className={`me-3 dark-green-bg px-3`} onClick={() => setDepositePopup(true)}>Deposit</button>
//             <button className={`me-3 saffron-btn2 px-3`} onClick={() => setWithdrawPopup(true)} > Withdraw</button>
//           </div>
//         </div>
//         <div className="d-flex small-font mb-3">
//           {SPORTS_BUTTONS?.map((sport, index) => (
//             <div
//               key={index}
//               className={`me-3 ${activeSport === sport ? "saffron-btn2" : "white-btn2 pointer"
//                 }`}
//               onClick={() => handleSportClick(sport)}
//             >
//               {sport}
//             </div>
//           ))}
//         </div>
//         <div className="w-100 grey-bg2 d-flex py-3 rounded mb-3">
//           <span className="small-font border-right px-3">Your Balance</span>
//           <h6 className="green-font fw-600 mb-0 px-3 border-left2">50000000</h6>
//         </div>
//         {/* Header */}
//         <div className="w-100 d-flex grey-bg2 rounded-top black-text small-font border">
//           <div className="col-4 d-flex p-2">
//             <span className="col-4">UID</span>
//             <span className="col">Balance</span>
//             <span className="col">Available D/W</span>
//             <span className="col d-flex justify-content-end">Exposure</span>
//           </div>
//           <div className="col-3 border-left p-2 flex-center">
//             Deposit/Withdraw
//           </div>
//           <div className="col-2 flex-between border-left p-2">
//             <span>Credit Reference</span>
//             <span>Reference P/L</span>
//           </div>
//           <div className="col-2 border-left p-2">Remark</div>
//           <div className="col-1 p-2 flex-center border-left">Logs</div>
//         </div>
//         {/* Body */}
//         <div className="w-100 d-flex black-text small-font border white-bg">
//           <div className="col-4 d-flex px-2 py-1">
//             <span className="col-4 d-flex align-items-center">
//               1.Abhi - 10% <br />
//               Director
//             </span>
//             <span className="col d-flex align-items-center">23484</span>
//             <span className="col d-flex align-items-center">22037</span>
//             <span className="col d-flex align-items-center justify-content-end red-font">
//               1347
//             </span>
//           </div>
//           <div className="col-3 border-left flex-between px-2 py-1">
//             <span className="yellow-bg br-4px py-1 px-2 white-text">D | W</span>
//             <input
//               className="border br-4px py-1 px-2 all-none"
//               placeholder="0"
//               type="number"
//             />
//             <span className="border br-4px py-1 px-2">Full</span>
//           </div>
//           <div className="col-2 flex-between border-left px-2 py-1">
//             <span>
//               0
//               <span className="ms-2 yellow-bg br-4px py-1 px-2 white-text">
//                 Edit
//               </span>
//             </span>
//             <span>23384</span>
//           </div>
//           <div className="col-2 border-left px-2 py-1 flex-center">
//             <input
//               className="border br-4px py-1 px-2 all-none"
//               placeholder="Remarks"
//               type="text"
//             />
//           </div>
//           <div className="col-1 px-2 py-1 flex-center border-left">
//             <span className="br-4px border px-3 py-1">Log</span>
//           </div>
//         </div>
//         <div className="w-100 d-flex black-text small-font border white-bg">
//           <div className="col-4 d-flex px-2 py-1">
//             <span className="col-4 d-flex align-items-center">
//               1.Abhi - 10% <br />
//               Director
//             </span>
//             <span className="col d-flex align-items-center">23484</span>
//             <span className="col d-flex align-items-center">22037</span>
//             <span className="col d-flex align-items-center justify-content-end red-font">
//               1347
//             </span>
//           </div>
//           <div className="col-3 border-left flex-between px-2 py-1">
//             <span className="yellow-bg br-4px py-1 px-2 white-text">D | W</span>
//             <input
//               className="border br-4px py-1 px-2 all-none"
//               placeholder="0"
//               type="number"
//             />
//             <span className="border br-4px py-1 px-2">Full</span>
//           </div>
//           <div className="col-2 flex-between border-left px-2 py-1">
//             <span>
//               0
//               <span className="ms-2 yellow-bg br-4px py-1 px-2 white-text">
//                 Edit
//               </span>
//             </span>
//             <span>23384</span>
//           </div>
//           <div className="col-2 border-left px-2 py-1 flex-center">
//             <input
//               className="border br-4px py-1 px-2 all-none"
//               placeholder="Remarks"
//               type="text"
//             />
//           </div>
//           <div className="col-1 px-2 py-1 flex-center border-left">
//             <span className="br-4px border px-3 py-1">Log</span>
//           </div>
//         </div>
//         {/* Footer */}
//         <div className="w-100 d-flex grey-bg2 rounded-bottom black-text small-font">
//           <div className="col-7 p-2 d-flex justify-content-end align-items-center">
//             <span className="pointer white-bg border py-2 px-3 br-4px">
//               Clear All
//             </span>
//           </div>
//           <div className="col-2 p-2 flex-center">
//             <input
//               className="white-bg all-none2 border p-2 br-4px"
//               placeholder="Password"
//               type="password"
//             />
//           </div>
//           <div className="col p-2">
//             <div className="yellow-bg px-2 py-1 br-4px white-text flex-between">
//               <button className="white-text pointer all-none3">Submit</button>
//               <span className="rounded-circle white-bg py-1 px-2 black-text">
//                 0
//               </span>
//               <button className="white-text pointer all-none3">Payment</button>
//             </div>
//           </div>
//         </div>
//       </div>


//       {/* <Table
//         columns={MY_TRANSACTIONS_MANAGEMENT_COLUMNS}
//         data={offlineDepositAndWithdrawData}
//       // itemsPerPage={itemsPerPage}
//       // totalRecords={totalRecords}
//       // onPageChange={handlePageChange}
//       /> */}

//       <DepositePopup
//         setDepositePopup={setDepositePopup}
//         depositePopup={depositePopup}
//       />
//       <WithdrawPopup
//         setWithdrawPopup={setWithdrawPopup}
//         withdrawPopup={withdrawPopup}
//       />
//     </>

//   );
// }

// export default OfflineDepositWithdraw;


import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import DepositePopup from "../popups/DepositePopup";
import WithdrawPopup from "../popups/WithdrawPopup";
import Table from "../../components/Table"; // Common Table component
import { customStyles } from "../../components/ReactSelectStyles";
import Select from "react-select";
import { convertChipsToInr } from "../../utils/currEchange"

function OfflineDepositWithdraw() {
  const [activeSport, setActiveSport] = useState("Sports & Casino");
  const [depositePopup, setDepositePopup] = useState(false);
  const [withdrawPopup, setWithdrawPopup] = useState(false);
  const [inputData, setInputData] = useState({
    adminWeb: "",
    userWeb: "",
    inrChips: "",
    InrAmont: "",
  })
  const handleSportClick = (sport) => {
    setActiveSport(sport);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically update the field based on the input name
    }));
  };
  const SPORTS_BUTTONS = ["Sports & Casino", "Sports", "Casino"];

  const AdminSiteDropdown = ({ onChange }) => {
    const adminSites = [
      { label: "Admin Site 1", value: "Admin Site 1" },
      { label: "Admin Site 2", value: "Admin Site 2" },
      { label: "Admin Site 3", value: "Admin Site 3" },
    ];

    return (
      <Select
        className="small-font white-bg input-border rounded"
        placeholder="Select Admin Website"
        styles={{
          ...customStyles,
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        menuPortalTarget={document.body}
        onChange={(option) => onChange(option.value)}
        options={adminSites}
      />
    );
  };

  const UserSiteDropdown = ({ adminSite, onChange }) => {
    const userSites = [
      { label: "User 1", value: "User 1" },
      { label: "User 2", value: "User 2" },
      { label: "User 3", value: "User 3" },
    ];

    return (
      <Select
        className="small-font white-bg input-border rounded"
        placeholder="Select user website"
        styles={{
          ...customStyles,
          menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Ensure dropdown is above other elements
        }}
        menuPortalTarget={document.body} // Render dropdown outside the table
        onChange={(option) => onChange(option.value)}
        options={userSites}
      />
    );
  };

  const ActionButtons = ({ onDeposit, onWithdraw }) => {
    return (
      <div className="d-flex flex-column justify-content-start align-items-center">
        <div>
          <button className="me-3 dark-green-bg px-3" onClick={onDeposit}>D/C</button>
          <button className="me-3 saffron-btn2 px-3" onClick={onWithdraw}>W</button>
        </div>
      </div>
    );
  };

  const [data, setData] = useState([
    {
      id: 1,
      uid: "1",
      details: "Details 1",
      usdChips: "100",
      usdAmount: "1000",
      action: "Action 1",
      showChildRow: false,
      walletBalance: 1000,
      exposure: 500,
      inrChips: 200,
      currentChips: 300,
    },
    {
      id: 2,
      uid: "2",
      details: "Details 2",
      usdChips: "200",
      usdAmount: "2000",
      action: "Action 2",
      showChildRow: false,
      walletBalance: 1500,
      exposure: 600,
      inrChips: 250,
      currentChips: 350,
    },
  ]);

  const handleAdminSiteChange = (index, adminSite) => {
    const newData = [...data];
    newData[index].adminSite = adminSite;
    setData(newData);
  };

  const handleUserSiteChange = (index, userSite) => {
    const newData = [...data];
    newData[index].userSite = userSite;
    setData(newData);
  };

  const toggleChildRow = (index) => {
    const newData = [...data];
    newData[index].showChildRow = !newData[index].showChildRow; // Toggle visibility
    setData(newData);
  };

  // Prepare data for the Table component
  // const tableData = data.flatMap((row, index) => {
  //   const parentRow = {
  //     ...row,
  //     details: (
  //       <div className="row col-12">
  //         <div className="col-4">
  //           <AdminSiteDropdown
  //             onChange={(value) => handleAdminSiteChange(index, value)}
  //           />
  //         </div>
  //         <div className="col-4">
  //           <UserSiteDropdown
  //             adminSite={row.adminSite}
  //             onChange={(value) => handleUserSiteChange(index, value)}
  //           />
  //         </div>
  //         <div className="col-4">
  //           <input
  //             type="text"
  //             name="userWeb"
  //             className="w-100 small-font rounded input-css all-none rounded white-bg input-border"
  //             placeholder="Diamond Exchange"
  //             readOnly
  //           />
  //         </div>
  //       </div>
  //     ),
  //     action: (
  //       <ActionButtons
  //         onDeposit={() => toggleChildRow(index)}
  //         onWithdraw={() => toggleChildRow(index)}
  //       />
  //     ),
  //   };

  //   const childRow = row.showChildRow
  //     ? {
  //       id: `child-${row.id}`,
  //       isChild: true,
  //       details: (
  //         <div className="w-100 d-flex justify-content-between align-items-center p-2">
  //           <span>Available D/W : {row.walletBalance}</span>
  //           <span>Exposure: {row.exposure}</span>
  //           <span>
  //             INR CHIPS:
  //             <input
  //               type="text"
  //               name="currency"
  //               className="w-60 small-font input-css all-none rounded white-bg input-border ms-2"
  //               placeholder="Enter Chips"
  //             />
  //           </span>
  //           <span>
  //             <input
  //               type="text"
  //               name="currency"
  //               className="w-60 small-font input-css all-none rounded white-bg input-border ms-2"
  //               placeholder="Enter Chips"
  //               value={convertChipsToInr(1,)}
  //               readOnly
  //             />
  //           </span>
  //           <div className="d-flex flex-row justify-content-center align-items-center">
  //             <button className="me-3 saffron-btn2 px-3">Submit</button>
  //           </div>
  //         </div>
  //       ),
  //       uid: "",
  //       usdChips: "",
  //       usdAmount: "",
  //       action: "",
  //     }
  //     : null;

  //   return childRow ? [parentRow, childRow] : [parentRow];
  // });
  const MY_TRANSACTIONS_MANAGEMENT_COLUMNS = [
    { header: "UID", field: "uid" },
    { header: "Details", field: "details" },
    { header: "USD Chips", field: "usdChips" },
    { header: "USD Amount", field: "usdAmount" },
    { header: "Action", field: "action" },
  ];
  
  const tableData = data.map((row, index) => ({
    ...row,
    uid: (<div> {`1. TechVibe - Director`}</div>),
    details: (
      <div className="w-100">
        {/* Parent Row Content */}
        <div className="row col-12">
          <div className="col-4">
            <AdminSiteDropdown
              onChange={(value) => handleAdminSiteChange(index, value)}
            />
          </div>
          <div className="col-4">
            <UserSiteDropdown
              adminSite={row.adminSite}
              onChange={(value) => handleUserSiteChange(index, value)}
            />
          </div>
          <div className="col-4">
            <input
              type="text"
              name="userWeb"
              className="w-100 small-font rounded input-css all-none rounded white-bg input-border"
              placeholder="Diamond Exchange"
              readOnly
            />
          </div>
        </div>

        {/* Child Row Content - Show only when D/C or W button is clicked */}
        {row.showChildRow && (
          <div className="w-100 d-flex justify-content-between align-items-center p-2 mt-2 border-top">
            <span>Available D/W : {row.walletBalance}</span>
            <span>Exposure: {row.exposure}</span>
            <span>
              INR CHIPS:
              <input
                type="text"
                name="inrChips"
                className="w-60 small-font input-css all-none rounded white-bg input-border ms-2"
                placeholder="Enter Chips"
                onChange={handleInputChange}
              />
            </span>
            <span>
              <input
                type="text"
                name="currency"
                className="w-60 small-font input-css all-none rounded white-bg input-border ms-2"
                placeholder="Enter Chips"
                value={convertChipsToInr(1, inputData?.inrChips,)}
                readOnly
              />
            </span>
            <div className="d-flex flex-row justify-content-center align-items-center">
              <button className="me-3 saffron-btn2 px-3">Submit</button>
            </div>
          </div>
        )}
      </div>
    ),
    action: (
      <ActionButtons
        onDeposit={() => toggleChildRow(index)}
        onWithdraw={() => toggleChildRow(index)}
      />
    ),
  }));

  return (
    <>
      <div>
        <div className="flex-between mb-3 mt-2">
          <h6 className="d-flex yellow-font mb-0">Offline Deposit & Withdraw</h6>
        </div>
        <div className="d-flex small-font mb-3">
          {SPORTS_BUTTONS?.map((sport, index) => (
            <div
              key={index}
              className={`me-3 ${activeSport === sport ? "saffron-btn2" : "white-btn2 pointer"
                }`}
              onClick={() => handleSportClick(sport)}
            >
              {sport}
            </div>
          ))}
        </div>
        <div className="w-100 grey-bg2 d-flex py-3 rounded mb-3">
          <span className="small-font border-right px-3">Your Balance</span>
          <h6 className="green-font fw-600 mb-0 px-3 border-left2">50000000</h6>
        </div>

        {/* Use the common Table component */}
        <div style={{ zIndex: "10" }}>
          <Table
            columns={MY_TRANSACTIONS_MANAGEMENT_COLUMNS}
            data={tableData}
          />
        </div>
      </div>

      <DepositePopup
        setDepositePopup={setDepositePopup}
        depositePopup={depositePopup}
      />
      <WithdrawPopup
        setWithdrawPopup={setWithdrawPopup}
        withdrawPopup={withdrawPopup}
      />
    </>
  );
}

export default OfflineDepositWithdraw;