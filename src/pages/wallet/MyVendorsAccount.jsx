import React from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";

function MyVendorsAccount() {
  const navigate = useNavigate();
  const VENDOR_COLUMNS = [
    { header: "Vendor Name", field: "vendor_name" },
    { header: "Providing", field: "providing" },
    { header: "M. Rent", field: "monthly_rent" },
    { header: "Percentage (%)", field: "percentage" },
    { header: "Billing Date", field: "billing_date" },
    { header: "Loading Cas. Chip", field: "loading_cash_chip" },
    { header: "Billing Cas.", field: "billing_cash" },
    { header: "Used Cas. Chip", field: "used_cash_chip" },
    { header: "Bal. Cas. Chip", field: "balance_cash_chip" },
    { header: "Total Amt.", field: "total_amount" },
    { header: "Paid Amt.", field: "paid_amount" },
    { header: "Balance", field: "balance" },
  ];

  const VENDOR_DATA = [
    {
      vendor_name: (
        <div>
          Mishra
          <br />
          Dubai
          <br />
          Sports
        </div>
      ),
      providing: (
        <div>
          Odds
          <br />
          Fancy
          <br />
          Live Stream
          <br />
          Score Board
        </div>
      ),
      monthly_rent: 500000,
      percentage: "-",
      billing_date: "07-10-2024",
      loading_cash_chip: "-",
      billing_cash: "-",
      used_cash_chip: "-",
      balance_cash_chip: "-",
      total_amount: <div className="green-font">10000000</div>,
      paid_amount: <div className="yellow-font">10000000</div>,
      balance: (
        <div>
          <div className="red-font">10000000</div>
          <div
            className="green-btn mt-2"
            onClick={() => navigate("/settled-history")}
          >
            Settled
          </div>
        </div>
      ),
    },
    {
      vendor_name: (
        <div>
          Jordan
          <br />
          Dubai
          <br />
          Casino
        </div>
      ),
      providing: (
        <div>
          Ezugi
          <br />
          Evolution
          <br />
          Pragmatic Play
          <br />
          Sexy Games
        </div>
      ),
      monthly_rent: "-",
      percentage: "5%",
      billing_date: "07-10-2024",
      loading_cash_chip: 10000000,
      billing_cash: 10000000,
      used_cash_chip: 10000000,
      balance_cash_chip: 10000000,
      total_amount: <div className="green-font">10000000</div>,
      paid_amount: <div className="yellow-font">10000000</div>,
      balance: (
        <div>
          <div className="red-font">10000000</div>
          <div
            className="green-btn mt-2"
            onClick={() => navigate("/settled-history")}
          >
            Settled
          </div>
        </div>
      ),
    },
    {
      vendor_name: (
        <div>
          Jordan
          <br />
          Dubai
          <br />
          Casino
        </div>
      ),
      providing: (
        <div>
          Ezugi
          <br />
          Evolution
          <br />
          Pragmatic Play
          <br />
          Sexy Games
        </div>
      ),
      monthly_rent: "-",
      percentage: "5%",
      billing_date: "07-10-2024",
      loading_cash_chip: 10000000,
      billing_cash: 10000000,
      used_cash_chip: 10000000,
      balance_cash_chip: 10000000,
      total_amount: <div className="green-font">10000000</div>,
      paid_amount: <div className="yellow-font">10000000</div>,
      balance: (
        <div>
          <div className="red-font">10000000</div>
          <div
            className="green-btn mt-2"
            onClick={() => navigate("/settled-history")}
          >
            Settled
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="yellow-font medium-font mb-0">My Vendors Account</h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input className="small-font all-none" placeholder="Search..." />
        </div>
      </div>
      <div className="flex-between mb-3">
        <div className="w-50 d-flex p-3 grey-bg2 rounded">
          <div className="col-4 pe-3 flex-center">
            <span className="w-100 saffron-btn2 small-font">
              Owner Balance
            </span>
          </div>
          <div className="col-8 white-btn2 flex-between">
            <span className="small-font">Casino Balance Chips</span>
            <span className="medium-font">1000000000</span>
          </div>
        </div>
        <div className="white-btn2 medium-font px-3">Settled History</div>
      </div>
      <Table columns={VENDOR_COLUMNS} data={VENDOR_DATA} itemsPerPage={2} />
    </div>
  );
}

export default MyVendorsAccount;
