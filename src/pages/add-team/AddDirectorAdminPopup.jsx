import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import { FiChevronDown } from "react-icons/fi";
import "../../App.css";

const AddDirectorAdminModal = ({ show, handleClose }) => {
  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showManagementPassword, setShowManagementPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Event handlers for managing focus state
  const handleFocus = () => setIsOpen(true);
  const handleBlur = () => setIsOpen(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = (setVisibility) => {
    setVisibility((prev) => !prev);
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Body className="p-1 director-admin-popupbody">
        {/* Row 1: Title and Close Icon */}
        <div className="d-flex justify-content-between align-items-center mb-2 px-3">
          <h5 className="mb-0">Add Director & Super Admin</h5>
          <Button
            variant="link"
            onClick={handleClose}
            className="text-dark fs-4"
          >
            <MdOutlineClose />
          </Button>
        </div>

        <form className="add-management-popup-form px-3">
          <div className="row mb-3">
            
            <div className="col-md-4 position-relative">
              <label>Role</label>
              <div className="custom-select-wrapper">
                <select
                  name="role"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className="form-control custom-select"
                >
                  <option value="">Select</option>
                  <option value="Accounts">Accounts</option>
                  <option value="Designer">Designer</option>
                  <option value="Company Team">Company Team</option>
                </select>
                <div className="select-icon">
                  {isOpen ? (
                    <IoIosArrowUp className="up-icon" />
                  ) : (
                    <FiChevronDown className="down-icon" />
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <label>Name</label>
              <input type="text" className="form-control" placeholder="Enter" />
            </div>
            <div className="col-md-4">
              <label>Login Name</label>
              <input type="text" className="form-control" placeholder="Enter" />
            </div>
          </div>

          {/* Row 3: Website, Share, Rent */}
          <div className="row mb-3">

            <div className="col-md-4">
              <label>Website</label>
              <select className="form-control">
                <option>Select</option>
                <option>techx.com</option>
                <option>sparkbook999.com</option>
                <option>casinopark.com</option>
              </select>
            </div>

            <div className="col-md-4">
              <label>Share</label>
              <input type="text" className="form-control" placeholder="Enter" />
            </div>
            <div className="col-md-4">
              <label>Rent</label>
              <input type="text" className="form-control" placeholder="Enter" />
            </div>
          </div>

          {/* Row 4: + Add Button */}
          <div className="row m-0 mt-0 mb-0">
            <div className="col-md-12 text-end">
              <button type="button" className="btn p-0">
                <span style={{ color: "#1912C8", fontSize: "25px" }}>+</span>{" "}
                Add
              </button>
            </div>
          </div>

          {/* Row 5: Country, Password, Confirm Password */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label>Country</label>
              <input type="text" className="form-control" placeholder="Enter" />
            </div>
            <div className="col-md-4 position-relative">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter Password"
              />
              <span
                className="position-absolute"
                style={{ right: "1.5rem", top: "2.2rem", cursor: "pointer" }}
                onClick={() => togglePasswordVisibility(setShowPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div className="col-md-4 position-relative">
              <label>Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter Password"
              />
              <span
                className="position-absolute"
                style={{ right: "1.5rem", top: "2.2rem", cursor: "pointer" }}
                onClick={() => togglePasswordVisibility(setShowConfirmPassword)}
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          {/* Row 6: Management Password & Submit Button */}
          <div className="row mb-3 d-flex justify-content-between">
            <div className="col-md-4 position-relative">
              <label>Management Password</label>
              <input
                type={showManagementPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter Password"
              />
              <span
                className="position-absolute"
                style={{ right: "1.5rem", top: "2.2rem", cursor: "pointer" }}
                onClick={() =>
                  togglePasswordVisibility(setShowManagementPassword)
                }
              >
                {showManagementPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div className="col-md-4 d-flex align-items-end">
              <button
                type="button"
                className="saffron-btn2 add-mng-pop-btn w-100"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddDirectorAdminModal;
