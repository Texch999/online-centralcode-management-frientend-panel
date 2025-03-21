
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import { ManagementOfflineDepositeTicketCreation, ManagementOfflineWithdrawTicketCreation } from "../../api/apiMethods";
import SuccessPopup from "./SuccessPopup";

const OfflineDepositWithdrawPopup = ({
    actionType,
    depositWithdrawPopup,
    selectedDetails,
    setDepositWithdrawPopup
}) => {

    const [errors, setErrors] = useState({});
    const [directorCurrency, setDirectorCurrency] = useState("")
    const [paidAmount, setPaidAmount] = useState("")
    const [selectedChips, setSelectedChips] = useState("")
    const [remark, setRemark] = useState("")
    const [masterPassword, setMasterPassword] = useState("")
    const [fieldError, setFieldError] = useState('')
    const [apiErrors, setApiErrors] = useState(null);
    const [discription, setDiscription] = useState("")
    const [loading, setLoading] = useState(null);
    const [successPopupOpen, setSuccessPopupOpen] = useState(false)

    const validateForm = (siteData) => {
        const newErrors = {};
        // Validate INR Chips
        if (!selectedChips || Number(selectedChips) <= 0) {
            newErrors.selectedChips = "Deposit chips is required";
        }
        if (!paidAmount || Number(paidAmount) < 0) {
            newErrors.paidAmount = "Paid amount is required";
        }
        if (!remark || remark == "") {
            newErrors.remark = "Enter remark for more information";
        }
        if (!masterPassword || masterPassword == "") {
            newErrors.masterPassword = "master password is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };



    const handleSubmit = (siteData) => {
        if (!validateForm(siteData)) return;

        const payload = {
            currency: selectedDetails?.currId,
            oldCredit: selectedDetails?.creditBalance ? selectedDetails.creditBalance : 0,
            chipAmount: selectedChips,
            paidAmount: paidAmount,
            totalCredit: selectedDetails?.creditBalance ? selectedDetails.creditBalance : 0 + (Number(selectedChips) - Number(paidAmount)),
            remarks: remark,
            parentPassword: masterPassword,
        };

        let apiCall;
        if (actionType === "DEPOSIT") {
            apiCall = ManagementOfflineDepositeTicketCreation;
        } else {
            apiCall = ManagementOfflineWithdrawTicketCreation;
        }

        setLoading(true)
        apiCall(selectedDetails?.id, payload)
            .then((response) => {
                if (response?.message === "Deposit Created Successfully.") {
                    setSuccessPopupOpen(true);
                    setDiscription(`${actionType === "DEPOSIT" ? "Deposit" : "Withdraw"} Ticket Created Successfully`);
                    setApiErrors(null);
                    setLoading(false)
                    setErrors({});
                    setDepositWithdrawPopup(false)
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

    const afterPay = selectedDetails?.creditAllowed == 1 ? (Number(selectedChips) - Number(paidAmount)) : 0
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
                                value={selectedDetails?.creditBalance ? selectedDetails.creditBalance : 0}
                                readOnly
                            />
                        </div>
                        <div className="col mb-2">
                            <label className="small-font mb-1">Enter {`${actionType === "DEPOSIT" ? "Deposit" : "Withdraw"}`} Chips - {directorCurrency?.currencyName}</label>
                            <input
                                type="tet"
                                name="selectedChips"
                                className="w-100 small-font rounded input-css all-none white-bg input-border"
                                placeholder="Enter Chips"
                                value={selectedChips}
                                onChange={(e) => {
                                    setSelectedChips(e.target.value)
                                    setPaidAmount(e.target.value)
                                }}
                            />
                            {fieldError && <p className="text-danger small-font">{fieldError}</p>}
                            {errors.selectedChips && <p className="text-danger small-font">{errors.selectedChips}</p>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col mb-2">
                            <label className="small-font mb-1">Paid Amount - {directorCurrency?.currencyName}</label>
                            <input
                                type="text"
                                name="paidAmount"
                                className="w-100 small-font rounded input-css all-none white-bg input-border"
                                placeholder="Enter Chips"
                                value={paidAmount}
                                onChange={(e) => setPaidAmount(e.target.value)}
                                disabled={selectedDetails?.creditAllowed == 2 ? true : false}
                            />
                            {fieldError && <p className="text-danger small-font">{fieldError}</p>}
                            {errors.paidAmount && <p className="text-danger small-font">{errors.paidAmount}</p>}
                        </div>

                        <div className="col mb-2">
                            <label className="small-font mb-1">
                                Credit Amount -  {directorCurrency?.currencyName}</label>
                            <input
                                type="number"
                                className="w-100 small-font rounded input-css all-none white-bg input-border"
                                placeholder="Enter "
                                value={afterPay > 0 ? afterPay : 0}
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
                                name="remark"
                                className="w-100 small-font rounded input-css all-none white-bg input-border"
                                placeholder="Enter Description"
                                value={remark}
                                onChange={(e) => setRemark(e.target.value)}
                            />
                            {fieldError && <p className="text-danger small-font">{fieldError}</p>}
                            {errors.remark && <p className="text-danger small-font">{errors.remark}</p>}
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
                                value={masterPassword || ""}
                                onChange={(e) => setMasterPassword(e.target.value)}
                            />
                            <button className="saffron-btn small-font rounded w-100 ms-1" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                        {errors.parentpassword && <p className="text-danger small-font">{errors.parentpassword}</p>}
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