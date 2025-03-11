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
          <div className="black-br-btn px-2 py-2 br-5 medium-font">Director - Abhi</div>
          <div className="d-flex gap-3 align-items-center">
            <div className="green-font fw-bold light-bg br-5 font-20 px-3 py-2">
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
          <div className="black-br-btn px-2 py-2 br-5 medium-font">Admin - Brahma</div>
        </div>
        <div className="d-flex flex-between my-1">
          <div className="black-br-btn px-2 py-2 br-5 medium-font">
            User - Diamond Exchange - 5%
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-6">
            <label className="medium-font">Total Credit</label>
            <div className="light-bg br-5 mt-1 px-2 py-2">
              <input type="text" placeholder="1000" className="all-none small-font" />
            </div>
          </div>
          <div className="col-6">
            <label className="medium-font">Paid</label>
            <div className="light-bg br-5 mt-1 px-2 py-2">
              <input type="text" placeholder="1000" className="all-none small-font" />
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-6">
            <label className="medium-font">Bal. Credit</label>
            <div className="light-bg br-5 mt-1 px-2 py-2">
              <input type="text" placeholder="1000" className="all-none red-font small-font small-font" />
            </div>
          </div>
          <div className="col-6">
            <label className="medium-font">Enter Paid Amount</label>
            <div className="light-bg br-5 mt-1 px-2 py-2">
              <input type="text" placeholder="1000" className="all-none small-font" />
            </div>
          </div>
        </div>

        <div className="col-12 mt-2 flex-column d-flex">
          <label className="medium-font">Net Credit Bal.</label>
          <div className="light-bg br-5 mt-1 px-2 py-2">
            <input type="text" placeholder="1000" className="all-none small-font small-font" />
          </div>
        </div>

        <div className="col-12 flex-column mt-2 d-flex">
          <label className="medium-font">Remarks</label>
          <div className="light-bg br-5 mt-1 px-2 py-2">
            <textarea
              type="text"
              placeholder="remarks"
              className="all-none small-font"
              rows={2}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-6 flex-column d-flex">
            <label className="medium-font">Enter Password</label>
            <div className="light-bg br-5 mt-1 px-2 py-2">
              <input type="text" placeholder="password" className="all-none small-font" />
            </div>
          </div>
          <div className="col-6 flex-column mt-2 align-self-end d-flex">
            <div className="saffron-btn br-5 px-4 pointer medium-font">submit</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SettlementTransModal;
