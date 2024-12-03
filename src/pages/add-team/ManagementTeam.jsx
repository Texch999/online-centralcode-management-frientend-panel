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
import ManagementResetPasswordPopup from "./ManagementResetPasswordPopup";

const ManagementTeam = () => {
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
    isResetPasswordVisible: false,
    blockAccountId: null,
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

  const toggleModal = (modalName, value) => {
    setModalState((prev) => ({ ...prev, [modalName]: value }));
  };

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

  const handleBlockPopup = (rowId) => {
    setModalState({
      ...modalState,
      isBlockPopupVisible: true,
      blockAccountId: rowId,
    });
  };

  const handleBlockAccount = () => {
    setTableData((prevData) =>
      prevData.filter((row) => row.id !== modalState.blockAccountId)
    );
    toggleModal("isBlockPopupVisible", false);
  };

  const handleResetPasswordPopup = (isOpen) => {
    toggleModal("isResetPasswordVisible", isOpen);
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
      header: <div className="text-center">Action</div>,
      field: "action",
    },
  ];

  const tableDataWithActions = tableData.map((row) => ({
    ...row,
    action: (
      <ActionButtons
        rowId={row.id}
        onEdit={handleEdit}
        onBlock={handleBlockPopup}
        onResetPassword={handleResetPasswordPopup}
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

      {/* AddManagementPopup Modal */}
      <AddManagementPopup
        show={modalState.showAddModal}
        onClose={() => toggleModal("showAddModal", false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleFormSubmit}
      />

      {/* Block Account Modal */}
      <BlockAccountPopup
        isOpen={modalState.isBlockPopupVisible}
        onRequestClose={() => toggleModal("isBlockPopupVisible", false)}
        onBlock={handleBlockAccount}
      />

      {/* Reset Password Modal */}
      <ManagementResetPasswordPopup
        isOpen={modalState.isResetPasswordVisible}
        onRequestClose={() => toggleModal("isResetPasswordVisible", false)}
      />
    </div>
  );
};

const ActionButtons = ({ rowId, onEdit, onBlock, onResetPassword }) => (
  <div className="text-center">
    <GrEdit className="add-management-icon" onClick={() => onEdit(rowId)} />
    <MdLockReset
      className="add-management-icon"
      onClick={() => onResetPassword(true)}
    />
    <MdBlockFlipped
      className="add-management-icon"
      onClick={() => onBlock(rowId)}
    />
    <RiDeleteBinLine className="add-management-icon" />
  </div>
);

export default ManagementTeam;
