import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaEye,
  FaEyeSlash,
  FaPlus,
} from "react-icons/fa";
import Select from "react-select";
import {
  createDirector,
  getAdminWebsites,
  getCountries,
  getCurrencies,
  getDirectorDetailsById,
  getOwnerCurrencies,
} from "../../api/apiMethods";
import { adminRoles, commissionTypes } from "../../utils/enum";
import { customStyles } from "../../components/ReactSelectStyles";
import { useLocation, useNavigate } from "react-router-dom";
import SuccessPopup from "../popups/SuccessPopup";

function AddNewDirectorSuperAdmin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showManagementPassword, setShowManagementPassword] = useState(false);
  const [name, setName] = useState("");
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [managementPassword, setManagementPassword] = useState("");
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("");
  const [countryData, setCountryData] = useState();
  const [currencyData, setCurrencyData] = useState();
  const [forms, setForms] = useState([{ id: 1 }]);

  const togglePasswordVisibility = (setter) => setter((prev) => !prev);

  const location = useLocation();
  const mode = location.state?.mode || "add";
  const userId = location.state?.userId || null;
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [userWebsites, setUserWebsites] = useState([]);
  const [selectedAdmins, setSelectedAdmins] = useState({});
  const [userWebsitesList, setUserWebsitesList] = useState({});
  const [selectedWebsites, setSelectedWebsites] = useState({});
  const [accountTypes, setAccountTypes] = useState({});
  console.log(userId, "userId");
  console.log(selectedAdmins, "selectedAdmins");

  const GetAllCountries = () => {
    getCountries()
      .then((response) => {
        if (response?.status === true) {
          setCountryData(response?.data);
          console.log(response, "countries");
        } else {
          setErrors("Something Went Wrong");
        }
      })
      .catch((error) => {
        setErrors(error?.message || "Not able to get Countries");
      });
  };
  const GetAllCurrencies = () => {
    getOwnerCurrencies()
      .then((response) => {
        if (response?.status === true) {
          setCurrencyData(response?.data);
          console.log(response, "countries");
        } else {
          setErrors("Something Went Wrong");
        }
      })
      .catch((error) => {
        setErrors(error?.message || "Not able to get Countries");
      });
  };
  const [adminWebsite, setAllAdminWebsite] = useState();

  console.log(adminWebsite, "adminWebsite");

  const GetAllAdminWebsites = () => {
    getAdminWebsites()
      .then((response) => {
        if (response?.status === true) {
          console.log(response.data, "AdminWebsites");
          setAllAdminWebsite(response.data);
        } else {
          setErrors("Something Went Wrong");
        }
      })
      .catch((error) => {
        setErrors(error?.message || "Not able to get Countries");
      });
  };
  console.log(currencyData, "currencyData");

  useEffect(() => {
    GetAllAdminWebsites();
    GetAllCountries();
    GetAllCurrencies();
  }, []);

  const adminRoless = Object.entries(adminRoles).map(([value, label]) => ({
    value: Number(value),
    label,
  }));
  console.log(adminRoless, "adminRoless");

  console.log(userWebsites, "userWebsites");

  const handleAdminRoleChange = (formId, selectedOption) => {
    setSelectedAdmins((prev) => ({
      ...prev,
      [formId]: selectedOption,
    }));

    const adminData = adminWebsite.find(
      (admin) => admin.id === selectedOption.value
    );
    setUserWebsitesList((prev) => ({
      ...prev,
      [formId]: adminData?.userWebsites || [],
    }));
  };

  const commissionOptions = Object.entries(commissionTypes).map(
    ([value, label]) => ({
      value,
      label,
    })
  );

  const [websiteDetails, setWebsiteDetails] = useState({});

  const handleCheckboxChange = (formId, userId) => {
    setSelectedWebsites((prev) => ({
      ...prev,
      [formId]: {
        ...prev[formId],
        [userId]: !prev[formId]?.[userId],
      },
    }));
  };

  const handleAccountTypeChange = (formId, userSiteId, selectedOption) => {
    setAccountTypes((prev) => ({
      ...prev,
      [formId]: {
        ...prev[formId],
        [userSiteId]: selectedOption.value,
      },
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
  console.log(websiteDetails, "websiteDetails");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!selectedAdmins || Object.keys(selectedAdmins).length === 0) {
      alert("Please select at least one Admin Website.");
      return;
    }

    console.log(selectedWebsites, "selectedWebsites before processing");

    if (!selectedWebsites || Object.keys(selectedWebsites).length === 0) {
      alert("Please select at least one User Website.");
      return;
    }

    const selectedUserWebsites = forms.flatMap((form) => {
      return userWebsitesList[form.id]?.map((userSite) => {
        if (!selectedWebsites[form.id]?.[userSite.id]) return null;

        const accotypeid = accountTypes[form.id]?.[userSite.id];
        let websiteData = {
          admin_panel_id: selectedAdmins[form.id]?.value,
          user_paner_id: userSite.id,
          commission_type: accotypeid,
        };

        if (accotypeid === "2") {
          websiteData.share = parseFloat(
            websiteDetails[userSite.id]?.share || 0
          );
          websiteData.caschip_values = parseFloat(
            websiteDetails[userSite.id]?.caschip_values || 0
          );
          websiteData.downline_comm = parseFloat(
            websiteDetails[userSite.id]?.downline_comm || 0
          );
        }

        if (accotypeid === "1") {
          websiteData.rent_start_date =
            websiteDetails[userSite.id]?.rent_start_date || "";
          websiteData.monthly_amount = parseInt(
            websiteDetails[userSite.id]?.monthly_amount || 0
          );
          websiteData.chip_percentage = parseFloat(
            websiteDetails[userSite.id]?.chip_percentage || 0
          );
          websiteData.max_chips_monthly = parseInt(
            websiteDetails[userSite.id]?.max_chips_monthly || 0
          );
          websiteData.extra_chips_percentage = parseFloat(
            websiteDetails[userSite.id]?.extra_chips_percentage || 0
          );
          websiteData.share = parseFloat(
            websiteDetails[userSite.id]?.share || 0
          );
        }

        return websiteData;
      });
    });

    const validUserWebsites = selectedUserWebsites.filter(Boolean);

    if (validUserWebsites.length === 0) {
      alert("Please select at least one User Website.");
      return;
    }

    console.log(validUserWebsites, "Final Selected User Websites");

    const finalData = {
      type: selectedRole,
      name,
      login_name: loginName,
      password,
      confirm_password: confirmPassword,
      parent_password: managementPassword,
      country_id: selectedCountryCode,
      currency_id: selectedCurrencyCode,
      accessWebsites: validUserWebsites,
    };

    console.log("Final Submitted Data:", finalData);

    createDirector(finalData)
      .then((response) => {
        if (response.status === true) {
          console.log("Response after clicking", response);
          setSuccessPopupOpen(true);
          setTimeout(() => {
            navigate("/director-admin");
          }, 2000);
        } else {
          console.log("Something went wrong");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleCountryChange = (event) => {
    const selectedCode = event.target.value;
    setSelectedCountryCode(selectedCode);
    console.log(selectedCode, "selectedCode");
  };

  const handleCurrencyChange = (event) => {
    const selectedCurrency = event.target.value;
    setSelectedCurrencyCode(selectedCurrency);
    console.log(selectedCurrency, "selectedCurrency");
  };

  const [individualDirectorData, setIndividualDirectorData] = useState();
  const [selectedRole, setSelectedRole] = useState("");

  const getDirectorDetailsByID = () => {
    getDirectorDetailsById(userId)
      .then((response) => {
        if (response.status === true) {
          console.log(response, "responsegetdirectordetialbyid");
          setIndividualDirectorData(response.data);
        } else {
          console.log("Something error happening");
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getDirectorDetailsByID();
  }, [userId]);

  const adminRolesArray = Object.entries(adminRoles).map(([id, name]) => ({
    id,
    name,
  }));
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const [errors, setErrors] = useState();
  const validateForm = () => {
    let newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!loginName.trim()) newErrors.loginName = "Login Name is required.";
    if (!selectedRole) newErrors.selectedRole = "Role selection is required.";
    if (!selectedCountryCode)
      newErrors.selectedCountryCode = "Country is required.";
    if (!selectedCurrencyCode)
      newErrors.selectedCurrencyCode = "Currency is required.";

    if (mode !== "edit") {
      if (!password) {
        newErrors.password = "Password is required.";
      } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters.";
      }

      if (!confirmPassword) {
        newErrors.confirmPassword = "Confirm Password is required.";
      } else if (confirmPassword !== password) {
        newErrors.confirmPassword = "Passwords do not match.";
      }
    }

    if (!managementPassword) {
      newErrors.managementPassword = "Management Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addAnotherForm = () => {
    setForms((prev) => [...prev, { id: Date.now() }]);
  };
  return (
    <>
      <div>
        <div className="d-flex align-items-center">
          <button
            type="button"
            className="saffron-btn2 me-2 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft /> Go Back
          </button>
          {mode === "edit" ? (
            <h5 className="yellow-font">Edit Director & Super Admin</h5>
          ) : (
            <h5 className="yellow-font">Add Director & Super Admin</h5>
          )}
        </div>

        <div className="d-flex w-100 my-2 align-items-center">
          <div className="col p-1">
            <label className="small-font my-1">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="border-grey3 small-font rounded all-none input-css white-bg  w-100"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors?.name && <span className="error">{errors?.name}</span>}
          </div>
          <div className="col p-1">
            <label className="small-font my-1">Login Name</label>
            <input
              type="text"
              placeholder="Enter Login Name"
              className="border-grey3 small-font rounded all-none input-css white-bg  w-100"
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
              required
            />
            {errors?.loginName && (
              <span className="x-small-font error">{errors?.loginName}</span>
            )}
          </div>
          <div className="col-1 p-1">
            <label className="small-font my-1">Role</label>
            <select
              className="small-font rounded all-none input-css white-bg border-grey3 w-100"
              value={selectedRole}
              onChange={handleRoleChange}
            >
              <option value="">Select</option>
              {adminRolesArray.length > 0 ? (
                adminRolesArray.map((role, index) => (
                  <option key={index} value={role.id}>
                    {role.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No roles available
                </option>
              )}
            </select>
            {errors?.selectedRole && (
              <span className="x-small-font error">{errors?.selectedRole}</span>
            )}
          </div>
          <div className="col-1 p-1">
            <label className="small-font my-1">Country</label>
            <select
              className="small-font rounded all-none input-css white-bg  border-grey3 w-100"
              value={selectedCountryCode}
              onChange={handleCountryChange}
            >
              <option value="">Select</option>
              {countryData?.map((country, index) => (
                <option key={index} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors?.selectedCountryCode && (
              <span className="x-small-font error">
                {errors?.selectedCountryCode}
              </span>
            )}
          </div>
          <div className="col-1 p-1">
            <label className="small-font my-1">Currency</label>
            <select
              className="small-font rounded all-none input-css white-bg  border-grey3 w-100"
              value={selectedCurrencyCode}
              onChange={handleCurrencyChange}
            >
              <option value="">Select </option>
              {currencyData?.map((currency, index) => (
                <option key={index} value={currency.country_id}>
                  {currency.currency_name}
                </option>
              ))}
            </select>
            {errors?.selectedCurrencyCode && (
              <span className="x-small-font error">
                {errors?.selectedCurrencyCode}
              </span>
            )}
          </div>
          {mode === "edit" ? null : (
            <>
              <div className="p-1 col position-relative">
                <label className="small-font my-1">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="border-grey3 small-font rounded all-none input-css white-bg  w-100"
                  placeholder="Enter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="position-absolute"
                  style={{ right: "1.5rem", top: "2.3rem", cursor: "pointer" }}
                  onClick={() => togglePasswordVisibility(setShowPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
                {errors?.password && (
                  <span className="x-small-font error">{errors?.password}</span>
                )}
              </div>
              <div className="p-1 col position-relative">
                <label className="small-font my-1">Confirm Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="border-grey3 small-font rounded all-none input-css white-bg  w-100"
                  placeholder="Enter"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span
                  className="position-absolute"
                  style={{ right: "1.5rem", top: "2.3rem", cursor: "pointer" }}
                  onClick={() =>
                    togglePasswordVisibility(setShowConfirmPassword)
                  }
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                  {/* {showConfirmPassword ? <FaEye /> : <FaEyeSlash />} */}
                </span>
                {errors?.confirmPassword && (
                  <span className="x-small-font error">
                    {errors?.confirmPassword}
                  </span>
                )}
              </div>
            </>
          )}
          <div className="p-1 col position-relative">
            <label className="small-font my-1">Management Password</label>
            <input
              type="password"
              className="border-grey3 small-font rounded all-none input-css white-bg  w-100"
              placeholder="Enter"
              required
              value={managementPassword}
              onChange={(e) => setManagementPassword(e.target.value)}
            />
            <span
              className="position-absolute"
              style={{ right: "1.5rem", top: "2.3rem", cursor: "pointer" }}
              onClick={() =>
                togglePasswordVisibility(setShowManagementPassword)
              }
            >
              {showManagementPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
            {errors?.managementPassword && (
              <span className="x-small-font error">
                {errors?.managementPassword}
              </span>
            )}
          </div>
        </div>
      </div>
      <div>
        <h3 className="yellow-font medium-font mb-0">WEBSITE MARKET </h3>
        <form className="custom-form small-font p-3" onSubmit={handleSubmit}>
          <div className="row align-items-center">
            {forms.map((form, index) => (
              <>
                <div key={form.id} className="col-1">
                  <label className="small-font my-1">Admin Website</label>
                  <div className="custom-select-wrapper">
                    <Select
                      className="small-font"
                      placeholder="Select"
                      options={adminWebsite?.map((admin) => ({
                        value: admin.id,
                        label: admin.web_name,
                      }))}
                      value={selectedAdmins[form.id] || null}
                      onChange={(selectedOption) =>
                        handleAdminRoleChange(form.id, selectedOption)
                      }
                    />
                  </div>
                </div>

                {/* User Websites */}
                <div className="col-11">
                  <label className="small-font my-1">User Website</label>
                  {userWebsitesList[form.id]?.length > 0 ? (
                    userWebsitesList[form.id].map((userSite) => (
                      <div key={userSite.id} className="row">
                        {/* Checkbox for Selecting User Website */}
                        <div className="col-2 input-css d-flex white-bg border-grey3 my-2">
                          <input
                            type="checkbox"
                            className="me-2"
                            checked={
                              selectedWebsites[form.id]?.[userSite.id] || false
                            }
                            onChange={() =>
                              handleCheckboxChange(form.id, userSite.id)
                            }
                          />
                          <input
                            type="text"
                            className="small-font rounded all-none w-100"
                            value={userSite.web_url}
                            readOnly
                          />
                        </div>
                        {console.log(
                          userWebsitesList[form.id],
                          "userWebsitesList[form.id]"
                        )}
                        {selectedWebsites[form.id]?.[userSite.id] && (
                          <div className="col-2 my-1">
                            <Select
                              className="small-font white-bg"
                              placeholder="Account Type"
                              options={commissionOptions}
                              styles={customStyles}
                              onChange={(selectedOption) =>
                                handleAccountTypeChange(
                                  form.id,
                                  userSite.id,
                                  selectedOption
                                )
                              }
                              value={
                                commissionOptions.find(
                                  (option) =>
                                    option.value ===
                                    accountTypes[form.id]?.[userSite.id]
                                ) || null
                              }
                            />
                          </div>
                        )}
                        {accountTypes[form.id]?.[userSite.id] === "1" && (
                          <div className="col-9">
                            <div className="row">
                              <div className="col">
                                <input
                                  type="date"
                                  className="small-font white-bg rounded border-grey3 p-2 w-100"
                                  onChange={(e) =>
                                    handleInputChange(
                                      userSite.id,
                                      "rent_start_date",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="col">
                                <input
                                  type="text"
                                  className="small-font white-bg rounded border-grey3 p-2 w-100"
                                  placeholder="Monthly Amnt"
                                  onChange={(e) =>
                                    handleInputChange(
                                      userSite.id,
                                      "monthly_amount",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="col">
                                <input
                                  type="text"
                                  className="small-font white-bg rounded border-grey3 p-2 w-100"
                                  placeholder="Max Chips Monthly"
                                  onChange={(e) =>
                                    handleInputChange(
                                      userSite.id,
                                      "max_chips_monthly",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="col">
                                <input
                                  type="text"
                                  className="small-font white-bg rounded border-grey3 p-2 w-100"
                                  placeholder="Chip %"
                                  onChange={(e) =>
                                    handleInputChange(
                                      userSite.id,
                                      "chip_percentage",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="col">
                                <div className="white-bg rounded small-font">
                                  <input
                                    className="small-font white-bg rounded border-grey3 p-2 w-100"
                                    placeholder="Extra Chip %"
                                    onChange={(e) =>
                                      handleInputChange(
                                        userSite.id,
                                        "extra_chips_percentage",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-3">
                                <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
                                  <input
                                    type="text"
                                    className="small-font bg-none p-2 w-75"
                                    placeholder="Commission(%)"
                                    onChange={(e) =>
                                      handleInputChange(
                                        userSite.id,
                                        "share",
                                        e.target.value
                                      )
                                    }
                                  />
                                  <span className="small-font text-center border-left3 px-1">
                                    <b>My Comm.. 1%</b>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {accountTypes[form.id]?.[userSite.id] === "2" && (
                          <div className="col d-flex">
                            <div className="col position-relative mx-1">
                              <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
                                <input
                                  className="small-font bg-none p-2 w-75"
                                  placeholder="Downline Sharing"
                                  onChange={(e) =>
                                    handleInputChange(
                                      userSite.id,
                                      "downline_comm",
                                      e.target.value
                                    )
                                  }
                                />
                                <span className="small-font text-center border-left3 px-1">
                                  <b>My Share 10%</b>
                                </span>
                              </div>
                            </div>
                            <div className="col position-relative mx-1">
                              <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
                                <input
                                  className="small-font bg-none p-2 w-75"
                                  placeholder="Enter Commission: M.0"
                                  onChange={(e) =>
                                    handleInputChange(
                                      userSite.id,
                                      "share",
                                      e.target.value
                                    )
                                  }
                                />
                                <span className="small-font text-center border-left3 px-1">
                                  <b>My Comm.. 1%</b>
                                </span>
                              </div>
                            </div>
                            <div className="col position-relative mx-1">
                              <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
                                <input
                                  className="small-font bg-none p-2 w-75"
                                  placeholder="Casino Chip Value"
                                  onChange={(e) =>
                                    handleInputChange(
                                      userSite.id,
                                      "caschip_values",
                                      e.target.value
                                    )
                                  }
                                />
                                <span className="small-font text-center border-left3 px-1">
                                  <b className="mx-1">Cas. Chip Val 20</b>
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                        {accountTypes[form.id]?.[userSite.id] === "3" && (
                          <div className="col d-flex">
                            <div className="col position-relative mx-1">
                              <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
                                <input
                                  className="small-font bg-none p-2 w-75"
                                  placeholder="Downline Sharing"
                                  onChange={(e) =>
                                    handleInputChange(
                                      userSite.id,
                                      "downline_comm",
                                      e.target.value
                                    )
                                  }
                                />
                                <span className="small-font text-center border-left3 px-1">
                                  <b>My Share 10%</b>
                                </span>
                              </div>
                            </div>
                            <div className="col position-relative mx-1">
                              <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
                                <input
                                  className="small-font bg-none p-2 w-75"
                                  placeholder="Enter Commission: M.0"
                                  onChange={(e) =>
                                    handleInputChange(
                                      userSite.id,
                                      "share",
                                      e.target.value
                                    )
                                  }
                                />
                                <span className="small-font text-center border-left3 px-1">
                                  <b>My Comm.. 1%</b>
                                </span>
                              </div>
                            </div>
                            <div className="col position-relative mx-1">
                              <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
                                <input
                                  className="small-font bg-none p-2 w-75"
                                  placeholder="Casino Chip Value"
                                  onChange={(e) =>
                                    handleInputChange(
                                      userSite.id,
                                      "caschip_values",
                                      e.target.value
                                    )
                                  }
                                />
                                <span className="small-font text-center border-left3 px-1">
                                  <b className="mx-1">Cas. Chip Val 20</b>
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

          <div className="text-end mb-3 w-100">
            <button type="button" className="cst-btn" onClick={addAnotherForm}>
              <FaPlus className="me-2" /> Add Another
            </button>
          </div>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-warning">
              Submit <FaArrowRight />
            </button>
          </div>
        </form>
        <SuccessPopup
          successPopupOpen={successPopupOpen}
          setSuccessPopupOpen={setSuccessPopupOpen}
          discription="Added Director SuccessFully"
        />
      </div>
    </>
  );
}

export default AddNewDirectorSuperAdmin;
