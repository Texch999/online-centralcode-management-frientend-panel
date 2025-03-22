import React, { useEffect, useRef, useState } from "react";
import Table from "../../components/Table";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { IoTv } from "react-icons/io5";
import { FaMobile } from "react-icons/fa";
import { getDirectorLoginLogs, getLoggedInLogs, getDirectorEmployeesLoginLogsList } from "../../api/apiMethods";

const ActivityLogs = () => {
  const navigation = useNavigate();
  const [logData, setLogsData] = useState([]);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("employees");
  const [type, setType] = useState(null)
  const user_id = localStorage.getItem("user_id")
  const [fromDate, setFromDate] = useState(new Date().toISOString().split("T")[0]);
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);
  const userRole = localStorage.getItem("role_code");
  const itemsPerPage = 9;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1)
  const [currentPage, setCurrentPage] = useState(page)
  const [totalRecords, setTotalaRecords] = useState(null)
  const handleMatchClick = (userActivity, id) => {
    const encodedUserId = encodeURIComponent(id);
    const encodedUserActivity = encodeURIComponent(userActivity);
    localStorage.setItem("activeTab", activeTab)
    navigation(`/userActivity/${encodedUserId}/${encodedUserActivity}`);
  };
  const [errors, setErrors] = useState({ fromDate: "", toDate: "" });

  const validateDates = () => {
    const newErrors = { fromDate: "", toDate: "" };

    if (!fromDate) {
      newErrors.fromDate = "From date is required.";
    }

    if (!toDate) {
      newErrors.toDate = "To date is required.";
    }

    if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
      newErrors.toDate = "To date must be greater than or equal to From date.";
    }

    setErrors(newErrors);

    return !newErrors.fromDate && !newErrors.toDate;
  };
  const getEmployeeAllLogs = (limit, offset, fromDate, toDate) => {
    getLoggedInLogs({
      limit,
      offset,
      fromDate,
      toDate
    })
      .then((response) => {
        if (response?.status) {
          setLogsData(response.data);
          setTotalaRecords(response?.totalCount)
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setLogsData([]);
        setError(error?.message || "API request failed");
      });
  };
  const getDownlineLogs = (limit, offset, fromDate, toDate) => {
    getDirectorLoginLogs({
      limit,
      offset,
      id: user_id,
      type: type,
      fromDate,
      toDate
    })
      .then((response) => {
        if (response?.status === true) {
          setLogsData(response.data);
          setTotalaRecords(response.totalCount)
        } else {
          setLogsData([]);
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setLogsData([]);
        setError(error?.message || "API request failed");
      });
  };
  const getDirectorDownlineLoginLogsList = (limit, offset, fromDate, toDate) => {
    getDirectorEmployeesLoginLogsList({
      limit,
      offset,
      id: user_id,
      fromDate,
      toDate
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
  };

  const handleTabClick = (tab, type) => {
    console.log(type, "==>/activity-logs")
    setType(type);
    setActiveTab(tab);
  };
  const isInitialRender = useRef(true);
  useEffect(() => {
    const limit = itemsPerPage
    const offset = (currentPage - 1) * itemsPerPage

    if (userRole === "director") {
      if (activeTab === "employees") {
        getDirectorDownlineLoginLogsList(limit, offset)
      } else if (activeTab === "admins") {
        console.log("Integrated Soon")
        setLogsData([]);
      }
    } else {
      if (userRole === "management") {
        if (activeTab === "employees") {
          getEmployeeAllLogs(limit, offset);
        } else if (activeTab === "directors") {
          getDownlineLogs(limit, offset);
        } else if (activeTab === "admins") {
          getDownlineLogs(limit, offset);
        }
      }
    }
  }, [activeTab, userRole]);

  const ACTIVITY_COLUMNS = [

    { header: "Prod", field: "prod" },
    { header: "Device", field: "device" },
    { header: "Date/Time", field: "dateTime" },
    { header: "User/Admin", field: "userAdmin" },
    { header: "Executable", field: "executable" },
    { header: "Login Url", field: "loginurl" },
    { header: "Location", field: "location" },
    { header: "IP", field: "ip" },
    { header: "No of IP Login", field: "iplogin" },
    { header: "", field: "show" },
  ];
  const ACTIVITY_DATA = logData.map((item) => ({
    prod: (
      <div>
        <FaCheckCircle className="green-font" size={24} />
      </div>
    ),
    device: (
      <div>
        {item?.device_type === "Windows" ? <IoTv size={24} /> : <FaMobile size={24} />}
      </div>
    ),
    dateTime: (
      <div>
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
      </div>
    ),
    userAdmin: (
      <div>
        {item.user_name} <br />
        {item.user_role}
      </div>
    ),
    executable: <div>{item.browser_type || "--"}</div>,
    loginurl: <div>{item.login_url || "--"}</div>,
    location: <div>{item.location || "--"}</div>,
    ip: <div>{item.ip}</div>,
    iplogin: <div className="w-50 flex-center">{item.ip_count}</div>,
    show: (
      <div
        className="saffron-btn2 w-100 pointer"
        onClick={() =>
          handleMatchClick(
            `${item.user_name} (${new Date(item.date).toLocaleString()})`,
            item.user_id
          )
        }
      >
        view
      </div>
    ),
  }));
  const handlePageChange = ({ limit, offset }) => {
    if (userRole === "management") {
      if (activeTab === "employees") {
        getEmployeeAllLogs(limit, offset,);
      } else if (activeTab === "directors") {
        getDownlineLogs(limit, offset,);
      } else if (activeTab === "admins") {
        getDownlineLogs(limit, offset);
      }
    } else {
      if (activeTab === "employees") {
        getDirectorDownlineLoginLogsList(limit, offset)
      } else if (activeTab === "admins") {
        console.log("Integrated Soon")
      }
    }
  };
  const handleDataBetweenFromAndToDates = () => {
    const limit = itemsPerPage
    const offset = (currentPage - 1) * itemsPerPage
    if (validateDates()) {
      if (userRole === "director") {
        if (activeTab === "employees") {
          getDirectorDownlineLoginLogsList(limit, offset, fromDate, toDate)
        } else if (activeTab === "admins") {
          console.log("Integrated Soon")
        }
      } else {
        if (userRole === "management") {
          if (activeTab === "employees") {
            getEmployeeAllLogs(limit, offset, fromDate, toDate);
          } else if (activeTab === "directors") {
            getDownlineLogs(limit, offset, fromDate, toDate);
          } else if (activeTab === "admins") {
            getDownlineLogs(limit, offset, fromDate, toDate);
          }
        }
      }
    }
  }
  return (
    <div>
      <h6 className="saffron-clr mt-2 mb-3">Activity Logs</h6>

      {/* Tabs for filtering logs */}
      <div className="d-flex mb-3">
        <button
          className={`tab-btn small-font  ${activeTab === "employees" ? "active" : ""}`}
          onClick={() => handleTabClick("employees", 0)}
        >
          Employees
        </button>
        <button
          className={`tab-btn small-font ${activeTab === "admins" ? "active" : ""}`}
          onClick={() => handleTabClick("admins", 2)}
        >
          Admins
        </button>
        {userRole !== "director" ? <button
          className={`tab-btn small-font ${activeTab === "directors" ? "active" : ""}`}
          onClick={() => handleTabClick("directors", 1)}
        >
          Directors
        </button> : null}

      </div>
      <div>
        <div className="d-flex w-30 flex-between mt-2">
          <div className="col flex-column">
            <label className="black-text4 small-font mb-1">From</label>
            <input
              className="input-css2 small-font"
              value={fromDate}
              type="date"
              onChange={(e) => {
                setErrors("");
                setFromDate(e.target.value)
              }}
            />
            {errors.fromDate && <p className="text-danger small-font">{errors.fromDate}</p>}
          </div>

          <div className="col flex-column mx-2">
            <label className="black-text4 small-font mb-1">To</label>
            <input
              className="input-css2 small-font"
              value={toDate}
              onChange={(e) => {
                setErrors("");
                setToDate(e.target.value)
              }}
              type="date"
            />
          </div>
          <button
            className="align-self-end saffron-btn2 small-font pointer col-4"
            onClick={handleDataBetweenFromAndToDates}
          >
            Submit
          </button>
        </div>
        {errors.toDate && <p className="text-danger small-font pt-1">{errors.toDate}</p>}
      </div>

      {/* Table */}
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

export default ActivityLogs;

// Tab button styles (add to your CSS file)
