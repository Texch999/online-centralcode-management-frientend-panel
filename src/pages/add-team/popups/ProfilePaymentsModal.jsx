import React, { useEffect, useState } from "react";
import ErrorPopup from "../../popups/ErrorPopup";
import SuccessPopup from "../../popups/SuccessPopup";
import {
  getDirPayDetailsByIdProfile,
  UpdateProfileDirpaymentDetailsByMan,
} from "../../../api/apiMethods";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import { AiOutlineCloudUpload } from "react-icons/ai";

const ProfilePaymentsModal = ({
  show,
  onHide,
  manDirProfileId,
  setManDirProfileId,
  dirPaymentGatewayProfileId,
  setDirPaymentGatewayProfileId,
  countryId,
  getDirPaymentDetails,
}) => {
  const [upiID, setUpiID] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankIFSC, setBankIFSC] = useState("");
  const [bankName, setBankName] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const role_code = localStorage.getItem("role_code");
  const [details, setDetails] = useState("");
  const [accHolderName, setAccHolderName] = useState("");
  const [qrName, setQrName] = useState("");
  const handleQrCodeChange = (e) => {
    const file = e.target.files[0];
    setQrCode(file);
    setQrName(file?.name);
  };
  const [validationErrors, setValidationErrors] = useState({});
  const [msg, setMsg] = useState("");

  const fetchProfilePaymentDetailsById = () => {
    getDirPayDetailsByIdProfile(manDirProfileId)
      .then((response) => {
        if (response.status === true) {
          setAccHolderName(response?.data?.acc_hold_name || "");
          setAccountNumber(response?.data?.bank_acc_no || "");
          setBankIFSC(response?.data?.bank_ifsc || "");
          setBankName(response?.data?.bank_name || "");
          setUpiID(response?.data?.upi_id || "");
          setDetails(response?.data?.others_details || "");
          setQrCode(response?.data?.qr_code_image || null);
          setQrName(response?.data?.qr_code_image || "");
        }
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  useEffect(() => {
    if (role_code === "management") {
      fetchProfilePaymentDetailsById();
    }
  }, [manDirProfileId]);

  const ManEditProfilePayments = async () => {
    let errors = {};

    if (!accHolderName.trim()) {
      errors.accHolderName = "Account Holder Name is required.";
    } else if (!/^[a-zA-Z0-9 ]*$/.test(accHolderName)) {
      errors.accHolderName =
        "Account Holder Name can only contain letters, numbers, and spaces.";
    }

    if (dirPaymentGatewayProfileId === 1) {
      if (!accountNumber.trim()) {
        errors.accountNumber = "Bank Account Number is required.";
      } else if (!/^\d{8,34}$/.test(accountNumber)) {
        errors.accountNumber = "Bank Account Number must be 8-34 digits long.";
      }
      if (!bankIFSC.trim()) {
        errors.bankIFSC = "Bank IFSC is required.";
      } else if (!/^[A-Za-z0-9]{11,15}$/.test(bankIFSC)) {
        errors.bankIFSC = "Bank IFSC must be 11-15 characters.";
      }

      if (!bankName.trim()) {
        errors.bankName = "Bank Name is required.";
      } else if (!/^[a-zA-Z0-9 ]*$/.test(bankName)) {
        errors.bankName =
          "Bank Name can only contain letters, numbers, and spaces.";
      }
    } else if (dirPaymentGatewayProfileId === 2) {
      if (!upiID.trim()) {
        errors.upiID = "UPI ID is required.";
      } else if (!/^[a-zA-Z0-9@]*$/.test(upiID)) {
        errors.upiID = "UPI ID can only contain letters, numbers, and '@'.";
      }
    } else if (dirPaymentGatewayProfileId === 3) {
      if (!bankName.trim()) {
        errors.bankName = "Bank Name is required.";
      } else if (!/^[a-zA-Z0-9 ]*$/.test(bankName)) {
        errors.bankName =
          "Bank Name can only contain letters, numbers, and spaces.";
      }
      if (!qrCode) errors.qrCode = "QR Code Image is required.";
    } else if (dirPaymentGatewayProfileId === 4) {
      if (!details.trim()) {
        errors.details = "Details are required.";
      } else if (!/^[a-zA-Z0-9 ]*$/.test(details)) {
        errors.details =
          "Details can only contain letters, numbers, and spaces.";
      }
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});
    const off_id = manDirProfileId.slice(3,-3)
    const formData = new FormData();
    formData.append("offlinmods_id", off_id);
    formData.append("gateway_type", dirPaymentGatewayProfileId);
    formData.append("currency_id", countryId);
    formData.append("acc_hold_name", accHolderName);

    if (dirPaymentGatewayProfileId === 1) {
      formData.append("bank_acc_no", accountNumber);
      formData.append("bank_ifsc", bankIFSC);
      formData.append("bank_name", bankName);
    } else if (dirPaymentGatewayProfileId === 2) {
      formData.append("upi_id", upiID);
    } else if (dirPaymentGatewayProfileId === 3) {
      formData.append("bank_name", bankName);
    } else if (dirPaymentGatewayProfileId === 4) {
      formData.append("others_details", details);
    }

    if (dirPaymentGatewayProfileId === 3 && qrCode) {
      formData.append("qr_code_image", qrCode);
    }

    try {
      const response = await UpdateProfileDirpaymentDetailsByMan(
        manDirProfileId,
        formData
      );

      if (response.status === true) {
        setMsg(response?.message);
        onHide();
        getDirPaymentDetails();
        setSuccessPopupOpen(true);
        setTimeout(() => {
          setSuccessPopupOpen(false);
        }, 2000);
      }
    } catch (error) {
      setError(error?.message);
      setErrorPopupOpen(true);
      setTimeout(() => {
        setErrorPopupOpen(false);
      });
    }
  };

  return (
    <>
      <Modal centered show={show} onHide={onHide} size="md">
        <Modal.Body className="p-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="medium-font fw-600">Edit Payment Gateway</h5>
            <MdOutlineClose size={22} onClick={onHide} className="pointer" />
          </div>

          <div className="row mb-3">
            <div className="col-6">
              <label className="small-font mb-1">Account Holder Name</label>
              <input
                type="text"
                className="w-100 small-font rounded input-css all-none"
                placeholder="Enter"
                value={accHolderName}
                onChange={(e) => {
                  setAccHolderName(e.target.value);
                  setValidationErrors((prev) => ({
                    ...prev,
                    accHolderName: "",
                  }));
                }}
              />
              {validationErrors.accHolderName && (
                <p className="text-danger small-font">
                  {validationErrors.accHolderName}
                </p>
              )}
            </div>
            {dirPaymentGatewayProfileId === 1 && (
              <>
                <div className="col-6">
                  <label className="small-font mb-1">Bank Account Number</label>
                  <input
                    type="text"
                    className="w-100 small-font rounded input-css all-none"
                    placeholder="Enter"
                    value={accountNumber}
                    onChange={(e) => {
                      setAccountNumber(e.target.value);
                      setValidationErrors((prev) => ({
                        ...prev,
                        accountNumber: "",
                      }));
                    }}
                  />
                  {validationErrors.accountNumber && (
                    <p className="text-danger small-font">
                      {validationErrors.accountNumber}
                    </p>
                  )}
                </div>

                <div className="col-6">
                  <label className="small-font mb-1">Bank IFSC</label>
                  <input
                    type="text"
                    className="w-100 small-font rounded input-css all-none"
                    placeholder="Enter"
                    value={bankIFSC}
                    onChange={(e) => {
                      setBankIFSC(e.target.value);
                      setValidationErrors((prev) => ({
                        ...prev,
                        bankIFSC: "",
                      }));
                    }}
                  />
                  {validationErrors.bankIFSC && (
                    <p className="text-danger small-font">
                      {validationErrors.bankIFSC}
                    </p>
                  )}
                </div>

                <div className="col-6">
                  <label className="small-font mb-1">Bank Name</label>
                  <input
                    type="text"
                    className="w-100 small-font rounded input-css all-none"
                    placeholder="Enter"
                    value={bankName}
                    onChange={(e) => {
                      setBankName(e.target.value);
                      setValidationErrors((prev) => ({
                        ...prev,
                        bankIFSC: "",
                      }));
                    }}
                  />
                  {validationErrors.bankName && (
                    <p className="text-danger small-font">
                      {validationErrors.bankName}
                    </p>
                  )}
                </div>
              </>
            )}

            {dirPaymentGatewayProfileId === 2 && (
              <>
                <div className="col-6">
                  <label className="small-font mb-1">UPI ID</label>
                  <input
                    type="text"
                    className="w-100 small-font rounded input-css all-none"
                    placeholder="Enter"
                    value={upiID}
                    onChange={(e) => {
                      setUpiID(e.target.value);
                    }}
                  />
                  {validationErrors.upiID && (
                    <p className="text-danger small-font">
                      {validationErrors.upiID}
                    </p>
                  )}
                </div>
              </>
            )}

            {dirPaymentGatewayProfileId === 3 && (
              <>
                <div className="col-6">
                  <label className="small-font mb-1">Bank Name</label>
                  <input
                    type="text"
                    className="w-100 small-font rounded input-css all-none"
                    placeholder="Enter"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                  />
                  {validationErrors.bankName && (
                    <p className="text-danger small-font">
                      {validationErrors.bankName}
                    </p>
                  )}
                </div>

                <div className="col-6">
                  <label htmlFor="qrCode" className="small-font mb-1">
                    Upload QR Code
                  </label>
                  <div className="input-group">
                    <input
                      id="qrCode"
                      type="file"
                      accept="image/*"
                      className="w-100 small-font rounded input-css all-none"
                      onChange={handleQrCodeChange}
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="qrCode"
                      className="upload-input-popup btn d-flex justify-content-between align-items-center rounded w-100 pointer"
                    >
                      <span className="small-font">
                        {qrCode ? qrName : "Upload"}
                      </span>
                      <AiOutlineCloudUpload size={20} />
                    </label>
                  </div>
                  {validationErrors.qrCode && (
                    <p className="text-danger small-font">
                      {validationErrors.qrCode}
                    </p>
                  )}
                </div>
              </>
            )}

            {dirPaymentGatewayProfileId === 4 && (
              <>
                <div className="col-12 my-2">
                  <label className="small-font mb-1">Details</label>
                  <textarea
                    type="text"
                    rows={6}
                    className="w-100 small-font rounded input-css
                  all-none"
                    placeholder="Enter"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                  ></textarea>
                </div>
                {validationErrors.details && (
                  <p className="text-danger small-font">
                    {validationErrors.details}
                  </p>
                )}
              </>
            )}
          </div>

          <div className="row d-flex mt-3 justify-content-end">
            <div className="col-6">
              <button
                type="button"
                className="w-100 saffron-btn rounded small-font"
                onClick={ManEditProfilePayments}
              >
                Update
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <SuccessPopup
        successPopupOpen={successPopupOpen}
        setSuccessPopupOpen={setSuccessPopupOpen}
        discription={msg}
      />
      <ErrorPopup
        errorPopupOpen={errorPopupOpen}
        setErrorPopupOpen={setErrorPopupOpen}
        discription={error}
      />
    </>
  );
};

export default ProfilePaymentsModal;
