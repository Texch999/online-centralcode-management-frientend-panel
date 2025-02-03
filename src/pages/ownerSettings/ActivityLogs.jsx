// import React, { useEffect, useState } from "react";
// import Table from "../../components/Table";
// import { useNavigate } from "react-router-dom";
// import { FaCheckCircle } from "react-icons/fa";
// import { IoTv } from "react-icons/io5";
// import { FaCircleQuestion, FaMobileButton } from "react-icons/fa6";
// import { getLoggedInLogs } from "../../api/apiMethods";

// const ActivityLogs = () => {
//   const navigation = useNavigate();
//   const [logData, setLogsData] = useState([])
//   const [error, setError] = useState('')
//   const handleMatchClick = (userActivity, id) => {
//     const encodedUserId = encodeURIComponent(id)
//     const encodedUserActivity = encodeURIComponent(userActivity);
//     navigation(`/userActivity/${encodedUserId}/${encodedUserActivity}`);
//   };
//   const getAllLogs = () => {
//     getLoggedInLogs({
//       limit: 10,
//       offset: 0,
//     })
//       .then((response) => {
//         if (response?.status) {
//           setLogsData(response.data);
//         } else {
//           setError("Something Went Wrong");
//         }
//       })
//       .catch((error) => {
//         setLogsData([]);
//         setError(error?.message || "API request failed");
//       });
//   }
//   useEffect(() => {
//     getAllLogs()
//   }, []);

//   console.log(logData, "======>logData")
//   const ACTIVITY_COLUMNS = [
//     { header: "Prod", field: "prod" },
//     { header: "Device", field: "device" },
//     { header: "Date/Time", field: "dateTime" },
//     { header: "User/Admin", field: "userAdmin" },
//     { header: "Duration", field: "duration" },
//     { header: "Executable", field: "executable" },
//     { header: "Location", field: "location" },
//     { header: "URL", field: "url" },
//     { header: "IP", field: "ip" },
//     { header: "No of IP Login", field: "iplogin" },
//     { header: "", field: "show" },
//   ];
//   // const ACTIVITY_DATA = [
//   //   {
//   //     prod: (
//   //       <div>
//   //         <FaCheckCircle className="green-font" size={24} />
//   //       </div>
//   //     ),
//   //     device: (
//   //       <div>
//   //         <IoTv size={24} />
//   //       </div>
//   //     ),
//   //     dateTime: (
//   //       <div>
//   //         11-10-2024 <br />
//   //         13:08:00
//   //       </div>
//   //     ),

//   //     userAdmin: (
//   //       <div>
//   //         Jayanta <br />
//   //         Super Admin
//   //       </div>
//   //     ),

//   //     duration: (
//   //       <div>
//   //         <span>10s</span>
//   //       </div>
//   //     ),
//   //     executable: <div>Google Crome</div>,
//   //     location: <div>Boulder, Colorado</div>,
//   //     url: <div className="skyblue-clr">https://www.madmin.we2call.com/</div>,
//   //     ip: <div>157.47.47.187</div>,
//   //     iplogin: <div className="w-50 flex-center">4</div>,
//   //     show: (
//   //       <div
//   //         className="saffron-btn2 w-100 pointer"
//   //         onClick={() => handleMatchClick("Jayanta (11-10-2024,13:08:00)")}
//   //       >
//   //         view
//   //       </div>
//   //     ),
//   //   },

//   // ];

//   const ACTIVITY_DATA = logData.map((item) => ({
//     prod: (
//       <div>
//         <FaCheckCircle className="green-font" size={24} />
//       </div>
//     ),
//     device: (
//       <div>
//         <IoTv size={24} />
//       </div>
//     ),
//     dateTime: (
//       <div>
//         {new Date(item.date).toLocaleDateString("en-US", {
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//         })} <br />
//         {new Date(item.date).toLocaleTimeString("en-US", {
//           hour: "2-digit",
//           minute: "2-digit",
//           second: "2-digit",
//         })}
//       </div>
//     ),
//     userAdmin: (
//       <div>
//         {item.user_name} <br />
//         {item.user_role}
//       </div>
//     ),
//     duration: (
//       <div>
//         <span>---</span>
//       </div>
//     ),
//     executable: <div>{item.browser_type || 'Unknown Browser'}</div>,
//     location: <div>{item.location}</div>,
//     url: <div className="skyblue-clr">---</div>,
//     ip: <div>{item.ip_count}</div>,
//     iplogin: <div className="w-50 flex-center">{item.ip_count}</div>,
//     show: (
//       <div
//         className="saffron-btn2 w-100 pointer"
//         // onClick={() => handleMatchClick("Jayanta (11-10-2024,13:08:00)")}
//         onClick={() =>
//           handleMatchClick(`${item.user_name} (${new Date(item.date).toLocaleString()})`, item.user_id)
//         }
//       >
//         view
//       </div>
//     ),
//   }));
//   return (
//     <div>
//       <h6 className="saffron-clr mt-2 mb-3">Activity Logs</h6>

//       <div className="d-flex w-30 flex-between mt-2">
//         <div className="col flex-column ">
//           <label className="black-text4 small-font mb-1">From</label>
//           <input className="input-css2 small-font" type="date" />
//         </div>
//         <div className="col flex-column mx-2">
//           <label className="black-text4 small-font mb-1">To</label>
//           <input className="input-css2 small-font" type="date" />
//         </div>

