import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import AddManagementPopup from "./popups/AddManagementPopup";
import { SlPencil } from "react-icons/sl";
import { MdLockReset, MdBlockFlipped } from "react-icons/md";
import { FaSearch, FaPlus } from "react-icons/fa";
import "../add-team/style.css";
import "../../App.css";
import ResetPasswordPopup from "../popups/ResetPasswordPopup";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import {
  blockEmploye,
  getEmployees,
  resetEmployeePassword,
} from "../../api/apiMethods";
import EditManagementPopup from "./popups/EditManagementPopup";
import SuccessPopup from "../popups/SuccessPopup";
import { Roles } from "../../utils/enum";

const AddManagementTeam = () => {
  const [tableData, setTableData] = useState([]);
  console.log(tableData, "tableData");
  const [modalState, setModalState] = useState({
    showAddModal: false,
    isBlockPopupVisible: false,
    isDeletePopupVisible: false,
    blockAccountId: null,
    deleteAccountId: null,
  });
  const [discription, setDiscription] = useState("");
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRowId, setEditingRowId] = useState(null);
  const [resetPasswordPopup, setResetPasswordPopup] = useState(false);
  const [resetPasswordId, setResetPasswordId] = useState(null);
  const [blockTeamManagementId, setBlockTeamManagementId] = useState(null);
  const [blockPopup, setBlockPopup] = useState(false);
  const [EditShow, setEditShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  console.log(selectedUser, "selectedUser");
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

  const GetEmployee = () => {
    getEmployees({ limit: 10, offset: 0 })
      .then((response) => {
        if (response?.status === true) {
          setTableData(response.data);
        }
      })
      .catch((error) => {
        console.error(error?.message || "Failed to fetch employees");
      });
  };

  useEffect(() => {
    GetEmployee();
  }, []);

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

  const handleFormSubmit = (newData) => {
    setTableData((prevData) => {
      if (isEditing) {
        return prevData.map((item) =>
          item.id === editingRowId ? { ...item, ...newData } : item
        );
      }
      return [...prevData, { id: Date.now(), ...newData }];
    });
    GetEmployee();
    toggleModal("showAddModal", false);
    setDiscription("Created successfully");
    setSuccessPopupOpen(true);
  };

  const handleBlockPopup = (id, name, status) => {
    setBlockTeamManagementId(id);
    setBlockPopup(true);
    setSelectedUser({ name, status });
  };

  const handleResetPasswordPopup = (id) => {
    setResetPasswordId(id);
    setResetPasswordPopup(true);
  };

  const columns = [
    { header: "Role", field: "role" },
    { header: "Name", field: "name" },
    { header: "Login Name", field: "login_name" },
    { header: "Phone", field: "phone_no" },
    { header: "Email", field: "email", width: "20%" },
    {
      header: <div className="text-center">Action</div>,
      field: "action",
      width: "12%",
    },
  ];

  const handleEditShow = (rowId) => {
    setEditShow(true);
    setEditingRowId(rowId);
  };

  const handleEditShowClose = () => {
    setEditShow(false);
    GetEmployee();
  };

  const onEmployeePasswordSubmit = (data) => {
    if (!resetPasswordId) {
      alert("Invalid ID");
      return;
    }

    const requestData = {
      password: data.password,
      confirm_password: data.confirmPassword,
      management_password: data.managementPassword,
    };

    resetEmployeePassword(resetPasswordId, requestData)
      .then((response) => {
        if (response) {
          setTimeout(() => {
            setResetPasswordPopup(false);
          }, 1000);
          GetEmployee();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => {
        alert(error?.message || "Request failed");
      });
  };

  const onEmployeeBlockSubmit = () => {
    const newStatus = selectedUser?.status === 1 ? 2 : 1;

    const requestData = {
      status: newStatus,
    };

    blockEmploye(blockTeamManagementId, requestData)
      .then((response) => {
        if (response.status === true) {
          GetEmployee();
          toggleModal("isBlockPopupVisible", false);
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => {
        console.error(error?.message || "Request failed");
      });
  };
  const TableData = tableData.map((employee) => {
    const roleId = Number(employee.role);
    const role = Roles[roleId] || "Unknown";

    return {
      id: employee.id,
      name: employee.name,
      login_name: employee.login_name,
      phone_no: employee.phone_no,
      email: employee.email,
      role: <div>{role}</div>,
      status: employee.status === 1 ? "green-clr" : "clr-red",
      created_date: new Date(employee.created_date).toLocaleString(),
      updated_date: new Date(employee.updated_date).toLocaleString(),
      action: (
        <div className="d-flex gap-3 flex-center">
          <SlPencil
            size={18}
            className="pointer black-text"
            onClick={() => handleEditShow(employee.id)}
          />
          <MdLockReset
            size={18}
            className="pointer black-text"
            onClick={() => handleResetPasswordPopup(employee.id)}
          />
          <MdBlockFlipped
            size={18}
            className={`pointer ${
              employee.status === 1
                ? "green-font"
                : employee.status === 2
                ? "clr-red"
                : ""
            }`}
            onClick={() =>
              handleBlockPopup(employee.id, employee.name, employee.status)
            }
          />
        </div>
      ),
    };
  });

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
          data={TableData}
          columns={columns}
          itemsPerPage={5}
        />
      </div>
      {modalState.showAddModal && (
        <AddManagementPopup
          show={modalState.showAddModal}
          onClose={() => toggleModal("showAddModal", false)}
          onSubmit={handleFormSubmit}
        />
      )}
      {EditShow && (
        <EditManagementPopup
          EditShow={EditShow}
          handleEditShowClose={handleEditShowClose}
          editingRowId={editingRowId}
        />
      )}

      <ConfirmationPopup
        confirmationPopupOpen={blockPopup}
        setConfirmationPopupOpen={setBlockPopup}
        discription={`Are you sure you want to ${
          selectedUser?.status === 1 ? "block" : "unblock"
        } ${selectedUser}?`}
        submitButton={selectedUser?.status === 1 ? "Block" : "Unblock"}
        onSubmit={onEmployeeBlockSubmit}
      />
      <ConfirmationPopup
        confirmationPopupOpen={blockPopup}
        setConfirmationPopupOpen={setBlockPopup}
        discription={`Are you sure you want to ${
          selectedUser?.status === 1 ? "block" : "unblock"
        } ${selectedUser?.name}?`}
        submitButton={selectedUser?.status === 1 ? "Block" : "Unblock"}
        onSubmit={onEmployeeBlockSubmit}
      />

      <ResetPasswordPopup
        resetPasswordPopup={resetPasswordPopup}
        setResetPasswordPopup={setResetPasswordPopup}
        IndividualpassowrdId={resetPasswordId}
        onSubmit={onEmployeePasswordSubmit}
      />
      {successPopupOpen && (
        <SuccessPopup
          successPopupOpen={successPopupOpen}
          setSuccessPopupOpen={setSuccessPopupOpen}
          discription={discription}
        />
      )}
    </div>
  );
};

export default AddManagementTeam;
