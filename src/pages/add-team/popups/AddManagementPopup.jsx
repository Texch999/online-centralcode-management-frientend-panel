import React, { useState, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { customStyles } from "../../../components/ReactSelectStyles";
import {
  addManagemnentTeam,
  getEmployeeDetailsById,
  getRoles,
} from "../../../api/apiMethods";
import "../style.css";
import "../../../App.css";
import SuccessPopup from "../../popups/SuccessPopup";

const AddManagementPopup = ({ onClose, onSubmit, show, editingRowId }) => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
    managementPassword: false,
  });

  const Role = localStorage.getItem("role_code");
  console.log(editingRowId, "editingRowId");
  const [roleOptions, setRoleOptions] = useState([]);
  const [error, setError] = useState("");
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [successPopupOpen, setSuccessPopupOpen] = useState(null);



  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const token = localStorage.getItem("jwt_token");

  useEffect(() => {
    getRoles({ token })
      .then((response) => {
        if (response?.status === true && response.data) {
          const roles = response.data
            .filter((role) => role.role !== 1 && role.role !== 2) // Exclude owner and management
            .map((role) => ({
              value: role.role,
              label: role.name,
            }));
          console.log(roles, "Filtered roles");
          setRoleOptions(roles);
        } else {
          setError("Failed to fetch roles");
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Error fetching roles");
      });
  }, []);

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const onSubmitHandler = (data) => {
    const payload = {
      role: data.role,
      name: data.name,
      login_name: data.loginName,
      phone_no: data.phoneNumber,
      email: data.email,
      password: data.password,
      confirm_password: data.confirmPassword,
      management_password: data.managementPassword,
    };

    addManagemnentTeam(payload)
      .then((response) => {
        console.log(response, "response from API");
        if (response?.status === true) {

          if (onSubmit) onSubmit();
          setSuccessPopupOpen(true);
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setError(error?.message)
      });
  };


  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center">
          {Role === "management" ? (
            <h6 className="yellow-font mb-0 py-2 border-bottom-grey">
              Add Management Team
            </h6>
          ) : (
            <h5 className="yellow-font mb-0 py-2 border-bottom-grey">
              Add Director Team
            </h5>
          )}

          <MdOutlineClose
            size={20}
            type="button"
            onClick={onClose}
            aria-label="Close"
          />
        </div>
        <div className="red-font small-font">{error}</div>
        <form
          className="add-management-popup-form mt-2"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="row mb-3">
            <div className="col">
              <label className="small-font mb-1">Role</label>

              <Select
                className="small-font text-capitalize"
                options={roleOptions}
                value={roleOptions.find(
                  (option) => option.value === selectedRoleId
                )}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
                onChange={(selectedOption) => {
                  setSelectedRoleId(selectedOption?.value);
                  setValue("role", selectedOption?.value, {
                    shouldValidate: true,
                  });
                }}
              />

              {errors.role && (
                <p className="text-danger small-font">
                  {errors.role.message}
                </p>
              )}
            </div>

            <div className="col">
              <label className="small-font mb-1">Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="small-font rounded all-none input-css w-100"
                placeholder="Enter"
              />
              {errors.name && (
                <p className="text-danger small-font">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="col">
              <label className="small-font mb-1">Login Name</label>
              <input
                type="text"
                {...register("loginName", {
                  required: "Login Name is required",
                })}
                className="small-font rounded all-none input-css w-100"
                placeholder="Enter"
              />
              {errors.loginName && (
                <p className="text-danger small-font">
                  {errors.loginName.message}
                </p>
              )}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="small-font mb-1">Phone Number</label>
              <input
                type="text"
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit phone number",
                  },
                })}
                className="small-font rounded all-none input-css w-100"
                placeholder="Enter"
              />
              {errors.phoneNumber && (
                <p className="text-danger small-font">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div className="col-md-4 position-relative">
              <label className="small-font mb-1">Password</label>
              <input
                type={showPassword.password ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
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
              {errors.password && (
                <p className="text-danger small-font">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="col-md-4 position-relative">
              <label className="small-font mb-1">Confirm Password</label>
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
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
              {errors.confirmPassword && (
                <p className="text-danger small-font">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className="row mb-3 align-items-end">
            <div className="col-md-4">
              <label className="small-font mb-1">Email:</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Enter a valid email address",
                  },
                })}
                className="small-font rounded all-none input-css w-100"
                placeholder="Enter"
              />
              {errors.email && (
                <p className="text-danger small-font">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="col-md-4 position-relative">
              <label className="small-font mb-1">Management Password</label>
              <input
                type={showPassword.managementPassword ? "text" : "password"}
                {...register("managementPassword", {
                  required: "Management Password is required",
                })}
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
              {errors.managementPassword && (
                <p className="text-danger small-font">
                  {errors.managementPassword.message}
                </p>
              )}
            </div>

            <div className="col-md-4 d-flex justify-content-center">
              <Button className="saffron-btn w-100" type="submit">
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
