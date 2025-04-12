import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import {
  getSettlementSummeryById,
  returnCreditChips,
} from "../../api/apiMethods";
import { useSelector } from "react-redux";
import { IoEye, IoEyeOff } from "react-icons/io5";
import ErrorComponent from "../../components/ErrorComponent";

const ReturnCreditModal = ({
  show,
  setShow,
  selectedUserId,
  getAllCreditUsersList,
  setSuccessPopupOpen,
  setDiscription,
}) => {
  const [settleDetails, setSettleDetails] = useState({});
  const [creditChips, setCreditChips] = useState("");
  const [error, setError] = useState("");
  const allCountries = useSelector((item) => item?.allCountries);
  const [parentPassword, setParentPassword] = useState("");
  const [remark, setRemark] = useState("");
  const [apiErrors, setApiErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [pswdVisible, setPswdVisible] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    creditChips: "",
    parentPassword: ""
  });

  // Fetch settlement details
  const GetAllDirectors = (id) => {
    setApiLoading(true)
    getSettlementSummeryById(id)
      .then((response) => {
        setApiLoading(false)
        if (response?.message) {
          const data = response?.message;
          setSettleDetails(...data);
        } else {
          console.error("Something Went Wrong");
        }
      })
      .catch((error) => {
        setApiLoading(false)
        console.error(error?.message || "Failed to fetch directors");
      });
  };

  useEffect(() => {
    if (selectedUserId?.id) {
      GetAllDirectors(selectedUserId?.id);
    }
  }, [selectedUserId?.id]);

  // Get location name
  const getLocationName = (locationId) => {
    const country = allCountries.find((country) => country.id === locationId);
    return country?.name.charAt(0).toUpperCase() + country?.name.slice(1);
  };

  const validateCreditChips = (value) => {
    const pendingCreditChips = settleDetails?.creditBalance || 0;
    const walletBalance = settleDetails?.avilChips || 0;

    if (!value || value === "") {
      return "Please enter refund credit chips";
    }

    if (isNaN(value) || value <= 0) {
      return "Please enter a valid positive number";
    }

    if (value > pendingCreditChips) {
      return `Entered chips cannot exceed ${pendingCreditChips}`;
    }

    if (walletBalance < value) {
      return "Insufficient chips in wallet";
    }

    return "";
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (/^\d*$/.test(inputValue)) {
      const value = parseInt(inputValue, 10) || 0;

      // Validate immediately as user types
      const creditChipsError = validateCreditChips(value);
      setValidationErrors(prev => ({
        ...prev,
        creditChips: creditChipsError
      }));

      if (!creditChipsError) {
        setCreditChips(value);
        setError("");
      } else {
        setCreditChips(value);
      }
    }
  };

  const calculateAvailableChips = () => {
    const enteredChips = parseInt(creditChips, 10) || 0;
    const updatedAvailableChips = settleDetails?.avilChips - enteredChips;
    const updatedCreditBalance = settleDetails?.creditBalance - enteredChips;
    return {
      updatedAvailableChips:
        updatedAvailableChips >= 0 ? updatedAvailableChips : 0,
      updatedCreditBalance:
        updatedCreditBalance >= 0 ? updatedCreditBalance : 0,
    };
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      creditChips: "",
      parentPassword: ""
    };

    // Validate credit chips
    newErrors.creditChips = validateCreditChips(creditChips);
    if (newErrors.creditChips) isValid = false;

    // Validate parent password
    if (!parentPassword.trim()) {
      newErrors.parentPassword = "Parent password is required";
      isValid = false;
    } else if (parentPassword.length < 6) {
      newErrors.parentPassword = "Password must be at least 6 characters";
      isValid = false;
    }

    setValidationErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    const payload = {
      currency: settleDetails?.currencyId,
      walletBalance: settleDetails?.avilChips,
      creditBalance: settleDetails?.creditBalance,
      availBalance: settleDetails?.avilChips - settleDetails?.creditBalance,
      refundedAmount: Number(creditChips),
      parentPassword: parentPassword,
    };

    if (remark) {
      payload.remarks = remark
    }

    returnCreditChips(selectedUserId.id, payload)
      .then((response) => {
        setSuccessPopupOpen(true);
        setIsLoading(false);
        getAllCreditUsersList();
        setShow(false);
        setDiscription("Credit Settled Successfully");
        // Reset form
        setCreditChips("");
        setParentPassword("");
        setRemark("");
        setValidationErrors({
          creditChips: "",
          parentPassword: ""
        });
      })
      .catch((error) => {
        setIsLoading(false);
        setApiErrors(error.message);
        console.error("Failed to submit settlement:", error);
      });
  };

  const { updatedAvailableChips, updatedCreditBalance } =
    calculateAvailableChips();

  return (
    <Modal show={show} onHide={() => setShow(false)} centered size="md">
      {apiLoading && (
        <div className="my-load">
          <div className="loader "></div>
        </div>
      )}
      <div className="white-bg p-3 br-10">
        <div className="d-flex flex-between align-items-center">
          <div className="d-flex flex-center medium-font green-font">
            Return Credit Chips
          </div>
          <div className="">
            <IoClose
              size={20}
              className="pointer"
              onClick={() => setShow(false)}
            />
          </div>
        </div>
        <div className="grey-border br-5 px-2 py-2 mt-2 small-font">
          {`${selectedUserId?.type == "1" ? "D" : "SA"} - ${selectedUserId?.name
            } - ${getLocationName(settleDetails?.currencyId)}`}
        </div>

        <ErrorComponent error={apiErrors} />

        <form onSubmit={handleSubmit}>
          <div className="row mt-3">
            <div className="col-4">
              <label className="small-font">Wallet Balance</label>
              <input
                type="number"
                placeholder="1000"
                className="all-none small-font input-css w-100"
                value={settleDetails?.avilChips || 0}
                readOnly
              />
            </div>
            <div className="col-4">
              <label className="small-font">Credit Balance</label>
              <input
                type="number"
                placeholder="1000"
                className="all-none input-css w-100 small-font"
                value={settleDetails?.creditBalance || 0}
                readOnly
              />
            </div>
            <div className="col-4">
              <label className="small-font">Profit/Loss</label>
              <input
                type="number"
                placeholder="1000"
                className="all-none input-css w-100 small-font"
                readOnly
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-6">
              <label className="small-font">After Wallet Bal.</label>
              <input
                type="number"
                placeholder="1000"
                className="all-none red-font input-css w-100 small-font"
                value={updatedAvailableChips}
                readOnly
              />
            </div>
            <div className="col-6">
              <label className="small-font">After Credit Bal.</label>
              <input
                type="number"
                placeholder="enter"
                className="all-none input-css small-font w-100"
                value={updatedCreditBalance}
                readOnly
              />
            </div>
          </div>
          <div className="col-12 mt-2">
            <label className="small-font">Enter Refund Credit Chips</label>
            <input
              type="text"
              placeholder="Enter"
              className={`all-none input-css w-100 small-font ${validationErrors.creditChips ? "is-invalid" : ""
                }`}
              value={creditChips}
              onChange={handleInputChange}
            />
            {validationErrors.creditChips && (
              <div className="text-danger small-font mt-1">
                {validationErrors.creditChips}
              </div>
            )}
          </div>
          <div className="col-12">
            <label className="small-font">Remarks</label>
            <textarea
              type="text"
              placeholder="remarks"
              className="all-none input-css small-font w-100"
              onChange={(e) => setRemark(e.target.value)}
              value={remark}
              rows={2}
            />
          </div>
          <div className="row">
            <div className="col-6">
              <label className="small-font">Enter Password</label>
              <div className={`input-bg d-flex br-5 px-2 flex-between border-grey3`}>
                <input
                  className={`all-none input-css4 p-1 w-100 small-font `}
                  type={pswdVisible ? "text" : "password"}
                  placeholder="Enter Password"
                  onChange={(e) => setParentPassword(e.target.value)}
                  value={parentPassword}
                />
                {pswdVisible ? (
                  <IoEye
                    className="black-font"
                    size={15}
                    onClick={() => setPswdVisible(false)}
                  />
                ) : (
                  <IoEyeOff
                    className="black-font"
                    size={15}
                    onClick={() => setPswdVisible(true)}
                  />
                )}
              </div>
              {validationErrors.parentPassword && (
                <div className="text-danger small-font mt-1">
                  {validationErrors.parentPassword}
                </div>
              )}
            </div>
            <div className="col-6 mt-4">
              <button
                type="submit"
                className="saffron-btn w-100 br-5 py-3 px-4 pointer small-font"
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
                    <span className="visually-hidden">Submitting...</span>
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ReturnCreditModal;