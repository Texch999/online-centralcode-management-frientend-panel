// import React, { useEffect, useState } from "react";
// import { Modal, Spinner } from "react-bootstrap";
// import { MdOutlineClose } from "react-icons/md";
// import { AiOutlineCloudUpload } from "react-icons/ai";
// import {
//   createManagementPaymentDetails,
//   getDirectorAccountById,
//   getManagementPaymentDetailsById,
//   postDirectorAccountDetails,
//   updateDirectorAccountDetails,
//   updateManagementPaymentDetails,
// } from "../../../api/apiMethods";
// import ErrorPopup from "../../popups/ErrorPopup";
// import ErrorComponent from "../../../components/ErrorComponent";
// import { useSearchParams } from "react-router-dom";
// import SuccessPopup from "../../popups/SuccessPopup";

// const AddPaymentGatewayPopup = ({
//   show,
//   setOnAddPaymentGateway,
//   managementPaymentEdit,
//   managementPaymentEditId,
//   setManagementPaymentEditId,
//   availablePaymentModeId,
//   countryId,
//   dirEditId,
//   getDirectorAccountData,
//   addpaymentId,
//   setDiscription,
//   setSuccessPopupOpen

// }) => {
//   const [upiID, setUpiID] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [bankIFSC, setBankIFSC] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [country, setCountry] = useState("");
//   const [error, setError] = useState("");
//   const [errorPopupOpen, setErrorPopupOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(false);
//   const [qrCode, setQrCode] = useState(null);
//   const [manPaymentData, setManPaymentData] = useState([]);
//   const role_code = localStorage.getItem("role_code");
//   const [details, setDetails] = useState("");
//   const [accHolderName, setAccHolderName] = useState("");
//   const [msg, setMsg] = useState("");
//   const [qrName, setQrName] = useState("");
//   const [searchParams] = useSearchParams();
//   const pages = parseInt(searchParams.get("page") || 1);
//   const [validationErrors, setValidationErrors] = useState({});
//   const [description, setDescription] = useState("")

//   // Reset all form fields
//   const resetFields = () => {
//     setUpiID("");
//     setAccountNumber("");
//     setBankIFSC("");
//     setBankName("");
//     setCountry("");
//     setAccHolderName("");
//     setDetails("");
//     setQrCode(null);
//     setQrName("");
//     setValidationErrors({});
//     // setMsg("");
//   };

//   const onHide = () => {
//     if (setManagementPaymentEditId) {
//       setManagementPaymentEditId(null);
//     }
//     resetFields();
//     setManagementPaymentEditId(null);
//   };

//   // const [updateId, setUpdateId] = useState(null);
//   const fetchManagementPaymentDetailsById = () => {
//     setInitialLoading(true);
//     getManagementPaymentDetailsById(managementPaymentEditId)
//       .then((response) => {
//         if (response.status === true) {
//           setManPaymentData(response?.data);
//           setUpdateId(response?.data?.payment_mode_id);
//           setAccHolderName(response?.data?.acc_hold_name || "");
//           setAccountNumber(response?.data?.bank_acc_no || "");
//           setBankIFSC(response?.data?.bank_ifsc || "");
//           setBankName(response?.data?.bank_name || "");
//           setUpiID(response?.data?.upi_id || "");
//           setDetails(response?.data?.others_details || "");
//           setQrCode(response?.data?.qr_code_image || null);
//           setQrName(response?.data?.qr_code_image || "");
//         }
//         setInitialLoading(false);
//       })
//       .catch((error) => {
//         setInitialLoading(false);
//         setError(error?.message);
//       });
//     setOnAddPaymentGateway(false);
//   };

//   const [updateId, setUpdateId] = useState(null);

//   // Handle QR code upload
//   const handleQrCodeChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setQrCode(file);
//       setQrName(file.name);
//       setValidationErrors((prev) => ({ ...prev, qrCode: "" }));
//     }
//   };

//   // Account Holder Name validation
//   const handleAccHolderNameChange = (e) => {
//     const value = e.target.value.replace(/[^a-zA-Z ]/g, "").slice(0, 100);
//     setAccHolderName(value);

//     if (value.length < 4 && value.length > 0) {
//       setValidationErrors((prev) => ({
//         ...prev,
//         accHolderName: "Must be at least 4 characters",
//       }));
//     } else if (value.length === 0) {
//       setValidationErrors((prev) => ({
//         ...prev,
//         accHolderName: "Account Holder Name is required",
//       }));
//     } else {
//       setValidationErrors((prev) => ({ ...prev, accHolderName: "" }));
//     }
//   };

//   // Bank Account Number validation
//   const handleAccountNumberChange = (e) => {
//     const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 34);
//     setAccountNumber(value);

