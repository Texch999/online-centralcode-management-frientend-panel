import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import {
  getEmployeeDetailsById,
  updateEmployeeByID,
} from "../../../api/apiMethods";
import { Roles } from "../../../utils/enum";

function EditManagementPopup({ EditShow, handleEditShowClose, editingRowId }) {
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
    if (!formData.phone_no || !/^\d{10}$/.test(formData.phone_no)) {
      errors.phone_no = "Phone number must be 10 digits";
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (
      !formData.management_password ||
      formData.management_password.length < 6
    ) {
      errors.management_password =
        "Password must be at least 6 characters long";
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

    updateEmployeeByID(editingRowId, formData)
      .then(() => handleEditShowClose())
      .catch((error) => {
        if (error) {
          setErrors(error);
        } else {
          setErrors("Something Went Wrong");
        }
      });
  };

  return (
    <Modal show={EditShow} onHide={handleEditShowClose} size="md" centered>
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center">
          Edit Management Team
          <MdOutlineClose
            size={20}
            type="button"
            onClick={handleEditShowClose}
          />
        </div>
        <form
          className="add-management-popup-form mt-2"
          onSubmit={handleSubmit}
        >
          <div className="row mb-3 align-items-start">
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
                className="small-font rounded input-css w-100"
                placeholder="Enter"
                value={formData.login_name}
                onChange={handleChange}
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
                onChange={handleChange}
              />
              {errors.phone_no && (
                <p className="text-danger x-small-font">{errors.phone_no}</p>
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

            <div className="col">
              <label className="small-font mb-1">Management Password</label>
              <input
                type="password"
                name="management_password"
                className="small-font rounded input-css w-100"
                placeholder="Enter Management Password"
                value={formData.management_password}
                onChange={handleChange}
              />
              {errors.management_password && (
                <p className="text-danger x-small-font">
                  {errors.management_password}
                </p>
              )}
            </div>
          </div>

          <div className="col d-flex justify-content-center">
            <Button className="saffron-btn w-100" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default EditManagementPopup;
