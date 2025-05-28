import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";
import VendorPaymentModal from "./VendorPaymentModal";
import { getVendorAccounts } from "../../api/apiMethods";

function MyVendorsAccount() {
  const [vendorPayment, setVendorPayment] = useState(false);
  const navigate = useNavigate();
  const [vendorData, setVendorData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const filteredData = vendorData.filter((item) =>
    item?.vendorName?.toLowerCase().includes(searchInput.toLowerCase())
  );
  const VENDOR_COLUMNS = [
    { header: "Vendor Name", field: "vendor_name" },
    { header: "Providers", field: "providing" },
    { header: "M. Rent", field: "monthly_rent" },
    { header: "Percentage (%)", field: "percentage" },
    { header: "Billing Date", field: "billing_date" },
    // { header: "Loading Cas. Chip", field: "loading_cash_chip" },
    // { header: "Billing Cas.", field: "billing_cash" },
    // { header: "Used Cas. Chip", field: "used_cash_chip" },
    // { header: "Bal. Cas. Chip", field: "balance_cash_chip" },
    { header: "Total Amt.", field: "total_amount" },
    { header: "Paid Amt.", field: "paid_amount" },
    { header: "Balance", field: "balance" },
  ];

  const handleVendorPayemnt = () => {
    setVendorPayment(true);
  };
  const VENDOR_DATA = filteredData?.map((item, index) => ({
    vendor_name: (
      <div>
        {item?.vendorName}
        <br />
        <div>{item?.vendorCompany}</div>
      </div>
    ),
    providing: (
      <div className="d-flex flex-column gap-1">
        {item?.providers?.map((prv, index) => (
          <div key={index}>{prv}</div>
        ))}
      </div>
    ),
    monthly_rent: (
      <div>{item?.amountType === 1 ? `${item?.rentAmount}` : "-"}</div>
    ),
    percentage: (
      <div>{item?.amountType === 2 ? `${item?.percentage}%` : "-"}</div>
    ),
    billing_date: (
      <div>{item?.amountType === 1 ? `${item?.billingDate}` : "-"}</div>
    ),
    // loading_cash_chip: "-",
    // billing_cash: "-",
    // used_cash_chip: "-",
    // balance_cash_chip: "-",
    total_amount: <div className="green-font">{item?.totalAmount}</div>,
    paid_amount: <div className="yellow-font">{item?.paidAmount}</div>,
    balance: (
      <div>
        <div className="red-font">{item?.balanceAmount}</div>
        <div
          className="green-btn mt-2"
          onClick={() => navigate("/settled-history")}
        >
          Settled
        </div>
      </div>
    ),
  }));

  // vednor account data

  const fetchVendorData = () => {
    setLoading(true);
    getVendorAccounts()
      .then((response) => {
        if (response) {
          setLoading(false);
          setVendorData(response?.data);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error?.message);
      });
  };
  useEffect(() => {
    fetchVendorData();
  }, []);

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="yellow-font mb-0">My Vendors Account</h6>
        <div className="input-pill d-flex align-items-center rounded-pill px-2">
          <FaSearch size={16} className="grey-clr me-2" />
          <input
            className="small-font all-none"
            placeholder="Search by vendor name..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-between mb-3">
        <div className="w-50 d-flex p-3 grey-bg2 rounded">
          <div className="col-4 pe-3 flex-center">
            <span className="w-100 saffron-btn2 medium-font">
              Owner Balance
            </span>
          </div>
          <div className="col-8 white-btn2 flex-between">
            <span className="small-font">Casino Balance Chips</span>
            <span className=" medium-font">1000000000</span>
          </div>
        </div>
        <div className="d-flex gap-2">
          <div
            className="white-btn2 medium-font px-3 pointer"
            onClick={handleVendorPayemnt}
          >
            Pay Vendor
          </div>
          <div
            className="white-btn2 medium-font px-3 pointer"
            onClick={() => navigate("/settled-history")}
          >
            Settled History
          </div>
        </div>
      </div>
      <VendorPaymentModal
        vendorPaymentModal={vendorPayment}
        setVendorPaymentModal={setVendorPayment}
        data={vendorData}
      />
      {loading ? (
        <div className="spinner">
          <div className="spinner-circle"></div>
        </div>
      ) : (
        <Table columns={VENDOR_COLUMNS} data={VENDOR_DATA} itemsPerPage={2} />
      )}
    </div>
  );
}

export default MyVendorsAccount;