//     if (value.length < 8 && value.length > 0) {
//       setValidationErrors((prev) => ({
//         ...prev,
//         accountNumber: "Must be 8-34 digits",
//       }));
//     } else if (value.length === 0) {
//       setValidationErrors((prev) => ({
//         ...prev,
//         accountNumber: "Account Number is required",
//       }));
//     } else {
//       setValidationErrors((prev) => ({ ...prev, accountNumber: "" }));
//     }
//   };

//   // Bank IFSC validation
//   const handleBankIFSCChange = (e) => {
//     const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 15);
//     setBankIFSC(value.toUpperCase());

//     if (value.length < 11 && value.length > 0) {
//       setValidationErrors((prev) => ({
//         ...prev,
//         bankIFSC: "Must be 11-15 characters",
//       }));
//     } else if (value.length === 0) {
//       setValidationErrors((prev) => ({
//         ...prev,
//         bankIFSC: "IFSC is required",
//       }));
//     } else {
//       setValidationErrors((prev) => ({ ...prev, bankIFSC: "" }));
//     }
//   };

//   // Bank Name validation
//   const handleBankNameChange = (e) => {
//     const value = e.target.value.replace(/[^a-zA-Z ]/g, "").slice(0, 150);
//     setBankName(value);

//     if (value.length < 2 && value.length > 0) {
//       setValidationErrors((prev) => ({
//         ...prev,
//         bankName: "Must be at least 2 characters",
//       }));
//     } else if (value.length === 0) {
//       setValidationErrors((prev) => ({
//         ...prev,
//         bankName: "Bank Name is required",
//       }));
//     } else {
//       setValidationErrors((prev) => ({ ...prev, bankName: "" }));
//     }
//   };

//   // UPI ID validation
//   const handleUpiIDChange = (e) => {
//     const value = e.target.value.replace(/[^a-zA-Z0-9@.]/g, "").slice(0, 50);
//     setUpiID(value.toLowerCase());

//     if (value.length < 3 && value.length > 0) {
//       setValidationErrors((prev) => ({
//         ...prev,
//         upiID: "Must be at least 3 characters",
//       }));
//     } else if (value.length === 0) {
//       setValidationErrors((prev) => ({
//         ...prev,
//         upiID: "UPI ID is required",
//       }));
//     } else {
//       setValidationErrors((prev) => ({ ...prev, upiID: "" }));
//     }
//   };

//   // Details validation
//   const handleDetailsChange = (e) => {
//     const value = e.target.value.slice(0, 250);
//     setDetails(value);

//     if (value.length === 0) {
//       setValidationErrors((prev) => ({
//         ...prev,
//         details: "Details are required",
//       }));
//     } else {
//       setValidationErrors((prev) => ({ ...prev, details: "" }));
//     }
//   };

//   // Fetch payment details when in edit mode
//   useEffect(() => {
//     const fetchManagementPaymentDetailsById = async () => {
//       setInitialLoading(true);
//       try {
//         const response = await getManagementPaymentDetailsById(
//           managementPaymentEditId
//         );
//         if (response.status === true) {
//           setManPaymentData(response.data);
//           setUpdateId(response.data?.payment_mode_id);
//           setAccHolderName(response.data?.acc_hold_name || "");
//           setAccountNumber(response.data?.bank_acc_no || "");
//           setBankIFSC(response.data?.bank_ifsc || "");
//           setBankName(response.data?.bank_name || "");
//           setUpiID(response.data?.upi_id || "");
//           setDetails(response.data?.others_details || "");
//           setQrCode(response.data?.qr_code_image || null);
//           setQrName(response.data?.qr_code_image || "");
//         }
//       } catch (error) {
//         setError(error?.message);
//       } finally {
//         setInitialLoading(false);
//       }
//     };

//     if (managementPaymentEditId && managementPaymentEdit) {
//       fetchManagementPaymentDetailsById();
//     }
//   }, [managementPaymentEditId, managementPaymentEdit]);

//   // Handle form submission for management payments
//   const handleManagementPayments = async () => {
//     // Final validation check
//     let errors = {};

//     if (!accHolderName.trim())
//       errors.accHolderName = "Account Holder Name is required";
//     if (availablePaymentModeId === 1) {
//       if (!accountNumber.trim())
//         errors.accountNumber = "Account Number is required";
//       if (!bankIFSC.trim()) errors.bankIFSC = "IFSC is required";
//       if (!bankName.trim()) errors.bankName = "Bank Name is required";
//     } else if (availablePaymentModeId === 2) {
//       if (!upiID.trim()) errors.upiID = "UPI ID is required";
//     } else if (availablePaymentModeId === 3) {
//       if (!bankName.trim()) errors.bankName = "Bank Name is required";
//       if (!qrCode) errors.qrCode = "QR Code is required";
//     } else if (availablePaymentModeId === 4) {
//       if (!details.trim()) errors.details = "Details are required";
//     }

