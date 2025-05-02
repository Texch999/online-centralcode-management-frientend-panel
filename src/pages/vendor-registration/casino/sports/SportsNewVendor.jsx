import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import SuccessPopup from "../../../popups/SuccessPopup";
import Select from "react-select";
import { customStyles } from "../../../../components/ReactSelectStyles";
import {
  createVendor,
  getMarketOptions,
  getSportsListCentral,
  getVendorById,
} from "../../../../api/apiMethods";
import { useSelector } from "react-redux";
import e from "cors";
import { Spinner } from "react-bootstrap";
import ErrorComponent from "../../../../components/ErrorComponent";

const SportsNewVendor = ({ isEdit, setIsEdit,vendorId }) => {
  console.log(vendorId,"vendorId")
  
  const [successModal, setSuccessModal] = useState(false);
  const [vendorName, setVendorName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [sportsData, setSportsData] = useState([]);
  const [error, setError] = useState("");
  const allCountries = useSelector((item) => item?.allCountries);
  const [maxLoseAmtGame, setMaxLoseAmtGame] = useState(null);
  const [maxLoseAmtTable, setMaxLoseAmtTable] = useState(null);
  const [per, setPer] = useState(null);
  const [billingDate, setBillingDate] = useState("");
  const [selecctedCountry, setSelectedCountry] = useState(null);
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedMarkets, setSelectedMarkets] = useState([]);
  const [liveApiStatusMap, setLiveApiStatusMap] = useState({});
  const [selectedMarketsMap, setSelectedMarketsMap] = useState({});
  const [marketsData, setMarketsData] = useState([]);
  const [amount, setAmount] = useState(null);
  const [monthlyAmt, setMonthlyAmt] = useState(null);
  const [msg, setMsg] = useState("");
  const [loadng, setLoading] = useState(false);

  const path = window.location.pathname === "/sports-vendor-registration";

  const selectSports = [{ value: 1, label: "Sports" }];

  const priceOptions = [
    { value: 2, label: "Percentage" },
    { value: 1, label: "Price" },
  ];
  const [amtType, setAmtType] = useState(priceOptions[0]);
  const countryOptions = allCountries?.map((item) => ({
    value: item?.id,
    label: item?.name,
  }));

  const [selectedSport, setSelectedSport] = useState(
    path ? selectSports.find((opt) => opt.value === "sports") : null
  );
  const handleVendorName = (e) => {
    const value = e.target.value.replace(/[0-9]/g, "");
    setVendorName(value);
  };

  const handleCompany = (e) => {
    const value = e.target.value;
    setCompanyName(value);
  };

  const reset = () => {
    setVendorName("");
    setSelectedSport(null);
    setSelectedCountry(null);
    setCompanyName("");
    setAmtType(null);
    setMonthlyAmt("");
    setBillingDate("");
    setPer("");
    setMaxLoseAmtGame("");
    setSelectedMarkets([]);
    setLiveApiStatusMap({});
    setSelectedSports([]);
  };

  const [isLoading, setIsLoading] = useState(false);

  const getSports = () => {
    setIsLoading(true);
    getSportsListCentral()
      .then((response) => {
        if (response) {
          setIsLoading(false);
          setSportsData(response?.data);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error?.message);
      });
  };
  useEffect(() => {
    getSports();
  }, []);



  const fetchMarkets = () => {
    getMarketOptions()
      .then((response) => {
        if (response) {
          setMarketsData(response?.data);
        }
      })
      .catch((error) => {
        setError(error?.message);
      });
  };
  useEffect(() => {
    fetchMarkets();
  }, []);

  //get  by id
  const fetchAllVendorById = () => {
    setIsLoading(true);
    getVendorById(vendorId)
      .then((response) => {
        if (response) {
          setIsLoading(false);
          // setVendorsData(response?.data);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        const errMsg = error?.message;
        if (Array.isArray(errMsg)) {
          setError(errMsg);
        } else {
          setError([errMsg]);
        }
      });
  };
  useEffect(() => {
    fetchAllVendorById();
  }, [vendorId]);

  const onSubmit = () => {
    const vendorMarkets = selectedSports.map((sportId, index) => {
      const sport_id = Number(sportId.slice(8, -5));
      // Get all selectedMarkets that belong to this sport (if needed you can group marketsData by sportId first)
      const relatedMarkets = marketsData
        .filter((mar) => selectedMarkets.includes(mar.id))
        .map((mar) => ({
          prvId: mar.id,
        }));

      return {
        marketId: sport_id,
        position: 20,
        isLiveApi: liveApiStatusMap[sport_id],
        vendorOptions: relatedMarkets,
      };
    });
    const payload = {
      vendorName: vendorName,
      vendorType: selectedSport?.value,
      vendorCountry: selecctedCountry?.value,
      vendorCompany: companyName,
      amountType: amtType?.value,

      ...(amtType?.value === 1
        ? {
            monthlyAmount: monthlyAmt,
            billingDate: billingDate,
          }
        : {
            percentage: per,
          }),

      maxLsAmtGame: maxLoseAmtGame,
      vendorMarkets,
    };
    setLoading(true);
    createVendor(payload)
      .then((response) => {
        if (response) {
          setMsg(response?.message);
          setLoading(false);
          setSuccessModal(true);
          setTimeout(() => {
            setSuccessModal(false);
          }, 3000);
          reset();
        }
      })
      .catch((error) => {
        setLoading(false);
        const errMsg = error?.message;
        if (Array.isArray(errMsg)) {
          setError(errMsg);
        } else {
          setError([errMsg]);
        }
      });
  };

  return (
    <>
      {isLoading ? (
        <div className="spinner" style={{ zIndex: 1000 }}>
          {console.log("loading......")}
          <div className="spinner-circle"></div>
        </div>
      ) : (
        <div className="dashboard-white-bg box-shadow radius p-3">
          {isEdit === true && (
            <div className="d-flex flex-column">
              <div className="flex-start">
                <div
                  className="rounded-pill px-2 py-1 border small-font flex-center black-text4"
                  onClick={() => setIsEdit(false)}
                >
                  <FaArrowLeft className="me-2 d-flex orange-clr" />
                  Back
                </div>
              </div>
              <div className="dot-line-black my-3"></div>
            </div>
          )}
          {error && <ErrorComponent error={error} />}
          <div className="row text-black">
            <div className="col-4 felx-column">
              <label className="small-font mb-1">Vendor Type</label>
              <Select
                className="small-font"
                options={selectSports}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
                value={selectedSport}
                onChange={(selected) => setSelectedSport(selected)}
              />
            </div>
            <div className="col-4 felx-column">
              <label className="small-font mb-1">Vendor Name</label>
              <input
                type="text"
                placeholder="Enter Vendor Name"
                className="input-css small-font text-black w-100 pointer"
                value={vendorName}
                onChange={handleVendorName}
              />
            </div>
            <div className="col-4 felx-column">
              <label className="small-font mb-1">Vendor Company</label>
              <input
                type="text"
                placeholder="Enter Vendor Company"
                className="input-css small-font text-black w-100 pointer"
                value={companyName}
                onChange={handleCompany}
              />
            </div>
          </div>

          <div className="my-3 row text-black">
            <div className="col-4 felx-column">
              <div className="small-font mb-1">Select Sports</div>
              <div className="d-flex flex-wrap small-font">
                {sportsData?.map((item) => (
                  <label
                    htmlFor="ezugi"
                    className="input-css p-2 me-2 pointer flex-between mb-2"
                  >
                    <input
                      type="checkbox"
                      id={item?.id}
                      className="me-2"
                      checked={selectedSports.includes(item.id)}
                      onChange={(e) => {
                        const updated = e.target.checked
                          ? [...selectedSports, item.id]
                          : selectedSports.filter((id) => id !== item.id);
                        setSelectedSports(updated);
                      }}
                    />
                    <span>{item?.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="col-4 felx-column">
              <div className="d-flex flex-column">
                <div className="small-font mb-1">Vendor Country</div>

                <Select
                  className="small-font"
                  options={countryOptions}
                  placeholder="Select"
                  styles={customStyles}
                  maxMenuHeight={120}
                  menuPlacement="auto"
                  value={selecctedCountry}
                  onChange={(select) => setSelectedCountry(select)}
                />

                <div className="my-2">
                  <label className="small-font mb-1">
                    Max Loose Amount for Game
                  </label>
                  <div className="input-css small-font text-black">
                    <input
                      type="number"
                      className="all-none w-100"
                      placeholder="Enter amount"
                      value={maxLoseAmtGame}
                      onChange={(e) => setMaxLoseAmtGame(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-4 felx-column text-black ">
              <div className="d-flex flex-column">
                <div className="d-flex flex-between align-items-center w-100">
                  <div className="w-40 me-3">
                    <div className="small-font mb-1">Monthly Price/Per</div>
                    <Select
                      className="small-font"
                      options={priceOptions}
                      placeholder="Select"
                      styles={customStyles}
                      maxMenuHeight={120}
                      menuPlacement="auto"
                      value={amtType}
                      onChange={(val) => setAmtType(val)}
                    />
                  </div>
                  {amtType.value === 2 ? (
                    <div className="input-css small-font text-balck w-50 mt-3">
                      <input
                        type="number"
                        placeholder="Enter Price"
                        className="all-none"
                        value={per}
                        onChange={(e) => setPer(e.target.value)}
                      />
                    </div>
                  ) : (
                    <div className="w-60 flex-between">
                      <div className="w-40 me-1 ">
                        <div className="small-font mb-1">Billing Date</div>
                        <input
                          type="date"
                          className="input-css small-font w-100"
                          placeholder="Select date"
                          value={billingDate}
                          onChange={(e) => setBillingDate(e.target.value)}
                        />
                      </div>
                      <div className="">
                        <div className="small-font mb-1 white-space">
                          Mon Amount
                        </div>
                        <input
                          type="number"
                          className="input-css small-font w-100"
                          placeholder="Enter Amount"
                          value={monthlyAmt}
                          onChange={(e) => setMonthlyAmt(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="my-2">
                  <label className="small-font mb-1">
                    Max Loose Amount for Table
                  </label>
                  <div className="input-css small-font text-black">
                    <input
                      type="number"
                      className="all-none w-100"
                      placeholder="Enter amount"
                      value={maxLoseAmtTable}
                      onChange={(e) => setMaxLoseAmtTable(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="my-3 row text-black">
            <div className="col-4 felx-column">
              <div className="small-font mb-1">Select Provders</div>
              <div className="d-flex gap-2 flex-wrap">
                {selectedSports
                  .map((id) => sportsData.find((sport) => sport.id === id))
                  .filter(Boolean)
                  .map((sport) => (
                    <span key={sport.id} className="medium-font black-clr mb-1">
                      {sport.name}
                    </span>
                  ))}
              </div>

              <div className="d-flex flex-wrap small-font">
                {marketsData?.map((mar) => (
                  <div key={mar.id} className="w-100">
                    <label className="input-css p-2 me-2 pointer flex-between mb-2 w-100">
                      <input
                        type="checkbox"
                        className="me-2"
                        checked={selectedMarkets.includes(mar.id)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          if (checked) {
                            setSelectedMarkets([...selectedMarkets, mar.id]);
                          } else {
                            setSelectedMarkets(
                              selectedMarkets.filter((id) => id !== mar.id)
                            );
                            const updatedMap = { ...liveApiStatusMap };
                            delete updatedMap[mar.id];
                            setLiveApiStatusMap(updatedMap);
                          }
                        }}
                      />
                      <span>{mar?.name}</span>
                    </label>

                    {selectedMarkets.includes(mar.id) && (
                      <div className="d-flex gap-2 aign-items-center flex-between input-bg br-5 p-1 mb-3">
                        <div>Result Live Api</div>
                        <div className="d-flex gap-3">
                          <div
                            className={`rounded-pill px-2 py-1 pointer ${
                              liveApiStatusMap[mar.id] === 1
                                ? "saffron-bg white-font"
                                : "white-bg black-clr"
                            }`}
                            onClick={() =>
                              setLiveApiStatusMap({
                                ...liveApiStatusMap,
                                [mar.id]: 1,
                              })
                            }
                          >
                            Yes
                          </div>
                          <div
                            className={`rounded-pill px-2 py-1 pointer ${
                              liveApiStatusMap[mar.id] === 2
                                ? "saffron-bg white-font"
                                : "white-bg black-clr"
                            }`}
                            onClick={() =>
                              setLiveApiStatusMap({
                                ...liveApiStatusMap,
                                [mar.id]: 2,
                              })
                            }
                          >
                            No
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="col-4 felx-column text-black "></div>
            {isEdit === true ? (
              <div className="col-4 felx-column align-items-center text-black ">
                <div className="saffron-bg text-center white-font medium-font py-2 br-5 mx-2 my-2 pointer">
                  Update
                </div>
              </div>
            ) : (
              <div className="col-4 felx-column text-black">
                <div
                  className={`saffron-bg text-center white-font medium-font py-2 br-5 mx-2 my-2 pointer ${
                    loadng ? "disabled-btn" : ""
                  }`}
                  onClick={onSubmit}
                >
                  {loadng ? (
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
                </div>
              </div>
            )}
          </div>

          <SuccessPopup
            successPopupOpen={successModal}
            setSuccessPopupOpen={setSuccessModal}
            discription={msg}
          />
        </div>
      )}
    </>
  );
};

export default SportsNewVendor;
