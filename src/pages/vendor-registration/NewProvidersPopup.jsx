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
              <input type="checkbox" className="mx-2" />
              Ezugi
            </div>
            <div className="input-css d-flex flex-between small-font mx-2">
              <input type="checkbox" className="mx-2" />
              Evolution
            </div>
            <div className="input-css d-flex flex-between small-font mx-2">
              <input type="checkbox" className="mx-2" />
              Asian Games
            </div>
          </div>
          <div className="d-flex my-2">
            <div className="input-css d-flex flex-between small-font mx-2">
              <input type="checkbox" className="mx-2" />
              GammaStack
            </div>
            <div className="input-css d-flex flex-between small-font mx-2">
              <input type="checkbox" className="mx-2" />
              Playtech
            </div>
            <div className="input-css d-flex flex-between small-font mx-2">
              <input type="checkbox" className="mx-2" />
              Real Gaming
            </div>
          </div>
          <div className="d-flex my-2">
            <div className="input-css d-flex flex-between small-font mx-2">
              <input type="checkbox" className="mx-2" />
              NetEnt
            </div>
            <div className="input-css d-flex flex-between small-font mx-2 checkbox">
              <input type="checkbox" className="mx-2" />
              Pragmatic Play
            </div>
            <div className="input-css d-flex flex-between small-font mx-2">
              <input type="checkbox" className="mx-2" />
              Real Gaming
            </div>
          </div>

          <div className="saffron-btn2 br-5 mx-2 pointer">Submit</div>
        </div>
      </div>
    </Modal>
  );
};

export default NewProvidersPopup;
