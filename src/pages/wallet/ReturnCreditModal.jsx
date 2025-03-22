import React from "react";
import { Modal } from "react-bootstrap";
import { IoClose } from "react-icons/io5";

const ReturnCreditModal = ({ show, setShow }) => {
  return (
    <Modal show={show} onHide={() => setShow(false)} centered size="sm">
      <div className="white-bg p-3 br-10">
        <div className="d-flex flex-between align-items-center">
          <div className="d-flex flex-center medium-font green-font">
            Return Credit Chips
          </div>
          <div className="">
            <IoClose
              size={20}
              className="pointer"
              onClick={() => setShow(false)}
            />
          </div>
        </div>
        <div className="grey-border br-5 px-2 py-1 mt-2 small-font">
          Brahma - SA - Vignesh1993 - India - 10%
        </div>
        <form>
          <div className="row mt-3">
            <div className="col-4">
              <label className="small-font">Wallet Balance</label>

              <input
                type="number"
                placeholder="1000"
                className="all-none small-font input-css w-100"
                readOnly
              />
            </div>
            <div className="col-4">
              <label className="small-font">Credit Balance</label>

              <input
                type="number"
                placeholder="1000"
                className="all-none input-css w-100 small-font"
              />
            </div>
            <div className="col-4">
              <label className="small-font">Profit/Loss</label>

              <input
                type="number"
                placeholder="1000"
                className="all-none input-css w-100 small-font"
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-6">
              <label className="small-font">After Wallet Bal.</label>

              <input
                type="number"
                placeholder="1000"
                className="all-none red-font input-css w-100 small-font"
                readOnly
              />
            </div>
            <div className="col-6">
              <label className="small-font">After Credit Bal.</label>

              <input
                type="number"
                placeholder="1000"
                className="all-none input-css small-font w-100"
                min="0"
                max="3"
              />
            </div>
          </div>

          <div className="col-12 mt-2">
            <label className="small-font">Enter Refund Credit Chips</label>

            <input
              type="text"
              placeholder="1000"
              className="all-none input-css w-100 small-font"
              readOnly
            />
          </div>

          <div className="col-12">
            <label className="small-font">Remarks</label>

            <textarea
              type="text"
              placeholder="remarks"
              className="all-none input-css small-font w-100"
              rows={2}
            />
          </div>
          <div className="row ">
            <div className="col-6">
              <label className="small-font">Enter Password</label>

              <input
                type="text"
                placeholder="password"
                className="all-none input-css w-100 small-font"
              />
            </div>
            <div className="col-6 mt-4">
              <button
                type="submit"
                className="saffron-btn w-100 br-5 py-1 px-4 pointer small-font"
              >
                submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ReturnCreditModal;
