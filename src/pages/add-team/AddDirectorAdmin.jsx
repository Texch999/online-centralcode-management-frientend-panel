import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import { GrEdit } from "react-icons/gr";
import { MdLockReset, MdBlockFlipped } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import AddDirectorAdminPopup from "./popups/AddDirectorAdminPopup";
import "../add-team/style.css";
import "../../App.css";
import ResetPasswordPopup from "../popups/ResetPasswordPopup";
import ConfirmationPopup from "../popups/ConfirmationPopup";

const AddDirectorAdmin = () => {
  const role = localStorage.getItem("role_code");
  const [showModal, setShowModal] = useState(false);
  const [resetPasswordPopup, setResetPasswordPopup] = useState(false);
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Tracks user for reset or block actions

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleResetPasswordOpen = (user) => {
    setSelectedUser(user); // Store selected user's data
    setResetPasswordPopup(true);
  };

  const handleResetPasswordClose = () => {
    setSelectedUser(null);
    setResetPasswordPopup(false);
  };

  const handleBlockUserOpen = (user) => {
    console.log("handleBlockUserOpen triggered for user:", user);
    setSelectedUser(user);
    setConfirmationPopup(true);
  };

  const handleBlockUserClose = () => {
    setSelectedUser(null);
    setConfirmationPopup(false);
  };

  const handleBlockUserConfirm = () => {
    // Perform the block action here
    console.log(`User ${selectedUser} blocked.`);
    handleBlockUserClose();
  };

  const navigate = useNavigate();

  const handleNavigateUserDashboard = () => {
    navigate("/user-profile-dashboard");
  };

  const tableData = [
    {
      id: 1,
      role: "Super Admin",
      name: "Jayanta",
      loginname: "Jayanta121",
      inUsed: "Hyd-India",
      linkWebsites: ["techx.com"],
      shareRent: ["10%"],
      billing: "0",
      pl: <div className="red-font">5000000</div>,
      dw: (
        <button className="py-2 rounded px-3 dw-active-btn all-none mx-1 small-font">
          D/W
        </button>
      ),
      action: (
        <div className="d-flex flex-center gap-3">
          <GrEdit
            size={18}
            className="black-text pointer"
            onClick={() => setShowModal(true)}
          />
          <MdLockReset
            size={18}
            className="black-text pointer"
            onClick={() => handleResetPasswordOpen("Jayanta")}
          />
          <MdBlockFlipped
            size={18}
            className="black-text pointer"
            onClick={() => handleBlockUserOpen("Jayanta")}
          />
          <IoEyeOutline
            size={18}
            className="black-text pointer"
            onClick={handleNavigateUserDashboard}
          />
        </div>
      ),
    },
    {
      id: 2,
      role: "Super Admin",
      name: "Lokesh",
      loginname: "lokeshraj02",
      inUsed: "Kolk-India",
      linkWebsites: ["sparkbook999.com"],
      shareRent: ["100000"],
      billing: "10000000",
      pl: <div className="red-font">5000000</div>,
      dw: (
        <button className="py-2 rounded px-3 dw-active-btn all-none mx-1 small-font">
          D/W
        </button>
      ),
      action: (
        <div className="d-flex flex-center gap-3">
          <GrEdit size={18} className="black-text" />
          <MdLockReset
            size={18}
            className="black-text pointer"
            onClick={() => handleResetPasswordOpen("Jayanta")}
          />
          <MdBlockFlipped size={18} className="black-text" />
          <IoEyeOutline size={18} className="black-text" />
        </div>
      ),
    },
    {
      id: 3,
      role: "Director",
      name: "Srinivas",
      loginname: "sri8954",
      inUsed: "USA",
      linkWebsites: ["casinopark.com"],
      shareRent: ["100000"],
      billing: "0",
      pl: <div className="red-font">5000000</div>,
      dw: (
        <button className="py-2 rounded px-3 dw-active-btn all-none mx-1 small-font">
          D/W
        </button>
      ),
      action: (
        <div className="d-flex flex-center gap-3">
          <GrEdit size={18} className="black-text" />
          <MdLockReset size={18} className="black-text" />
          <MdBlockFlipped size={18} className="black-text" />
          <IoEyeOutline size={18} className="black-text" />
        </div>
      ),
    },
    {
      id: 4,
      role: "Super Admin",
      name: "Jayanta",
      loginname: "Jayanta121",
      inUsed: "UAI",
      linkWebsites: [
        "casinocafe.com",
        "sparkbook999.com",
        "fun77.com",
        "diamondexchange.com",
      ],
      shareRent: ["10%", "500000", "5%", "200000"],
      billing: "0",
      pl: <div className="red-font">5000000</div>,
      dw: (
        <button className="py-2 rounded px-3 dw-active-btn all-none mx-1 small-font">
          D/W
        </button>
      ),
      action: (
        <div className="d-flex flex-center gap-3">
          <GrEdit size={18} className="black-text" />
          <MdLockReset size={18} className="black-text" />
          <MdBlockFlipped size={18} className="black-text" />
          <IoEyeOutline size={18} className="black-text" />
        </div>
      ),
    },
    {
      id: 5,
      role: "Super Admin",
      name: "Jayanta",
      loginname: "Jayanta121",
      inUsed: "Bangladesh",
      linkWebsites: ["fun88.com"],
      shareRent: ["10%"],
      billing: "0",
      pl: <div className="green-font">5000000</div>,
      dw: (
        <button className="py-2 rounded px-3 dw-active-btn all-none mx-1 small-font">
          D/W
        </button>
      ),
      action: (
        <div className="d-flex flex-center gap-3">
          <GrEdit size={18} className="black-text" />
          <MdLockReset size={18} className="black-text" />
          <MdBlockFlipped size={18} className="black-text" />
          <IoEyeOutline size={18} className="black-text" />
        </div>
      ),
    },
    {
      id: 6,
      role: "Director",
      name: "Jayanta",
      loginname: "Jayanta121",
      inUsed: "Japan",
      linkWebsites: ["sparkbook999.com"],
      shareRent: ["100000"],
      billing: "0",
      pl: <div className="green-font">5000000</div>,
      dw: (
        <button className="py-2 rounded px-3 dw-active-btn all-none mx-1 small-font">
          D/W
        </button>
      ),
      action: (
        <div className="d-flex flex-center gap-3">
          <GrEdit size={18} className="black-text" />
          <MdLockReset size={18} className="black-text" />
          <MdBlockFlipped size={18} className="black-text" />
          <IoEyeOutline size={18} className="black-text" />
        </div>
      ),
    },
    {
      id: 7,
      role: "Director",
      name: "Jayanta",
      loginname: "Jayanta121",
      inUsed: "India",
      linkWebsites: ["techx.com"],
      shareRent: ["100000"],
      billing: "0",
      pl: <div className="red-font">5000000</div>,
      dw: (
        <button className="py-2 rounded px-3 dw-active-btn all-none mx-1 small-font">
          D/W
        </button>
      ),
      action: (
        <div className="d-flex flex-center gap-3">
          <GrEdit size={18} className="black-text" />
          <MdLockReset size={18} className="black-text" />
          <MdBlockFlipped size={18} className="black-text" />
          <IoEyeOutline size={18} className="black-text" />
        </div>
      ),
    },
    {
      id: 8,
      role: "Super Admin",
      name: "Jayanta",
      loginname: "Jayanta121",
      inUsed: "UAI",
      linkWebsites: [
        "casinocafe.com",
        "sparkbook999.com",
        "fun77.com",
        "diamondexchange.com",
      ],
      shareRent: ["10%", "2000000", "2000000", "2000000"],
      billing: "0",
      pl: <div className="green-font">5000000</div>,
      dw: (
        <button className="py-2 rounded px-3 dw-active-btn all-none mx-1 small-font">
          D/W
        </button>
      ),
      action: (
        <div className="d-flex flex-center gap-3">
          <GrEdit size={18} className="black-text" />
          <MdLockReset size={18} className="black-text" />
          <MdBlockFlipped size={18} className="black-text" />
          <IoEyeOutline size={18} className="black-text" />
        </div>
      ),
    },
    {
      id: 9,
      role: "Director",
      name: "Jayanta",
      loginname: "Jayanta121",
      inUsed: "Bangladesh",
      linkWebsites: ["fun88.com"],
      shareRent: ["100000"],
      billing: "0",
      pl: <div className="red-font">5000000</div>,
      dw: (
        <button className="py-2 rounded px-3 dw-active-btn all-none mx-1 small-font">
          D/W
        </button>
      ),
      action: (
        <div className="d-flex flex-center gap-3">
          <GrEdit size={18} className="black-text" />
          <MdLockReset size={18} className="black-text" />
          <MdBlockFlipped size={18} className="black-text" />
          <IoEyeOutline size={18} className="black-text" />
        </div>
      ),
    },
    {
      id: 10,
      role: "Director",
      name: "Jayanta",
      loginname: "Jayanta121",
      inUsed: "Japan",
      linkWebsites: ["sparkbook999.com"],
      shareRent: ["10%"],
      billing: "0",
      pl: <div className="green-font">2000000</div>,
      dw: (
        <button className="py-2 rounded px-3 dw-active-btn all-none mx-1 small-font">
          D/W
        </button>
      ),
      action: (
        <div className="d-flex flex-center gap-3">
          <GrEdit size={18} className="black-text" />
          <MdLockReset size={18} className="black-text" />
          <MdBlockFlipped size={18} className="black-text" />
          <IoEyeOutline size={18} className="black-text" />
        </div>
      ),
    },
  ];

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

  const tableDataWithActions = tableData.map((row) => ({
    ...row,
    linkWebsites: (
      <div>
        {row.linkWebsites.map((website, index) => (
          <div key={index}>{website}</div>
        ))}
      </div>
    ),
    shareRent: (
      <div>
        {row.shareRent.map((rent, index) => (
          <div key={index}>{rent}</div>
        ))}
      </div>
    ),
  }));

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        {role === "management" ? (
          <h6 className="yellow-font mb-0">Add Director & Super Admin</h6>
        ) : (
          <h6 className="yellow-font mb-0">Add Super Admin</h6>
        )}
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

      <Table data={tableDataWithActions} columns={columns} itemsPerPage={7} />

      <AddDirectorAdminPopup show={showModal} handleClose={handleModalClose} />

      <ResetPasswordPopup
        resetPasswordPopup={resetPasswordPopup}
        setResetPasswordPopup={handleResetPasswordClose}
      />

      <ConfirmationPopup
        confirmationPopupOpen={confirmationPopup}
        setConfirmationPopupOpen={setConfirmationPopup}
        discription={`Are you sure you want to block ${selectedUser}?`}
        submitButton="Block"
      />
    </div>
  );
};

export default AddDirectorAdmin;
