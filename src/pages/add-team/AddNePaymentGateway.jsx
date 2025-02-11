import React, { useState, useEffect, useRef } from "react";
import { ownersAvailablePaymentsModes } from "../../../src/api/apiMethods";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import NoDataFound from "./NoDataFound ";
import { useSelector } from "react-redux";
import { imgUrl } from "../../api/baseUrl";
import AddPaymentGatewayPopup from "./popups/AddPaymentGatewayPopup";

const AddNePaymentGateway = () => {
  const [error, setError] = useState(null);
  const [selectedCountryId, setSelectedCountryId] = useState(107);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [paymentModes, setPaymentModes] = useState([]);
  const [AddPaymentGatewayModal, setAddPaymentGatewayModal] = useState(false);
  const modes = [
    { title: "Bank Transfer", mode: 1 },
    { title: "E-Wallets", mode: 2 },
    { title: "QR Codes", mode: 3 },
    { title: "Cash", mode: 4 },
    { title: "Payment Gateway", mode: 5 },
  ];
  const tabNames = ["Offline Payment Modes", "Payment Gateway"];

  const getOwnersPaymentModes = () => {
    setLoading(true);
    ownersAvailablePaymentsModes()
      .then((response) => {
        console.log("getDirectorAccountDetails success", response.data);
        setPaymentModes(response.data);
      })
      .catch((error) => {
        setError(error?.message);
        console.log("getDirectorAccountDetails error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const initialRendering = useRef(true);
  useEffect(() => {
    if (initialRendering) {
      initialRendering.current = false;
    }
    getOwnersPaymentModes();
  }, []);

  const allCountries = useSelector((item) => item?.allCountries);

  const formattedCountries = allCountries.map((country) => ({
    value: country.id,
    label: `${country.name} - ${country.currency_symbol} ${country.currency_name}`,
  }));
  const filteredPaymentModes = paymentModes.filter(
    (mode) => mode.country_id === selectedCountryId
  );
  const hasNoRecords = filteredPaymentModes.length === 0;
  return (
    <div>
      <div className="row justify-content-between align-items-center mb-3 mt-2">
        <h6 className="col-2 yellow-font medium-font mb-0">Add New Gateway</h6>
      </div>

      <div className="mt-2 min-h-screen bg-white rounded-md ms-3 ps-2">
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
                      selectedTab === index ? "saffron-btn2 " : ""
                    }`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedTab(index)}
                  >
                    {tabName}
                  </div>
                ))}
              </div>
            </div>

            {modes
              .filter(({ mode }) =>
                selectedTab === 0 ? mode !== 5 : mode === 5
              )
              .map(({ title, mode }) => {
                const filteredPayments = filteredPaymentModes?.filter(
                  (card) => card.avil_modes === mode
                );
                return (
                  filteredPayments.length > 0 && (
                    <div className="mb-3" key={mode}>
                      <h1 className="large-font fw-600">{title}</h1>
                      <div className="row g-1">
                        {filteredPayments.map((card) => (
                          <div key={card.id} className="col-2">
                            <div className="card h-100">
                              <div
                                className="card-img-top d-flex align-items-center justify-content-center"
                                style={{
                                  height: "80%",
                                  overflow: "hidden",
                                  backgroundColor: "#F5F7FF",
                                }}
                              >
                                <img
                                //   onClick={() =>
                                //     setAddPaymentGatewayModal(true)
                                //   }
                                  src={`${imgUrl}/offlinepaymentsMode/${card?.image}`}
                                  alt={card.name}
                                  className="w-60 h-100"
                                  style={{
                                    objectFit: "contain",
                                    objectPosition: "center",
                                  }}
                                />
                              </div>
                              <div
                                className="card-body d-flex align-items-center justify-content-center tag-bg"
                                style={{
                                  height: "20%",
                                  color: "#fff",
                                }}
                              >
                                <span className="text-center large-font">
                                  {card.name}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                );
              })}
          </>
        )}
      </div>

      <AddPaymentGatewayPopup
        show={AddPaymentGatewayModal}
        onHide={() => setAddPaymentGatewayModal(false)}
      />
    </div>
  );
};

export default AddNePaymentGateway;
