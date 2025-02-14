import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import { SlPencil, BsEye } from "react-icons/all";
import { MdLockReset, MdBlockFlipped, CgUnblock } from "react-icons/all";
import { FaSearch, FaPlus } from "react-icons/fa";
import AddDirectorAdminPopup from "./popups/AddDirectorAdminPopup";
import ResetPasswordPopup from "../popups/ResetPasswordPopup";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import {
  blockDirector,
  getDirectors,
  resetDirectorPassword,
} from "../../api/apiMethods";
import EditDirectorAdminPopup from "./popups/EditDirectorAdminPopup";
import { CircleLoader } from "react-spinners";
import { commissionTypes } from "../../utils/enum";
import "../add-team/style.css";
import "../../App.css";

const AddDirectorAdmin = () => {
  const role = localStorage.getItem("role_code");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [resetPasswordPopup, setResetPasswordPopup] = useState(false);
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDirectorId, setSelectedDirectorId] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const login_role_name = localStorage.getItem("role_name");

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);
  const handleEditModalOpen = (id) => {
    setSelectedDirectorId(id);
    setShowEditModal(true);
  };
  const handleEditModalClose = () => setShowEditModal(false);
  const handleResetPasswordOpen = (id) => {
    setSelectedDirectorId(id);
    setResetPasswordPopup(true);
  };
  const handleResetPasswordClose = () => setResetPasswordPopup(false);
  const handleBlockUserOpen = (user, id) => {
    setSelectedUser(user);
    setSelectedDirectorId(id);
    setConfirmationPopup(true);
  };
  const handleBlockUserClose = () => setConfirmationPopup(false);

  const handleNavigateUserDashboard = (id) =>
    navigate(`/user-profile-dashboard/${id}`);

  const GetAllDirectors = () => {
    setLoading(true);
    getDirectors({ limit: 10, offset: 0 })
      .then((response) => {
        if (response.status) setTableData(response.directorsWithWebsites);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    GetAllDirectors();
  }, []);

  const onDirectorResetPassword = (data) => {
    if (!selectedDirectorId) return alert("Invalid ID");

    const requestData = {
      password: data.password,
      confirm_password: data.confirmPassword,
      parent_password: data.managementPassword,
    };

    resetDirectorPassword(selectedDirectorId, requestData)
      .then(() => setResetPasswordPopup(false))
      .catch((error) => alert(error?.message || "Request failed"));
  };

  const blockUnblock = () => {
    blockDirector(selectedDirectorId)
      .then(() => {
        GetAllDirectors();
        setConfirmationPopup(false);
      })
      .catch((error) => console.error(error));
  };

  const columns = [
    { header: "Role", field: "role" },
    { header: "Name", field: "name" },
    { header: "Login Name", field: "loginname" },
    { header: "In Used", field: "inUsed" },
    { header: "Link Websites", field: "linkWebsites" },
    { header: "Share/Rent", field: "shareRent" },
    { header: "Billing", field: "billing" },
    { header: "P/L", field: "pl" },
    { header: "", field: "dw", width: "1%" },
    {
      header: <div className="text-center">Action</div>,
      field: "action",
      width: "8%",
    },
  ];

  const TableData = tableData?.map((user) => {
    const linkWebsites = user.accessWebsites.map((website) => ({
      name: website.user_panel_name,
      url: website.user_panel_url,
      adminPanel: website.admin_panel_name,
      adminUrl: website.admin_panel_url,
    }));

    const shareRent = user.accessWebsites.map((website) => ({
      commissionType: website.commission_type,
      share: website.share,
    }));

    return {
      id: user.id,
      role: user.type === 1 ? "Director" : "Super Admin",
      name: user.name,
      loginname: user.login_name,
      inUsed: (
        <div className={user.status === 1 ? "green-clr" : "clr-red"}>
          {user.status === 1 ? "Active" : "InActive"}
        </div>
      ),
      linkWebsites: (
        <span className="d-flex flex-column">
          {linkWebsites.map((website, index) => (
            <span key={index}>
              <a
                className="yellow-font"
                href={website.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {website.url}
              </a>{" "}
              (Admin:{" "}
              <a
                href={website.adminUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {website.adminPanel}
              </a>
              )
            </span>
          ))}
        </span>
      ),
      shareRent: (
        <span className="d-flex flex-column">
          {shareRent.map((type, index) => (
            <span key={index}>
              <span className="green-clr">
                {commissionTypes[type.commissionType] || "Unknown"}{" "}
              </span>
              {type.share ? `, Share: ${type.share}%` : ""}
            </span>
          ))}
        </span>
      ),
      billing: "0",
      pl: <div className="red-font">0</div>,
      dw: (
        <button className="py-2 rounded px-3 dw-active-btn all-none mx-1 small-font">
          D/W
        </button>
      ),
      action: (
        <div className="d-flex flex-center gap-3">
          <SlPencil
            size={18}
            className={`black-text pointer ${
              user.status === 2 ? "disabled" : ""
            }`}
            onClick={() =>
              user.status !== 2 &&
              navigate(`/director-admin/editDirector/`, {
                state: { userId: user.id, mode: "edit" },
              })
            }
          />
          <MdLockReset
            size={18}
            className={`black-text pointer ${
              user.status === 2 ? "disabled" : ""
            }`}
            onClick={() =>
              user.status !== 2 && handleResetPasswordOpen(user.id)
            }
          />
          <MdBlockFlipped
            size={18}
            className={user.status === 2 ? "clr-red" : "green-clr"}
            onClick={() => handleBlockUserOpen(user.login_name, user.id)}
          />
          <BsEye
            size={18}
            className={`black-text pointer ${
              user.status === 2 ? "disabled" : ""
            }`}
            onClick={() => handleNavigateUserDashboard(user?.id)}
          />
        </div>
      ),
    };
  });

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="yellow-font medium-font mb-0">
          {role === "management"
            ? "Add Director & Super Admin"
            : "Add Super Admin"}
        </h6>
        <div className="d-flex align-items-center">
          <div className="input-pill d-flex align-items-center rounded-pill px-2 me-3">
            <FaSearch size={16} className="grey-clr me-2" />
            <input className="small-font all-none" placeholder="Search..." />
          </div>
          <button
            className="small-font rounded-pill input-pill blue-font px-3 py-1"
            onClick={() =>
              navigate("/director-admin/addnewdirector", {
                state: { mode: "add" },
              })
            }
          >
            <FaPlus className="me-2" />
            Add New
          </button>
        </div>
      </div>

      {loading ? (
        <div className="d-flex flex-column flex-center mt-10rem align-items-center">
          <CircleLoader color="#3498db" size={40} />
          <div className="medium-font black-font my-3">
            Just a moment...............⏳
          </div>
        </div>
      ) : (
        <Table data={TableData} columns={columns} itemsPerPage={7} />
      )}

      <AddDirectorAdminPopup show={showModal} handleClose={handleModalClose} />
      <EditDirectorAdminPopup
        showEditModal={showEditModal}
        handleEditModalClose={handleEditModalClose}
        directorId={selectedDirectorId}
      />
      <ResetPasswordPopup
        resetPasswordPopup={resetPasswordPopup}
        setResetPasswordPopup={handleResetPasswordClose}
        onSubmit={onDirectorResetPassword}
      />
      <ConfirmationPopup
        confirmationPopupOpen={confirmationPopup}
        setConfirmationPopupOpen={setConfirmationPopup}
        discription={`Are you sure you want to ${
          selectedUser?.status === 1 ? "Unblock" : "Block"
        } ${selectedUser?.login_name}?`}
        submitButton={`${selectedUser?.status === 1 ? "Unblock" : "Block"}`}
        onSubmit={blockUnblock}
      />
    </div>
  );
};

export default AddDirectorAdmin;