//     if (Object.keys(errors).length > 0) {
//       setValidationErrors(errors);
//       return;
//     }

//     // Prepare request data
//     const pay_id = updateId ? manPaymentData?.id : addpaymentId.slice(3, -3);
//     const requestData = {
//       payment_mode_id: Number(pay_id),
//       acc_hold_name: accHolderName,
//     };

//     if (availablePaymentModeId === 1) {
//       requestData.bank_acc_no = accountNumber;
//       requestData.bank_ifsc = bankIFSC;
//       requestData.bank_name = bankName;
//     } else if (availablePaymentModeId === 2) {
//       requestData.upi_id = upiID;
//     } else if (availablePaymentModeId === 3) {
//       requestData.bank_name = bankName;
//     } else if (availablePaymentModeId === 4) {
//       requestData.details = details;
//     }

//     const formData = new FormData();
//     formData.append("body", JSON.stringify(requestData));
//     if (availablePaymentModeId === 3 && qrCode) {
//       formData.append("qr_code_image", qrCode);
//     }

//     try {
//       setLoading(true);
//       const response = managementPaymentEdit
//         ? await updateManagementPaymentDetails(manPaymentData?.id, formData)
//         : await createManagementPaymentDetails(formData);

//       setSuccessPopupOpen(true);
//       setDiscription(response?.message);
//       setMsg(response?.message)
//       resetFields();
//       setOnAddPaymentGateway(false);
//       if (setManagementPaymentEditId) setManagementPaymentEditId(null);
//     } catch (error) {
//       setError(error?.message);
//       // setErrorPopupOpen(true);
//     } finally {
//       setLoading(false);
//       setError(error?.message);
//     }
//   };

//   const [dirPaymentDataById, setDirPaymentDataById] = useState(null);
//   console.log(dirPaymentDataById, "setDirPaymentDataById");
//   const [dirUpdateId, setDirUpdateId] = useState(null);
//   const fetchDirectorPaymentDetailsById = () => {
//     getDirectorAccountById(dirEditId)
//       .then((response) => {
//         if (response.status === true) {
//           setDirPaymentDataById(response?.data?.id);
//           setDirUpdateId(response?.data?.offlinmods_id);
//           setAccHolderName(response?.data?.acc_hold_name || "");
//           setAccountNumber(response?.data?.bank_acc_no || "");
//           setBankIFSC(response?.data?.bank_ifsc || "");
//           setBankName(response?.data?.bank_name || "");
//           setUpiID(response?.data?.upi_id || "");
//           setDetails(response?.data?.others_details || "");
//           setQrCode(response?.data?.qr_code_image || null);
//           setQrName(response?.data?.qr_code_image || "");
//         }
//       })
//       .catch((error) => {
//         setError(error?.message);
//       });
//   };

//   useEffect(() => {
//     if (dirEditId && managementPaymentEdit) {
//       fetchDirectorPaymentDetailsById();
//     }
//   }, [dirEditId && managementPaymentEdit]);

//   const handleDirectorPayments = async () => {
//     // Similar validation as above
//     let errors = {};

//     if (!accHolderName.trim())
//       errors.accHolderName = "Account Holder Name is required";
//     if (availablePaymentModeId === 1) {
//       if (!accountNumber.trim())
//         errors.accountNumber = "Account Number is required";
//       if (!bankIFSC.trim()) errors.bankIFSC = "IFSC is required";
//       if (!bankName.trim()) errors.bankName = "Bank Name is required";
//     } else if (availablePaymentModeId === 2) {
//       if (!upiID.trim()) errors.upiID = "UPI ID is required";
//     } else if (availablePaymentModeId === 3) {
//       if (!bankName.trim()) {
//         errors.bankName = "Bank Name is required.";
//       } else if (!/^[a-zA-Z0-9 ]*$/.test(bankName)) {
//         errors.bankName =
//           "Bank Name can only contain letters, numbers, and spaces.";
//       }
//       if (!qrCode) errors.qrCode = "QR Code Image is required.";
//     } else if (availablePaymentModeId === 4) {
//       if (!details.trim()) {
//         errors.details = "Details are required.";
//       } else if (!/^[a-zA-Z0-9 ]*$/.test(details)) {
//         errors.details =
//           "Details can only contain letters, numbers, and spaces.";
//       }
//     }

//     if (Object.keys(errors).length > 0) {
//       setValidationErrors(errors);
//       return;
//     }

//     // Prepare form data
//     const pay_id = dirEditId
//       ? dirEditId.slice(3, -3)
//       : addpaymentId.slice(3, -3);
//     const formData = new FormData();
//     formData.append("offlinmods_id", pay_id);
//     formData.append("gateway_type", availablePaymentModeId);
//     formData.append("currency_id", countryId);
//     formData.append("acc_hold_name", accHolderName);

