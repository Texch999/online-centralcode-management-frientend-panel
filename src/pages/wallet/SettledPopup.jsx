import { Modal, Spinner } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";
import { getPyamentById, updatePayment } from "../../api/apiMethods";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ErrorComponent from "../../components/ErrorComponent";
import SuccessPopup from "../popups/SuccessPopup";
import { resolvePath } from "react-router-dom";

function SettledPopup({
  setteledPopupOpen,
  setSettledPopupOpen,
  editPaymentId,
  settledName,
  venId,
}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [paymentMode, setPaymentMode] = useState("");
  const [currencyAmount, setCurrencyAmount] = useState("");
  const [inrAmount, setInrAmount] = useState("");
  const [originalData, setOriginalData] = useState({});
  const [hasAmountEdited, setHasAmountEdited] = useState(false);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const handleCurrencyAmountChange = (e) => {
    setCurrencyAmount(e.target.value);
    setHasAmountEdited(true);
  };

  const allCountries = useSelector((item) => item?.allCountries);
  const handleCancel = () => {
    setSettledPopupOpen(false);
  };
  const currencyConvert = (amount, firstCur, secCur) => {
    const secFin =
      (parseFloat(amount) / parseFloat(firstCur)) * parseFloat(secCur);
    return secFin;
  };

  const countryOptions = allCountries?.map((item, index) => ({
    value: item?.id,
    label: `${item?.name} - ${item?.currency_name} - ${item?.currency_symbol}`,
    exchange: item?.exchange,
  }));

  useEffect(() => {
    if (hasAmountEdited && currencyAmount && selectedCurrency?.exchange) {
      const converted = currencyConvert(
        currencyAmount,
        selectedCurrency.exchange,
        1
      );
      setInrAmount(converted.toFixed(2));
    }
  }, [currencyAmount, selectedCurrency, hasAmountEdited]);

  //get ayment details
  const fetchpaymentById = () => {
    setLoading(true);
    getPyamentById(editPaymentId)
      .then((response) => {
        if (response) {
          setLoading(false);
          const data = response?.data;
          setOriginalData(data);
          setSelectedCurrency(
            countryOptions.find((c) => c.value === data.currency) || null
          );
          setPaymentMode(data.paymentMode || "");
          setCurrencyAmount(data.amount || "");
          setInrAmount(data.inrAmount || "");
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error?.message);
      });
  };
  useEffect(() => {
    fetchpaymentById();
  }, [editPaymentId]);
  const wholeInr = Math.round(inrAmount);

  const onUpdate = () => {
    const payload = {
      currency: selectedCurrency?.value,
      paymentMode: paymentMode,
      amount: currencyAmount,
      inrAmount: wholeInr,
    };

    if (Object.keys(payload).length === 0) {
      setError("No changes detected.");
      return;
    }
    setError("");
    setLoad(true);
    updatePayment({ venId, editPaymentId }, payload)
      .then((response) => {
        setLoad(false);
        if (response) {
          setSettledPopupOpen(false);
          setMsg(response?.message);
          setSuccessPopupOpen(true);
          setTimeout(() => {
            setSuccessPopupOpen(false);
          }, 3000);
          fetchpaymentById();
        }
      })
      .catch((error) => {
        setLoad(false);
        setError(error?.message);
      });
  };

  return (
    <>
      {loading ? (
        <div className="spinner">
          <div className="spinner-circle"></div>
        </div>
      ) : (
        <Modal show={setteledPopupOpen} centered size="md">
          <Modal.Body>
            <div className="flex-between black-text4">
              <h6 className="fw-600 mb-0">{`Settled - ${settledName}`}</h6>
              <IoCloseSharp size={20} onClick={handleCancel} />
            </div>
            <ErrorComponent error={error} />
            <div className="row small-font mb-3">
              <div className="col-6 flex-column mt-3">
                <label className="mb-1 black-text4">Select Currency</label>
                <Select
                  className="small-font"
                  options={countryOptions}
                  placeholder="Select"
                  styles={customStyles}
                  maxMenuHeight={120}
                  menuPlacement="auto"
                  value={selectedCurrency}
                  // onChange={(option) => setSelectedCurrency(option)}
                  isDisabled={true}
                />
              </div>
              <div className="col-6 flex-column mt-3">
                <label className="mb-1 black-text4">Payment Mode</label>
                <input
                  className="input-bg rounded p-2 grey-font all-none"
                  type="text"
                  placeholder="Enter"
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                />
              </div>
              <div className="col-6 flex-column mt-3">
                <label className="mb-1 black-text4">Currency</label>
                <input
                  className="input-bg rounded p-2 grey-font all-none"
                  type="number"
                  placeholder="Currency Amount"
                  value={currencyAmount}
                  // onChange={(e) => setCurrencyAmount(e.target.value)}
                  onChange={handleCurrencyAmountChange}
                />
              </div>
              <div className="col-6 flex-column mt-3">
                <label className="mb-1 black-text4">Amount in INR</label>
                <input
                  className="input-bg rounded p-2 grey-font all-none"
                  type="number"
                  placeholder="INR Amount"
                  value={inrAmount}
                  // onChange={(e) => setInrAmount(e.target.value)}
                  disabled
                />
              </div>

              <div className="col-12 mt-3 d-flex align-items-end justify-content-end">
                <button
                  className={`w-100 saffron-btn2 small-font ${
                    load ? "disabled-btn" : ""
                  }`}
                  onClick={onUpdate}
                >
                  {load ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span className="ms-2">Update</span>
                    </>
                  ) : (
                    <div>Update</div>
                  )}
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}

      {successPopupOpen && (
        <SuccessPopup
          successPopupOpen={successPopupOpen}
          setSuccessPopupOpen={setSuccessPopupOpen}
          discription={msg}
        />
      )}
    </>
  );
}

export default SettledPopup;
