import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import { AiOutlineCloudUpload } from "react-icons/ai";
import PropTypes from "prop-types";
import Select from "react-select";
import { customStyles } from "../../../components/ReactSelectStyles";
import {
  createManagementPaymentDetails,
  getManagementPaymentDetailsById,
  postDirectorAccountDetails,
  updateDirectorAccountDetails,
  updateManagementPaymentDetails,
} from "../../../api/apiMethods";
import SuccessPopup from "../../popups/SuccessPopup";
import ErrorPopup from "../../popups/ErrorPopup";

const AddPaymentGatewayPopup = ({
  show,
  onHide,
  data,
  getDirectorAccountData,
  editMode,
  setEditMode,
  editData,
  countries,
  managementPaymentEdit,
  setManagementPaymentEdit,
  fetchManagementPaymentDetails,
  managementPaymentEditId,
  setManagementPaymentEditId,
}) => {
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
  const [manPaymentData, setManPaymentData] = useState([]);
  const role_code = localStorage.getItem("role_code");
  console.log(paymentMethod, "paymentMethod");

  console.log(managementPaymentEdit, "setManagementPaymentEdit");

  // Reset form when modal is closed
  useEffect(() => {
    if (!show) {
      reset();
    }
  }, [show]);

  // Initialize form data when in edit mode
  useEffect(() => {
    if (editMode && editData) {
      console.log("Editing data:", editData); // Debug log
      setPaymentMethod(editData.gateway_type.toString());
      setProvider(editData.upi_provider || "");
      setUpiID(editData.upi_provider_id || "");
      setAccountNumber(editData.bank_acc_no || "");
      setBankIFSC(editData.bank_ifsc || "");
      setBankName(editData.bank_name || "");
      setCountry(editData.country?.toString() || "");
    }
  }, [editMode, editData]);

  const paymentMethodOptions = [
    { value: "1", label: "NEFT/RTGS" },
    { value: "2", label: "UPI" },
    { value: "3", label: "QR Code" },
  ];

  const upiProviderOptions = [
    { value: 1, label: "Google Pay" },
    { value: 2, label: "PhonePe" },
    { value: 3, label: "Paytm" },
  ];

  const cOptions = data?.map((item) => ({
    value: item?.id.toString(),
    label: item?.name,
  }));

  const getSelectedPaymentMethod = () => {
    const selected = paymentMethodOptions.find(
      (option) => option.value === paymentMethod
    );
    return selected || null;
  };

  const handleQrCodeChange = (e) => {
    setQrCode(e.target.files[0]);
  };

  const handleSubmit = async () => {
    // Validation
    if (paymentMethod === "2") {
      if (!provider || !upiID || !country) {
        alert("Please fill in all fields before submitting.");
        return;
      }
    } else if (paymentMethod === "3") {
      if (!bankName || (!qrCode && !editMode)) {
        alert("Please fill in all fields before submitting.");
        return;
      }
    } else {
      if (!accountNumber || !bankIFSC || !bankName || !country) {
        alert("Please fill in all fields before submitting.");
        return;
      }
    }

    try {
      if (editMode) {
        await updateDetails();
      } else {
        await addDirectorAccountDetails();
      }
      onHide();
    } catch (err) {
      setError(err?.message || "Error adding payment details");
      console.error("Error submitting form:", err);
    }
  };

  const updateDetails = async () => {
    const formData = new FormData();
    formData.append("gateway_type", parseInt(paymentMethod));
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
      if (qrCode) {
        formData.append("qr_code_image", qrCode);
      }
      formData.append("bank_name", bankName);
    }

    try {
      await updateDirectorAccountDetails(editData.id, formData);
      setSuccessPopupOpen(true);
      setTimeout(() => {
        setSuccessPopupOpen(false);
      }, 5000);
      getDirectorAccountData();
      setEditMode(false);
    } catch (error) {
      console.log(error);
      setError(error?.message || "Error updating payment details");
      setErrorPopupOpen(true);
    }
  };

  const addDirectorAccountDetails = async () => {
    const formData = new FormData();
    formData.append("gateway_type", parseInt(paymentMethod));
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
      formData.append("qr_code_image", qrCode);
      formData.append("bank_name", bankName);
    }

    try {
      await postDirectorAccountDetails(formData);
      setSuccessPopupOpen(true);
      setTimeout(() => {
        setSuccessPopupOpen(false);
      }, 5000);
      getDirectorAccountData();
    } catch (error) {
      setError(error?.message || "Error adding payment details");
      setErrorPopupOpen(true);
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

  // managemnet paymnet details edit and post get apis ============================
  const fetchManagementPaymentDetailsById = () => {
    getManagementPaymentDetailsById(managementPaymentEditId)
      .then((response) => {
        console.log("response", response);
        if (response.status === true) {
          setManPaymentData(response?.data);
          console.log(response.data, "success");
        }
      })
      .catch((error) => {
        setError(error?.message);
        console.log(error?.message, "errorr");
      });
  };

  useEffect(() => {
    if (managementPaymentEditId) {
      fetchManagementPaymentDetailsById();
    }
  }, [managementPaymentEditId]);

  // add
  const handleManagementPaymentAddEdit = async () => {
    const formData = new FormData();
    formData.append("gateway_type", parseInt(paymentMethod));

    if (paymentMethod === "1") {
      formData.append(
        "bank_acc_no",
        accountNumber || manPaymentData?.bank_acc_no
      );
      formData.append("bank_ifsc", bankIFSC || manPaymentData?.bank_ifsc);
      formData.append("bank_name", bankName || manPaymentData?.bank_name);
      formData.append("country", country);
    } else if (paymentMethod === "2") {
      formData.append("upi_provider", provider || manPaymentData?.upi_provider);
      formData.append(
        "upi_provider_id",
        upiID || manPaymentData?.upi_provider_id
      );
      formData.append("country", country);
    } else if (paymentMethod === "3") {
      formData.append("qr_code_image", qrCode);
      formData.append("bank_name", bankName || manPaymentData?.bank_name);
    }
    console.log(formData, "formDataa");
    try {
      const response = managementPaymentEdit
        ? await updateManagementPaymentDetails(
            managementPaymentEditId,
            formData
          )
        : await createManagementPaymentDetails(formData);
      if (response.status === true) {
        console.log(response, "handleManagementPaymentAddEdit");
        onHide();
        fetchManagementPaymentDetails();
        setSuccessPopupOpen(true);
        setTimeout(() => {
          setSuccessPopupOpen(false);
        }, 5000);
      }
    } catch (error) {
      setError(error?.message);
      console.log(error?.message, "errorr");
    }
  };

  // managemnet paymnet details edit and post get apis ============================

  return (
    <>
      <Modal centered show={show} onHide={onHide} size="md">
        <Modal.Body className="p-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="medium-font fw-600">
              {role_code === "management"
                ? managementPaymentEdit
                  ? "Edit Managemnt Payment Gateway"
                  : "Add Managemnt Payment Gateway"
                : editMode
                ? "Edit Payment Gateway"
                : "Add Payment Gateway"}
            </h5>
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
                value={getSelectedPaymentMethod()}
                onChange={(selected) => setPaymentMethod(selected.value)}
                isDisabled={editMode} // Disable in edit mode
              />
            </div>

            {paymentMethod === "2" && (
              <>
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
                    // value={getSelectedProvider()}
                    value={
                      upiProviderOptions.find(
                        (option) =>
                          option.value ===
                          (provider || manPaymentData?.upi_provider)
                      ) || null
                    }
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
                    value={upiID || manPaymentData?.upi_provider_id}
                    onChange={(e) => setUpiID(e.target.value)}
                  />
                </div>
              </>
            )}

            {paymentMethod === "3" && (
              <>
                <div className="col-4">
                  <label htmlFor="bankName" className="small-font mb-1">
                    Bank Name
                  </label>
                  <input
                    id="bankName"
                    type="text"
                    className="w-100 small-font rounded input-css all-none"
                    placeholder="Enter"
                    value={bankName || manPaymentData?.bank_name}
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
                      <span className="small-font">
                        {qrCode ? qrCode.name : "Upload"}
                      </span>
                      <AiOutlineCloudUpload size={20} />
                    </label>
                  </div>
                </div>
              </>
            )}

            {paymentMethod === "1" && (
              <>
                <div className="col-4">
                  <label htmlFor="accountNumber" className="small-font mb-1">
                    Bank Account Number
                  </label>
                  <input
                    id="accountNumber"
                    type="text"
                    className="w-100 small-font rounded input-css all-none"
                    placeholder="Enter"
                    value={accountNumber || manPaymentData?.bank_acc_no}
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
                    value={bankIFSC || manPaymentData?.bank_ifsc}
                    onChange={(e) => setBankIFSC(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>

          {(paymentMethod === "1" || paymentMethod === "2") && (
            <div className="row d-flex align-items-end">
              {paymentMethod === "1" && (
                <div className="col-4">
                  <label htmlFor="bankName" className="small-font mb-1">
                    Bank Name
                  </label>
                  <input
                    id="bankName"
                    type="text"
                    className="w-100 small-font rounded input-css all-none"
                    placeholder="Enter"
                    value={bankName || manPaymentData?.bank_name}
                    onChange={(e) => setBankName(e.target.value)}
                  />
                </div>
              )}

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
                  // value={getSelectedCountry()}
                  value={cOptions.find(
                    (item) => item.value === (country || manPaymentData?.country?.toString()) 
                  ) || null}
                  onChange={(selected) =>
                    setCountry(selected ? selected.value : "")
                  }
                />
              </div>

              <div
                className={`col-4 ${paymentMethod === "3" ? "offset-8" : ""}`}
              >
                <button
                  type="button"
                  className="w-100 saffron-btn rounded small-font"
                  onClick={
                    role_code === "management"
                      ? handleManagementPaymentAddEdit
                      : handleSubmit
                  }
                >
                  {role_code === "management"
                    ? managementPaymentEdit
                      ? "Update"
                      : "Submit"
                    : editMode
                    ? "Update"
                    : "Submit"}
                </button>
              </div>
            </div>
          )}

          {paymentMethod === "3" && (
            <div className="row d-flex mt-3 justify-content-end">
              <div className="col-4">
                <button
                  type="button"
                  className="w-100 saffron-btn rounded small-font"
                  onClick={
                    role_code === "management"
                      ? handleManagementPaymentAddEdit
                      : handleSubmit
                  }
                >
                  {role_code === "management"
                    ? managementPaymentEdit
                      ? "Update"
                      : "Submit"
                    : editMode
                    ? "Update"
                    : "Submit"}
                </button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      <SuccessPopup
        successPopupOpen={successPopupOpen}
        setSuccessPopupOpen={setSuccessPopupOpen}
        discription={editMode ? "Successfully updated!" : "Successfully added!"}
      />
      <ErrorPopup
        errorPopupOpen={errorPopupOpen}
        setErrorPopupOpen={setErrorPopupOpen}
        discription={error}
      />
    </>
  );
};

AddPaymentGatewayPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default AddPaymentGatewayPopup;
