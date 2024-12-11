import React, { useState } from "react";
import Table from "../../../components/Table";
import { GrEdit } from "react-icons/gr";
import Form from "react-bootstrap/Form";
import "../style.css";
import AddPaymentGatewayPopup from "../popups/AddPaymentGatewayPopup";
import Select from "react-select";
import { customStyles } from "../../../components/ReactSelectStyles";

const countryOptions = [
  { value: "India", label: "India" },
  { value: "USA", label: "USA" },
  { value: "Canada", label: "Canada" },
];

const gatewayOptions = [
  { value: "NEFT", label: "NEFT" },
  { value: "SWIFT", label: "SWIFT" },
  { value: "RTGS", label: "RTGS" },
];
const detailOptions = [
  { value: "NEFT", label: "NEFT" },
  { value: "Detail 2", label: "Detail 2" },
  { value: "Detail 3", label: "Detail 3" },
];

const columns = [
  { header: "Gateway Name", field: "gatewayName", width: "15%" },
  { header: "Payment Details", field: "paymentDetails", width: "25%" },
  { header: "Last Updated", field: "lastUpdated", width: "10%" },
  { header: "Country", field: "country", width: "10%" },
  { header: "Currency", field: "currency", width: "10%" },
  { header: "Status", field: "status", width: "10%" },
  { header: "Action", field: "action", width: "10%" },
];

const PaymentGateway = () => {
  const [showPaymentGatewayPopup, setShowPaymentGatewayPopup] = useState(false);

  const data = [
    {
      gatewayName: "Google Pay",
      paymentDetails: "7551078156",
      lastUpdated: "26/09/2024",
      country: "India",
      currency: "INR ₹",
      status: (
        <span className="payment-gateway-status-badge badge py-2 px-3">
          Active
        </span>
      ),
      action: (
        <GrEdit
          size={18}
          className="pointer"
          onClick={() => setShowPaymentGatewayPopup(true)}
        />
      ),
    },
    {
      gatewayName: "UPI",
      paymentDetails: "srilCICI@ibl",
      lastUpdated: "26/09/2024",
      country: "India",
      currency: "INR ₹",
      status: (
        <span className="payment-gateway-status-badge badge py-2 px-3">
          Active
        </span>
      ),
      action: <GrEdit size={18} />,
    },
    {
      gatewayName: "NEFT/RTGS",
      paymentDetails: (
        <div>
          Srikumar Sunkara <br />
          A/C No: 34311236216 <br />
          IFSC Code: ICIC0040 <br />
          Bank: ICICI Bank
        </div>
      ),
      lastUpdated: "26/09/2024",
      country: "India",
      currency: "INR ₹",
      status: (
        <span className="payment-gateway-status-badge badge py-2 px-3">
          Active
        </span>
      ),
      action: <GrEdit size={18} />,
    },
    {
      gatewayName: "QR Code",
      paymentDetails: (
        <div>
          <img src="qr_code.png" alt="QR Code" style={{ width: "50px" }} />{" "}
          <br />
          ICICI Bank
        </div>
      ),
      lastUpdated: "26/09/2024",
      country: "India",
      currency: "INR ₹",
      status: (
        <span className="payment-gateway-status-badge badge py-2 px-3">
          Active
        </span>
      ),
      action: <GrEdit size={18} />,
    },
  ];

  return (
    <div>
      <div className="py-4 bg-white shadow rounded">
        <div className="px-4 d-flex justify-content-between align-items-center mb-3">
          <h6 className="medium-font">Add Payment gateway</h6>
          <div className="d-flex align-items-center">
            <span className="me-2 black-text small-font">Active</span>

            <Form>
              <Form.Check
                type="switch"
                id="custom-switch"
                className="director-admin-profile-toggle-btn"
              />
            </Form>

            <span className="me-2 black-text small-font">In-active</span>
          </div>
        </div>
        <hr className="dashed-line mb-4" style={{ color: "black" }} />

        <div className="row align-items-center py-3 px-3 mb-2 payment-gateway-select-container">
          {/* Country Dropdown */}
          <div className="col-md-2 mb-3 mb-md-0">
            <label className="small-font mb-1 d-block">Country</label>
            <Select
              className="small-font"
              options={countryOptions}
              placeholder="Select"
              styles={customStyles}
              maxMenuHeight={120}
              menuPlacement="auto"
            />
          </div>

          {/* Gateway Dropdown */}
          <div className="col-md-2 mb-3 mb-md-0">
            <label className="small-font mb-1 d-block">Gateway</label>
            <div className="position-relative">
              <Select
                className="small-font"
                options={gatewayOptions}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
              />
            </div>
          </div>

          {/* Select Details Dropdown */}
          <div className="col-md-6 col-lg-7 mb-3 mb-md-0">
            <label className="small-font mb-1 d-block">Select Details</label>
            <Select
              className="small-font"
              options={detailOptions}
              placeholder="Select"
              styles={customStyles}
              maxMenuHeight={120}
              menuPlacement="auto"
            />
          </div>

          {/* Submit Button */}
          <div className="col-md-2 col-lg-1 align-self-end pb-1">
            <button className="small-font rounded saffron-btn w-100">
              Submit
            </button>
          </div>
        </div>

        <div className="row d-flex justify-content-between px-3">
          <h6 className="col-2 small-font">All Currencies</h6>

          <div className="col-2 mb-3 mb-md-0 ">
            <div className="position-relative">
            <Select
              className="small-font"
              options={countryOptions}
              placeholder="Select"
              styles={customStyles}
              maxMenuHeight={120}
              menuPlacement="auto"
            />
            </div>
          </div>
        </div>

        <div className="table-parent-container mt-2">
          <Table data={data} columns={columns} itemsPerPage={3} />
        </div>

        <AddPaymentGatewayPopup
          show={showPaymentGatewayPopup}
          onHide={() => setShowPaymentGatewayPopup(false)}
        />
      </div>
    </div>
  );
};

export default PaymentGateway;
