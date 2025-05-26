import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import "../../../App.css";
import { MdOutlineClose } from "react-icons/md";
import Select from "react-select";
import { customStyles } from "../../../components/ReactSelectStyles";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  createDirector,
  getAdminWebsites,
  getCountries,
  getDirectorDetailsById,
  getUserWebsites,
} from "../../../api/apiMethods";
import { adminRoles, Roles } from "../../../utils/enum";

function EditDirectorAdminPopup({
  showEditModal,
  handleEditModalClose,
  directorId,
}) {
  const role = localStorage.getItem("role_code");
  const [activeForm, setActiveForm] = useState(1);
  const [showManagementPassword, setShowManagementPassword] = useState(false);
  const [managementPassword, setManagementPassword] = useState("");
  const [roleId, setRoleId] = useState(null);
  const accountTypes = [
    { label: "Share", value: "share" },
    { label: "Rental", value: "rental" },
  ];
  const [accountType, setAccountType] = useState(null);
  const [error, setError] = useState();
  const [countryData, setCountryData] = useState();
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("");

  const handleCountryChange = (event) => {
    const selectedCode = event.target.value;
    const selectedCountry = countryData?.find(
      (country) => country.code === selectedCode
    );

    if (selectedCountry) {
      setSelectedCountry(selectedCode);
      setFormData({ ...formData, county: selectedCountry.id });
    } else {
      setSelectedCountry("");
      setFormData({ ...formData, county: "" });
    }
  };
  const handleRoleChange = (selectedOption) => {
    setSelectedRole(selectedOption);
    setFormData({ ...formData, role: selectedOption.value });
  };

  const [selectedAdminRoleIds, setSelectedAdminRoleIds] = useState([]);

  const GetAllCountries = () => {
    getCountries()
      .then((response) => {
        if (response?.status === true) {
          setCountryData(response?.data);
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setError(error?.message || "Not able to get Countries");
      });
  };
  useEffect(() => {
    GetAllCountries();
  }, []);
  const [adminWebsite, setAllAdminWebsite] = useState();
  const GetAllAdminWebsites = () => {
    getAdminWebsites()
      .then((response) => {
        if (response?.status === true) {
          setAllAdminWebsite(response.data);
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setError(error?.message || "Not able to get Countries");
      });
  };
  useEffect(() => {
    GetAllAdminWebsites();
  }, []);
  const [userWebsite, setAllUserWebsite] = useState();

  const GetAllUserWebsites = () => {
    getUserWebsites()
      .then((response) => {
        if (response?.status === true) {
          setAllUserWebsite(response.data);
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setError(error?.message || "Not able to get Countries");
      });
  };
  useEffect(() => {
    GetAllUserWebsites();
  }, []);

  const adminRoless = Object.entries(adminRoles).map(([value, label]) => ({
    value: Number(value),
    label,
  }));

  const handleAdminRoleChange = (selectedOption) => {
    const selectedId = selectedOption ? selectedOption.value : null;
    setSelectedAdminRoleIds(selectedId);
  };

  const adminRoleWebsites = adminWebsite?.map((site) => ({
    value: site.id,
    label: site.web_url,
  }));
  const userRoleWebsites = userWebsite?.map((site) => ({
    value: site.id,
    label: site.web_url,
  }));

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [checkedUrls, setCheckedUrls] = useState([]);

  const handleCheckboxChange = (event, id, url) => {
    if (event.target.checked) {
      setCheckedUrls((prevUrls) => [...prevUrls, url]);
      setSelectedUserId(id);
    } else {
      setCheckedUrls((prevUrls) =>
        prevUrls.filter((url) => url !== event.target.value)
      );
      setSelectedUserId(null);
    }
  };

  const [directorData, setDirectorData] = useState();
  const GetIndividualDirectors = () => {
    getDirectorDetailsById(directorId)
      .then((response) => {
        if (response) {
          setDirectorData(response.data);
        } else {
          setError("No employee data found");
        }
      })
      .catch((error) => {
        console.error("API Call Error:", error);
        setError(error?.message || "Login failed");
      });
  };
  useEffect(() => {
    GetIndividualDirectors();
  }, [directorId]);
  const [formData, setFormData] = useState({
    name: "",
    login_name: "",
    role: "",
    county: "",
    managementPassword: "",
    accessWebsites: [],
  });
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  useEffect(() => {
    if (directorData) {
      setFormData({
        name: directorData.name || "",
        login_name: directorData.login_name || "",
        role: directorData.type || "",
        county: directorData.county || "",
        managementPassword: "",
        accessWebsites:
          directorData.accessWebsites.map((website) => ({
            ...website,
            accountType: website.share !== null ? "share" : "rental",
          })) || [],
      });

      setSelectedRole(
        adminRoless.find((role) => role.value === directorData.type) || null
      );
      setSelectedCountry(
        countryData?.find((country) => country.id === directorData.county)
          ?.code || ""
      );
    }
  }, [directorData, countryData]);

  const handleChange = (e, index = null, field = null) => {
    if (index !== null && field) {
      const updatedWebsites = [...formData.accessWebsites];
      updatedWebsites[index][field] = e.target.value;
      setFormData({ ...formData, accessWebsites: updatedWebsites });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const togglePasswordVisibility = () => {
    setShowManagementPassword(!showManagementPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Modal
      show={showEditModal}
      onHide={handleEditModalClose}
      centered
      size="md"
    >
      <Modal.Body className="p-1 director-admin-popupbody px-2 py-2">
        <div className="d-flex justify-content-between align-items-center mb-2 px-3">
          {role === "management" ? (
            <h5 className="mb-0 medium-font black-text">
              Edit Director & Super Admin
            </h5>
          ) : (
            <h5 className="mb-0 medium-font black-text">Edit Super Admin</h5>
          )}
          <Button
            variant="link"
            onClick={handleEditModalClose}
            className="text-dark fs-4"
          >
            <MdOutlineClose />
          </Button>
        </div>
        <div className="d-flex mb-3">
          <button
            className={`rounded w-25 mx-1 ${
              activeForm === 1
                ? "saffron-btn2"
                : "black-text border-grey3 white-bg"
            }`}
            onClick={() => setActiveForm(1)}
          >
            Form 1
          </button>
          <button
            className={`rounded w-25 mx-1 ${
              activeForm === 2
                ? "saffron-btn2"
                : "black-text border-grey3 white-bg"
            }`}
            onClick={() => setActiveForm(2)}
          >
            Form 2
          </button>
        </div>
        <form
          className="add-management-popup-form px-3"
          style={{ display: activeForm === 1 ? "block" : "none" }}
        >
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="small-font">Name</label>
              <input
                type="text"
                className="small-font rounded all-none input-css w-100"
                placeholder="Enter"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="small-font">Login Name</label>
              <input
                type="text"
                className="small-font rounded all-none input-css w-100"
                placeholder="Enter"
                required
                value={formData.login_name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6 position-relative">
              <label className="small-font">Role</label>
              <div className="custom-select-wrapper">
                {/* <Select
                                                className="small-font"
                                                options={adminRoless}
                                                placeholder="Select"
                                                styles={customStyles}
                                                maxMenuHeight={120}
                                                menuPlacement="auto"
                                                onChange={handleRoleChange}
                                            /> */}
                <Select
                  className="small-font"
                  options={adminRoless}
                  placeholder="Select"
                  styles={customStyles}
                  maxMenuHeight={120}
                  menuPlacement="auto"
                  onChange={handleRoleChange}
                  value={selectedRole}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label className="small-font">Country</label>
              {/* <select
                                            className="small-font rounded all-none input-css w-100"

                                            value={selectedCountryCode}

                                            onChange={handleChange}
                                        >
                                            <option value="">Select a country</option>
                                            {countryData?.map((country, index) => (
                                                <option key={index} value={country.code}>
                                                    {country.name}
                                                </option>
                                            ))}
                                        </select> */}
              <select
                className="small-font rounded all-none input-css w-100"
                value={selectedCountry}
                onChange={handleCountryChange}
              >
                <option value="">Select a country</option>
                {countryData?.map((country, index) => (
                  <option key={index} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6 position-relative">
              <label className="small-font">Management Password</label>
              <input
                type={showManagementPassword ? "text" : "password"}
                className="small-font rounded all-none input-css w-100"
                placeholder="Enter Password"
                value={managementPassword}
                onChange={(e) => setManagementPassword(e.target.value)}
                required
              />
              <span
                className="position-absolute"
                style={{ right: "1.5rem", top: "1.8rem", cursor: "pointer" }}
                onClick={() =>
                  togglePasswordVisibility(setShowManagementPassword)
                }
              >
                {showManagementPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div className="col-md-6 d-flex align-items-end">
              <button
                type="button"
                className="saffron-btn2 add-mng-pop-btn w-100 d-flex align-items-center justify-content-center"
                onClick={() => setActiveForm(2)}
              >
                Next
                <FaArrowRightLong className="ms-2 large-font" />
              </button>
            </div>
          </div>
        </form>
        {/* Form 2 */}

        {formData.accessWebsites.map((website, index) => (
          <form
            key={index}
            className="custom-form small-font p-3"
            style={{ display: activeForm === 2 ? "block" : "none" }}
          >
            {/* Account Type Selection */}
            <div className="row mb-3">
              <div className="col-md-12 position-relative">
                <label className="small-font">Account Type</label>
                <div className="white-bg border-grey3">
                  <Select
                    className="small-font"
                    options={[
                      { value: "share", label: "Share" },
                      { value: "rental", label: "Rental" },
                    ]}
                    placeholder="Select"
                    styles={customStyles}
                    maxMenuHeight={120}
                    value={[
                      { value: "share", label: "Share" },
                      { value: "rental", label: "Rental" },
                    ].find((type) => type.value === website.accountType)}
                    onChange={(selectedOption) => {
                      const updatedWebsites = [...formData.accessWebsites];
                      updatedWebsites[index].accountType = selectedOption.value;
                      setFormData({
                        ...formData,
                        accessWebsites: updatedWebsites,
                      });
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Share Section (Only If Share is Selected) */}
            {website.accountType === "share" && (
              <div className="row mb-3">
                <div className="col-md-12 position-relative">
                  <label className="small-font">Commission</label>
                  <div className="white-bg border-grey3 d-flex justify-content-between align-items-center small-font">
                    <input
                      className="small-font bg-none p-2"
                      placeholder="Enter"
                      value={website.share || ""}
                      onChange={(e) => {
                        const updatedWebsites = [...formData.accessWebsites];
                        updatedWebsites[index].share = e.target.value;
                        setFormData({
                          ...formData,
                          accessWebsites: updatedWebsites,
                        });
                      }}
                    />
                    <span>
                      <b>{website.share || 0}%</b>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Rental Information (Only If Rental is Selected) */}
            {website.accountType === "rental" && (
              <>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="small-font">Start Date</label>
                    <input
                      type="date"
                      className="small-font rounded all-none input-css w-100"
                      value={website.rent_start_date || ""}
                      onChange={(e) => {
                        const updatedWebsites = [...formData.accessWebsites];
                        updatedWebsites[index].rent_start_date = e.target.value;
                        setFormData({
                          ...formData,
                          accessWebsites: updatedWebsites,
                        });
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small-font">Expiry Date</label>
                    <input
                      type="date"
                      className="small-font rounded all-none input-css w-100"
                      value={website.rent_expiry_date || ""}
                      onChange={(e) => {
                        const updatedWebsites = [...formData.accessWebsites];
                        updatedWebsites[index].rent_expiry_date =
                          e.target.value;
                        setFormData({
                          ...formData,
                          accessWebsites: updatedWebsites,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="small-font">Max Chips Monthly</label>
                    <input
                      type="text"
                      className="small-font rounded all-none input-css w-100"
                      value={website.max_chips_rent || ""}
                      onChange={(e) => {
                        const updatedWebsites = [...formData.accessWebsites];
                        updatedWebsites[index].max_chips_rent = e.target.value;
                        setFormData({
                          ...formData,
                          accessWebsites: updatedWebsites,
                        });
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small-font">Rent Percentage</label>
                    <input
                      type="text"
                      className="small-font rounded all-none input-css w-100"
                      value={website.rent_percentage || ""}
                      onChange={(e) => {
                        const updatedWebsites = [...formData.accessWebsites];
                        updatedWebsites[index].rent_percentage = e.target.value;
                        setFormData({
                          ...formData,
                          accessWebsites: updatedWebsites,
                        });
                      }}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Navigation Buttons */}
          </form>
        ))}
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => setActiveForm(1)}
          >
            <FaArrowLeft /> Previous
          </button>
          <button
            type="submit"
            className="btn btn-warning"
            onClick={handleSubmit}
          >
            Submit <FaArrowRight />
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default EditDirectorAdminPopup;
