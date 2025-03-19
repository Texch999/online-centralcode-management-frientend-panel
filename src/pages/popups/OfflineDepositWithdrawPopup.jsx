
import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import { VscCloudUpload } from "react-icons/vsc";
import { DirectorOffilneDepositTicket, getDirectorAccessWebites, getDirectorSites, ManagementOfflineDepositeTicketCreation, ManagementOfflineWithdrawTicketCreation } from "../../api/apiMethods";
import { MdContentCopy } from "react-icons/md";
import { imgUrl } from "../../api/baseUrl";
import { rceil } from "../../utils/mathFunctions";
import SuccessPopup from "./SuccessPopup";

const OfflineDepositWithdrawPopup = ({ setDepositePopup,
    depositePopup,
    handleSuccessPopupOpen,
    selectedPayment,
    actionType,
    depositWithdrawPopup,
    selectedDetails,
    setDepositWithdrawPopup
}) => {

    const [errors, setErrors] = useState({});
    const userName = localStorage.getItem("user_name")
    const userRole = localStorage.getItem("role_code")
    const [directorCurrency, setDirectorCurrency] = useState("")
    const [fieldError, setFieldError] = useState('')
    const [apiErrors, setApiErrors] = useState(null);
    const [paymentMode, setPaymentMode] = useState(null);
    const [discription, setDiscription] = useState("")
    const [loading, setLoading] = useState(null);
    const [successPopupOpen, setSuccessPopupOpen] = useState(false)
    const durationOptions = [
        { value: 30, label: "30day" },
        { value: 90, label: "90day" },
        { value: 180, label: "180day" },
        { value: 365, label: "365day" },
    ]
    const paymentModeOptions = [
        { value: 1, label: "Credit" },
        { value: 2, label: "Other Payment" },
    ]
    const [duration, setDuration] = useState("")
    const [inputData, setInputData] = useState({
        adminWeb: "",
        userWeb: "",
        selectedChips: 0,
        remarks: 0,
        totalPay: 0,
        parentpassword: "",
        paidAmount: 0,
        creditAmount: 0,
        selectedAdminSiteId: null,
        selectedUserSiteId: null,
        selectedCommissionType: null,
    });

    const validateForm = (siteData) => {
        const newErrors = {};

        // Validate Admin Panel ID
        if (!siteData?.selectedUserDetails?.admin_panel_id) {
            newErrors.adminWebsiteId = "Please select an Admin Panel ID";
        }

        // Validate User Panel ID
        if (!siteData?.selectedUserDetails?.user_paner_id) {
            newErrors.userPanelId = "Please select a User Panel ID";
        }

        // Validate INR Chips
        if (!inputData?.inrChips || inputData?.inrChips <= 0) {
            newErrors.inrChips = "INR Chips value is required";
        }
        if (!inputData?.inrChips || inputData?.inrChips <= 0) {
            newErrors.inrChips = "INR Chips value is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const roundedShareChipValue = Number(inputData.selectedChips) *
        (selectedDetails?.commission_type == 1 ? selectedDetails?.chip_percentage || 1 : selectedDetails?.share) / 100

    const creditBalance = roundedShareChipValue - Number(inputData.paidAmount)
    const handleSubmit = (siteData) => {
        if (!validateForm(siteData)) return;

        const payload = {
            adminPanelId: siteData?.selectedUserDetails?.admin_panel_id,
            userPanelId: siteData?.selectedUserDetails?.user_paner_id,
            currency: siteData?.currency_id,
            TotalPaidAmount: inputData.paidAmount,
        };

        // Add extra chips data if commission type is 1 and action is not WITHDRAW
        if (siteData?.selectedUserDetails?.commission_type === 1 && actionType !== "WITHDRAW") {
            payload.duration = duration
        }
        // /user/1/director/1/offlineDeposits
        // {
        //     "currency" : 107,
        //     "oldCredit" : 20,
        //     "chipAmount" : "20",
        //     "paidAmount" : "20",
        //     "totalCredit" : "20",
        //     "remarks" : "sdfsdfsdf" 
        // }
        let apiCall;
        if (actionType === "DEPOSIT") {
            apiCall = ManagementOfflineDepositeTicketCreation;
        } else {
            apiCall = ManagementOfflineWithdrawTicketCreation;
        }
        setLoading(true)
        apiCall(siteData?.id, payload)
            .then((response) => {
                if (response?.status === true) {
                    setSuccessPopupOpen(true);
                    setDiscription(`${actionType === "DEPOSIT" ? "Deposit" : "Withdraw"} Created Successfully`);
                    setInputData({
                        inrChips: 0,
                        extChips: 0,
                    });
                    setApiErrors(null);
                    setLoading(false)
                    setErrors({});
                } else if (response?.status == 422) {
                    setLoading(false)
                    setApiErrors(response?.errors || "Deposit failed. Please try again.");
                }
            })
            .catch((error) => {
                setLoading(false)
                setApiErrors(error?.message || "API request failed");
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div>
            <Modal show={depositWithdrawPopup} centered className="confirm-popup" size="md">
                <Modal.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2">

                        <div>
                            <div className=" fw-600 mb-0 green-font text-size input-bg px-2 rounded">{actionType == "DEPOSIT" ? "Deposit" : "Withdraw"}</div>
                        </div>
                        <div>
                            <MdOutlineClose size={22} className="pointer ms-3" onClick={() => setDepositWithdrawPopup(false)} />
                        </div>
                    </div>
                    {apiErrors && (
                        <div className="alert alert-danger pb-1">
                            {Array.isArray(apiErrors) ? (
                                <ul className="pb-1 ps-1">
                                    {apiErrors.map((error, index) => (
                                        <li className="small-font" key={index}>{error.message || error}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="small-font ps-1">{apiErrors.message || apiErrors}</p>
                            )}
                        </div>
                    )}
                    <hr />
                    <div className="row ">
                    </div>
                    <div className="row">
                        <div className="col mb-2">
                            <label className="small-font mb-1">Old Credit Balance</label>
                            <input
                                type="number"
                                name="selectedChips"
                                className="w-100 small-font rounded input-css all-none white-bg input-border"
                                placeholder="Enter Chips"
                                value={inputData.selectedChips}
                                onChange={(e) => handleInputChange(e)}
                            />
                            {fieldError && <p className="text-danger small-font">{fieldError}</p>}
                            {errors.selectedChips && <p className="text-danger small-font">{errors.selectedChips}</p>}
                        </div>
                        <div className="col mb-2">
                            <label className="small-font mb-1">Enter Withdraw Chips - {directorCurrency?.currencyName}</label>
                            <input
                                type="number"
                                name="selectedChips"
                                className="w-100 small-font rounded input-css all-none white-bg input-border"
                                placeholder="Enter Chips"
                                value={inputData.selectedChips}
                                onChange={(e) => handleInputChange(e)}
                            />
                            {fieldError && <p className="text-danger small-font">{fieldError}</p>}
                            {errors.selectedChips && <p className="text-danger small-font">{errors.selectedChips}</p>}
                        </div>
                        <div className="col mb-2">
                            <label className="small-font mb-1">
                                Amount ( {selectedDetails?.share}%) -  {directorCurrency?.currencyName}</label>
                            <input
                                type="number"
                                className="w-100 small-font rounded input-css all-none white-bg input-border"
                                placeholder="Enter "
                                value={roundedShareChipValue}
                                readOnly
                                style={{ pointerEvents: "none" }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col mb-2">
                            <label className="small-font mb-1">Paid Amount Chips - {directorCurrency?.currencyName}</label>
                            <input
                                type="number"
                                name="paidAmount"
                                className="w-100 small-font rounded input-css all-none white-bg input-border"
                                placeholder="Enter Chips"
                                value={inputData.paidAmount}
                                // onChange={(e) => {
                                //     if (Number(e.target.value) <= 99999999999) {
                                //         handleChange(e);
                                //         setFieldError("")
                                //     } else {
                                //         setFieldError(`You cannot enter more than ${99999999999} chips.`);
                                //     }
                                // }}
                                onChange={(e) => handleInputChange(e)}
                            />
                            {fieldError && <p className="text-danger small-font">{fieldError}</p>}
                            {errors.selectedChips && <p className="text-danger small-font">{errors.selectedChips}</p>}
                        </div>
                        <div className="col mb-2">
                            <label className="small-font mb-1">
                                Bal. Credit Amount ( {selectedDetails?.share}%) -  {directorCurrency?.currencyName}</label>
                            <input
                                type="number"
                                className="w-100 small-font rounded input-css all-none white-bg input-border"
                                placeholder="Enter "
                                value={creditBalance}
                                onChange={(e) => handleInputChange(e)}
                                readOnly
                                style={{ pointerEvents: "none" }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col mb-2">
                            <label className="small-font mb-1">Remark</label>
                            <input
                                type="text"
                                name="remarks"
                                className="w-100 small-font rounded input-css all-none white-bg input-border"
                                placeholder="Enter Description"
                                value={inputData.remarks}
                                onChange={(e) => handleInputChange(e)}
                            />
                            {fieldError && <p className="text-danger small-font">{fieldError}</p>}
                            {errors.selectedChips && <p className="text-danger small-font">{errors.selectedChips}</p>}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="d-flex flex-column w-100">
                        <div className="small-font mb-1 ">Enter Password</div>
                        <div className="d-flex flex-row justify-content-between me-1">
                            <input
                                type="text"
                                name="parentpassword"
                                className="w-100 small-font rounded input-css all-none rounded white-bg input-border"
                                placeholder="Enter Amount"
                                value={inputData?.parentpassword || ""}
                                onChange={(e) => handleInputChange(e)}

                            />
                            <button className="saffron-btn small-font rounded w-100 ms-1" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>
            {successPopupOpen && (
                <SuccessPopup
                    successPopupOpen={successPopupOpen}
                    setSuccessPopupOpen={setSuccessPopupOpen}
                    discription={discription}
                />
            )}
        </div >
    );
};

export default OfflineDepositWithdrawPopup;