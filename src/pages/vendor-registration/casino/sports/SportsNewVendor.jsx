import React, { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp, FaArrowLeft } from "react-icons/fa";
import SuccessPopup from "../../../popups/SuccessPopup";
import Select from "react-select";
import { customStyles } from "../../../../components/ReactSelectStyles";
import {
  createVendor,
  getMarketOptions,
  getSportsListCentral,
  getVendorById,
  updateVendor,
} from "../../../../api/apiMethods";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import ErrorComponent from "../../../../components/ErrorComponent";

const SportsNewVendor = ({ isEdit, setIsEdit, vendorId, fetch }) => {
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
  const [positionDropdown, setPositionDropdown] = useState(false);
  const [positionMap, setPositionMap] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [statusMap, setStatusMap] = useState({});

  const handleDropdown = () => {
    setPositionDropdown(!positionDropdown);
  };

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
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setVendorName(value);
  };

  const handleCompany = (e) => {
    const value = e.target.value;
    setCompanyName(value);
  };

  const positions = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

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
    setPositionMap({});
    setError("");
  };

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
        setIsLoading(false);
        const data = response?.data;
        if (!data) return;

        setVendorName(data.vendorName || "");
        setCompanyName(data.vendorCompany || "");
        setMaxLoseAmtGame(data.maxLsAmtGame || "");

        const selectedSportOption = selectSports.find(
          (opt) => opt.value === data.vendorType
        );
        const selectedCountryOption = countryOptions.find(
          (opt) => opt.value === data.vendorCountry
        );
        const selectedAmtType = priceOptions.find(
          (opt) => opt.value === data.amountType
        );

        setSelectedSport(selectedSportOption || null);
        setSelectedCountry(selectedCountryOption || null);
        setAmtType(selectedAmtType || null);

        if (data.amountType === 1) {
          setMonthlyAmt(data.monthlyAmount || "");
          setBillingDate(data.billingDate || "");
        } else if (data.amountType === 2) {
          setPer(data.percentage || "");
        }

        const sports = [];
        const markets = {};
        const positions = {};
        const liveApis = {};
        const status = {};

        data?.vendorMarkets?.forEach((item) => {
          const matchedSport = sportsData.find(
            (sport) => sport.name === item.sportName
          );

          if (matchedSport) {
            const sportId = matchedSport.id;
            sports.push(sportId);

            markets[sportId] = item.providers.map((p) => p.prvId);

            positions[sportId] = {};
            if (!status[sportId]) status[sportId] = {};
            item.providers.forEach((p) => {
              positions[sportId][p.prvId] = p.position || 0;
              liveApis[p.prvId] = item.isLiveApi || 0;
              status[sportId][p.prvId] = p.status || 1;
            });
          }
        });

        setSelectedSports(sports);
        setSelectedMarkets(markets);
        setPositionMap(positions);
        setLiveApiStatusMap(liveApis);
        setStatusMap(status);
      })
      .catch((error) => {
        setIsLoading(false);
        const errMsg = error?.message;
        setError(Array.isArray(errMsg) ? errMsg : [errMsg]);
      });
  };

  useEffect(() => {
    if (sportsData?.length > 0 && isEdit && vendorId) {
      fetchAllVendorById();
    }
  }, [sportsData, vendorId, isEdit]);

  useEffect(() => {
    if (!isEdit) {
      setSelectedSports([]);
      setSelectedMarkets({});
      setPositionMap({});
      setLiveApiStatusMap({});
    }
  }, [isEdit]);

  const onSubmit = () => {
    const validationErrors = [];

    if (!selectedSport) validationErrors.push("Vendor Type is required.");
    if (!vendorName.trim()) validationErrors.push("Vendor Name is required.");
    if (!companyName.trim())
      validationErrors.push("Vendor Company is required.");
    if (!selecctedCountry) validationErrors.push("Vendor Country is required.");
    if (!selectedSports.length)
      validationErrors.push("At least one sport must be selected.");
    const allSelectedMarkets = Object.values(selectedMarkets).flat();
    if (allSelectedMarkets.length === 0) {
      validationErrors.push("At least one market must be selected.");
    }
    if (!maxLoseAmtGame)
      validationErrors.push("Max Lose Amount for Game is required.");

    if (!amtType) validationErrors.push("Amount Type is required.");

    if (amtType?.value === 1) {
      if (!monthlyAmt) validationErrors.push("Monthly Amount is required.");
      if (!billingDate) validationErrors.push("Billing Date is required.");
    } else if (amtType?.value === 2) {
      if (!per) validationErrors.push("Percentage value is required.");
    }
    const missingPositions = [];

    selectedSports.forEach((sportId) => {
      const markets = selectedMarkets[sportId] || [];
      markets.forEach((marId) => {
        const pos = positionMap[sportId]?.[marId];
        if (pos === undefined || pos === null || pos === "") {
          missingPositions.push(
            `Missing position for Sport ID: ${sportId}, Market ID: ${marId}`
          );
        }
      });
    });

    if (missingPositions.length > 0) {
      validationErrors.push("Position is required for selected markets.");
    }

    if (validationErrors.length > 0) {
      setError(validationErrors);
      return;
    }
    setError([]);

    const vendorMarkets = [];
    selectedSports.forEach((sportId) => {
      const marketId = Number(sportId.slice(8, -5));
      const markets = selectedMarkets[sportId] || [];

      markets.forEach((marId) => {
        vendorMarkets.push({
          marketId,
          prvId: marId,
          position: positionMap[sportId]?.[marId] || 0,
          isLiveApi: liveApiStatusMap[marId] || 0,
          ...(isEdit && {
            status: statusMap[sportId]?.[marId] || 1,
          }),
        });
      });
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
    const apiCall = isEdit
      ? updateVendor(vendorId, payload)
      : createVendor(payload);
    apiCall
      .then((response) => {
        if (response) {
          setMsg(response?.message);
          setLoading(false);
          setSuccessModal(true);
          setTimeout(() => {
            setSuccessModal(false);
            if (isEdit) {
              setIsEdit(false);
            }
          }, 3000);
          reset();
          fetch();
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

  const handleSelectMarket = (sportId, marketId, checked) => {
    setSelectedMarkets((prevSelectedMarkets) => {
      const updatedSelectedMarkets = { ...prevSelectedMarkets };
      if (checked) {
        updatedSelectedMarkets[sportId] = [
          ...(updatedSelectedMarkets[sportId] || []),
          marketId,
        ];
      } else {
        updatedSelectedMarkets[sportId] = updatedSelectedMarkets[
          sportId
        ].filter((id) => id !== marketId);
      }
      return updatedSelectedMarkets;
    });

    if (!checked) {
      const updatedMap = { ...liveApiStatusMap };
      delete updatedMap[marketId];
      setLiveApiStatusMap(updatedMap);
    }
  };

  const handleSelectPosition = (sportId, marketId, position) => {
    setPositionMap((prev) => {
      const current = prev[sportId]?.[marketId];

      if (current === position) {
        const updatedMarket = { ...prev[sportId] };
        delete updatedMarket[marketId];

        if (Object.keys(updatedMarket).length === 0) {
          const { [sportId]: _, ...rest } = prev;
          return rest;
        }

        return {
          ...prev,
          [sportId]: updatedMarket,
        };
      }

      return {
        ...prev,
        [sportId]: {
          ...prev[sportId],
          [marketId]: position,
        },
      };
    });
  };

  const handleSelectLiveApi = (sportId, marketId, status) => {
    setLiveApiStatusMap((prevStatusMap) => ({
      ...prevStatusMap,
      [marketId]: status,
    }));
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
                  className="rounded-pill px-2 py-1 border small-font flex-center black-text4 pointer"
                  onClick={() => setIsEdit(false)}
                >
                  <FaArrowLeft className="me-2 d-flex orange-clr pointer" />
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
                className="input-css small-font text-black w-100 "
                value={vendorName}
                onChange={handleVendorName}
              />
            </div>
            <div className="col-4 felx-column">
              <label className="small-font mb-1">Vendor Company</label>
              <input
                type="text"
                placeholder="Enter Vendor Company"
                className="input-css small-font text-black w-100  "
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
                      type="text"
                      inputMode="numeric"
                      className="all-none w-100"
                      placeholder="Enter amount"
                      value={maxLoseAmtGame}
                      maxLength={9}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (!/^\d*$/.test(val)) return;
                        if (val.startsWith("0")) return;
                        const num = Number(val);
                        if (num > 999999999) return;

                        setMaxLoseAmtGame(val);
                      }}
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
                  {amtType?.value === 2 ? (
                    <div className="input-css small-font text-balck w-50 mt-3">
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="Enter Percentage"
                        className="all-none"
                        value={per}
                        maxLength={5}
                        onChange={(e) => {
                          let val = e.target.value;

                          if (!/^\d*\.?\d{0,4}$/.test(val)) return;

                          if (val.startsWith(".")) {
                            val = "0" + val;
                          }

                          if (/^0\d+/.test(val)) return;

                          setPer(val);
                        }}
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
                          Amount
                        </div>
                        <input
                          type="text"
                          inputMode="numeric"
                          className="input-css small-font w-100"
                          placeholder="Enter Amount"
                          value={monthlyAmt}
                          maxLength={9}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (!/^\d*$/.test(val)) return;
                            if (val.startsWith("0")) return;
                            const num = Number(val);
                            if (num > 999999999) return;

                            setMonthlyAmt(val);
                          }}
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
          {selectedSports.length > 0 && (
            <div className="my-3 row text-black">
              <div className="col-4 flex-column">
                <div className="small-font mb-2">Select Providers</div>

                <div className="d-flex flex-column gap-3">
                  {selectedSports
                    .map((id) => sportsData.find((sport) => sport.id === id))
                    .filter(Boolean)
                    .map((sport) => (
                      <div key={sport.id} className="p-2 radius">
                        <div className="medium-font black-clr mb-2">
                          {sport.name}
                        </div>

                        {marketsData?.map((mar) => (
                          <div key={mar.id} className="mb-2">
                            <label className="input-css p-1 pointer flex-between w-100">
                              <div className="d-flex gap-2 align-items-center">
                                <input
                                  type="checkbox"
                                  className="me-2"
                                  checked={selectedMarkets[sport.id]?.includes(
                                    mar.id
                                  )}
                                  onChange={(e) => {
                                    handleSelectMarket(
                                      sport.id,
                                      mar.id,
                                      e.target.checked
                                    );
                                  }}
                                />
                                <span className="small-font">{mar.name}</span>
                              </div>
                              <div onClick={handleDropdown}>
                                {positionDropdown ? (
                                  <FaAngleUp />
                                ) : (
                                  <FaAngleDown />
                                )}
                              </div>
                            </label>

                            {selectedMarkets[sport.id]?.includes(mar.id) && (
                              <>
                                <div className="my-1 small-font">
                                  Select Position
                                </div>
                                <div className="d-flex gap-2 flex-wrap input-bg br-5 p-1 mb-3">
                                  {positions?.map((item, index) => (
                                    <div
                                      key={index}
                                      onClick={() =>
                                        handleSelectPosition(
                                          sport.id,
                                          mar.id,
                                          item
                                        )
                                      }
                                      className={`rounded-pill px-2 py-1 pointer small-font ${
                                        positionMap[sport.id]?.[mar.id] === item
                                          ? "saffron-bg white-font"
                                          : "white-bg black-clr"
                                      }`}
                                    >
                                      {item}
                                    </div>
                                  ))}
                                </div>

                                <div className="d-flex gap-2 align-items-center flex-between input-bg br-5 p-1 mb-3">
                                  <div className="small-font">
                                    Result Live Api
                                  </div>
                                  <div className="d-flex gap-3">
                                    <div
                                      className={`rounded-pill px-1 py-1 pointer small-font ${
                                        liveApiStatusMap[mar.id] === 1
                                          ? "saffron-bg white-font"
                                          : "white-bg black-clr"
                                      }`}
                                      onClick={() =>
                                        handleSelectLiveApi(sport.id, mar.id, 1)
                                      }
                                    >
                                      Yes
                                    </div>
                                    <div
                                      className={`rounded-pill px-2 py-1 pointer small-font ${
                                        liveApiStatusMap[mar.id] === 2
                                          ? "saffron-bg white-font"
                                          : "white-bg black-clr"
                                      }`}
                                      onClick={() =>
                                        handleSelectLiveApi(sport.id, mar.id, 2)
                                      }
                                    >
                                      No
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                </div>
              </div>

              <div className="col-4 felx-column text-black "></div>
              {isEdit === true ? (
                <div className="col-4 felx-column align-items-center text-black ">
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
                        <span className="ms-2">Update</span>
                      </>
                    ) : (
                      <div>Update</div>
                    )}
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
          )}

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
