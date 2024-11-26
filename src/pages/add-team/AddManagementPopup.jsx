import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../add-team/style.css";
import "../../App.css";

const AddManagementPopup = ({
  formData,
  setFormData,
  onClose,
  onSubmit,
  show,
}) => {
  const [showPassword, setShowPassword] = React.useState({
    password: false,
    confirmPassword: false,
    managementPassword: false,
  });

  // Handle form value changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <div className="d-flex justify-content-between align-items-center pt-4 px-4">
        <h6 className="mb-0 add-management-popup-header">
          {formData.name ? "Edit Management Team" : "Add Management Team"}
        </h6>
        <MdOutlineClose size={25} type="button" onClick={onClose} aria-label="Close"/>
      </div>
      <Modal.Body>
        <form className="add-management-popup-form px-3" onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-4">
              <label>Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select</option>
                <option value="Accounts">Accounts</option>
                <option value="Designer">Designer</option>
                <option value="Company Team">Company Team</option>
              </select>
            </div>
            <div className="col-md-4">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter"
              />
            </div>
            <div className="col-md-4">
              <label>Login Name</label>
              <input
                type="text"
                name="loginName"
                value={formData.loginName}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter"
              />
            </div>
          </div>

          {/* Row 2: Phone Number, Password, Confirm Password */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter"
              />
            </div>
            <div className="col-md-4 position-relative">
              <label>Password</label>
              <input
                type={showPassword.password ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Password"
              />
              <span
                className="eye-icon"
                onClick={() => togglePasswordVisibility("password")}
                style={{
                  position: "absolute",
                  right: "25px",
                  top: "55%",
                  cursor: "pointer",
                }}
              >
                {showPassword.password ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="col-md-4 position-relative">
              <label>Confirm Password</label>
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-control"
                placeholder="Re-enter Password"
              />
              <span
                className="eye-icon"
                onClick={() => togglePasswordVisibility("confirmPassword")}
                style={{
                  position: "absolute",
                  right: "25px",
                  top: "55%",
                  cursor: "pointer",
                }}
              >
                {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Row 3: Email, Management Password, Submit Button */}
          <div className="row mb-3 align-items-end">
            <div className="col-md-4">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter"
              />
            </div>
            <div className="col-md-4 position-relative">
              <label>Management Password</label>
              <input
                type={showPassword.managementPassword ? "text" : "password"}
                name="managementPassword"
                value={formData.managementPassword}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Password"
              />
              <span
                className="eye-icon"
                onClick={() => togglePasswordVisibility("managementPassword")}
                style={{
                  position: "absolute",
                  right: "25px",
                  top: "55%",
                  cursor: "pointer",
                }}
              >
                {showPassword.managementPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="col-md-4 d-flex justify-content-center">
              <Button className="saffron-btn2 add-mng-pop-btn w-100" onClick={handleSubmit}>
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
