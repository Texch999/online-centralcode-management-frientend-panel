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
  // State for managing table data, modals, and form data
  const [tableData, setTableData] = useState(
    Array.from({ length: 15 }, (_, index) => ({
      id: index + 1,
      role: "Designer",
      name: `Jayanta ${index + 1}`,
      loginname: `Jayanta121_${index + 1}`,
      phone: `+91 755145673${index}`,
      email: `jayanta${index + 1}@demo.com`,
    }))
  );

  const [modalState, setModalState] = useState({
    showAddModal: false,
    isBlockPopupVisible: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingRowId, setEditingRowId] = useState(null);

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

  // Helper functions for modal management
  const toggleModal = (modalName, value) => {
    setModalState((prev) => ({ ...prev, [modalName]: value }));
  };

  // Functions to handle showing and hiding the Add Management modal
  const handleAddModal = (isOpen) => {
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
    toggleModal("showAddModal", isOpen);
  };

  // Handles opening the modal for editing an existing entry
  const handleEdit = (rowId) => {
    const rowData = tableData.find((row) => row.id === rowId);
    if (rowData) {
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
      setEditingRowId(rowId);
      toggleModal("showAddModal", true);
    }
  };

  // Handles form submission to either add or edit data
  const handleFormSubmit = (newData) => {
    setTableData((prevData) => {
      if (isEditing) {
        return prevData.map((item) =>
          item.id === editingRowId ? { ...item, ...newData } : item
        );
      }
      return [...prevData, { id: Date.now(), ...newData }];
    });
    toggleModal("showAddModal", false);
  };

  // Handles opening the block account confirmation pop-up
  const handleBlockPopup = () => {
    toggleModal("isBlockPopupVisible", true);
  };

  const columns = [
    {
      header: "Role",
      field: "role",
    },
    {
      header: "Name",
      field: "name",
    },
    {
      header: "Login Name",
      field: "loginname",
    },
    {
      header: "Phone",
      field: "phone",
    },
    {
      header: "Email",
      field: "email",
    },
    {
      header:<div className="text-center">Action</div>,
      field: "action",
    },
  ];

  // Adding action buttons to each row of data
  const tableDataWithActions = tableData.map((row) => ({
    ...row,
    action: (
      <ActionButtons
        rowId={row.id}
        onEdit={handleEdit}
        onBlock={handleBlockPopup}
      />
    ),
  }));

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="yellow-font mb-0">Add Management Team</h6>
        <div className="d-flex align-items-center">
          <div className="input-pill d-flex align-items-center rounded-pill px-2 me-3">
            <FaSearch size={16} className="grey-clr me-2" />
            <input className="small-font all-none" placeholder="Search..." />
          </div>
          <button
            className="small-font blue-font border px-3 py-1 rounded-pill"
            onClick={() => handleAddModal(true)}
          >
            <FaPlus className="me-2" />
            Add New
          </button>
        </div>
      </div>
      
      <div className="management-team-wrapper rounded-bg">
        <Table
          className="black-text"
          data={tableDataWithActions}
          columns={columns}
          itemsPerPage={10}
        />
      </div>

      {/* AddManagementPopup Modal - Controlled by showAddModal */}
      <AddManagementPopup
        show={modalState.showAddModal}
        onClose={() => toggleModal("showAddModal", false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleFormSubmit}
      />

      {/* Block Account Modal */}
      {modalState.isBlockPopupVisible && (
        <div className="popup-overlay">
          <BlockAccountPopup
            onClose={() => toggleModal("isBlockPopupVisible", false)}
            onSubmit={handleFormSubmit}
          />
        </div>
      )}
    </div>
  );
};

// Separate ActionButtons component for cleaner code
const ActionButtons = ({ rowId, onEdit, onBlock }) => (
  <div className="text-center">
    <GrEdit className="add-management-icon" onClick={() => onEdit(rowId)} />
    <MdLockReset className="add-management-icon" />
    <MdBlockFlipped className="add-management-icon" onClick={() => onBlock()} />
    <RiDeleteBinLine className="add-management-icon" />
  </div>
);

export default ManagementTeam;
