import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import AddManagementPopup from "./popups/AddManagementPopup";
import { SlPencil } from "react-icons/sl";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdLockReset, MdBlockFlipped } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import "../add-team/style.css";
import "../../App.css";
import ResetPasswordPopup from "../popups/ResetPasswordPopup";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import { getEmployees } from "../../api/apiMethods";
import Roles from "../../utils/enum";

const AddManagementTeam = () => {
  const token = localStorage.getItem("jwt_token");
  const [error, setError] = useState("");
  const [tableData, setTableData] = useState([]);
  const GetEmployee = () => {
    getEmployees(token)
      .then((response) => {
        if (response?.message === "Employees fetched successfully.") {
          console.log(response, "response from API");
          setTableData(response.data);
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setError(error?.message || "Login failed");
      });
  };
  useEffect(() => {
    GetEmployee();
  }, []);

  const TableData = tableData.map((employee) => {
    console.log(tableData, "tableData");
    return {
      id: employee.id,
      name: employee.name,
      login_name: employee.login_name,
      phone_no: employee.phone_no,
      email: employee.email,
      role: Roles[employee.role] || "Unknown", // Look up the role name from the Roles enum
      status: employee.status === 1 ? "Active" : "Inactive",
      created_date: new Date(employee.created_date).toLocaleString(),
      updated_date: new Date(employee.updated_date).toLocaleString(),
    };
  });
  // const TableData = tableData.map((employee) => {
  //   console.log(tableData, "tableData");
  //   return {
  //     id: employee.id,
  //     name: employee.name,
  //     login_name: employee.login_name,
  //     phone_no: employee.phone_no,
  //     email: employee.email,
  //     role: Roles[employee.role] || "Unknown", // Look up the role name from the Roles enum
  //     // role: [employee.role] || "Unknown",
  //     status: employee.status === 1 ? "Active" : "Inactive",
  //     created_date: new Date(employee.created_date).toLocaleString(),
  //     updated_date: new Date(employee.updated_date).toLocaleString(),
  //   };
  // });
  const [modalState, setModalState] = useState({
    showAddModal: false,
    isBlockPopupVisible: false,
    isDeletePopupVisible: false,
    isResetPasswordVisible: false,
    blockAccountId: null,
    deleteAccountId: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingRowId, setEditingRowId] = useState(null);
  const [resetPasswordPopup, setResetPasswordPopup] = useState(false);

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

  const handleDeletePopup = (rowId) => {
    setModalState({
      ...modalState,
      isDeletePopupVisible: true,
      deleteAccountId: rowId,
    });
  };

  const handleDeleteAccount = () => {
    setTableData((prevData) =>
      prevData.filter((row) => row.id !== modalState.deleteAccountId)
    );
    toggleModal("isDeletePopupVisible", false);
  };

  const handleResetPasswordPopup = (isOpen) => {
    setResetPasswordPopup(isOpen);
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
      field: "login_name",
    },
    {
      header: "Phone",
      field: "phone_no",
    },
    {
      header: "Email",
      field: "email",
      width: "20%",
    },
    {
      header: <div className="text-center">Action</div>,
      field: "action",
      width: "12%",
    },
  ];
  const tableDataWithActions = TableData.map((row) => ({
    ...row,
    action: (
      <ActionButtons
        rowId={row.id}
        onEdit={handleEdit}
        onBlock={handleBlockPopup}
        onResetPassword={handleResetPasswordPopup}
        onDelete={handleDeletePopup}
      />
    ),
  }));

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="yellow-font medium-font mb-0">Add Management Team</h6>
        <div className="d-flex align-items-center">
          <div className="input-pill d-flex align-items-center rounded-pill px-2 me-3">
            <FaSearch size={16} className="grey-clr me-2" />
            <input className="small-font all-none" placeholder="Search..." />
          </div>
          <button
            className="small-font rounded-pill input-pill blue-font px-3 py-1"
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
          itemsPerPage={9}
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
      <ConfirmationPopup
        confirmationPopupOpen={modalState.isBlockPopupVisible}
        setConfirmationPopupOpen={(value) =>
          toggleModal("isBlockPopupVisible", value)
        }
        discription={"Are You Sure to Block this Account?"}
        submitButton={"Block"}
      />
      {/* Delete Account Modal */}
      <ConfirmationPopup
        confirmationPopupOpen={modalState.isDeletePopupVisible}
        setConfirmationPopupOpen={(value) =>
          toggleModal("isDeletePopupVisible", value)
        }
        discription={"Are You Sure to Delete this Account?"}
        submitButton={"Delete"}
        onSubmit={handleDeleteAccount}
      />
      {/* Reset Password Modal */}
      <ResetPasswordPopup
        resetPasswordPopup={resetPasswordPopup}
        setResetPasswordPopup={setResetPasswordPopup}
      />
    </div>
  );
};

const ActionButtons = ({
  rowId,
  onEdit,
  onBlock,
  onResetPassword,
  onDelete,
}) => (
  <div className="d-flex gap-3 flex-center">
    <SlPencil
      size={18}
      className="pointer black-text"
      onClick={() => onEdit(rowId)}
    />
    <MdLockReset
      size={18}
      className="pointer black-text"
      onClick={() => onResetPassword(true)}
    />
    <MdBlockFlipped
      size={18}
      className="pointer black-text"
      onClick={() => onBlock(rowId)}
    />
    <FaRegTrashCan
      size={18}
      className="pointer black-text"
      onClick={() => onDelete(rowId)}
    />
  </div>
);

export default AddManagementTeam;
