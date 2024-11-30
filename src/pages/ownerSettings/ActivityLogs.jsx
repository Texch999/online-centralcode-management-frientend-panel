import React from "react";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { IoTv } from "react-icons/io5";
import { FaCircleQuestion, FaMobileButton } from "react-icons/fa6";

const ActivityLogs = () => {
  const navigation = useNavigate();

  const handleMatchClick = (userActivity) => {
    navigation(`/userActivity/${encodeURIComponent(userActivity)}`);
  };

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
  const ACTIVITY_DATA = [
    {
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
          11-10-2024 <br />
          13:08:00
        </div>
      ),

      userAdmin: (
        <div>
          Jayanta <br />
          Super Admin
        </div>
      ),

      duration: (
        <div>
          <span>10s</span>
        </div>
      ),
      executable: <div>Google Crome</div>,
      location: <div>Boulder, Colorado</div>,
      url: <div className="skyblue-clr">https://www.madmin.we2call.com/</div>,
      ip: <div>157.47.47.187</div>,
      iplogin: <div className="w-50 flex-center">4</div>,
      show: (
        <div
          className="saffron-btn2 w-100 pointer"
          onClick={() => handleMatchClick("Jayanta (11-10-2024,13:08:00)")}
        >
          view
        </div>
      ),
    },
    {
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
          11-10-2024 <br />
          13:08:00
        </div>
      ),

      userAdmin: (
        <div
          onClick={() => handleMatchClick("Jayanta (11-10-2024,13:08:00)")}
          className="pointer"
        >
          Jayanta <br />
          Super Admin
        </div>
      ),

      duration: (
        <div>
          <span>10s</span>
        </div>
      ),
      executable: <div>Google Crome</div>,
      location: <div>Boulder, Colorado</div>,
      url: <div className="skyblue-clr">https://www.madmin.we2call.com/</div>,
      ip: <div>157.47.47.187</div>,
      iplogin: <div className="w-50 flex-center">4</div>,
      show: (
        <div
          className="saffron-btn2 w-100 pointer"
          onClick={() => handleMatchClick("Jayanta (11-10-2024,13:08:00)")}
        >
          view
        </div>
      ),
    },
    {
      prod: (
        <div>
          <FaCircleQuestion className="grey-clr2" size={24} />
        </div>
      ),
      device: (
        <div>
          <FaMobileButton size={24} />
        </div>
      ),
      dateTime: (
        <div>
          11-10-2024 <br />
          13:08:00
        </div>
      ),

      userAdmin: (
        <div
          onClick={() => handleMatchClick("Jayanta (11-10-2024,13:08:00)")}
          className="pointer"
        >
          Jayanta <br />
          Super Admin
        </div>
      ),

      duration: (
        <div>
          <span>10s</span>
        </div>
      ),
      executable: <div>Google Crome</div>,
      location: <div>Boulder, Colorado</div>,
      url: <div className="skyblue-clr">https://www.madmin.we2call.com/</div>,
      ip: <div>157.47.47.187</div>,
      iplogin: <div className="w-50 flex-center">4</div>,
      show: (
        <div
          className="saffron-btn2 w-100 pointer"
          onClick={() => handleMatchClick("Jayanta (11-10-2024,13:08:00)")}
        >
          view
        </div>
      ),
    },
    {
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
          11-10-2024 <br />
          13:08:00
        </div>
      ),

      userAdmin: (
        <div
          onClick={() => handleMatchClick("Jayanta (11-10-2024,13:08:00)")}
          className="pointer"
        >
          Jayanta <br />
          Super Admin
        </div>
      ),

      duration: (
        <div>
          <span>10s</span>
        </div>
      ),
      executable: <div>Google Crome</div>,
      location: <div>Boulder, Colorado</div>,
      url: <div className="skyblue-clr">https://www.madmin.we2call.com/</div>,
      ip: <div>157.47.47.187</div>,
      iplogin: <div className="w-50 flex-center">4</div>,
      show: (
        <div
          className="saffron-btn2 w-100 pointer"
          onClick={() => handleMatchClick("Jayanta (11-10-2024,13:08:00)")}
        >
          view
        </div>
      ),
    },
    {
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
          11-10-2024 <br />
          13:08:00
        </div>
      ),

      userAdmin: (
        <div
          onClick={() => handleMatchClick("Jayanta (11-10-2024,13:08:00)")}
          className="pointer"
        >
          Jayanta <br />
          Super Admin
        </div>
      ),

      duration: (
        <div>
          <span>10s</span>
        </div>
      ),
      executable: <div>Google Crome</div>,
      location: <div>Boulder, Colorado</div>,
      url: <div className="skyblue-clr">https://www.madmin.we2call.com/</div>,
      ip: <div>157.47.47.187</div>,
      iplogin: <div className="w-50 flex-center">4</div>,
      show: (
        <div
          className="saffron-btn2 w-100 pointer"
          onClick={() => handleMatchClick("Jayanta (11-10-2024,13:08:00)")}
        >
          view
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between w-100">
        <h6 className="saffron-clr">Activity Logs</h6>
      </div>

      <div className="d-flex w-30 flex-between mt-2">
        <div className="col flex-column mx-2">
          <label className="black-text4 small-font mb-1">From</label>
          <input className="input-css2 small-font" type="date" />
        </div>
        <div className="col flex-column mx-2">
          <label className="black-text4 small-font mb-1">To</label>
          <input className="input-css2 small-font" type="date" />
        </div>

        <div className="saffron-btn2 small-font pointer mt-4 col-4">Submit</div>
      </div>
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
