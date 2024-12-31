import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";

const SettlePopUp = ({ settleBalance, setSettleBalance }) => {
  const selectOptions = [
    { value: "INR", label: "INR" },
    { value: "USD", label: "USD" },
  ];

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
            <IoCloseSharp
              className="pointer"
              onClick={() => setSettleBalance(false)}
            />
          </div>

          <div className="row mt-3 small-font">
            <div className="col-6 flex-column">
              <label className="black-text4 mb-1">
                Settled - Rezor Pay - Owner
              </label>
              <Select
                className="small-font"
                options={selectOptions}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
              />
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
