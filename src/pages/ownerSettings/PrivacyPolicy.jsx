import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import Table from "../../components/Table";
import { FaRegTrashCan } from "react-icons/fa6";
import { SlPencil } from "react-icons/sl";
import AddPrivacyPolicyPopUp from "./AddPrivacyPolicyPopUp";
import PrivacyPopUp from "./PrivacyPopUp";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";
import ConfirmationPopup from "../popups/ConfirmationPopup";

const PrivacyPolicy = () => {
  const [addEditPrivacyModal, setAddEditPrivacyModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [privicyDeleteModal, setPrivicyDeleteModal] = useState(null);
  const [addPrivacyTitleModal, setAddPrivacyTitleModal] = useState(null);
  const [addPrivacyButtonTitleModal, setAddPrivacyButtonTitleModal] =
    useState(null);

  const handleAddNew = () => {
    setAddPrivacyTitleModal("Add Privacy Policy");
    setAddPrivacyButtonTitleModal("Create");
    setAddEditPrivacyModal(true);
  };

  const handleEdit = () => {
    setAddPrivacyTitleModal("Edit Privacy Policy");
    setAddPrivacyButtonTitleModal("Edit");
    setAddEditPrivacyModal(true);
  };

  const selectOptions = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  const REJECTION_COLUMNS = [
    { header: "Country", field: "country", width: "20%" },
    { header: "Policy Details", field: "policyDetails", width: "30%" },
    { header: "Showing Website", field: "showingWebsite", width: "30%" },
    { header: "Status", field: "status", width: "10%" },
    { header: "Action", field: "action", width: "30%" },
  ];
  const REJECTION_DATA = [
    {
      country: <div>India</div>,

      policyDetails: (
        <div
          className="saffron-btn2 w-20 pointer"
          onClick={() => setShowPrivacyModal(true)}
        >
          View
        </div>
      ),

      showingWebsite: (
        <div>
          we2Call.com <br />
          www.ravana.com <br />
          txchange.com
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
          <FaRegTrashCan size={18} className="pointer" onClick={() => setPrivicyDeleteModal(true)} />
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
      country: <div>India</div>,

      policyDetails: (
        <div
          className="saffron-btn2 w-20 pointer"
          onClick={() => setShowPrivacyModal(true)}
        >
          View
        </div>
      ),

      showingWebsite: (
        <div>
          we2Call.com <br />
          www.ravana.com <br />
          txchange.com
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

      resultDateTime: (
        <div>
          02-10-2024
          <br />
          10:34:00
        </div>
      ),
    },
    {
      country: <div>India</div>,

      policyDetails: (
        <div
          className="saffron-btn2 w-20 pointer"
          onClick={() => setShowPrivacyModal(true)}
        >
          View
        </div>
      ),

      showingWebsite: (
        <div>
          we2Call.com <br />
          www.ravana.com <br />
          txchange.com
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

      resultDateTime: (
        <div>
          02-10-2024
          <br />
          10:34:00
        </div>
      ),
    },
    {
      country: <div>India</div>,

      policyDetails: (
        <div
          className="saffron-btn2 w-20 pointer"
          onClick={() => setShowPrivacyModal(true)}
        >
          View
        </div>
      ),

      showingWebsite: (
        <div>
          we2Call.com <br />
          www.ravana.com <br />
          txchange.com
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

      resultDateTime: (
        <div>
          02-10-2024
          <br />
          10:34:00
        </div>
      ),
    },
    {
      country: <div>India</div>,

      policyDetails: (
        <div
          className="saffron-btn2 w-20 pointer"
          onClick={() => setShowPrivacyModal(true)}
        >
          View
        </div>
      ),

      showingWebsite: (
        <div>
          we2Call.com <br />
          www.ravana.com <br />
          txchange.com
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

      resultDateTime: (
        <div>
          02-10-2024
          <br />
          10:34:00
        </div>
      ),
    },
    {
      country: <div>India</div>,

      policyDetails: (
        <div
          className="saffron-btn2 w-20 pointer"
          onClick={() => setShowPrivacyModal(true)}
        >
          View
        </div>
      ),

      showingWebsite: (
        <div>
          we2Call.com <br />
          www.ravana.com <br />
          txchange.com
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
      <div className="w-100 d-flex flex-between align-items-center mb-3 mt-2">
        <h6 className="yellow-font mb-0">Privacy Policy</h6>
        <div className="col-5 col-lg-4 d-flex align-items-center gap-2">
          <Select
            className="small-font w-100"
            options={selectOptions}
            placeholder="Select"
            styles={customStyles}
            maxMenuHeight={120}
            menuPlacement="auto"
            classNamePrefix="custom-react-select"
          />
          <div className="w-50 saffron-btn2 small-font pointer">Submit</div>
          <button
            className="col-1 flex-center align-items-center small-font pointer blue-font input-pill rounded w-25 py-2"
            onClick={handleAddNew}
          >
            <IoAddOutline className="medium-font" />
            <span className="small-font">Add new</span>
          </button>
        </div>
      </div>

      <Table
        columns={REJECTION_COLUMNS}
        data={REJECTION_DATA}
        itemsPerPage={5}
      />

      <AddPrivacyPolicyPopUp
        addPrivacyModal={addEditPrivacyModal}
        setAddPrivacyModal={setAddEditPrivacyModal}
        addPrivacyTitleModal={addPrivacyTitleModal}
        addPrivacyButtonTitleModal={addPrivacyButtonTitleModal}
      />
      <PrivacyPopUp
        setShowPrivacyModal={setShowPrivacyModal}
        showPrivacyModal={showPrivacyModal}
      />

      <ConfirmationPopup
        confirmationPopupOpen={privicyDeleteModal}
        setConfirmationPopupOpen={() => setPrivicyDeleteModal(false)}
        discription={"are you sure you want to delete this Privicy Policy"}
        submitButton={"Delete"}
      />
    </div>
  );
};

export default PrivacyPolicy;
