import React, { useEffect, useRef, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import Table from "../../components/Table";
import { MdBlockFlipped, MdLockReset } from "react-icons/md";
import { SlPencil } from "react-icons/sl";
import AddDirectorPopup from "./popups/AddDirectorPopup";
import {
  blockDirectorEmployee,
  getDirectorEmployeeDetailsById,
  getDirectorEmployees,
  resetDirectorEmployeePassword,
} from "../../api/apiMethods";
import { directorEmployees } from "../../utils/enum";
import ResetPasswordPopup from "../popups/ResetPasswordPopup";
import ConfirmationPopup from "../popups/ConfirmationPopup";

function AddDirectorTeam() {
  const role = localStorage.getItem("role_code");

  const [tableData, setTableData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState();
  const [resetPasswordPopup, setResetPasswordPopup] = useState(false);
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [directorEmployeeId, setdirectorEmployeeId] = useState();
  const [isEditMode, setIsEditMode] = useState(false);

  console.log(selectedUser, "selectedUser");
  const handleBlockPopup = (id, name) => {
    setConfirmationPopup(true);
    setdirectorEmployeeId(id);
    setSelectedUser(name);
  };
  const handleModalOpen = () => {
    setShowModal(true);
    setIsEditMode(false);
  };

  const handleEditModalOpen = (data) => {
    setIsEditMode(true);
    setShowModal(true);
    setdirectorEmployeeId(data.id);
    setSelectedUser(data);
  };

  const handleResetPasswordPopup = (id) => {
    setResetPasswordPopup(true);
    setdirectorEmployeeId(id);
  };
  const handleEditModalClose = () => {
    setShowEditModal(false);
  };
  const handleModalClose = (shouldRefresh = false) => {
    setShowModal(false);
    if (shouldRefresh) {
      GetAllDirectorEmployees();
    }
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
  const isFetching = useRef(false);

  const GetAllDirectorEmployees = () => {
    if (isFetching.current) return;
    isFetching.current = true;
    getDirectorEmployees({ limit: 10, offset: 0 })
      .then((response) => {
        if (response.status === true) {
          console.log(response.data, "responseemployees");
          setTableData(response.data);
        } else {
          console.log("There Is Some Error");
        }
      })
      .catch((error) => {
        console.log(error?.message || "Not able to get Countries");
      })
      .finally(() => {
        isFetching.current = false;
      });
  };

  useEffect(() => {
    if (!tableData) GetAllDirectorEmployees();
  }, [tableData]);

  const TableData = tableData?.map((user) => ({
    id: user.id,
    role: directorEmployees[user.role] || "Unknown Role",
    name: user.name,
    login_name: user.login_name,
    phone_no: user.phone_no,
    email: user.email,

    action: (
      <div className="d-flex flex-around gap-3">
        <SlPencil
          size={18}
          className={`black-text ${user.status === 2 ? "disabled" : "pointer"}`}
          onClick={user.status !== 2 ? () => handleEditModalOpen(user) : null}
        />
        <MdLockReset
          size={18}
          className={`black-text ${user.status === 2 ? "disabled" : "pointer"}`}
          onClick={
            user.status !== 2 ? () => handleResetPasswordPopup(user.id) : null
          }
        />
        <MdBlockFlipped
          size={18}
          className={`pointer ${
            user.status === 1
              ? "green-font"
              : user.status === 2
              ? "clr-red"
              : ""
          }`}
          onClick={() => handleBlockPopup(user.id, user.name)}
        />
      </div>
    ),
  }));

  const onDirectorEmployeeResetPassword = (data) => {
    if (!directorEmployeeId) {
      alert("Invalid ID");
      return;
    }
    const requestData = {
      password: data.password,
      confirm_password: data.confirmPassword,
      parent_password: data.managementPassword,
    };

    resetDirectorEmployeePassword(directorEmployeeId, requestData)
      .then((response) => {
        if (response) {
          setTimeout(() => {
            setResetPasswordPopup(false);
            GetAllDirectorEmployees(); // Refresh the table data
          }, 1000);
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => {
        alert(error?.message || "Request failed");
      });
  };

  const blockUnblockDirectorEmployee = () => {
    blockDirectorEmployee(directorEmployeeId)
      .then((response) => {
        if (response.status === true) {
          setTimeout(() => {
            setConfirmationPopup(false);
            GetAllDirectorEmployees(); // Refresh the table data
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
        <h6 className="yellow-font mb-0">Add Director Team</h6>
        <div className="d-flex align-items-center">
          <div className="input-pill d-flex align-items-center rounded-pill px-2 me-3">
            <FaSearch size={16} className="grey-clr me-2" />
            <input className="small-font all-none" placeholder="Search..." />
          </div>
          <button
            className="small-font rounded-pill input-pill blue-font px-3 py-1"
            onClick={handleModalOpen}
          >
            <FaPlus className="me-2" />
            Add New
          </button>
        </div>
      </div>

      <Table data={TableData} columns={columns} itemsPerPage={7} />

      <AddDirectorPopup
        show={showModal}
        onClose={handleModalClose}
        isEditMode={isEditMode}
        directorEmployeeId={directorEmployeeId}
        selectedUser={selectedUser}
      />
      <ResetPasswordPopup
        resetPasswordPopup={resetPasswordPopup}
        setResetPasswordPopup={setResetPasswordPopup}
        onSubmit={onDirectorEmployeeResetPassword}
      />

      <ConfirmationPopup
        confirmationPopupOpen={confirmationPopup}
        setConfirmationPopupOpen={setConfirmationPopup}
        discription={`Are you sure you want to ${
          selectedUser?.status === 1 ? "block" : "unblock"
        } ${selectedUser}?`}
        submitButton={selectedUser?.status === 1 ? "Block" : "Unblock"}
        onSubmit={blockUnblockDirectorEmployee}
      />
    </div>
  );
}

export default AddDirectorTeam;
