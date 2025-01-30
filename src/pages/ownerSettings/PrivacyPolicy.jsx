import React, { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import Table from "../../components/Table";
import { FaRegTrashCan } from "react-icons/fa6";
import { SlPencil } from "react-icons/sl";
import AddPrivacyPolicyPopUp from "./AddPrivacyPolicyPopUp";
import PrivacyPopUp from "./PrivacyPopUp";
import Select from "react-select";
import { customStyles } from "../../components/ReactSelectStyles";
import "../add-team/style.css";
import {
  getCountries,
  getPrivacyPolicy,
  getPrivacyPolicyById,
} from "../../api/apiMethods";

const PrivacyPolicy = () => {
  const [addPrivacyModal, setAddPrivacyModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [privacyList, setPrivacyList] = useState([]);
  const [privacyListById, setPrivacyListById] = useState([]);
  const [error, setError] = useState("");

  const [isEditModal, setIsEditModal] = useState("");
  const handleEditPrivacyModal = () => {
    setIsEditModal(false);
    setShowPrivacyModal(true);
  };
  const handleAddPrivacyModal = () => {
    setAddPrivacyModal(true);
  };

  const selectOptions = [
    { value: "1", label: "Active" },
    { value: "2", label: "In-Active" },
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
          onClick={() => {
            setIsEditModal(true);
            setShowPrivacyModal(true);
          }}
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
          <span onClick={handleEditPrivacyModal}>
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

  const getPolicyPrivacyData = () => {
    getPrivacyPolicy()
      .then((response) => {
        console.log("getPrivacyPolicy success", response);
        setPrivacyList(response.data);
      })
      .catch((error) => {
        setError(error?.message);
        console.log("getPrivacyPolicy error", error);
      });
  };
  useEffect(() => {
    getPolicyPrivacyData();
  }, []);

  const getPolicyProvacyDataById = () => {
    getPrivacyPolicyById()
      .then((response) => {
        console.log("getPrivacyPolicy success", response);
        setPrivacyListById(response.data);
      })
      .catch((error) => {
        setError(error?.message);
        console.log("getPrivacyPolicy error", error);
      });
  };
  useEffect(() => {
    getPolicyProvacyDataById();
  }, []);

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
            onClick={handleAddPrivacyModal}
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
        setAddPrivacyModal={setAddPrivacyModal}
        addPrivacyModal={addPrivacyModal}
        isEditModal={isEditModal}
        setIsEditModal={setIsEditModal}
        getPolicyPrivacyData={getPolicyPrivacyData}
        
      />
      <PrivacyPopUp
        setShowPrivacyModal={setShowPrivacyModal}
        showPrivacyModal={showPrivacyModal}
      />
    </div>
  );
};

export default PrivacyPolicy;
