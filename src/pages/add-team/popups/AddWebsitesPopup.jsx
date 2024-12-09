import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import Select from "react-select";
import { customStyles } from "../../../components/ReactSelectStyles";

const AddWebsitesPopup = ({ show, onHide }) => {
  const [websiteType, setWebsiteType] = useState("1");
  const [websiteName, setWebsiteName] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");

  const websiteOptions = [
    { value: "Option1", label: "Option 1" },
    { value: "Option2", label: "Option 2" },
    { value: "Option3", label: "Option 3" },
  ];

  const websiteTypeOptions = [
    { value: "Option1", label: "Option 1" },
    { value: "Option2", label: "Option 2" },
    { value: "Option3", label: "Option 3" },
  ];

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
            <label htmlFor="websiteType" className="small-font mb-1">
              Website Type
            </label>
            <Select
              className="small-font"
              options={websiteOptions}
              placeholder="Select"
              styles={customStyles}
              maxMenuHeight={120}
              menuPlacement="auto"
            />
          </div>

          {/* Website Name Input */}
          <div className="col-4">
            <label htmlFor="websiteName" className="small-font mb-1">
              Website Name
            </label>
            <input
              id="websiteName"
              type="text"
              className="w-100 small-font rounded input-css all-none"
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
              className="w-100 small-font rounded input-css all-none"
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
            <Select
              className="small-font"
              options={websiteTypeOptions}
              placeholder="Select"
              styles={customStyles}
              maxMenuHeight={120}
              menuPlacement="auto"
            />
          </div>

          {/* Submit Button */}
          <div className="col-4 align-self-end">
            <button
              type="button"
              className="saffron-btn small-font w-100 rounded"
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
