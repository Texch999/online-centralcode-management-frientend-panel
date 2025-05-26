import { Modal, Spinner } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";
import { vendorPayment } from "../../api/apiMethods";
import { useState } from "react";
import { useSelector } from "react-redux";

const VendorPaymentModal = ({
  vendorPaymentModal,
  setVendorPaymentModal,
  data,
}) => {
  const [error, setError] = useState("");
  const allCountries = useSelector((item) => item?.allCountries);
  const [loading, setLoading] = useState(false);
  const handleCancel = () => {
    setVendorPaymentModal(false);
  };

  const [vendorName, setVendorName] = useState("");
  const [vendorType, setVendorType] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [paymentMode, setPaymentMode] = useState("");
  const [currencyAmount, setCurrencyAmount] = useState(0);
  const [inrAmount, setInrAmount] = useState(0);
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
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error?.message);
      });
  };
  return (
    <Modal show={vendorPaymentModal} centered size="md">
      <Modal.Body>
        <div className="flex-between black-text4">
          <h6 className="fw-600 mb-0">Vendor Payment</h6>
          <IoCloseSharp size={20} onClick={handleCancel} />
        </div>
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
              onChange={handleVendorChange}
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
                {selectedVendor?.balanceAmount || 0}{" "}
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
              <div>100000000 INR</div>
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
              placeholder="Enter"
              value={currencyAmount}
              onChange={(e) => {
                const amt = parseFloat(e.target.value) || 0;
                setCurrencyAmount(amt);
                const fullCurrency = allCountries.find(
                  (c) => c.id === currency.value
                );
                if (amt && fullCurrency?.exchange) {
                  const inr = currencyConvert(amt, 1, fullCurrency.exchange);
                  setInrAmount(inr);
                }
              }}
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
                  <span className="ms-2">Update</span>
                </>
              ) : (
                <div>Submit</div>
              )}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default VendorPaymentModal;
