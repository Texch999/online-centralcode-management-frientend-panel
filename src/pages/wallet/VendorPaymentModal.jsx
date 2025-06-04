import { Modal, Spinner } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";
import { settleVendorById, vendorPayment } from "../../api/apiMethods";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ErrorComponent from "../../components/ErrorComponent";
import SuccessPopup from "../popups/SuccessPopup";

const VendorPaymentModal = ({
  vendorPaymentModal,
  setVendorPaymentModal,
  data,
  fetchVendorData,
  isSettledId,
  setIsSettledId,
  vName,
}) => {
  const [error, setError] = useState("");
  const allCountries = useSelector((item) => item?.allCountries);
  const [loading, setLoading] = useState(false);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const handleCancel = () => {
    setError("");
    setVendorPaymentModal(false);
    setSelectedVendor(null);
    setVendorName("");
    setVendorType(null);
    setCurrency(null);
    setPaymentMode("");
    setCurrencyAmount(0);
    setInrAmount(0);
    setVendorCurr(null);
  };

  const [vendorName, setVendorName] = useState("");
  const [vendorType, setVendorType] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [paymentMode, setPaymentMode] = useState("");
  const [currencyAmount, setCurrencyAmount] = useState(null);
  const [inrAmount, setInrAmount] = useState(null);
  const [settleData, setSettleData] = useState([]);
  const vendorsList = data?.map((ven, index) => ({
    value: ven?.id,
    label: ven?.vendorName,
  }));
  const selectOptions = [
    { value: 1, label: "Sports" },
    { value: 2, label: "Casino" },
  ];
  const countryOptions = allCountries?.map((item, index) => ({
    value: item?.id,
    label: `${item?.name} - ${item?.currency_name} - ${item?.currency_symbol}`,
    exchange: item?.exchange,
  }));

  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendorCurr, setVendorCurr] = useState(null);

  const handleVendorChange = (selected) => {
    const vendor = data.find((v) => v.id === selected.value);
    setSelectedVendor(vendor);
    setVendorName(selected.label);
    setVendorType(vendor.vendorType);
    setVendorCurr(vendor?.currency);

    const matchedCurrency = allCountries.find((c) => c.id === vendor?.currency);
    if (matchedCurrency) {
      setCurrency({
        value: matchedCurrency.id,
        label: `${matchedCurrency.name} - ${matchedCurrency.currency_name} - ${matchedCurrency.currency_symbol}`,
      });
    } else {
      setCurrency(null);
    }
  };

  const currencyConvert = (amount, firstCur, secCur) => {
    const secFin =
      (parseFloat(amount) / parseFloat(firstCur)) * parseFloat(secCur);
    return secFin;
  };

  const wholeInr = Math.round(inrAmount);
  //vendor payment
  const submitVendorPayment = () => {
    if (!selectedVendor || !selectedVendor.id) {
      setError("Please select a vendor.");
      return;
    }
    if (!vendorType) {
      setError("Please select a vendor type.");
      return;
    }
    if (!currency || !currency.value) {
      setError("Please select a currency.");
      return;
    }
    if (!paymentMode) {
      setError("Please select a payment mode.");
      return;
    }
    if (!currencyAmount || isNaN(currencyAmount)) {
      setError("Please enter a valid currency amount.");
      return;
    }
    if (!wholeInr || isNaN(wholeInr)) {
      setError("Please enter a valid INR amount.");
      return;
    }

    // Clear any previous error
    setError("");
    const payload = {
      venId: selectedVendor?.id,
      vendorType: vendorType,
      currency: currency?.value,
      paymentMode: paymentMode,
      amount: currencyAmount,
      inrAmount: wholeInr,
    };

    setLoading(true);
    vendorPayment(payload)
      .then((response) => {
        if (response) {
          setLoading(false);
          setMsg(response?.message);
          setSuccessPopupOpen(true);
          setVendorPaymentModal(false);
          setTimeout(() => {
            setSuccessPopupOpen(false);
          }, 2000);
          setError("");
          setSelectedVendor(null);
          setVendorName("");
          setVendorType(null);
          setCurrency(null);
          setPaymentMode("");
          setCurrencyAmount(null);
          setInrAmount(null);
          setVendorCurr(null);
          fetchVendorData();
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error?.message);
      });
  };

  // const fetchVendorSettleById = (isSettledId) => {
  //   settleVendorById(isSettledId)
  //     .then((resposne) => {
  //       if (resposne) {
  //         setSettleData(resposne?.data);
  //       }
  //     })
  //     .catch((error) => {
  //       setError(error?.message);
  //     });
  // };
  useEffect(() => {
    if (isSettledId && allCountries?.length > 0) {
      settleVendorById(isSettledId)
        .then((response) => {
          if (response?.data) {
            const vendor = response.data;

            // Set all form fields
            setSelectedVendor(vendor);
            setVendorName(vendor.vendorName);
            setVendorType(vendor.vendorType);
            setVendorCurr(vendor.currency);

            // Set currency dropdown value
            const matchedCurrency = allCountries.find(
              (c) => c.id === vendor.currency
            );
            if (matchedCurrency) {
              setCurrency({
                value: matchedCurrency.id,
                label: `${matchedCurrency.name} - ${matchedCurrency.currency_name} - ${matchedCurrency.currency_symbol}`,
              });
            } else {
              setCurrency(null);
            }
          }
        })
        .catch((error) => {
          setError(error?.message || "Failed to fetch vendor.");
        });
    }
  }, [isSettledId, allCountries]);

  return (
    <>
      <Modal show={vendorPaymentModal} centered size="md">
        <Modal.Body>
          <div className="flex-between black-text4">
            <h6 className="fw-600 mb-0">{` ${
              isSettledId
                ? `Settle Vendor Payemnt - ${vName}`
                : "Vendor Payment"
            } `}</h6>

            <IoCloseSharp
              size={20}
              onClick={handleCancel}
              className="pointer"
            />
          </div>
          <ErrorComponent error={error} />
          <div className="row small-font mb-3">
            <div className="col-6 flex-column mt-3">
              <label className="mb-1 black-text4">Select Vendor</label>
              <Select
                className="small-font"
                options={vendorsList}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
                value={vendorsList.find((v) => v.value === selectedVendor?.id)}
                onChange={handleVendorChange}
                isDisabled={!!isSettledId}
              />
            </div>
            <div className="col-6 flex-column mt-3">
              <label className="mb-1 black-text4">Select Type</label>
              <Select
                className="small-font"
                options={selectOptions}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
                value={selectOptions.find((opt) => opt.value === vendorType)}
                isDisabled
              />
            </div>
            <div className="col-12 mt-3">
              <div className="input-css d-flex flex-between border-orange">
                <div>Wallet Bal</div>
                <div>
                  {selectedVendor?.totalAmount || 0}{" "}
                  {
                    allCountries.find((c) => c.id === selectedVendor?.currency)
                      ?.currency_symbol
                  }
                </div>
              </div>
            </div>
            <div className="col-12 mt-3">
              <div className="input-css d-flex flex-between border-orange">
                <div>Pending Bal</div>
                <div>
                  {" "}
                  {selectedVendor?.balanceAmount || 0}{" "}
                  {
                    allCountries.find((c) => c.id === selectedVendor?.currency)
                      ?.currency_symbol
                  }
                </div>
              </div>
            </div>
            <div className="col-6 flex-column mt-3 ">
              <label className="mb-1 black-text4">Select Currency</label>
              <Select
                className="small-font"
                options={countryOptions}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
                value={currency}
                onChange={(selected) => {
                  setCurrency(selected);
                }}
                isDisabled
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
              <label className="mb-1 black-text4">Currency Amt</label>
              <input
                className="input-bg rounded p-2 grey-font all-none"
                type="text"
                placeholder="Enter amount"
                maxLength={11}
                value={currencyAmount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "") {
                    setCurrencyAmount("");
                    setInrAmount("");
                    return;
                  }

                  const amt = parseFloat(value);
                  setCurrencyAmount(amt);

                  const fullCurrency = allCountries.find(
                    (c) => c.id === currency.value
                  );
                  if (!isNaN(amt) && fullCurrency?.exchange) {
                    const inr = currencyConvert(amt, 1, fullCurrency.exchange);
                    setInrAmount(inr);
                  }
                }}

                // onChange={(e) => {
                //   const amt = parseFloat(e.target.value);
                //   setCurrencyAmount(amt);
                //   const fullCurrency = allCountries.find(
                //     (c) => c.id === currency.value
                //   );
                //   if (amt && fullCurrency?.exchange) {
                //     const inr = currencyConvert(amt, 1, fullCurrency.exchange);
                //     setInrAmount(inr);
                //   }
                // }}
              />
            </div>
            <div className="col-6 flex-column mt-3">
              <label className="mb-1 black-text4">Amount in INR</label>
              <input
                className="input-bg rounded p-2 grey-font all-none"
                type="text"
                placeholder="Amt in Inr"
                value={inrAmount}
                readOnly
              />
            </div>
            <div className="col-12 mt-3 d-flex align-items-end justify-content-end">
              <button
                type="submit"
                disabled={loading}
                className={`w-100 saffron-btn2 small-font ${
                  loading ? "disabled-btn" : ""
                }`}
                onClick={submitVendorPayment}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="ms-2">Submit</span>
                  </>
                ) : (
                  <div>Submit</div>
                )}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {successPopupOpen && (
        <SuccessPopup
          successPopupOpen={successPopupOpen}
          setSuccessPopupOpen={setSuccessPopupOpen}
          discription={msg}
        />
      )}
    </>
  );
};

export default VendorPaymentModal;
