import React, { useState } from "react";
import Table from "../../../components/Table";
import { GrEdit } from "react-icons/gr";
import Form from "react-bootstrap/Form";
import "../style.css";
import AddPaymentGatewayPopup from "../popups/AddPaymentGatewayPopup";
// import { AiOutlineDown } from "react-icons/ai";

const countryOptions = ["India", "USA", "Canada"];
const gatewayOptions = ["NEFT", "SWIFT", "RTGS"];
const detailOptions = ["NEFT", "Detail 2", "Detail 3"];

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
          size={17}
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
      action: <GrEdit size={17} />,
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
      action: <GrEdit size={17} />,
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
      action: <GrEdit size={17} />,
    },
  ];

  return (
    <div>
      <div className="py-4 bg-white shadow rounded">
        <div className="px-4 d-flex justify-content-between align-items-center mb-3">
          <h6 className="medium-font">Add Payment gateway</h6>
          <div className="d-flex align-items-center">
            <span className="me-2 black-text medium-font">Active</span>

            <Form>
              <Form.Check
                type="switch"
                id="custom-switch"
                className="director-admin-profile-toggle-btn"
              />
            </Form>

            <span className="me-2 black-text medium-font">In-active</span>
          </div>
        </div>
        <hr className="dashed-line mb-4" style={{ color: "black" }} />

        <div className="row align-items-center py-3 px-3 mb-2 payment-gateway-select-container">
          {/* Country Dropdown */}
          <div className="col-md-2 mb-3 mb-md-0">
            <label className="medium-font mb-1 d-block">Country</label>
            <div className="position-relative">
              <select className="small-font border form-select custom-select bg-light rounded px-3 w-100">
                {countryOptions.map((country, index) => (
                  <option className="small-font" key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Gateway Dropdown */}
          <div className="col-md-2 mb-3 mb-md-0">
            <label className="medium-font mb-1 d-block">Gateway</label>
            <div className="position-relative">
              <select className="form-select custom-select bg-light border rounded px-3 w-100">
                {gatewayOptions.map((gateway, index) => (
                  <option className="medium-font" key={index} value={gateway}>
                    {gateway}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Select Details Dropdown */}
          <div className="col-md-7 mb-3 mb-md-0">
            <label className="medium-font mb-1 d-block">Select Details</label>
            <div className="position-relative">
              <select className="form-select custom-select bg-light border rounded px-3 w-100">
                {detailOptions.map((detail, index) => (
                  <option className="medium-font" key={index} value={detail}>
                    {detail}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-md-1 text-md-end align-self-end">
            <button className="text-white rounded saffron-btn px-4 w-100 w-md-auto">
              Submit
            </button>
          </div>
        </div>

        <div className="row d-flex justify-content-between px-3">
          <h6 className="col-2">All Currencies</h6>

          <div className="col-2 mb-3 mb-md-0 ">
            <div className="position-relative">
              <select className="form-select custom-select bg-light border rounded px-3 w-100">
                {countryOptions.map((country, index) => (
                  <option className="medium-font" key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
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
      <hr className="dashed-line mb-4" style={{ color: "black" }} />

      <div className="row align-items-center py-3 px-3 mb-2 payment-gateway-select-container">
        {/* Country Dropdown */}
        <div className="col-md-2 mb-3 mb-md-0">
          <label className="medium-font mb-1 d-block">Country</label>
          <div className="position-relative">
            <select className="small-font border form-select custom-select bg-light rounded px-3 w-100">
              {countryOptions.map((country, index) => (
                <option className="small-font" key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Gateway Dropdown */}
        <div className="col-md-2 mb-3 mb-md-0">
          <label className="medium-font mb-1 d-block">Gateway</label>
          <div className="position-relative">
            <select className="form-select custom-select bg-light border rounded px-3 w-100">
              {gatewayOptions.map((gateway, index) => (
                <option className="medium-font" key={index} value={gateway}>
                  {gateway}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Select Details Dropdown */}
        <div className="col-md-7 mb-3 mb-md-0">
          <label className="medium-font mb-1 d-block">Select Details</label>
          <div className="position-relative">
            <select className="form-select custom-select bg-light border rounded px-3 w-100">
              {detailOptions.map((detail, index) => (
                <option className="medium-font" key={index} value={detail}>
                  {detail}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-md-1 text-md-end align-self-end">
          <button className="text-white rounded saffron-btn px-4 w-100 w-md-auto">
            Submit
          </button>
        </div>
      </div>

      <div className="row d-flex justify-content-between px-3">
        <h6 className="col-2">All Currencies</h6>

        <div className="col-2 mb-3 mb-md-0 ">
          <div className="position-relative">
            <select className="form-select custom-select bg-light border rounded px-3 w-100">
              {countryOptions.map((country, index) => (
                <option className="medium-font" key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="table-parent-container mt-2">
        <Table data={data} columns={columns} itemsPerPage={3} />
      </div>
    </div>
  );
};

export default PaymentGateway;
