import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { Modal } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Select from "react-select";
import { customStyles } from "../../../components/ReactSelectStyles";
import { directorEmployees } from "../../../utils/enum";
import {
  addDirectorTeam,
  updateDirectorEmployeeByID,
} from "../../../api/apiMethods";

function AddDirectorPopup({ selectedUser, onClose, show, isEditMode }) {
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    login_name: "",
    phone_no: "",
    password: "",
    confirm_password: "",
    email: "",
    parent_password: "",
  });

  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState(null);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm_password: false,
    parent_password: false,
  });

  const roleOptions = Object.entries(directorEmployees).map(([key, value]) => ({
    value: key,
    label: value,
  }));

  useEffect(() => {
    if (isEditMode && selectedUser) {
      setFormData({
        role: selectedUser.role?.toString() || "",
        name: selectedUser.name || "",
        login_name: selectedUser.login_name || "",
        phone_no: selectedUser.phone_no || "",
        email: selectedUser.email || "",
        parent_password: "",
        password: "",
        confirm_password: "",
      });
    } else {
      setFormData({
        role: "",
        name: "",
        login_name: "",
        phone_no: "",
        password: "",
        confirm_password: "",
        email: "",
        parent_password: "",
      });
    }
  }, [selectedUser, isEditMode, show]);

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      role: selectedOption.value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, role: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.login_name) {
      newErrors.login_name = "Login Name is required";
    }

    if (formData.phone_no && !/^\d{10}$/.test(formData.phone_no)) {
      newErrors.phone_no = "Phone Number must be 10 digits";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email must be a valid email";
    }

    if (!isEditMode) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }

      if (!formData.confirm_password) {
        newErrors.confirm_password = "Confirm Password is required";
      } else if (formData.confirm_password !== formData.password) {
        newErrors.confirm_password = "Passwords must match";
      }
    }

    if (!formData.parent_password) {
      newErrors.parent_password = "Parent Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      let response;
      if (isEditMode) {
        const { password, confirm_password, ...updateData } = formData;

        response = await updateDirectorEmployeeByID(
          selectedUser.id,
          updateData
        );
      } else {
        response = await addDirectorTeam(formData);
      }

      if (response?.status === true) {
        console.log("Operation successful", response);
        onClose();
      } else {
        setBackendError(response?.message || "Operation failed");
      }
    } catch (error) {
      setBackendError(error.message || "Operation failed");
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="yellow-font mb-0 py-2 border-bottom-grey">
            {isEditMode ? "Edit Director Team" : "Add Director Team"}
          </h5>
          <MdOutlineClose size={20} type="button" onClick={onClose} />
        </div>

        <form
          onSubmit={onSubmitHandler}
          className="add-management-popup-form mt-2"
        >
          {backendError && <p className="text-danger">{backendError}</p>}

          <div className="row mb-3">
            <div className="col">
              <label className="small-font mb-1">Role</label>
              <Select
                className="small-font"
                options={roleOptions}
                placeholder="Select"
                styles={customStyles}
                value={
                  roleOptions.find(
                    (option) => option.value === formData.role
                  ) || null
                }
                onChange={handleSelectChange}
              />
              {errors.role && (
                <p className="text-danger small-font">{errors.role}</p>
              )}
            </div>
            <div className="col">
              <label className="small-font mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="small-font rounded input-css w-100"
                placeholder="Enter"
              />
              {errors.name && (
                <p className="text-danger small-font">{errors.name}</p>
              )}
            </div>
            <div className="col">
              <label className="small-font mb-1">Login Name</label>
              <input
                type="text"
                name="login_name"
                value={formData.login_name}
                onChange={handleChange}
                className="small-font rounded input-css w-100"
                placeholder="Enter"
              />
              {errors.login_name && (
                <p className="text-danger small-font">{errors.login_name}</p>
              )}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="small-font mb-1">Phone Number</label>
              <input
                type="text"
                name="phone_no"
                value={formData.phone_no}
                onChange={handleChange}
                className="small-font rounded input-css w-100"
                placeholder="Enter"
              />
              {errors.phone_no && (
                <p className="text-danger small-font">{errors.phone_no}</p>
              )}
            </div>
            {!isEditMode && (
              <>
                <div className="col-md-4 position-relative">
                  <label className="small-font mb-1">Password</label>
                  <input
                    type={showPassword.password ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="small-font rounded input-css w-100"
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
                  {errors.password && (
                    <p className="text-danger small-font">{errors.password}</p>
                  )}
                </div>
                <div className="col-md-4 position-relative">
                  <label className="small-font mb-1">Confirm Password</label>
                  <input
                    type={showPassword.confirm_password ? "text" : "password"}
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    className="small-font rounded input-css w-100"
                    placeholder="Confirm Password"
                  />
                  <span
                    className="eye-icon"
                    onClick={() => togglePasswordVisibility("confirm_password")}
                    style={{
                      position: "absolute",
                      right: "10%",
                      top: "50%",
                      cursor: "pointer",
                    }}
                  >
                    {showPassword.confirm_password ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {errors.confirm_password && (
                    <p className="text-danger small-font">
                      {errors.confirm_password}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="row align-items-end">
            <div className="col-md-4">
              <label className="small-font mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="small-font rounded input-css w-100"
                placeholder="Enter Email"
              />
              {errors.email && (
                <p className="text-danger small-font">{errors.email}</p>
              )}
            </div>
            <div className="col-md-4 position-relative">
              <label className="small-font mb-1">Parent Password</label>
              <input
                type={showPassword.parent_password ? "text" : "password"}
                name="parent_password"
                value={formData.parent_password}
                onChange={handleChange}
                className="small-font rounded input-css w-100"
                placeholder="Enter Parent Password"
              />
              <span
                className="eye-icon"
                onClick={() => togglePasswordVisibility("parent_password")}
                style={{
                  position: "absolute",
                  right: "10%",
                  top: "50%",
                  cursor: "pointer",
                }}
              >
                {showPassword.parent_password ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.parent_password && (
                <p className="text-danger small-font">
                  {errors.parent_password}
                </p>
              )}
            </div>
            <div className="col-md-4">
              <button className="saffron-btn w-100" type="submit">
                {isEditMode ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddDirectorPopup;
