import React from "react";
import { IoClose } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";

const AddNewPopUp = ({
  addNewModalRejection,
  setAddNewModalRejection,
  setAddNewModalSecurity,
  addNewModalSecurity,
}) => {
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
              <h6>Add Rejection Reasons</h6>
              <IoClose
                className="pointer"
                onClick={() => setAddNewModalRejection(false)}
              />
            </div>

            <div className="row mt-3 small-font">
              <div className="col-4 flex-column">
                <label className="black-text4 mb-1">Status</label>
                <select className="input-bg all-none p-2 small-font rounded">
                  <option>Active</option>
                </select>
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
                  Create
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
              <h6>Add Security Questions</h6>
              <IoClose
                className="pointer"
                onClick={() => setAddNewModalSecurity(false)}
              />
            </div>

            <div className="row mt-3 small-font">
              <div className="col-4 flex-column">
                <label className="black-text4 mb-1">Status</label>
                <select className="input-bg all-none p-2 small-font rounded">
                  <option>Active</option>
                </select>
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
                  Create
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
