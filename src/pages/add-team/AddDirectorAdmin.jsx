import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import { SlPencil } from "react-icons/sl";
import { MdLockReset, MdBlockFlipped } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { BsEye } from "react-icons/bs";
import AddDirectorAdminPopup from "./popups/AddDirectorAdminPopup";
import "../add-team/style.css";
import "../../App.css";
import ResetPasswordPopup from "../popups/ResetPasswordPopup";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import {
  blockDirector,
  getCountries,
  getDirectors,
  resetDirectorPassword,
} from "../../api/apiMethods";
import EditDirectorAdminPopup from "./popups/EditDirectorAdminPopup";
import {
  getDirectorDwnList,
  getDirectorDwnListById,
  unblockBlockDirectorDwnln,
  updateDirectorDwnlnPswd,
} from "../../api/apiMethods";
import { CgUnblock } from "react-icons/cg";
import { CircleLoader } from "react-spinners";

const AddDirectorAdmin = () => {
  const role = localStorage.getItem("role_code");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState();
  const [resetPasswordPopup, setResetPasswordPopup] = useState(false);
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [directorId, setDirectorId] = useState();
  const [directorDwnList, setDirectorDwnList] = useState([]);
  const [dirDwnlnId, setDirDwnlnId] = useState(null);
  const [dirDwnlnBlockUnblockId, setDirDwnlnBlockUnblockId] = useState(null);
  const [statusId, setStatusId] = useState(null);
  const [loading, setLoading] = useState(false);
  const login_role_name = localStorage.getItem("role_name");

  const handleResetPswdDirDwn = (id) => {
    setResetPasswordPopup(true);
    setDirDwnlnId(id);
  };
  const handleBlockUnblockDirDwn = (id, user, status) => {
    setConfirmationPopup(true);
    setSelectedUser(user);
    setDirDwnlnBlockUnblockId(id);
    setStatusId(status);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleEditModalOpen = (id) => {
    setDirectorId(id);
    setShowEditModal(true);
  };
  const handleEditModalClose = () => {
    setShowEditModal(false);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };
  const [selectedDirectorId, setSelectedDirectorId] = useState(null);
  console.log(selectedDirectorId, "selectedDirectorId");
  const handleResetPasswordOpen = (id) => {
    setSelectedDirectorId(id);
    setResetPasswordPopup(true);
  };

  const handleResetPasswordClose = () => {
    setSelectedUser(null);
    setResetPasswordPopup(false);
  };

  const handleBlockUserOpen = (user, id) => {
    setSelectedUser(user);
    setSelectedDirectorId(id)
    setConfirmationPopup(true);
  };

  const handleBlockUserClose = () => {
    setSelectedUser(null);
    setConfirmationPopup(false);
  };

  const handleBlockUserConfirm = () => {
    handleBlockUserClose();
  };

  const navigate = useNavigate();

  const handleNavigateUserDashboard = () => {
    navigate("/user-profile-dashboard");
  };

  const [countryData, setCountryData] = useState([]);
  const GetAllCountries = () => {
    getCountries()
      .then((response) => {
        if (response?.status === true) {
          setCountryData(response?.data);
          console.log(response, "countries");
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setError(error?.message || "Not able to get Countries");
      });
  };
  useEffect(() => {
    GetAllCountries();
  }, []);


  const getDirectorDwnSAList = () => {
    setLoading(true);
    getDirectorDwnList()
      .then((response) => {
        if (response) {
          console.log(response?.directorsWithWebsites, "response0000");
          setDirectorDwnList(response?.directorsWithWebsites);
        } else {
          console.log(error, "Ganga chi chi hci");
        }
      })
      .catch((error) => {
        console.log(error, "error");
        setError(error?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getDirectorDwnSAList();
  }, []);

  console.log(dirDwnlnId, "dirDwnlnId");

  const getDrirectorDwnlnById = () => {
    getDirectorDwnListById(dirDwnlnId)
      .then((response) => {
        console.log("responsegetidddd", response);
      })
      .catch((error) => {
        console.log("error", error);
        setError(error?.message);
      });
  };
  useEffect(() => {
    getDrirectorDwnlnById();
  }, [dirDwnlnId]);

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
  const [error, setError] = useState();
  const [tableData, setTableData] = useState();
  const TableData =
    role === "management"
      ? tableData?.map((user) => ({
        id: user.id,
        role: user.type === 1 ? "Director" : "Super Admin",
        name: user.login_name,
        loginname: user.login_name,
        inUsed: "N/A",
        linkWebsites: [],
        shareRent: [],
        billing: "0",
        pl: <div className="red-font">0</div>,
        dw: (
          <button className="py-2 rounded px-3 dw-active-btn all-none mx-1 small-font">
            D/W
          </button>
        ),
        action: (
          <div className="d-flex flex-center gap-3">
            {/* Edit button (disabled when status === 2) */}
            <SlPencil
              size={18}
              className={`black-text pointer ${user.status === 2 ? "disabled" : ""}`}
              onClick={() => user.status !== 2 && setShowModal(true)}
            />
        
            {/* Reset Password button (disabled when status === 2) */}
            <MdLockReset
              size={18}
              className={`black-text pointer ${user.status === 2 ? "disabled" : ""}`}
              onClick={() => user.status !== 2 && handleResetPasswordOpen(user.id)}
            />
        
            {/* Block/Unblock button (always enabled) */}
            <MdBlockFlipped
              size={18}
              className={user.status === 2 ? "clr-red" : "green-clr"}
              onClick={() => handleBlockUserOpen(user.login_name, user.id)}
            />
        
            {/* View button (always enabled) */}
            <BsEye
              size={18}
              className={`black-text pointer ${user.status === 2 ? "disabled" : ""}`}
              onClick={handleNavigateUserDashboard}
            />
          </div>
        ),
        
      }))
      : directorDwnList?.map((item) => ({
        id: item.id,
        role: item.type === 2 ? "Super Admin" : "",
        name: item.name,
        loginname: item.login_name,
        inUsed: "N/A",

        shareRent: [],
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
              className="black-text pointer"
              onClick={() => setShowModal(true)}
            />
            <MdLockReset
              size={18}
              className="black-text pointer"
              onClick={() => handleResetPswdDirDwn(item?.id)}
            />
            {item?.status === 1 ? (
              <CgUnblock
                size={20}
                className="green-font pointer"
                onClick={() =>
                  handleBlockUnblockDirDwn(
                    item?.id,
                    item?.login_name,
                    item?.status
                  )
                }
              />
            ) : (
              <MdBlockFlipped
                size={18}
                className="red-font pointer"
                onClick={() =>
                  handleBlockUnblockDirDwn(
                    item?.id,
                    item?.login_name,
                    item?.status
                  )
                }
              />
            )}
            <BsEye
              size={18}
              className="black-text pointer"
              onClick={handleNavigateUserDashboard}
            />
          </div>
        ),
      }));
  console.log(tableData, "tableData");

  const GetAllDirectors = () => {
    getDirectors({ limit: 10, offset: 0 })
      .then((response) => {
        if (response.status === true) {
          console.log(response, "response from API");
          setTableData(response.directorsWithWebsites);
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setError(error?.message || "Login failed");
      });
  };
  useEffect(() => {
    GetAllDirectors();
  }, []);

  const onDirectorResetPassword = (data) => {
    if (!selectedDirectorId) {
      alert("Invalid ID");
      return;
    }

    const requestData = {
      password: data.password,
      confirm_password: data.confirmPassword,
      parent_password: data.managementPassword,
    };

    resetDirectorPassword(selectedDirectorId, requestData)
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


  const resetPasswordDwnln = (data) => {
    if (!dirDwnlnId) {
      alert("Invalid ID");
      return;
    }

    const payload = {
      password: data.password,
      confirm_password: data.confirmPassword,
      parent_password: data.managementPassword,
    };

    updateDirectorDwnlnPswd(dirDwnlnId, payload)
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

  const blockUnblock = () => {
    blockDirector(selectedDirectorId)
      .then((response) => {
        console.log(response, "resp");
        getDirectorDwnSAList();
        setDirectorDwnList();
        setConfirmationPopup(false);
      })
      .catch((error) => {
        console.log(error, "error");
        setError(error?.message);
      });
  };

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        {role === "management" ? (
          <h6 className="yellow-font medium-font mb-0">
            Add Director & Super Admin
          </h6>
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

      <AddDirectorAdminPopup
        show={showModal}
        handleClose={handleModalClose}
        getDirectorDwnSAList={getDirectorDwnSAList}
      />
      <EditDirectorAdminPopup
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        handleEditModalClose={handleEditModalClose}
        directorId={directorId}
      />

      <ResetPasswordPopup
        resetPasswordPopup={resetPasswordPopup}
        setResetPasswordPopup={handleResetPasswordClose}
        onSubmit={
          login_role_name === "director"
            ? resetPasswordDwnln
            : onDirectorResetPassword
        }
      />

      <ConfirmationPopup
        confirmationPopupOpen={confirmationPopup}
        setConfirmationPopupOpen={setConfirmationPopup}
        discription={`Are you sure you want to ${statusId === 1 ? "Unblock" : "Block"
          } ${selectedUser}?`}
        submitButton={`${statusId === 1 ? "Unblock" : "Block"}`}
        // onSubmit={login_role_name === "director" ? "Unblock" : "block"}
        onSubmit={() => blockUnblock()} // Ensure this is a function

      />
    </div>
  );
};

export default AddDirectorAdmin;
