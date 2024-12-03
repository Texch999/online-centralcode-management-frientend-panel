import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";

const EditProfilePopup = ({ show, onHide }) => {
  // Define state variables for each input
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

  // Handle file input change
  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file); // Save the selected file in state
    }
  };

  const handleSubmit = () => {
    // Call API to update user profile
    if (name === "" || phoneNumber === "" || profilePhoto === "") {
      alert("Please fill in all fields before submitting.");
      return;
    }

    // Reset the state after submission
    setName("");
    setPhoneNumber("");
    setProfilePhoto(null);

    //Hide the popup after submition.
    onHide();
  };

  return (
    <Modal centered show={show} onHide={onHide} size="md">
      <Modal.Body className="p-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="medium-font fw-600">Add Payment Gateway</h5>
          <MdOutlineClose size={22} onClick={onHide} className="pointer" />
        </div>

        <div className="row d-flex mb-3">
          {/* Name Field */}
          <div className="col-4">
            <label htmlFor="name" className="small-font fw-400 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="all-none rounded input-css w-100"
              placeholder="Enter"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Phone Number Field */}
          <div className="col-4">
            <label htmlFor="phoneNumber" className="small-font fw-400 mb-1">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="text"
              className="all-none rounded input-css w-100"
              placeholder="Enter"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          {/* Profile Photo Upload Field */}
          <div className="col-4">
            <label htmlFor="profilePhoto" className="small-font fw-400 mb-1">
              Upload Profile Photo
            </label>
            <div className="input-group">
              <input
                id="profilePhoto"
                type="file"
                className="form-control all-none"
                onChange={handleProfilePhotoChange}
                style={{ display: "none" }} // Hide the actual file input
                value={profilePhoto}
              />
              <label
                htmlFor="profilePhoto"
                className="upload-input-popup d-flex justify-content-between align-items-center rounded w-100 pointer all-none"
              >
                <span className="small-font">Upload</span>
                <AiOutlineCloudUpload size={20} />
              </label>
            </div>
          </div>
          <div className="row d-flex align-items-center justify-content-end m-0 p-0">
            <div className="col-4 pointer mt-3 ">
              <button
                type="button"
                className="saffron-btn rounded w-100"
                onClick={handleSubmit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditProfilePopup;
