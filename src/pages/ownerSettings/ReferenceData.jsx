import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import Table from "../../components/Table";
import { SlPencil } from "react-icons/sl";
import { FaRegTrashCan } from "react-icons/fa6";
import AddNewPopUp from "./AddNewPopUp";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";
import ConfirmationPopup from "../popups/ConfirmationPopup";

const ReferenceData = () => {
  const [activeBtn, setActiveBtn] = useState("Rejection Reasons");
  const ACTIVE_BTNS = ["Rejection Reasons", "Security Questions"];
  const [addNewModalRejection, setAddNewModalRejection] = useState(false);
  const [addNewModalSecurity, setAddNewModalSecurity] = useState(false);
  const [promotionDeleteModal, setPromotionDeleteModal] = useState(false);
  const [deleteSecurityQuationModal, setDeleteSecurityQuationModal] =
    useState(false);
  const [rejectionTitleModel, setRejectionTitleModel] = useState(null);
  const [securityTitleModel, setSecurityTitleModel] = useState(null);
  const [editTitleButtonModel, setEditTitleButtonModel] = useState(null);

  const handleSportClick = (item) => {
    setActiveBtn(item);
  };

  const handleAddNew = () => {
    setEditTitleButtonModel("Create")
    if (activeBtn === "Rejection Reasons") {
      setAddNewModalRejection(true);
      setRejectionTitleModel("Add Rejection Reason");
    } else {
      setAddNewModalSecurity(true);
      setSecurityTitleModel("Add Security Quations");
    }
  };

  const handleEdit = () => {
    setEditTitleButtonModel("Edit")
    if (activeBtn === "Rejection Reasons") {
      setAddNewModalRejection(true);
      setRejectionTitleModel("Edit Rejection Reason");
    } else {
      setAddNewModalSecurity(true);
      setSecurityTitleModel("Edit Security Quations");
    }
  };

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

  const SECURITY_DATA = [
    {
      questions: <div>What is your name?</div>,
      status: <div className="green-btn w-fill">Active</div>,
      action: (
        <div className="d-flex gap-3">
          <SlPencil className="pointer" size={18} onClick={handleEdit} />
          <FaRegTrashCan
            className="pointer"
            size={18}
            onClick={() => setDeleteSecurityQuationModal(true)}
          />
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
        <div className="d-flex gap-3">
          <SlPencil className="pointer" size={18} onClick={handleEdit} />
          <FaRegTrashCan
            className="pointer"
            size={18}
            onClick={() => setDeleteSecurityQuationModal(true)}
          />
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
        <div className="d-flex gap-3">
          <SlPencil className="pointer" size={18} onClick={handleEdit} />
          <FaRegTrashCan
            className="pointer"
            size={18}
            onClick={() => setDeleteSecurityQuationModal(true)}
          />
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
        <div className="d-flex gap-3">
          <SlPencil className="pointer" size={18} onClick={handleEdit} />
          <FaRegTrashCan
            className="pointer"
            size={18}
            onClick={() => setDeleteSecurityQuationModal(true)}
          />
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
        <div className="d-flex gap-3">
          <SlPencil size={18} className="pointer" onClick={handleEdit} />
          <FaRegTrashCan
            size={18}
            className="pointer"
            onClick={() => setPromotionDeleteModal(true)}
          />
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
        <div className="d-flex gap-3">
          <SlPencil size={18} />
          <FaRegTrashCan
            size={18}
            className="pointer"
            onClick={() => setPromotionDeleteModal(true)}
          />
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
        <div className="d-flex gap-3">
          <SlPencil size={18} />
          <FaRegTrashCan
            size={18}
            className="pointer"
            onClick={() => setPromotionDeleteModal(true)}
          />
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
        <div className="d-flex gap-3">
          <SlPencil size={18} />
          <FaRegTrashCan
            size={18}
            className="pointer"
            onClick={() => setPromotionDeleteModal(true)}
          />
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
        <div className="d-flex gap-3">
          <SlPencil size={18} />
          <FaRegTrashCan
            size={18}
            className="pointer"
            onClick={() => setPromotionDeleteModal(true)}
          />
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
        <div className="d-flex gap-3">
          <SlPencil size={18} />
          <FaRegTrashCan
            size={18}
            className="pointer"
            onClick={() => setPromotionDeleteModal(true)}
          />
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
      <h6 className="yellow-font medium-font mt-2 mb-3">Reference Data</h6>
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
            onClick={handleAddNew}
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
        rejectionTitleModel={rejectionTitleModel}
        securityTitleModel={securityTitleModel}
        editTitleButtonModel={editTitleButtonModel}
      />

      <ConfirmationPopup
        confirmationPopupOpen={promotionDeleteModal}
        setConfirmationPopupOpen={() => setPromotionDeleteModal(false)}
        discription={"are you sure you want to delete this Promotion"}
        submitButton={"Delete"}
      />

      <ConfirmationPopup
        confirmationPopupOpen={deleteSecurityQuationModal}
        setConfirmationPopupOpen={() => setDeleteSecurityQuationModal(false)}
        discription={"are you sure you want to delete this Promotion"}
        submitButton={"Delete"}
      />
    </div>
  );
};

export default ReferenceData;
