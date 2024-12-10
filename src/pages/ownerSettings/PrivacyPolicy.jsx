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

const PrivacyPolicy = () => {
  const [addPrivacyModal, setAddPrivacyModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

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
      <div className="d-flex w-100 flex-between mb-3 mt-2">
        <h6 className="yellow-font mb-0">Privacy Policy</h6>
        <div className="col-5 d-flex flex-between">
          <div className="col-5 ">
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
          <div className="saffron-btn2 small-font pointer  col-3 mx-2">
            Submit
          </div>
          <div
            className="bg-white small-font pointer col-3 p-2 blue-font grey-border rounded flex-center "
            onClick={() => setAddPrivacyModal(true)}
          >
            <IoAddOutline className="large-font" size={18} />{" "}
            <span className="ms-2">Add new</span>
          </div>
        </div>
      </div>

      <Table
        columns={REJECTION_COLUMNS}
        data={REJECTION_DATA}
        itemsPerPage={5}
      />

      <AddPrivacyPolicyPopUp
        setAddPrivacyModal={setAddPrivacyModal}
        addPrivacyModal={addPrivacyModal}
      />
      <PrivacyPopUp
        setShowPrivacyModal={setShowPrivacyModal}
        showPrivacyModal={showPrivacyModal}
      />
    </div>
  );
};

export default PrivacyPolicy;
