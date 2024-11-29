import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RegisterNewVendor = ({ isEdit, setIsEdit }) => {
  const navigate = useNavigate();
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
              <option>casino</option>
              <option>casino</option>
              <option>casino</option>
              <option>casino</option>
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
              <option>company1</option>
              <option>company1</option>
              <option>company1</option>
              <option>company1</option>
            </select>
          </div>
        </div>
      </div>

      <div className="my-3 row w-100 d-flex align-items-center">
        <div className="col-4 felx-column text-black ">
          <div className="small-font ps-2">Select Compnay</div>

          <div className="d-flex my-3">
            <div className="input-css d-flex flex-between small-font mx-2">
              <label htmlFor="ezugi" className="pointer">
                <input type="checkbox" id="ezugi" className="mx-2" />
                Ezugi
              </label>
            </div>
            <div className="input-css d-flex flex-between small-font mx-2">
              <label htmlFor="evolution" className="pointer">
                <input type="checkbox" className="mx-2" id="evolution" />
                Evolution
              </label>
            </div>
            <div className="input-css d-flex flex-between small-font mx-2">
              <label htmlFor="asian games" className="pointer">
                <input type="checkbox" id="asian games" className="mx-2" />
                Asian Games
              </label>
            </div>
          </div>
          <div className="d-flex my-3">
            <div className="input-css d-flex flex-between small-font mx-2">
              <label htmlFor="gammastack" className="pointer">
                <input type="checkbox" className="mx-2" id="gammastack" />
                GammaStack
              </label>
            </div>
            <div className="input-css d-flex flex-between small-font mx-2">
              <label htmlFor="playtech" className="pointer">
                <input type="checkbox" className="mx-2" id="playtech" />
                Playtech
              </label>
            </div>
            <div className="input-css d-flex flex-between small-font mx-2">
              <label htmlFor="real gming" className="pointer">
                <input type="checkbox" className="mx-2" id="real gaming" />
                Real Gaming
              </label>
            </div>
          </div>
          <div className="d-flex my-3">
            <div className="input-css d-flex flex-between small-font mx-2">
              <label htmlFor="netent" className="pointer">
                <input type="checkbox" className="mx-2" id="netent" />
                NetEnt
              </label>
            </div>
            <div className="input-css d-flex flex-between small-font mx-2 checkbox">
              <label htmlFor="pragmatic play" className="pointer">
                <input type="checkbox" className="mx-2" id="pragmatic play" />
                Pragmatic Play
              </label>
            </div>
            <div className="input-css d-flex flex-between small-font mx-2">
              <label htmlFor="real gaming" className="pointer">
                <input type="checkbox" className="mx-2" id="real gaming" />
                Real Gaming
              </label>
            </div>
          </div>
        </div>

        <div className="col-4 felx-column text-black ">
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

      <div className="my-3 row w-100 d-flex">
        <div className="col-4 felx-column text-black ">
          <div className="small-font ps-2">Select Game</div>
          <div className="d-flex my-2">
            <div className="input-css d-flex flex-between small-font mx-2">
              <label htmlFor="baccarat" className="pointer">
                <input type="checkbox" id="baccarat" className="mx-2" />
                Baccarat
              </label>
            </div>
            <div className="input-css d-flex flex-between small-font mx-2">
              <label htmlFor="roulette" className="pointer">
                <input type="checkbox" className="mx-2" id="roulette" />
                Roulette
              </label>
            </div>
            <div className="input-css d-flex flex-between small-font mx-2">
              <label htmlFor="poker" className="pointer">
                <input type="checkbox" className="mx-2" id="poker" />
                Poker
              </label>
            </div>
          </div>
          <div className="d-flex my-2">
            <div className="input-css d-flex flex-between small-font mx-2">
              <label htmlFor="blackjack" className="pointer">
                <input type="checkbox" id="blackjack" className="mx-2" />
                Black Jack
              </label>
            </div>
            <div className="input-css d-flex flex-between small-font mx-2">
              <label htmlFor="playtech" className="pointer">
                <input type="checkbox" className="mx-2" id="playtech" />
                Playtech
              </label>
            </div>
            <div className="input-css d-flex flex-between small-font mx-2">
              <label htmlFor="table games" className="pointer">
                <input type="checkbox" className="mx-2" id="table games" />
                Table Games
              </label>
            </div>
          </div>
          <div className="d-flex my-2">
            <div className="input-css d-flex flex-between small-font mx-2">
              <label htmlFor="teenpati" className="pointer">
                <input type="checkbox" className="mx-2" id="teenpati" />
                Teenpati
              </label>
            </div>
            <div className="input-css d-flex flex-between small-font mx-2 checkbox">
              <label htmlFor="spanish 21" className="pointer">
                <input type="checkbox" className="mx-2" id="spanish 21" />
                Spanish 21
              </label>
            </div>
            <div className="input-css d-flex flex-between small-font mx-2">
              <label htmlFor="rummy online" className="pointer">
                <input type="checkbox" className="mx-2" id="rummy online" />
                Rummy Online
              </label>
            </div>
          </div>
        </div>

        <div className="col-4 felx-column text-black "></div>
        {isEdit === true ? (
          <div className="col-4 felx-column align-items-center text-black ">
            <div className="saffron-btn2 br-5 mx-2 my-2 pointer">Update</div>
            <div className="white-btn br-5 mx-2 my-3 pointer">Edit</div>
          </div>
        ) : (
          <div className="col-4 felx-column text-black ">
            <div className="saffron-btn2 br-5 mx-2 my-2 pointer">Submit</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterNewVendor;
