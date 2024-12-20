import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../style.css";
import "../../../App.css";
import Select from "react-select";
import { customStyles } from "../../../components/ReactSelectStyles";
import axios from "axios";

const AddManagementPopup = ({
  formData,
  setFormData,
  onClose,
  onSubmit,
  show,
}) => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
    managementPassword: false,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle react-select changes
  const handleSelectChange = (selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      role: selectedOption.value, // Set selected role value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit(formData);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/api/management-team",
  //       formData
  //     );
  //     onSubmit(response.data); // Update table with new user
  //     onClose();
  //   } catch (error) {
  //     console.error("Error adding management team member:", error);
  //     alert("Failed to add the new member. Please try again.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (formData.id) {
        // If formData contains an id, it's an edit, so use PUT request
        response = await axios.put(
          `http://localhost:8000/api/management-team/${formData.id}`,
          formData
        );
      } else {
        // Otherwise, it's a new entry, use POST request
        response = await axios.post(
          "http://localhost:8000/api/management-team",
          formData
        );
      }

      onSubmit(response.data); // Update table with new or edited user
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error adding/editing management team member:", error);
      alert("Failed to add/edit the member. Please try again.");
    }
  };


  const roleOptions = [
    { value: "Accounts", label: "Accounts" },
    { value: "Designer", label: "Designer" },
    { value: "Company Team", label: "Company Team" },
  ];

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0 fw-600 black-font medium-font">
            {formData.name ? "Edit Management Team" : "Add Management Team"}
          </h6>
          <MdOutlineClose
            size={18}
            onClick={onClose}
            aria-label="Close"
            className="pointer"
          />
          
        </div>
        <form
          className="add-management-popup-form mt-2"
          onSubmit={handleSubmit}
        >
          <div className="row mb-3">
            <div className="col">
              <label className="small-font mb-1">Role</label>
              <Select
                className="small-font"
                options={roleOptions}
                value={roleOptions.find(
                  (option) => option.value === formData.role
                )}
                onChange={handleSelectChange}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
              />
            </div>

            <div className="col">
              <label className="small-font mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleInputChange}
                className="small-font rounded all-none input-css w-100"
                placeholder="Enter"
              />
            </div>
            <div className="col">
              <label className="small-font mb-1">Login Name</label>
              <input
                type="text"
                name="loginName"
                value={formData.loginName || ""}
                onChange={handleInputChange}
                className="small-font rounded all-none input-css w-100"
                placeholder="Enter"
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="small-font mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone || ""}
                onChange={handleInputChange}
                className="small-font rounded all-none input-css w-100"
                placeholder="Enter"
              />
            </div>
            <div className="col-md-4 position-relative">
              <label className="small-font mb-1">Password</label>
              <input
                type={showPassword.password ? "text" : "password"}
                name="password"
                value={formData.password || ""}
                onChange={handleInputChange}
                className="small-font rounded all-none input-css w-100"
                placeholder="Enter Password"
              />
              <span
                className="eye-icon"
                onClick={() => togglePasswordVisibility("password")}
                style={{
                  position: "absolute",
                  right: "10%",
                  top: "50%",
                  cursor: "pointer",
                }}
              >
                {showPassword.password ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="col-md-4 position-relative">
              <label className="small-font mb-1">Confirm Password</label>
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword || ""}
                onChange={handleInputChange}
                className="small-font rounded all-none input-css w-100"
                placeholder="Re-enter Password"
              />
              <span
                className="eye-icon"
                onClick={() => togglePasswordVisibility("confirmPassword")}
                style={{
                  position: "absolute",
                  right: "10%",
                  top: "50%",
                  cursor: "pointer",
                }}
              >
                {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="row mb-3 align-items-end">
            <div className="col-md-4">
              <label className="small-font mb-1">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleInputChange}
                className="small-font rounded all-none input-css w-100"
                placeholder="Enter"
              />
            </div>
            <div className="col-md-4 position-relative">
              <label className="small-font mb-1">Management Password</label>
              <input
                type={showPassword.managementPassword ? "text" : "password"}
                name="managementPassword"
                value={formData.managementPassword || ""}
                onChange={handleInputChange}
                className="small-font rounded all-none input-css w-100"
                placeholder="Enter Password"
              />
              <span
                className="eye-icon"
                onClick={() => togglePasswordVisibility("managementPassword")}
                style={{
                  position: "absolute",
                  right: "10%",
                  top: "50%",
                  cursor: "pointer",
                }}
              >
                {showPassword.managementPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="col-md-4 d-flex justify-content-center">
              <Button className="saffron-btn w-100" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddManagementPopup;
