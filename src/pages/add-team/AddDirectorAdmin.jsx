import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Table from "../../components/Table";
import { SlPencil } from "react-icons/sl";
import { MdLockReset, MdBlockFlipped } from "react-icons/md";
import { FaSearch, FaPlus } from "react-icons/fa";
import { BsEye } from "react-icons/bs";
import ResetPasswordPopup from "../popups/ResetPasswordPopup";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import {
  blockDirector,
  getDirectorDwnList,
  getDirectors,
  resetDirectorPassword,
  resetSuperAdminPassword,
  unblockBlockDirectorDwnln,
} from "../../api/apiMethods";
import { CircleLoader } from "react-spinners";
import { commissionTypes } from "../../utils/enum";
import SuccessPopup from "../popups/SuccessPopup";

const AddDirectorAdmin = () => {
  const role = localStorage.getItem("role_code");
  const [resetPasswordPopup, setResetPasswordPopup] = useState(false);
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDirectorId, setSelectedDirectorId] = useState(null);
  const [selectedSuperAdminId, setSelectedSuperAdminId] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [tableSuperAdminData, setTableSuperAdminData] = useState([]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPasswordOpen = (id) => {
    setSelectedDirectorId(id);
    setSelectedSuperAdminId(id);
    setResetPasswordPopup(true);
  };
  const itemsPerPage = 7;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const [currentPage, setCurrentPage] = useState(page);
  const handleResetPasswordClose = () => {
    setResetPasswordPopup(false);
  };
  const [selectedDirectorStatus, setSelectedDirectorStatus] = useState(null);
  const [totalRecords, setTotalRecords] = useState(null);
  const [selectedSuperAdminStatus, setSelectedSuperAdminStatus] =
    useState(null);
  const [resetPasswordErrrors, setResetPasswordErrors] = useState(null);

  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [discription, setDiscription] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = tableData?.filter((user) =>
    user.login_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleBlockUserOpen = (login_name, id) => {
    const director = tableData.find((user) => user.id === id);
    if (director) {
      setSelectedDirectorId(id);
      setSelectedDirectorStatus(director.status);
      setConfirmationPopup(true);
    }
    const superAdmin = tableSuperAdminData.find((user) => user.id === id);
    if (superAdmin) {
      setSelectedSuperAdminId(id);
      setSelectedSuperAdminStatus(superAdmin.status);
      setConfirmationPopup(true);
    }
  };
  // else {
  //   setSelectedSuperAdminId(id);
  //   setConfirmationPopup(true);
  // }
  const handleNavigateUserDashboard = (id) => {
    navigate(`/user-profile-dashboard/${id}`);
  };

  const columns = [
    { header: "Role", field: "role" },
    { header: "Name", field: "name" },
    { header: "Login Name", field: "loginname" },
    { header: "In Used", field: "inUsed" },
    { header: "Admin Websites", field: "adminwebsites" },
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
  const GetAllSuperAdmin = (limit, offset) => {
    getDirectorDwnList({ limit, offset })
      .then((response) => {
        if (response.status === true) {
          setTableSuperAdminData(response.directorsWithWebsites);
        } else {
          console.error("Something Went Wrong");
        }
      })
      .catch((error) => {
        console.error(error?.message || "Failed to fetch directors");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const GetAllDirectors = (limit, offset) => {
    setLoading(true);
    getDirectors({ limit, offset })
      .then((response) => {
        if (response.status === true) {
          setTableData(response.directorsWithWebsites);
          setTotalRecords(response?.meta.totalCount);
        } else {
          console.error("Something Went Wrong");
        }
      })
      .catch((error) => {
        console.error(error?.message || "Failed to fetch directors");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const limit = itemsPerPage;
    const offset = (page - 1) * itemsPerPage;
    if (role === "director") {
      GetAllSuperAdmin(limit, offset);
    } else if (role === "management") {
      GetAllDirectors(limit, offset);
    }
  }, [role]); // Runs when role changes

  const onDirectorResetPassword = (data) => {
    if (!selectedDirectorId) {
      setResetPasswordErrors("Invalid ID");
      return;
    }

    const requestData = {
      password: data.password,
      confirm_password: data.confirmPassword,
      parent_password: data.managementPassword,
    };

    resetDirectorPassword(selectedDirectorId, requestData)
      .then((response) => {
        setResetPasswordPopup(false);
        setSuccessPopupOpen(true);
        setDiscription("Password reset successfully");

        if (response) {
          setTimeout(() => {
            setResetPasswordPopup(false);
          }, 1000);
        } else {
          setResetPasswordErrors("Something went wrong");
        }
      })
      .catch((error) => {
        setResetPasswordErrors(error?.message || "Request failed");
      });
  };

  const onSuperAdminResetPassword = (data) => {
    if (!selectedSuperAdminId) {
      setResetPasswordErrors("Invalid ID");
      return;
    }

    const requestData = {
      password: data.password,
      confirm_password: data.confirmPassword,
      parent_password: data.managementPassword,
    };

    resetSuperAdminPassword(selectedDirectorId, requestData)
      .then((response) => {
        if (response) {
          setTimeout(() => {
            setResetPasswordPopup(false);
          }, 1000);
        } else {
          setResetPasswordErrors("Something went wrong");
        }
      })
      .catch((error) => {
        setResetPasswordErrors(error?.message || "Request failed");
      });
  };
  const blockUnblock = () => {
    blockDirector(selectedDirectorId)
      .then((response) => {
        console.log(response, "resp");
        setConfirmationPopup(false);
        GetAllDirectors();
      })
      .catch((error) => {
        console.error(error?.message || "Failed to block/unblock director");
      });
  };
  const blockUnblockSuperAdmin = () => {
    const data = {
      id: selectedSuperAdminId,
      status: selectedSuperAdminStatus,
    };
    unblockBlockDirectorDwnln(data)
      .then((response) => {
        setConfirmationPopup(false);
        GetAllSuperAdmin();
      })
      .catch((error) => {
        console.error(error?.message || "Failed to block/unblock director");
      });
  };
  const TableData = filteredData?.map((user) => {
    const linkWebsites = user.accessWebsites.map((website) => ({
      name: website.user_panel_name,
      url: website.user_panel_url,
      adminPanel: website.admin_panel_name,
      adminUrl: website.admin_panel_url,
    }));

    const shareRent = user.accessWebsites.map((website) => ({
      commissionType: website.commission_type,
      monthlyAmount: website.monthly_amount || "N/A",
      maxChipsMonthly: website.max_chips_monthly || "N/A",
      extraChipsPercentage: website.extra_chips_percentage || "N/A",
      chipPercentage: website.chip_percentage || "N/A",
      share: website.share,
    }));

    return {
      id: user.id,
      role: user.type === 1 ? "Director" : "Super Admin",
      name: user.name,
      loginname: user.login_name,
      inUsed: (
        <div className={`${user.status === 1 ? "green-clr" : "clr-red"}`}>
          {user.status === 1 ? "Active" : "InActive"}
        </div>
      ),
      adminwebsites: (
        <span className="d-flex flex-column">
          {linkWebsites.map((website, index) => (
            <span key={index}>
              <a
                href={website.adminUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {website.adminPanel}
              </a>
              
            </span>
          ))}
        </span>
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
              </a>
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
              {/* {type.share ? `, Share: ${type.share}%` : ""} */}
            </span>
          ))}
        </span>
      ),
      billing: "0",
      pl: <div className="red-font">0</div>,
      // dw: (
      //   <button className="py-2 rounded px-3 dw-active-btn all-none mx-1 small-font">
      //     D/W
      //   </button>
      // ),
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

  const directorTableData = tableSuperAdminData?.map((user) => {
    const linkWebsites = user.accessWebsites.map((website) => ({
      name: website.user_panel_name || "N/A",
      url: website.user_panel_url || "#",
      adminPanel: website.admin_panel_name,
      adminUrl: website.admin_panel_url,
    }));

    const shareRent = user.accessWebsites.map((website) => ({
      commissionType: website.commission_type,
      monthlyAmount: website.monthly_amount || "N/A",
      maxChipsMonthly: website.max_chips_monthly || "N/A",
      extraChipsPercentage: website.extra_chips_percentage || "N/A",
      chipPercentage: website.chip_percentage || "N/A",
      share: website.share,
    }));

    return {
      id: user.id,
      role: user.type === 2 ? "Super Admin" : "Unknown",
      name: user.name,
      loginname: user.login_name,
      inUsed: (
        <div className={`${user.status === 1 ? "green-clr" : "clr-red"}`}>
          {user.status === 1 ? "Active" : "Inactive"}
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

  const handlePageChange = ({ limit, offset }) => {
    if (role === "management") {
      GetAllDirectors(limit, offset);
    } else {
      GetAllSuperAdmin(limit, offset);
    }
  };
  console.log(totalRecords, "==totalRecords");
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
            <input
              className="small-font all-none"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
        <>
          {role === "management" ? (
            <>
              {" "}
              <Table
                data={TableData}
                columns={columns}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                totalRecords={totalRecords}
              />
            </>
          ) : (
            <>
              {" "}
              <Table
                data={directorTableData}
                columns={columns}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                totalRecords={totalRecords}
              />
            </>
          )}
        </>
      )}
      {resetPasswordPopup && (
        <ResetPasswordPopup
          resetPasswordPopup={resetPasswordPopup}
          setResetPasswordPopup={handleResetPasswordClose}
          resetPasswordErrrors={resetPasswordErrrors}
          setResetPasswordErrors={setResetPasswordErrors}
          onSubmit={
            role === "management"
              ? onDirectorResetPassword
              : onSuperAdminResetPassword
          }
        />
      )}

      {successPopupOpen && (
        <SuccessPopup
          successPopupOpen={successPopupOpen}
          setSuccessPopupOpen={setSuccessPopupOpen}
          discription={discription}
        />
      )}
      {confirmationPopup && (
        <>
          {role === "management" ? (
            <>
              <ConfirmationPopup
                confirmationPopupOpen={confirmationPopup}
                setConfirmationPopupOpen={setConfirmationPopup}
                onSubmit={blockUnblock}
                discription={`Do you want to ${
                  selectedDirectorStatus === 1 ? "Block" : "Unblock"
                } ?`}
                submitButton={
                  selectedDirectorStatus === 1 ? "Block" : "Unblock"
                }
              />
            </>
          ) : (
            <>
              {" "}
              <ConfirmationPopup
                confirmationPopupOpen={confirmationPopup}
                setConfirmationPopupOpen={setConfirmationPopup}
                onSubmit={blockUnblockSuperAdmin}
                discription={`Do you want to ${
                  selectedSuperAdminStatus === 1 ? "Block" : "Unblock"
                } this SuperAdmin?`}
                submitButton={
                  selectedSuperAdminStatus === 1 ? "Block" : "Unblock"
                }
              />
            </>
          )}
        </>

        // selectedSuperAdminStatus
      )}
    </div>
  );
};

export default AddDirectorAdmin;
