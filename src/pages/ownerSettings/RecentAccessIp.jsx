
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";
import Table from "../../components/Table";
import { getDirectorEmployeesLoginLogsByEmployeeId, getDirectorLoginLogsById, getLoggedInLogsById } from "../../api/apiMethods";

const RecentAccessIp = () => {
  const [activeRow, setActiveRow] = useState(null);
  const { userId, userActivity } = useParams();
  const isInitialRender = useRef(true)
  const decodedUserId = decodeURIComponent(userId);
  const decodedUserActivity = decodeURIComponent(userActivity);
  const itemsPerPage = 6
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1)
  const [currentPage, setCurrentPage] = useState(page)
  const [totalRecords, setTotalaRecords] = useState(null)
  const userRole = localStorage.getItem("role_code");
  const activeTab = localStorage.getItem("activeTab");

  const ACTIVITY_COLUMNS = [
    { header: "Prod", field: "prod", width: "10%" },
    { header: "First Date/Time", field: "firstDateTime", width: "20%" },
    { header: "Last Date/Time", field: "lastDateTime", width: "20%" },
    { header: "Method", field: "method", width: "20%" },
    { header: "IP", field: "ip", width: "20%" },
    { header: "Login Url", field: "loginurl", width: "20%" },
    { header: "Configure", field: "configure", width: "10%" },
  ];

  const [logData, setLogsData] = useState([])
  const [error, setError] = useState("")
  const getAllLogsById = (limit, offset) => {
    getLoggedInLogsById({
      id: decodedUserId,
      limit,
      offset,
    })
      .then((response) => {
        if (response?.status) {
          setLogsData(response.data);
          setTotalaRecords(response.totalCount)
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setLogsData([]);
        setError(error?.message || "API request failed");
      });
  }

  const getDirectorLogsById = (limit, offset) => {
    getDirectorLoginLogsById({
      id: decodedUserId,
      limit,
      offset,
    })
      .then((response) => {
        if (response?.status) {
          setLogsData(response.data);
          setTotalaRecords(response.totalCount)
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setLogsData([]);
        setError(error?.message || "API request failed");
      });
  }

  const getDirectorEmplyessLogsById = (limit, offset) => {
    getDirectorEmployeesLoginLogsByEmployeeId({
      id: decodedUserId,
      limit,
      offset,
    })
      .then((response) => {
        if (response?.status) {
          setLogsData(response.data);
          setTotalaRecords(response.totalCount)
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setLogsData([]);
        setError(error?.message || "API request failed");
      });
  }

  const ACTIVITY_DATA = logData?.map((item, index) => ({
    prod: (
      <div>
        <FaCheckCircle className="green-font" size={24} />
      </div>
    ),
    firstDateTime: <div>
      {new Date(item.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}{" "}
      <br />
      {new Date(item.date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}
    </div>,
    lastDateTime: <div>
      {new Date(item.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}{" "}
      <br />
      {new Date(item.date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}
    </div>,
    method: <div>{item.browser_type || "Unknown Browser"}</div>,
    location: <div>{item.location}</div>,
    loginurl: <div>{item.login_url}</div>,
    ip: <div>{item.ip}</div>,
    configure: (
      <div className="relative">
        <div
          className="w-100 flex-center pointer"
          onClick={() => setActiveRow(activeRow === index ? null : index)}
        >
          <IoSettingsOutline size={24} />
        </div>
        {activeRow === index && (
          <div className="absolute box-shadow-table remove-list p-2 rounded white-bg pointer">
            Remove From Allow list
          </div>
        )}
      </div>
    ),
  }));

  useEffect(() => {
    const limit = itemsPerPage
    const offset = (currentPage - 1) * itemsPerPage
    if (userRole === "director") {
      if (activeTab === "employees") {
        getDirectorEmplyessLogsById(limit, offset)
      } else if (activeTab === "admins") {
        console.log("Integrated Soon")
      }
    } else {
      if (activeTab === "employees") {
        getAllLogsById(limit, offset)
      } else {
        getDirectorLogsById(limit, offset)
      }
    }

  }, [])

  const handlePageChange = ({ limit, offset }) => {
    if (userRole === "director") {
      if (activeTab === "employees") {
        getDirectorEmplyessLogsById(limit, offset,)
        console.log("hello i am not here")
      } else if (activeTab === "admins") {
        console.log("Integrated Soon")
      }
    } else {

      if (activeTab === "employees") {

        getAllLogsById(limit, offset,)
      } else {
        getDirectorLogsById(limit, offset,)
      }
    }
  };
  
  return (
    <div>
      <div className="mt-2">
        <div className="d-flex justify-content-between align-items-center w-100">

          <div className="d-flex align-items-center">
            <h6>Activity Logs</h6>
            <FiChevronRight className="medium-font m-1" size={18} />
            <h6 className="saffron-clr">{decodedUserActivity}</h6>
          </div>
          <div className="d-flex align-items-center back-btn-bg me-3 py-1 px-3 white-clr pointer" onClick={() => window.history.back()}>
            <span className="small-font" style={{ color: "#fff" }} >Back</span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Table
          columns={ACTIVITY_COLUMNS}
          data={ACTIVITY_DATA}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          totalRecords={totalRecords}
        />
      </div>
    </div>
  );
};

export default RecentAccessIp;
