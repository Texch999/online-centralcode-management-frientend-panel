import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";

const NewPromotionPopUp = ({ setAddNewModal, addNewModal }) => {
  const selectOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  return (
    <Modal show={addNewModal} size="md" centered>
      <Modal.Body>
        <div className="d-flex w-100 flex-between">
          <h6 className="mb-0 fw-600">New Promotion Type</h6>
          <IoCloseSharp
            size={20}
            onClick={() => setAddNewModal(false)}
            className="pointer"
          />
        </div>
        <div className="row mt-3 small-font">
          <div className="col-12 flex-column">
            <label className="black-text4 mb-1">Promotion</label>
            <Select
              className="small-font"
              options={selectOptions}
              placeholder="Select"
              styles={customStyles}
              maxMenuHeight={120}
              menuPlacement="auto"
            />
          </div>
          <div className="col-12 flex-column mt-3 ">
            <label className="black-text4 mb-1">Promotion Type</label>
            <textarea
              placeholder="Enter"
              className="all-none input-bg small-font p-2 rounded"
              rows="3"
              style={{ resize: "none" }}
            />
          </div>
          <div className="row">
            <div className="saffron-btn2 small-font pointer mt-4 ms-3 col-12">
              Create
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NewPromotionPopUp;
