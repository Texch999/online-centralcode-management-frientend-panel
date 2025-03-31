
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import { ManagementOfflineDepositeTicketCreation } from "../../api/apiMethods";

import { useSelector } from "react-redux";
import { IoEyeOffSharp, IoEye } from "react-icons/io5";

const OfflineDepositPopup = ({
    depositPopup,
    selectedDetails,
    setDepositPopup,
    handleSuccesPopup,
    setDiscription
}) => {

    const allCountries = useSelector((item) => item?.allCountries);
    const [errors, setErrors] = useState({});
    const [paidAmount, setPaidAmount] = useState("")
    const [finalPaidAmount, setFinalPaidAmount] = useState("")
    const [selectedChips, setSelectedChips] = useState("")
    const [remark, setRemark] = useState("")
    const [masterPassword, setMasterPassword] = useState("")
    const [fieldError, setFieldError] = useState('')
    const [apiErrors, setApiErrors] = useState(null);
    const [isFinalPaidAmountFocused, setIsFinalPaidAmountFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showHide, setShowHide] = useState(false);

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
            totalCredit:
                (selectedDetails?.creditBalance ? selectedDetails.creditBalance : 0) +
                (selectedDetails?.creditAllowed == 1
                    ? Number(paidAmount) - Number(finalPaidAmount)
                    : 0),
            remarks: remark,
            parentPassword: masterPassword,
        };
        setIsLoading(true);
        ManagementOfflineDepositeTicketCreation(selectedDetails?.id, payload)
            .then((response) => {
                handleSuccesPopup();
                setDepositPopup(false);
                setDiscription(`Deposit Successfully`);
                setApiErrors(null);
            })
            .catch((error) => {
                setApiErrors(error?.message || "API request failed");
            })
            .finally(() => {
                setIsLoading(false); // Stop loading
            });
    };

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

    const handleEncryptOrDecrypt = () => {
        setShowHide(!showHide)
    }
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

                    <div className="col w-100 small-font rounded input-css all-none white-bg input-border mb-2 text-capitalize">
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
                                value={selectedDetails?.creditAllowed == 1 && finalPaidAmount ? ((Number(paidAmount) - Number(finalPaidAmount)) < 0 ? 0 : Number(paidAmount) - Number(finalPaidAmount)) : 0}
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
                                type="text"
                                name="selectedChips"
                                className="w-100 small-font rounded input-css all-none input-bg"
                                placeholder="Enter Chips"
                                value={selectedChips}
                                onChange={(e) => {
                                    const inputValue = e.target.value.replace(/[^0-9]/g, '')
                                    if (inputValue.length <= 11) {
                                        setSelectedChips(inputValue)
                                        setPaidAmount(inputValue)
                                    }
                                }}
                                // pattern="[0-9]*"
                                maxLength={99999999999}
                            />
                            {fieldError && <p className="text-danger small-font">{fieldError}</p>}
                            {errors.selectedChips && <p className="text-danger small-font">{errors.selectedChips}</p>}
                        </div>

                        <div className="col mb-2">
                            <label className="small-font mb-1">Total Paid Amount </label>
                            <input
                                type="text"
                                name="paidAmount"
                                className="w-100 small-font rounded input-css all-none input-bg"
                                placeholder="Enter Chips"
                                value={paidAmount ? paidAmount : 0}
                                onChange={(e) => setPaidAmount(e.target.value)}
                                readOnly
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
                                onFocus={() => setIsFinalPaidAmountFocused(true)}
                                onBlur={() => setIsFinalPaidAmountFocused(false)}
                                min="0"
                            />

                            {isFinalPaidAmountFocused && (
                                <>
                                    {selectedDetails?.creditAllowed == 2 && finalPaidAmount !== paidAmount && (
                                        <div className="text-danger small-font mt-1">
                                            Paid amount must be exactly {paidAmount}.
                                        </div>
                                    )}
                                    {selectedDetails?.creditAllowed == 1 && finalPaidAmount > paidAmount && (
                                        <div className="text-danger small-font mt-1">
                                            Paid amount cannot exceed {paidAmount}.
                                        </div>
                                    )}
                                </>
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
                                onChange={(e) => {
                                    const inputValue = e.target.value
                                    if (inputValue.length <= 250) {
                                        setRemark(inputValue)
                                    }
                                }}
                            />
                            {fieldError && <p className="text-danger small-font">{fieldError}</p>}
                            {errors.remark && <p className="text-danger small-font">{errors.remark}</p>}
                        </div>
                    </div>

                    <div className="d-flex flex-column w-100">
                        <div className="small-font mb-1 ">Enter Password</div>
                        <div className="d-flex flex-row justify-content-between me-1">

                            <div className="white-btn2 w-100 flex-between">
                                <input
                                    className="all-none p-0 small-font"
                                    placeholder="Enter"
                                    type={`${showHide ? "text" : "password"}`}
                                    name="parentpassword"
                                    value={masterPassword || ""}
                                    onChange={(e) => {
                                        const inputValue = e.target.value
                                        if (inputValue.length <= 36) {
                                            setMasterPassword(inputValue)
                                        }
                                    }}
                                    autocomplete="off"
                                />
                                {showHide ?
                                    <IoEye className="large-font pointer" onClick={handleEncryptOrDecrypt} />
                                    :
                                    <IoEyeOffSharp className="large-font pointer" onClick={handleEncryptOrDecrypt} />
                                }

                            </div>
                            <button
                                className="saffron-btn small-font rounded w-100 ms-1 d-flex align-items-center justify-content-center"
                                onClick={handleSubmit}
                                disabled={isLoading} // Disable button when loading
                            >
                                {isLoading ? (
                                    <div
                                        className="spinner-border spinner-border-sm" // Bootstrap spinner
                                        role="status"
                                    >
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </div>

                        {errors.parentpassword && <p className="text-danger small-font">{errors.parentpassword}</p>}
                    </div>

                </Modal.Body>
            </Modal>

        </div >
    );
};

export default OfflineDepositPopup;