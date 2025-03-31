import React, { useState, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import { Modal, Button, Spinner } from "react-bootstrap";
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
import ErrorComponent from "../../../components/ErrorComponent";

const AddManagementPopup = ({ onClose, onSubmit, show, editingRowId }) => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
    managementPassword: false,
  });

  const Role = localStorage.getItem("role_code");
  const [roleOptions, setRoleOptions] = useState([]);
  const [error, setError] = useState("");
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [successPopupOpen, setSuccessPopupOpen] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm();

  console.log(errors, "==>errors");

  const password = watch("password");
  const token = localStorage.getItem("jwt_token");

  useEffect(() => {
    getRoles({ token })
      .then((response) => {
        if (response?.status === true && response.data) {
          const roles = response.data
            .filter(
              (role) => role.role !== 1 && role.role !== 2 && role.role !== 5
            )
            .map((role) => ({
              value: role.role,
              label: role.name,
            }));
          // setRoleOptions(roles);
          setRoleOptions(
            roles.map((role, index) =>
              index === 1 && role.label === "promotion"
                ? { ...role, label: "Designing Team" }
                : role
            )
          );
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
    setLoader(true);
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
        if (response?.status === true) {
          setLoader(false);
          if (onSubmit) onSubmit();
          setSuccessPopupOpen(true);
        } else {
          setError("Something Went Wrong");
          setLoader(false);
        }
      })
      .catch((error) => {
        setError(error?.message);
        setLoader(false);
      });
  };

  const handleNameInput = (e) => {
    e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
  };

  const handleLoginNameInput = (e) => {
    e.target.value = e.target.value.replace(/\s/g, ""); // Remove spaces
  };

  const handlePhoneInput = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center fw-600">
          {Role === "management" ? (
            <h6 className="yellow-font mb-0 py-2 ">Add Management Team</h6>
          ) : (
            <h5 className="yellow-font mb-0 py-2 ">Add Director Team</h5>
          )}

          <MdOutlineClose
            size={20}
            type="button"
            onClick={onClose}
            aria-label="Close"
          />
        </div>
        {/* <div className="red-font small-font mt-2">{error}</div> */}

        {error && <ErrorComponent error={error} />}

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
                required="Role is Required"
                value={roleOptions.find(
                  (option) => option.value === selectedRoleId
                )}
                placeholder="Select"
                styles={customStyles}
                maxMenuHeight={120}
                menuPlacement="auto"
                isSearchable={false}
                onChange={(selectedOption) => {
                  setSelectedRoleId(selectedOption?.value);
                  setValue("role", selectedOption?.value, {
                    shouldValidate: true,
                  });
                  trigger("role");
                }}
              />
              {errors.role && (
                <span className="text-danger small-font">
                  {errors.role.message}
                </span>
              )}
            </div>

            <div className="col">
              <label className="small-font mb-1">Name</label>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 60,
                    message: "Name cannot exceed 60 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Name should contain only letters and spaces",
                  },
                })}
                className="small-font rounded all-none input-css w-100"
                placeholder="Enter"
                maxLength={60}
                onInput={handleNameInput}
                onBlur={() => trigger("name")}
              />

              <br />
              {errors.name && (
                <span className="text-danger small-font">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="col">
              <label className="small-font mb-1">Login Name</label>
              <input
                type="text"
                {...register("loginName", {
                  required: "Login Name is required",
                  minLength: {
                    value: 5,
                    message: "Login Name must be at least 5 characters",
                  },
                  maxLength: {
                    value: 15,
                    message: "Login Name cannot exceed 15 characters",
                  },
                })}
                className="small-font rounded all-none input-css w-100"
                placeholder="Enter"
                maxLength={15}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^A-Za-z0-9_]/g, ""); // Allows only letters, numbers, and underscores
                }}
                onBlur={() => trigger("loginName")}
              />

              <br />
              {errors.loginName && (
                <span className="text-danger small-font">
                  {errors.loginName.message}
                </span>
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
                  minLength: {
                    value: 10,
                    message: "Phone Number must be at least 10 digits",
                  },
                  maxLength: {
                    value: 15,
                    message: "Phone Number cannot exceed 15 digits",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Phone Number should contain only numbers",
                  },
                })}
                className="small-font rounded all-none input-css w-100"
                placeholder="Enter"
                maxLength={15}
                onInput={handlePhoneInput}
                onBlur={() => trigger("phoneNumber")}
              />

              {errors.phoneNumber && (
                <span className="text-danger small-font">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>
            <div className="col-md-4 ">
              <div className="position-relative">
                <label className="small-font mb-1">Password</label>
                <div className="input-css w-100 rounded">
                  <input
                    type={showPassword.password ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      maxLength: {
                        value: 36,
                        message: "Password cannot exceed 36 characters",
                      },
                    })}
                    className="small-font rounded all-none  w-80"
                    placeholder="Enter Password"
                    maxLength={36}
                    onBlur={() => trigger("password")}
                  />
                  <span
                    className="eye-icon"
                    onClick={() => togglePasswordVisibility("password")}
                    style={{
                      position: "absolute",
                      right: "5%",
                      top: "50%",
                      cursor: "pointer",
                    }}
                  >
                    {showPassword.password ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>

              <div>
                {errors.password && (
                  <span className="text-danger small-font">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-md-4 ">
              <div className="position-relative">
                <label className="small-font mb-1">Confirm Password</label>
                <div className="input-css w-100 rounded">
                  <input
                    type={showPassword.confirmPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    className="small-font rounded all-none  w-80"
                    placeholder="Re-enter Password"
                    maxLength={36}
                    onBlur={() => trigger("confirmPassword")}
                  />
                  <span
                    className="eye-icon"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    style={{
                      position: "absolute",
                      right: "5%",
                      top: "40%",
                      cursor: "pointer",
                    }}
                  >
                    {showPassword.confirmPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>

                {errors.confirmPassword && (
                  <span className="text-danger small-font">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-md-4 ">
              <label className="small-font mb-1 mt-3">Email:</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  minLength: {
                    value: 6,
                    message: "Email must be at least 6 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "Email cannot exceed 100 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Enter a valid email address",
                  },
                })}
                className="small-font rounded all-none input-css w-100"
                placeholder="Enter"
                maxLength={100}
                onBlur={() => trigger("email")}
              />

              {errors.email && (
                <span className="text-danger small-font">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="col-md-4">
              <div className="position-relative">
                <label className="small-font mb-1 mt-3">
                  Management Password
                </label>

                <div className="input-css w-100 rounded">
                  <input
                    type={showPassword.managementPassword ? "text" : "password"}
                    {...register("managementPassword", {
                      required: "Password is required ",
                    })}
                    className="small-font rounded all-none  w-80"
                    placeholder="Enter Password"
                    onBlur={() => trigger("managementPassword")}
                    onFocus={() => setFocusedField("managementPassword")}
                  />
                  <span
                    className="eye-icon"
                    onClick={() =>
                      togglePasswordVisibility("managementPassword")
                    }
                    style={{
                      position: "absolute",
                      right: "5%",
                      top: "60%",
                      cursor: "pointer",
                    }}
                  >
                    {showPassword.managementPassword ? (
                      <FaEye />
                    ) : (
                      <FaEyeSlash />
                    )}
                  </span>
                </div>
              </div>

              {errors.managementPassword && (
                <span className="text-danger small-font">
                  {errors.managementPassword.message}
                </span>
              )}
            </div>

            <div
              className={`col-4 flex-center  ${
                errors.managementPassword ? "mt-3" : "mt-4"
              }`}
            >
              <button
                className={`saffron-btn br-5   w-100   ${
                  errors.managementPassword ? "" : "mt-2"
                }`}
                type="submit"
                disabled={loader === true ? true : false}
              >
                {loader === true ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  ""
                )}

                <span className="ms-2">Submit</span>
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddManagementPopup;
