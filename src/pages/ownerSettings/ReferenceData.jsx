import React, { useCallback, useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import Table from "../../components/Table";
import { SlPencil } from "react-icons/sl";
import { FaRegTrashCan } from "react-icons/fa6";
import AddNewPopUp from "./AddNewPopUp";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";
import { getAllSecurityQuestions } from "../../api/apiMethods";
import ConfirmationPopup from "../popups/ConfirmationPopup";
import { ClipLoader, PacmanLoader } from "react-spinners";

const ReferenceData = () => {
  const [activeBtn, setActiveBtn] = useState("Rejection Reasons");
  const ACTIVE_BTNS = ["Rejection Reasons", "Security Questions"];
  const [addNewModalRejection, setAddNewModalRejection] = useState(false);
  const [addNewModalSecurity, setAddNewModalSecurity] = useState(false);
  const [error, setError] = useState("");
  const [securityQuestions, setSecurityQuestions] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSecurityQuestion, setSelectedSecurityQuestion] =
    useState(null);

  const [selectedQnsId, setSelectedSecQnsId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSportClick = (item) => {
    setActiveBtn(item);
  };

  const getSecurityQuestions = () => {
    setLoading(true);
    getAllSecurityQuestions()
      .then((response) => {
        console.log(response, "get sec qns");
        setSecurityQuestions(response?.data);
      })
      .catch((error) => {
        setError(error.message);
        console.log(error, "get sec qns erorr occur");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getSecurityQuestions();
  }, []);

  console.log(securityQuestions, "securityQuestions");

  const selectOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  const SECURITY_COLUMNS = [
    { header: "Questions", field: "questions", width: "80%" },
    { header: "Status", field: "status", width: "10%" },
    { header: "Action", field: "action", width: "10%" },
  ];

  const SECURITY_DATA = securityQuestions.map((item, index) => ({
    questions: <div>{item?.questions}</div>,
    status:
      item?.status === 1 ? (
        <div className="green-btn w-fill">Active</div>
      ) : (
        <div className="red-btn w-fill">In-Active</div>
      ),
    action: (
      <div className="large-font d-flex w-50 flex-between">
        <span
          onClick={() => {
            setSelectedSecurityQuestion(item);
            setSelectedSecQnsId(item?.id);
            setAddNewModalSecurity(true);
          }}
        >
          <SlPencil size={18} />
        </span>
        <span className="ms-2" onClick={() => setShowDeleteModal(true)}>
          <FaRegTrashCan size={18} />
        </span>
      </div>
    ),
    resultDateTime: (
      <div>
        {item?.created_date}
        <br />
        {item?.updated_date}
      </div>
    ),
  }));
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
    <div className="">
      <h6 className="yellow-font mt-2 mb-3">Reference Data</h6>
      <div className="d-flex col small-font">
        {ACTIVE_BTNS?.map((item, index) => (
          <div
            key={index}
            className={`me-3 ${
              activeBtn === item ? "saffron-btn2" : "white-btn2 pointer"
            }`}
            onClick={() => handleSportClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
      <hr className="my-3" />

      <div className="d-flex align-items-center justify-content-between">
        {/* Title Section */}
        <div className="col-7 fw-600">
          {activeBtn === "Rejection Reasons"
            ? "Rejection Reasons"
            : "Security Questions"}
        </div>

        {/* Action Section */}
        <div className="col-5 d-flex justify-content-between align-items-center">
          {/* Select Dropdown */}
          <div className="col-5">
            <Select
              className="small-font"
              options={selectOptions}
              placeholder="Select"
              styles={customStyles}
              maxMenuHeight={120}
              menuPlacement="auto"
              classNamePrefix="custom-react-select"
            />
          </div>

          {/* Submit Button */}
          <div className="saffron-btn2 small-font pointer col-3 mx-2">
            Submit
          </div>

          {/* Add New Button */}
          <div
            className="bg-white small-font pointer col-3 p-2 blue-font grey-border rounded d-flex justify-content-center align-items-center"
            onClick={() =>
              activeBtn === "Rejection Reasons"
                ? setAddNewModalRejection(true)
                : setAddNewModalSecurity(true)
            }
          >
            <IoAddOutline className="large-font" /> Add new
          </div>
        </div>
      </div>

      <div className="mt-3">
        {activeBtn === "Rejection Reasons" ? (
          <Table
            columns={REJECTION_COLUMNS}
            data={REJECTION_DATA}
            itemsPerPage={4}
          />
        ) : loading ? (
          <div className="d-flex flex-center mt-10 align-items-center">
            <PacmanLoader color="#3498db" size={25} />
          </div>
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
        getSecurityQuestions={getSecurityQuestions}
        setSelectedSecurityQuestion={setSelectedSecurityQuestion}
        selectedSecurityQuestion={selectedSecurityQuestion}
        selectedQnsId={selectedQnsId}
        setSelectedSecQnsId={setSelectedSecQnsId}
      />
      {/* <ConfirmationPopup
        confirmationPopupOpen={showDeleteModal}
        setConfirmationPopupOpen={setShowDeleteModal}
        discription={"Are You Sure to Delete this Match"}
        submitButton={"Delete"}
      /> */}
    </div>
  );
};

export default ReferenceData;
