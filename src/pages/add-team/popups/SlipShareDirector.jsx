import React from "react";
import { Modal } from "react-bootstrap";
import { Images } from "../../../images";
import { MdOutlineClose } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import { customStyles } from "../../../components/ReactSelectStyles";

const SlipShareDirector = ({ show, onHide }) => {
  const selectReasonOptions = [
    { value: "option 1", label: "option 1" },
    { value: "option 2", label: "option 2" },
    { value: "option 3", label: "option 3" },
  ];

  return (
    <Modal
      show={show}
      onHide={onHide}
      contentLabel="Transaction Details"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="medium-font fw-600">
            Srinivas{" "}
            <span className="saffron-btn rounded ms-2 me-2 small-font">
              Director
            </span>{" "}
            Share - 10%
          </h5>
          <div className="d-flex justify-content-between align-items-center w-25">
            <button className=" px-2 py-1 rounded small-font payment-gateway-status-badge">
              Deposit
            </button>
            <MdOutlineClose size={22} onClick={onHide} className="pointer" />
          </div>
        </div>

        <div className="row mt-3 px-2">
          <div className="col-12 d-flex justify-content-between align-items-center col-12 input-bg small-font rounded px-3 py-2 mb-2">
            <div>Transaction ID</div>
            <div>TXN3789600600000</div>
          </div>

          <div className="col-12 d-flex justify-content-between align-items-center col-12 input-bg small-font rounded px-3 py-2 mb-2">
            <div>Reference ID</div>
            <div>dire3789600600000</div>
          </div>

          <div className="col-12 d-flex justify-content-between align-items-center col-12 input-bg small-font rounded px-3 py-2 mb-2">
            <div>Amount</div>
            <div>10000</div>
          </div>

          <div className="col-12 d-flex justify-content-between align-items-center col-12 input-bg small-font rounded px-3 py-2 mb-2">
            <div>Payment Method</div>
            <div>NEFT/RTGS</div>
          </div>

          <div className="align-items-center col-12 input-bg small-font rounded px-3 py-2 mb-2">
            <div className="col-12 d-flex justify-content-between col-12 mb-2">
              <div>From</div>
              <div>Srinivas - Director (Share - 10%)</div>
            </div>

            <div className="col-12 d-flex justify-content-between col-12">
              <div>To</div>
              <div>Management LLC</div>
            </div>
          </div>

          <div className="col-12 d-flex justify-content-between align-items-center input-bg small-font rounded px-3 py-2 mb-2">
            <div>Date & Time</div>
            <div>28-09-2024 11:29:00</div>
          </div>

          <div className="col-12 d-flex justify-content-between p-0 m-0 mb-2 w-100">
            <img
              src={Images.SlipShareDirector}
              alt="Animal"
              className="h-100 rounded w-100"
            />
          </div>

          <div className="d-flex w-100 p-0 m-0 mb-2">
            <div className="col-6 pe-2">
              <div className="flex-between p-2 small-font input-bg rounded px-3 py-2">
                <div>Sports & Casino Chips</div>
                <span>10%</span>
              </div>
            </div>
            <div className="col-4">
              <div className="flex-between p-2 small-font input-bg rounded">
                <div>Chips</div>
                <span>1000000</span>
              </div>
            </div>
            <div className="col-2 ps-2">
              <div className="flex-between px-2 py-2 small-font input-bg rounded">
                1000000
              </div>
            </div>
          </div>

          <Select
            className="small-font mb-3 w-100 p-0"
            options={selectReasonOptions}
            placeholder="Select Rejection Reason"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
          />

          <div className="row p-0 m-0">
            <div className="col-6 p-0 pe-2">
              <button className="saffron-btn rounded medium-font w-100">
                Approved
              </button>
            </div>
            <div className="col-6 p-0 ps-2">
              <button className="white-btn rounded meduim-font w-100">
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SlipShareDirector;
