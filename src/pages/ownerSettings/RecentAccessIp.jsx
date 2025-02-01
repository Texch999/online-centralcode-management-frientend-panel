
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";
import Table from "../../components/Table";
import { getDirectorLoginLogsById, getLoggedInLogsById } from "../../api/apiMethods";

const RecentAccessIp = () => {
  const [activeRow, setActiveRow] = useState(null);
  const { userId, userActivity } = useParams();
  const location = useLocation();
  const { activeTab } = location.state || {};
  const decodedUserId = decodeURIComponent(userId);
  const decodedUserActivity = decodeURIComponent(userActivity);
  const ACTIVITY_COLUMNS = [
    { header: "Prod", field: "prod", width: "10%" },
    { header: "First Date/Time", field: "firstDateTime", width: "20%" },
    { header: "Last Date/Time", field: "lastDateTime", width: "20%" },
    { header: "Duration", field: "duration", width: "20%" },
    { header: "Method", field: "method", width: "20%" },
    { header: "IP", field: "ip", width: "20%" },
    { header: "Configure", field: "configure", width: "10%" },
  ];
  const [logData, setLogsData] = useState([])
  const [error, setError] = useState("")
  const getAllLogsById = () => {
    getLoggedInLogsById({
      id: decodedUserId,
      limit: 10,
      offset: 0,
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
  }
  const getDirectorLogsById = () => {
    getDirectorLoginLogsById({
      id: decodedUserId,
      limit: 10,
      offset: 0,
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
    duration: (
      <div>
        <span>10s</span>
      </div>
    ),
    method: <div>{item.browser_type || "Unknown Browser"}</div>,
    location: <div>{item.location}</div>,
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
    if (activeTab === "employees") {
      getAllLogsById()
    } else {
      getDirectorLogsById()
    }
  }, [])
  return (
    <div>
      <div className="mt-2">
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="d-flex ">
            <h6>Activity Logs</h6>
            <FiChevronRight className="medium-font m-1" size={18} />
            <h6 className="saffron-clr">{decodedUserActivity}</h6>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Table
          columns={ACTIVITY_COLUMNS}
          data={ACTIVITY_DATA}
          itemsPerPage={5}
        />
      </div>
    </div>
  );
};

export default RecentAccessIp;
