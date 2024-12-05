import { useState } from "react";
import { Modal } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ResetPasswordPopup({ resetPasswordPopup, setResetPasswordPopup }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleCancel = () => {
    setResetPasswordPopup(false);
  };

  return (
    <Modal show={resetPasswordPopup} centered size="sm">
      <Modal.Body>
        <div className="flex-between black-text4">
          <h6 className="fw-600 mb-0">Reset Password</h6>
          <IoCloseSharp size={20} onClick={handleCancel} className="pointer" />
        </div>
        <div className="row small-font mb-3">
          <div className="col-12 flex-column mt-3">
            <label className="black-text4 mb-1">New Password</label>
            <div className="grey-box flex-between">
              <input
                className="all-none"
                placeholder="Enter Password"
                type={showPassword ? "text" : "password"}
              />
              {showPassword ? (
                <FaEyeSlash
                  className="black-text4"
                  size={18}
                  onClick={() => setShowPassword(false)}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <FaEye
                  className="black-text4"
                  size={18}
                  onClick={() => setShowPassword(true)}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
          </div>

          <div className="col-12 flex-column mt-3">
            <label className="black-text4 mb-1">Confirm Password</label>
            <div className="grey-box flex-between">
              <input
                className="all-none"
                placeholder="Re-enter Password"
                type={showConfirmPassword ? "text" : "password"}
              />
              {showConfirmPassword ? (
                <FaEyeSlash
                  className="black-text4"
                  size={18}
                  onClick={() => setShowConfirmPassword(false)}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <FaEye
                  className="black-text4"
                  size={18}
                  onClick={() => setShowConfirmPassword(true)}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
          </div>

          <div className="col-12 mt-3">
            <button className="w-100 saffron-btn2">Submit</button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ResetPasswordPopup;