//     if (availablePaymentModeId === 1) {
//       formData.append("bank_acc_no", accountNumber);
//       formData.append("bank_ifsc", bankIFSC);
//       formData.append("bank_name", bankName);
//     } else if (availablePaymentModeId === 2) {
//       formData.append("upi_id", upiID);
//     } else if (availablePaymentModeId === 3) {
//       formData.append("bank_name", bankName);
//     } else if (availablePaymentModeId === 4) {
//       formData.append("others_details", details);
//     }

//     if (availablePaymentModeId === 3 && qrCode) {
//       formData.append("qr_code_image", qrCode);
//     }

//     try {
//       const response = managementPaymentEdit
//         ? await updateDirectorAccountDetails(dirEditId, formData)
//         : await postDirectorAccountDetails(formData);
//       if (response.status === true) {
//         setMsg(response?.message);
//         setSuccessPopupOpen(true);
//         setTimeout(() => {
//           setSuccessPopupOpen(false);
//         }, 2000);
//         resetFields();
//         setOnAddPaymentGateway(false);
//         getDirectorAccountData();
//       }
//     } catch (error) {
//       setError(error?.message);
//       setErrorPopupOpen(true);
//     }
//   };

//   return (
//     <>
//       <Modal centered show={show} onHide={onHide} size="md">
//         {initialLoading && managementPaymentEdit && (
//           <div className="my-load">
//             <div className="loader"></div>
//           </div>
//         )}
//         <Modal.Body className="p-3">
//           <div className="d-flex justify-content-between align-items-center mb-2">
//             <h5 className="medium-font fw-600">
//               {managementPaymentEdit ? "Edit" : "Add"}{" "}
//               {role_code === "director" ? "Director" : "Management"} Payment
//               Gateway
//             </h5>
//             <MdOutlineClose size={22} onClick={onHide} className="pointer" />
//           </div>

//           {error && <ErrorComponent error={error} />}

//           <div className="row mb-3">
//             {/* Account Holder Name (always shown) */}
//             <div className="col-6">
//               <label className="small-font mb-1">Account Holder Name</label>
//               <input
//                 type="text"
//                 className={`w-100 small-font rounded input-css all-none ${
//                   validationErrors.accHolderName ? "is-invalid" : ""
//                 }`}
//                 placeholder="Enter name (4-100 chars)"
//                 value={accHolderName}
//                 onChange={handleAccHolderNameChange}
//               />
//               {validationErrors.accHolderName && (
//                 <p className="text-danger small-font">
//                   {validationErrors.accHolderName}
//                 </p>
//               )}
//             </div>

//             {/* Bank Payment Mode Fields */}
//             {availablePaymentModeId === 1 && (
//               <>
//                 <div className="col-6">
//                   <label className="small-font mb-1">Bank Account Number</label>
//                   <input
//                     type="text"
//                     className={`w-100 small-font rounded input-css all-none ${
//                       validationErrors.accountNumber ? "is-invalid" : ""
//                     }`}
//                     placeholder="Enter (8-34 digits)"
//                     value={accountNumber}
//                     onChange={handleAccountNumberChange}
//                   />
//                   {validationErrors.accountNumber && (
//                     <p className="text-danger small-font">
//                       {validationErrors.accountNumber}
//                     </p>
//                   )}
//                 </div>

//                 <div className="col-6">
//                   <label className="small-font mb-1">Bank IFSC</label>
//                   <input
//                     type="text"
//                     className={`w-100 small-font rounded input-css all-none ${
//                       validationErrors.bankIFSC ? "is-invalid" : ""
//                     }`}
//                     placeholder="Enter (11-15 chars)"
//                     value={bankIFSC}
//                     onChange={handleBankIFSCChange}
//                   />
//                   {validationErrors.bankIFSC && (
//                     <p className="text-danger small-font">
//                       {validationErrors.bankIFSC}
//                     </p>
//                   )}
//                 </div>

//                 <div className="col-6">
//                   <label className="small-font mb-1">Bank Name</label>
//                   <input
//                     type="text"
//                     className={`w-100 small-font rounded input-css all-none ${
//                       validationErrors.bankName ? "is-invalid" : ""
//                     }`}
//                     placeholder="Enter bank name (2-150 chars)"
//                     value={bankName}
//                     onChange={handleBankNameChange}
//                   />
//                   {validationErrors.bankName && (
//                     <p className="text-danger small-font">
//                       {validationErrors.bankName}
//                     </p>
//                   )}
//                 </div>
//               </>
//             )}

