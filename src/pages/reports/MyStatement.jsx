import React, { useState } from "react";
import ScrollTable from "../../components/ScrollTable";
import SettlePopUp from "./SettlePopUp";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";

function MyStatement() {
  const [activeSport, setActiveSport] = useState("My Statements");
  const [settleBalance, setSettleBalance] = useState(false);

  const handleSportClick = (sport) => {
    setActiveSport(sport);
  };

  const gameOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  const SPORTS_BUTTONS = ["My Statements", "My Gateway Transaction"];

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
      supply: <div>Odds</div>,
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
      vendor: "Casino Vend",
      supply: <div>Odds</div>,
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
      supply: <div>Odds</div>,
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
      supply: <div>Odds</div>,
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
      supply: <div>Odds</div>,
      loadingChips: <div>-</div>,
      rent: <div>100000</div>,
      shareRoyalty: "-",
      paidRent: <div className="red-font">100000</div>,
      paidShareRoyalty: <div>-</div>,
      balance: <div className="red-font">0</div>,
      dueDate: "10-12-2024",
    },
    {
      serialNo: 6,
      vendorName: "Lokesh",
      vendor: "Sports Vend ",
      supply: <div>Odds</div>,
      loadingChips: <div>-</div>,
      rent: <div>100000</div>,
      shareRoyalty: "-",
      paidRent: <div className="red-font">100000</div>,
      paidShareRoyalty: <div>-</div>,
      balance: <div className="red-font">0</div>,
      dueDate: "10-12-2024",
    },
    {
      serialNo: 7,
      vendorName: "Lokesh",
      vendor: "Sports Vend ",
      supply: <div>Odds</div>,
      loadingChips: <div>-</div>,
      rent: <div>100000</div>,
      shareRoyalty: "-",
      paidRent: <div className="red-font">100000</div>,
      paidShareRoyalty: <div>-</div>,
      balance: <div className="red-font">0</div>,
      dueDate: "10-12-2024",
    },
    {
      serialNo: 8,
      vendorName: "Lokesh",
      vendor: "Sports Vend ",
      supply: <div>Odds</div>,
      loadingChips: <div>-</div>,
      rent: <div>100000</div>,
      shareRoyalty: "-",
      paidRent: <div className="red-font">100000</div>,
      paidShareRoyalty: <div>-</div>,
      balance: <div className="red-font">0</div>,
      dueDate: "10-12-2024",
    },
    {
      serialNo: 9,
      vendorName: "Lokesh",
      vendor: "Sports Vend ",
      supply: <div>Odds</div>,
      loadingChips: <div>-</div>,
      rent: <div>100000</div>,
      shareRoyalty: "-",
      paidRent: <div className="red-font">100000</div>,
      paidShareRoyalty: <div>-</div>,
      balance: <div className="red-font">0</div>,
      dueDate: "10-12-2024",
    },
    {
      serialNo: 10,
      vendorName: "Lokesh",
      vendor: "Sports Vend ",
      supply: <div>Odds</div>,
      loadingChips: <div>-</div>,
      rent: <div>100000</div>,
      shareRoyalty: "-",
      paidRent: <div className="red-font">100000</div>,
      paidShareRoyalty: <div>-</div>,
      balance: <div className="red-font">0</div>,
      dueDate: "10-12-2024",
    },
    {
      serialNo: 11,
      vendorName: "Lokesh",
      vendor: "Sports Vend ",
      supply: <div>Odds</div>,
      loadingChips: <div>-</div>,
      rent: <div>100000</div>,
      shareRoyalty: "-",
      paidRent: <div className="red-font">100000</div>,
      paidShareRoyalty: <div>-</div>,
      balance: <div className="red-font">0</div>,
      dueDate: "10-12-2024",
    },
    {
      serialNo: 12,
      vendorName: "Lokesh",
      vendor: "Sports Vend ",
      supply: <div>Odds</div>,
      loadingChips: <div>-</div>,
      rent: <div>100000</div>,
      shareRoyalty: "-",
      paidRent: <div className="red-font">100000</div>,
      paidShareRoyalty: <div>-</div>,
      balance: <div className="red-font">0</div>,
      dueDate: "10-12-2024",
    },
    {
      serialNo: 13,
      vendorName: "Lokesh",
      vendor: "Sports Vend ",
      supply: <div>Odds</div>,
      loadingChips: <div>-</div>,
      rent: <div>100000</div>,
      shareRoyalty: "-",
      paidRent: <div className="red-font">100000</div>,
      paidShareRoyalty: <div>-</div>,
      balance: <div className="red-font">0</div>,
      dueDate: "10-12-2024",
    },
    {
      serialNo: 14,
      vendorName: "Lokesh",
      vendor: "Sports Vend ",
      supply: <div>Odds</div>,
      loadingChips: <div>-</div>,
      rent: <div>100000</div>,
      shareRoyalty: "-",
      paidRent: <div className="red-font">100000</div>,
      paidShareRoyalty: <div>-</div>,
      balance: <div className="red-font">0</div>,
      dueDate: "10-12-2024",
    },
    {
      serialNo: 15,
      vendorName: "Lokesh",
      vendor: "Sports Vend ",
      supply: <div>Odds</div>,
      loadingChips: <div>-</div>,
      rent: <div>100000</div>,
      shareRoyalty: "-",
      paidRent: <div className="red-font">100000</div>,
      paidShareRoyalty: <div>-</div>,
      balance: <div className="red-font">0</div>,
      dueDate: "10-12-2024",
    },
    {
      serialNo: 16,
      vendorName: "Lokesh",
      vendor: "Sports Vend ",
      supply: <div>Odds</div>,
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
    { header: "" },
    { header: <div>20000000</div> },
    { header: <div>40000000</div> },
    { header: <div>75000000</div> },
    { header: <div className="red-font">4000000</div> },
    { header: <div className="red-font">75000000</div> },
    { header: <div className="red-font">0</div> },
    {
      header: (
        <div>
          Net pay : <span className="red-font">100000</span>
        </div>
      ),
    },
  ];

  const OWNER_ACCOUNT_COLUMNS = [
    { header: "D/W Type", field: "dwType" },
    { header: "Deposit", field: "deposit" },
    { header: "Withdraw", field: "withdraw" },
    { header: "D-W P/L", field: "dwPL" },
  ];

  const OWNER_ACCOUNT_DATA = [
    {
      dwType: "Sports",
      deposit: <div className="green-font">500000</div>,
      withdraw: "-",
      dwPL: <div className="green-font">500000</div>,
    },

    {
      dwType: "Sports",
      deposit: <div className="green-font">500000</div>,
      withdraw: "-",
      dwPL: <div className="green-font">500000</div>,
    },
    {
      dwType: "Sports",
      deposit: <div className="green-font">500000</div>,
      withdraw: "-",
      dwPL: <div className="green-font">500000</div>,
    },
    {
      dwType: "Sports",
      deposit: <div className="green-font">500000</div>,
      withdraw: <div className="red-font">500000</div>,
      dwPL: <div className="green-font">500000</div>,
    },
    {
      dwType: "Sports",
      deposit: <div className="green-font">500000</div>,
      withdraw: <div className="red-font">500000</div>,
      dwPL: <div className="green-font">500000</div>,
    },
    {
      dwType: "Sports",
      deposit: <div className="green-font">500000</div>,
      withdraw: <div className="red-font">500000</div>,
      dwPL: <div className="green-font">500000</div>,
    },
  ];

  const OWNER_ACCOUNT_FOOTER = [
    { header: "Total" },
    { header: <div className="green-font">200000</div> },
    { header: <div className="red-font">500000</div> },
    { header: <div className="green-font">7500000</div> },
  ];

  const PAYMENT_GATEWAY_COLUMNS = [
    { header: "Gateway Name", field: "gatewayName" },
    { header: "Deposit", field: "deposit" },
    { header: "Withdraw", field: "withdraw" },
    { header: "Gway Bal", field: "gwayBal" },
    { header: "Gway to Owner", field: "gwaytoOwner" },
    { header: "Gway Net Bal", field: "gwayNetBal" },
  ];

  const PAYMENT_GATEWAY_DATA = [
    {
      gatewayName: (
        <div>
          T Exchange <br /> ICICI Gateway
        </div>
      ),
      deposit: <div className="green-font">500000</div>,
      withdraw: <div className="red-font">500000</div>,
      gwayBal: <div className="green-font">500000</div>,
      gwaytoOwner: <div className="green-font">500000</div>,
      gwayNetBal: <div className="green-font">500000</div>,
    },

    {
      gatewayName: (
        <div>
          T Exchange <br /> ICICI Gateway
        </div>
      ),
      deposit: <div className="green-font">500000</div>,
      withdraw: "-",
      gwayBal: <div className="green-font">500000</div>,
      gwaytoOwner: <div className="green-font">500000</div>,
      gwayNetBal: <div className="green-font">500000</div>,
    },
    {
      gatewayName: (
        <div>
          T Exchange <br /> ICICI Gateway
        </div>
      ),
      deposit: <div className="green-font">500000</div>,
      withdraw: "-",
      gwayBal: <div className="green-font">500000</div>,
      gwaytoOwner: <div className="green-font">500000</div>,
      gwayNetBal: <div className="green-font">500000</div>,
    },
    {
      gatewayName: (
        <div>
          T Exchange <br /> ICICI Gateway
        </div>
      ),
      deposit: <div className="green-font">500000</div>,
      withdraw: "-",
      gwayBal: <div className="green-font">500000</div>,
      gwaytoOwner: <div className="green-font">500000</div>,
      gwayNetBal: <div className="green-font">500000</div>,
    },
    {
      gatewayName: (
        <div>
          T Exchange <br /> ICICI Gateway
        </div>
      ),
      deposit: <div className="green-font">500000</div>,
      withdraw: "-",
      gwayBal: <div className="green-font">500000</div>,
      gwaytoOwner: <div className="green-font">500000</div>,
      gwayNetBal: <div className="green-font">500000</div>,
    },
  ];

  const PAYMENT_GATEWAY_FOOTER = [
    { header: "Total" },
    { header: <div className="green-font">200000</div> },
    { header: <div className="red-font">500000</div> },
    { header: <div className="green-font">7500000</div> },
    { header: <div className="green-font">500000</div> },
    { header: <div className="green-font">7500000</div> },
  ];

  const GATEWAY_COLUMNS = [
    { header: "S No", field: "SNo" },
    { header: "Date & Time", field: "dateTime" },
    { header: "From", field: "from" },
    { header: "To", field: "to" },
    { header: "Gateway Balance", field: "gatewayBalance" },
    { header: "Owner Withdraw", field: "ownerWithdraw" },
    { header: "Gateway Net Bal", field: "gatewayNetBal" },
  ];

  const GATEWAY_DATA = [
    {
      SNo: 1,
      dateTime: <div>08-10-2024, 15:43:00</div>,
      from: <div>Rozer Pay</div>,
      to: <div>Owner</div>,
      gatewayBalance: <div>500000</div>,
      ownerWithdraw: <div className="red-font">500000</div>,
      gatewayNetBal: <div>500000</div>,
    },

    {
      SNo: 2,
      dateTime: <div>08-10-2024, 15:43:00</div>,
      from: <div>Rozer Pay</div>,
      to: <div>Owner</div>,
      gatewayBalance: <div>500000</div>,
      ownerWithdraw: <div className="red-font">500000</div>,
      gatewayNetBal: <div>500000</div>,
    },
    {
      SNo: 3,
      dateTime: <div>08-10-2024, 15:43:00</div>,
      from: <div>Rozer Pay</div>,
      to: <div>Owner</div>,
      gatewayBalance: <div>500000</div>,
      ownerWithdraw: <div className="red-font">500000</div>,
      gatewayNetBal: <div>500000</div>,
    },
    {
      SNo: 4,
      dateTime: <div>08-10-2024, 15:43:00</div>,
      from: <div>Rozer Pay</div>,
      to: <div>Owner</div>,
      gatewayBalance: <div>500000</div>,
      ownerWithdraw: <div className="red-font">500000</div>,
      gatewayNetBal: <div>500000</div>,
    },
    {
      SNo: 5,
      dateTime: <div>08-10-2024, 15:43:00</div>,
      from: <div>Rozer Pay</div>,
      to: <div>Owner</div>,
      gatewayBalance: <div>500000</div>,
      ownerWithdraw: <div className="red-font">500000</div>,
      gatewayNetBal: <div>500000</div>,
    },
    {
      SNo: 6,
      dateTime: <div>08-10-2024, 15:43:00</div>,
      from: <div>Rozer Pay</div>,
      to: <div>Owner</div>,
      gatewayBalance: <div>500000</div>,
      ownerWithdraw: <div className="red-font">500000</div>,
      gatewayNetBal: <div>500000</div>,
    },
    {
      SNo: 7,
      dateTime: <div>08-10-2024, 15:43:00</div>,
      from: <div>Rozer Pay</div>,
      to: <div>Owner</div>,
      gatewayBalance: <div>500000</div>,
      ownerWithdraw: <div className="red-font">500000</div>,
      gatewayNetBal: <div>500000</div>,
    },
  ];

  const GATEWAY_FOOTER = [
    { header: "Total" },
    { header: "" },
    { header: "" },
    { header: "" },
    { header: "" },
    { header: <div className="red-font">7500000</div> },
    { header: "" },
  ];

  return (
    <div>
      <div className="d-flex small-font mt-3">
        {SPORTS_BUTTONS?.map((sport, index) => (
          <div
            key={index}
            className={`me-3 ${
              activeSport === sport ? "saffron-btn2" : "white-btn2 pointer"
            }`}
            onClick={() => handleSportClick(sport)}
          >
            {sport}
          </div>
        ))}
      </div>
      <div className="flex-between mb-3 mt-4">
        <h6 className="d-flex yellow-font medium-font mb-0">
          {activeSport === "My Statements"
            ? "My Statements"
            : "My Gateway Transaction"}
        </h6>
      </div>
      {activeSport === "My Gateway Transaction" && (
        <div className="d-flex w-90 mb-3">
          <div className="col-2 flex-column me-3">
            <label className="black-text4 small-font mb-1">Game</label>
            <Select
              className="small-font"
              options={gameOptions}
              placeholder="Select"
              styles={customStyles}
              maxMenuHeight={120}
              menuPlacement="auto"
              classNamePrefix="custom-react-select"
            />
          </div>
          <div className="d-flex align-items-end w-100">
            <button className="saffron-btn2 small-font pointer col-1 px-2">
              Submit
            </button>
          </div>
        </div>
      )}

      <div className="col-10 col-lg-9 d-flex">
        <div className="w-100 flex-between flex-wrap mb-3 py-3 grey-bg2 rounded">
          <div className="col-6 px-3">
            <div className="white-btn2 flex-between">
              <span className="small-font">
                {activeSport === "My Statements"
                  ? "Own D/W. P&L"
                  : "Total Deposit"}{" "}
              </span>
              <span className="medium-font green-font">1000000000</span>
            </div>
          </div>
          <div className="col-6 px-3">
            <div className="white-btn2 flex-between">
              <span className="small-font">
                {activeSport === "My Statements"
                  ? "  Vend Pays"
                  : "Gateway to Owner"}
              </span>
              <span className="medium-font red-font">1000000000</span>
            </div>
          </div>
          <div className="col-6 px-3 mt-2">
            <div className="white-btn2 flex-between">
              <span className="small-font">
                {activeSport === "My Statements"
                  ? "  Own Gateway P&L"
                  : "Total Withdraw"}
              </span>
              <span className="medium-font green-font">2000000000</span>
            </div>
          </div>
          <div className="col-6 px-3 mt-2">
            <div className="white-btn2 flex-between">
              <span className="small-font">
                {activeSport === "My Statements"
                  ? "Own Net P/L"
                  : "Gateway Net P/L "}
              </span>
              <span className="medium-font red-font">2000000000</span>
            </div>
          </div>
        </div>

        {activeSport === "My Gateway Transaction" && (
          <div
            className="flex-end mb-3 ms-3 pointer"
            onClick={() => setSettleBalance(true)}
          >
            <div className="white-btn2 medium-font  ">Settlements</div>
          </div>
        )}
      </div>

      {activeSport === "My Statements" && (
        <div>
          <h6 className="medium-font fw-600">Vendors Account</h6>
          <div>
            <ScrollTable
              columns={MY_TRANSACTIONS_COLUMNS}
              data={MY_TRANSACTIONS_DATA}
              footer={MY_TRANSACTIONS_FOOTER}
              itemsPerPage={2}
              greyBackground="footer-bg"
            />
          </div>
          <div className="row mt-4">
            <div className="col-6">
              <h6 className="medium-font fw-600">Owner Accounts D/W</h6>
              <ScrollTable
                columns={OWNER_ACCOUNT_COLUMNS}
                data={OWNER_ACCOUNT_DATA}
                footer={OWNER_ACCOUNT_FOOTER}
                greyBackground="footer-bg"
              />
            </div>
            <div className="col-6">
              <h6 className="medium-font fw-600">Payment Gateway D/W</h6>
              <ScrollTable
                columns={PAYMENT_GATEWAY_COLUMNS}
                data={PAYMENT_GATEWAY_DATA}
                footer={PAYMENT_GATEWAY_FOOTER}
                greyBackground="footer-bg"
              />
            </div>
          </div>
        </div>
      )}

      {activeSport === "My Gateway Transaction" && (
        <div>
          <h6 className="medium-font fw-600">Gateway Transactions</h6>
          <div>
            <ScrollTable
              columns={GATEWAY_COLUMNS}
              data={GATEWAY_DATA}
              footer={GATEWAY_FOOTER}
              itemsPerPage={1}
              greyBackground="footer-bg"
            />
          </div>
        </div>
      )}
      <SettlePopUp
        setSettleBalance={setSettleBalance}
        settleBalance={settleBalance}
      />
    </div>
  );
}

export default MyStatement;