//         <button className="align-self-end saffron-btn2 small-font pointer col-4">Submit</button>
//       </div>
//       <div className="mt-4">
//         <Table
//           columns={ACTIVITY_COLUMNS}
//           data={ACTIVITY_DATA}
//           itemsPerPage={4}
//         />
//       </div>
//     </div>
//   );
// };

// export default ActivityLogs;


import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { IoTv } from "react-icons/io5";
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
  const handleMatchClick = (userActivity, id) => {
    const encodedUserId = encodeURIComponent(id);
    const encodedUserActivity = encodeURIComponent(userActivity);
    navigation(`/userActivity/${encodedUserId}/${encodedUserActivity}`, {
      state: { activeTab }
    });
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

    // Return true if there are no errors
    return !newErrors.fromDate && !newErrors.toDate;
  };
  const getEmployeeAllLogs = (from, to) => {
    getLoggedInLogs({
      limit: 10,
      offset: 0,
      fromDate: from,
      toDate: to
    })
      .then((response) => {
        if (response?.status) {
          setLogsData(response.data);
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setLogsData([]);
        setError(error?.message || "API request failed");
      });
  };
  const getDownlineLogs = (from, to) => {
    getDirectorLoginLogs({
      limit: 10,
      offset: 0,
      id: user_id,
      type: type,
      fromDate: from,
      toDate: to
    })
      .then((response) => {
        if (response?.status) {
          setLogsData(response.data);
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setLogsData([]);
        setError(error?.message || "API request failed");
      });
  };
  const getDirectorDownlineLoginLogsList = (from, to) => {
    getDirectorEmployeesLoginLogsList({
      limit: 10,
      offset: 0,
      id: user_id,
      fromDate: from,
      toDate: to
    })
      .then((response) => {
        if (response?.status) {
          setLogsData(response.data);
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
    setType(type);
    setActiveTab(tab);
  };
  useEffect(() => {
    if (userRole === "director") {
      if (activeTab === "employees") {
        getDirectorDownlineLoginLogsList()
      } else if (activeTab === "admins") {
        console.log("Integrated Soon")
        setLogsData([]);
      }
    } else {
      if (activeTab === "employees") {
        getEmployeeAllLogs();
      } else if (activeTab === "directors") {
        getDownlineLogs();
      } else if (activeTab === "admins") {
        getDownlineLogs();
      }
    }

  }, [activeTab]);

  const ACTIVITY_COLUMNS = [

    { header: "Prod", field: "prod" },
    { header: "Device", field: "device" },
    { header: "Date/Time", field: "dateTime" },
    { header: "User/Admin", field: "userAdmin" },
    { header: "Duration", field: "duration" },
    { header: "Executable", field: "executable" },
    { header: "Location", field: "location" },
    { header: "URL", field: "url" },
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
        <IoTv size={24} />
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
    duration: (
      <div>
        <span>---</span>
      </div>
    ),
    executable: <div>{item.browser_type || "Unknown Browser"}</div>,
    location: <div>{item.location}</div>,
    url: <div className="skyblue-clr">---</div>,
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
  const handleDataBetweenFromAndToDates = () => {
    if (validateDates()) {
      if (userRole === "director") {
        if (activeTab === "employees") {
          getDirectorDownlineLoginLogsList(fromDate, toDate)
        } else if (activeTab === "admins") {
          console.log("Integrated Soon")
        }
      } else if (activeTab === "employees") {
        getEmployeeAllLogs(fromDate, toDate);
      } else if (activeTab === "directors") {
        getDownlineLogs(fromDate, toDate);
      } else if (activeTab === "admins") {
        getDownlineLogs(fromDate, toDate);
      }
    }
  }
  return (
    <div>
      <h6 className="saffron-clr mt-2 mb-3">Activity Logs</h6>

      {/* Tabs for filtering logs */}
      <div className="d-flex mb-3">
        <button
          className={`tab-btn  ${activeTab === "employees" ? "active" : ""}`}
          onClick={() => handleTabClick("employees", 0)}
        >
          Employees
        </button>
        <button
          className={`tab-btn ${activeTab === "admins" ? "active" : ""}`}
          onClick={() => handleTabClick("admins", 2)}
        >
          Admins
        </button>
        {userRole !== "director" ? <button
          className={`tab-btn ${activeTab === "directors" ? "active" : ""}`}
          onClick={() => handleTabClick("directors", 1)}
        >
          Directors
        </button> : null}

      </div>

      <div className="d-flex w-30 flex-between mt-2">
        <div className="col flex-column">
          <label className="black-text4 small-font mb-1">From</label>
          <input
            className="input-css2 small-font"
            value={fromDate}
            type="date"
            onChange={(e) => setFromDate(e.target.value)}
          />
          {errors.fromDate && <p className="text-danger small-font">{errors.fromDate}</p>}
        </div>

        <div className="col flex-column mx-2">
          <label className="black-text4 small-font mb-1">To</label>
          <input
            className="input-css2 small-font"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            type="date"
          />
          {errors.toDate && <p className="text-danger small-font">{errors.toDate}</p>}
        </div>

        <button
          className="align-self-end saffron-btn2 small-font pointer col-4"
          onClick={handleDataBetweenFromAndToDates}
        >
          Submit
        </button>
      </div>

      {/* Table */}
      <div className="mt-4">
        <Table
          columns={ACTIVITY_COLUMNS}
          data={ACTIVITY_DATA}
          itemsPerPage={4}
        />
      </div>
    </div>
  );
};

export default ActivityLogs;

// Tab button styles (add to your CSS file)
