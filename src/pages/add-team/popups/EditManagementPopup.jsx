import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import {
  getEmployeeDetailsById,
  updateEmployeeByID,
} from "../../../api/apiMethods";
import { Roles } from "../../../utils/enum";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLoaderData } from "react-router";
import ErrorComponent from "../../../components/ErrorComponent";

function EditManagementPopup({
  EditShow,
  handleEditShowClose,
  editingRowId,
  setDiscription,
  setSuccessPopupOpen,
}) {
  const [employeeData, setEmployeeData] = useState();
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    login_name: "",
    phone_no: "",
    email: "",
    management_password: "",
  });
  const [errors, setErrors] = useState({});
  const [backendErrors, setBackendErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [initialLoading, setInitialLoadig] = useState(false);

  const togglePasswordVisibility = (field) => {
    setShowPassword(!showPassword);
  };

  console.log(initialLoading, "==>initialLoading");

  useEffect(() => {
    // Check if employeeData has any keys or values
    if (employeeData && Object.keys(employeeData).length > 0) {
      setInitialLoadig(false); // Data is present, set false
    } else {
      setInitialLoadig(true); // No data, set true
    }
  }, [employeeData]);

  useEffect(() => {
    if (editingRowId) {
      getEmployeeDetailsById(editingRowId)
        .then((response) => {
          if (response && response.userDeatils) {
            setEmployeeData(response.userDeatils);
          }
        })
        .catch((error) => {
          console.log(error, "error");
          if (error) {
            setErrors(error.message);
          } else {
            setErrors("Something Went Wrong");
          }
        });
    }
  }, [editingRowId]);

  useEffect(() => {
    if (employeeData) {
      setFormData({
        role: employeeData.role_id || "",
        name: employeeData.name || "",
        login_name: employeeData.login_name || "",
        phone_no: employeeData.phone_no || "",
        email: employeeData.email || "",
        management_password: "",
      });
    }
  }, [employeeData]);

  const validateForm = () => {
    let errors = {};
    if (!formData.name || formData.name.length < 3) {
      errors.name = "Name must be at least 3 characters long";
    }
    if (!formData.login_name || formData.login_name.length < 3) {
      errors.login_name = "Login name must be at least 3 characters long";
    }
    if (!formData.phone_no || formData.phone_no.length < 10) {
      errors.phone_no = "Number must be at least 10 digits";
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.management_password) {
      errors.management_password = "Password is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoader(true);
    updateEmployeeByID(editingRowId, formData)
      .then(() => {
        setLoader(false);
        setDiscription("Updated Successfully"); // Set success message

        setSuccessPopupOpen(true); // Open success popup
        handleEditShowClose(); // Close the edit modal
      })
      .catch((error) => {
        if (error) {
          setErrors(error);
          setLoader(false);
          console.log("update clicked");
          setBackendErrors(error?.message);
        } else {
          setErrors("Something Went Wrong");
        }
      });
  };

  return (
    <Modal show={EditShow} onHide={handleEditShowClose} size="md" centered>
      {initialLoading && (
        <div className="my-load">
          <div className="loader "></div>
        </div>
      )}

      <Modal.Body>
        <div className="d-flex   justify-content-between align-items-center fw-600">
          <span className="yellow-font"> Edit Management Team </span>
          <MdOutlineClose
            size={20}
            type="button"
            onClick={handleEditShowClose}
          />
        </div>
        {backendErrors?.length > 0 && <ErrorComponent error={backendErrors} />}
        <form
          className="add-management-popup-form mt-2"
          onSubmit={handleSubmit}
        >
          <div className="row mb-3 align-items-start">
            {/* <div className="red-font small-font mt-2">{backendErrors}</div> */}

            <div className="col">
              <label className="small-font mb-1">Role</label>
              <select
                name="role"
                className="small-font rounded input-css w-100"
                value={formData.role}
                onChange={handleChange}
                disabled
              >
                {Object.entries(Roles).map(([id, roleName]) => (
                  <option key={id} value={id}>
                    {roleName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <label className="small-font mb-1">Name</label>
              <input
                type="text"
                name="name"
                className="small-font rounded input-css w-100"
                placeholder="Enter"
                value={formData.name}
                onChange={handleChange}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, ""); // Allows only letters and spaces
                }}
              />
              {errors.name && (
                <p className="text-danger x-small-font">{errors.name}</p>
              )}
            </div>
          </div>

          <div className="row mb-3 align-items-start">
            <div className="col">
              <label className="small-font mb-1">Login Name</label>
              <input
                type="text"
                name="login_name"
                readOnly
                className="small-font rounded input-css w-100"
                placeholder="Enter"
                maxLength={15}
                value={formData.login_name}
                onChange={handleChange}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^A-Za-z0-9_]/g, ""); // Allows only letters, numbers, and underscores (no spaces)
                }}
              />
              {errors.login_name && (
                <p className="text-danger x-small-font">{errors.login_name}</p>
              )}
            </div>
            <div className="col">
              <label className="small-font mb-1">Phone Number</label>
              <input
                type="text"
                name="phone_no"
                className="small-font rounded input-css w-100"
                placeholder="Enter"
                value={formData.phone_no}
                maxLength={15}
                onChange={handleChange}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Allows only numbers
                }}
              />
              {errors.phone_no && (
                <div className="text-danger small-font">{errors.phone_no}</div>
              )}
            </div>
          </div>

          <div className="row mb-3 align-items-start">
            <div className="col">
              <label className="small-font mb-1">Email</label>
              <input
                type="email"
                name="email"
                className="small-font rounded input-css w-100"
                placeholder="Enter"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-danger x-small-font">{errors.email}</p>
              )}
            </div>

            <div className="col relative">
              <label className="small-font mb-1">Management Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="management_password"
                className="small-font rounded input-css w-100"
                placeholder="Enter Management Password"
                value={formData.management_password}
                onChange={handleChange}
              />
              <span
                className="eye-icon"
                onClick={() => togglePasswordVisibility("management_password")}
                style={{
                  position: "absolute",
                  right: "20px",

                  top: errors.management_password ? "30%" : "50%",

                  cursor: "pointer",
                }}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>

              {errors.management_password && (
                <p className="text-danger small-font">
                  {errors.management_password}
                </p>
              )}
            </div>
          </div>

          <div className="col my-2 d-flex justify-content-center">
            <Button
              className="saffron-btn w-100"
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
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default EditManagementPopup;
