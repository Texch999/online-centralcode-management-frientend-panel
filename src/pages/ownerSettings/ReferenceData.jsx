import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import Table from "../../components/Table";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LiaPenSolid } from "react-icons/lia";
import { FaRegTrashCan } from "react-icons/fa6";

const ReferenceData = () => {
  const [activeBtn, setActiveBtn] = useState("Rejection Reasons");
  const ACTIVE_BTNS = ["Rejection Reasons", "Security Questions"];
  const handleSportClick = (item) => {
    setActiveBtn(activeBtn === item ? null : item);
  };

  const SECURITY_COLUMNS = [
    { header: "Questions", field: "questions" },
    { header: "Status", field: "status" },
    { header: "Action", field: "action" },
  ];

  const SECURITY_DATA = [
    {
      questions: <div>What is your name?</div>,

      status: <div className="active-btn w-50">Active</div>,

      action: (
        <div className="large-font">
          <span>
            <LiaPenSolid />
          </span>
          <span className="ms-2">
            <FaRegTrashCan />
          </span>
        </div>
      ),

      resultDateTime: (
        <div>
          02-10-2024
          <br />
          10:34:00
        </div>
      ),
    },
   
  
  ];

  const REJECTION_COLUMNS = [
    { header: "Reason", field: "reason" },
    { header: "Discriptions", field: "discriptions" },
    { header: "Status", field: "status" },
    { header: "Action", field: "action" },
  ];
  const REJECTION_DATA = [
    {
      reason: <div>Insufficient Balance</div>,

      discriptions: (
        <div>
          It means that a customer’s account lacks the necessary funds to cover{" "}
          <br />a withdrawal, purchase, or payment. For example, if someone
          tries to <br />
          withdraw cash from an ATM
        </div>
      ),

      status: <div className="active-btn">Active</div>,

      action: (
        <div className="large-font">
          <span>
            <LiaPenSolid />
          </span>
          <span className="ms-2">
            <FaRegTrashCan />
          </span>
        </div>
      ),
      tableNumber: <div className="green-font">T ID: 12345678943323</div>,
      resultDateTime: (
        <div>
          02-10-2024
          <br />
          10:34:00
        </div>
      ),
    },
    {
      reason: <div>Insufficient Balance</div>,

      discriptions: (
        <div>
          It means that a customer’s account lacks the necessary funds to cover{" "}
          <br />a withdrawal, purchase, or payment. For example, if someone
          tries to <br />
          withdraw cash from an ATM
        </div>
      ),

      status: <div className="active-btn">Active</div>,

      action: (
        <div className="large-font">
          <span>
            <LiaPenSolid />
          </span>
          <span className="ms-2">
            <FaRegTrashCan />
          </span>
        </div>
      ),
      tableNumber: <div className="green-font">T ID: 12345678943323</div>,
      resultDateTime: (
        <div>
          02-10-2024
          <br />
          10:34:00
        </div>
      ),
    },
    {
      reason: <div>Insufficient Balance</div>,

      discriptions: (
        <div>
          It means that a customer’s account lacks the necessary funds to cover{" "}
          <br />a withdrawal, purchase, or payment. For example, if someone
          tries to <br />
          withdraw cash from an ATM
        </div>
      ),

      status: <div className="active-btn">Active</div>,

      action: (
        <div className="large-font">
          <span>
            <LiaPenSolid />
          </span>
          <span className="ms-2">
            <FaRegTrashCan />
          </span>
        </div>
      ),
      tableNumber: <div className="green-font">T ID: 12345678943323</div>,
      resultDateTime: (
        <div>
          02-10-2024
          <br />
          10:34:00
        </div>
      ),
    },
    {
      reason: <div>Insufficient Balance</div>,

      discriptions: (
        <div>
          It means that a customer’s account lacks the necessary funds to cover{" "}
          <br />a withdrawal, purchase, or payment. For example, if someone
          tries to <br />
          withdraw cash from an ATM
        </div>
      ),

      status: <div className="active-btn">Active</div>,

      action: (
        <div className="large-font">
          <span>
            <LiaPenSolid />
          </span>
          <span className="ms-2">
            <FaRegTrashCan />
          </span>
        </div>
      ),
      tableNumber: <div className="green-font">T ID: 12345678943323</div>,
      resultDateTime: (
        <div>
          02-10-2024
          <br />
          10:34:00
        </div>
      ),
    },
    {
      reason: <div>Insufficient Balance</div>,

      discriptions: (
        <div>
          It means that a customer’s account lacks the necessary funds to cover{" "}
          <br />a withdrawal, purchase, or payment. For example, if someone
          tries to <br />
          withdraw cash from an ATM
        </div>
      ),

      status: <div className="active-btn">Active</div>,

      action: (
        <div className="large-font">
          <span>
            <LiaPenSolid />
          </span>
          <span className="ms-2">
            <FaRegTrashCan />
          </span>
        </div>
      ),
      tableNumber: <div className="green-font">T ID: 12345678943323</div>,
      resultDateTime: (
        <div>
          02-10-2024
          <br />
          10:34:00
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between w-100">
        <h6 className="yellow-font">Reference Data</h6>
      </div>
      <div className="d-flex col-3 flex-between small-font">
        {ACTIVE_BTNS?.map((item, index) => (
          <div
            key={index}
            className={`me-3 ${
              activeBtn === item
                ? "saffron-btn2 pointer px-4"
                : "white-btn2 pointer px-4"
            }`}
            onClick={() => handleSportClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="grey-border w-100 mt-4"></div>
      <div className="d-flex w-100 flex-between">
        <div className="col-7 ">{activeBtn==='Rejection Reasons'? "Rejection Reasons" : "Security Questions"}</div>
        <div className="col-2 ">
          <select className="input-css2 col-12 mt-4 small-font">
            <option>All</option>
          </select>
        </div>
        <div className="saffron-btn2 small-font pointer mt-4 col-1">Submit</div>
        <div className="bg-white small-font pointer mt-4 col-1 p-2 blue-font grey-border rounded flex-center">
          <IoAddOutline className="large-font" /> Add new
        </div>
      </div>
      <div className="white-bg login-box-shadow p-1 mt-4 rounded">
        {activeBtn === "Rejection Reasons" ? (
          <Table
            columns={REJECTION_COLUMNS}
            data={REJECTION_DATA}
            itemsPerPage={3}
          />
        ) : (
          <Table
            columns={SECURITY_COLUMNS}
            data={SECURITY_DATA}
            itemsPerPage={3}
          />
        )}
      </div>
    </div>
  );
};

export default ReferenceData;
