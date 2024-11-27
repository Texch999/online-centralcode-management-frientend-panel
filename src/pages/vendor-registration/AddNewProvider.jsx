import React from "react";
import { Modal } from "react-bootstrap";
import { FaChevronDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const AddNewProvider = ({ show, setShow }) => {
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
          <div className="col felx-column px-2 text-black pointer">
            <label className="medium-font">Providers</label>
            <select className="input-css small-font text-black w-100 d-flex flex-between"></select>
          </div>

          <div className="col felx-column px-2 text-black pointer">
            <label className="medium-font">Games</label>
            <select className="input-css small-font text-black w-100 d-flex flex-between"></select>
          </div>

          <div className="mt-3 saffron-btn2 br-5 mx-2 pointer">Submit</div>
        </div>
      </div>
    </Modal>
  );
};

export default AddNewProvider;
