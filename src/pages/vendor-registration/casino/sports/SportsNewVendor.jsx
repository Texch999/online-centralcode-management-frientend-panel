import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import SuccessPopup from "../../../popups/SuccessPopup";

const SportsNewVendor = ({ isEdit, setIsEdit }) => {
  const [successModal, setSuccessModal] = useState(false);
  const handleSubmit = () => {
    setSuccessModal(!successModal);
  };
  return (
    <div className="dashboard-white-bg box-shadow radius p-3">
      {isEdit === true && (
        <div className="d-flex flex-column">
          <div className="flex-start mb-1">
            <div
              className="rounded-pill px-3 white-btn2 small-font fw-800 text-black pointer"
              onClick={() => setIsEdit(false)}
            >
              <span className="orange-clr">
                <FaArrowLeft className="me-2" />
              </span>
              Back
            </div>
          </div>
          <div className="dot-line-black my-3"></div>
        </div>
      )}
      <div className="row w-100 d-flex align-items-center">
        <div className="col-4 felx-column text-black ">
          <label className="small-font mb-1">Vendor Type</label>
          <div className="input-css small-font text-black">
            <select className="all-none w-100">
              <option>sports</option>
              <option>sports</option>
              <option>sports</option>
              <option>sports</option>
            </select>
          </div>
        </div>
        <div className="col-4 felx-column text-black ">
          <label className="small-font mb-1">Vendor Name</label>
          <div className="input-css small-font text-black">
            <select className="all-none w-100">
              <option>ram</option>
              <option>surabh</option>
              <option>rahul</option>
              <option>venkat</option>
            </select>
          </div>
        </div>
        <div className="col-4 felx-column text-black ">
          <label className="small-font mb-1">Vendor Company</label>
          <div className="input-css small-font text-black">
            <select className="all-none w-100">
              <option>TExchange</option>
              <option>TExchange</option>
              <option>TExchange</option>
              <option>TExchange</option>
            </select>
          </div>
        </div>
      </div>

      <div className="my-2 row w-100 d-flex align-items-center">
        <div className="col-4 felx-column text-black pe-1">
          <div className="small-font ">Select Compnay</div>

          <div className="d-flex my-2">
            <div className="input-css d-flex flex-between small-font me-2">
              <label htmlFor="ezugi" className="pointer">
                <input type="checkbox" id="ezugi" className="mx-2" />
                TExchange
              </label>
            </div>
            <div className="input-css d-flex flex-between small-font me-2">
              <label htmlFor="evolution" className="pointer">
                <input type="checkbox" className="mx-2" id="evolution" />
                TExchange
              </label>
            </div>
            <div className="input-css d-flex flex-between small-font">
              <label htmlFor="asian games" className="pointer">
                <input type="checkbox" id="asian games" className="mx-2" />
                TExchange
              </label>
            </div>
          </div>
          <div className="d-flex my-3">
            <div className="input-css d-flex flex-between small-font me-2">
              <label htmlFor="gammastack" className="pointer">
                <input type="checkbox" className="mx-2" id="gammastack" />
                TExchange
              </label>
            </div>
            <div className="input-css d-flex flex-between small-font me-2">
              <label htmlFor="playtech" className="pointer">
                <input type="checkbox" className="mx-2" id="playtech" />
                TExchange
              </label>
            </div>
            <div className="input-css d-flex flex-between small-font ">
              <label htmlFor="real gming" className="pointer">
                <input type="checkbox" className="mx-2" id="real gaming" />
                TExchange
              </label>
            </div>
          </div>
          <div className="d-flex my-3">
            <div className="input-css d-flex flex-between small-font me-2">
              <label htmlFor="netent" className="pointer">
                <input type="checkbox" className="mx-2" id="netent" />
                TExchange
              </label>
            </div>
            <div className="input-css d-flex flex-between small-font me-2 checkbox">
              <label htmlFor="pragmatic play" className="pointer">
                <input type="checkbox" className="mx-2" id="pragmatic play" />
                TExchange
              </label>
            </div>
            <div className="input-css d-flex flex-between small-font ">
              <label htmlFor="real gaming" className="pointer">
                <input type="checkbox" className="mx-2" id="real gaming" />
                TExchange
              </label>
            </div>
          </div>
        </div>

        <div className="col-4 felx-column text-black">
          <div className="d-flex flex-column">
            <div className="my-2">
              <label className="small-font mb-1">Vendor Country</label>
              <div className="input-css small-font text-black">
                <select className="all-none w-100">
                  <option>India</option>
                  <option>Dubai</option>
                  <option>USA</option>
                  <option>UK</option>
                  <option>AUS</option>
                </select>
              </div>
            </div>

            <div className="my-2">
              <label className="small-font mb-1">
                Max Loose Amount for Game
              </label>
              <div className="input-css small-font text-black">
                <input
                  type="text"
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
            <div className="my-2 d-flex flex-between align-items-center w-100">
              <div className="input-css small-font text-black w-50 me-3">
                <select className="all-none w-100">
                  <option>Price</option>
                  <option>Price</option>
                  <option>Price</option>
                  <option>Price</option>
                </select>
              </div>

              <div className="input-css small-font text-balck w-50">
                <input type="text" placeholder="3000" className="all-none" />
              </div>
            </div>

            <div className="my-2">
              <label className="small-font mb-1">
                Max Loose Amount for Table
              </label>
              <div className="input-css small-font text-black">
                <input
                  type="text"
                  className="all-none w-100"
                  placeholder="60000"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-2 row w-100 d-flex">
        <div className="col-4 felx-column text-black pe-1">
          <div className="small-font ps-2">Select Game</div>
          <div className="d-flex my-2">
            <div className="input-css d-flex flex-between small-font me-2">
              <label htmlFor="baccarat" className="pointer">
                <input type="checkbox" id="baccarat" className="mx-2" />
                Cricket
              </label>
            </div>
            <div className="input-css d-flex flex-between small-font me-2">
              <label htmlFor="roulette" className="pointer">
                <input type="checkbox" className="mx-2" id="roulette" />
                Cricket
              </label>
            </div>
            <div className="input-css d-flex flex-between small-font ">
              <label htmlFor="poker" className="pointer">
                <input type="checkbox" className="mx-2" id="poker" />
                Football
              </label>
            </div>
          </div>
          <div className="d-flex my-2">
            <div className="input-css d-flex flex-between small-font me-2">
              <label htmlFor="blackjack" className="pointer">
                <input type="checkbox" id="blackjack" className="mx-2" />
                Tennis
              </label>
            </div>
            <div className="input-css d-flex flex-between small-font me-2">
              <label htmlFor="playtech" className="pointer">
                <input type="checkbox" className="mx-2" id="playtech" />
                Horse Racing
              </label>
            </div>
            <div className="input-css d-flex flex-between small-font">
              <label htmlFor="table games" className="pointer">
                <input type="checkbox" className="mx-2" id="table games" />
                Kabaddi
              </label>
            </div>
          </div>
          <div className="d-flex my-2">
            <div className="input-css d-flex flex-between small-font me-2">
              <label htmlFor="teenpati" className="pointer">
                <input type="checkbox" className="mx-2" id="teenpati" />
                Cricket
              </label>
            </div>
            <div className="input-css d-flex flex-between small-font me-2 checkbox">
              <label htmlFor="spanish 21" className="pointer">
                <input type="checkbox" className="mx-2" id="spanish 21" />
                Cricket
              </label>
            </div>
            <div className="input-css d-flex flex-between small-font">
              <label htmlFor="rummy online" className="pointer">
                <input type="checkbox" className="mx-2" id="rummy online" />
                Football
              </label>
            </div>
          </div>
        </div>

        <div className="col-4 felx-column text-black "></div>
        {isEdit === true ? (
          <div className="col-4 felx-column align-items-center text-black ">
            <div className="saffron-btn2 br-5 mx-2 my-2 pointer">Update</div>
            <div className="white-btn br-5 mx-2 my-3 pointer text-center">
              Edit
            </div>
          </div>
        ) : (
          <div className="col-4 felx-column text-black ">
            <div
              className="saffron-btn2 br-5 mx-2 my-2 pointer"
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
        discription={"Sports New Vendor Added"}
      />
    </div>
  );
};

export default SportsNewVendor;
