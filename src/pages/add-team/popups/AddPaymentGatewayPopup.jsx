import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import { AiOutlineCloudUpload } from "react-icons/ai";
import PropTypes from "prop-types";
import Select from "react-select";
import { customStyles } from "../../../components/ReactSelectStyles";
import { postDirectorAccountDetails } from "../../../api/apiMethods";
import SuccessPopup from "../../popups/SuccessPopup";
import ErrorPopup from "../../popups/SuccessPopup";



const AddPaymentGatewayPopup = ({ show, onHide, data, getDirectorAccountData }) => {
  const [paymentMethod, setPaymentMethod] = useState("1");
  const [provider, setProvider] = useState("");
  const [upiID, setUpiID] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankIFSC, setBankIFSC] = useState("");
  const [bankName, setBankName] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [qrCode, setQrCode] = useState(null);

  const cOptions = data.map((item) => ({
    value: item?.id,
    label: item?.name,
  }));

  const handleQrCodeChange = (e) => {
    setQrCode(e.target.files[0]); // Store the selected file
  };

  const handleSubmit = async () => {
    console.log("Image Selected:", qrCode);

    // Validation
    if (paymentMethod === "2") {
      if (provider === "" || upiID === "" || country === "") {
        alert("Please fill in all fields before submitting.");
        return;
      }
    } else if (paymentMethod === "3") {
      if (bankName === "" || !qrCode) {
        alert("Please fill in all fields before submitting.");
        return;
      }
    } else {
      if (accountNumber === "" || bankIFSC === "" || bankName === "" || country === "") {
        alert("Please fill in all fields before submitting.");
        return;
      }
    }

    await addDirectorAccountDetails();
    onHide(); // Close the modal
  };

  // Send data to backend using FormData for file upload
  const addDirectorAccountDetails = async () => {
    const formData = new FormData();
    formData.append("gateway_type", parseInt(paymentMethod));
    formData.append("status", 1);
    formData.append("director_id", 1);

    if (paymentMethod === "1") {
      formData.append("bank_acc_no", accountNumber);
      formData.append("bank_ifsc", bankIFSC);
      formData.append("bank_name", bankName);
      formData.append("country", country);
    } else if (paymentMethod === "2") {
      formData.append("upi_provider", provider);
      formData.append("upi_provider_id", upiID);
      formData.append("country", country);
    } else if (paymentMethod === "3") {
      formData.append("qr_code_image", qrCode); // Attach file
      formData.append("bank_name", bankName);
    }

    try {
      const response = await postDirectorAccountDetails(formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });

      console.log("Response from API:", response);

      setSuccessPopupOpen(true);
      setTimeout(() => {
        setSuccessPopupOpen(false);
      }, 5000);

      reset(); // Reset form values
      getDirectorAccountData(); // Refresh data
    } catch (error) {
      setError(error?.message);
      setErrorPopupOpen(true);
      console.error("Error from API:", error);
      // alert("Something went wrong! Please try again later.");
    }
  };

  const reset = () => {
    setPaymentMethod("1");
    setProvider("");
    setUpiID("");
    setAccountNumber("");
    setBankIFSC("");
    setBankName("");
    setCountry("");
    setQrCode(null);
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
          <MdOutlineClose size={22} onClick={onHide} className="pointer" />
        </div>

        <div className="row mb-3">
          <div className="col-4">
            <label htmlFor="paymentMethod" className="small-font mb-1">
              Select Method
            </label>
            <Select
              className="small-font"
              options={paymentMethodOptions}
              placeholder="Select"
              styles={customStyles}
              maxMenuHeight={120}
              menuPlacement="auto"
              value={paymentMethodOptions.find((method) => method.value === paymentMethod)}
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
                  options={upiProviderOptions}
                  placeholder="Select"
                  styles={customStyles}
                  maxMenuHeight={120}
                  menuPlacement="auto"
                  value={upiProviderOptions.find((option) => option.value === provider)}
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
              <Select
                id="country"
                className="small-font"
                styles={customStyles}
                placeholder="Select"
                maxMenuHeight={120}
                menuPlacement="auto"
                options={cOptions}
                value={cOptions.find((option) => option.value === country) || ""}
                onChange={(selectedOption) => setCountry(selectedOption ? selectedOption.value : "")}
              // options={data.map((c) => ({
              //   value: c.id, // use id as value
              //   label: c.name, // display name as label
              // }))}
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
                <Select
                  id="country"
                  className="small-font"
                  styles={customStyles}
                  placeholder="Select"
                  maxMenuHeight={120}
                  menuPlacement="auto"
                  options={cOptions}
                  value={cOptions.find((option) => option.value === country) || ""}
                  onChange={(selectedOption) => setCountry(selectedOption ? selectedOption.value : "")}

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
      <SuccessPopup
        successPopupOpen={successPopupOpen}
        setSuccessPopupOpen={setSuccessPopupOpen}
        discription={"success"}
      />
        <ErrorPopup
        errorPopupOpen={errorPopupOpen}
        setErrorPopupOpen={setErrorPopupOpen}
        discription={error}
      />
    </Modal>

  );

};

AddPaymentGatewayPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default AddPaymentGatewayPopup;
