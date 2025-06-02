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
  console.log(error, "errorrrrrrrr");
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
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [errors, setErrors] = useState("");
  const [dropdownMap, setDropdownMap] = useState({});

  // const handleDropdown = () => {
  //   setPositionDropdown(!positionDropdown);
  // };

  const path = window.location.pathname === "/sports-vendor-registration";

  const selectSports = [{ value: 1, label: "Sports" }];

  const priceOptions = [
    { value: 2, label: "Percentage" },
    { value: 1, label: "Price" },
  ];
  const [amtType, setAmtType] = useState(priceOptions[0]);
  // const countryOptions = allCountries?.map((item) => ({
  //   value: item?.id,
  //   label: item?.name,
  // }));

  const countryOptions = allCountries?.map((item) => ({
    value: item?.id,
    label: item?.name,
  }));

  const currencyOptions = allCountries?.map((item) => ({
    value: item?.id,
    label: item?.currency_name,
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
    setSelectedCurrency(null);
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
    setError([]);
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
        // setErrors(error?.message);
        const errMsg = error?.message;
        setErrors(Array.isArray(errMsg) ? errMsg : [errMsg]);
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
        // setErrors(error?.message);
        const errMsg = error?.message;
        setErrors(Array.isArray(errMsg) ? errMsg : [errMsg]);
      });
  };
  useEffect(() => {
    fetchMarkets();
  }, []);

  const [dataById, setDataById] = useState([]);

  //get  by id
  const fetchAllVendorById = () => {
    setIsLoading(true);
    getVendorById(vendorId)
      .then((response) => {
        setIsLoading(false);
        setDataById(response?.data);
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
        const selectedCurrencyOption = currencyOptions.find(
          (opt) => opt.value === data.currency
        );

        setSelectedSport(selectedSportOption || null);
        setSelectedCountry(selectedCountryOption || null);
        setSelectedCurrency(selectedCurrencyOption || null);
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
            if (!liveApis[sportId]) liveApis[sportId] = {};
            item.providers.forEach((p) => {
              positions[sportId][p.prvId] = p.position;
              // liveApis[p.prvId] = item.isLiveApi;
              liveApis[sportId][p.prvId] = item.isLiveApi;

              status[sportId][p.prvId] = p.status;
            });
            // liveApis[item.marketId] = item.isLiveApi;
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
    setLoading(true);
    if (error) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    const validationErrors = [];
    if (!selectedSport) validationErrors.push("Vendor Type is required.");
    if (!vendorName.trim()) validationErrors.push("Vendor Name is required.");
    if (
      !vendorName ||
      vendorName.trim().length < 5 ||
      vendorName.trim().length > 36
    ) {
      validationErrors.push(
        "Vendor name must be at least 5-36 characters long."
      );
    }
    // if (!vendorName || vendorName.trim().length > 36) {
    //   validationErrors.push("Vendor name must be at least 36 characters long.");
    // }
    if (!companyName.trim())
      validationErrors.push("Vendor Company is required.");
    if (!selecctedCountry) validationErrors.push("Vendor Country is required.");
    if (!selectedCurrency)
      validationErrors.push("Vendor Currency is required.");
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
      setLoading(false);
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
          // isLiveApi: liveApiStatusMap[marId] || 0,
          isLiveApi: liveApiStatusMap[sportId]?.[marId] || 0,
          ...(isEdit && {
            status: statusMap[sportId]?.[marId] || 1,
          }),
        });
      });
    });

    const payload = {
      vendorName: vendorName,
      vendorType: selectedSport?.value,
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

      ...(!isEdit && {
        vendorCountry: selecctedCountry?.value,
        currency: selectedCurrency?.value,
      }),
    };

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
          }, 2000);
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

  useEffect(() => {
    if (error) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [error]);

  const handleSelectMarketttt = (sportId, marketId, checked) => {
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

  const handleSelectMarket = (sportId, marketId, isChecked) => {
  setSelectedMarkets((prev) => {
    const prevList = prev[sportId] || [];
    const newList = isChecked
      ? [...prevList, marketId]
      : prevList.filter((id) => id !== marketId);

    return {
      ...prev,
      [sportId]: newList,
    };
  });

  // Show dropdown immediately when checkbox is checked
  if (isChecked) {
    setDropdownMap((prev) => ({
      ...prev,
      [`${sportId}-${marketId}`]: true,
    }));
  } else {
    // Clear everything when unchecked
    setDropdownMap((prev) => {
      const updated = { ...prev };
      delete updated[`${sportId}-${marketId}`];
      return updated;
    });

    // Optional: clear position and live API
    setPositionMap((prev) => {
      const updated = { ...prev };
      if (updated[sportId]) {
        delete updated[sportId][marketId];
      }
      return updated;
    });

    setLiveApiStatusMap((prev) => {
      const updated = { ...prev };
      if (updated[sportId]) {
        delete updated[sportId][marketId];
      }
      return updated;
    });
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
    setLiveApiStatusMap((prev) => {
      const current = prev[sportId]?.[marketId];

      if (current === status) {
        const updatedSport = { ...prev[sportId] };
        delete updatedSport[marketId];

        if (Object.keys(updatedSport).length === 0) {
          const { [sportId]: _, ...rest } = prev;
          return rest;
        }

        return {
          ...prev,
          [sportId]: updatedSport,
        };
      }

      return {
        ...prev,
        [sportId]: {
          ...prev[sportId],
          [marketId]: status,
        },
      };
    });
  };

  // const handleSelectLiveApi = (sportId, marketId, status) => {
  //   setLiveApiStatusMap((prev) => {
  //     const current = prev[marketId];

  //     if (current === status) {
  //       const updated = { ...prev };
  //       delete updated[marketId];
  //       return updated;
  //     }

  //     return {
  //       ...prev,
  //       [marketId]: status,
  //     };
  //   });
  // };

  return (
    <>
      {isLoading ? (
        <div className="spinner" style={{ zIndex: 1000 }}>
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

          {Array.isArray(error) && error.length > 0 && (
            <ErrorComponent error={error} />
          )}

          {errors && <ErrorComponent error={error} />}

          <div className="row text-black">
            <div className="col-4 felx-column">
              <label className="small-font mb-1">Vendor Type</label>
              <Select
                className="small-font"
                isSearchable={false}
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
                maxLength={100}
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
                maxLength={100}
              />
            </div>
          </div>

          <div className="my-3 row text-black">
            <div className="col-4 felx-column">
              <div className="small-font mb-1">Select Sports</div>
              <div className="d-flex flex-wrap small-font pointer">
                {sportsData?.length > 0 ? (
                  sportsData?.map((item) => (
                    <label
                      htmlFor={item?.id}
                      className="input-css p-2 me-2 pointer flex-between mb-2"
                    >
                      <input
                        type="checkbox"
                        id={item?.id}
                        className="me-2 pointer"
                        checked={selectedSports.includes(item.id)}
                        // onChange={(e) => {
                        //   const updated = e.target.checked
                        //     ? [...selectedSports, item.id]
                        //     : selectedSports.filter((id) => id !== item.id);
                        //   setSelectedSports(updated);
                        // }}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          const updated = checked
                            ? [...selectedSports, item.id]
                            : selectedSports.filter((id) => id !== item.id);

                          setSelectedSports(updated);

                          if (!checked) {
                            // Clear dependent data
                            setSelectedMarkets((prev) => {
                              const newMarkets = { ...prev };
                              delete newMarkets[item.id];
                              return newMarkets;
                            });

                            setPositionMap((prev) => {
                              const newMap = { ...prev };
                              delete newMap[item.id];
                              return newMap;
                            });

                            setLiveApiStatusMap((prev) => {
                              const newMap = { ...prev };
                              delete newMap[item.id];
                              return newMap;
                            });

                            setDropdownMap((prev) => {
                              const newMap = { ...prev };
                              delete newMap[item.id];
                              return newMap;
                            });
                          }
                        }}
                      />
                      <span>{item?.name}</span>
                    </label>
                  ))
                ) : (
                  <div className="text-black">No Sports are available</div>
                )}
              </div>
            </div>

            <div className="col-4 felx-column">
              <div className="d-flex flex-column">
                <div className="d-flex flex-between align-items-center w-100">
                  <div className="w-50 me-3">
                    <div className="small-font mb-1">Vendor Country</div>

                    <Select
                      className="small-font"
                      isDisabled={isEdit}
                      options={countryOptions}
                      placeholder="Select"
                      styles={customStyles}
                      maxMenuHeight={120}
                      menuPlacement="auto"
                      value={selecctedCountry}
                      onChange={(select) => setSelectedCountry(select)}
                    />
                  </div>
                  <div className="w-50">
                    <div className="small-font mb-1">Vendor Currency</div>

                    <Select
                      className="small-font"
                      options={currencyOptions}
                      isDisabled={isEdit}
                      placeholder="Select"
                      styles={customStyles}
                      maxMenuHeight={120}
                      menuPlacement="auto"
                      value={selectedCurrency}
                      onChange={(select) => setSelectedCurrency(select)}
                    />
                  </div>
                </div>

                <div className="my-2">
                  <label className="small-font mb-1">
                    Max Loose Amount for Sport
                  </label>
                  <div className="input-css small-font text-black">
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="\d*"
                      className="all-none w-100"
                      placeholder="Enter amount"
                      value={maxLoseAmtGame}
                      maxLength={9}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, "");
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
                  <div className="w-30 me-3">
                    <div className="small-font mb-1 white-space">
                      Amount Type
                    </div>
                    <Select
                      className="small-font"
                      options={priceOptions}
                      placeholder="Select"
                      isSearchable={false}
                      styles={customStyles}
                      maxMenuHeight={120}
                      menuPlacement="auto"
                      value={amtType}
                      onChange={(val) => setAmtType(val)}
                    />
                  </div>
                  {amtType?.value === 2 ? (
                    <div className="input-css small-font text-balck w-70 mt-3">
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="Enter Percentage"
                        className="all-none"
                        value={per}
                        maxLength={5}
                        onChange={(e) => {
                          let val = e.target.value.replace(/[^0-9.]/g, "");
                          if (!/^\d*\.?\d{0,3}$/.test(val)) return;
                          if (val.startsWith(".")) {
                            val = "0" + val;
                          }
                          if (/^0\d+/.test(val)) return;
                          setPer(val);
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-70 flex-between">
                      <div className="me-2">
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
                          placeholder="Enter"
                          value={monthlyAmt}
                          maxLength={9}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, "");
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
              </div>
            </div>
          </div>
          {selectedSports.length > 0 && (
            <div className="my-3 row text-black">
              <div className="col-12 flex-column">
                <div className="small-font mb-2">Select Providers</div>

                <div className="row">
                  {selectedSports
                    .map((id) => sportsData.find((sport) => sport.id === id))
                    .filter(Boolean)
                    .map((sport) => (
                      <div key={sport.id} className="col-md-4 col-3">
                        <div className="medium-font black-clr mb-2">
                          {sport.name}
                        </div>

                        {marketsData?.map((mar) => (
                          <div key={mar.id} className="mb-2">
                            <div className="input-css p-1 pointer flex-between w-100">
                              <label className="">
                                <div className="d-flex gap-2 align-items-center">
                                  <input
                                    type="checkbox"
                                    className="me-2"
                                    checked={selectedMarkets[
                                      sport.id
                                    ]?.includes(mar.id)}
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
                              </label>
                              <div
                                // onClick={() => handleDropdown(sport.id, mar.id)}
                                onClick={() => {
                                  setDropdownMap((prev) => ({
                                    ...prev,
                                    [`${sport.id}-${mar.id}`]:
                                      !prev[`${sport.id}-${mar.id}`],
                                  }));
                                }}
                              >
                                {dropdownMap[`${sport.id}-${mar.id}`] ? (
                                  <FaAngleUp />
                                ) : (
                                  <FaAngleDown />
                                )}
                              </div>
                            </div>

                            {(dropdownMap[`${sport.id}-${mar.id}`] ||
                              selectedMarkets[sport.id]?.includes(mar.id)) && (
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
                                          positionMap[sport.id]?.[mar.id] ===
                                          item
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
                                          // liveApiStatusMap[mar.id] === 1
                                          liveApiStatusMap[sport.id]?.[
                                            mar.id
                                          ] === 1
                                            ? "saffron-bg white-font"
                                            : "white-bg black-clr"
                                        }`}
                                        onClick={() =>
                                          handleSelectLiveApi(
                                            sport.id,
                                            mar.id,
                                            1
                                          )
                                        }
                                      >
                                        Yes
                                      </div>
                                      <div
                                        className={`rounded-pill px-2 py-1 pointer small-font ${
                                          // liveApiStatusMap[mar.id] === 2
                                          liveApiStatusMap[sport.id]?.[
                                            mar.id
                                          ] === 2
                                            ? "saffron-bg white-font"
                                            : "white-bg black-clr"
                                        }`}
                                        onClick={() =>
                                          handleSelectLiveApi(
                                            sport.id,
                                            mar.id,
                                            2
                                          )
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
            </div>
          )}
          <div className="my-2 d-flex flex-end">
            {isEdit === true ? (
              <div className="col-4 felx-column align-items-center text-black ">
                <button
                  type="submit"
                  disabled={loadng}
                  className={`w-100 saffron-btn rounded small-font pointer ${
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
                </button>
              </div>
            ) : (
              <div className="col-4 felx-column text-black">
                <button
                  type="submit"
                  disabled={loadng}
                  className={`w-100 saffron-btn rounded small-font pointer ${
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
                </button>
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
