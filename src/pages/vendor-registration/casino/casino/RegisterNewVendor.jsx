import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import SuccessPopup from "../../../popups/SuccessPopup";
import Select from "react-select";
import { customStyles } from "../../../../components/ReactSelectStyles";

const RegisterNewVendor = ({ isEdit, setIsEdit }) => {
  const [successModal, setSuccessModal] = useState(false);
  const handleSubmit = () => {
    setSuccessModal(!successModal);
  };
  const selectSports = [
    { value: "casino", label: "Casino" },
    { value: "sports", label: "Sports" },
  ];
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
          />
        </div>
        <div className="col-4 felx-column">
          <label className="small-font mb-1">Vendor Name</label>
          <Select
            className="small-font"
            options={selectSports}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
          />
        </div>
        <div className="col-4 felx-column">
          <label className="small-font mb-1">Vendor Company</label>
          <Select
            className="small-font"
            options={selectSports}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
          />
        </div>
      </div>

      <div className="my-3 row text-black">
        <div className="col-4 felx-column">
          <div className="small-font mb-1">Select Compnay</div>
          <div className="d-flex flex-wrap small-font">
            <label
              htmlFor="ezugi"
              className="input-css p-2 me-2 pointer flex-between mb-2"
            >
              <input type="checkbox" id="ezugi" className="me-2" />
              <span>Ezugi</span>
            </label>
            <label
              htmlFor="Evolution"
              className="input-css p-2 me-2 pointer flex-between mb-2"
            >
              <input type="checkbox" id="Evolution" className="me-2" />
              <span>Evolution</span>
            </label>
            <label
              htmlFor="PragmaticPlay"
              className="input-css p-2 me-2 pointer flex-between mb-2"
            >
              <input type="checkbox" id="PragmaticPlay" className="me-2" />
              <span>Pragmatic Play</span>
            </label>
            <label
              htmlFor="AsianGames"
              className="input-css p-2 me-2 pointer flex-between mb-2"
            >
              <input type="checkbox" id="AsianGames" className="me-2" />
              <span>Asian Games</span>
            </label>
            <label
              htmlFor="RealGaming"
              className="input-css p-2 me-2 pointer flex-between mb-2"
            >
              <input type="checkbox" id="RealGaming" className="me-2" />
              <span>Real Gaming</span>
            </label>
          </div>
        </div>

        <div className="col-4 felx-column">
          <div className="d-flex flex-column">
            <label className="small-font mb-1">Vendor Country</label>
            <Select
              className="small-font"
              options={selectSports}
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
                  placeholder="60000"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-4 felx-column text-black ">
          <div className="d-flex flex-column">
            <div className="small-font mb-1">Monthly Price/Percentage</div>
            <div className="d-flex flex-between align-items-center w-100">
              <div className="w-50 me-3">
                <Select
                  className="small-font"
                  options={selectSports}
                  placeholder="Select"
                  styles={customStyles}
                  maxMenuHeight={120}
                  menuPlacement="auto"
                />
              </div>
              <div className="input-css small-font text-balck w-50">
                <input type="number" placeholder="3000" className="all-none" />
              </div>
            </div>

            <div className="my-2">
              <label className="small-font mb-1">
                Max Loose Amount for Table
              </label>
              <div className="input-css small-font text-black">
                <input
                  type="number"
                  className="all-none w-100"
                  placeholder="60000"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-3 row text-black">
        <div className="col-4 felx-column">
          <div className="small-font mb-1">Select Game</div>
          <div className="d-flex flex-wrap small-font">
            <label
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
            </label>
          </div>
        </div>

        <div className="col-4 felx-column text-black "></div>
        {isEdit === true ? (
          <div className="col-4 felx-column align-items-center text-black ">
            <div className="saffron-bg text-center white-font medium-font py-2 br-5 mx-2 my-2 pointer">Update</div>
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

export default RegisterNewVendor;
