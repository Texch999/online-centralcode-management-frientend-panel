import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import { MdOutlineFileUpload } from "react-icons/md";

const AddNewPromotionPopUp = ({
  addPromotionsModal,
  setAddPromotionsModal,
  userPromotion,
}) => {
  return (
    <Modal show={addPromotionsModal} size="md" centered>
      <Modal.Body>
        <div className="d-flex w-100 flex-between">
          <h6 className="fw-600 mb-0">Add New Promotion</h6>
          <IoCloseSharp
            size={20}
            onClick={() => setAddPromotionsModal(false)}
            className="pointer"
          />
        </div>

        <div className="row mt-3 small-font">
          <div className="col-4 flex-column">
            <label className="black-text4 mb-1">Sports Type</label>
            <select className="input-bg all-none p-2 small-font rounded">
              <option>Cricket</option>
            </select>
          </div>
          <div className="col-4 flex-column">
            <label className="black-text4 mb-1">Promotion Type</label>
            <select className="input-bg all-none p-2 small-font rounded">
              <option>Select</option>
            </select>
          </div>
          <div className="col-4 flex-column">
            <label className="black-text4 mb-1">Promotion Code</label>

            <input
              type="text"
              placeholder="Enter"
              className="all-none input-bg small-font p-2 rounded"
            />
          </div>
          <div className="col-4 flex-column mt-2">
            <label className="black-text4 mb-1">Select Website</label>
            <select className="input-bg all-none p-2 small-font rounded">
              <option>Select</option>
            </select>
          </div>
          {userPromotion === true ? (
            <></>
          ) : (
            <div className="col-4 flex-column mt-2">
              <label className="black-text4 mb-1">Select Poster</label>
              <select className="input-bg all-none p-2 small-font rounded">
                <option>Select</option>
              </select>
            </div>
          )}

          <div
            className={`${
              userPromotion === true ? "col-8" : "col-4"
            } flex-column mt-2`}
          >
            <label className="black-text4 small-font " htmlFor="poster">
              Upload Poster
              <input type="file" style={{ display: "none" }} id="poster" />
              <div className="input-bg small-font d-flex flex-between p-2 rounded mt-2">
                Select File <MdOutlineFileUpload />
              </div>
            </label>
          </div>

          <div className="col-12 flex-column mt-3">
            <label className="black-text4 mb-1">Promotion Message</label>
            <textarea
              placeholder="Enter"
              className="all-none input-bg small-font p-2 rounded"
              rows="3"
              style={{ resize: "none" }}
            ></textarea>
          </div>
          <div className="w-100 flex-end mt-3">
            <div className="col-3">
              <div className="saffron-btn2 small-font pointer">Create</div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddNewPromotionPopUp;
