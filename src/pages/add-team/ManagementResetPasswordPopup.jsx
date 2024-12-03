import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineClose,
} from "react-icons/ai";
import "../../index.css";
import "../../App.css";

const ManagementResetPasswordPopup = ({ isOpen, onRequestClose }) => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Modal
      show={isOpen}
      onHide={onRequestClose}
      centered
      dialogClassName="custom-modal-width"
    >
      <Modal.Body className="px-4 py-4 position-relative">
        <div className="d-flex justify-content-center align-items-center mb-4 position-relative">
          <h2 className="large-font mx-auto">Reset Password</h2>
          <AiOutlineClose
            onClick={onRequestClose}
            size={20}
            style={{ cursor: "pointer", position: "absolute", right: 0 }}
          />
        </div>

        {/* New Password Field with Label */}
        <div className="mb-3">
          <label className="form-label medium-font">New Password</label>
          <div className="d-flex align-items-center border rounded p-2 bg-light">
            <input
              type={showNewPassword ? "text" : "password"}
              className="input-no-border flex-grow-1"
              placeholder="Enter Password"
            />
            <span
              className="ms-2"
              style={{ cursor: "pointer" }}
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
        </div>

        {/* Confirm Password Field with Label */}
        <div className="mb-3">
          <label className="form-label medium-font">Confirm Password</label>
          <div className="d-flex align-items-center border rounded p-2 bg-light">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="input-no-border flex-grow-1"
              placeholder="Re-enter Password"
            />
            <span
              className="ms-2"
              style={{ cursor: "pointer" }}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible />
              ) : (
                <AiOutlineEye />
              )}
            </span>
          </div>
        </div>

        <Button
          variant="warning"
          className="w-100 text-white mt-3"
          style={{ backgroundColor: "#FFA726", border: "none" }}
          onClick={onRequestClose}
        >
          Submit
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ManagementResetPasswordPopup;
