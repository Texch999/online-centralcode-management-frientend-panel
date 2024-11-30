import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import { GrEdit } from "react-icons/gr";
import { MdLockReset, MdBlockFlipped } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import AddDirectorAdminPopup from "./AddDirectorAdminPopup";
import "../add-team/style.css";
import "../../App.css";

const AddDirectorAdmin = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
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
      dw: <button className="btn dw-active-btn mx-1">D/W</button>,
      action: (
        <div className="d-flex align-items-center">
          <GrEdit className="add-management-icon mx-1" />
          <MdLockReset className="add-management-icon mx-1" />
          <MdBlockFlipped className="add-management-icon mx-1" />
          <IoEyeOutline
            className="add-management-icon mx-1"
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
      dw: <button className="btn dw-active-btn mx-1">D/W</button>,
      action: (
        <div className="d-flex align-items-center">
          <GrEdit className="add-management-icon mx-1" />
          <MdLockReset className="add-management-icon mx-1" />
          <MdBlockFlipped className="add-management-icon mx-1" />
          <IoEyeOutline className="add-management-icon mx-1" />
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
      dw: <button className="btn dw-active-btn mx-1">D/W</button>,
      action: (
        <div className="d-flex align-items-center">
          <GrEdit className="add-management-icon mx-1" />
          <MdLockReset className="add-management-icon mx-1" />
          <MdBlockFlipped className="add-management-icon mx-1" />
          <IoEyeOutline className="add-management-icon mx-1" />
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
      dw: <button className="btn dw-active-btn mx-1">D/W</button>,
      action: (
        <div className="d-flex align-items-center">
          <GrEdit className="add-management-icon mx-1" />
          <MdLockReset className="add-management-icon mx-1" />
          <MdBlockFlipped className="add-management-icon mx-1" />
          <IoEyeOutline className="add-management-icon mx-1" />
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
      dw: <button className="btn dw-active-btn mx-1">D/W</button>,
      action: (
        <div className="d-flex align-items-center">
          <GrEdit className="add-management-icon mx-1" />
          <MdLockReset className="add-management-icon mx-1" />
          <MdBlockFlipped className="add-management-icon mx-1" />
          <IoEyeOutline className="add-management-icon mx-1" />
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
      dw: <button className="btn dw-active-btn mx-1">D/W</button>,
      action: (
        <div className="d-flex align-items-center">
          <GrEdit className="add-management-icon mx-1" />
          <MdLockReset className="add-management-icon mx-1" />
          <MdBlockFlipped className="add-management-icon mx-1" />
          <IoEyeOutline className="add-management-icon mx-1" />
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
      dw: <button className="btn dw-active-btn mx-1">D/W</button>,
      action: (
        <div className="d-flex align-items-center">
          <GrEdit className="add-management-icon mx-1" />
          <MdLockReset className="add-management-icon mx-1" />
          <MdBlockFlipped className="add-management-icon mx-1" />
          <IoEyeOutline className="add-management-icon mx-1" />
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
      dw: <button className="btn dw-active-btn mx-1">D/W</button>,
      action: (
        <div className="d-flex align-items-center">
          <GrEdit className="add-management-icon mx-1" />
          <MdLockReset className="add-management-icon mx-1" />
          <MdBlockFlipped className="add-management-icon mx-1" />
          <IoEyeOutline className="add-management-icon mx-1" />
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
      dw: <button className="btn dw-active-btn mx-1">D/W</button>,
      action: (
        <div className="d-flex align-items-center">
          <GrEdit className="add-management-icon mx-1" />
          <MdLockReset className="add-management-icon mx-1" />
          <MdBlockFlipped className="add-management-icon mx-1" />
          <IoEyeOutline className="add-management-icon mx-1" />
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
      dw: <button className="btn dw-active-btn mx-1">D/W</button>,
      action: (
        <div className="d-flex align-items-center">
          <GrEdit className="add-management-icon mx-1" />
          <MdLockReset className="add-management-icon mx-1" />
          <MdBlockFlipped className="add-management-icon mx-1" />
          <IoEyeOutline className="add-management-icon mx-1" />
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
    { header: "", field: "dw" },
    {
      header: <div className="w-100">Action</div>,
      field: "action",
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
        <h6 className="yellow-font mb-0">Add Director & Super Admin</h6>
        <div className="d-flex align-items-center">
          <div className="input-pill d-flex align-items-center rounded-pill px-2 me-3">
            <FaSearch size={16} className="grey-clr me-2" />
            <input className="small-font all-none" placeholder="Search..." />
          </div>
          <button
            className="small-font blue-font border px-3 py-1 rounded-pill"
            onClick={handleModalOpen}
          >
            <FaPlus className="me-2" />
            Add New
          </button>
        </div>
      </div>

      <Table data={tableDataWithActions} columns={columns} itemsPerPage={7} />

      {/* Modal Component */}
      <AddDirectorAdminPopup show={showModal} handleClose={handleModalClose} />
    </div>
  );
};

export default AddDirectorAdmin;
