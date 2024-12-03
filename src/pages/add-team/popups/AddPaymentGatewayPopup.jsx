import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import { AiOutlineCloudUpload } from "react-icons/ai";
import PropTypes from "prop-types";

const AddPaymentGatewayPopup = ({ show, onHide }) => {
  // State for input values
  const [paymentMethod, setPaymentMethod] = useState("1");
  const [provider, setProvider] = useState(""); // For UPI provider like Google Pay, etc.
  const [upiID, setUpiID] = useState(""); // For UPI ID
  const [accountNumber, setAccountNumber] = useState(""); // For NEFT/RTGS
  const [bankIFSC, setBankIFSC] = useState(""); // For NEFT/RTGS
  const [bankName, setBankName] = useState(""); // For Bank Name for NEFT/RTGS or QR Code
  const [country, setCountry] = useState(""); // For Country
  const [qrCode, setQrCode] = useState(null); // For QR Code upload

  // Handle Submit
  const handleSubmit = () => {
    // Validation based on payment method
    if (paymentMethod === "2") {
      // UPI
      if (provider === "" || upiID === "" || country === "") {
        alert("Please fill in all fields before submitting.");
        return;
      }
    } else if (paymentMethod === "3") {
      // QR Code
      if (bankName === "" || qrCode === null) {
        alert("Please fill in all fields before submitting.");
        return;
      }
    } else {
      // NEFT/RTGS
      if (
        accountNumber === "" ||
        bankIFSC === "" ||
        bankName === "" ||
        country === ""
      ) {
        alert("Please fill in all fields before submitting.");
        return;
      }
    }

    // You could add your submission logic here, e.g., sending the data to an API
    console.log({
      paymentMethod,
      provider,
      upiID,
      accountNumber,
      bankIFSC,
      bankName,
      country,
      qrCode,
    });

    // Reset the state after submission
    setPaymentMethod("1");
    setProvider("");
    setUpiID("");
    setAccountNumber("");
    setBankIFSC("");
    setBankName("");
    setCountry("");
    setQrCode(null);

    // Close the popup after successful submission
    onHide();
  };

  // Handle QR Code File Change
  const handleQrCodeChange = (e) => {
    setQrCode(e.target.files[0]);
  };

  return (
    <Modal centered show={show} onHide={onHide} size="md">
      <Modal.Body className="p-3">
        
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="medium-font fw-600">Add Payment Gateway</h5>
          <MdOutlineClose size={22} onClick={onHide} className="pointer" />
        </div>

        {/* Form Section */}
        <div className="row mb-3">
          {/* Select Method Dropdown */}
          <div className="col-4">
            <label htmlFor="paymentMethod" className="small-font fw-400 mb-1">
              Select Method
            </label>
            <select
              id="paymentMethod"
              className="w-100 small-font rounded input-css select-input"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="1">NEFT/RTGS</option>
              <option value="2">UPI</option>
              <option value="3">QR Code</option>
            </select>
          </div>

          {/* Conditional Fields based on Payment Method */}
          {paymentMethod === "2" && (
            <>
              {/* UPI Fields */}
              <div className="col-4">
                <label htmlFor="provider" className="small-font fw-400 mb-1">
                  Select Provider
                </label>
                <select
                  id="provider"
                  className="w-100 small-font rounded input-css select-input"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                >
                  <option value="GooglePay">Google Pay</option>
                  <option value="PhonePe">PhonePe</option>
                  <option value="Paytm">Paytm</option>
                </select>
              </div>

              <div className="col-4">
                <label htmlFor="upiID" className="small-font fw-400 mb-1">
                  UPI ID
                </label>
                <input
                  id="upiID"
                  type="text"
                  className="input-css all-none rounded w-100 p-0 py-2 px-2"
                  placeholder="Enter"
                  value={upiID}
                  onChange={(e) => setUpiID(e.target.value)}
                />
              </div>
            </>
          )}

          {paymentMethod === "3" && (
            <>
              {/* QR Code Fields */}
              <div className="col-4">
                <label htmlFor="bankName" className="small-font fw-400 mb-1">
                  Bank Name
                </label>
                <input
                  id="bankName"
                  type="text"
                  className="all-none rounded input-css w-100"
                  placeholder="Enter"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
              </div>

              <div className="col-4">
                <label htmlFor="qrCode" className="small-font fw-400 mb-1">
                  Upload QR Code
                </label>
                <div className="input-group">
                  <input
                    id="qrCode"
                    type="file"
                    className="form-control"
                    onChange={handleQrCodeChange}
                    style={{ display: "none" }} // Hide the actual file input
                  />
                  <label
                    htmlFor="qrCode"
                    className="upload-input-popup btn d-flex justify-content-between align-items-center rounded w-100 pointer"
                  >
                    <span className="small-font">Upload</span>
                    <AiOutlineCloudUpload size={20}/>
                  </label>
                </div>
              </div>
            </>
          )}

          {paymentMethod === "1" && (
            <>
              {/* NEFT/RTGS Fields */}
              <div className="col-4">
                <label
                  htmlFor="accountNumber"
                  className="small-font mb-1"
                >
                  Bank Account Number
                </label>
                <input
                  id="accountNumber"
                  type="text"
                  className="input-css all-none rounded w-100 p-0 py-2 px-2"
                  placeholder="Enter"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </div>

              <div className="col-4">
                <label htmlFor="bankIFSC" className="small-font fw-400 mb-1">
                  Bank IFSC
                </label>
                <input
                  id="bankIFSC"
                  type="text"
                  className="all-none rounded input-css w-100"
                  placeholder="Enter"
                  value={bankIFSC}
                  onChange={(e) => setBankIFSC(e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        {/* Second Row for NEFT/RTGS: Bank Name, Country, Submit */}
        {paymentMethod === "1" && (
          <div className="row d-flex align-items-end">
            {/* Bank Name Input */}
            <div className="col-4">
              <label htmlFor="bankName" className="small-font fw-400 mb-1">
                Bank Name
              </label>
              <input
                id="bankName"
                type="text"
                className="all-none rounded input-css w-100"
                placeholder="Enter"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </div>

            {/* Country Input */}
            <div className="col-4">
              <label htmlFor="country" className="small-font fw-400 mb-1">
                Country
              </label>
              <input
                id="country"
                type="text"
                className="all-none rounded input-css w-100"
                placeholder="Enter"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div className="col-4 d-flex justify-content-end align-items-end">
              <button
                type="button"
                className="saffron-btn w-100 rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {/* Second Row for QR Code and UPI */}
        {(paymentMethod === "2" || paymentMethod === "3") && (
          <div className="row d-flex mt-3 justify-content-between align-items-end">
            {/* Country Input (for UPI only) */}
            {paymentMethod === "2" && (
              <div className="col-4">
                <label htmlFor="country" className="small-font fw-400 mb-1">
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  className="all-none rounded input-css w-100"
                  placeholder="Enter"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            )}

            {/* Submit Button */}
            <div
              className={`col-4 ${
                paymentMethod === "3" ? "offset-8" : ""
              }`}
            >
              <button
                type="button"
                className="saffron-btn w-100 rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

// PropTypes for better type-checking
AddPaymentGatewayPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default AddPaymentGatewayPopup;
