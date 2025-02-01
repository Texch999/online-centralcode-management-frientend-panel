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
  getWebsites,
} from "../../api/apiMethods";
import EditPrivacyPolicy from "./EditPrivacyPolicy";
import { CircleLoader } from "react-spinners";
import { CgWebsite } from "react-icons/cg";
import SelectWebsitePopUp from "./SelectWebsitePopUp";
import ActiveInActiveModal from "../popups/ActiveInActiveModal";

const PrivacyPolicy = () => {
  const [addPrivacyModal, setAddPrivacyModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [privacyList, setPrivacyList] = useState([]);
  const [privacyListById, setPrivacyListById] = useState([]);
  const [error, setError] = useState("");
  const [countries, setCountries] = useState([]);
  const [showPrivacyText, setShowPrivacyText] = useState("");
  const [privacyPolicyId, setPrivacyPolicyId] = useState(null);
  const [websites, setWebsites] = useState([]);
  const [editPrivacyPolicyModal, setEditPrivacyPolicyModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectWebsite, setSelectWebsite] = useState(false);
  console.log(privacyPolicyId, "privacyPolicyId");
  const [activeInActivePopup, setActiveInActivePopup] = useState(false);
  const [statusId, setStatusId] = useState(null);
  const [privacyStatusId, setPrivacyStatusId] = useState("");
  console.log(privacyStatusId, "privacyStatusId");
  console.log(statusId, "statusId");

  const [isEditModal, setIsEditModal] = useState("");
  const handleEditPrivacyModal = (id) => {
    setPrivacyPolicyId(id);
    setEditPrivacyPolicyModal(true);
  };
  const handleAddPrivacyModal = () => {
    setAddPrivacyModal(true);
  };

  const handleStatus = (id, status) => {
    setActiveInActivePopup(true);
    setPrivacyStatusId(id);
    setStatusId(status);
  };

  const selectOptions = [
    { value: "1", label: "Active" },
    { value: "2", label: "In-Active" },
  ];

  const getAllCountries = () => {
    getCountries()
      .then((response) => {
        console.log("Countries", response);
        setCountries(response.data);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };
  useEffect(() => {
    getAllCountries();
  }, []);

  const getAllWebsites = () => {
    getWebsites()
      .then((response) => {
        console.log("Websites", response.data);
        setWebsites(response.data);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };
  useEffect(() => {
    getAllWebsites();
  }, []);

  const hanldeWebsites = () => {
    setSelectWebsite(true);
  };

  const REJECTION_COLUMNS = [
    { header: "Country", field: "country", width: "20%" },
    { header: "Policy Details", field: "policyDetails", width: "30%" },
    { header: "Showing Website", field: "showingWebsite", width: "30%" },
    { header: "Status", field: "status", width: "10%" },
    { header: "Action", field: "action", width: "30%" },
  ];

  const REJECTION_DATA = privacyList.map((item, index) => {
    const country = countries.find((country) => country?.id === item?.country_id);

    return {
      country: <div>{country ? country?.name : 'unknown'}</div>,
      policyDetails: (
        <div
          className="saffron-btn2 w-20 pointer"
          onClick={() => {
            setIsEditModal(true);
            setShowPrivacyModal(true);
            setShowPrivacyText(item?.description);
          }}
        >
          View
        </div>
      ),
      showingWebsite: <div>{item?.website_name}</div>,
      status: (
        <div
          className={`${
            item?.is_active === 1 ? "green-btn" : "red-btn"
          }  w-fill`}
        >
          {item?.is_active === 1 ? "Active" : "In-Active"}
        </div>
      ),
      action: (
        <div className="large-font d-flex w-50 flex-between">
          <span className="mx-2" onClick={hanldeWebsites}>
            <CgWebsite size={20} />
          </span>
          <span onClick={() => handleEditPrivacyModal(item?.id)}>
            <SlPencil size={20} />
          </span>
          <span
            className="ms-2"
            onClick={() => handleStatus(item?.id, item?.is_active)}
          >
            <FaRegTrashCan size={20} />
          </span>
        </div>
      ),
    };
  });
  // [
  //   {
  //     country: <div>India</div>,

  //     policyDetails: (
  //       <div
  //         className="saffron-btn2 w-20 pointer"
  //         onClick={() => {
  //           setIsEditModal(true);
  //           setShowPrivacyModal(true);
  //         }}
  //       >
  //         View
  //       </div>
  //     ),

  //     showingWebsite: (
  //       <div>
  //         we2Call.com <br />
  //         www.ravana.com <br />
  //         txchange.com
  //       </div>
  //     ),
  //     status: (
  //       <div>
  //         <div className="green-btn w-fill">Active</div>
  //       </div>
  //     ),

  //     action: (
  //       <div className="large-font d-flex w-50 flex-between">
  //         <span onClick={handleEditPrivacyModal}>
  //           <SlPencil size={18} />
  //         </span>
  //         <span className="ms-2">
  //           <FaRegTrashCan size={18} />
  //         </span>
  //       </div>
  //     ),

  //     resultDateTime: (
  //       <div>
  //         02-10-2024
  //         <br />
  //         10:34:00
  //       </div>
  //     ),
  //   },
  //   {
  //     country: <div>India</div>,

  //     policyDetails: (
  //       <div
  //         className="saffron-btn2 w-20 pointer"
  //         onClick={() => setShowPrivacyModal(true)}
  //       >
  //         View
  //       </div>
  //     ),

  //     showingWebsite: (
  //       <div>
  //         we2Call.com <br />
  //         www.ravana.com <br />
  //         txchange.com
  //       </div>
  //     ),
  //     status: (
  //       <div>
  //         <div className="green-btn w-fill">Active</div>
  //       </div>
  //     ),

  //     action: (
  //       <div className="large-font d-flex w-50 flex-between">
  //         <span>
  //           <SlPencil size={18} />
  //         </span>
  //         <span className="ms-2">
  //           <FaRegTrashCan size={18} />
  //         </span>
  //       </div>
  //     ),

  //     resultDateTime: (
  //       <div>
  //         02-10-2024
  //         <br />
  //         10:34:00
  //       </div>
  //     ),
  //   },
  // ];

  const getPolicyPrivacyData = () => {
    setLoading(true);
    getPrivacyPolicy()
      .then((response) => {
        console.log("getPrivacyPolicy success", response);
        setPrivacyList(response.data);
      })
      .catch((error) => {
        setError(error?.message);
        console.log("getPrivacyPolicy error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getPolicyPrivacyData();
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
      <div>
        {loading ? (
          <div className="d-flex flex-column flex-center mt-10rem align-items-center">
            <CircleLoader color="#3498db" size={40} />
            <div className="medium-font black-font my-3">
              Just a moment...............⏳
            </div>
          </div>
        ) : (
          <Table
            columns={REJECTION_COLUMNS}
            data={REJECTION_DATA}
            itemsPerPage={5}
          />
        )}
      </div>

      <AddPrivacyPolicyPopUp
        setAddPrivacyModal={setAddPrivacyModal}
        addPrivacyModal={addPrivacyModal}
        isEditModal={isEditModal}
        setIsEditModal={setIsEditModal}
        getPolicyPrivacyData={getPolicyPrivacyData}
        setCountries={setCountries}
        countries={countries}
        websites={websites}
        setWebsites={setWebsites}
      />
      <PrivacyPopUp
        setShowPrivacyModal={setShowPrivacyModal}
        showPrivacyModal={showPrivacyModal}
        setShowPrivacyText={setShowPrivacyText}
        showPrivacyText={showPrivacyText}
      />
      <EditPrivacyPolicy
        setEditPrivacyPolicyModal={setEditPrivacyPolicyModal}
        editPrivacyPolicyModal={editPrivacyPolicyModal}
        setPrivacyPolicyId={setPrivacyPolicyId}
        privacyPolicyId={privacyPolicyId}
        getPolicyPrivacyData={getPolicyPrivacyData}
        setShowPrivacyText={setShowPrivacyText}
        showPrivacyText={showPrivacyText}
      />
      <SelectWebsitePopUp
        setSelectWebsite={setSelectWebsite}
        selectWebsite={selectWebsite}
      />
      <ActiveInActiveModal
        privacyStatusId={privacyStatusId}
        setPrivacyStatusId={setPrivacyStatusId}
        statusId={statusId}
        setStatusId={setStatusId}
        getPolicyPrivacyData={getPolicyPrivacyData}
        setActiveInActivePopup={setActiveInActivePopup}
        activeInActivePopup={activeInActivePopup}
        discription={`Are you sure want to ${
          statusId === 1 ? "In-Active" : "Active"
        }  Privacy Policy`}
        submitButton={statusId === 1 ? "In-Active" : "Active"}
      />
    </div>
  );
};

export default PrivacyPolicy;
