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
import { blockDirector, blockEmploye, getEmployees, resetEmployeePassword } from "../../api/apiMethods";
import Roles from "../../utils/enum";
import EditManagementPopup from "./popups/EditManagementPopup";
import PaginationComponent from "../../components/Pagination";

const AddManagementTeam = () => {
  const token = localStorage.getItem("jwt_token");
  const [error, setError] = useState("");
  const [tableData, setTableData] = useState([]);
  const GetEmployee = () => {
    getEmployees({ limit: 10, offset: 0 })
      .then((response) => {
        if (response?.status === true) {
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
  console.log(tableData, "tableData")
  const TableData = tableData.map((employee) => {
    const role = Roles[Number(employee.role)] || "Unknown";

    return {
      id: employee.id,
      name: employee.name,
      login_name: employee.login_name,
      phone_no: employee.phone_no,
      email: employee.email,
      role: employee.role,
      status: employee.status === 1 ? "green-clr" : "clr-red",
      statusColor: employee.status === 1 ? "green-clr" : "clr-red",
      created_date: new Date(employee.created_date).toLocaleString(),
      updated_date: new Date(employee.updated_date).toLocaleString(),
    };
  });








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
  const [resetPasswordId, setResetPasswordId] = useState(null);
  console.log(editingRowId, "editingRowId");

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
        loginName: rowData.login_name,
        phoneNumber: rowData.phone_no,
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
    const updatedTableData = tableData.map((row) => {
      if (row.id === rowId) {
        const newStatus = row.status === 1 ? 2 : 1;
        return { ...row, status: newStatus };
      }
      return row;
    });
    setTableData(updatedTableData);

    setModalState((prevState) => ({
      ...prevState,
      isBlockPopupVisible: true,
      blockAccountId: rowId,
    }));
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
  const handleResetPasswordPopup = (rowId) => {
    setResetPasswordId(rowId);
    setResetPasswordPopup(true);
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
  const [EditShow, setEditShow] = useState();
  const handleEditShow = (rowId) => {
    setEditShow(true);
    setEditingRowId(rowId);
  };
  const handleEditShowClose = () => {
    setEditShow(false);
  };
  const tableDataWithActions = TableData.map((row) => ({
    ...row,
    action: (
      <ActionButtons
        rowId={row.id}
        onEdit={handleEdit}
        onBlock={handleBlockPopup}
        onResetPassword={handleResetPasswordPopup}
        onDelete={handleDeletePopup}
        status={row.status}
        handleEditShow={handleEditShow}
      />
    ),
  }));

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

        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => {
        alert(error?.message || "Request failed");
      });
  };
  const status =
    tableData.find((row) => row.id === modalState.blockAccountId)?.status
  const blockAccountId = modalState.blockAccountId

  const onEmployeeBlockSubmit = () => {
    const requestData = {
      status: status,
    };
    blockEmploye(blockAccountId, requestData)
      .then((response) => {
        if (response.status === true) {
          console.log(response, "response")
          setTimeout(() => {

          }, 1000);
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => {
        console.log(error?.message || "Request failed");
      });
  };

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
          itemsPerPage={5}
        />
      </div>

      <AddManagementPopup
        show={modalState.showAddModal}
        onClose={() => toggleModal("showAddModal", false)}
        onSubmit={handleFormSubmit}
      />
      <EditManagementPopup
        EditShow={EditShow}
        handleEditShowClose={handleEditShowClose}
        editingRowId={editingRowId}
      />
      <ConfirmationPopup
        confirmationPopupOpen={modalState.isBlockPopupVisible}
        setConfirmationPopupOpen={(value) =>
          toggleModal("isBlockPopupVisible", value)
        }
        discription={
          modalState.blockAccountId &&
          (tableData.find((row) => row.id === modalState.blockAccountId)
            ?.status === 1
            ? "Are you sure you want to activate this account?"
            : "Are you sure you want to block  this account?")
        }
        submitButton={
          modalState.blockAccountId &&
          (tableData.find((row) => row.id === modalState.blockAccountId)
            ?.status === 1
            ? "Activate"
            : "Block")
        }
        blockAccountId={modalState.blockAccountId}
        status={
          tableData.find((row) => row.id === modalState.blockAccountId)?.status
        }
        onSubmit={onEmployeeBlockSubmit}
      />

      <ConfirmationPopup
        confirmationPopupOpen={modalState.isDeletePopupVisible}
        setConfirmationPopupOpen={(value) =>
          toggleModal("isDeletePopupVisible", value)
        }
        discription={"Are You Sure to Delete this Account?"}
        submitButton={"Delete"}
        onSubmit={handleDeleteAccount}
      />
      <ResetPasswordPopup
        resetPasswordPopup={resetPasswordPopup}
        setResetPasswordPopup={setResetPasswordPopup}
        IndividualpassowrdId={resetPasswordId}
        onSubmit={onEmployeePasswordSubmit}
      />
    </div>
  );
};

// const ActionButtons = ({
//   rowId,
//   onEdit,
//   onBlock,
//   onResetPassword,
//   onDelete,
//   status,
//   handleEditShow,
// }) => {

//   return (
//     <div className="d-flex gap-3 flex-center">
//       <SlPencil
//         size={18}
//         className="pointer black-text"
//         onClick={() => handleEditShow(rowId)}
//       />
//       <MdLockReset
//         size={18}
//         className="pointer black-text"
//         onClick={() => onResetPassword(rowId)}
//       />
//       <MdBlockFlipped
//         size={18}

//         onClick={() => onBlock(rowId)}
//       />
//     </div>
//   );
// };
const ActionButtons = ({
  rowId,
  onEdit,
  onBlock,
  onResetPassword,
  onDelete,
  status,
  handleEditShow,
}) => {
  const blockIconColor = status === "green-clr" ? "green-clr" : "clr-red";

  return (
    <div className="d-flex gap-3 flex-center">
      <SlPencil
        size={18}
        className="pointer black-text"
        onClick={() => handleEditShow(rowId)}
      />
      <MdLockReset
        size={18}
        className="pointer black-text"
        onClick={() => onResetPassword(rowId)}
      />
      <MdBlockFlipped
        size={18}
        className={`pointer ${blockIconColor}`} // Applying dynamic color class
        onClick={() => onBlock(rowId)}
      />
    </div>
  );
};

export default AddManagementTeam;
