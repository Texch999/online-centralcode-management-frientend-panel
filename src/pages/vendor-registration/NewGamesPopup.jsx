import React from "react";
import { Modal } from "react-bootstrap";
import { IoClose } from "react-icons/io5";

const NewGamesPopup = ({ show, setShow }) => {
  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <div className="p-2">
        <div className="d-flex flex-between text-black px-2">
          <div className="medium-font">Select Games</div>
          <div onClick={() => setShow(false)} className="font-20">
            <IoClose />
          </div>
        </div>
        <div className="d-flex w-100 flex-column small-font">
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

          <div className="saffron-btn2 br-5 mx-2 my-2 pointer">Submit</div>
        </div>
      </div>
    </Modal>
  );
};

export default NewGamesPopup;
