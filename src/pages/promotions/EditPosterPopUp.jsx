import React from "react";
import Modal from "react-bootstrap/Modal";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";

const EditPosterPopUp = ({ editPoster, setEditPoster }) => {
  return (
    <Modal show={editPoster} size="md" centered>
      <Modal.Body>
        <div className="d-flex w-100 flex-between">
          <h6 className="mb-0 fw-600">Edit Poster Template</h6>
          <IoCloseSharp
            size={20}
            onClick={() => setEditPoster(false)}
            className="pointer"
          />
        </div>

        <div className="row mt-3 small-font">
          <div className="col-6 flex-column">
            <label className="black-text4 mb-1">Poster Type</label>
            <select className="input-bg all-none p-2 small-font rounded">
              <option>General Poster</option>
            </select>
          </div>
          <div className="col-6 flex-column">
            <label className="black-text4 mb-1">Location</label>
            <select className="input-bg all-none p-2 small-font rounded">
              <option>Sports-Cricket</option>
            </select>
          </div>

          <div className="col-12 flex-column mt-3 ">
            <label className="black-text4 small-font " htmlFor="poster">
              Upload Poster
              <input type="file" style={{ display: "none" }} id="poster" />
              <div className="input-bg small-font d-flex flex-between p-2 rounded mt-2">
                Select File <MdOutlineFileUpload />
              </div>
            </label>
          </div>
          <div className="row">
            <div className="saffron-btn2 small-font pointer mt-4 ms-3 col-12">
              Submit
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditPosterPopUp;
