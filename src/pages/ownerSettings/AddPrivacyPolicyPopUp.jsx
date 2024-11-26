import React from "react";
import { IoClose } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";

const AddPrivacyPolicyPopUp = ({
    addPrivacyModal,
    setAddPrivacyModal
}) => {
  return (
    <>
      
        <Modal
          show={addPrivacyModal}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <div className="d-flex w-100 flex-between">
              <h6>Add Privacy Policy</h6>
              <IoClose
                className="pointer"
                onClick={() => setAddPrivacyModal(false)}
              />
            </div>

            <div className="row mt-3 small-font">
              <div className="col-4 flex-column">
                <label className="black-text4 mb-1">Country</label>
                <select className="input-bg all-none p-2 small-font rounded">
                  <option>India</option>
                </select>
              </div>
              <div className="col-4 flex-column">
                <label className="black-text4 mb-1">Show Website</label>
                <select className="input-bg all-none p-2 small-font rounded">
                  <option>we2call.com</option>
                  <option>txchange.com</option>
                  <option>we2call.com</option>
                </select>
              </div>
              <div className="col-4 flex-column">
                <label className="black-text4 mb-1">Status</label>
                <select className="input-bg all-none p-2 small-font rounded">
                  <option>Active</option>
                  <option>In-Active</option>
                </select>
              </div>

              <div className="col-12 flex-column mt-3 ">
                <label className="black-text4 mb-1">Description</label>
                <textarea
                  placeholder="Enter"
                  className="all-none input-bg small-font p-2 rounded"
                  rows="6"
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
      

     
    </>
  );
};

export default AddPrivacyPolicyPopUp;


