import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import {
  getSettlementSummeryById,
  returnCreditChips,
} from "../../api/apiMethods";
import { useSelector } from "react-redux";
import { IoEye, IoEyeOff, IoEyeOutline } from "react-icons/io5";
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

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (/^\d*$/.test(inputValue)) {
      const value = parseInt(inputValue, 10);

      const pendingCreditChips = settleDetails?.creditBalance;
      const walletBalance = settleDetails?.avilChips;

      if (walletBalance < pendingCreditChips) {
        setError(
          "Insufficient chips in wallet to return pending credit chips."
        );
        setCreditChips(0);
        return;
      }

      const cappedValue = Math.min(value, pendingCreditChips);

      if (value > pendingCreditChips) {
        setError(`Entered chips cannot exceed ${pendingCreditChips}`);
      } else {
        setError("");
      }

      setCreditChips(cappedValue ? cappedValue : 0);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const pendingCreditChips = settleDetails?.creditBalance;
    const walletBalance = settleDetails?.avilChips;

    if (walletBalance < pendingCreditChips) {
      setError("Insufficient chips in wallet to return pending credit chips.");
    }

    if (creditChips > pendingCreditChips) {
      setError(`Entered chips cannot exceed ${pendingCreditChips}`);
      return;
    }
    setIsLoading(true);
    const payload = {
      currency: settleDetails?.currencyId,
      walletBalance: settleDetails?.avilChips,
      creditBalance: settleDetails?.creditBalance,
      availBalance: settleDetails?.avilChips - settleDetails?.creditBalance,
      refundedAmount: Number(creditChips),
      remarks: remark,
      parentPassword: parentPassword,
    };

    returnCreditChips(selectedUserId.id, payload)
      .then((response) => {
        setSuccessPopupOpen(true);
        setIsLoading(false);
        getAllCreditUsersList();
        setShow(false);
        setDiscription("Credit Settled Successfully");
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
        <div className="grey-border br-5 px-2 py-1 mt-2 small-font">
          {`${selectedUserId?.type == "1" ? "D" : "SA"} - ${selectedUserId?.name
            } - ${getLocationName(settleDetails?.currencyId)}`}
        </div>
        {/* {apiErrors && (
          <div className="alert alert-danger pb-1">
            {Array.isArray(apiErrors) ? (
              <ul className="pb-1 ps-1">
                {apiErrors.map((error, index) => (
                  <li className="small-font" key={index}>
                    {error.message || error}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="small-font ps-1">
                {apiErrors.message || apiErrors}
              </p>
            )}
          </div>
        )} */}

        <ErrorComponent error={apiErrors} />

        <form onSubmit={handleSubmit}>
          {" "}
          {/* Add onSubmit handler to the form */}
          <div className="row mt-3">
            <div className="col-4">
              <label className="small-font">Wallet Balance</label>
              <input
                type="number"
                placeholder="1000"
                className="all-none small-font input-css w-100"
                value={settleDetails?.avilChips}
                readOnly
              />
            </div>
            <div className="col-4">
              <label className="small-font">Credit Balance</label>
              <input
                type="number"
                placeholder="1000"
                className="all-none input-css w-100 small-font"
                value={settleDetails?.creditBalance}
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
                placeholder="1000"
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
              placeholder="1000"
              className="all-none input-css w-100 small-font"
              value={creditChips}
              onChange={handleInputChange}
            />
            {error && <p className="text-danger small-font mt-1">{error}</p>}
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
          <div className="row ">
            {/* <div className="col-6">
              <label className="small-font">Enter Password</label>
              <input
                type="text"
                placeholder="password"
                className="all-none input-css w-100 small-font"
                onChange={(e) => setParentPassword(e.target.value)}
                value={parentPassword}
              />
            </div> */}

            <div className="col-6 ">
              <label className="small-font">Enter Password</label>
              <div className="input-bg d-flex br-5 py-2 px-2 flex-between border-grey3">
                <input
                  className="all-none input-css w-100 small-font"
                  type={pswdVisible ? "text" : "password"}
                  placeholder="Enter Password"
                  onChange={(e) => setParentPassword(e.target.value)}
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
            </div>
            <div className="col-6 mt-4">
              <button
                type="submit"
                className="saffron-btn w-100 br-5 py-1 px-4 pointer small-font"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="visually-hidden">Submiting...</span>
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* {successPopupOpen && (
        <SuccessPopup
          successPopupOpen={successPopupOpen}
          setSuccessPopupOpen={setSuccessPopupOpen}
          discription={discription}
        />
      )} */}
    </Modal>
  );
};

export default ReturnCreditModal;
