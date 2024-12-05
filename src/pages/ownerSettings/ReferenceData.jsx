import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import Table from "../../components/Table";
import { SlPencil } from "react-icons/sl";
import { FaRegTrashCan } from "react-icons/fa6";
import AddNewPopUp from "./AddNewPopUp";

const ReferenceData = () => {
  const [activeBtn, setActiveBtn] = useState("Rejection Reasons");
  const ACTIVE_BTNS = ["Rejection Reasons", "Security Questions"];
  const [addNewModalRejection, setAddNewModalRejection] = useState(false);
  const [addNewModalSecurity, setAddNewModalSecurity] = useState(false);
  const handleSportClick = (item) => {
    setActiveBtn(activeBtn === item ? null : item);
  };

  const SECURITY_COLUMNS = [
    { header: "Questions", field: "questions", width: "80%" },
    { header: "Status", field: "status", width: "10%" },
    { header: "Action", field: "action", width: "10%" },
  ];

  const SECURITY_DATA = [
    {
      questions: <div>What is your name?</div>,

      status: <div className="green-btn w-fill">Active</div>,

      action: (
        <div className="large-font d-flex w-50 flex-between">
          <span>
            <SlPencil size={18} />
          </span>
          <span className="ms-2">
            <FaRegTrashCan size={18} />
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
    {
      questions: <div>What is your name?</div>,

      status: <div className="green-btn w-fill">Active</div>,

      action: (
        <div className="large-font d-flex w-50 flex-between">
          <span>
            <SlPencil size={18} />
          </span>
          <span className="ms-2">
            <FaRegTrashCan size={18} />
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
    {
      questions: <div>What is your name?</div>,

      status: <div className="green-btn w-fill">Active</div>,

      action: (
        <div className="large-font d-flex w-50 flex-between">
          <span>
            <SlPencil size={18} />
          </span>
          <span className="ms-2">
            <FaRegTrashCan size={18} />
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
    {
      questions: <div>What is your name?</div>,

      status: <div className="green-btn w-fill">Active</div>,

      action: (
        <div className="large-font d-flex w-50 flex-between">
          <span>
            <SlPencil size={18} />
          </span>
          <span className="ms-2">
            <FaRegTrashCan size={18} />
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
    { header: "Reason", field: "reason", width: "15%" },
    { header: "Discriptions", field: "discriptions", width: "55%" },
    { header: "Status", field: "status", width: "10%" },
    { header: "Action", field: "action", width: "10%" },
  ];
  const REJECTION_DATA = [
    {
      reason: <div>Insufficient Balance</div>,

      discriptions: (
        <div>
          It means that a customer’s account lacks the necessary funds to cover
          a withdrawal, purchase, or payment. For example, if someone tries to{" "}
          <br />
          withdraw cash from an ATM
        </div>
      ),

      status: (
        <div>
          <div className="green-btn w-fill">Active</div>
        </div>
      ),

      action: (
        <div className="large-font d-flex w-50 flex-between">
          <span>
            <SlPencil size={18} />
          </span>
          <span className="ms-2">
            <FaRegTrashCan size={18} />
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
          It means that a customer’s account lacks the necessary funds to cover
          a withdrawal, purchase, or payment. For example, if someone tries to{" "}
          <br />
          withdraw cash from an ATM
        </div>
      ),

      status: (
        <div>
          <div className="green-btn w-fill">Active</div>
        </div>
      ),

      action: (
        <div className="large-font d-flex w-50 flex-between">
          <span>
            <SlPencil size={18} />
          </span>
          <span className="ms-2">
            <FaRegTrashCan size={18} />
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
          It means that a customer’s account lacks the necessary funds to cover
          a withdrawal, purchase, or payment. For example, if someone tries to{" "}
          <br />
          withdraw cash from an ATM
        </div>
      ),

      status: (
        <div>
          <div className="green-btn w-fill">Active</div>
        </div>
      ),

      action: (
        <div className="large-font d-flex w-50 flex-between">
          <span>
            <SlPencil size={18} />
          </span>
          <span className="ms-2">
            <FaRegTrashCan size={18} />
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
          It means that a customer’s account lacks the necessary funds to cover
          a withdrawal, purchase, or payment. For example, if someone tries to{" "}
          <br />
          withdraw cash from an ATM
        </div>
      ),

      status: (
        <div>
          <div className="green-btn w-fill">Active</div>
        </div>
      ),

      action: (
        <div className="large-font d-flex w-50 flex-between">
          <span>
            <SlPencil size={18} />
          </span>
          <span className="ms-2">
            <FaRegTrashCan size={18} />
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
          It means that a customer’s account lacks the necessary funds to cover
          a withdrawal, purchase, or payment. For example, if someone tries to{" "}
          <br />
          withdraw cash from an ATM
        </div>
      ),

      status: (
        <div>
          <div className="w-50  green-btn">Active</div>
        </div>
      ),

      action: (
        <div className="large-font d-flex w-50 flex-between">
          <span>
            <SlPencil size={18} />
          </span>
          <span className="ms-2">
            <FaRegTrashCan size={18} />
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
      <h6 className="yellow-font mt-2 mb-3">Reference Data</h6>
      <div className="d-flex col small-font">
        {ACTIVE_BTNS?.map((item, index) => (
          <div
            key={index}
            className={`me-3 ${
              activeBtn === item
                ? "saffron-btn2 px-4"
                : "white-btn2 pointer px-4"
            }`}
            onClick={() => handleSportClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
      <hr className="my-3" />
      <div className="d-flex w-100 flex-between">
        <div className="col-7 fw-600 ">
          {activeBtn === "Rejection Reasons"
            ? "Rejection Reasons"
            : "Security Questions"}
        </div>
        {activeBtn === "Rejection Reasons" ? (
          <div className="col-5 d-flex flex-between">
            <div className="col-5 ">
              <select className="input-css2 col-12  small-font">
                <option>All</option>
              </select>
            </div>
            <div className="saffron-btn2 small-font pointer  col-3 mx-2">
              Submit
            </div>
            <div
              className="bg-white small-font pointer  col-3 p-2 blue-font grey-border rounded flex-center "
              onClick={() => setAddNewModalRejection(true)}
            >
              <IoAddOutline className="large-font" /> Add new
            </div>
          </div>
        ) : (
          <div className="col-5 d-flex flex-between">
            <div className="col-5 ">
              <select className="input-css2 col-12 mt-4 small-font">
                <option>All</option>
              </select>
            </div>
            <div className="saffron-btn2 small-font pointer mt-4 col-3">
              Submit
            </div>
            <div
              className="bg-white small-font pointer mt-4 col-3 p-2 blue-font grey-border rounded flex-center"
              onClick={() => setAddNewModalSecurity(true)}
            >
              <IoAddOutline className="large-font" /> Add new
            </div>
          </div>
        )}
      </div>
      <div className="mt-3">
        {activeBtn === "Rejection Reasons" ? (
          <Table
            columns={REJECTION_COLUMNS}
            data={REJECTION_DATA}
            itemsPerPage={4}
          />
        ) : (
          <Table
            columns={SECURITY_COLUMNS}
            data={SECURITY_DATA}
            itemsPerPage={4}
          />
        )}
      </div>
      <AddNewPopUp
        setAddNewModalRejection={setAddNewModalRejection}
        addNewModalRejection={addNewModalRejection}
        setAddNewModalSecurity={setAddNewModalSecurity}
        addNewModalSecurity={addNewModalSecurity}
      />
    </div>
  );
};

export default ReferenceData;
