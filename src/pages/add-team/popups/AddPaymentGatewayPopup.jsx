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
  addpaymentId,
  setAddPaymentId,
  countryId,
  setCountryId,
  availablePaymentModeId,
  setAvailablePaymentModeId,
  managementPaymentEdit,
  setManagementPaymentEdit,
  fetchManagementPaymentDetails,
  managementPaymentEditId,
  setManagementPaymentEditId,
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
  const [manPaymentData, setManPaymentData] = useState([]);
  const role_code = localStorage.getItem("role_code");
  const [details, setDetails] = useState("");
  const [accHolderName, setAccHolderName] = useState("");
  const handleQrCodeChange = (e) => {
    setQrCode(e.target.files[0]);
  };

  // managemnet paymnet details edit and post get apis ============================

  const fetchManagementPaymentDetailsById = () => {
    getManagementPaymentDetailsById(managementPaymentEditId)
      .then((response) => {
        console.log("response", response);
        if (response.status === true) {
          setManPaymentData(response?.data);
          setAccHolderName(response?.data?.acc_hold_name || "");
          setAccountNumber(response?.data?.bank_acc_no || "");
          setBankIFSC(response?.data?.bank_ifsc || "");
          setBankName(response?.data?.bank_name || "");
          setUpiID(response?.data?.upi_id || "");
          setDetails(response?.data?.others_details || "");
          setQrCode(response?.data?.qr_code_image || null);
          console.log(response?.data?.gateway_type, "success");
        }
      })
      .catch((error) => {
        setError(error?.message);
        console.log(error?.message, "errorr");
      });
  };

  useEffect(() => {
    if (managementPaymentEditId && managementPaymentEdit) {
      fetchManagementPaymentDetailsById();
    }
  }, [managementPaymentEditId && managementPaymentEdit]);

  const handleManagementPaymentAddEdit = async () => {
    const pay_id = managementPaymentEditId
      ? manPaymentData?.id
      : addpaymentId.slice(3, -3);
    const requestData = {
      payment_mode_id: Number(pay_id),
      acc_hold_name: accHolderName,
    };

    if (availablePaymentModeId === 1) {
      requestData.bank_acc_no = accountNumber;
      requestData.bank_ifsc = bankIFSC;
      requestData.bank_name = bankName;
    } else if (availablePaymentModeId === 2) {
      requestData.upi_id = upiID;
    } else if (availablePaymentModeId === 3) {
      requestData.bank_name = bankName;
    } else if (availablePaymentModeId === 4) {
      requestData.details = details;
    }

    const formData = new FormData();
    formData.append("body", JSON.stringify(requestData));

    if (availablePaymentModeId === 3 && qrCode) {
      formData.append("qr_code_image", qrCode);
    }

    try {
      const response = managementPaymentEdit
        ? await updateManagementPaymentDetails(manPaymentData?.id, formData)
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
  console.log(availablePaymentModeId, "===>availablePaymentModeId");
  return (
    <>
      <Modal centered show={show} onHide={onHide} size="md">
        <Modal.Body className="p-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="medium-font fw-600">
              {managementPaymentEdit ? "Edit" : "Add"} Managemnt Payment Gateway
            </h5>
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
                onChange={(e) => setAccHolderName(e.target.value)}
              />
            </div>
            {availablePaymentModeId === 1 && (
              <>
                <div className="col-6">
                  <label className="small-font mb-1">Bank Account Number</label>
                  <input
                    type="text"
                    className="w-100 small-font rounded input-css all-none"
                    placeholder="Enter"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                </div>

                <div className="col-6">
                  <label className="small-font mb-1">Bank IFSC</label>
                  <input
                    type="text"
                    className="w-100 small-font rounded input-css all-none"
                    placeholder="Enter"
                    value={bankIFSC}
                    onChange={(e) => setBankIFSC(e.target.value)}
                  />
                </div>

                <div className="col-6">
                  <label className="small-font mb-1">Bank Name</label>
                  <input
                    type="text"
                    className="w-100 small-font rounded input-css all-none"
                    placeholder="Enter"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                  />
                </div>
              </>
            )}

            {availablePaymentModeId === 2 && (
              <>
                <div className="col-6">
                  <label className="small-font mb-1">UPI ID</label>
                  <input
                    type="text"
                    className="w-100 small-font rounded input-css all-none"
                    placeholder="Enter"
                    value={upiID}
                    onChange={(e) => setUpiID(e.target.value)}
                  />
                </div>
              </>
            )}

            {availablePaymentModeId === 3 && (
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
                        {qrCode ? qrCode.name : "Upload"}
                      </span>
                      <AiOutlineCloudUpload size={20} />
                    </label>
                  </div>
                </div>
              </>
            )}

            {availablePaymentModeId === 4 && (
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
              </>
            )}
          </div>

          <div className="row d-flex mt-3 justify-content-end">
            <div className="col-6">
              <button
                type="button"
                className="w-100 saffron-btn rounded small-font"
                onClick={handleManagementPaymentAddEdit}
              >
                {managementPaymentEdit ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <SuccessPopup
        successPopupOpen={successPopupOpen}
        setSuccessPopupOpen={setSuccessPopupOpen}
        discription={
          managementPaymentEdit
            ? "Successfully updated!"
            : "Successfully added!"
        }
      />
      <ErrorPopup
        errorPopupOpen={errorPopupOpen}
        setErrorPopupOpen={setErrorPopupOpen}
        discription={error}
      />
    </>
  );
};

export default AddPaymentGatewayPopup;
