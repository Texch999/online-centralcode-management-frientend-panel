import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { FaRegCalendarMinus } from "react-icons/fa";
import Table from "../../components/Table";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { IoTv } from "react-icons/io5";

const ActivityLogs = () => {
  const datePickerRef = useRef(null);
  const navigation = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [startDate2, setStartDate2] = useState(new Date());

  const handleIconClick = () => {
    datePickerRef?.current?.setFocus();
  };

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
        <div >
         <FaCheckCircle className="green-font" size={24}/>
        </div>
      ),
      device: <div><IoTv  size={24}/></div>,
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
          <span >10s</span>
         
        </div>
      ),
      executable: <div >Google Crome</div>,
      location: (
        <div>
         Boulder, Colorado
        </div>
      ),
      url: (
        <div className="skyblue-clr">
          https://www.madmin.we2call.com/
        </div>
      ),
      ip: (
        <div>
          157.47.47.187
        </div>
      ),
      iplogin: (
        <div>
          4
        </div>
      ),
      show: (
        <div className="saffron-btn2 w-100">
        view
        </div>
      ),
    },
    {
      prod: (
        <div >
         <FaCheckCircle className="green-font" size={24}/>
        </div>
      ),
      device: <div><IoTv  size={24}/></div>,
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
          <span >10s</span>
         
        </div>
      ),
      executable: <div >Google Crome</div>,
      location: (
        <div>
         Boulder, Colorado
        </div>
      ),
      url: (
        <div className="skyblue-clr">
          https://www.madmin.we2call.com/
        </div>
      ),
      ip: (
        <div>
          157.47.47.187
        </div>
      ),
      iplogin: (
        <div>
          4
        </div>
      ),
      show: (
        <div className="saffron-btn2 w-100">
        view
        </div>
      ),
    },
    {
      prod: (
        <div >
         <FaCheckCircle className="green-font" size={24}/>
        </div>
      ),
      device: <div><IoTv  size={24}/></div>,
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
          <span >10s</span>
         
        </div>
      ),
      executable: <div >Google Crome</div>,
      location: (
        <div>
         Boulder, Colorado
        </div>
      ),
      url: (
        <div className="skyblue-clr">
          https://www.madmin.we2call.com/
        </div>
      ),
      ip: (
        <div>
          157.47.47.187
        </div>
      ),
      iplogin: (
        <div>
          4
        </div>
      ),
      show: (
        <div className="saffron-btn2 w-100">
        view
        </div>
      ),
    },
    {
      prod: (
        <div >
         <FaCheckCircle className="green-font" size={24}/>
        </div>
      ),
      device: <div><IoTv  size={24}/></div>,
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
          <span >10s</span>
         
        </div>
      ),
      executable: <div >Google Crome</div>,
      location: (
        <div>
         Boulder, Colorado
        </div>
      ),
      url: (
        <div className="skyblue-clr">
          https://www.madmin.we2call.com/
        </div>
      ),
      ip: (
        <div>
          157.47.47.187
        </div>
      ),
      iplogin: (
        <div>
          4
        </div>
      ),
      show: (
        <div className="saffron-btn2 w-100">
        view
        </div>
      ),
    },
    {
      prod: (
        <div >
         <FaCheckCircle className="green-font" size={24}/>
        </div>
      ),
      device: <div><IoTv  size={24}/></div>,
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
          <span >10s</span>
         
        </div>
      ),
      executable: <div >Google Crome</div>,
      location: (
        <div>
         Boulder, Colorado
        </div>
      ),
      url: (
        <div className="skyblue-clr">
          https://www.madmin.we2call.com/
        </div>
      ),
      ip: (
        <div>
          157.47.47.187
        </div>
      ),
      iplogin: (
        <div>
          4
        </div>
      ),
      show: (
        <div className="saffron-btn2 w-100">
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
        <div className="col-4">
          <span className="small-font">From</span>
          <div className="w-90 grey-border p-1 d-flex flex-between input-css2">
            <DatePicker
              ref={datePickerRef}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="all-none w-70 small-font"
            />
            <FaRegCalendarMinus onClick={handleIconClick} className="pointer" />
          </div>
        </div>

        <div className="col-4">
          <span className="small-font">To</span>
          <div className="w-90 grey-border p-1 d-flex flex-between input-css2">
            <DatePicker
              ref={datePickerRef}
              selected={startDate2}
              onChange={(date) => setStartDate2(date)}
              className="all-none w-70 small-font"
            />
            <FaRegCalendarMinus onClick={handleIconClick} className="pointer" />
          </div>
        </div>

        <div className="saffron-btn2 small-font pointer mt-4 col-4">Submit</div>
      </div>
      <div className="white-bg login-box-shadow p-1 mt-4 rounded">
        <Table columns={ACTIVITY_COLUMNS} data={ACTIVITY_DATA} itemsPerPage={3} />
      </div>
    </div>
  );
};

export default ActivityLogs;