//             {/* UPI Payment Mode Fields */}
//             {availablePaymentModeId === 2 && (
//               <div className="col-6">
//                 <label className="small-font mb-1">UPI ID</label>
//                 <input
//                   type="text"
//                   className={`w-100 small-font rounded input-css all-none ${
//                     validationErrors.upiID ? "is-invalid" : ""
//                   }`}
//                   placeholder="Enter UPI ID (e.g., name@upi)"
//                   value={upiID}
//                   onChange={handleUpiIDChange}
//                 />
//                 {validationErrors.upiID && (
//                   <p className="text-danger small-font">
//                     {validationErrors.upiID}
//                   </p>
//                 )}
//               </div>
//             )}

//             {/* QR Code Payment Mode Fields */}
//             {availablePaymentModeId === 3 && (
//               <>
//                 <div className="col-6">
//                   <label className="small-font mb-1">Bank Name</label>
//                   <input
//                     type="text"
//                     className={`w-100 small-font rounded input-css all-none ${
//                       validationErrors.bankName ? "is-invalid" : ""
//                     }`}
//                     placeholder="Enter bank name (2-150 chars)"
//                     value={bankName}
//                     onChange={handleBankNameChange}
//                   />
//                   {validationErrors.bankName && (
//                     <p className="text-danger small-font">
//                       {validationErrors.bankName}
//                     </p>
//                   )}
//                 </div>

//                 <div className="col-6">
//                   <label htmlFor="qrCode" className="small-font mb-1">
//                     Upload QR Code
//                   </label>
//                   <div className="input-group">
//                     <input
//                       id="qrCode"
//                       type="file"
//                       accept="image/*"
//                       className={`w-100 small-font rounded input-css all-none ${
//                         validationErrors.qrCode ? "is-invalid" : ""
//                       }`}
//                       onChange={handleQrCodeChange}
//                       style={{ display: "none" }}
//                     />
//                     <label
//                       htmlFor="qrCode"
//                       className="upload-input-popup btn d-flex justify-content-between align-items-center rounded w-100 pointer"
//                     >
//                       <span className="small-font">
//                         {qrCode ? qrName : "Upload QR Code"}
//                       </span>
//                       <AiOutlineCloudUpload size={20} />
//                     </label>
//                   </div>
//                   {validationErrors.qrCode && (
//                     <p className="text-danger small-font">
//                       {validationErrors.qrCode}
//                     </p>
//                   )}
//                 </div>
//               </>
//             )}

//             {/* Other Payment Mode Fields */}
//             {availablePaymentModeId === 4 && (
//               <div className="col-12 my-2">
//                 <label className="small-font mb-1">Details</label>
//                 <textarea
//                   className={`w-100 small-font rounded input-css all-none ${
//                     validationErrors.details ? "is-invalid" : ""
//                   }`}
//                   placeholder="Enter payment details (max 250 chars)"
//                   value={details}
//                   onChange={handleDetailsChange}
//                   rows={4}
//                   maxLength={250}
//                 />
//                 {validationErrors.details && (
//                   <p className="text-danger small-font">
//                     {validationErrors.details}
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>

//           <div className="row d-flex mt-3 justify-content-end">
//             <div className="col-6">
//               <button className="w-100 saffron-btn rounded small-font">
//                 <span className="ps-2">
//                   {loading
//                     ? managementPaymentEdit
//                       ? "Updating..."
//                       : "Submitting..."
//                     : managementPaymentEdit
//                     ? "Update"
//                     : "Submit"}
//                 </span>
//               </button>
//               </div>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default AddPaymentGatewayPopup;


import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import { AiOutlineCloudUpload } from "react-icons/ai";
import {
  createManagementPaymentDetails,
  getDirectorAccountById,
  getManagementPaymentDetailsById,
  postDirectorAccountDetails,
  updateDirectorAccountDetails,
  updateManagementPaymentDetails,
} from "../../../api/apiMethods";
import ErrorPopup from "../../popups/ErrorPopup";
import ErrorComponent from "../../../components/ErrorComponent";
import { useSearchParams } from "react-router-dom";

