import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";

const SettlePopUp = ({ settleBalance, setSettleBalance }) => {
  const [selectWebsite, setSelectWebsite] = useState(false);
  return (
    <>
      <Modal
        show={settleBalance}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="d-flex w-100 flex-between">
            <h6 className="fw-600">Settled - Rezor Pay - Owner </h6>
            <IoClose
              className="pointer"
              onClick={() => setSettleBalance(false)}
            />
          </div>

          <div className="row mt-3 small-font">
            <div className="col-6 flex-column">
              <label className="black-text4 mb-1">
                Settled - Rezor Pay - Owner
              </label>
              <select className="input-bg all-none p-2 small-font rounded">
                <option>USD</option>
                <option>INR</option>
              </select>
            </div>
            <div className="col-6 flex-column ">
              <label className="black-text4 mb-1">Gateway Balance</label>
              <input
                type="text"
                placeholder="Enter"
                className="all-none input-bg small-font p-2 rounded"
              />
            </div>

            <div className="col-6 flex-column mt-3 ">
              <label className="black-text4 mb-1">Withdraw Amount</label>
              <input
                type="text"
                placeholder="Enter"
                className="all-none input-bg small-font p-2 rounded"
              />
            </div>
            <div className="col-6 flex-column mt-3 ">
              <label className="black-text4 mb-1">Net Gateway Bal</label>
              <input
                type="text"
                placeholder="Enter"
                className="all-none input-bg small-font p-2 rounded"
              />
            </div>

            <div className="row">
              <div className="saffron-btn2 small-font pointer mt-4 ms-4 col">
                Submit
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SettlePopUp;
