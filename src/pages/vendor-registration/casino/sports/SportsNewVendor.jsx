import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import SuccessPopup from "../../../popups/SuccessPopup";
import Select from "react-select";
import { customStyles } from "../../../../components/ReactSelectStyles";
import {
  createVendor,
  getMarketOptions,
  getSportsListCentral,
} from "../../../../api/apiMethods";
import { useSelector } from "react-redux";
import e from "cors";

const SportsNewVendor = ({ isEdit, setIsEdit }) => {
  const [successModal, setSuccessModal] = useState(false);
  const [vendorName, setVendorName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [sportsData, setSportsData] = useState([]);
  const [error, setError] = useState("");
  const allCountries = useSelector((item) => item?.allCountries);
  const [maxLoseAmtGame, setMaxLoseAmtGame] = useState(null);
  const [maxLoseAmtTable, setMaxLoseAmtTable] = useState(null);
  const handleSubmit = () => {
    setSuccessModal(!successModal);
  };
  const path = window.location.pathname === "/sports-vendor-registration";

  const selectSports = [
    // { value: "casino", label: "Casino" },
    { value: 1, label: "Sports" },
  ];

  const priceOptions = [
    { value: 1, label: "Price" },
    { value: 2, label: "Percentage" },
  ];

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

  const getSports = () => {
    getSportsListCentral()
      .then((response) => {
        if (response) {
          setSportsData(response?.data);
        }
      })
      .catch((error) => {
        setError(error?.message);
      });
  };
  useEffect(() => {
    getSports();
  }, []);

  const [marketsData, setMarketsData] = useState([]);
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

  const onSubmit = () => {
    const payload = {
      vendorName: vendorName,
      vendorType: 1,
      vendorCountry: 1,
      vendorCompany: companyName,
      amountType: 1,
      percentage: 15.5,
      monthlyAmount: maxLoseAmtGame,
      maxLsAmtGame: maxLoseAmtTable,
      vendorOptions: [
        {
          marketId: 1,
          optionId: 1,
          position: 1,
          isLiveApi: 1,
        },
        {
          marketId: 2,
          optionId: 2,
          position: 2,
        },
      ],
    };
    createVendor(payload)
      .then((response) => {
        if (response) {
          console.log(response?.data);
        }
      })
      .catch((error) => {
        const errMsg = error?.message;
        if (Array.isArray(errMsg)) {
          setError(errMsg);
        } else {
          setError([errMsg]);
        }
      });
  };

  return (
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
          {/* <Select
            className="small-font"
            options={selectSports}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
          /> */}
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
          {/* <Select
            className="small-font"
            options={selectSports}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
          /> */}
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
                <input type="checkbox" id={item?.id} className="me-2" />
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
              <div className="w-50 me-3">
                <div className="small-font mb-1">Monthly Price/Percentage</div>
                <Select
                  className="small-font"
                  options={priceOptions}
                  placeholder="Select"
                  styles={customStyles}
                  maxMenuHeight={120}
                  menuPlacement="auto"
                />
              </div>
              {selectedSport === "Price" ? (
                <div className="input-css small-font text-balck w-50">
                  <input
                    type="number"
                    placeholder="3000"
                    className="all-none"
                  />
                </div>
              ) : (
                <div className="w-50">
                  <div className="small-font mb-1">Billing Date</div>
                  <input
                    type="date"
                    className="input-css small-font w-100"
                    placeholder="Select date"
                  />
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
          <div className="small-font mb-1">Select Market</div>
          <div className="d-flex flex-wrap small-font">
            {marketsData?.map((mar) => (
              <label
                htmlFor="Baccarat"
                className="input-css p-2 me-2 pointer flex-between mb-2"
              >
                <input type="checkbox" id={mar?.id} className="me-2" />
                <span>{mar?.name}</span>
              </label>
            ))}

            <div className="input-bg d-flex flex-between w-100 p-2 my-2 br-5">
              <div className="black-clr">Result Live API</div>
              <div className="d-flex gap-2 black-clr">
                <div className="saffron-bg rounded-pill px-2 py-1 pointer">
                  Yes
                </div>
                <div className="white-bg rounded-pill px-2 py-1 pointer">
                  No
                </div>
              </div>
            </div>
            {/* <label
              htmlFor="Baccarat"
              className="input-css p-2 me-2 pointer flex-between mb-2"
            >
              <input type="checkbox" id="Baccarat" className="me-2" />
              <span>Baccarat</span>
            </label>
            <label
              htmlFor="Roulette"
              className="input-css p-2 me-2 pointer flex-between mb-2"
            >
              <input type="checkbox" id="Roulette" className="me-2" />
              <span>Roulette</span>
            </label>
            <label
              htmlFor="Poker"
              className="input-css p-2 me-2 pointer flex-between mb-2"
            >
              <input type="checkbox" id="Poker" className="me-2" />
              <span>Poker</span>
            </label>
            <label
              htmlFor="Sicbo"
              className="input-css p-2 me-2 pointer flex-between mb-2"
            >
              <input type="checkbox" id="Sicbo" className="me-2" />
              <span>Sic bo</span>
            </label>
            <label
              htmlFor="Blackjack"
              className="input-css p-2 me-2 pointer flex-between mb-2"
            >
              <input type="checkbox" id="Blackjack" className="me-2" />
              <span>Blackjack</span>
            </label> */}
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
              className="saffron-bg text-center white-font medium-font py-2 br-5 mx-2 my-2 pointer"
              onClick={handleSubmit}
            >
              Submit
            </div>
          </div>
        )}
      </div>

      <SuccessPopup
        successPopupOpen={successModal}
        setSuccessPopupOpen={setSuccessModal}
        discription={"Casino New Vendor Added"}
      />
    </div>
  );
};

export default SportsNewVendor;