const AddPaymentGatewayPopup = ({
  show,
  setOnAddPaymentGateway,
  managementPaymentEdit,
  managementPaymentEditId,
  setManagementPaymentEditId,
  availablePaymentModeId,
  countryId,
  dirEditId,
  getDirectorAccountData,
  addpaymentId,
  setDiscription,
  setSuccessPopupOpen
}) => {
  const [upiID, setUpiID] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankIFSC, setBankIFSC] = useState("");
  const [bankName, setBankName] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [manPaymentData, setManPaymentData] = useState([]);
  const role_code = localStorage.getItem("role_code");
  const [details, setDetails] = useState("");
  const [accHolderName, setAccHolderName] = useState("");
  const [msg, setMsg] = useState("");
  const [qrName, setQrName] = useState("");
  const [searchParams] = useSearchParams();
  const pages = parseInt(searchParams.get("page") || 1);
  const [validationErrors, setValidationErrors] = useState({});

  // Reset all form fields
  const resetFields = () => {
    setUpiID("");
    setAccountNumber("");
    setBankIFSC("");
    setBankName("");
    setCountry("");
    setAccHolderName("");
    setDetails("");
    setQrCode(null);
    setQrName("");
    setValidationErrors({});
    setMsg("");
  };

  const onHide = () => {
    if (setManagementPaymentEditId) {
      setManagementPaymentEditId(null);
    }
    resetFields();
    setOnAddPaymentGateway(false);
  };

  const [updateId, setUpdateId] = useState(null);

  // Handle QR code upload
  const handleQrCodeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setQrCode(file);
      setQrName(file.name);
      setValidationErrors(prev => ({ ...prev, qrCode: "" }));
    }
  };

  // Account Holder Name validation
  const handleAccHolderNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z ]/g, '').slice(0, 100);
    setAccHolderName(value);

    if (value.length < 4 && value.length > 0) {
      setValidationErrors(prev => ({
        ...prev,
        accHolderName: "Must be at least 4 characters"
      }));
    } else if (value.length === 0) {
      setValidationErrors(prev => ({
        ...prev,
        accHolderName: "Account Holder Name is required"
      }));
    } else {
      setValidationErrors(prev => ({ ...prev, accHolderName: "" }));
    }
  };

  // Bank Account Number validation
  const handleAccountNumberChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 34);
    setAccountNumber(value);

    if (value.length < 8 && value.length > 0) {
      setValidationErrors(prev => ({
        ...prev,
        accountNumber: "Must be 8-34 digits"
      }));
    } else if (value.length === 0) {
      setValidationErrors(prev => ({
        ...prev,
        accountNumber: "Account Number is required"
      }));
    } else {
      setValidationErrors(prev => ({ ...prev, accountNumber: "" }));
    }
  };

  // Bank IFSC validation
  const handleBankIFSCChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 15);
    setBankIFSC(value.toUpperCase());

    if (value.length < 11 && value.length > 0) {
      setValidationErrors(prev => ({
        ...prev,
        bankIFSC: "Must be 11-15 characters"
      }));
    } else if (value.length === 0) {
      setValidationErrors(prev => ({
        ...prev,
        bankIFSC: "IFSC is required"
      }));
    } else {
      setValidationErrors(prev => ({ ...prev, bankIFSC: "" }));
    }
  };

  // Bank Name validation
  const handleBankNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z ]/g, '').slice(0, 150);
    setBankName(value);

    if (value.length < 2 && value.length > 0) {
      setValidationErrors(prev => ({
        ...prev,
        bankName: "Must be at least 2 characters"
      }));
    } else if (value.length === 0) {
      setValidationErrors(prev => ({
        ...prev,
        bankName: "Bank Name is required"
      }));
    } else {
      setValidationErrors(prev => ({ ...prev, bankName: "" }));
    }
  };

  // UPI ID validation
  const handleUpiIDChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9@.]/g, '').slice(0, 50);
    setUpiID(value.toLowerCase());

    if (value.length < 3 && value.length > 0) {
      setValidationErrors(prev => ({
        ...prev,
        upiID: "Must be at least 3 characters"
      }));
    } else if (value.length === 0) {
      setValidationErrors(prev => ({
        ...prev,
        upiID: "UPI ID is required"
      }));
    } else {
      setValidationErrors(prev => ({ ...prev, upiID: "" }));
    }
  };

  // Details validation
  const handleDetailsChange = (e) => {
    const value = e.target.value.slice(0, 250);
    setDetails(value);

    if (value.length === 0) {
      setValidationErrors(prev => ({
        ...prev,
        details: "Details are required"
      }));
    } else {
      setValidationErrors(prev => ({ ...prev, details: "" }));
    }
  };

  // Fetch payment details when in edit mode
  useEffect(() => {
    const fetchManagementPaymentDetailsById = async () => {
      setInitialLoading(true);
      try {
        const response = await getManagementPaymentDetailsById(managementPaymentEditId);
        if (response.status === true) {
          setManPaymentData(response.data);
          setUpdateId(response.data?.payment_mode_id);
          setAccHolderName(response.data?.acc_hold_name || "");
          setAccountNumber(response.data?.bank_acc_no || "");
          setBankIFSC(response.data?.bank_ifsc || "");
          setBankName(response.data?.bank_name || "");
          setUpiID(response.data?.upi_id || "");
          setDetails(response.data?.others_details || "");
          setQrCode(response.data?.qr_code_image || null);
          setQrName(response.data?.qr_code_image || "");
        }
      } catch (error) {
        setError(error?.message);
      } finally {
        setInitialLoading(false);
      }
    };

    if (managementPaymentEditId && managementPaymentEdit) {
      fetchManagementPaymentDetailsById();
    }
  }, [managementPaymentEditId, managementPaymentEdit]);

  // Handle form submission for management payments
  const handleManagementPayments = async () => {
    // Final validation check
    let errors = {};

    if (!accHolderName.trim()) errors.accHolderName = "Account Holder Name is required";
    if (availablePaymentModeId === 1) {
      if (!accountNumber.trim()) errors.accountNumber = "Account Number is required";
      if (!bankIFSC.trim()) errors.bankIFSC = "IFSC is required";
      if (!bankName.trim()) errors.bankName = "Bank Name is required";
    } else if (availablePaymentModeId === 2) {
      if (!upiID.trim()) errors.upiID = "UPI ID is required";
    } else if (availablePaymentModeId === 3) {
      if (!bankName.trim()) errors.bankName = "Bank Name is required";
      if (!qrCode) errors.qrCode = "QR Code is required";
    } else if (availablePaymentModeId === 4) {
      if (!details.trim()) errors.details = "Details are required";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Prepare request data
    const pay_id = updateId ? manPaymentData?.payment_mode_id : addpaymentId.slice(3, -3);
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
      setLoading(true);
      const response = managementPaymentEdit
        ? await updateManagementPaymentDetails(manPaymentData?.id, formData)
        : await createManagementPaymentDetails(formData);

      setSuccessPopupOpen(true);
      setDiscription(response?.message || "Payment details added");
      console.log(setDiscription(), "==>setDiscription")
      resetFields();
      setOnAddPaymentGateway(false);
      if (setManagementPaymentEditId) setManagementPaymentEditId(null);
    } catch (error) {
      setError(error?.message);
      // setErrorPopupOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for director payments
  const handleDirectorPayments = async () => {
    // Similar validation as above
    let errors = {};

    if (!accHolderName.trim()) errors.accHolderName = "Account Holder Name is required";
    if (availablePaymentModeId === 1) {
      if (!accountNumber.trim()) errors.accountNumber = "Account Number is required";
      if (!bankIFSC.trim()) errors.bankIFSC = "IFSC is required";
      if (!bankName.trim()) errors.bankName = "Bank Name is required";
    } else if (availablePaymentModeId === 2) {
      if (!upiID.trim()) errors.upiID = "UPI ID is required";
    } else if (availablePaymentModeId === 3) {
      if (!bankName.trim()) errors.bankName = "Bank Name is required";
      if (!qrCode) errors.qrCode = "QR Code is required";
    } else if (availablePaymentModeId === 4) {
      if (!details.trim()) errors.details = "Details are required";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Prepare form data
    const pay_id = dirEditId ? dirEditId.slice(3, -3) : addpaymentId.slice(3, -3);
    const formData = new FormData();
    formData.append("offlinmods_id", pay_id);
    formData.append("gateway_type", availablePaymentModeId);
    formData.append("currency_id", countryId);
    formData.append("acc_hold_name", accHolderName);

    if (availablePaymentModeId === 1) {
      formData.append("bank_acc_no", accountNumber);
      formData.append("bank_ifsc", bankIFSC);
      formData.append("bank_name", bankName);
    } else if (availablePaymentModeId === 2) {
      formData.append("upi_id", upiID);
    } else if (availablePaymentModeId === 3) {
      formData.append("bank_name", bankName);
    } else if (availablePaymentModeId === 4) {
      formData.append("others_details", details);
    }

    if (availablePaymentModeId === 3 && qrCode) {
      formData.append("qr_code_image", qrCode);
    }

    try {
      const response = managementPaymentEdit
        ? await updateDirectorAccountDetails(dirEditId, formData)
        : await postDirectorAccountDetails(formData);

      setMsg(response?.message);
      setSuccessPopupOpen(true);
      resetFields();
      getDirectorAccountData();
      setTimeout(() => {
        setSuccessPopupOpen(false);
        setOnAddPaymentGateway(false);
      }, 2000);
    } catch (error) {
      setError(error?.message);
      setErrorPopupOpen(true);
    }
  };

  return (
    <>
      <Modal centered show={show} onHide={onHide} size="md">
        {initialLoading && managementPaymentEdit && (
          <div className="my-load">
            <div className="loader"></div>
          </div>
        )}
        <Modal.Body className="p-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="medium-font fw-600">
              {managementPaymentEdit ? "Edit" : "Add"}{" "}
              {role_code === "director" ? "Director" : "Management"} Payment Gateway
            </h5>
            <MdOutlineClose size={22} onClick={onHide} className="pointer" />
          </div>

          {error && <ErrorComponent error={error} />}

          <div className="row mb-3">
            {/* Account Holder Name (always shown) */}
            <div className="col-6">
              <label className="small-font mb-1">Account Holder Name</label>
              <input
                type="text"
                className={`w-100 small-font rounded input-css all-none ${validationErrors.accHolderName ? "is-invalid" : ""
                  }`}
                placeholder="Enter name (4-100 chars)"
                value={accHolderName}
                onChange={handleAccHolderNameChange}
              />
              {validationErrors.accHolderName && (
                <p className="text-danger small-font">
                  {validationErrors.accHolderName}
                </p>
              )}

            </div>

            {/* Bank Payment Mode Fields */}
            {availablePaymentModeId === 1 && (
              <>
                <div className="col-6">
                  <label className="small-font mb-1">Bank Account Number</label>
                  <input
                    type="text"
                    className={`w-100 small-font rounded input-css all-none ${validationErrors.accountNumber ? "is-invalid" : ""
                      }`}
                    placeholder="Enter (8-34 digits)"
                    value={accountNumber}
                    onChange={handleAccountNumberChange}
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
                    className={`w-100 small-font rounded input-css all-none ${validationErrors.bankIFSC ? "is-invalid" : ""
                      }`}
                    placeholder="Enter (11-15 chars)"
                    value={bankIFSC}
                    onChange={handleBankIFSCChange}
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
                    className={`w-100 small-font rounded input-css all-none ${validationErrors.bankName ? "is-invalid" : ""
                      }`}
                    placeholder="Enter bank name (2-150 chars)"
                    value={bankName}
                    onChange={handleBankNameChange}
                  />
                  {validationErrors.bankName && (
                    <p className="text-danger small-font">
                      {validationErrors.bankName}
                    </p>
                  )}

                </div>
              </>
            )}

            {/* UPI Payment Mode Fields */}
            {availablePaymentModeId === 2 && (
              <div className="col-6">
                <label className="small-font mb-1">UPI ID</label>
                <input
                  type="text"
                  className={`w-100 small-font rounded input-css all-none ${validationErrors.upiID ? "is-invalid" : ""
                    }`}
                  placeholder="Enter UPI ID (e.g., name@upi)"
                  value={upiID}
                  onChange={handleUpiIDChange}
                />
                {validationErrors.upiID && (
                  <p className="text-danger small-font">
                    {validationErrors.upiID}
                  </p>
                )}

              </div>
            )}

            {/* QR Code Payment Mode Fields */}
            {availablePaymentModeId === 3 && (
              <>
                <div className="col-6">
                  <label className="small-font mb-1">Bank Name</label>
                  <input
                    type="text"
                    className={`w-100 small-font rounded input-css all-none ${validationErrors.bankName ? "is-invalid" : ""
                      }`}
                    placeholder="Enter bank name (2-150 chars)"
                    value={bankName}
                    onChange={handleBankNameChange}
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
                      className={`w-100 small-font rounded input-css all-none ${validationErrors.qrCode ? "is-invalid" : ""
                        }`}
                      onChange={handleQrCodeChange}
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="qrCode"
                      className="upload-input-popup btn d-flex justify-content-between align-items-center rounded w-100 pointer"
                    >
                      <span className="small-font">
                        {qrCode ? qrName : "Upload QR Code"}
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

            {/* Other Payment Mode Fields */}
            {availablePaymentModeId === 4 && (
              <div className="col-12 my-2">
                <label className="small-font mb-1">Details</label>
                <textarea
                  className={`w-100 small-font rounded input-css all-none ${validationErrors.details ? "is-invalid" : ""
                    }`}
                  placeholder="Enter payment details (max 250 chars)"
                  value={details}
                  onChange={handleDetailsChange}
                  rows={4}
                  maxLength={250}
                />
                {validationErrors.details && (
                  <p className="text-danger small-font">
                    {validationErrors.details}
                  </p>
                )}

              </div>
            )}
          </div>

          <div className="row d-flex mt-3 justify-content-end">
            <div className="col-6">
              <button
                className="w-100 saffron-btn rounded small-font"
                type="submit"
                disabled={loading}
                onClick={
                  role_code === "management"
                    ? handleManagementPayments
                    : handleDirectorPayments
                }
              >
                {loading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : null}
                <span className="ps-2">
                  {loading
                    ? managementPaymentEdit
                      ? "Updating..."
                      : "Submitting..."
                    : managementPaymentEdit
                      ? "Update"
                      : "Submit"}
                </span>
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <ErrorPopup
        errorPopupOpen={errorPopupOpen}
        setErrorPopupOpen={setErrorPopupOpen}
        discription={error}
      />
    </>
  );
};

export default AddPaymentGatewayPopup;