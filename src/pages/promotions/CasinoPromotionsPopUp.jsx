import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import { MdOutlineFileUpload } from "react-icons/md";

const CasinoPromotionsPopUp = ({ setCasinoPromotion, casinoPromotion }) => {
  return (
    <Modal show={casinoPromotion} size="md" centered>
      <Modal.Body>
        <div className="d-flex w-100 flex-between">
          <h6 className="fw-600 mb-0">Add New Promotion</h6>
          <IoCloseSharp
            size={20}
            className="pointer"
            onClick={() => setCasinoPromotion(false)}
          />
        </div>
        <div className="row small-font">
          <div className="col-4 flex-column mt-2">
            <label className="black-text4 mb-1">Promotion Type</label>
            <select className="input-bg all-none p-2 small-font rounded">
              <option>Select</option>
            </select>
          </div>
          <div className="col-4 flex-column mt-2">
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
          <div className="col-12 flex-column mt-2">
            <label className="black-text4 mb-1">Upload Poster</label>
            <label htmlFor="poster">
              <input type="file" style={{ display: "none" }} id="poster" />
              <div className="input-bg small-font d-flex flex-between p-2 rounded">
                <span>Select File</span>
                <MdOutlineFileUpload size={18} />
              </div>
            </label>
          </div>
          <div className="col-12 flex-column mt-2">
            <label className="black-text4 mb-1">Promotion Message</label>
            <textarea
              placeholder="Enter"
              className="all-none input-bg small-font p-2 rounded"
              rows="3"
              style={{ resize: "none" }}
            />
          </div>
        </div>
        <div className="w-100 flex-end mt-3 mb-2">
          <div className="col-3">
            <div className="saffron-btn2 small-font pointer">Create</div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CasinoPromotionsPopUp;
