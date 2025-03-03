import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaEye,
  FaEyeSlash,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import Select from "react-select";
import {
  createDirector,
  createSuperAdmin,
  getAdminWebsites,
  getCountries,
  getCurrencies,
  getDirectorAccessWebites,
  getDirectorDetailsById,
  getOwnerCurrencies,
} from "../../api/apiMethods";
import { adminRoles, commissionTypes } from "../../utils/enum";
import { customStyles } from "../../components/ReactSelectStyles";
import { useLocation, useNavigate } from "react-router-dom";
import SuccessPopup from "../popups/SuccessPopup";

function AddNewDirectorSuperAdmin() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role_code");

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
  const [countryData, setCountryData] = useState([]);
  const [currencyData, setCurrencyData] = useState([]);
  const [forms, setForms] = useState([{ id: 1 }]);
  const [adminWebsite, setAllAdminWebsite] = useState([]);
  const [selectedAdmins, setSelectedAdmins] = useState({});
  const [userWebsitesList, setUserWebsitesList] = useState({});
  const [selectedWebsites, setSelectedWebsites] = useState({});
  const [accountTypes, setAccountTypes] = useState({});
  const [websiteDetails, setWebsiteDetails] = useState({});
  const [individualDirectorData, setIndividualDirectorData] = useState();
  const [selectedRole, setSelectedRole] = useState("");
  const [errors, setErrors] = useState({});
  const [websiteCreationErrors, setShowWebsiteCreationErrors] = useState(null);
  const [creationDescription, setCreateDescription] = useState("");
  const location = useLocation();
  const mode = location.state?.mode || "add";
  const userId = location.state?.userId || null;
  const [selectedOption, setSelectedOption] = useState(null);
  const [allAccessWebsites, setAllAccessWebsites] = useState([]);
  const togglePasswordVisibility = (setter) => setter((prev) => !prev);

  const GetAllCountries = () => {
    getCountries()
      .then((response) => {
        if (response?.status === true) {
          setCountryData(response?.data);
        } else {
          setErrors({ ...errors, countries: "Something Went Wrong" });
        }
      })
      .catch((error) => {
        setErrors({
          ...errors,
          countries: error?.message || "Not able to get Countries",
        });
      });
  };

  const GetAllCurrencies = () => {
    getOwnerCurrencies()
      .then((response) => {
        if (response?.status === true) {
          setCurrencyData(response?.data);
        } else {
          setErrors({ ...errors, currencies: "Something Went Wrong" });
        }
      })
      .catch((error) => {
        setErrors({
          ...errors,
          currencies: error?.message || "Not able to get Currencies",
        });
      });
  };

  const GetAllAdminWebsites = () => {
    getAdminWebsites()
      .then((response) => {
        if (response?.status === true) {
          setAllAdminWebsite(response.data);
        } else {
          setErrors({ ...errors, adminWebsites: "Something Went Wrong" });
        }
      })
      .catch((error) => {
        setErrors({
          ...errors,
          adminWebsites: error?.message || "Not able to get Admin Websites",
        });
      });
  };

  const GetAllAccessedWebsites = () => {
    getDirectorAccessWebites()
      .then((response) => {
        if (response.status === true) {
          setAllAccessWebsites(response.data);
        } else {
          console.log("Error Happening");
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    GetAllAccessedWebsites();
    GetAllAdminWebsites();
    GetAllCountries();
    GetAllCurrencies();
  }, [userId]);

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

  const handleInputChange = (websiteId, field, value) => {
    setWebsiteDetails((prevDetails) => ({
      ...prevDetails,
      [websiteId]: {
        ...prevDetails[websiteId],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!selectedAdmins || Object.keys(selectedAdmins).length === 0) {
      setShowWebsiteCreationErrors("Please select at least one Admin Website");
      return;
    }

    if (!selectedWebsites || Object.keys(selectedWebsites).length === 0) {
      setShowWebsiteCreationErrors("Please select at least one User Website.");
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
        if (accotypeid === "3") {
          websiteData.share = parseFloat(
            websiteDetails[userSite.id]?.share || null
          );
          websiteData.caschip_values = parseFloat(
            websiteDetails[userSite.id]?.caschip_values || null
          );
          websiteData.downline_comm = parseFloat(
            websiteDetails[userSite.id]?.downline_comm || null
          );
        }

        if (accotypeid === "2") {
          websiteData.share = parseFloat(
            websiteDetails[userSite.id]?.share || null
          );
          websiteData.caschip_values = parseFloat(
            websiteDetails[userSite.id]?.caschip_values || null
          );
          websiteData.downline_comm = parseFloat(
            websiteDetails[userSite.id]?.downline_comm || null
          );
        }

        if (accotypeid === "1") {
          websiteData.rent_start_date =
            websiteDetails[userSite.id]?.rent_start_date || "";
          websiteData.monthly_amount = parseInt(
            websiteDetails[userSite.id]?.monthly_amount || null
          );
          websiteData.chip_percentage = parseFloat(
            websiteDetails[userSite.id]?.chip_percentage || null
          );
          websiteData.max_chips_monthly = parseInt(
            websiteDetails[userSite.id]?.max_chips_monthly || null
          );
          websiteData.casino_allowed =
            websiteDetails[userSite.id]?.casino_allowed || false;
          websiteData.casino_chip_value = parseFloat(
            websiteDetails[userSite.id]?.casino_chip_value || null
          );
          websiteData.downline_comm = parseFloat(
            websiteDetails[userSite.id]?.downline_comm || null
          );
        }

        return websiteData;
      });
    });

    const validUserWebsites = selectedUserWebsites.filter(Boolean);

    if (validUserWebsites.length === 0) {
      setShowWebsiteCreationErrors("Please select at least one User Website.");
      return;
    }

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

    createDirector(finalData)
      .then((response) => {
        if (response.status === true) {
          setSuccessPopupOpen(true);
          setCreateDescription("Director Added Successfully");
          setTimeout(() => {
            navigate("/director-admin");
          }, 2000);
        } else {
          console.log("Something went wrong");
        }
      })
      .catch((error) => {
        setShowWebsiteCreationErrors(
          error.message[0].message || error.message[0]
        );
      });
  };

  const handleDirectorSubmit = (e) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;
    if (!selectedOption || Object.keys(selectedOption).length === 0) {
      setShowWebsiteCreationErrors("Please select at least one Admin Website.");
      return;
    }

    if (!selectedWebsites || Object.keys(selectedWebsites).length === 0) {
      setShowWebsiteCreationErrors("Please select at least one User Website.");
      return;
    }

    const selectedUserWebsites = forms.flatMap((form) => {
      return userWebsitesList[form.id]?.map((userSite) => {
        if (!selectedWebsites[form.id]?.[userSite.website_access_id])
          return null;

        const accotypeid = accountTypes[form.id]?.[userSite.website_access_id];
        let websiteData = {
          admin_panel_id: selectedOption?.value,
          user_paner_id: userSite.user_WebSite_id,
          commission_type: accotypeid,
        };

        if (accotypeid === "2" || accotypeid === "3") {
          websiteData.share = parseFloat(
            websiteDetails[userSite.website_access_id]?.share || null
          );
          websiteData.caschip_values = parseFloat(
            websiteDetails[userSite.website_access_id]?.caschip_values || null
          );
          websiteData.downline_comm = parseFloat(
            websiteDetails[userSite.website_access_id]?.downline_comm || null
          );
        }

        if (accotypeid === "1") {
          websiteData.rent_start_date =
            websiteDetails[userSite.website_access_id]?.rent_start_date || "";
          websiteData.monthly_amount = parseInt(
            websiteDetails[userSite.website_access_id]?.monthly_amount || null
          );
          websiteData.chip_percentage = parseFloat(
            websiteDetails[userSite.website_access_id]?.chip_percentage || null
          );
          websiteData.max_chips_monthly = parseInt(
            websiteDetails[userSite.website_access_id]?.max_chips_monthly || null
          );
          websiteData.casino_allowed =
            websiteDetails[userSite.website_access_id]?.casino_allowed || false;
          websiteData.casino_chip_value = parseFloat(
            websiteDetails[userSite.website_access_id]?.casino_chip_value || null
          );
          websiteData.downline_comm = parseFloat(
            websiteDetails[userSite.website_access_id]?.downline_comm || null
          );
        }

        return websiteData;
      });
    });

    const validUserWebsites = selectedUserWebsites.filter(Boolean);

    if (validUserWebsites.length === 0) {
      setShowWebsiteCreationErrors("Please select at least one User Website.");
      return;
    }

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

    createSuperAdmin(finalData)
      .then((response) => {
        if (response.status === true) {
          setSuccessPopupOpen(true);
          setCreateDescription("SuperAdmin Added Successfully");
          setTimeout(() => {
            navigate("/director-admin");
          }, 2000);
        } else {
          console.log("Something went wrong");
        }
      })
      .catch((error) => {
        setShowWebsiteCreationErrors(
          error.message[0].message || error.message[0]
        );
      });
  };

  const handleCountryChange = (event) => {
    setSelectedCountryCode(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrencyCode(event.target.value);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!loginName.trim()) newErrors.loginName = "Login Name is required.";
    if (!selectedRole) newErrors.selectedRole = "Role selection is required.";
    if (!selectedCountryCode)
      newErrors.selectedCountryCode = "Country is required.";
    if (!selectedCurrencyCode)
      newErrors.selectedCurrencyCode = "Currency is required.";
    if (!managementPassword) {
      newErrors.managementPassword = "Management Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addAnotherForm = () => {
    setForms((prev) => [...prev, { id: Date.now() }]);
  };

  const removeForm = (id) => {
    setForms((prev) => prev.filter((form) => form.id !== id));
  };

  const adminRolesArray = Object.entries(adminRoles).map(([key, value]) => ({
    value: key,
    label: value,
  }));

  const commissionOptions = Object.entries(commissionTypes).map(
    ([value, label]) => ({
      value,
      label,
    })
  );

  const transformedOptions = Array.isArray(allAccessWebsites)
    ? allAccessWebsites.flatMap((item) =>
        item.admin_websites.map((admin) => ({
          label: admin.admin_web_name,
          value: admin.admin_panel_id,
        }))
      )
    : [];

  const filteredRoles = adminRolesArray.filter((userRole) => {
    if (role === "management") {
      return userRole.label === "director" || userRole.label === "SuperAdmin";
    } else if (role === "director") {
      return userRole.label === "SuperAdmin";
    }
    return false;
  });

  return (
    <>
      <div>
        <div className="d-flex align-items-center justify-content-between border-bottom-grey py-2">
          <h5 className="yellow-font">Add Director & Super Admin</h5>
          <span
            className="yellow-font me-2 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft /> Go Back
          </span>
        </div>
        {websiteCreationErrors && (
          <div className="error-popup-container col-6 p-1 br-5 m-2">
            <ul>
              <li className="fw-600 small-font">{websiteCreationErrors}</li>
            </ul>
          </div>
        )}

        <div className="p-2">
          <div className="d-flex w-100">
            <div className="col p-1">
              <label className="small-font my-1">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="border-grey3 small-font rounded all-none input-css white-bg  w-100"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            <div className="col p-1">
              <label className="small-font my-1">Role</label>
              <select
                className="small-font rounded all-none input-css white-bg border-grey3 w-100"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="">Select</option>
                {filteredRoles.map((role, index) => (
                  <option key={index} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              {errors.selectedRole && (
                <span className="text-danger small-font">
                  {errors.selectedRole}
                </span>
              )}
            </div>

            <div className="col p-1">
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
          </div>
          <div className="d-flex w-100">
            <div className="col p-1">
              <label className="small-font my-1">Currency</label>
              <select
                className="small-font rounded all-none input-css white-bg  border-grey3 w-100"
                value={selectedCurrencyCode}
                onChange={handleCurrencyChange}
              >
                <option value="">Select </option>
                {currencyData?.map((currency, index) => (
                  <option key={index} value={currency.country_id}>
                    {currency.currency_name} ---{currency.name}
                  </option>
                ))}
              </select>
              {errors?.selectedCurrencyCode && (
                <span className="x-small-font error">
                  {errors?.selectedCurrencyCode}
                </span>
              )}
            </div>{" "}
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
                    style={{
                      right: "1.5rem",
                      top: "2.3rem",
                      cursor: "pointer",
                    }}
                    onClick={() => togglePasswordVisibility(setShowPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                  {errors?.password && (
                    <span className="x-small-font error">
                      {errors?.password}
                    </span>
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
                    style={{
                      right: "1.5rem",
                      top: "2.3rem",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      togglePasswordVisibility(setShowConfirmPassword)
                    }
                  >
                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
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
                type={showManagementPassword ? "text" : "password"}
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
      </div>
      <div>
        <form className="row align-items-center">
          {forms.map((form, index) => (
            <>
              <h5 className="yellow-font fw-bold mb-0 py-2 border-bottom-grey">
                WEBSITE MARKET{" "}
              </h5>
              <div key={form.id}>
                {role === "director" ? (
                  <div className="col-1">
                    <label className="small-font my-1">Admin Website</label>
                    <div className="custom-select-wrapper">
                      <Select
                        className="small-font"
                        placeholder="Select"
                        options={transformedOptions.filter(
                          (option) =>
                            !Object.values(selectedAdmins || {}).some(
                              (selected) => selected?.value === option.value
                            )
                        )}
                        value={selectedOption}
                        onChange={(selectedOption) => {
                          setSelectedOption(selectedOption);

                          const selectedAdmin = allAccessWebsites
                            ?.flatMap((access) => access.admin_websites)
                            .find(
                              (admin) =>
                                admin.admin_panel_id === selectedOption?.value
                            );

                          setSelectedAdmins((prev) => ({
                            ...prev,
                            [form.id]: selectedOption,
                          }));

                          setUserWebsitesList((prev) => ({
                            ...prev,
                            [form.id]: selectedAdmin ? selectedAdmin.users : [],
                          }));
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="col-1">
                    <label className="small-font my-1">Admin Website</label>
                    <div className="custom-select-wrapper">
                      <Select
                        className="small-font"
                        placeholder="Select"
                        options={adminWebsite
                          ?.filter(
                            (admin) =>
                              !Object.values(selectedAdmins).some(
                                (sel) => sel?.value === admin.id
                              )
                          )
                          .map((admin) => ({
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
                )}
              </div>
              <div className="d-flex">
                {" "}
                <div className="col-12">
                  {role === "director" && selectedOption ? (
                    userWebsitesList[form.id]?.length > 0 ? (
                      userWebsitesList[form.id].map((userSite) => (
                        <div
                          key={userSite.website_access_id}
                          className="d-flex flex-column"
                        >
                          <label className="small-font my-1">
                            User Website
                          </label>

                          <div className="col-2 input-css d-flex white-bg border-grey3 my-2">
                            <input
                              type="checkbox"
                              className="me-2"
                              checked={
                                selectedWebsites[form.id]?.[
                                  userSite.website_access_id
                                ] || false
                              }
                              onChange={() =>
                                handleCheckboxChange(
                                  form.id,
                                  userSite.website_access_id
                                )
                              }
                            />
                            <input
                              type="text"
                              className="small-font rounded all-none w-100"
                              value={userSite.user_web_url}
                              readOnly
                            />
                          </div>
                          {selectedWebsites[form.id]?.[
                            userSite.website_access_id
                          ] && (
                            <div className="col-2 my-1">
                              <Select
                                className="small-font white-bg"
                                placeholder="Account Type"
                                options={commissionOptions}
                                styles={customStyles}
                                onChange={(selectedOption) =>
                                  handleAccountTypeChange(
                                    form.id,
                                    userSite.website_access_id,
                                    selectedOption
                                  )
                                }
                                value={
                                  commissionOptions.find(
                                    (option) =>
                                      option.value ===
                                      accountTypes[form.id]?.[
                                        userSite.website_access_id
                                      ]
                                  ) || null
                                }
                              />
                            </div>
                          )}
                          {accountTypes[form.id]?.[
                            userSite.website_access_id
                          ] === "1" && (
                            <div className="col-9">
                              <div className="d-flex">
                                <div className="col">
                                  <input
                                    type="date"
                                    className="small-font white-bg rounded border-grey3 p-2 w-100"
                                    onChange={(e) =>
                                      handleInputChange(
                                        userSite.website_access_id,
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
                                        userSite.website_access_id,
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
                                        userSite.website_access_id,
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
                                        userSite.website_access_id,
                                        "chip_percentage",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="col d-flex align-items-center">
                                  <label className="small-font me-2">
                                    Casino Allowed
                                  </label>
                                  <input
                                    type="checkbox"
                                    checked={
                                      websiteDetails[
                                        userSite.website_access_id
                                      ]?.casino_allowed || false
                                    }
                                    onChange={(e) =>
                                      handleInputChange(
                                        userSite.website_access_id,
                                        "casino_allowed",
                                        e.target.checked
                                      )
                                    }
                                  />
                                </div>
                                {websiteDetails[userSite.website_access_id]
                                  ?.casino_allowed && (
                                  <div className="col">
                                    <input
                                      type="text"
                                      className="small-font white-bg rounded border-grey3 p-2 w-100"
                                      placeholder="Casino Chip Value"
                                      onChange={(e) =>
                                        handleInputChange(
                                          userSite.website_access_id,
                                          "casino_chip_value",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                )}
                                <div className="col-3">
                                  <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
                                    <input
                                      type="text"
                                      className="small-font bg-none p-2 w-75"
                                      placeholder="Commission(%)"
                                      onChange={(e) =>
                                        handleInputChange(
                                          userSite.website_access_id,
                                          "downline_comm",
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
                          {accountTypes[form.id]?.[
                            userSite.website_access_id
                          ] === "2" && (
                            <div className="col d-flex">
                              <div className="col position-relative mx-1">
                                <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
                                  <input
                                    className="small-font bg-none p-2 w-75"
                                    placeholder="Downline Sharing"
                                    onChange={(e) =>
                                      handleInputChange(
                                        userSite.website_access_id,
                                        "share",
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
                                        userSite.website_access_id,
                                        "downline_comm",
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
                                        userSite.website_access_id,
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
                          {accountTypes[form.id]?.[
                            userSite.website_access_id
                          ] === "3" && (
                            <div className="col d-flex">
                              <div className="col position-relative mx-1">
                                <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
                                  <input
                                    className="small-font bg-none p-2 w-75"
                                    placeholder="Downline Sharing"
                                    onChange={(e) =>
                                      handleInputChange(
                                        userSite.website_access_id,
                                        "share",
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
                                        userSite.website_access_id,
                                        "downline_comm",
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
                                        userSite.website_access_id,
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
                    )
                  ) : (
                    <>
                      {userWebsitesList[form.id]?.length > 0 ? (
                        userWebsitesList[form.id].map((userSite) => (
                          <div key={userSite.id} className="d-flex">
                            <div className="col-1 input-css d-flex white-bg border-grey3 my-2">
                              <input
                                type="checkbox"
                                className="me-2"
                                checked={
                                  selectedWebsites[form.id]?.[userSite.id] ||
                                  false
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
                            {selectedWebsites[form.id]?.[userSite.id] && (
                              <div className="col-1 my-1">
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
                              <div className="col-10">
                                <div className="d-flex">
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
                                  <div className="col d-flex align-items-center">
                                    <label className="small-font me-2">
                                      Casino Allowed
                                    </label>
                                    <input
                                      type="checkbox"
                                      checked={
                                        websiteDetails[userSite.id]
                                          ?.casino_allowed || false
                                      }
                                      onChange={(e) =>
                                        handleInputChange(
                                          userSite.id,
                                          "casino_allowed",
                                          e.target.checked
                                        )
                                      }
                                    />
                                  </div>
                                  {websiteDetails[userSite.id]?.casino_allowed && (
                                    <div className="col">
                                      <input
                                        type="text"
                                        className="small-font white-bg rounded border-grey3 p-2 w-100"
                                        placeholder="Casino Chip Value"
                                        onChange={(e) =>
                                          handleInputChange(
                                            userSite.id,
                                            "casino_chip_value",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                  )}
                                  <div className="col-3">
                                    <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
                                      <input
                                        type="text"
                                        className="small-font bg-none p-2 w-75"
                                        placeholder="Commission(%)"
                                        onChange={(e) =>
                                          handleInputChange(
                                            userSite.id,
                                            "downline_comm",
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
                                          "share",
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
                                          "downline_comm",
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
                                          "share",
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
                                          "downline_comm",
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
                    </>
                  )}
                </div>
              </div>
              <div className="d-flex py-2 align-items-center justify-content-end">
                <button
                  type="button"
                  className="cst-btn remove-btn"
                  onClick={() => removeForm(form.id)}
                >
                  <FaTrash className="me-2" /> Remove
                </button>
              </div>
            </>
          ))}
        </form>

        <button type="button" className="cst-btn" onClick={addAnotherForm}>
          <FaPlus className="me-2" /> Add Another
        </button>

        <div className="d-flex justify-content-end">
          <button
            className="saffron-btn rounded py-2 col-1 black-text2 border-none"
            onClick={
              role === "management" ? handleSubmit : handleDirectorSubmit
            }
          >
            Submit
          </button>
        </div>
        <SuccessPopup
          successPopupOpen={successPopupOpen}
          setSuccessPopupOpen={setSuccessPopupOpen}
          discription={creationDescription}
        />
      </div>
    </>
  );
}

export default AddNewDirectorSuperAdmin;






// import React, { useEffect, useState } from "react";
// import {
//   FaArrowLeft,
//   FaArrowRight,
//   FaEye,
//   FaEyeSlash,
//   FaPlus,
//   FaTrash,
// } from "react-icons/fa";
// import Select from "react-select";
// import {
//   createDirector,
//   createSuperAdmin,
//   getAdminWebsites,
//   getCountries,
//   getCurrencies,
//   getDirectorAccessWebites,
//   getDirectorDetailsById,
//   getOwnerCurrencies,
// } from "../../api/apiMethods";
// import { adminRoles, commissionTypes } from "../../utils/enum";
// import { customStyles } from "../../components/ReactSelectStyles";
// import { useLocation, useNavigate } from "react-router-dom";
// import SuccessPopup from "../popups/SuccessPopup";

// function AddNewDirectorSuperAdmin() {
//   const navigate = useNavigate();
//   const role = localStorage.getItem("role_code");

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [showManagementPassword, setShowManagementPassword] = useState(false);
//   const [name, setName] = useState("");
//   const [loginName, setLoginName] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [managementPassword, setManagementPassword] = useState("");
//   const [successPopupOpen, setSuccessPopupOpen] = useState(false);
//   const [selectedCountryCode, setSelectedCountryCode] = useState("");
//   const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("");
//   const [countryData, setCountryData] = useState([]);
//   const [currencyData, setCurrencyData] = useState([]);
//   const [forms, setForms] = useState([{ id: 1 }]);
//   const [adminWebsite, setAllAdminWebsite] = useState([]);
//   const [selectedAdmins, setSelectedAdmins] = useState({});
//   const [userWebsitesList, setUserWebsitesList] = useState({});
//   const [selectedWebsites, setSelectedWebsites] = useState({});
//   const [accountTypes, setAccountTypes] = useState({});
//   const [websiteDetails, setWebsiteDetails] = useState({});
//   const [individualDirectorData, setIndividualDirectorData] = useState();
//   const [selectedRole, setSelectedRole] = useState("");
//   const [errors, setErrors] = useState({});
//   const [websiteCreationErrors, setShowWebsiteCreationErrors] = useState(null);
//   const [creationDescription, setCreateDescription] = useState("");
//   console.log(websiteCreationErrors, "websiteCreationErrors");
//   const location = useLocation();
//   const mode = location.state?.mode || "add";
//   const userId = location.state?.userId || null;
//   const [selectedOption, setSelectedOption] = useState(null);

//   console.log(adminWebsite, "adminWebsite 123");
//   const togglePasswordVisibility = (setter) => setter((prev) => !prev);

//   const GetAllCountries = () => {
//     getCountries()
//       .then((response) => {
//         if (response?.status === true) {
//           setCountryData(response?.data);
//         } else {
//           setErrors({ ...errors, countries: "Something Went Wrong" });
//         }
//       })
//       .catch((error) => {
//         setErrors({
//           ...errors,
//           countries: error?.message || "Not able to get Countries",
//         });
//       });
//   };

//   const GetAllCurrencies = () => {
//     getOwnerCurrencies()
//       .then((response) => {
//         if (response?.status === true) {
//           setCurrencyData(response?.data);
//         } else {
//           setErrors({ ...errors, currencies: "Something Went Wrong" });
//         }
//       })
//       .catch((error) => {
//         setErrors({
//           ...errors,
//           currencies: error?.message || "Not able to get Currencies",
//         });
//       });
//   };

//   const GetAllAdminWebsites = () => {
//     getAdminWebsites()
//       .then((response) => {
//         if (response?.status === true) {
//           setAllAdminWebsite(response.data);
//         } else {
//           setErrors({ ...errors, adminWebsites: "Something Went Wrong" });
//         }
//       })
//       .catch((error) => {
//         setErrors({
//           ...errors,
//           adminWebsites: error?.message || "Not able to get Admin Websites",
//         });
//       });
//   };
//   const [allAccessWebsites, setAllAccessWebsites] = useState(false);
//   console.log(allAccessWebsites, "allAccessWebsites");

//   const GetAllAccessedWebsites = () => {
//     getDirectorAccessWebites()
//       .then((response) => {
//         if (response.status === true) {
//           console.log(response, "Response From Accessed Websites");
//           setAllAccessWebsites(response.data);
//         } else {
//           console.log("Error Happening");
//         }
//       })
//       .catch((error) => console.log(error));
//   };

//   useEffect(() => {
//     GetAllAccessedWebsites();
//     GetAllAdminWebsites();
//     GetAllCountries();
//     GetAllCurrencies();
//   }, [userId]);

//   // const handleAdminRoleChange = (formId, selectedOption) => {
//   //   setSelectedAdmins((prev) => ({
//   //     ...prev,
//   //     [formId]: selectedOption,
//   //   }));

//   //   const adminData = adminWebsite.find(
//   //     (admin) => admin.id === selectedOption.value
//   //   );
//   //   setUserWebsitesList((prev) => ({
//   //     ...prev,
//   //     [formId]: adminData?.userWebsites || [],
//   //   }));
//   // };

//   const handleAdminRoleChange = (formId, selectedOption) => {
//     setSelectedAdmins((prev) => ({
//       ...prev,
//       [formId]: selectedOption,
//     }));

//     // Find admin data based on selected option
//     const adminData = adminWebsite.find(
//       (admin) => admin.id === selectedOption.value
//     );

//     // Update userWebsitesList for the corresponding form ID
//     setUserWebsitesList((prev) => ({
//       ...prev,
//       [formId]: adminData?.userWebsites || [],
//     }));
//   };

//   const handleCheckboxChange = (formId, userId) => {
//     setSelectedWebsites((prev) => ({
//       ...prev,
//       [formId]: {
//         ...prev[formId],
//         [userId]: !prev[formId]?.[userId],
//       },
//     }));
//   };

//   const handleAccountTypeChange = (formId, userSiteId, selectedOption) => {
//     setAccountTypes((prev) => ({
//       ...prev,
//       [formId]: {
//         ...prev[formId],
//         [userSiteId]: selectedOption.value,
//       },
//     }));
//   };

//   const handleInputChange = (websiteId, field, value) => {
//     setWebsiteDetails((prevDetails) => ({
//       ...prevDetails,
//       [websiteId]: {
//         ...prevDetails[websiteId],
//         [field]: value,
//       },
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     if (!selectedAdmins || Object.keys(selectedAdmins).length === 0) {
//       setShowWebsiteCreationErrors("Please select at least one Admin Website");
//       return;
//     }

//     console.log(selectedWebsites, "selectedWebsites");
//     if (!selectedWebsites || Object.keys(selectedWebsites).length === 0) {
//       setShowWebsiteCreationErrors("Please select at least one User Website.");
//       return;
//     }

//     const selectedUserWebsites = forms.flatMap((form) => {
//       return userWebsitesList[form.id]?.map((userSite) => {
//         if (!selectedWebsites[form.id]?.[userSite.id]) return null;

//         const accotypeid = accountTypes[form.id]?.[userSite.id];
//         let websiteData = {
//           admin_panel_id: selectedAdmins[form.id]?.value,
//           user_paner_id: userSite.id,
//           commission_type: accotypeid,
//         };
//         if (accotypeid === "3") {
//           websiteData.share = parseFloat(
//             websiteDetails[userSite.id]?.share || null
//           );
//           websiteData.caschip_values = parseFloat(
//             websiteDetails[userSite.id]?.caschip_values || null
//           );
//           websiteData.downline_comm = parseFloat(
//             websiteDetails[userSite.id]?.downline_comm || null
//           );
//         }

//         if (accotypeid === "2") {
//           websiteData.share = parseFloat(
//             websiteDetails[userSite.id]?.share || null
//           );
//           websiteData.caschip_values = parseFloat(
//             websiteDetails[userSite.id]?.caschip_values || null
//           );
//           websiteData.downline_comm = parseFloat(
//             websiteDetails[userSite.id]?.downline_comm || null
//           );
//         }

//         if (accotypeid === "1") {
//           websiteData.rent_start_date =
//             websiteDetails[userSite.id]?.rent_start_date || "";
//           websiteData.monthly_amount = parseInt(
//             websiteDetails[userSite.id]?.monthly_amount || null
//           );
//           websiteData.chip_percentage = parseFloat(
//             websiteDetails[userSite.id]?.chip_percentage || null
//           );
//           websiteData.max_chips_monthly = parseInt(
//             websiteDetails[userSite.id]?.max_chips_monthly || null
//           );
//           websiteData.extra_chips_percentage = parseFloat(
//             websiteDetails[userSite.id]?.extra_chips_percentage || null
//           );
//           websiteData.downline_comm = parseFloat(
//             websiteDetails[userSite.id]?.downline_comm || null
//           );
//         }

//         return websiteData;
//       });
//     });

//     console.log(selectedUserWebsites, "selectedUserWebsites");
//     const validUserWebsites = selectedUserWebsites.filter(Boolean);

//     if (validUserWebsites.length === 0) {
//       setShowWebsiteCreationErrors("Please select at least one User Website.");
//       return;
//     }

//     const finalData = {
//       type: selectedRole,
//       name,
//       login_name: loginName,
//       password,
//       confirm_password: confirmPassword,
//       parent_password: managementPassword,
//       country_id: selectedCountryCode,
//       currency_id: selectedCurrencyCode,
//       accessWebsites: validUserWebsites,
//     };
//     console.log(finalData, "====>finalData");
//     createDirector(finalData)
//       .then((response) => {
//         if (response.status === true) {
//           setSuccessPopupOpen(true);
//           setCreateDescription("Director Added Successfully");
//           setTimeout(() => {
//             navigate("/director-admin");
//           }, 2000);
//         } else {
//           console.log("Something went wrong");
//         }
//       })
//       .catch((error) => {
//         // console.log(
//         //   error.message[0].data.message[0].message ||
//         //     error.message[0].data.message[0],
//         //   "==>in api call"
//         // );
//         // console.log(error.message[0].data.message[0],"==>in api call");

//         setShowWebsiteCreationErrors(
//           error.message[0].message || error.message[0]
//         );

//         // console.log(error.message[0].message || error.message[0],"==>error");
//       });
//   };

//   const handleDirectorSubmit = (e) => {
//     console.log(selectedWebsites, "selectedWebsites");
//     if (e) e.preventDefault();
//     if (!validateForm()) return;
//     if (!selectedOption || Object.keys(selectedOption).length === 0) {
//       setShowWebsiteCreationErrors("Please select at least one Admin Website.");
//       return;
//     }
//     console.log(selectedWebsites, "selectedWebsites");
//     if (!selectedWebsites || Object.keys(selectedWebsites).length === 0) {
//       setShowWebsiteCreationErrors("Please select at least one User Website.");
//       return;
//     }

//     const selectedUserWebsites = forms.flatMap((form) => {
//       return userWebsitesList[form.id]?.map((userSite) => {
//         if (!selectedWebsites[form.id]?.[userSite.website_access_id])
//           return null;

//         const accotypeid = accountTypes[form.id]?.[userSite.website_access_id];
//         console.log(userSite, "userSite");
//         let websiteData = {
//           admin_panel_id: selectedOption?.value,
//           user_paner_id: userSite.user_WebSite_id,
//           commission_type: accotypeid,
//         };
//         console.log(websiteData, "websiteData");

//         if (accotypeid === "2" || accotypeid === "3") {
//           websiteData.share = parseFloat(
//             websiteDetails[userSite.website_access_id]?.share || null
//           );
//           websiteData.caschip_values = parseFloat(
//             websiteDetails[userSite.website_access_id]?.caschip_values || null
//           );
//           websiteData.downline_comm = parseFloat(
//             websiteDetails[userSite.website_access_id]?.downline_comm || null
//           );
//         }

//         if (accotypeid === "1") {
//           websiteData.rent_start_date =
//             websiteDetails[userSite.website_access_id]?.rent_start_date || "";

//           websiteData.monthly_amount = parseInt(
//             websiteDetails[userSite.website_access_id]?.monthly_amount || null
//           );
//           websiteData.chip_percentage = parseFloat(
//             websiteDetails[userSite.website_access_id]?.chip_percentage || null
//           );
//           websiteData.max_chips_monthly = parseInt(
//             websiteDetails[userSite.website_access_id]?.max_chips_monthly ||
//               null
//           );
//           websiteData.extra_chips_percentage = parseFloat(
//             websiteDetails[userSite.website_access_id]
//               ?.extra_chips_percentage || null
//           );
//           websiteData.downline_comm = parseFloat(
//             websiteDetails[userSite.website_access_id]?.downline_comm || null
//           );
//         }

//         return websiteData;
//       });
//     });

//     const validUserWebsites = selectedUserWebsites.filter(Boolean);

//     if (validUserWebsites.length === 0) {
//       setShowWebsiteCreationErrors("Please select at least one User Website.");
//       return;
//     }

//     const finalData = {
//       type: selectedRole,
//       name,
//       login_name: loginName,
//       password,
//       confirm_password: confirmPassword,
//       parent_password: managementPassword,
//       country_id: selectedCountryCode,
//       currency_id: selectedCurrencyCode,
//       accessWebsites: validUserWebsites,
//     };

//     createSuperAdmin(finalData)
//       .then((response) => {
//         if (response.status === true) {
//           setSuccessPopupOpen(true);
//           setCreateDescription("SuperAdmin Added Successfully");
//           setTimeout(() => {
//             navigate("/director-admin");
//           }, 2000);
//         } else {
//           console.log("Something went wrong");
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//         setShowWebsiteCreationErrors(
//           error.message[0].message || error.message[0]
//         );
//       });
//   };
//   console.log(selectedOption, "selectedOption");

//   const handleCountryChange = (event) => {
//     setSelectedCountryCode(event.target.value);
//   };

//   const handleCurrencyChange = (event) => {
//     setSelectedCurrencyCode(event.target.value);
//   };

//   const handleRoleChange = (event) => {
//     setSelectedRole(event.target.value);
//   };

//   const validateForm = () => {
//     let newErrors = {};

//     if (!name.trim()) newErrors.name = "Name is required.";
//     if (!loginName.trim()) newErrors.loginName = "Login Name is required.";
//     if (!selectedRole) newErrors.selectedRole = "Role selection is required.";
//     if (!selectedCountryCode)
//       newErrors.selectedCountryCode = "Country is required.";
//     if (!selectedCurrencyCode)
//       newErrors.selectedCurrencyCode = "Currency is required.";
//     if (!managementPassword) {
//       newErrors.managementPassword = "Management Password is required.";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const addAnotherForm = () => {
//     setForms((prev) => [...prev, { id: Date.now() }]);
//   };
//   const removeForm = (id) => {
//     setForms((prev) => prev.filter((form) => form.id !== id));
//   };
//   const adminRolesArray = Object.entries(adminRoles).map(([key, value]) => ({
//     value: key,
//     label: value,
//   }));

//   console.log(adminRolesArray, "adminRolesArray");
//   const commissionOptions = Object.entries(commissionTypes).map(
//     ([value, label]) => ({
//       value,
//       label,
//     })
//   );
//   const transformedOptions = Array.isArray(allAccessWebsites)
//     ? allAccessWebsites.flatMap((item) =>
//         item.admin_websites.map((admin) => ({
//           label: admin.admin_web_name,
//           value: admin.admin_panel_id,
//         }))
//       )
//     : [];

//   console.log(transformedOptions, "transformedOptions");

//   const filteredRoles = adminRolesArray.filter((userRole) => {
//     if (role === "management") {
//       return userRole.label === "director" || userRole.label === "SuperAdmin";
//     } else if (role === "director") {
//       return userRole.label === "SuperAdmin";
//     }
//     return false;
//   });
//   return (
//     <>
//       <div>
//         <div className="d-flex align-items-center justify-content-between border-bottom-grey py-2">
//           <h5 className="yellow-font">Add Director & Super Admin</h5>
//           <span
//             className="yellow-font me-2 cursor-pointer"
//             onClick={() => navigate(-1)}
//           >
//             <FaArrowLeft /> Go Back
//           </span>
//         </div>
//         {websiteCreationErrors && (
//           <div className="error-popup-container col-6 p-1 br-5 m-2">
//             <ul>
//               <li className="fw-600 small-font">{websiteCreationErrors}</li>
//             </ul>
//           </div>
//         )}

//         <div className="p-2">
//           <div className="d-flex w-100">
//             <div className="col p-1">
//               <label className="small-font my-1">Name</label>
//               <input
//                 type="text"
//                 placeholder="Enter Name"
//                 className="border-grey3 small-font rounded all-none input-css white-bg  w-100"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//               {errors?.name && <span className="error">{errors?.name}</span>}
//             </div>
//             <div className="col p-1">
//               <label className="small-font my-1">Login Name</label>
//               <input
//                 type="text"
//                 placeholder="Enter Login Name"
//                 className="border-grey3 small-font rounded all-none input-css white-bg  w-100"
//                 value={loginName}
//                 onChange={(e) => setLoginName(e.target.value)}
//                 required
//               />
//               {errors?.loginName && (
//                 <span className="x-small-font error">{errors?.loginName}</span>
//               )}
//             </div>
//             <div className="col p-1">
//               <label className="small-font my-1">Role</label>
//               <select
//                 className="small-font rounded all-none input-css white-bg border-grey3 w-100"
//                 value={selectedRole}
//                 onChange={(e) => setSelectedRole(e.target.value)}
//               >
//                 <option value="">Select</option>
//                 {filteredRoles.map((role, index) => (
//                   <option key={index} value={role.value}>
//                     {role.label}
//                   </option>
//                 ))}
//               </select>
//               {errors.selectedRole && (
//                 <span className="text-danger small-font">
//                   {errors.selectedRole}
//                 </span>
//               )}
//             </div>

//             <div className="col p-1">
//               <label className="small-font my-1">Country</label>
//               <select
//                 className="small-font rounded all-none input-css white-bg  border-grey3 w-100"
//                 value={selectedCountryCode}
//                 onChange={handleCountryChange}
//               >
//                 <option value="">Select</option>
//                 {countryData?.map((country, index) => (
//                   <option key={index} value={country.id}>
//                     {country.name}
//                   </option>
//                 ))}
//               </select>
//               {errors?.selectedCountryCode && (
//                 <span className="x-small-font error">
//                   {errors?.selectedCountryCode}
//                 </span>
//               )}
//             </div>
//           </div>
//           <div className="d-flex w-100">
//             <div className="col p-1">
//               <label className="small-font my-1">Currency</label>
//               <select
//                 className="small-font rounded all-none input-css white-bg  border-grey3 w-100"
//                 value={selectedCurrencyCode}
//                 onChange={handleCurrencyChange}
//               >
//                 <option value="">Select </option>
//                 {currencyData?.map((currency, index) => (
//                   <option key={index} value={currency.country_id}>
//                     {currency.currency_name} ---{currency.name}
//                   </option>
//                 ))}
//               </select>
//               {errors?.selectedCurrencyCode && (
//                 <span className="x-small-font error">
//                   {errors?.selectedCurrencyCode}
//                 </span>
//               )}
//             </div>{" "}
//             {mode === "edit" ? null : (
//               <>
//                 <div className="p-1 col position-relative">
//                   <label className="small-font my-1">Password</label>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     className="border-grey3 small-font rounded all-none input-css white-bg  w-100"
//                     placeholder="Enter"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                   <span
//                     className="position-absolute"
//                     style={{
//                       right: "1.5rem",
//                       top: "2.3rem",
//                       cursor: "pointer",
//                     }}
//                     onClick={() => togglePasswordVisibility(setShowPassword)}
//                   >
//                     {showPassword ? <FaEye /> : <FaEyeSlash />}
//                   </span>
//                   {errors?.password && (
//                     <span className="x-small-font error">
//                       {errors?.password}
//                     </span>
//                   )}
//                 </div>
//                 <div className="p-1 col position-relative">
//                   <label className="small-font my-1">Confirm Password</label>
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     className="border-grey3 small-font rounded all-none input-css white-bg  w-100"
//                     placeholder="Enter"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     required
//                   />
//                   <span
//                     className="position-absolute"
//                     style={{
//                       right: "1.5rem",
//                       top: "2.3rem",
//                       cursor: "pointer",
//                     }}
//                     onClick={() =>
//                       togglePasswordVisibility(setShowConfirmPassword)
//                     }
//                   >
//                     {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
//                   </span>
//                   {errors?.confirmPassword && (
//                     <span className="x-small-font error">
//                       {errors?.confirmPassword}
//                     </span>
//                   )}
//                 </div>
//               </>
//             )}
//             <div className="p-1 col position-relative">
//               <label className="small-font my-1">Management Password</label>
//               <input
//                 type={showManagementPassword ? "text" : "password"}
//                 className="border-grey3 small-font rounded all-none input-css white-bg  w-100"
//                 placeholder="Enter"
//                 required
//                 value={managementPassword}
//                 onChange={(e) => setManagementPassword(e.target.value)}
//               />
//               <span
//                 className="position-absolute"
//                 style={{ right: "1.5rem", top: "2.3rem", cursor: "pointer" }}
//                 onClick={() =>
//                   togglePasswordVisibility(setShowManagementPassword)
//                 }
//               >
//                 {showManagementPassword ? <FaEye /> : <FaEyeSlash />}
//               </span>
//               {errors?.managementPassword && (
//                 <span className="x-small-font error">
//                   {errors?.managementPassword}
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div>
//         <form className="row align-items-center">
//           {forms.map((form, index) => (
//             <>
//               <h5 className="yellow-font fw-bold mb-0 py-2 border-bottom-grey">
//                 WEBSITE MARKET{" "}
//               </h5>
//               <div key={form.id}>
//                 {role === "director" ? (
//                   <div className="col-1">
//                     <label className="small-font my-1">Admin Website</label>
//                     <div className="custom-select-wrapper">
//                       <Select
//                         className="small-font"
//                         placeholder="Select"
//                         options={transformedOptions.filter(
//                           (option) =>
//                             !Object.values(selectedAdmins || {}).some(
//                               (selected) => selected?.value === option.value
//                             )
//                         )}
//                         value={selectedOption}
//                         onChange={(selectedOption) => {
//                           console.log("Selected Option:", selectedOption);

//                           setSelectedOption(selectedOption);

//                           // Find the selected admin from allAccessWebsites
//                           const selectedAdmin = allAccessWebsites
//                             ?.flatMap((access) => access.admin_websites)
//                             .find(
//                               (admin) =>
//                                 admin.admin_panel_id === selectedOption?.value
//                             );

//                           console.log("Selected Admin:", selectedAdmin);

//                           // Update selectedAdmins for the form
//                           setSelectedAdmins((prev) => ({
//                             ...prev,
//                             [form.id]: selectedOption,
//                           }));

//                           // Update userWebsitesList for the form
//                           setUserWebsitesList((prev) => {
//                             const updatedList = {
//                               ...prev,
//                               [form.id]: selectedAdmin
//                                 ? selectedAdmin.users
//                                 : [],
//                             };
//                             console.log(
//                               "Updated User Websites List:",
//                               updatedList
//                             );
//                             return updatedList;
//                           });
//                         }}
//                       />
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="col-1">
//                     <label className="small-font my-1">Admin Website</label>
//                     <div className="custom-select-wrapper">
//                       <Select
//                         className="small-font"
//                         placeholder="Select"
//                         options={adminWebsite
//                           ?.filter(
//                             (admin) =>
//                               !Object.values(selectedAdmins).some(
//                                 (sel) => sel?.value === admin.id
//                               )
//                           )
//                           .map((admin) => ({
//                             value: admin.id,
//                             label: admin.web_name,
//                           }))}
//                         value={selectedAdmins[form.id] || null}
//                         onChange={(selectedOption) =>
//                           handleAdminRoleChange(form.id, selectedOption)
//                         }
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <div className="d-flex">
//                 {" "}
//                 <div className="col-12">
//                   {role === "director" && selectedOption ? (
//                     userWebsitesList[form.id]?.length > 0 ? (
//                       userWebsitesList[form.id].map((userSite) => (
//                         <div
//                           key={userSite.website_access_id}
//                           className="d-flex flex-column"
//                         >
//                           <label className="small-font my-1">
//                             User Website
//                           </label>

//                           <div className="col-2 input-css d-flex white-bg border-grey3 my-2">
//                             <input
//                               type="checkbox"
//                               className="me-2"
//                               checked={
//                                 selectedWebsites[form.id]?.[
//                                   userSite.website_access_id
//                                 ] || false
//                               }
//                               onChange={() =>
//                                 handleCheckboxChange(
//                                   form.id,
//                                   userSite.website_access_id
//                                 )
//                               }
//                             />
//                             <input
//                               type="text"
//                               className="small-font rounded all-none w-100"
//                               value={userSite.user_web_url}
//                               readOnly
//                             />
//                           </div>
//                           {selectedWebsites[form.id]?.[
//                             userSite.website_access_id
//                           ] && (
//                             <div className="col-2 my-1">
//                               <Select
//                                 className="small-font white-bg"
//                                 placeholder="Account Type"
//                                 options={commissionOptions}
//                                 styles={customStyles}
//                                 onChange={(selectedOption) =>
//                                   handleAccountTypeChange(
//                                     form.id,
//                                     userSite.website_access_id,
//                                     selectedOption
//                                   )
//                                 }
//                                 value={
//                                   commissionOptions.find(
//                                     (option) =>
//                                       option.value ===
//                                       accountTypes[form.id]?.[
//                                         userSite.website_access_id
//                                       ]
//                                   ) || null
//                                 }
//                               />
//                             </div>
//                           )}
//                           {accountTypes[form.id]?.[
//                             userSite.website_access_id
//                           ] === "1" && (
//                             <div className="col-9">
//                               <div className="d-flex">
//                                 <div className="col">
//                                   <input
//                                     type="date"
//                                     className="small-font white-bg rounded border-grey3 p-2 w-100"
//                                     onChange={(e) =>
//                                       handleInputChange(
//                                         userSite.website_access_id,
//                                         "rent_start_date",
//                                         e.target.value
//                                       )
//                                     }
//                                   />
//                                 </div>
//                                 <div className="col">
//                                   <input
//                                     type="text"
//                                     className="small-font white-bg rounded border-grey3 p-2 w-100"
//                                     placeholder="Monthly Amnt"
//                                     onChange={(e) =>
//                                       handleInputChange(
//                                         userSite.website_access_id,
//                                         "monthly_amount",
//                                         e.target.value
//                                       )
//                                     }
//                                   />
//                                 </div>
//                                 <div className="col">
//                                   <input
//                                     type="text"
//                                     className="small-font white-bg rounded border-grey3 p-2 w-100"
//                                     placeholder="Max Chips Monthly"
//                                     onChange={(e) =>
//                                       handleInputChange(
//                                         userSite.website_access_id,
//                                         "max_chips_monthly",
//                                         e.target.value
//                                       )
//                                     }
//                                   />
//                                 </div>
//                                 <div className="col">
//                                   <input
//                                     type="text"
//                                     className="small-font white-bg rounded border-grey3 p-2 w-100"
//                                     placeholder="Chip %"
//                                     onChange={(e) =>
//                                       handleInputChange(
//                                         userSite.website_access_id,
//                                         "chip_percentage",
//                                         e.target.value
//                                       )
//                                     }
//                                   />
//                                 </div>
//                                 <div className="col">
//                                   <div className="white-bg rounded small-font">
//                                     <input
//                                       className="small-font white-bg rounded border-grey3 p-2 w-100"
//                                       placeholder="Extra Chip %"
//                                       onChange={(e) =>
//                                         handleInputChange(
//                                           userSite.website_access_id,
//                                           "extra_chips_percentage",
//                                           e.target.value
//                                         )
//                                       }
//                                     />
//                                   </div>
//                                 </div>
//                                 <div className="col-3">
//                                   <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
//                                     <input
//                                       type="text"
//                                       className="small-font bg-none p-2 w-75"
//                                       placeholder="Commission(%)"
//                                       onChange={(e) =>
//                                         handleInputChange(
//                                           userSite.website_access_id,
//                                           "downline_comm",
//                                           e.target.value
//                                         )
//                                       }
//                                     />
//                                     <span className="small-font text-center border-left3 px-1">
//                                       <b>My Comm.. 1%</b>
//                                     </span>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           )}
//                           {accountTypes[form.id]?.[
//                             userSite.website_access_id
//                           ] === "2" && (
//                             <div className="col d-flex">
//                               <div className="col position-relative mx-1">
//                                 <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
//                                   <input
//                                     className="small-font bg-none p-2 w-75"
//                                     placeholder="Downline Sharing"
//                                     onChange={(e) =>
//                                       handleInputChange(
//                                         userSite.website_access_id,
//                                         "share",
//                                         e.target.value
//                                       )
//                                     }
//                                   />
//                                   <span className="small-font text-center border-left3 px-1">
//                                     <b>My Share 10%</b>
//                                   </span>
//                                 </div>
//                               </div>
//                               <div className="col position-relative mx-1">
//                                 <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
//                                   <input
//                                     className="small-font bg-none p-2 w-75"
//                                     placeholder="Enter Commission: M.0"
//                                     onChange={(e) =>
//                                       handleInputChange(
//                                         userSite.website_access_id,
//                                         "downline_comm",
//                                         e.target.value
//                                       )
//                                     }
//                                   />
//                                   <span className="small-font text-center border-left3 px-1">
//                                     <b>My Comm.. 1%</b>
//                                   </span>
//                                 </div>
//                               </div>
//                               <div className="col position-relative mx-1">
//                                 <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
//                                   <input
//                                     className="small-font bg-none p-2 w-75"
//                                     placeholder="Casino Chip Value"
//                                     onChange={(e) =>
//                                       handleInputChange(
//                                         userSite.website_access_id,
//                                         "caschip_values",
//                                         e.target.value
//                                       )
//                                     }
//                                   />
//                                   <span className="small-font text-center border-left3 px-1">
//                                     <b className="mx-1">Cas. Chip Val 20</b>
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                           )}
//                           {accountTypes[form.id]?.[
//                             userSite.website_access_id
//                           ] === "3" && (
//                             <div className="col d-flex">
//                               <div className="col position-relative mx-1">
//                                 <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
//                                   <input
//                                     className="small-font bg-none p-2 w-75"
//                                     placeholder="Downline Sharing"
//                                     onChange={(e) =>
//                                       handleInputChange(
//                                         userSite.website_access_id,
//                                         "share",
//                                         e.target.value
//                                       )
//                                     }
//                                   />
//                                   <span className="small-font text-center border-left3 px-1">
//                                     <b>My Share 10%</b>
//                                   </span>
//                                 </div>
//                               </div>
//                               <div className="col position-relative mx-1">
//                                 <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
//                                   <input
//                                     className="small-font bg-none p-2 w-75"
//                                     placeholder="Enter Commission: M.0"
//                                     onChange={(e) =>
//                                       handleInputChange(
//                                         userSite.website_access_id,
//                                         "downline_comm",
//                                         e.target.value
//                                       )
//                                     }
//                                   />
//                                   <span className="small-font text-center border-left3 px-1">
//                                     <b>My Comm.. 1%</b>
//                                   </span>
//                                 </div>
//                               </div>
//                               <div className="col position-relative mx-1">
//                                 <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
//                                   <input
//                                     className="small-font bg-none p-2 w-75"
//                                     placeholder="Casino Chip Value"
//                                     onChange={(e) =>
//                                       handleInputChange(
//                                         userSite.website_access_id,
//                                         "caschip_values",
//                                         e.target.value
//                                       )
//                                     }
//                                   />
//                                   <span className="small-font text-center border-left3 px-1">
//                                     <b className="mx-1">Cas. Chip Val 20</b>
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       ))
//                     ) : (
//                       <p className="small-font">No user websites available</p>
//                     )
//                   ) : (
//                     <>
//                       {userWebsitesList[form.id]?.length > 0 ? (
//                         userWebsitesList[form.id].map((userSite) => (
//                           <div key={userSite.id} className="d-flex">
//                             {/* <label className="small-font my-1">
//                               User Website
//                             </label> */}
//                             <div className="col-1 input-css d-flex white-bg border-grey3 my-2">
//                               <input
//                                 type="checkbox"
//                                 className="me-2"
//                                 checked={
//                                   selectedWebsites[form.id]?.[userSite.id] ||
//                                   false
//                                 }
//                                 onChange={() =>
//                                   handleCheckboxChange(form.id, userSite.id)
//                                 }
//                               />
//                               <input
//                                 type="text"
//                                 className="small-font rounded all-none w-100"
//                                 value={userSite.web_url}
//                                 readOnly
//                               />
//                             </div>
//                             {selectedWebsites[form.id]?.[userSite.id] && (
//                               <div className="col-1 my-1">
//                                 <Select
//                                   className="small-font white-bg"
//                                   placeholder="Account Type"
//                                   options={commissionOptions}
//                                   styles={customStyles}
//                                   onChange={(selectedOption) =>
//                                     handleAccountTypeChange(
//                                       form.id,
//                                       userSite.id,
//                                       selectedOption
//                                     )
//                                   }
//                                   value={
//                                     commissionOptions.find(
//                                       (option) =>
//                                         option.value ===
//                                         accountTypes[form.id]?.[userSite.id]
//                                     ) || null
//                                   }
//                                 />
//                               </div>
//                             )}
//                             {accountTypes[form.id]?.[userSite.id] === "1" && (
//                               <div className="col-10">
//                                 <div className="d-flex">
//                                   <div className="col">
//                                     <input
//                                       type="date"
//                                       className="small-font white-bg rounded border-grey3 p-2 w-100"
//                                       onChange={(e) =>
//                                         handleInputChange(
//                                           userSite.id,
//                                           "rent_start_date",
//                                           e.target.value
//                                         )
//                                       }
//                                     />
//                                   </div>
//                                   <div className="col">
//                                     <input
//                                       type="text"
//                                       className="small-font white-bg rounded border-grey3 p-2 w-100"
//                                       placeholder="Monthly Amnt"
//                                       onChange={(e) =>
//                                         handleInputChange(
//                                           userSite.id,
//                                           "monthly_amount",
//                                           e.target.value
//                                         )
//                                       }
//                                     />
//                                   </div>
//                                   <div className="col">
//                                     <input
//                                       type="text"
//                                       className="small-font white-bg rounded border-grey3 p-2 w-100"
//                                       placeholder="Max Chips Monthly"
//                                       onChange={(e) =>
//                                         handleInputChange(
//                                           userSite.id,
//                                           "max_chips_monthly",
//                                           e.target.value
//                                         )
//                                       }
//                                     />
//                                   </div>
//                                   <div className="col">
//                                     <input
//                                       type="text"
//                                       className="small-font white-bg rounded border-grey3 p-2 w-100"
//                                       placeholder="Chip %"
//                                       onChange={(e) =>
//                                         handleInputChange(
//                                           userSite.id,
//                                           "chip_percentage",
//                                           e.target.value
//                                         )
//                                       }
//                                     />
//                                   </div>
//                                   <div className="col">
//                                     <div className="white-bg rounded small-font">
//                                       <input
//                                         className="small-font white-bg rounded border-grey3 p-2 w-100"
//                                         placeholder="Extra Chip %"
//                                         onChange={(e) =>
//                                           handleInputChange(
//                                             userSite.id,
//                                             "extra_chips_percentage",
//                                             e.target.value
//                                           )
//                                         }
//                                       />
//                                     </div>
//                                   </div>
//                                   <div className="col-3">
//                                     <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
//                                       <input
//                                         type="text"
//                                         className="small-font bg-none p-2 w-75"
//                                         placeholder="Commission(%)"
//                                         onChange={(e) =>
//                                           handleInputChange(
//                                             userSite.id,
//                                             "downline_comm",
//                                             e.target.value
//                                           )
//                                         }
//                                       />
//                                       <span className="small-font text-center border-left3 px-1">
//                                         <b>My Comm.. 1%</b>
//                                       </span>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             )}
//                             {accountTypes[form.id]?.[userSite.id] === "2" && (
//                               <div className="col d-flex">
//                                 <div className="col position-relative mx-1">
//                                   <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
//                                     <input
//                                       className="small-font bg-none p-2 w-75"
//                                       placeholder="Downline Sharing"
//                                       onChange={(e) =>
//                                         handleInputChange(
//                                           userSite.id,
//                                           "share",
//                                           e.target.value
//                                         )
//                                       }
//                                     />
//                                     <span className="small-font text-center border-left3 px-1">
//                                       <b>My Share 10%</b>
//                                     </span>
//                                   </div>
//                                 </div>
//                                 <div className="col position-relative mx-1">
//                                   <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
//                                     <input
//                                       className="small-font bg-none p-2 w-75"
//                                       placeholder="Enter Commission: M.0"
//                                       onChange={(e) =>
//                                         handleInputChange(
//                                           userSite.id,
//                                           "downline_comm",
//                                           e.target.value
//                                         )
//                                       }
//                                     />
//                                     <span className="small-font text-center border-left3 px-1">
//                                       <b>My Comm.. 1%</b>
//                                     </span>
//                                   </div>
//                                 </div>
//                                 <div className="col position-relative mx-1">
//                                   <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
//                                     <input
//                                       className="small-font bg-none p-2 w-75"
//                                       placeholder="Casino Chip Value"
//                                       onChange={(e) =>
//                                         handleInputChange(
//                                           userSite.id,
//                                           "caschip_values",
//                                           e.target.value
//                                         )
//                                       }
//                                     />
//                                     <span className="small-font text-center border-left3 px-1">
//                                       <b className="mx-1">Cas. Chip Val 20</b>
//                                     </span>
//                                   </div>
//                                 </div>
//                               </div>
//                             )}
//                             {accountTypes[form.id]?.[userSite.id] === "3" && (
//                               <div className="col d-flex">
//                                 <div className="col position-relative mx-1">
//                                   <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
//                                     <input
//                                       className="small-font bg-none p-2 w-75"
//                                       placeholder="Downline Sharing"
//                                       onChange={(e) =>
//                                         handleInputChange(
//                                           userSite.id,
//                                           "share",
//                                           e.target.value
//                                         )
//                                       }
//                                     />
//                                     <span className="small-font text-center border-left3 px-1">
//                                       <b>My Share 10%</b>
//                                     </span>
//                                   </div>
//                                 </div>
//                                 <div className="col position-relative mx-1">
//                                   <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
//                                     <input
//                                       className="small-font bg-none p-2 w-75"
//                                       placeholder="Enter Commission: M.0"
//                                       onChange={(e) =>
//                                         handleInputChange(
//                                           userSite.id,
//                                           "downline_comm",
//                                           e.target.value
//                                         )
//                                       }
//                                     />
//                                     <span className="small-font text-center border-left3 px-1">
//                                       <b>My Comm.. 1%</b>
//                                     </span>
//                                   </div>
//                                 </div>
//                                 <div className="col position-relative mx-1">
//                                   <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
//                                     <input
//                                       className="small-font bg-none p-2 w-75"
//                                       placeholder="Casino Chip Value"
//                                       onChange={(e) =>
//                                         handleInputChange(
//                                           userSite.id,
//                                           "caschip_values",
//                                           e.target.value
//                                         )
//                                       }
//                                     />
//                                     <span className="small-font text-center border-left3 px-1">
//                                       <b className="mx-1">Cas. Chip Val 20</b>
//                                     </span>
//                                   </div>
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                         ))
//                       ) : (
//                         <p className="small-font">No user websites available</p>
//                       )}
//                     </>
//                   )}
//                 </div>
//               </div>
//               <div className="d-flex py-2 align-items-center justify-content-end">
//                 <button
//                   type="button"
//                   className="cst-btn remove-btn"
//                   onClick={() => removeForm(form.id)}
//                 >
//                   <FaTrash className="me-2" /> Remove
//                 </button>
//               </div>
//             </>
//           ))}
//         </form>

//         {/* <div className="red-font  small-font fw-600 flex-center">
//           {websiteCreationErrors}
//         </div> */}
//         <button type="button" className="cst-btn" onClick={addAnotherForm}>
//           <FaPlus className="me-2" /> Add Another
//         </button>

//         <div className="d-flex justify-content-end">
//           <button
//             className="saffron-btn rounded py-2 col-1 black-text2 border-none"
//             onClick={
//               role === "management" ? handleSubmit : handleDirectorSubmit
//             }
//           >
//             Submit
//           </button>
//         </div>
//         <SuccessPopup
//           successPopupOpen={successPopupOpen}
//           setSuccessPopupOpen={setSuccessPopupOpen}
//           discription={creationDescription}
//         />
//       </div>
//     </>
//   );
// }

// export default AddNewDirectorSuperAdmin;
