import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  FaArrowLeft,
  FaArrowRight,
  FaEye,
  FaEyeSlash,
  FaPlus,
} from "react-icons/fa";
import "../../../App.css";
import { MdOutlineClose } from "react-icons/md";
import Select from "react-select";
import { customStyles } from "../../../components/ReactSelectStyles";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  createDirector,
  getAdminWebsites,
  getCountries,
} from "../../../api/apiMethods";
import { adminRoles, commissionTypes } from "../../../utils/enum";
import SuccessPopup from "../../popups/SuccessPopup";

const AddDirectorAdminModal = ({ show, handleClose, getDirectorDwnSAList }) => {
  const role = localStorage.getItem("role_code");
  const role_name = localStorage.getItem("role_name");
  const [activeForm, setActiveForm] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showManagementPassword, setShowManagementPassword] = useState(false);
  const [name, setName] = useState("");
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [managementPassword, setManagementPassword] = useState("");
  const [roleId, setRoleId] = useState(null);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [error, setError] = useState();
  const [countryData, setCountryData] = useState();
  const togglePasswordVisibility = (setter) => setter((prev) => !prev);

  const handleChange = (event) => {
    const selectedCode = event.target.value;
    const selectedCountry = countryData?.find(
      (country) => country.code === selectedCode
    );

    if (selectedCountry) {
      setSelectedCountryId(selectedCountry.id);
      setSelectedCountryCode(selectedCountry.code);
    } else {
      setSelectedCountryId("");
      setSelectedCountryCode("");
    }
  };

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
  }, [show]);
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
  }, [show]);

  const adminRoless = Object.entries(adminRoles).map(([value, label]) => ({
    value: Number(value),
    label,
  }));

  const handleRoleChange = (selectedOption) => {
    setRoleId(selectedOption.value);
  };
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [userWebsites, setUserWebsites] = useState([]);

  const handleAdminRoleChange = (selectedOption) => {
    setSelectedAdmin(selectedOption);
    const adminData = adminWebsite.find(
      (admin) => admin.id === selectedOption.value
    );
    setUserWebsites(adminData?.userWebsites || []);
  };

  const [selectedWebsites, setSelectedWebsites] = useState({});
  const [accountTypes, setAccountTypes] = useState({});

  const commissionOptions = Object.entries(commissionTypes).map(
    ([value, label]) => ({
      value,
      label,
    })
  );

  const [forms, setForms] = useState([
    { id: 1, selectedWebsite: null, accountType: null },
  ]);

  const addAnotherForm = () => {
    setForms([
      ...forms,
      { id: forms.length + 1, selectedWebsite: null, accountType: null },
    ]);
  };

  const [websiteDetails, setWebsiteDetails] = useState({});
  const handleCheckboxChange = (id) => {
    setSelectedWebsites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAccountTypeChange = (id, selectedOption) => {
    setAccountTypes((prev) => ({
      ...prev,
      [id]: selectedOption.value,
    }));
  };
  const handleInputChange = (id, field, value) => {
    setWebsiteDetails((prevDetails) => ({
      ...prevDetails,
      [id]: {
        ...prevDetails[id],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedAdmin) {
      alert("Please select an Admin Website.");
      return;
    }

    const selectedUserWebsites = userWebsites
      .filter((site) => selectedWebsites[site.id])
      .map((site) => {
        const accotypeid = accountTypes[site.id];

        let websiteData = {
          admin_panel_id: selectedAdmin.value,
          user_paner_id: site.id,
          commission_type: accotypeid,
        };

        if (accotypeid === "2") {
          websiteData.share = parseFloat(websiteDetails[site.id]?.share || 0);
          websiteData.share = parseFloat(websiteDetails[site.id]?.share || 0);
          websiteData.share = parseFloat(websiteDetails[site.id]?.share || 0);

        }
        if (accotypeid === "1") {
          websiteData.rent_start_date =
            websiteDetails[site.id]?.rent_start_date || "";
          // websiteData.rent_expiry_date = websiteDetails[site.id]?.rent_expiry_date || "";
          websiteData.monthly_amount = parseInt(
            websiteDetails[site.id]?.monthly_amount || 0
          );
          websiteData.chip_percentage = parseFloat(
            websiteDetails[site.id]?.chip_percentage || 0
          );
          websiteData.max_chips_monthly = parseInt(websiteDetails[site.id]?.max_chips_monthly || 0);
          websiteData.extra_chips_percentage = parseFloat(websiteDetails[site.id]?.extra_chips_percentage || 0);
          websiteData.share = parseFloat(websiteDetails[site.id]?.share || 0);

        }
        return websiteData;
      });

    if (selectedUserWebsites.length === 0) {
      alert("Please select at least one User Website.");
      return;
    }

    // const type = selectedUserWebsites[0]?.commission_type || 1;

    const finalData = {
      type: roleId,
      name: name,
      login_name: loginName,
      password: password,
      confirm_password: confirmPassword,
      parent_password: managementPassword,
      country_id: selectedCountryId,
      accessWebsites: selectedUserWebsites,
    };
    createDirector(finalData)
      .then((response) => {
        if (response.status === true) {
          console.log(response, "response after clicking");
        } else {
          console.log("something error happening");
        }
      })
      .catch((error) => console.log(error));
    alert(JSON.stringify(finalData, null, 2));
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered size="md">
        <Modal.Body className="p-1 director-admin-popupbody px-2 py-2">
          <div className="d-flex justify-content-between align-items-center mb-2 px-3">
            {role === "management" ? (
              <h5 className="mb-0 medium-font black-text">
                Director & Super Admin
              </h5>
            ) : (
              <h5 className="mb-0 medium-font black-text">Add Super Admin</h5>
            )}
            <Button
              variant="link"
              onClick={handleClose}
              className="text-dark fs-4"
            >
              <MdOutlineClose />
            </Button>
          </div>

          <form
            className="add-management-popup-form px-3"
            style={{ display: activeForm === 1 ? "block" : "none" }}
          >
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="small-font my-1">Name</label>
                <input
                  type="text"
                  className="small-font rounded all-none input-css w-100"
                  placeholder="Enter"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="small-font my-1">Login Name</label>
                <input
                  type="text"
                  className="small-font rounded all-none input-css w-100"
                  placeholder="Enter"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6 position-relative">
                <label className="small-font my-1">Role</label>
                <div className="custom-select-wrapper">
                  <Select
                    className="small-font"
                    options={adminRoless}
                    placeholder="Select"
                    styles={customStyles}
                    maxMenuHeight={120}
                    menuPlacement="auto"
                    onChange={handleRoleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <label className="small-font my-1">Country</label>
                <select
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
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6 position-relative">
                <label className="small-font my-1">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="small-font rounded all-none input-css w-100"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="position-absolute"
                  style={{ right: "1.5rem", top: "1.8rem", cursor: "pointer" }}
                  onClick={() => togglePasswordVisibility(setShowPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <div className="col-md-6 position-relative">
                <label className="small-font my-1">Confirm Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="small-font rounded all-none input-css w-100"
                  placeholder="Enter Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span
                  className="position-absolute"
                  style={{ right: "1.5rem", top: "1.8rem", cursor: "pointer" }}
                  onClick={() =>
                    togglePasswordVisibility(setShowConfirmPassword)
                  }
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6 position-relative">
                <label className="small-font my-1">Management Password</label>
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
          <form
            className="custom-form small-font p-3"
            style={{ display: activeForm === 2 ? "block" : "none" }}
            onSubmit={handleSubmit}
          >
            <div>
              {forms.map((form, index) => (
                <>
                  <div key={form.id}>
                    <label className="small-font my-1">Admin Website</label>
                    <div className="custom-select-wrapper">
                      <Select
                        className="small-font"
                        placeholder="Select"
                        options={adminWebsite?.map((admin) => ({
                          value: admin.id,
                          label: admin.web_name,
                        }))}
                        onChange={handleAdminRoleChange}
                      />
                    </div>
                  </div>

                  {/* User Websites */}
                  <div>
                    <label className="small-font my-1">User Website</label>
                    {userWebsites.length > 0 ? (
                      userWebsites.map((userSite) => (
                        <div key={userSite.id} className="my-2">
                          <div className="d-flex input-css">
                            <input
                              type="checkbox"
                              className="me-2"
                              onChange={() => handleCheckboxChange(userSite.id)}
                            />
                            <input
                              type="text"
                              className="small-font rounded all-none w-100"
                              value={userSite.web_url}
                              readOnly
                            />
                          </div>
                          {/* Account Type Dropdown */}
                          {selectedWebsites[userSite.id] && (
                            <div className="mt-2">
                              <label className="small-font my-1">
                                Account Type
                              </label>
                              <Select
                                className="small-font"
                                placeholder="Select Account Type"
                                options={commissionOptions}
                                styles={customStyles}
                                maxMenuHeight={120}
                                onChange={(selectedOption) =>
                                  handleAccountTypeChange(
                                    userSite.id,
                                    selectedOption
                                  )
                                }
                              />
                            </div>
                          )}
                          {accountTypes[userSite.id] === "1" && (
                            <>
                              <div className="row my-2">
                                <div className="col-md-12 position-relative">
                                  <label className="small-font my-1">
                                    Extra Chips
                                  </label>
                                  <div className="white-bg border-grey3 d-flex justify-content-between align-items-center small-font">
                                    <input
                                      className="small-font bg-none p-2"
                                      placeholder="Enter"
                                      onChange={(e) =>
                                        handleInputChange(
                                          userSite.id,
                                          "extraChips",
                                          e.target.value
                                        )
                                      }
                                    />
                                    <span>
                                      <b>= (My Sharing 40%)</b>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="row mb-3">
                                <div className="col-md-6">
                                  <label className="small-font my-1">
                                    Start Date
                                  </label>
                                  <input
                                    type="date"
                                    className="small-font rounded all-none input-css w-100"
                                    onChange={(e) =>
                                      handleInputChange(
                                        userSite.id,
                                        "rent_start_date",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label className="small-font my-1">
                                    Expiry Date
                                  </label>
                                  <input
                                    type="date"
                                    className="small-font rounded all-none input-css w-100"
                                    onChange={(e) =>
                                      handleInputChange(
                                        userSite.id,
                                        "rent_expiry_date",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div className="row mb-3">
                                <div className="col-md-6">
                                  <label className="small-font my-1">
                                    Max Chips Monthly
                                  </label>
                                  <input
                                    type="text"
                                    className="small-font rounded all-none input-css w-100"
                                    onChange={(e) =>
                                      handleInputChange(
                                        userSite.id,
                                        "maxChipsMonthly",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label className="small-font my-1">
                                    Monthly Amount
                                  </label>
                                  <input
                                    type="text"
                                    className="small-font rounded all-none input-css w-100"
                                    onChange={(e) =>
                                      handleInputChange(
                                        userSite.id,
                                        "monthlyAmount",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div className="row mb-3">
                                <div className="col-md-6">
                                  <label className="small-font my-1">
                                    Max Chips Rent
                                  </label>
                                  <input
                                    type="text"
                                    className="small-font rounded all-none input-css w-100"
                                    onChange={(e) =>
                                      handleInputChange(
                                        userSite.id,
                                        "max_chips_rent",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label className="small-font my-1">
                                    My Percentage
                                  </label>
                                  <input
                                    type="text"
                                    className="small-font rounded all-none input-css w-100"
                                    onChange={(e) =>
                                      handleInputChange(
                                        userSite.id,
                                        "rent_percentage",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </>
                          )}
                          {accountTypes[userSite.id] === "2" && (
                            <div className="my-2">
                              <div className="col-md-12 position-relative">
                                <label className="small-font my-1">
                                  Commission: M.O
                                </label>
                                <div className="white-bg border-grey3 d-flex justify-content-between align-items-center small-font">
                                  <input
                                    className="small-font bg-none p-2 w-75"
                                    placeholder="Enter"
                                    onChange={(e) =>
                                      handleInputChange(
                                        userSite.id,
                                        "commissionMO",
                                        e.target.value
                                      )
                                    }
                                  />
                                  <span>
                                    <b className="mx-1">%</b>
                                  </span>
                                </div>
                              </div>
                              <div className="col-md-12 position-relative">
                                <label className="small-font my-1">
                                  Downline Sharing
                                </label>
                                <div className="white-bg border-grey3 d-flex justify-content-between align-items-center small-font">
                                  <input
                                    className="small-font bg-none p-2 w-75"
                                    placeholder="Enter"
                                    onChange={(e) =>
                                      handleInputChange(
                                        userSite.id,
                                        "share",
                                        e.target.value
                                      )
                                    }
                                  />
                                  <span>
                                    <b className="mx-1">= My Sharing</b>
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                          {accountTypes[userSite.id] === "3" && (
                            <div className="my-2">
                              <div className="col-md-12 position-relative">
                                <label className="small-font my-1">
                                  Commission: M.O
                                </label>
                                <div className="white-bg border-grey3 d-flex justify-content-between align-items-center small-font">
                                  <input
                                    className="small-font bg-none p-2 w-75"
                                    placeholder="Enter"
                                    onChange={(e) =>
                                      handleInputChange(
                                        userSite.id,
                                        "commissionMO",
                                        e.target.value
                                      )
                                    }
                                  />
                                  <span>
                                    <b className="mx-1">%</b>
                                  </span>
                                </div>
                              </div>
                              <div className="col-md-12 position-relative">
                                <label className="small-font my-1">
                                  Downline Sharing
                                </label>
                                <div className="white-bg border-grey3 d-flex justify-content-between align-items-center small-font">
                                  <input
                                    className="small-font bg-none p-2 w-75"
                                    placeholder="Enter"
                                    onChange={(e) =>
                                      handleInputChange(
                                        userSite.id,
                                        "downlineSharing",
                                        e.target.value
                                      )
                                    }
                                  />
                                  <span>
                                    <b className="mx-1">= My Sharing</b>
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="small-font">No user websites available</p>
                    )}
                  </div>
                </>
              ))}
            </div>

            <div className="text-center mb-3 w-100">
              <button
                type="button"
                className="saffron-btn rounded-2 py-2"
                onClick={addAnotherForm}
              >
                <FaPlus className="me-2" /> Add Another
              </button>
            </div>

            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => setActiveForm(1)}
              >
                <FaArrowLeft /> Previous
              </button>
              <button type="submit" className="btn btn-warning">
                Submit <FaArrowRight />
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <SuccessPopup
        successPopupOpen={successPopupOpen}
        setSuccessPopupOpen={setSuccessPopupOpen}
        discription={"user created successfully"}
      />
    </div>
  );
};

export default AddDirectorAdminModal;
