import React from "react";
import { Modal } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import "../casino/style.css";

const NewProvidersPopup = ({ show, setShow }) => {
  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <div className="p-2">
        <div className="d-flex flex-between text-black px-2">
          <div className="medium-font">Select Providers</div>
          <div onClick={() => setShow(false)} className="font-20">
            <IoClose />
          </div>
        </div>
        <div className="d-flex w-100 flex-column small-font">
          <div className="d-flex my-2">
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
          <div className="d-flex my-2">
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
          <div className="d-flex my-2">
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

          <div className="saffron-btn2 br-5 mx-2 my-2 pointer">Submit</div>
        </div>
      </div>
    </Modal>
  );
};

export default NewProvidersPopup;
