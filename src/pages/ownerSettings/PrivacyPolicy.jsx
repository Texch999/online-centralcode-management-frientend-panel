import React, { useCallback, useEffect, useRef, useState } from "react";
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
  getWebsites,
} from "../../api/apiMethods";
import EditPrivacyPolicy from "./EditPrivacyPolicy";
import { CircleLoader } from "react-spinners";
import { CgWebsite } from "react-icons/cg";
import SelectWebsitePopUp from "./SelectWebsitePopUp";
import ActiveInActiveModal from "../popups/ActiveInActiveModal";
import ErrorPopup from "../popups/ErrorPopup";
import { useSearchParams } from "react-router-dom";

const PrivacyPolicy = () => {
  const [countries, setCountries] = useState([]);
  console.log(countries, "ggggg");
  const [addPrivacyModal, setAddPrivacyModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [privacyList, setPrivacyList] = useState([]);
  const [error, setError] = useState("");
  // const [countries, setCountries] = useState([]);
  const [showPrivacyText, setShowPrivacyText] = useState("");
  const [privacyPolicyId, setPrivacyPolicyId] = useState(null);
  const [websites, setWebsites] = useState([]);
  const [editPrivacyPolicyModal, setEditPrivacyPolicyModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectWebsite, setSelectWebsite] = useState(false);
  const [activeInActivePopup, setActiveInActivePopup] = useState(false);
  const [statusId, setStatusId] = useState(null);
  const [privacyStatusId, setPrivacyStatusId] = useState("");
  const [errorPopup, setErrorPopup] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isEditModal, setIsEditModal] = useState("");
  const [availablePrivacyWebsiteId, setAvailablePrivacyWebsiteId] =
    useState(null);
  const [countriesData, setCountriesData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const dataFetched = useRef(false);
  const intialpage = parseInt(searchParams.get("page") || 1);
  const [currentPage, setCurrentPage] = useState(intialpage);
  const [totalRecords, setTotalRecords] = useState(null);
  const role_code = localStorage.getItem("role_code");
  const itemsPerPage = 4;
  const page = intialpage;
  const pageSize = itemsPerPage;

  const handleEditPrivacyModal = (id) => {
    setPrivacyPolicyId(id);
    setEditPrivacyPolicyModal(true);
    setAvailablePrivacyWebsiteId(id);
  };
  const handleAddPrivacyModal = () => {
    setAddPrivacyModal(true);
    getAllWebsites();
  };

  const handlePageChange = () => {
    getPolicyPrivacyData(intialpage, pageSize);
  };

  const handleStatus = (id, status) => {
    setActiveInActivePopup(true);
    setPrivacyStatusId(id);
    setStatusId(status);
  };

  const countryOptions = [
    { value: 0, label: "All" },
    ...countries.map((item) => ({
      value: item?.id,
      label: item?.name,
    })),
  ];

  const websiteOptions = websites.map((item) => ({
    value: item?.id,
    label: item?.web_name,
  }));
  console.log(availablePrivacyWebsiteId, "gg");

  const hanldeWebsites = (id) => {
    setSelectWebsite(true);
    setAvailablePrivacyWebsiteId(id);
  };

  const getAllCountries = () => {
    getCountries()
      .then((response) => {
        // const updatedCountries = [{ id: 0, name: "All" }, ...response.data];
        setCountries(response?.data);
        setCountriesData(response?.data);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  const getAllWebsites = () => {
    if (websites.length > 0) return;
    getWebsites()
      .then((response) => {
        if (response?.status === true) {
          setWebsites(response.data);
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  const getPolicyPrivacyData = (page, pageSize) => {
    setLoading(true);
    getPrivacyPolicy({ page, pageSize })
      .then((response) => {
        if (response?.status === true) {
          setPrivacyList(response?.data);
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setError(error?.message);
        setErrorPopup(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (role_code === "management") {
      if (dataFetched.current) return;
      dataFetched.current = true;
      getPolicyPrivacyData(page, pageSize);
      getAllCountries();
    }
  }, []);

  const filteredData =
    selectedCountry && selectedCountry.value !== 0
      ? privacyList.filter((item) => item.country_id === selectedCountry.value)
      : privacyList;

  const REJECTION_COLUMNS = [
    { header: "Country", field: "country", width: "20%" },
    { header: "Policy Details", field: "policyDetails", width: "30%" },
    { header: "Showing Website", field: "showingWebsite", width: "30%" },
    { header: "Status", field: "status", width: "10%" },
    { header: "Action", field: "action", width: "30%" },
  ];

  const DATA = filteredData.map((item, index) => {
    const country = countries?.find(
      (country) => country.id === item.country_id
    );
    return {
      country: <div>{country?.name}</div>,
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
      showingWebsite: item?.websites?.map((item) => (
        <div className="d-flex flex-wrap">{item?.web_name}</div>
      )),
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
          {/* {item?.is_active === 2 ? (
            <span className="mx-3 pointer disabled">
              <CgWebsite size={20} />
            </span>
          ) : (
            <span
              className="mx-3 pointer"
              onClick={() => hanldeWebsites(item?.id)}
            >
              <CgWebsite size={20} />
            </span>
          )} */}
          {item?.is_active === 2 ? (
            <span title="this action is denied" className="disabled">
              <SlPencil size={20} />
            </span>
          ) : (
            <span
              onClick={() => handleEditPrivacyModal(item?.id)}
              className="pointer"
            >
              <SlPencil size={20} />
            </span>
          )}
          <span
            className="ms-2 pointer"
            onClick={() => handleStatus(item?.id, item?.is_active)}
          >
            <FaRegTrashCan size={20} />
          </span>
        </div>
      ),
    };
  });

  return (
    <div>
      <div className="w-100 d-flex flex-between align-items-center mb-3 mt-2">
        <div className="col-9 ">
          <h6 className="yellow-font mb-0">Privacy Policy</h6>
        </div>

        <div className="d-flex col-3 gap-1 flex-between">
          <div className="col-7 d-flex align-items-center gap-2">
            <Select
              className="small-font w-100"
              options={countryOptions}
              placeholder="Select"
              styles={customStyles}
              maxMenuHeight={120}
              menuPlacement="auto"
              classNamePrefix="custom-react-select"
              isSearchable={true} // Allow searching
              onInputChange={(inputValue, { action }) => {
                if (action === "input-change") {
                  const filteredValue = inputValue.replace(/[^A-Za-z\s]/g, ""); // Allow only letters and spaces
                  return filteredValue;
                }
              }}
              onChange={(selectedOption) => {
                setSelectedCountry(selectedOption);
              }}
            />
          </div>
          <button
            className="col-4 flex-center align-items-center small-font pointer blue-font input-pill rounded  py-2"
            onClick={handleAddPrivacyModal}
          >
            <IoAddOutline className="medium-font" />
            <span className="small-font">Add New</span>
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
            data={DATA}
            itemsPerPage={itemsPerPage}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      <AddPrivacyPolicyPopUp
        setAddPrivacyModal={setAddPrivacyModal}
        addPrivacyModal={addPrivacyModal}
        isEditModal={isEditModal}
        setIsEditModal={setIsEditModal}
        getPolicyPrivacyData={getPolicyPrivacyData}
        setCountriesData={setCountriesData}
        countriesData={countriesData}
        websites={websites}
        setWebsites={setWebsites}
        getAllWebsites={getAllWebsites}
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
        availablePrivacyWebsiteId={availablePrivacyWebsiteId}
        setAvailablePrivacyWebsiteId={setAvailablePrivacyWebsiteId}
        setSelectWebsite={setSelectWebsite}
        selectWebsite={selectWebsite}
      />
      <SelectWebsitePopUp
        setSelectWebsite={setSelectWebsite}
        selectWebsite={selectWebsite}
        setAvailablePrivacyWebsiteId={setAvailablePrivacyWebsiteId}
        availablePrivacyWebsiteId={availablePrivacyWebsiteId}
        getPolicyPrivacyData={getPolicyPrivacyData}
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
      <ErrorPopup
        discription={error}
        errorPopupOpen={errorPopup}
        setErrorPopupOpen={setErrorPopup}
      />
    </div>
  );
};

export default PrivacyPolicy;
