import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import { ManagementOfflineDepositeTicketCreation } from "../../api/apiMethods";
import { useSelector } from "react-redux";
import { IoEyeOffSharp, IoEye } from "react-icons/io5";
import ErrorComponent from "../../components/ErrorComponent";

const OfflineDepositPopup = ({
  depositPopup,
  selectedDetails,
  setDepositPopup,
  handleSuccesPopup,
  setDiscription,
}) => {
  const allCountries = useSelector((item) => item?.allCountries);
  const [errors, setErrors] = useState({});
  const [selectedChips, setSelectedChips] = useState("");
  const [finalPaidAmount, setFinalPaidAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [masterPassword, setMasterPassword] = useState("");
  const [apiErrors, setApiErrors] = useState(null);
  const [isFinalPaidAmountFocused, setIsFinalPaidAmountFocused] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showHide, setShowHide] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!selectedChips || Number(selectedChips) <= 0) {
      newErrors.selectedChips = "Required field";
    }
    if (!remark || remark.trim() === "") {
      newErrors.remark = "Required field";
    }
    if (!masterPassword || masterPassword.trim() === "") {
      newErrors.masterPassword = "Required field";
    }

    if (selectedDetails?.creditAllowed !== 1 || finalPaidAmount !== "") {
      if (!finalPaidAmount || Number(finalPaidAmount) < 0) {
        newErrors.paidAmount = "Required field";
      } else if (Number(finalPaidAmount) > Number(selectedChips)) {
        newErrors.paidAmount = `Cannot exceed ${selectedChips}`;
      }
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

  const handleSubmit = () => {
    if (!validateForm()) return;

    // Calculate values based on conditions
    const chipsValue = Number(selectedChips);
    const paidValue = finalPaidAmount === "" ? 0 : Number(finalPaidAmount);
    const oldCredit = selectedDetails?.creditBalance || 0;

    let newCredit;
    if (selectedDetails?.creditAllowed === 1) {
      // When credit is allowed: new credit = old + (chips - paid)
      newCredit = oldCredit + (chipsValue - paidValue);
    } else {
      // When credit is not allowed: new credit = old + chips (must pay full amount)
      newCredit = oldCredit + chipsValue;
    }

    const payload = {
      currency: selectedDetails?.currId,
      oldCredit: oldCredit,
      chipAmount: chipsValue,
      paidAmount: paidValue,
      totalCredit: newCredit,
      remarks: remark,
      parentPassword: masterPassword,
    };

    setIsLoading(true);
    ManagementOfflineDepositeTicketCreation(selectedDetails?.id, payload)
      .then((response) => {
        handleSuccesPopup();
        setDepositPopup(false);
        setDiscription(`Deposit Successful`);
        setApiErrors(null);
        // Reset form
        setSelectedChips("");
        setFinalPaidAmount("");
        setRemark("");
        setMasterPassword("");
      })
      .catch((error) => {
        setApiErrors(error?.message || "API request failed");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlePaidAmountChange = (e) => {
    const value = e.target.value;
    // Allow empty value or numeric value within limits
    if (
      value === "" ||
      (Number(value) >= 0 && Number(value) <= Number(selectedChips))
    ) {
      setFinalPaidAmount(value);
    }
    clearError("paidAmount");
  };

  const getCurrency = (id) => {
    const country = allCountries.find((item) => item.id === id);
    return country?.currency_name;
  };

  const handleChipsChange = (e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, "");
    if (inputValue.length <= 11) {
      setSelectedChips(inputValue);
      // If chips are reduced below current paid amount, adjust paid amount
      if (
        inputValue &&
        finalPaidAmount &&
        Number(inputValue) < Number(finalPaidAmount)
      ) {
        setFinalPaidAmount(inputValue);
      }
    }
    clearError("selectedChips");
  };

  const handleRemarkChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 250) {
      setRemark(inputValue);
    }
    clearError("remark");
  };

  const handlePasswordChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 36) {
      setMasterPassword(inputValue);
    }
    clearError("masterPassword");
  };

  const calculateNewCredit = () => {
    if (!selectedChips) return 0;

    const chips = Number(selectedChips);
    const paid = finalPaidAmount === "" ? 0 : Number(finalPaidAmount);
    const oldCredit = selectedDetails?.creditBalance || 0;

    if (selectedDetails?.creditAllowed === 1) {
      // Credit allowed: new credit = (chips - paid)
      const credit = chips - paid;
      return credit < 0 ? 0 : credit;
    } else {
      // No credit allowed: must pay full amount (new credit = chips)
      return chips;
    }
  };

  const handleEncryptOrDecrypt = () => {
    setShowHide(!showHide);
  };

  const remainingCreditBal =
    selectedDetails?.maxCreditLimit - selectedDetails?.creditBalance > 0
      ? selectedDetails?.maxCreditLimit - selectedDetails?.creditBalance
      : 0;
  return (
    <Modal show={depositPopup} centered className="confirm-popup" size="md">
      <Modal.Body>
        <div
          className="d-flex justify-content-between align-items-center mb-2"
          style={{ padding: "0 16px" }}
        >
          <div style={{ width: "22px" }}>{` `}</div>
          <div className="fw-600 mb-0 green-font text-center text-size px-2 rounded">
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

        {apiErrors && <ErrorComponent error={apiErrors} />}

        <div className="col w-100 small-font rounded input-css all-none white-bg input-border mb-2 text-capitalize">
          {`${selectedDetails?.roal == 2 ? "SA" : "Director"} - ${
            selectedDetails?.name
          } - ${getCurrency(selectedDetails?.currId)}`}
        </div>

        <div className="row">
          <div className="col mb-2">
            <label className="small-font mb-1">Old Credit Balance</label>
            <input
              type="number"
              className="w-100 small-font rounded input-css all-none input-bg"
              value={selectedDetails?.creditBalance || 0}
              readOnly
            />
          </div>
          <div className="col mb-2">
            <label className="small-font mb-1">Remaining Credit</label>
            <input
              type="text"
              className="w-100 small-font rounded input-css all-none input-bg"
              value={remainingCreditBal}
              readOnly
            />
          </div>
          <div className="col mb-2">
            <label className="small-font mb-1">New Credit Deposit</label>
            <input
              type="text"
              className="w-100 small-font rounded input-css all-none input-bg"
              value={calculateNewCredit()}
              readOnly
            />
          </div>
        </div>

        <div className="row">
          <div className="col mb-2">
            <label className="small-font mb-1">Enter Deposit Chips</label>
            <input
              type="text"
              className={`w-100 small-font rounded input-css all-none input-bg ${
                errors.selectedChips ? "is-invalid" : ""
              }`}
              placeholder="Enter amount"
              value={selectedChips}
              onChange={handleChipsChange}
            />
            {errors.selectedChips && (
              <p className="text-danger small-font">{errors.selectedChips}</p>
            )}
          </div>

          {selectedDetails?.creditAllowed === 1 ? (
            <div className="col mb-2">
              <label className="small-font mb-1">
                Paid Amount {finalPaidAmount === "" && "(Optional)"}
              </label>
              <input
                type="number"
                className={`w-100 small-font rounded input-css all-none input-bg ${
                  errors.paidAmount ? "is-invalid" : ""
                }`}
                placeholder={
                  finalPaidAmount === "" ? "Optional" : "Enter amount"
                }
                value={finalPaidAmount}
                onChange={handlePaidAmountChange}
                onFocus={() => setIsFinalPaidAmountFocused(true)}
                onBlur={() => setIsFinalPaidAmountFocused(false)}
                min="0"
                max={Number(selectedChips)}
              />
              {isFinalPaidAmountFocused && finalPaidAmount > selectedChips && (
                <div className="text-danger small-font mt-1">
                  Cannot exceed {selectedChips}
                </div>
              )}
              {!isFinalPaidAmountFocused && errors.paidAmount && (
                <p className="text-danger small-font">{errors.paidAmount}</p>
              )}
            </div>
          ) : (
            <div className="col mb-2">
              <label className="small-font mb-1">Paid Amount</label>
              <input
                type="number"
                className={`w-100 small-font rounded input-css all-none input-bg ${
                  errors.paidAmount ? "is-invalid" : ""
                }`}
                placeholder="Enter amount"
                value={selectedChips} // Auto-fill with chips value when credit not allowed
                readOnly
              />
              {errors.paidAmount && (
                <p className="text-danger small-font">{errors.paidAmount}</p>
              )}
            </div>
          )}
        </div>

        <div className="row">
          <div className="col mb-2">
            <label className="small-font mb-1">Remark</label>
            <input
              type="text"
              className={`w-100 small-font rounded input-css all-none input-bg ${
                errors.remark ? "is-invalid" : ""
              }`}
              placeholder="Enter description"
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
            <div
              className={`white-btn2 w-100 flex-between ${
                errors.masterPassword ? "is-invalid" : ""
              }`}
            >
              <input
                className="all-none p-0 small-font"
                placeholder="Enter password"
                type={showHide ? "text" : "password"}
                value={masterPassword || ""}
                onChange={handlePasswordChange}
                autoComplete="off"
              />
              {showHide ? (
                <IoEye
                  className="large-font pointer"
                  onClick={handleEncryptOrDecrypt}
                />
              ) : (
                <IoEyeOffSharp
                  className="large-font pointer"
                  onClick={handleEncryptOrDecrypt}
                />
              )}
            </div>
            <button
              className="saffron-btn small-font rounded w-100 ms-1 d-flex align-items-center justify-content-center"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ps-2">Submitting...</span>
                </>
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
  );
};

export default OfflineDepositPopup;
