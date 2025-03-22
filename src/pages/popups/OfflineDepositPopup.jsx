
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import { ManagementOfflineDepositeTicketCreation, ManagementOfflineWithdrawTicketCreation } from "../../api/apiMethods";
import SuccessPopup from "./SuccessPopup";
import { useSelector } from "react-redux";

// const OfflineDepositWithdrawPopup = ({
const OfflineDepositPopup = ({
    actionType,
    depositPopup,
    selectedDetails,
    setDepositPopup
}) => {

    const allCountries = useSelector((item) => item?.allCountries);
    const [errors, setErrors] = useState({});
    const [directorCurrency, setDirectorCurrency] = useState("")
    const [paidAmount, setPaidAmount] = useState("")
    const [finalPaidAmount, setFinalPaidAmount] = useState("")
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
            chipAmount: paidAmount,
            paidAmount: finalPaidAmount,
            totalCredit: selectedDetails?.creditBalance ? selectedDetails.creditBalance : 0 + selectedDetails?.creditAllowed == 1 ? (Number(paidAmount) - Number(finalPaidAmount)) : 0,
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

    setDepositPopup(false)
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

    console.log(selectedDetails, "==>selectedDetails")

    const afterPay = selectedDetails?.creditAllowed == 1 ? (Number(selectedChips) - Number(paidAmount)) : 0

    const handlePaidAmountChange = (e) => {
        const value = e.target.value;

        if (Number(value) <= Number(paidAmount)) {
            setFinalPaidAmount(value);
        }
    };
    const getCurrency = (id) => {
        const country = allCountries.find((item) => item.id === id);
        return country?.currency_name
    };
    console.log(selectedDetails, "==>selectedDetails")
    return (
        <div>
            <Modal show={depositPopup} centered className="confirm-popup" size="md">
                <Modal.Body>
                    <div
                        className="d-flex justify-content-between align-items-center mb-2"
                        style={{ padding: "0 16px" }}
                    >
                        <div style={{ width: "22px" }}>{` `}</div>
                        <div className=" fw-600 mb-0 green-font text-center text-size px-2 rounded">
                            Deposit (Manual & Credit)
                        </div>
                        <div>
                            <MdOutlineClose
                                size={22}
                                className="pointer"
                                onClick={() => setDepositPopup(false)}
                            />
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

                    <div className="col w-100 small-font rounded input-css all-none white-bg input-border mb-2">
                        {`${selectedDetails?.roal == 2 ? "SA" : "Director"} - ${selectedDetails?.name} - ${getCurrency(selectedDetails?.currId)}`}
                    </div>

                    <div className="row">
                        <div className="col mb-2">
                            <label className="small-font mb-1">Old Credit Balance</label>
                            <input
                                type="number"
                                name="selectedChips"
                                className="w-100 small-font rounded input-css all-none input-bg"
                                placeholder="Enter Chips"
                                value={selectedDetails?.creditBalance ? selectedDetails.creditBalance : 0}
                                readOnly
                            />
                        </div>

                        <div className="col mb-2">
                            <label className="small-font mb-1">New Credit Deposit</label>
                            <input
                                type="tet"
                                name="selectedChips"
                                className="w-100 small-font rounded input-css all-none input-bg"
                                placeholder="Enter Chips"
                                value={finalPaidAmount ? ((Number(paidAmount) - Number(finalPaidAmount)) < 0 ? 0 : Number(paidAmount) - Number(finalPaidAmount)) : 0}
                                readOnly
                            />
                            {fieldError && <p className="text-danger small-font">{fieldError}</p>}
                            {errors.selectedChips && <p className="text-danger small-font">{errors.selectedChips}</p>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col mb-2">
                            <label className="small-font mb-1">Enter Deposit Chips </label>
                            <input
                                type="tet"
                                name="selectedChips"
                                className="w-100 small-font rounded input-css all-none input-bg"
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

                        <div className="col mb-2">
                            <label className="small-font mb-1">Enter Paid Amount </label>
                            <input
                                type="text"
                                name="paidAmount"
                                className="w-100 small-font rounded input-css all-none input-bg"
                                placeholder="Enter Chips"
                                value={paidAmount}
                                onChange={(e) => setPaidAmount(e.target.value)}
                            />
                            {fieldError && <p className="text-danger small-font">{fieldError}</p>}
                            {errors.paidAmount && <p className="text-danger small-font">{errors.paidAmount}</p>}
                        </div>

                        <div className="col mb-2">
                            <label className="small-font mb-1">
                                Paid Amount </label>
                            <input
                                type="number"
                                className="w-100 small-font rounded input-css all-none input-bg"
                                placeholder="Enter"
                                value={finalPaidAmount}
                                onChange={handlePaidAmountChange}
                                min="0"
                                max={Number(paidAmount)}

                            />
                            {finalPaidAmount > paidAmount && (
                                <div className="text-danger small-font mt-1">
                                    Paid amount cannot exceed {paidAmount}.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col mb-2">
                            <label className="small-font mb-1">Remark</label>
                            <input
                                type="text"
                                name="remark"
                                className="w-100 small-font rounded input-css all-none input-bg"
                                placeholder="Enter Description"
                                value={remark}
                                onChange={(e) => setRemark(e.target.value)}
                            />
                            {fieldError && <p className="text-danger small-font">{fieldError}</p>}
                            {errors.remark && <p className="text-danger small-font">{errors.remark}</p>}
                        </div>
                    </div>

                    <div className="d-flex flex-column w-100">
                        <div className="small-font mb-1 ">Enter Password</div>
                        <div className="d-flex flex-row justify-content-between me-1">
                            <input
                                type="text"
                                name="parentpassword"
                                className="w-100 small-font rounded input-css all-none rounded input-bg"
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

export default OfflineDepositPopup;