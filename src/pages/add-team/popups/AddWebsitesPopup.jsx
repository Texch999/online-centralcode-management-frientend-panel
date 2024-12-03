import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";

const AddWebsitesPopup = ({ show, onHide }) => {
  const [websiteType, setWebsiteType] = useState("1");
  const [websiteName, setWebsiteName] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");

  const handleSubmit = () => {
    if (websiteName === "" || websiteURL === "") {
      alert("Please fill in all fields before submitting.");
      return;
    }

    console.log({ websiteType, websiteName, websiteURL });

    setWebsiteType("1");
    setWebsiteName("");
    setWebsiteURL("");

    onHide();
  };

  return (
    <Modal centered show={show} onHide={onHide} size="md">
      <Modal.Body>
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="medium-font fw-600">Add Website</h5>
          <MdOutlineClose size={22} onClick={onHide} className="pointer" />
        </div>

        {/* Form Section */}
        <div className="row mb-4">
          {/* Website Type Dropdown */}
          <div className="col-4">
            <label htmlFor="websiteType" className="small-font fw-400 mb-1">
              Website Type
            </label>
            <select
              id="websiteType"
              className="w-100 small-font rounded input-css select-input"
              value={websiteType}
              onChange={(e) => setWebsiteType(e.target.value)}
            >
              <option className="small-font" value="1">
                Option 1
              </option>
              <option className="small-font" value="2">
                Option 2
              </option>
              <option className="small-font" value="3">
                Option 3
              </option>
            </select>
          </div>

          {/* Website Name Input */}
          <div className="col-4">
            <label htmlFor="websiteName" className="small-font mb-1">
              Website Name
            </label>
            <input
              id="websiteName"
              type="text"
              className="input-css all-none rounded w-100 p-0 py-2 px-2"
              placeholder="Enter"
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
            />
          </div>

          <div className="col-4">
            <label htmlFor="websiteURL" className="small-font mb-1">
              Website URL
            </label>
            <input
              id="websiteURL"
              type="text"
              className="all-none rounded input-css w-100"
              placeholder="Enter"
              value={websiteURL}
              onChange={(e) => setWebsiteURL(e.target.value)}
            />
          </div>
        </div>

        <div className="row d-flex justify-content-between align-items-center">
          <div className="col-4">
            <label htmlFor="websiteType2" className="small-font fw-400 mb-1">
              Website Type
            </label>
            <select
              id="websiteType2"
              className="w-100 input-css py-2 small-font rounded all-none select-input"
              value={websiteType}
              onChange={(e) => setWebsiteType(e.target.value)}
            >
              <option className="small-font" value="1">
                Option 1
              </option>
              <option className="small-font" value="2">
                Option 2
              </option>
              <option className="small-font" value="3">
                Option 3
              </option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="col-4 align-self-end">
            <button
              type="button"
              className="saffron-btn w-100 rounded"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddWebsitesPopup;
