import React, { useState } from "react";
import Table from "../../components/Table";
import AddManagementPopup from "./AddManagementPopup";
import BlockAccountPopup from "./BlockAccountPopup";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdLockReset, MdBlockFlipped } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import "../add-team/style.css";
import "../../App.css";

const ManagementTeam = () => {
  const [tableData, setTableData] = useState([
    {
      role: "Designer",
      name: "Jayanta",
      loginName: "Jayanta121",
      phone: "+91 7551456732",
      email: "jayanta@demo.com",
    },
    // more data...
  ]);

  // State for managing the Add Management modal visibility
  const [showAddModal, setShowAddModal] = useState(false);
  const [isBlockPopupVisible, setIsBlockPopupVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    loginName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    managementPassword: "",
  });

  // Functions to handle showing and hiding the Add Management modal
  const handleAddShow = () => {
    setFormData({
      role: "",
      name: "",
      loginName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      managementPassword: "",
    });
    setIsEditing(false);
    setShowAddModal(true);
  };
  const handleAddClose = () => setShowAddModal(false);

  // Handles opening the modal for editing an existing entry
  const handleEdit = (rowIndex) => {
    const rowData = tableData[rowIndex];
    setFormData({
      role: rowData.role,
      name: rowData.name,
      loginName: rowData.loginName,
      phoneNumber: rowData.phone,
      email: rowData.email,
      password: "",
      confirmPassword: "",
      managementPassword: "",
    });
    setIsEditing(true);
    setEditingRowIndex(rowIndex);
    setShowAddModal(true);
  };

  // Handles form submission to either add or edit data
  const handleFormSubmit = (newData) => {
    if (isEditing) {
      // Update existing entry
      const updatedTableData = [...tableData];
      updatedTableData[editingRowIndex] = {
        ...updatedTableData[editingRowIndex],
        role: newData.role,
        name: newData.name,
        loginName: newData.loginName,
        phone: newData.phoneNumber,
        email: newData.email,
      };
      setTableData(updatedTableData);
    } else {
      // Add new entry
      setTableData([
        ...tableData,
        {
          role: newData.role,
          name: newData.name,
          loginName: newData.loginName,
          phone: newData.phoneNumber,
          email: newData.email,
        },
      ]);
    }
    setShowAddModal(false);
  };

  // Handles opening the block account confirmation pop-up
  const handleBlockPopup = () => {
    setIsBlockPopupVisible(true);
  };

  const columns = [
    { header: "Role", field: "role" },
    { header: "Name", field: "name" },
    { header: "Login Name", field: "loginName" },
    { header: "Phone", field: "phone" },
    { header: "Email", field: "email" },
    { header: "Action", field: "action" },
  ];
  // const data = [
  //   {role:"Admin"}
  // ]
  const tableDataWithActions = tableData.map((row, index) => ({
    ...row,
    action: (
      <div>
        <GrEdit
          className="add-management-icon"
          onClick={() => handleEdit(index)}
        />
        <MdLockReset className="add-management-icon" />
        <MdBlockFlipped
          className="add-management-icon"
          onClick={() => handleBlockPopup()}
        />
        <RiDeleteBinLine className="add-management-icon" />
      </div>
    ),
  }));

  return (
    <div className="management-team-wrapper-container">
      <div className="container-fluid py-3 bg-light">
        <div className="row align-items-center">
          <div className="col-md-6 text-start">
            <h4 className="text-warning mb-0">Add Management Team</h4>
          </div>
          {/* Right-side actions */}
          <div className="col-md-6 text-end d-flex justify-content-end gap-3">
            {/* Search Box */}
            <div className="d-flex align-items-center border rounded px-3">
              <FaSearch className="me-2 text-secondary" />
              <input
                type="text"
                className="form-control border-0 p-0"
                placeholder="Search..."
                style={{ boxShadow: "none" }}
              />
            </div>
            {/* Add New Button */}
            <button
              className="add-new-btn d-flex align-items-center"
              onClick={handleAddShow}
            >
              <FaPlus className="me-2" />
              Add New
            </button>
          </div>
        </div>
      </div>

      <div className="management-team-wrapper rounded-bg">
        <Table
          data={tableDataWithActions}
          columns={columns}
          itemsPerPage={14}
        />
      </div>

      {/* AddManagementPopup Modal - Controlled by showAddModal */}
      <AddManagementPopup
        show={showAddModal}
        onClose={handleAddClose}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleFormSubmit}
      />

      {/* Block Account Modal */}
      {isBlockPopupVisible && (
        <div className="popup-overlay">
          <BlockAccountPopup
            onClose={() => setIsBlockPopupVisible(false)}
            onSubmit={handleFormSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default ManagementTeam;
