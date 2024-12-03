import React from "react";
import { Modal } from "react-bootstrap";
import { Images } from "../../images";
import { IoClose } from "react-icons/io5";

const SuccessPopup = ({ show, setShow, title }) => {
  return (
    <Modal show={show} setShow={() => setShow(false)} centered size="md">
      <div className="p-2 white-bg radius-20 text-black">
        <div
          className="flex-end px-1 py-1 pointer"
          onClick={() => setShow(false)}
        >
          <IoClose className="font-25 text-black" />
        </div>
        <div className="d-flex flex-column">
          <div className="flex-center">
            <img src={Images?.check} alt="" />
          </div>
          <div className="flex-center my-2 medium-font">
            {`${title} Successfully!`}
          </div>
          <div className="flex-center my-2">
            <div
              className="input-css2 br-5 box-shadow w-50 text-center mx-2 text-black pointer"
              onClick={() => setShow(false)}
            >
              Ok
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessPopup;
