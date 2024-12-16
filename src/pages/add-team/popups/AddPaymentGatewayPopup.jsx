import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import { AiOutlineCloudUpload } from "react-icons/ai";
import PropTypes from "prop-types";
import Select from "react-select";
import { customStyles } from "../../../components/ReactSelectStyles";

const AddPaymentGatewayPopup = ({ show, onHide }) => {
  const [paymentMethod, setPaymentMethod] = useState("1");
  const [provider, setProvider] = useState("");
  const [upiID, setUpiID] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankIFSC, setBankIFSC] = useState("");
  const [bankName, setBankName] = useState("");
  const [country, setCountry] = useState("");
  const [qrCode, setQrCode] = useState(null);

  const handleSubmit = () => {
    if (paymentMethod === "2") {
      if (provider === "" || upiID === "" || country === "") {
        alert("Please fill in all fields before submitting.");
        return;
      }
    } else if (paymentMethod === "3") {
      if (bankName === "" || qrCode === null) {
        alert("Please fill in all fields before submitting.");
        return;
      }
    } else {
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

    setPaymentMethod("1");
    setProvider("");
    setUpiID("");
    setAccountNumber("");
    setBankIFSC("");
    setBankName("");
    setCountry("");
    setQrCode(null);

    onHide();
  };

  const handleQrCodeChange = (e) => {
    setQrCode(e.target.files[0]);
  };
  const paymentMethodOptions = [
    { value: "1", label: "NEFT/RTGS" },
    { value: "2", label: "UPI" },
    { value: "3", label: "QR Code" },
  ];

  const upiProviderOptions = [
    { value: "GooglePay", label: "Google Pay" },
    { value: "PhonePe", label: "PhonePe" },
    { value: "Paytm", label: "Paytm" },
  ];

  return (
    <Modal centered show={show} onHide={onHide} size="md">
      <Modal.Body className="p-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="medium-font fw-600">Add Payment Gateway</h5>
          <MdOutlineClose size={18} onClick={onHide} className="pointer" />
        </div>

        <div className="row mb-3">
          <div className="col-4">
            <label htmlFor="paymentMethod" className="small-font mb-1">
              Select Method
            </label>
            <Select
              className="small-font"
              options={[
                { value: "1", label: "NEFT/RTGS" },
                { value: "2", label: "UPI" },
                { value: "3", label: "QR Code" },
              ]}
              placeholder="Select"
              styles={customStyles}
              maxMenuHeight={120}
              menuPlacement="auto"
              value={{
                value: paymentMethod,
                label:
                  paymentMethod === "1"
                    ? "NEFT/RTGS"
                    : paymentMethod === "2"
                    ? "UPI"
                    : "QR Code",
              }}
              onChange={(selected) => setPaymentMethod(selected.value)}
            />
          </div>

          {/* Conditional Fields based on Payment Method */}
          {paymentMethod === "2" && (
            <>
              {/* UPI Fields */}
              <div className="col-4">
                <label htmlFor="provider" className="small-font mb-1">
                  Select Provider
                </label>
                <Select
                  className="small-font"
                  options={[
                    { value: "GooglePay", label: "Google Pay" },
                    { value: "PhonePe", label: "PhonePe" },
                    { value: "Paytm", label: "Paytm" },
                  ]}
                  placeholder="Select"
                  styles={customStyles}
                  maxMenuHeight={120}
                  menuPlacement="auto"
                  value={{
                    value: provider,
                    label:
                      provider === "GooglePay"
                        ? "Google Pay"
                        : provider === "PhonePe"
                        ? "PhonePe"
                        : "Paytm",
                  }}
                  onChange={(selected) => setProvider(selected.value)}
                />
              </div>

              <div className="col-4">
                <label htmlFor="upiID" className="small-font mb-1">
                  UPI ID
                </label>
                <input
                  id="upiID"
                  type="text"
                  className="w-100 small-font rounded input-css all-none"
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
                <label htmlFor="bankName" className="small-font mb-1">
                  Bank Name
                </label>
                <input
                  id="bankName"
                  type="text"
                  className="w-100 small-font rounded input-css all-none"
                  placeholder="Enter"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
              </div>

              <div className="col-4">
                <label htmlFor="qrCode" className="small-font mb-1">
                  Upload QR Code
                </label>
                <div className="input-group">
                  <input
                    id="qrCode"
                    type="file"
                    className="w-100 small-font rounded input-css all-none"
                    onChange={handleQrCodeChange}
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="qrCode"
                    className="upload-input-popup btn d-flex justify-content-between align-items-center rounded w-100 pointer"
                  >
                    <span className="small-font">Upload</span>
                    <AiOutlineCloudUpload size={20} />
                  </label>
                </div>
              </div>
            </>
          )}

          {paymentMethod === "1" && (
            <>
              {/* NEFT/RTGS Fields */}
              <div className="col-4">
                <label htmlFor="accountNumber" className="small-font mb-1">
                  Bank Account Number
                </label>
                <input
                  id="accountNumber"
                  type="text"
                  className="w-100 small-font rounded input-css all-none"
                  placeholder="Enter"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </div>

              <div className="col-4">
                <label htmlFor="bankIFSC" className="small-font mb-1">
                  Bank IFSC
                </label>
                <input
                  id="bankIFSC"
                  type="text"
                  className="w-100 small-font rounded input-css all-none"
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
              <label htmlFor="bankName" className="small-font mb-1">
                Bank Name
              </label>
              <input
                id="bankName"
                type="text"
                className="w-100 small-font rounded input-css all-none"
                placeholder="Enter"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </div>

            {/* Country Input */}
            <div className="col-4">
              <label htmlFor="country" className="small-font mb-1">
                Country
              </label>
              <input
                id="country"
                type="text"
                className="w-100 small-font rounded input-css all-none"
                placeholder="Enter"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div className="col-4 d-flex justify-content-end align-items-end">
              <button
                type="button"
                className="saffron-btn w-100 small-font rounded"
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
                <label htmlFor="country" className="small-font mb-1">
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  className="w-100 small-font rounded input-css all-none"
                  placeholder="Enter"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            )}

            {/* Submit Button */}
            <div className={`col-4 ${paymentMethod === "3" ? "offset-8" : ""}`}>
              <button
                type="button"
                className="w-100 saffron-btn rounded small-font"
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

AddPaymentGatewayPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default AddPaymentGatewayPopup;
