import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import { MdOutlineFileUpload } from "react-icons/md";
import { Images } from "../../images";

const UploadPosterPopUp = ({ uploadPoster, setUploadPoster }) => {
  return (
    <Modal show={uploadPoster} size="md" centered>
      <Modal.Body>
        <div className="d-flex w-100 flex-between">
          <h6 className="fw-600 mb-0">Upload Poster</h6>
          <IoCloseSharp
            size={20}
            className="pointer"
            onClick={() => setUploadPoster(false)}
          />
        </div>
        <div className="row small-font">
          <div className="col-12 flex-column mt-3">
            <label className="black-text4 mb-1">Upload New Poster </label>
            <label htmlFor="poster">
              <input type="file" style={{ display: "none" }} id="poster" />
              <div className="input-bg small-font d-flex flex-between p-2 rounded">
                <span>Select File</span> <MdOutlineFileUpload size={18} />
              </div>
            </label>
          </div>
          <div className="col-12 flex-column mt-3">
            <label className="black-text4 mb-1">Offer Text</label>
            <textarea
              placeholder="Enter"
              className="all-none input-bg small-font p-2 rounded"
              rows="4"
              style={{ resize: "none" }}
            ></textarea>
          </div>
          <div className="col-12 flex-column mt-3">
            <label className="black-text4 mb-1">Preview</label>
            <div className="relative col-7">
              <img src={Images.promotion2} alt="Poster" className="w-100" />
              <div className="balck-btn small-font me-1 w-100">
                100% Welcome bonus up to 33000 INR
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 mt-3 saffron-btn2 small-font pointer col-12">
          Upload
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UploadPosterPopUp;
