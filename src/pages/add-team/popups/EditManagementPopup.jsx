import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import Select from "react-select/base";
import {
  getEmployeeDetailsById,
  updateEmployeeByID,
} from "../../../api/apiMethods";

function EditManagementPopup({ EditShow, handleEditShowClose, editingRowId }) {
  console.log(editingRowId, "editingRowId");
  const [employeeData, setEmployeeData] = useState();
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    login_name: "",
    phone_no: "",
    email: "",
    management_password: "",
  });
  console.log(employeeData, "employeeData");
  const [error, setError] = useState();
  const GetEmployementDetailsById = () => {
    getEmployeeDetailsById(editingRowId)
      .then((response) => {
        console.log(response, "Full API Response");
        if (response && response.userDeatils) {
          console.log(response.userDeatils, "response123");
          setEmployeeData(response.userDeatils);
        } else {
          setError("No employee data found");
        }
      })
      .catch((error) => {
        console.error("API Call Error:", error);
        setError(error?.message || "Login failed");
      });
  };

  useEffect(() => {
    GetEmployementDetailsById();
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Employee Data:", formData);
    UpdateEmployeeDetails();
  };

  const UpdateEmployeeDetails = () => {
    updateEmployeeByID(editingRowId, formData)
      .then((response) => {
        console.log(response, "Full API Response");
        if (response) {
          console.log(response, "UpdateResponse");

          handleEditShowClose();
        } else {
          setError("Failed to update employee data");
        }
      })
      .catch((error) => {
        console.error("API Call Error:", error);
        setError(error?.message || "Update failed");
      });
  };

  useEffect(() => {
    UpdateEmployeeDetails();
  }, []);
  return (
    <Modal show={EditShow} onHide={handleEditShowClose} size="md" centered>
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center">
          Edit Management Team
          <MdOutlineClose
            size={20}
            type="button"
            aria-label="Close"
            onClick={handleEditShowClose}
          />
        </div>
        <form
          className="add-management-popup-form mt-2"
          onSubmit={handleSubmit}
        >
          <div className="row mb-3">
            <div className="col">
              <label className="small-font mb-1">Role</label>
              <select
                name="role"
                className="small-font rounded all-none input-css w-100"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            <div className="col">
              <label className="small-font mb-1">Name</label>
              <input
                type="text"
                name="name"
                className="small-font rounded all-none input-css w-100"
                placeholder="Enter"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label className="small-font mb-1">Login Name</label>
              <input
                type="text"
                name="login_name"
                className="small-font rounded all-none input-css w-100"
                placeholder="Enter"
                value={formData.login_name}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <label className="small-font mb-1">Phone Number</label>
              <input
                type="text"
                name="phone_no"
                className="small-font rounded all-none input-css w-100"
                placeholder="Enter"
                value={formData.phone_no}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3 align-items-end">
            <div className="col">
              <label className="small-font mb-1">Email</label>
              <input
                type="email"
                name="email"
                className="small-font rounded all-none input-css w-100"
                placeholder="Enter"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="col position-relative">
              <label className="small-font mb-1">Management Password</label>
              <input
                type="password"
                name="management_password"
                className="small-font rounded all-none input-css w-100"
                placeholder="Enter Management Password"
                value={formData.management_password}
                onChange={handleChange}
              />

              <span
                className="eye-icon"
                style={{
                  position: "absolute",
                  right: "10%",
                  top: "50%",
                  cursor: "pointer",
                }}
              ></span>
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
