import React, { useState, useEffect, useRef } from "react";
import {
  DirectorUpLinePaymentDetails,
  ownersAvailablePaymentsModes,
  DirectorAvailablePaymentsModes,
  managementPaymentDetails,
  DirectorWithdrawPaymentDetails,
} from "../../../src/api/apiMethods";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import NoDataFound from "./NoDataFound ";
import { useSelector } from "react-redux";
import AddPaymentGatewayPopup from "./popups/AddPaymentGatewayPopup";
import { useLocation } from "react-router-dom";
import DepositePopup from "../popups/DepositePopup";
import WithdrawPopup from "../popups/WithdrawPopup";
import PaymentModes from "../../components/PaymentModes";
import SuccessPopup from "../popups/SuccessPopup";

const AddNePaymentGateway = () => {
  const [error, setError] = useState(null);
  const currencyId = parseInt(localStorage.getItem("currency_id"));
  const [selectedCountryId, setSelectedCountryId] = useState(currencyId);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [paymentModes, setPaymentModes] = useState([]);
  const [AddPaymentGatewayModal, setOnAddPaymentGateway] = useState(false);
  const userRole = localStorage.getItem("role_code");
  const userId = localStorage.getItem("user_id");
  const [depositePopup, setDepositePopup] = useState(false);
  const [withdrawPopup, setWithdrawPopup] = useState(false);
  const [addpaymentId, setAddPaymentId] = useState();
  const [countryId, setCountryId] = useState(null);
  const [availablePaymentModeId, setAvailablePaymentModeId] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [offlinePaymentModes, setOfflinePaymentModes] = useState([]);
  const [combinedPaymentModes, setCombinedPaymentModes] = useState([]);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [discription, setDiscription] = useState("");
  const isInitialRendering = useRef(true);
  const location = useLocation();
  const { actionType } = location.state || {};

  const handleAddModal = (id, country, available_id) => {
    console.log("add paymnetdetails popup");
    setAddPaymentId(id);
    setCountryId(country);
    setOnAddPaymentGateway(true);
    setAvailablePaymentModeId(available_id);
  };
  const tabNames = [
    "All",
    "Bank Transfe",
    "E-Wallets",
    "QR Codes",
    "Cash",
    "Payment Gateway",
  ];
  const modes = [
    { title: "Bank Transfer", mode: 1 },
    { title: "E-Wallets", mode: 2 },
    { title: "QR Codes", mode: 3 },
    { title: "Cash", mode: 4 },
    { title: "Payment Gateway", mode: 5 },
  ];
  const getOwnersPaymentModes = () => {
    let fetchPaymentModes = null;

    if (userRole === "director") {
      if (actionType === "Deposit") {
        fetchPaymentModes = managementPaymentDetails();
      } else if (actionType === "Withdraw") {
        fetchPaymentModes = DirectorWithdrawPaymentDetails(userId);
      }
    }

    if (fetchPaymentModes) {
      fetchPaymentModes
        .then((response) => {
          setPaymentModes(response?.data);
        })
        .catch((error) => {
          setError(error?.message);
          console.log("getDirectorAccountDetails error", error);
        });
    } else {
      console.log("No valid fetch function executed");
    }
  };

  const OfflineModesdata = () => {
    let fetchPaymentModes;
    if (userRole === "director") {
      fetchPaymentModes = DirectorAvailablePaymentsModes();
    } else {
      fetchPaymentModes = ownersAvailablePaymentsModes();
    }
    setLoading(true);
    fetchPaymentModes
      .then((response) => {
        setOfflinePaymentModes(response?.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error?.message);
        console.log("getDirectorAccountDetails error", error);
      });
  };
  useEffect(() => {
    OfflineModesdata();
    getOwnersPaymentModes();
  }, []);

  useEffect(() => {
    if (offlinePaymentModes.length > 0 && paymentModes.length > 0) {
      const combinedData = offlinePaymentModes.flatMap((offlineMode) => {
        // Extract the numeric payment_mode_id from offlineMode.id
        const slicedId = Number(offlineMode.id.slice(3, -3));

        // Find all paymentModes that match the slicedId
        const matchingPaymentModes = paymentModes.filter(
          (paymentMode) => paymentMode.payment_mode_id === slicedId
        );

        // If matching records exist, merge them, otherwise keep offlineMode as is
        return matchingPaymentModes.length > 0
          ? matchingPaymentModes.map((paymentMode) => ({
              ...offlineMode,
              ...paymentMode,
              isEnabled: true,
            }))
          : [{ ...offlineMode, isEnabled: false }];
      });

      setCombinedPaymentModes(combinedData);
    }
  }, [offlinePaymentModes, paymentModes]);

  const allCountries = useSelector((item) => item?.allCountries);
  const formattedCountries = allCountries.map((country) => ({
    value: country.id,
    label: `${country.name} - ${country.currency_symbol} ${country.currency_name}`,
  }));

  const asignData =
    actionType === "Deposit" || actionType === "Withdraw"
      ? combinedPaymentModes
      : offlinePaymentModes;

  const filteredPaymentModes = asignData?.filter(
    (mode) => mode.country_id === selectedCountryId
  );

  const hasNoRecords = filteredPaymentModes.length === 0;

  const handleDepositAndWithdraw = (paymentDetails) => {
    if (actionType === "Deposit") {
      setDepositePopup(true);
      setSelectedPayment(paymentDetails);
    } else if (actionType === "Withdraw") {
      setWithdrawPopup(true);
      setSelectedPayment(paymentDetails);
    }
  };

  const handleSuccessPopupOpen = () => {
    setSuccessPopupOpen(true);
  };
  
  return (
    <>
      {loading ? (
        <div className="spinner" style={{ zIndex: 1000 }}>
          {console.log("loading......")}
          <div className="spinner-circle"></div>
        </div>
      ) : (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3 mt-2">
            <div className="yellow-font medium-font mb-0">Add New Gateway</div>

            <div
              className="d-flex align-items-center back-btn-bg me-3 py-1 px-3 white-clr pointer"
              onClick={() => window.history.back()}
            >
              <span className="small-font" style={{ color: "#fff" }}>
                Back
              </span>
            </div>
          </div>
          <div className="mt-2 min-h-screen bg-white rounded-md ps-2 pb-4">
            <div className="row mb-3">
              <div className="col-3">
                <label htmlFor="paymentMethod" className="medium-font mb-1">
                  Currency
                </label>
                <Select
                  className="small-font text-capitalize"
                  options={formattedCountries}
                  placeholder="Select"
                  styles={customStyles}
                  maxMenuHeight={300}
                  menuPlacement="auto"
                  value={formattedCountries.find(
                    (option) => option.value === selectedCountryId
                  )}
                  onChange={(selected) => setSelectedCountryId(selected.value)}
                  formatOptionLabel={(option) => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        textTransform: "text-capitalize",
                      }}
                    >
                      <span>{option.label.split(" - ")[0]}</span>
                      <span>{option.label.split(" - ")[1]}</span>
                    </div>
                  )}
                />
              </div>
            </div>

            {hasNoRecords ? (
              <NoDataFound />
            ) : (
              <>
                <div className="d-flex justify-content-start ms-3">
                  <div className="row mb-2 gap-2">
                    {tabNames.map((tabName, index) => (
                      <div
                        key={index}
                        className={`border col text-center py-2 medium-font fw-600 text-nowrap ${
                          selectedTab === index ? "saffron-btn2 px2" : "rounded"
                        }`}
                        style={{ cursor: "pointer" }}
                        onClick={() => setSelectedTab(index)}
                      >
                        {tabName}
                      </div>
                    ))}
                  </div>
                </div>

                <PaymentModes
                  modes={modes}
                  filteredPaymentModes={filteredPaymentModes}
                  userRole={userRole}
                  actionType={actionType}
                  handleDepositAndWithdraw={handleDepositAndWithdraw}
                  handleAddModal={handleAddModal}
                  selectedTab={selectedTab}
                />
              </>
            )}
          </div>

          {AddPaymentGatewayModal && (
            <AddPaymentGatewayPopup
              show={AddPaymentGatewayModal}
              setOnAddPaymentGateway={() => setOnAddPaymentGateway(false)}
              addpaymentId={addpaymentId}
              setAddPaymentId={setAddPaymentId}
              countryId={countryId}
              setCountryId={setCountryId}
              availablePaymentModeId={availablePaymentModeId}
              setAvailablePaymentModeId={setAvailablePaymentModeId}
              setDiscription={setDiscription}
              setSuccessPopupOpen={setSuccessPopupOpen}


              // show={AddPaymentGatewayModal}
              // setOnAddPaymentGateway={() => setOnAddPaymentGateway(false)}
              // addpaymentId={addpaymentId}
              // setAddPaymentId={setAddPaymentId}
              // countryId={countryId}
              // setCountryId={setCountryId}
              // availablePaymentModeId={availablePaymentModeId}
              // setAvailablePaymentModeId={setAvailablePaymentModeId}
              // setDiscription={setDiscription}
              // setSuccessPopupOpen={setSuccessPopupOpen}

            />
          )}

          {actionType === "Deposit" && depositePopup && (
            <DepositePopup
              setDepositePopup={setDepositePopup}
              depositePopup={depositePopup}
              actionType={actionType}
              selectedPayment={selectedPayment}
              handleSuccessPopupOpen={handleSuccessPopupOpen}
              setDiscription={setDiscription}
            />
          )}

          {actionType === "Withdraw" && withdrawPopup && (
            <WithdrawPopup
              setWithdrawPopup={setWithdrawPopup}
              withdrawPopup={withdrawPopup}
              actionType={actionType}
              selectedPayment={selectedPayment}
              handleSuccessPopupOpen={handleSuccessPopupOpen}
              setDiscription={setDiscription}
              setSuccessPopupOpen={setSuccessPopupOpen}
            />
          )}

          {successPopupOpen && (
            <SuccessPopup
              successPopupOpen={successPopupOpen}
              setSuccessPopupOpen={setSuccessPopupOpen}
              discription={discription}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AddNePaymentGateway;
