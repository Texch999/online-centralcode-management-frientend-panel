import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";
import Table from "../../components/Table";

const RecentAccessIp = () => {
  const { userActivity } = useParams();
  const [activeRow, setActiveRow] = useState(null);

  const ACTIVITY_COLUMNS = [
    { header: "Prod", field: "prod", width: "10%" },
    { header: "First Date/Time", field: "firstDateTime", width: "20%" },
    { header: "Last Date/Time", field: "lastDateTime", width: "20%" },
    { header: "Duration", field: "duration", width: "20%" },
    { header: "Method", field: "method", width: "20%" },
    { header: "IP", field: "ip", width: "20%" },
    { header: "Configure", field: "configure", width: "10%" },
  ];

  const ACTIVITY_DATA = Array.from({ length: 5 }, (_, index) => ({
    prod: (
      <div>
        <FaCheckCircle className="green-font" size={24} />
      </div>
    ),
    firstDateTime: <div>10-10-2024 13:08:00</div>,
    lastDateTime: <div>11-10-2024 13:08:00</div>,
    duration: (
      <div>
        <span>10s</span>
      </div>
    ),
    method: <div>Web</div>,
    location: <div>Boulder, Colorado</div>,
    ip: <div>157.47.47.187</div>,
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

  return (
    <div>
      <div className="mt-2">
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="d-flex ">
            <h6>Activity Logs</h6>
            <FiChevronRight className="medium-font m-1" size={18} />
            <h6 className="saffron-clr">{userActivity}</h6>
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
