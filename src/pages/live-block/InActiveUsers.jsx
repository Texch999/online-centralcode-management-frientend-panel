import React, { useEffect, useRef, useState } from "react";
import Table from "../../components/Table";
import { MdDelete, MdDeleteOutline } from "react-icons/md";
import ConfirmationPopup from "./../popups/ConfirmationPopup";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../../pages/add-team/style.css";
import {
  getAdminUserWebsites,
  getInActiveUsers,
  getWebsites,
  suspendInActiveUsers,
} from "../../api/apiMethods";
import { CircleLoader } from "react-spinners";
import moment from "moment/moment";
import { useSearchParams } from "react-router-dom";
import SuccessPopup from "../popups/SuccessPopup";

function InActiveUsers() {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [error, setError] = useState("");
  const [selectedUserWebsite, setSelectedUserWebsite] = useState("");
  const [selectedAdminWebsite, setSelectedAdminWebsite] = useState(null);
  const [websites, setWebsites] = useState([]);
  const dataFetched = useRef(false);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 4;
  const [totalRecords, setTotalRecords] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const [currentPage, setCurrentPage] = useState(page);
  const limit = itemsPerPage;
  const offset = (page - 1) * itemsPerPage;
  const website_id = selectedAdminWebsite
    ? selectedUserWebsite
    : selectedUserWebsite.slice(3, -3);
  const [usersData, setUsersData] = useState([]);
  const [adminWebsiteData, setAdminWebsiteData] = useState([]);
  const [statusId, setStatusId] = useState(null);
  const [websiteId, setWebsiteId] = useState(null);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(null);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const adminOptions = websites
    ?.filter((item) => item?.panel_type === 1)
    .map((item) => ({ value: item?.id, label: item?.web_name }));

  const userOptions = selectedAdminWebsite
    ? adminWebsiteData
        ?.filter((item) => item?.panel_type === 2)
        .map((item) => ({ value: item?.id, label: item?.web_name }))
    : websites
        ?.filter((item) => item?.panel_type === 2)
        .map((item) => ({ value: item?.id, label: item?.web_name }));

  const INACTIVE_USER_COLUMNS = [
    { header: "Role/Name", field: "roleName" },
    { header: "User/Login Name", field: "userloginname" },
    { header: "Website", field: "website" },
    { header: "Deposit", field: "deposit" },
    { header: "Withdraw", field: "withdraw" },
    { header: "Wallet Bal.", field: "walletbal" },
    { header: "P/L", field: "pl" },
    { header: "Login Date", field: "logindate" },
    { header: "Active Days", field: "activedays" },
    { header: <div className="ms-2">Action</div>, field: "action", width: "" },
  ];

  const handleSuspend = (webid, id, status, name) => {
    setShowDeletePopup(true);
    setStatusId(status);
    setWebsiteId(webid);
    setUserName(name);
    setUserId(id);
  };
  const data = usersData?.map((item) => ({
    roleName: (
      <div className="flex-column black-font">
        <span>Super Admin - {item?.superadmin_name}</span>
        <span>Admin - {item?.admin_name}</span>
        <span>Master - {item?.master_name}</span>
        <span>Agent - {item?.agent_name}</span>
      </div>
    ),
    userloginname: (
      <div className="flex-column black-font">
        <span>User - {item?.name}</span>
        <span>Login - {item?.userid}</span>
      </div>
    ),
    website: <div className="black-font">{item?.website_name}</div>,
    deposit: <div className="black-font">{item?.deposit}</div>,
    withdraw: <div className="black-font">{item?.withdraw}</div>,
    walletbal: <div className="black-font">{item?.walletBalance}</div>,
    pl: <div className="black-font">{item?.profitLoss}</div>,
    logindate: (
      <div className="black-font">
        {moment(item?.login_date).format("DD-MM-YYYY")}
      </div>
    ),
    activedays: <div className="black-font">{item?.activeDays}</div>,
    action: (
      <div className="d-flex align-items-center justify-content-around">
        {item?.status === 1 ? (
          <div className="col-8 col-lg-7 green-btn">Active</div>
        ) : (
          <div className="col-8 col-lg-7 red-btn">In-Active</div>
        )}
        <MdDeleteOutline
          size={25}
          className="large-font pointer ms-2"
          onClick={() =>
            handleSuspend(
              item?.web_site_id,
              item?.id,
              item?.status,
              item?.userid
            )
          }
        />
      </div>
    ),
  }));

  const fetchAllUsers = (limit, offset, website_id) => {
    const params = {
      limit: limit,
      offset: offset,
      websiteId: website_id,
    };
    getInActiveUsers(params)
      .then((response) => {
        if (response?.status === true) {
          console.log(response?.data, "userss");
          setUsersData(response?.data);
          setTotalRecords(response?.totalCount?.count);
        } else {
          setError("something wnet wrong");
        }
      })
      .catch((error) => {
        setError(error?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchAllWebsites = () => {
    getWebsites()
      .then((response) => {
        if (response?.status === true) {
          setWebsites(response?.data);
        } else {
          setError("Something went wrong");
        }
      })
      .catch((error) => {
        setError(error?.message);
      });
  };
  useEffect(() => {
    if (dataFetched.current) return;
    dataFetched.current = true;
    fetchAllWebsites();
  }, []);

  const handlePageChange = ({ limit, offset }) => {
    fetchAllUsers(limit, offset, website_id);
  };

  const handleSubmit = () => {
    if (!website_id) {
      setError("Please select a user website.");
      return;
    }
    setLoading(true);
    fetchAllUsers(limit, offset, website_id);
  };

  const fetchAdminUserWebs = (selectedAdminWebsite) => {
    if (!selectedAdminWebsite) return;
    getAdminUserWebsites(selectedAdminWebsite)
      .then((response) => {
        if (response?.status === true) {
          setAdminWebsiteData(response?.data);
        } else {
          setError("something wnet wrong");
        }
      })
      .catch((error) => {
        setError(error?.message);
      });
  };
  useEffect(() => {
    if (selectedAdminWebsite) {
      fetchAdminUserWebs(selectedAdminWebsite);
    }
  }, [selectedAdminWebsite]);

  const suspendUsers = () => {
    suspendInActiveUsers(websiteId, userId)
      .then((response) => {
        if (response.status === true) {
          console.log(response?.data);
          fetchAllUsers(limit,offset,website_id);
          setMsg(response?.message);
          setSuccessPopupOpen(true);
          setTimeout(() => {
            setSuccessPopupOpen(false);
          }, [2000]);
        } else {
          setError("Something went wrong");
        }
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  return (
    <div>
      <div className="flex-between mb-3 mt-2">
        <h6 className="d-flex yellow-font medium-font my-2">In-Active Users</h6>
      </div>

      <div className="row mb-3">
        <div className="col-3 col-lg-2 pe-0">
          <label className="black-text4 small-font mb-1">Admin Websites</label>
          <Select
            className="small-font"
            options={adminOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
            value={adminOptions.find(
              (option) => option.value === selectedAdminWebsite
            )}
            onChange={(e) => setSelectedAdminWebsite(e.value)}
          />
        </div>
        <div className="col-3 col-lg-2">
          <label className="black-text4 small-font mb-1">User Websites</label>
          <Select
            className="small-font"
            options={userOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
            value={userOptions.find(
              (option) => option.value === selectedUserWebsite
            )}
            onChange={(e) => setSelectedUserWebsite(e.value)}
          />
        </div>
        <button
          className="col-2 col-lg-1 saffron-btn2 small-font align-self-end"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      {loading ? (
        <div className="d-flex flex-column flex-center mt-10rem align-items-center">
          <CircleLoader color="#3498db" size={40} />
          <div className="medium-font black-font my-3">
            Just a moment...............⏳
          </div>
        </div>
      ) : (
        <div>
          {!selectedUserWebsite ? (
            <div className="mx-2 my-3">Please Select a User Website to View Active/Inactive Users</div>
          ) : (
            <Table
              columns={INACTIVE_USER_COLUMNS}
              data={data}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              totalRecords={totalRecords}
            />
          )}
        </div>
      )}

      <ConfirmationPopup
        confirmationPopupOpen={showDeletePopup}
        setConfirmationPopupOpen={setShowDeletePopup}
        discription={`Are You Sure to ${
          statusId === 1 ? "In-Active" : "Active"
        } this ${userName}`}
        submitButton={`${statusId === 1 ? "In-Active" : "Active"}`}
        onSubmit={suspendUsers}
      />
      <SuccessPopup
        successPopupOpen={successPopupOpen}
        setSuccessPopupOpen={setSuccessPopupOpen}
        discription={msg}
      />
    </div>
  );
}

export default InActiveUsers;
