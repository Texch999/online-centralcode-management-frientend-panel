import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import Select from "react-select";
import { customStyles } from "../../../components/ReactSelectStyles";
import { createWebsite, getWebsiteDetails, updateWebsite } from "../../../api/apiMethods";
import SuccessPopup from "../../popups/SuccessPopup";
import ErrorPopup from "../../popups/ErrorPopup";
import { useSearchParams } from "react-router-dom";

const AddWebsitesPopup = ({ show, onHide,
  countries, getWebsitesCallback, editMode,
  websiteId, setEditMode, setWebsiteId }) => {
  const [formData, setFormData] = useState({
    deployType: null,
    panelType: null,
    location: null,
    created_by: null,
    city: "",
    websiteName: "",
    websiteURL: "",
    ref_type: null
  });
  const isInitialRendering = useRef(true)
  const itemsPerPage = 9
  const userId = localStorage.getItem("user_id");
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const [currentPage, setCurrentPage] = useState(page);
  const [errors, setErrors] = useState({
    deployType: "",
    panelType: "",
    location: "",
    city: "",
    websiteName: "",
    websiteURL: "",
    ref_type: "",
    websiteNameExists: "",
    websiteURLExists: "",
  });
  const [apiError, setApiError] = useState("");
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [displayMsg, setDisplayeMsg] = useState("");

  const PanelOptions = [
    { value: 1, label: "Admin Panel" },
    { value: 2, label: "User Panel" },
  ];
  const refTypesOptions = [
    { value: 1, label: "Ravana Admin" },
    { value: 2, label: "Brahma Admin" },
  ];
  const DeployOptions = [
    { value: 1, label: "Company" },
  ];
  const [status, setStatus] = useState(null);
  const formattedCountries = countries?.map((country) => ({
    value: country.id,
    label: country.name
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
  }));


  const handleChange = (e) => {
    const { name, value } = e.target;

    // Filter out numbers and special characters for the city field
    if (name === "city") {
      const filteredValue = value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters and spaces
      setFormData((prevData) => ({
        ...prevData,
        [name]: filteredValue, // Update the form data with the filtered value
      }));

      // Validate the city field
      validateField(name, filteredValue);
      return; // Stop further execution for the city field
    }

    // For other fields, update the form data as usual
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate the field dynamically
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case "city":
        if (!value.trim()) {
          newErrors.city = "City is required.";
        } else if (value.length < 3 || value.length > 45) {
          newErrors.city = "City must be between 3 and 45 characters.";
        } else if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
          newErrors.city = "City can only contain letters, numbers, and spaces.";
        } else {
          delete newErrors.city; // Clear the error if validation passes
        }
        break;

      case "websiteName":
        if (!value.trim()) {
          newErrors.websiteName = "Website Name is required.";
        } else if (value.length < 2 || value.length > 100) {
          newErrors.websiteName = "Website Name must be between 2 and 100 characters.";
        } else if (/^[a-zA-Z0-9._]+$/.test(value)) {
          newErrors.websiteName = "Website Name can only contain letters, numbers, dots, and underscores.";
        } else {
          delete newErrors.websiteName; // Clear the error if validation passes
        }
        break;

      case "websiteURL":
        if (!value.trim()) {
          newErrors.websiteURL = "Website URL is required.";
        } else {
          const urlPattern = /^(?!https?:\/\/|www\.)[\w.-]+\.\w{2,}$/i;
          if (!urlPattern.test(value)) {
            newErrors.websiteURL = "Invalid website URL. Please not include http://, https://, www or spl char";
          } else {
            delete newErrors.websiteURL; // Clear the error if validation passes
          }
        }
        break;

      default:
        break;
    }

    // Update the errors state
    setErrors(newErrors);
  };
  const handleSelectChange = (field, selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: selectedOption,
    }));
  };
  useEffect(() => {
    if (isInitialRendering.current) {
      isInitialRendering.current = false
      return
    }
    if (editMode && websiteId) {
      getWebsiteDetails(websiteId)
        .then((response) => {
          if (response?.status === true) {
            const data = response?.data;
            setFormData({
              deployType: DeployOptions.find((opt) => opt.value === data?.deploy_type) || null,
              panelType: PanelOptions.find((opt) => opt.value === data?.panel_type) || null,
              location: formattedCountries.find((opt) => opt.value === data?.location_id) || null,
              city: data?.city || "",
              websiteName: data?.web_name || "",
              websiteURL: data?.web_url.replace(/^https?:\/\//i, "") || "",
              created_by: data?.created_by || null,
              ref_type: refTypesOptions.find((opt) => opt.value === data?.ref_type) || null,
            });
            setStatus(data?.status);
            setApiError("");
          } else {
            setApiError("Something Went Wrong");
          }
        })
        .catch((error) => {
          setApiError(error?.message || "API request failed");
        });
    } else {
      setFormData({
        deployType: null,
        panelType: null,
        location: null,
        city: "",
        websiteName: "",
        websiteURL: "",
        created_by: null,
        ref_type: null
      });
    }
  }, [editMode, websiteId]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.deployType) {
      newErrors.deployType = "Deploy Type is required.";
    }

    if (!formData.panelType) {
      newErrors.panelType = "Panel Type is required.";
    }

    if (!formData.location) {
      newErrors.location = "Location is required.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    } else if (formData.city.length < 3 || formData.city.length > 45) {
      newErrors.city = "City must be between 4 and 45 characters.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.city)) {
      newErrors.city = "City can only contain letters.";
    }

    if (!formData.websiteName.trim()) {
      newErrors.websiteName = "Website Name is required.";
    } else if (formData.websiteName.length < 2 || formData.websiteName.length > 100) {
      newErrors.websiteName = "Website Name must be between 2 and 100 characters.";
    } else if (!/^[a-zA-Z0-9-]+$/.test(formData.websiteName)) {
      newErrors.websiteName = "Website Name can only contain letters, numbers, and hyphens.";
    }

    if (!formData.websiteURL.trim()) {
      newErrors.websiteURL = "Website URL is required.";
    } else {
      const urlPattern = /^(?!https?:\/\/|www\.)[\w.-]+\.\w{2,}$/i;
      if (!urlPattern.test(formData.websiteURL.replace(/^https?:\/\//i, ""))) {
        newErrors.websiteURL = "Invalid website URL. Please include http:// or https://.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetData = () => {
    setFormData({
      deployType: null,
      panelType: null,
      location: null,
      created_by: null,
      city: "",
      websiteName: "",
      websiteURL: "",
    });
    setErrors({
      deployType: "",
      panelType: "",
      location: "",
      city: "",
      websiteName: "",
      websiteURL: "",
      ref_type: "",
      websiteNameExists: "",
      websiteURLExists: "",
    });
    setApiError("");
  };

  const handleClose = () => {
    resetData();
    onHide();
    setWebsiteId(null);
    setErrors({});
  };

  const handleSubmit = () => {
    const limit = itemsPerPage;
    const offset = (page - 1) * itemsPerPage;
    setApiError(""); // Clear previous API errors
    if (validateForm()) {
      const finalData = editMode ? {
        deploy_type: formData?.deployType?.value,
        panel_type: formData?.panelType?.value,
        web_name: formData?.websiteName,
        web_url: formData?.websiteURL.replace(/^https?:\/\//i, ""),
        location_id: formData?.location?.value,
        prefix: "TXE",
        city: formData?.city,
        status: status,
        created_by: formData.created_by,
      } : {
        deploy_type: formData?.deployType?.value,
        panel_type: formData?.panelType?.value,
        web_name: formData?.websiteName,
        web_url: formData?.websiteURL,
        location_id: formData?.location?.value,
        prefix: "TXE",
        city: formData?.city,
        created_by: userId,
      };

      const apiCall = editMode === true ? updateWebsite(websiteId, finalData) : createWebsite(finalData);
      apiCall
        .then((response) => {
          if (response?.status === true) {
            getWebsitesCallback(limit, offset);
            setErrors({});
            setDisplayeMsg(response?.message);
            setApiError("");
            setEditMode(false);
            onHide();
            setSuccessPopupOpen(true);
            setTimeout(() => {
              resetData();
              setWebsiteId(null);
              setSuccessPopupOpen(false);
            }, 2000);
          } else {
            setApiError("Something Went Wrong");
          }
        })
        .catch((error) => {
          const errorMessage = error?.message
          // Handle backend validation errors
          if (errorMessage.includes("Website name already exists.")) {
            setErrors((prevErrors) => ({ ...prevErrors, websiteNameExists: "This website already taken" }));
          } else if (errorMessage.includes("Website Url already exists")) {
            setErrors((prevErrors) => ({ ...prevErrors, websiteURLExists: "This website url already taken" }));
          }
          else if (errorMessage.includes("API Error, please try again.")) {
            setApiError("Please Try Again ");
          } else {
            setApiError("Please Try Again ");
          }

        });
    }
  };

  return (
    <div>
      <Modal centered show={show} onHide={handleClose} size="md">
        <Modal.Body>
          {/* API Error Display */}
          {apiError && (
            <div className="alert alert-danger small-font mb-3">
              {apiError}
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="medium-font fw-600">{editMode ? "Update" : "Add"} Website</h5>
            <MdOutlineClose size={22} onClick={handleClose} className="pointer" />
          </div>

          <div className="row mb-3">
            {/* Deploy Type Dropdown */}
            <div className="col-4">
              <label className="small-font mb-1">Deploy Type</label>
              <Select
                className="small-font"
                options={DeployOptions}
                placeholder="Select"
                styles={customStyles}
                value={formData.deployType}
                onChange={(option) => handleSelectChange("deployType", option)}
              />
              {errors.deployType && <p className="text-danger small-font">{errors.deployType}</p>}
            </div>

            {/* Panel Type Dropdown */}
            <div className="col-4">
              <label className="small-font mb-1">Panel Type</label>
              <Select
                className="small-font"
                options={PanelOptions}
                placeholder="Select"
                styles={customStyles}
                value={formData.panelType}
                onChange={(option) => handleSelectChange("panelType", option)}
              />
              {errors.panelType && <p className="text-danger small-font">{errors.panelType}</p>}
            </div>

            {/* Reference Type Dropdown */}
            {/* <div className="col-4">
              <label className="small-font mb-1">Reference Type</label>
              <Select
                className="small-font"
                options={refTypesOptions}
                placeholder="Select"
                styles={customStyles}
                value={formData.ref_type}
                onChange={(option) => handleSelectChange("ref_type", option)}
              />
              {errors.ref_type && <p className="text-danger small-font">{errors.ref_type}</p>}
            </div> */}

            {/* Location Dropdown */}
            <div className="col-4">
              <label className="small-font mb-1">Country</label>
              <Select
                className="small-font"
                options={formattedCountries}
                placeholder="Select"
                styles={customStyles}
                value={formData.location}
                onChange={(option) => handleSelectChange("location", option)}
              />
              {errors.location && <p className="text-danger small-font">{errors.location}</p>}
            </div>

            {/* City Input */}
            <div className="col-4">
              <label className="small-font mb-1">City</label>
              <input
                type="text"
                name="city"
                className="w-100 small-font rounded input-css all-none"
                placeholder="Enter"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && <p className="text-danger small-font">{errors.city}</p>}
            </div>

            {/* Website Name Input */}
            <div className="col-4">
              <label className="small-font mb-1">Website Name</label>
              <input
                type="text"
                name="websiteName"
                className="w-100 small-font rounded input-css all-none"
                placeholder="Enter"
                value={formData.websiteName}
                onChange={handleChange}
              />
              {console.log(errors.websiteName, "===>websiteName")}
              {errors.websiteName && <p className="text-danger small-font">{errors.websiteName}</p>}
              {errors.websiteNameExists && <p className="text-danger small-font">{errors.websiteNameExists}</p>}
            </div>

            {/* Website URL Input */}
            <div className="col-4">
              <label className="small-font mb-1">Website URL</label>
              <input
                type="text"
                name="websiteURL"
                className="w-100 small-font rounded input-css all-none"
                placeholder="Enter"
                value={formData.websiteURL}
                onChange={handleChange}
              />
              {errors.websiteURL && <p className="text-danger small-font">{errors.websiteURL}</p>}
              {errors.websiteURLExists && <p className="text-danger small-font">{errors.websiteURLExists}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-3 d-flex flex-row w-100 justify-content-end">
            <button className="saffron-btn small-font rounded col-4" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Success and Error Popups */}
      <SuccessPopup
        successPopupOpen={successPopupOpen}
        setSuccessPopupOpen={setSuccessPopupOpen}
        discription={displayMsg}
      />
      <ErrorPopup
        errorPopupOpen={errorPopupOpen}
        setErrorPopupOpen={setErrorPopupOpen}
        discription={displayMsg}
      />
    </div>
  );
};

export default AddWebsitesPopup;