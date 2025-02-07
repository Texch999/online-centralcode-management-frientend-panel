
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import Select from "react-select";
import { customStyles } from "../../../components/ReactSelectStyles";
import { createWebsite, getWebsiteDetails, updateWebsite } from "../../../api/apiMethods";
import SuccessPopup from "../../popups/SuccessPopup";
import ErrorPopup from "../../popups/ErrorPopup";

const AddWebsitesPopup = ({ show, onHide, countries, getWebsitesCallback, editMode, websiteId, setEditMode, setWebsiteId }) => {
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
  const userId = localStorage.getItem("user_id")
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [errorPopupOpen, setErrorPopupOpen] = useState(false)
  const [displayMsg, setDisplayeMsg] = useState("")
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
    { value: 2, label: "White Label" },
  ];
  const [status, setStatus] = useState(null)
  const formattedCountries = countries?.map((country) => ({
    value: country.id,
    label: country.name
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
  }));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Select Change
  const handleSelectChange = (field, selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: selectedOption,
    }));
  };

  useEffect(() => {
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
              websiteURL: data?.web_url || "",
              created_by: data?.created_by || null,
            });
            setStatus(data?.status)
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
        created_by: null
      });
    }
  }, [editMode, websiteId]);

  // Manual Validation Function
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
    if (!formData.ref_type) {
      newErrors.ref_type = "Reference Type is required.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    } else if (formData.city.length < 4 || formData.city.length > 45) {
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
    } else if (
      !/^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/.test(formData.websiteURL)
    ) {
      newErrors.websiteURL = "Invalid website URL, Please Enter Valid Website Url Format";
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
  };

  const handleClose = () => {
    resetData();
    onHide();
    setWebsiteId(null)
    setErrors({});
  };

  const handleSubmit = () => {
    setApiError("")
    if (validateForm()) {
      const finalData = editMode ? {
        deploy_type: formData?.deployType?.value,
        panel_type: formData?.panelType?.value,
        web_name: formData?.websiteName,
        web_url: formData?.websiteURL,
        location_id: formData?.location?.value,
        prefix: "TXE",
        city: formData?.city,
        status: status,
        created_by: formData.created_by,
        ref_type: formData.ref_type?.value

      } : {
        deploy_type: formData?.deployType?.value,
        panel_type: formData?.panelType?.value,
        web_name: formData?.websiteName,
        web_url: formData?.websiteURL,
        location_id: formData?.location?.value,
        prefix: "TXE",
        city: formData?.city,
        created_by: userId,
        ref_type: formData.ref_type?.value
      }
      console.log(finalData, "==========>finalData")
      const apiCall = editMode === true ? updateWebsite(websiteId, finalData) : createWebsite(finalData)
      apiCall
        .then((response) => {
          if (response?.status === true) {
            getWebsitesCallback()
            setErrors({});
            setDisplayeMsg(response?.message)
            setApiError("")
            setEditMode(false)
            onHide();
            setSuccessPopupOpen(true);
            setTimeout(() => {
              resetData()
              setWebsiteId(null)
              setSuccessPopupOpen(false);
            }, 2000);
          } else {
            setApiError("Something Went Wrong");
          }
        })
        .catch((error) => {
          setApiError(error?.message || "API request failed");
          setErrorPopupOpen(true)
          setDisplayeMsg(error?.message)
          setTimeout(() => {
            setErrorPopupOpen(false)
          }, 2000);

        });
    }
  };

  return (
    <div>
      <Modal centered show={show} onHide={handleClose} size="md">
        <Modal.Body>
          {/* Header Section */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="medium-font fw-600">Add Website</h5>
            <MdOutlineClose size={22} onClick={handleClose} className="pointer" />
          </div>

          {/* Form Section */}
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

            {/* Location Dropdown */}
            <div className="col-4">
              <label className="small-font mb-1">Reference Type</label>
              <Select
                className="small-font"
                options={refTypesOptions}
                placeholder="Select"
                styles={customStyles}
                value={formData.ref_type}
                onChange={(option) => handleSelectChange("ref_type", option)}
              />

              {errors.refTypes && <p className="text-danger small-font">{errors.refTypes}</p>}
            </div>
            <div className="col-4">
              <label className="small-font mb-1">Location</label>
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
              {errors.websiteName && <p className="text-danger small-font">{errors.websiteName}</p>}
            </div>
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
            </div>
          </div>

          {/* Text Inputs */}
          {/* <div className="row">
          </div> */}
          <div className="mt-3 d-flex flex-row w-100 justify-content-end">
            <button className="saffron-btn small-font rounded col-4" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </Modal.Body>
      </Modal>
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