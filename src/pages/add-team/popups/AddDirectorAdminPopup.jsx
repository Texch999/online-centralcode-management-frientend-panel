import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../../App.css"
import { MdOutlineClose } from "react-icons/md";

const AddDirectorAdminModal = ({ show, handleClose }) => {
  const role = localStorage.getItem("role_code");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showManagementPassword, setShowManagementPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleFocus = () => setIsOpen(true);
  const handleBlur = () => setIsOpen(false);

  const togglePasswordVisibility = (setVisibility) => {
    setVisibility((prev) => !prev);
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Body className="p-1 director-admin-popupbody px-2 py-2">
        {/* Row 1: Title and Close Icon */}
        <div className="d-flex justify-content-between align-items-center mb-2 px-3">
          {role === "management" ? (
          <h5 className="mb-0 medium-font black-text">Add Director & Super Admin</h5>
          ):(
            <h5 className="mb-0 medium-font black-text">Add Super Admin</h5>
        )}
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
                  className="w-100 small-font rounded all-none input-css"
                >
                  <option value="">Select</option>
                  <option value="Accounts">Accounts</option>
                  <option value="Designer">Designer</option>
                  <option value="Company Team">Company Team</option>
                </select>
              </div>
            </div>

            <div className="col-md-4">
              <label className="small-font">Name</label>
              <input type="text" className="small-font rounded all-none input-css w-100" placeholder="Enter" />
            </div>
            <div className="col-md-4">
              <label className="small-font">Login Name</label>
              <input type="text" className="small-font rounded all-none input-css w-100" placeholder="Enter" />
            </div>
          </div>

          {/* Row 3: Website, Share, Rent */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="small-font">Website</label>
              <select className="small-font rounded all-none input-css w-100">
                <option>Select</option>
                <option>techx.com</option>
                <option>sparkbook999.com</option>
                <option>casinopark.com</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="small-font">Share</label>
              <input type="text" className="small-font rounded all-none input-css w-100" placeholder="Enter" />
            </div>
            <div className="col-md-4">
              <label className="small-font">Rent</label>
              <input type="text" className="small-font rounded all-none input-css w-100" placeholder="Enter" />
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
              <label className="small-font">Country</label>
              <input type="text" className="small-font rounded all-none input-css w-100" placeholder="Enter" />
            </div>
            <div className="col-md-4 position-relative">
              <label className="small-font">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="small-font rounded all-none input-css w-100"
                placeholder="Enter Password"
              />
              <span
                className="position-absolute"
                style={{ right: "1.5rem", top: "1.8rem", cursor: "pointer" }}
                onClick={() => togglePasswordVisibility(setShowPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div className="col-md-4 position-relative">
              <label className="small-font">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="small-font rounded all-none input-css w-100"
                placeholder="Enter Password"
              />
              <span
                className="position-absolute"
                style={{ right: "1.5rem", top: "1.8rem", cursor: "pointer" }}
                onClick={() => togglePasswordVisibility(setShowConfirmPassword)}
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          {/* Row 6: Management Password & Submit Button */}
          <div className="row mb-3 d-flex justify-content-between">
            <div className="col-md-4 position-relative">
              <label className="small-font">Management Password</label>
              <input
                type={showManagementPassword ? "text" : "password"}
                className="small-font rounded all-none input-css w-100"
                placeholder="Enter Password"
              />
              <span
                className="position-absolute"
                style={{ right: "1.5rem", top: "1.8rem", cursor: "pointer" }}
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
