import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import { getSettlementSummeryById, ManagementOfflineWithdrawTicketCreation } from "../../api/apiMethods";
import { useSelector } from "react-redux";
import { IoEyeOffSharp, IoEye } from "react-icons/io5";
import ErrorComponent from "../../components/ErrorComponent";

const OfflineWithdrawPopup = ({
    actionType,
    withdrawPopup,
    selectedDetails,
    setWithdrawPopup,
    handleSuccesPopup,
    setDiscription
}) => {

    const allCountries = useSelector((item) => item?.allCountries);
    const [errors, setErrors] = useState({});
    const [paidAmount, setPaidAmount] = useState("");
    const [remark, setRemark] = useState("");
    const [masterPassword, setMasterPassword] = useState("");
    const [apiErrors, setApiErrors] = useState(null);
    const [loading, setLoading] = useState(null);
    const [settleDetails, setSettleDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showHide, setShowHide] = useState(false);

    // Validate form on submit
    const validateForm = () => {
        const newErrors = {};
        if (!paidAmount || Number(paidAmount) <= 0) {
            newErrors.paidAmount = "Amount is required";
        }

        if (!masterPassword || masterPassword.trim() === "") {
            newErrors.masterPassword = "Password is required";
        } else if (masterPassword.length < 6) {
            newErrors.masterPassword = "Password must be at least 6 characters";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const clearError = (fieldName) => {
        if (errors[fieldName]) {
            const newErrors = { ...errors };
            delete newErrors[fieldName];
            setErrors(newErrors);
        }
    };

    const GetAllDirectors = (id) => {
        getSettlementSummeryById(id)
            .then((response) => {
                const data = response?.message;
                setSettleDetails(...data);
            })
            .catch((error) => {
                console.error(error?.message || "Failed to fetch directors");
            });
    };

    const calculateMaxWithdrawAmount = () => {
        const availableBalance = settleDetails?.avilChips || 0;
        const creditBalance = settleDetails?.creditBalance || 0;

        if (selectedDetails?.creditAllowed == 1) {
            return availableBalance - creditBalance;
        } else {
            return availableBalance;
        }
    };

    const handleSubmit = () => {
        const maxWithdrawAmount = calculateMaxWithdrawAmount();
        if (Number(paidAmount) > maxWithdrawAmount) {
            setErrors({ ...errors, paidAmount: `Withdraw amount cannot exceed ${maxWithdrawAmount}` });
            return;
        }
        if (!validateForm()) return;
        const payload = {
            currency: settleDetails?.currencyId,
            walletBalance: settleDetails?.avilChips,
            creditBalance: settleDetails?.creditBalance,
            availBalance: settleDetails?.avilChips - settleDetails?.creditBalance,
            withdrawAmount: paidAmount,
            remarks: remark,
            parentPassword: masterPassword,
        };
        if (remark) {
            payload.remarks = remark
        }

        setIsLoading(true);
        ManagementOfflineWithdrawTicketCreation(selectedDetails?.id, payload)
            .then((response) => {
                setWithdrawPopup(false);
                handleSuccesPopup()
                setDiscription(`Withdraw Successfully`);
                setApiErrors(null);
                setErrors({});
            })
            .catch((error) => {
                setLoading(false);
                setApiErrors(error?.message || "API request failed");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        GetAllDirectors(selectedDetails?.id);
    }, [selectedDetails?.id]);

    const getCurrency = (id) => {
        const country = allCountries.find((item) => item.id === id);
        return country?.currency_name;
    };

    const handleEncryptOrDecrypt = () => {
        setShowHide(!showHide);
    };

    const handleWithdrawAmountChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        const maxWithdrawAmount = calculateMaxWithdrawAmount();

        if (value === "" || (Number(value) <= maxWithdrawAmount && Number(value) >= 0)) {
            setPaidAmount(value);
            clearError('paidAmount');
        }
    };

    // Handle remark change with validation
    const handleRemarkChange = (e) => {
        const value = e.target.value.slice(0, 250); // Limit to 250 characters
        setRemark(value);

        if (value.length === 0) {
            setErrors(prev => ({ ...prev, remark: "Remark is required" }));
        } else if (value.length > 250) {
            setErrors(prev => ({ ...prev, remark: "Remark cannot exceed 250 characters" }));
        } else {
            clearError('remark');
        }
    };

    // Handle password change with validation
    const handlePasswordChange = (e) => {
        const value = e.target.value.slice(0, 36); // Limit to 36 characters
        setMasterPassword(value);

        if (value.length === 0) {
            setErrors(prev => ({ ...prev, masterPassword: "Password is required" }));
        } else if (value.length < 6) {
            setErrors(prev => ({ ...prev, masterPassword: "Password must be at least 6 characters" }));
        } else {
            clearError('masterPassword');
        }
    };

    return (
        <div>
            <Modal show={withdrawPopup} centered className="confirm-popup" size="md">
                <Modal.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2" style={{ padding: "0 16px" }}>
                        <div style={{ width: "22px" }}>{` `}</div>
                        <div className="fw-600 mb-0 red-font text-center text-size px-2 rounded">Withdraw</div>
                        <div>
                            <MdOutlineClose size={22} className="pointer" onClick={() => setWithdrawPopup(false)} />
                        </div>
                    </div>

                    {apiErrors && <ErrorComponent error={apiErrors} />}

                    <div className="col w-100 small-font rounded input-css all-none white-bg input-border mb-2">
                        {`${selectedDetails?.roal == 2 ? "SA" : "Director"} - ${selectedDetails?.name} - ${getCurrency(selectedDetails?.currId)}`}
                    </div>

                    <div className="row">
                        <div className="col mb-2">
                            <label className="small-font mb-1">Wallet Balance</label>
                            <input
                                type="number"
                                className="w-100 small-font rounded input-css all-none input-bg input-border"
                                value={settleDetails?.avilChips ? settleDetails.avilChips : 0}
                                readOnly
                            />
                        </div>

                        <div className="col mb-2">
                            <label className="small-font mb-1">Credit Balance</label>
                            <input
                                type="text"
                                className="w-100 small-font rounded input-css all-none input-bg input-border red-clr"
                                value={settleDetails?.creditAllowed == 1 ? settleDetails?.creditBalance : 0}
                                readOnly
                            />
                        </div>
                        <div className="col mb-2">
                            <label className="small-font mb-1">Profit/Loss</label>
                            <input
                                type="text"
                                className="w-100 small-font rounded input-css all-none input-bg input-border green-clr"
                                value={settleDetails?.pnl == 1 ? settleDetails?.pnl : 0}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col mb-2">
                            <label className="small-font white-space mb-1">Avl. Withdraw Bal.</label>
                            <input
                                type="text"
                                className="w-100 small-font rounded input-css all-none input-bg input-border"
                                value={(settleDetails?.avilChips - (settleDetails?.pnl + settleDetails?.creditBalance)) || 0}
                                readOnly
                            />
                        </div>

                        <div className="col mb-2">
                            <label className="small-font white-space mb-1">Remaining Wallet Bal.</label>
                            <input
                                type="text"
                                className="w-100 small-font rounded input-css all-none input-bg input-border"
                                value={paidAmount ? settleDetails?.avilChips - Number(paidAmount) : 0}
                                readOnly
                            />
                        </div>

                        <div className="col mb-2">
                            <label className="small-font mb-1">Enter Withdraw</label>
                            <input
                                type="text"
                                className={`w-100 small-font rounded input-css all-none input-bg input-border ${errors.paidAmount ? "is-invalid" : ""
                                    }`}
                                placeholder="Enter amount"
                                value={paidAmount}
                                onChange={handleWithdrawAmountChange}
                            />
                            {errors.paidAmount && (
                                <p className="text-danger small-font">{errors.paidAmount}</p>
                            )}

                        </div>
                    </div>

                    <div className="row mb-2">
                        <div className="col mb-2">
                            <label className="small-font mb-1">Remark</label>
                            <input
                                type="text"
                                className={`w-100 small-font rounded input-css all-none input-bg input-border fw-600 ${errors.remark ? "is-invalid" : ""
                                    }`}
                                placeholder="Enter description (max 250 chars)"
                                value={remark}
                                onChange={handleRemarkChange}
                            />
                            {errors.remark && (
                                <p className="text-danger small-font">{errors.remark}</p>
                            )}

                        </div>
                    </div>

                    <div className="d-flex flex-column w-100">
                        <div className="small-font mb-1">Enter Password</div>
                        <div className="d-flex flex-row justify-content-between me-1">
                            <div className={`white-btn2 w-100 flex-between ${errors.masterPassword ? "is-invalid" : ""
                                }`}>
                                <input
                                    className="all-none p-0 small-font"
                                    placeholder="Enter password (min 6 chars)"
                                    type={`${showHide ? "text" : "password"}`}
                                    value={masterPassword}
                                    onChange={handlePasswordChange}
                                    autoComplete="off"
                                />
                                {showHide ? (
                                    <IoEye className="large-font pointer" onClick={handleEncryptOrDecrypt} />
                                ) : (
                                    <IoEyeOffSharp className="large-font pointer" onClick={handleEncryptOrDecrypt} />
                                )}
                            </div>
                            <button
                                className="saffron-btn small-font rounded w-100 ms-1 d-flex align-items-center justify-content-center"
                                onClick={handleSubmit}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex-row" role="status">
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        <span className="ps-2">Submitting...</span>
                                    </div>
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </div>
                        {errors.masterPassword && (
                            <p className="text-danger small-font">{errors.masterPassword}</p>
                        )}

                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default OfflineWithdrawPopup;