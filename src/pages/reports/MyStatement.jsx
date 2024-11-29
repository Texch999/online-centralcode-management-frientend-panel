import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/Table";
import ScrollTable from "../../components/ScrollTable";

function MyStatement() {
  const [activeSport, setActiveSport] = useState("My Statements");
  const handleSportClick = (sport) => {
    setActiveSport(activeSport === sport ? null : sport);
  };
  const SPORTS_BUTTONS = ["My Statements", "My Gateway Transaction",];
  const MY_TRANSACTIONS_COLUMNS = [
    { header: "S No", field: "serialNo" },
    { header: "Vendor Name", field: "vendorName" },
    { header: "Vendor", field: "vendor" },
    { header: "Supply", field: "supply" },
    { header: "Loading Chips", field: "loadingChips" },
    { header: "Rent", field: "rent" },
    { header: "Share/Royalty", field: "shareRoyalty" },
    { header: "Paid Rent", field: "paidRent" },
    { header: "Paid Share/Royalty", field: "paidShareRoyalty" },
    { header: "Balance", field: "balance" },
    { header: "Due Date", field: "dueDate" },
  ];

  const MY_TRANSACTIONS_DATA = [
    {
      serialNo: 1,
      vendorName: "Lokesh",
      vendor: "Sports Vend ",
      supply: <div >Odds</div>,
      loadingChips: <div>-</div>,
      rent: <div>100000</div>,
      shareRoyalty: "-",
      paidRent: <div className="red-font">100000</div>,
      paidShareRoyalty: <div>-</div>,
      balance: <div className="red-font">0</div>,
      dueDate: "10-12-2024",
    },
     {
      serialNo: 2,
      vendorName: "Lokesh",
      vendor: "Sports Vend ",
      supply: <div >Odds</div>,
      loadingChips: <div>-</div>,
      rent: <div>100000</div>,
      shareRoyalty: "-",
      paidRent: <div className="red-font">100000</div>,
      paidShareRoyalty: <div>-</div>,
      balance: <div className="red-font">0</div>,
      dueDate: "10-12-2024",
    },
     {
      serialNo: 3,
      vendorName: "Lokesh",
      vendor: "Sports Vend ",
      supply: <div >Odds</div>,
      loadingChips: <div>-</div>,
      rent: <div>100000</div>,
      shareRoyalty: "-",
      paidRent: <div className="red-font">100000</div>,
      paidShareRoyalty: <div>-</div>,
      balance: <div className="red-font">0</div>,
      dueDate: "10-12-2024",
    },
     {
      serialNo: 4,
      vendorName: "Lokesh",
      vendor: "Sports Vend ",
      supply: <div >Odds</div>,
      loadingChips: <div>-</div>,
      rent: <div>100000</div>,
      shareRoyalty: "-",
      paidRent: <div className="red-font">100000</div>,
      paidShareRoyalty: <div>-</div>,
      balance: <div className="red-font">0</div>,
      dueDate: "10-12-2024",
    },
     {
      serialNo: 5,
      vendorName: "Lokesh",
      vendor: "Sports Vend ",
      supply: <div >Odds</div>,
      loadingChips: <div>-</div>,
      rent: <div>100000</div>,
      shareRoyalty: "-",
      paidRent: <div className="red-font">100000</div>,
      paidShareRoyalty: <div>-</div>,
      balance: <div className="red-font">0</div>,
      dueDate: "10-12-2024",
    },
    
  ];

  const MY_TRANSACTIONS_FOOTER = [
    { header: "Total" },
    { header: "" },
    { header: "" },
    { header: ""},
    { header: <div >20000000</div> },
    { header: <div >40000000</div> },
    { header: <div >75000000</div>  },
    { header: "" },
     { header: "" },
    { header: "10000000" },
    { header: "" },
  ];



  return (
    <div>
         <div className="d-flex small-font">
          {SPORTS_BUTTONS?.map((sport, index) => (
            <div
              key={index}
              className={`me-3 px-3 ${
                activeSport === sport ? "saffron-btn2" : "white-btn2 pointer"
              }`}
              onClick={() => handleSportClick(sport)}
            >
              {sport}
            </div>
          ))}
        </div>
      <div className="flex-between mb-3 mt-4">
        <h6 className="d-flex yellow-font mb-0">My Statement</h6>
        
      </div>
      <div className="w-50 flex-between flex-wrap mb-3 py-3 grey-bg2 rounded">
        <div className="col-6 px-3">
          <div className="white-btn2 flex-between">
            <span className="small-font">Own D/W. P&L</span>
            <span className="medium-font green-font">1000000000</span>
          </div>
        </div>
        <div className="col-6 px-3">
          <div className="white-btn2 flex-between">
            <span className="small-font">Vend Pays</span>
            <span className="medium-font red-font">1000000000</span>
          </div>
        </div>
        <div className="col-6 px-3 mt-2">
          <div className="white-btn2 flex-between">
            <span className="small-font">Own Gateway P&L</span>
            <span className="medium-font green-font">2000000000</span>
          </div>
        </div>
        <div className="col-6 px-3 mt-2">
          <div className="white-btn2 flex-between">
            <span className="small-font">Own Net P/L</span>
            <span className="medium-font red-font">2000000000</span>
          </div>
        </div>
       
      </div>
      <h6 className="fw-600">Vendors Account</h6>
      <div>

      <ScrollTable
        columns={MY_TRANSACTIONS_COLUMNS}
        data={MY_TRANSACTIONS_DATA}
        footer={MY_TRANSACTIONS_FOOTER}
        itemsPerPage={2}
        greyBackround="footer-bg"
      />
      </div>
     
   
    </div>
  );
}

export default MyStatement;


