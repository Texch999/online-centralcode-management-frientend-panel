import React from "react";
import { Modal } from "react-bootstrap";
import { IoClose } from "react-icons/io5";

const SettlementTransModal = ({ setSettleModalShow, settleModalShow }) => {
  return (
    <Modal
      show={settleModalShow}
      onHide={() => setSettleModalShow(false)}
      centered
    >
      <div className="white-bg p-4 br-10">
        <div className="d-flex flex-between align-items-center">
          <div className="black-br-btn px-2 py-2 br-5">Director - Abhi</div>
          <div className="d-flex gap-3 align-items-center">
            <div className="green-font fw-bold light-bg br-5 px-3 py-2">
              Settlement
            </div>
            <IoClose
              size={24}
              className="pointer"
              onClick={() => setSettleModalShow(false)}
            />
          </div>
        </div>
        <div className="d-flex flex-between my-2">
          <div className="black-br-btn px-2 py-2 br-5">Admin - Brahma</div>
        </div>
        <div className="d-flex flex-between my-1">
          <div className="black-br-btn px-2 py-2 br-5">
            User - Diamond Exchange - 5%
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-6">
            <label>Total Credit</label>
            <div className="light-bg br-5 mt-1 px-2 py-2">
              <input type="text" placeholder="1000" className="all-none" />
            </div>
          </div>
          <div className="col-6">
            <label>Paid</label>
            <div className="light-bg br-5 mt-1 px-2 py-2">
              <input type="text" placeholder="1000" className="all-none" />
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-6">
            <label>Bal. Credit</label>
            <div className="light-bg br-5 mt-1 px-2 py-2">
              <input type="text" placeholder="1000" className="all-none" />
            </div>
          </div>
          <div className="col-6">
            <label>Enter Paid Amount</label>
            <div className="light-bg br-5 mt-1 px-2 py-2">
              <input type="text" placeholder="1000" className="all-none" />
            </div>
          </div>
        </div>

        <div className="col-12 mt-2 flex-column d-flex">
          <label>Net Credit Bal.</label>
          <div className="light-bg br-5 mt-1 px-2 py-2">
            <input type="text" placeholder="1000" className="all-none" />
          </div>
        </div>

        <div className="col-12 flex-column mt-2 d-flex">
          <label>Remarks</label>
          <div className="light-bg br-5 mt-1 px-2 py-2">
            <textarea
              type="text"
              placeholder="remarks"
              className="all-none"
              rows={3}
            />
          </div>
        </div>

        <div className="col-12 flex-column mt-2 d-flex">
          <label>Enter Password</label>
          <div className="light-bg br-5 mt-1 px-2 py-2">
            <input type="text" placeholder="password" className="all-none" />
          </div>
        </div>
        <div className="d-flex flex-end mt-2 ">
          <div className="saffron-btn br-5 px-3 pointer">submit</div>
        </div>
      </div>
    </Modal>
  );
};

export default SettlementTransModal;
