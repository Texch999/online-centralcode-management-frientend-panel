import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import { getSettlementSummeryById, ManagementOfflineWithdrawTicketCreation } from "../../api/apiMethods";
import SuccessPopup from "./SuccessPopup";
import { useSelector } from "react-redux";

const OfflineWithdrawPopup = ({
    actionType,
    withdrawPopup,
    selectedDetails,
    setWithdrawPopup,
}) => {
    const allCountries = useSelector((item) => item?.allCountries);
    const [errors, setErrors] = useState({});
    const [paidAmount, setPaidAmount] = useState("");
    const [remark, setRemark] = useState("");
    const [masterPassword, setMasterPassword] = useState("");
    const [fieldError, setFieldError] = useState("");
    const [apiErrors, setApiErrors] = useState(null);
    const [discription, setDiscription] = useState("");
    const [loading, setLoading] = useState(null);
    const [successPopupOpen, setSuccessPopupOpen] = useState(false);
    const [settleDetails, setSettleDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!paidAmount || Number(paidAmount) < 0) {
            newErrors.paidAmount = "Paid amount is required";
        }
        if (!remark || remark == "") {
            newErrors.remark = "Enter remark for more information";
        }
        if (!masterPassword || masterPassword == "") {
            newErrors.masterPassword = "Master password is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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

    const handleSubmit = (siteData) => {
        const maxWithdrawAmount = calculateMaxWithdrawAmount();

        if (Number(paidAmount) > maxWithdrawAmount) {
            setErrors({ ...errors, paidAmount: `Withdraw amount cannot exceed ${maxWithdrawAmount}` });
            return;
        }
        if (!validateForm(siteData)) return;
        const payload = {
            currency: settleDetails?.currencyId,
            walletBalance: settleDetails?.avilChips,
            creditBalance: settleDetails?.creditBalance,
            availBalance: settleDetails?.avilChips - settleDetails?.creditBalance,
            withdrawAmount: paidAmount,
            remarks: remark,
            parentPassword: masterPassword,
        };

        setIsLoading(true);
        ManagementOfflineWithdrawTicketCreation(selectedDetails?.id, payload)
            .then((response) => {
                setSuccessPopupOpen(true);
                setDiscription(`"Withdraw Ticket Created Successfully`);
                setApiErrors(null);
                setErrors({});
                setTimeout(() => {
                    setSuccessPopupOpen(false);
                    setWithdrawPopup(false);
                }, 3000);

            })
            .catch((error) => {
                setLoading(false);
                setApiErrors(error?.message || "API request failed");
            })
            .finally(() => {
                setIsLoading(false); // Stop loading
            });
    };

    useEffect(() => {
        GetAllDirectors(selectedDetails?.id);
    }, [selectedDetails?.id]);

    const getCurrency = (id) => {
        const country = allCountries.find((item) => item.id === id);
        return country?.currency_name;
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
                            <label className="small-font mb-1">Wallet Balance</label>
                            <input
                                type="number"
                                name="selectedChips"
                                className="w-100 small-font rounded input-css all-none input-bg input-border"
                                placeholder="Enter Chips"
                                value={settleDetails?.avilChips ? settleDetails.avilChips : 0}
                                readOnly
                            />
                        </div>

                        <div className="col mb-2">
                            <label className="small-font mb-1">Pending Credit</label>
                            <input
                                type="text"
                                name="selectedChips"
                                className="w-100 small-font rounded input-css all-none input-bg input-border"
                                placeholder="Enter Chips"
                                value={settleDetails?.creditAllowed == 1 ? settleDetails?.creditBalance : 0}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col mb-2">
                            <label className="small-font mb-1">Remaining Wallet Balance</label>
                            <input
                                type="text"
                                name="selectedChips"
                                className="w-100 small-font rounded input-css all-none input-bg input-border"
                                placeholder="Enter Chips"
                                value={paidAmount ? settleDetails?.avilChips - Number(paidAmount) : 0}
                                readOnly
                            />
                        </div>

                        <div className="col mb-2">
                            <label className="small-font mb-1">Enter Withdraw</label>
                            <input
                                type="number"
                                name="paidAmount"
                                className="w-100 small-font rounded input-css all-none input-bg input-border"
                                placeholder="Enter Chips"
                                value={paidAmount}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const maxWithdrawAmount = calculateMaxWithdrawAmount();

                                    if (Number(value) <= maxWithdrawAmount) {
                                        setPaidAmount(value);
                                    }
                                }}
                                max={calculateMaxWithdrawAmount()}
                            />
                            {paidAmount > calculateMaxWithdrawAmount() && (
                                <div className="text-danger small-font mt-1">
                                    Withdraw amount cannot exceed {calculateMaxWithdrawAmount()}.
                                </div>
                            )}
                            {errors.paidAmount && <p className="text-danger small-font">{errors.paidAmount}</p>}
                        </div>
                    </div>

                    <div className="row mb-2">
                        <div className="col mb-2">
                            <label className="small-font mb-1">Remark</label>
                            <input
                                type="text"
                                name="remark"
                                className="w-100 small-font rounded input-css all-none input-bg input-border fw-600"
                                placeholder="Enter Description"
                                value={remark}
                                onChange={(e) => setRemark(e.target.value)}
                            />
                            {fieldError && <p className="text-danger small-font">{fieldError}</p>}
                            {errors.remark && <p className="text-danger small-font">{errors.remark}</p>}
                        </div>
                    </div>

                    <div className="d-flex flex-column w-100">
                        <div className="small-font mb-1">Enter Password</div>
                        <div className="d-flex flex-row justify-content-between me-1">
                            <input
                                type="text"
                                name="parentpassword"
                                className="w-100 small-font rounded input-css all-none rounded input-bg input-border"
                                placeholder="Enter Amount"
                                value={masterPassword || ""}
                                onChange={(e) => setMasterPassword(e.target.value)}
                            />
                            <button
                                className="saffron-btn small-font rounded w-100 ms-1 d-flex align-items-center justify-content-center"
                                onClick={handleSubmit}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div
                                        className="spinner-border spinner-border-sm"
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

            {successPopupOpen && (
                <SuccessPopup
                    successPopupOpen={successPopupOpen}
                    setSuccessPopupOpen={setSuccessPopupOpen}
                    discription={discription}
                />
            )}
        </div>
    );
};

export default OfflineWithdrawPopup;