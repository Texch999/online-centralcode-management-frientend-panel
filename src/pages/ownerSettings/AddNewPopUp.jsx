import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";

const AddNewPopUp = ({
  addNewModalRejection,
  setAddNewModalRejection,
  setAddNewModalSecurity,
  addNewModalSecurity,
  rejectionTitleModel,
  securityTitleModel,
  editTitleButtonModel
}) => {
  const selectOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  return (
    <>
      {addNewModalRejection && (
        <Modal
          show={addNewModalRejection}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <div className="d-flex w-100 flex-between">
              <h6>{rejectionTitleModel}</h6>
              <IoCloseSharp
                className="pointer"
                onClick={() => setAddNewModalRejection(false)}
              />
            </div>

            <div className="row mt-3 small-font">
              <div className="col-4 flex-column">
                <label className="black-text4 mb-1">Status</label>
                <Select
                  className="small-font"
                  options={selectOptions}
                  placeholder="Select"
                  styles={customStyles}
                  maxMenuHeight={120}
                  menuPlacement="auto"
                />
              </div>
              <div className="col-8 flex-column ">
                <label className="black-text4 mb-1">Reason</label>
                <input
                  type="text"
                  placeholder="Enter"
                  className="all-none input-bg small-font p-2 rounded"
                />
              </div>

              <div className="col-12 flex-column mt-3 ">
                <label className="black-text4 mb-1">Description</label>
                <textarea
                  placeholder="Enter"
                  className="all-none input-bg small-font p-2 rounded"
                  rows="4"
                  style={{ resize: "none" }}
                ></textarea>
              </div>
              <div className="row">
                <div className="col-8"></div>
                <div className="saffron-btn2 small-font pointer mt-4 col-4">
                  {editTitleButtonModel}
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}

      {addNewModalSecurity && (
        <Modal
          show={addNewModalSecurity}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <div className="d-flex w-100 flex-between">
              <h6>{securityTitleModel}</h6>
              <IoCloseSharp
                className="pointer"
                onClick={() => setAddNewModalSecurity(false)}
              />
            </div>

            <div className="row mt-3 small-font">
              <div className="col-4 flex-column">
                <label className="black-text4 mb-1">Status</label>
                <Select
                  className="small-font"
                  options={selectOptions}
                  placeholder="Select"
                  styles={customStyles}
                  maxMenuHeight={120}
                  menuPlacement="auto"
                />
              </div>
              <div className="col-8 flex-column ">
                <label className="black-text4 mb-1">Questions</label>
                <input
                  type="text"
                  placeholder="Enter"
                  className="all-none input-bg small-font p-2 rounded"
                />
              </div>
              <div className="row">
                <div className="col-8"></div>
                <div className="saffron-btn2 small-font pointer mt-4 col-4">
                  {editTitleButtonModel}
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default AddNewPopUp;
