import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/Table";
import ScrollTable from "../../components/ScrollTable";
import SettlePopUp from "./SettlePopUp";

function CasinoReports() {
  const [activeSport, setActiveSport] = useState("Vendor Report");
  const [settleBalance, setSettleBalance] = useState(false);
  const handleSportClick = (sport) => {
    setActiveSport(activeSport === sport ? null : sport);
  };
  const SPORTS_BUTTONS = [
    "Vendor Report",
    "Downline Admins Report",
    "Casino Bet P/L",
  ];
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
    { header: "Vendor Name", field: "vendorName" },
    { header: "Share/Royalty", field: "shareRoyalty" },
    { header: "Casino Profit/Loss", field: "casinoProfitLoss" },
    { header: "Net Payment", field: "netPayment" },
    { header: "", field: "icons" },
  
  ];

  const GATEWAY_DATA = [
    {
        vendorName: "Jayanta",
        shareRoyalty: <div>5%</div>,
        casinoProfitLoss: <div className="green-font">1000000</div>,
        netPayment: <div className="red-font">1000000000</div>,
        icons: <div>500000</div>,
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
      <div className="flex-between mb-3 mt-4">
        <h6 className="d-flex yellow-font mb-0">P/L Casino Reports</h6>
      </div>
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
      <div>
          <h6 className="fw-600">Vendor Wise P/L</h6>
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
    </div>
  );
}

export default CasinoReports;
