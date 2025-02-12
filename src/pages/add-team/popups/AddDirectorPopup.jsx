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
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  role: yup.string().required("Role is required"),
  name: yup.string().required("Name is required"),
  login_name: yup.string().required("Login Name is required"),
  phone_no: yup
    .string()
    .matches(/^\d{10}$/, "Phone Number must be 10 digits")
    .optional(),
  password: yup.string().when("$isEditMode", {
    is: false,
    then: yup.string().required("Password is required"),
  }),
  confirm_password: yup.string().when("$isEditMode", {
    is: false,
    then: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  }),
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required"),
  parent_password: yup.string().required("Parent Password is required"),
});

function AddDirectorPopup({ selectedUser, onClose, show, isEditMode }) {
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm_password: false,
    parent_password: false,
  });

  const roleOptions = Object.entries(directorEmployees).map(([key, value]) => ({
    value: key,
    label: value,
  }));

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    setError: setFormError,
  } = useForm({
    resolver: yupResolver(schema),
    context: { isEditMode },
  });

  useEffect(() => {
    if (isEditMode && selectedUser) {
      setValue("role", selectedUser.role?.toString() || "");
      setValue("name", selectedUser.name || "");
      setValue("login_name", selectedUser.login_name || "");
      setValue("phone_no", selectedUser.phone_no || "");
      setValue("email", selectedUser.email || "");
      setValue("parent_password", "");
    } else {
      setValue("role", "");
      setValue("name", "");
      setValue("login_name", "");
      setValue("phone_no", "");
      setValue("password", "");
      setValue("confirm_password", "");
      setValue("email", "");
      setValue("parent_password", "");
    }
  }, [selectedUser, isEditMode, show, setValue]);

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const onSubmitHandler = (data) => {
    const apiCall = isEditMode ? updateDirectorEmployeeByID : addDirectorTeam;
    const payload = isEditMode ? { ...data, id: selectedUser.id } : data;

    apiCall(payload)
      .then((response) => {
        if (response?.status === true) {
          console.log("Operation successful", response);
          onClose();
        } else {
          setError("Operation failed");
        }
      })
      .catch((error) => {
        setError(error?.message || "Operation failed");
      });
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
          onSubmit={handleSubmit(onSubmitHandler)}
          className="add-management-popup-form mt-2"
        >
          <div className="row mb-3">
            <div className="col">
              <label className="small-font mb-1">Role</label>
              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <Select
                    className="small-font"
                    options={roleOptions}
                    placeholder="Select"
                    styles={customStyles}
                    value={
                      roleOptions.find(
                        (option) => option.value === field.value
                      ) || null
                    }
                    onChange={(option) => field.onChange(option.value)}
                  />
                )}
              />
            </div>
            <div className="col">
              <label className="small-font mb-1">Name</label>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    className="small-font rounded input-css w-100"
                    placeholder="Enter"
                    required
                  />
                )}
              />
            </div>
            <div className="col">
              <label className="small-font mb-1">Login Name</label>
              <Controller
                control={control}
                name="login_name"
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    className="small-font rounded input-css w-100"
                    placeholder="Enter"
                    required
                  />
                )}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="small-font mb-1">Phone Number</label>
              <Controller
                control={control}
                name="phone_no"
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    className="small-font rounded input-css w-100"
                    placeholder="Enter"
                  />
                )}
              />
            </div>
            {!isEditMode && (
              <>
                <div className="col-md-4 position-relative">
                  <label className="small-font mb-1">Password</label>
                  <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <input
                        type={showPassword.password ? "text" : "password"}
                        {...field}
                        className="small-font rounded input-css w-100"
                        placeholder="Enter Password"
                      />
                    )}
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
                  <Controller
                    control={control}
                    name="confirm_password"
                    render={({ field }) => (
                      <input
                        type={
                          showPassword.confirm_password ? "text" : "password"
                        }
                        {...field}
                        className="small-font rounded input-css w-100"
                        placeholder="Confirm Password"
                      />
                    )}
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
                </div>
              </>
            )}
          </div>

          <div className="row align-items-end">
            <div className="col-md-4">
              <label className="small-font mb-1">Email</label>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <input
                    type="email"
                    {...field}
                    className="small-font rounded input-css w-100"
                    placeholder="Enter Email"
                    required
                  />
                )}
              />
            </div>
            <div className="col-md-4 position-relative">
              <label className="small-font mb-1">Parent Password</label>
              <Controller
                control={control}
                name="parent_password"
                render={({ field }) => (
                  <input
                    type={showPassword.parent_password ? "text" : "password"}
                    {...field}
                    className="small-font rounded input-css w-100"
                    placeholder="Enter Parent Password"
                  />
                )}
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
            </div>
            <div className="col-md-4">
              <button className="saffron-btn w-100" type="submit">
                {isEditMode ? "Update" : "Submit"}
              </button>
            </div>
          </div>
          {error && <p className="text-danger">{error}</p>}
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddDirectorPopup;
