import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaEye,
  FaEyeSlash,
  FaPlus,
} from "react-icons/fa";
import Select from "react-select";

import { useLocation, useNavigate } from "react-router-dom";
import { MdBlock } from "react-icons/md";
import ConfirmationPopup from "./popups/ConfirmationPopup";
import {
  getAdminWebsites,
  getCountries,
  getCurrencies,
  getDirectorDetailsById,
  updateDirectorByID,
} from "../api/apiMethods";
import { adminRoles, commissionTypes } from "../utils/enum";
import { customStyles } from "../components/ReactSelectStyles";

function EditNewDirector() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showManagementPassword, setShowManagementPassword] = useState(false);
  const [name, setName] = useState("");
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [managementPassword, setManagementPassword] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("");
  const [error, setError] = useState();
  const [countryData, setCountryData] = useState();
  const [currencyData, setCurrencyData] = useState();
  const togglePasswordVisibility = (setter) => setter((prev) => !prev);

  const location = useLocation();
  const mode = location.state?.mode || "add";
  const userId = location.state?.userId || null;
  console.log(userId, "userId");
  const GetAllCountries = () => {
    getCountries()
      .then((response) => {
        if (response?.status === true) {
          setCountryData(response?.data);
          console.log(response, "countries");
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setError(error?.message || "Not able to get Countries");
      });
  };
  const GetAllCurrencies = () => {
    getCurrencies()
      .then((response) => {
        if (response?.status === true) {
          setCurrencyData(response?.data);
          console.log(response, "countries");
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setError(error?.message || "Not able to get Countries");
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
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setError(error?.message || "Not able to get Countries");
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

  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [userWebsites, setUserWebsites] = useState([]);
  console.log(userWebsites, "userWebsites");

  const handleAdminRoleChange = (selectedOption) => {
    console.log("Selected Admin:", selectedOption);
    setSelectedAdmin(selectedOption);

    const adminData = adminWebsite.find(
      (admin) => admin.id === selectedOption.value
    );
    console.log("User Websites Found:", adminData?.userWebsites || []);
    setUserWebsites(adminData?.userWebsites || []);
  };

  const [selectedWebsites, setSelectedWebsites] = useState({});
  const [accountTypes, setAccountTypes] = useState({});

  const commissionOptions = Object.entries(commissionTypes).map(
    ([value, label]) => ({
      value: Number(value),
      label,
    })
  );
  const [comm, setComm] = useState(
    commissionOptions.map((option) => option.value)
  );

  const [forms, setForms] = useState([
    {
      id: 1,
      adminWebsite: null,
      userWebsites: [],
      selectedWebsites: {},
      accountTypes: {},
    },
  ]);
  const addAnotherForm = () => {
    setForms((prevForms) => [
      ...prevForms,
      {
        id: prevForms.length + 1,
        adminWebsite: null,
        userWebsites: [],
        selectedWebsites: {},
        accountTypes: {},
        showFullForm: false,
      },
    ]);
  };

  const [websiteDetails, setWebsiteDetails] = useState({});
  const handleCheckboxChange = (id) => {
    setSelectedWebsites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAccountTypeChange = (siteId, selectedOption) => {
    setAccountTypes((prev) => ({
      ...prev,
      [siteId]: selectedOption ? selectedOption.value : "",
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

  const formattedPayload = userWebsites
    .map((site) => {
      if (site.commission_type === 1) {
        return {
          id: site.id,
          user_paner_id: site.user_paner_id,
          admin_panel_id: site.admin_panel_id,
          commission_type: site.commission_type,
          extra_chips_percentage: site.extra_chips_percentage,
        };
      } else if (site.commission_type === 2) {
        return {
          id: site.id,
          user_paner_id: site.user_paner_id,

          admin_panel_id: site.admin_panel_id,
          commission_type: site.commission_type,
          downline_comm: site.downline_comm,
          share: site.share,
          caschip_values: site.caschip_values,
        };
      }
      return null;
    })
    .filter(Boolean);

  console.log("Formatted Payload:", formattedPayload);

  const handleSubmit = () => {
    const payload = {
      name,
      login_name: loginName,
      country_id: selectedCountryCode,

      parent_password: managementPassword,

      currency_id: selectedCurrencyCode,
      accessWebsites: formattedPayload,
    };

    console.log("Final Payload:", payload);
    updateDirectorByID(userId, payload)
      .then((response) => {
        if (response.status === true) {
          console.log(response, "RESPONSEFROMUPDATINGDIRECTOR");
        } else {
          console.log("Something error");
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

  console.log(individualDirectorData, "individualDirectorData");

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

  useEffect(() => {
    if (mode === "edit" && individualDirectorData) {
      setName(individualDirectorData.login_name || "");
      setLoginName(individualDirectorData.login_name || "");
      setSelectedCountryCode(individualDirectorData.county || "");
      setSelectedRole(individualDirectorData.type || "");
      setSelectedCurrencyCode(individualDirectorData.currency_id || "");
      setComm(
        individualDirectorData.accessWebsites?.map(
          (item) => item?.commission_type
        )
      );
      setPassword("");
      setConfirmPassword("");
      setManagementPassword("");

      if (individualDirectorData.accessWebsites.length > 0) {
        setSelectedAdmin({
          value: individualDirectorData.accessWebsites[0]?.admin_panel_id || "",
          label:
            individualDirectorData.accessWebsites[0]?.admin_panel_name || "",
        });
      }

      const mappedWebsites = individualDirectorData.accessWebsites.map(
        (site) => {
          const websiteData = {
            id: site.website_access_id,
            user_paner_id: site.user_paner_id,
            web_url: site.user_panel_url,
            admin_panel_id: site.admin_panel_id,
            commission_type: site.commission_type || "",
            rent_start_date: site.rent_start_date,
            rent_expiry_date: site.rent_expiry_date,
            chip_percentage: site.chip_percentage,
            max_chips_monthly: site.max_chips_monthly,
          };

          if (site.commission_type === 1) {
            websiteData.extra_chips_percentage = site.extra_chips_percentage;
          } else if (site.commission_type === 2) {
            websiteData.downline_comm = site.downline_comm;
            websiteData.share = site.share;
            websiteData.caschip_values = site.caschip_values;
          }

          return websiteData;
        }
      );

      setUserWebsites(mappedWebsites);

      const selectedSites = {};
      mappedWebsites.forEach((site) => {
        selectedSites[site.id] = true;
      });
      setSelectedWebsites(selectedSites);

      const mappedAccountTypes = {};
      mappedWebsites.forEach((site) => {
        mappedAccountTypes[site.id] = site.commission_type
          ? site.commission_type.toString()
          : "";
      });

      console.log("Mapped Account Types:", mappedAccountTypes);
      setAccountTypes(mappedAccountTypes);
    }
  }, [mode, individualDirectorData]);

  const handleEditChange = (adminPanelId, commissionType, key, value) => {
    setUserWebsites((prevWebsites) =>
      prevWebsites.map((site) =>
        site.admin_panel_id === adminPanelId &&
        site.commission_type === commissionType
          ? { ...site, [key]: value }
          : site
      )
    );
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
          </div>{" "}
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
          </div>{" "}
          {mode === "edit" ? null : (
            <>
              {" "}
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
          </div>
        </div>
      </div>
      <div>
        <h3 className="yellow-font medium-font mb-0">WEBSITE MARKET </h3>
        <form className="custom-form small-font p-3" onSubmit={handleSubmit}>
          <div className="row align-items-center">
            {forms.map((form, index) => (
              <>
                <div key={form.id} className="w-20">
                  <label className="small-font my-1">Admin Website</label>
                  <div className="d-flex align-items-center">
                    <div className="custom-select-wrapper">
                      <Select
                        className="small-font"
                        placeholder="Select"
                        options={adminWebsite?.map((admin) => ({
                          value: admin.id,
                          label: admin.web_name,
                        }))}
                        value={selectedAdmin}
                        onChange={(selectedAdmin) =>
                          handleAdminRoleChange(selectedAdmin)
                        }
                      />
                    </div>
                    <MdBlock
                      className={form.status === 1 ? "clr-red" : "green-clr"}
                    />
                  </div>
                </div>
                {/* User Websites */}
                <div className="col-12">
                  <label className="small-font my-1">User Website</label>
                  {userWebsites.length > 0 ? (
                    userWebsites.map((userSite) => (
                      <div key={userSite.id} className="w-100 row">
                        <div className="col-2 input-css d-flex white-bg border-grey3 my-2">
                          {mode === "edit" ? null : (
                            <input
                              type="checkbox"
                              className="me-2"
                              onChange={() => handleCheckboxChange(userSite.id)}
                            />
                          )}

                          <input
                            type="text"
                            className="small-font rounded all-none w-100"
                            value={userSite.web_url}
                            readOnly
                          />
                          <MdBlock className="green-clr large-font" />
                        </div>
                        {/* Account Type Dropdown */}
                        {selectedWebsites[userSite.id] && (
                          <div className="col-1 my-1">
                            <Select
                              className="small-font white-bg"
                              placeholder="Account Type"
                              options={commissionOptions}
                              styles={customStyles}
                              maxMenuHeight={120}
                              onChange={(selectedOption) =>
                                handleAccountTypeChange(
                                  userSite.id,
                                  selectedOption.value
                                )
                              }
                              value={
                                commissionOptions.find(
                                  (option) =>
                                    option.value === userSite.commission_type
                                ) || null
                              }
                            />
                          </div>
                        )}
                        {userSite.commission_type === 1 && (
                          <div className="col-9">
                            <div className="row">
                              <div className="col">
                                <input
                                  type="date"
                                  className="small-font white-bg rounded border-grey3 p-2 w-100"
                                  value={userSite.rent_start_date || ""}
                                  onChange={(e) =>
                                    handleEditChange(
                                      userSite.admin_panel_id,
                                      userSite.commission_type,
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
                                  value={userSite.monthly_amount || ""}
                                  onChange={(e) =>
                                    handleEditChange(
                                      userSite.admin_panel_id,
                                      userSite.commission_type,
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
                                  value={userSite.max_chips_monthly || ""}
                                  onChange={(e) =>
                                    handleEditChange(
                                      userSite.admin_panel_id,
                                      userSite.commission_type,
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
                                  value={userSite.chip_percentage || ""}
                                  onChange={(e) =>
                                    handleEditChange(
                                      userSite.admin_panel_id,
                                      userSite.commission_type,
                                      "chip_percentage",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="col">
                                <input
                                  type="text"
                                  className="small-font white-bg rounded border-grey3 p-2 w-100"
                                  placeholder="Extra Chip %"
                                  value={userSite.extra_chips_percentage || ""}
                                  onChange={(e) =>
                                    handleEditChange(
                                      userSite.admin_panel_id,
                                      userSite.commission_type,
                                      "extra_chips_percentage",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="col-3">
                                <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
                                  <input
                                    type="text"
                                    className="small-font bg-none p-2 w-75"
                                    placeholder="Commission(%)"
                                    value={userSite.share || ""}
                                    onChange={(e) =>
                                      handleEditChange(
                                        userSite.admin_panel_id,
                                        userSite.commission_type,
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
                        {userSite.commission_type === 2 && (
                          <div className="col d-flex">
                            <div className="col position-relative mx-1">
                              {/* <label className="small-font my-1">
                            Downline Sharing
                          </label> */}
                              <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
                                <input
                                  className="small-font bg-none p-2 w-75"
                                  placeholder="Downline Sharing"
                                  onChange={(e) =>
                                    handleEditChange(
                                      userSite.admin_panel_id,
                                      userSite.commission_type,
                                      "downline_comm",
                                      e.target.value
                                    )
                                  }
                                  value={userSite?.downline_comm}
                                />
                                <span className="small-font text-center border-left3 px-1">
                                  <b>My Share 10%</b>
                                </span>
                              </div>
                            </div>
                            <div className="col position-relative mx-1">
                              {/* <label className="small-font my-1">
                            Commission: M.O
                          </label> */}
                              <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
                                <input
                                  className="small-font bg-none p-2 w-75"
                                  placeholder="Enter Commission: M.0"
                                  onChange={(e) =>
                                    handleEditChange(
                                      userSite.admin_panel_id,
                                      userSite.commission_type,
                                      "share",
                                      e.target.value
                                    )
                                  }
                                  value={userSite?.share}
                                />
                                <span className="small-font text-center border-left3 px-1">
                                  <b>My Comm.. 1%</b>
                                </span>
                              </div>
                            </div>
                            <div className="col position-relative mx-1">
                              {/* <label className="small-font my-1">
                            Commission: M.O
                          </label> */}
                              <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
                                <input
                                  className="small-font bg-none p-2 w-75"
                                  placeholder="Casino Chip Value"
                                  onChange={(e) =>
                                    handleEditChange(
                                      userSite.admin_panel_id,
                                      userSite.commission_type,
                                      "caschip_values",
                                      e.target.value
                                    )
                                  }
                                  value={userSite?.caschip_values}
                                />
                                <span className="small-font text-center border-left3 px-1">
                                  <b className="mx-1">Cas. Chip Val 20</b>
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                        {userSite.commission_type === 3 && (
                          <div className="col d-flex">
                            <div className="col position-relative mx-1">
                              {/* <label className="small-font my-1">
                            Downline Sharing
                          </label> */}
                              <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
                                <input
                                  className="small-font bg-none p-2 w-75"
                                  placeholder="Downline Sharing"
                                  onChange={(e) =>
                                    handleEditChange(
                                      userSite.admin_panel_id,
                                      userSite.commission_type,
                                      "downline_comm",
                                      e.target.value
                                    )
                                  }
                                  value={userSite?.downline_comm}
                                />
                                <span className="small-font text-center border-left3 px-1">
                                  <b>My Share 10%</b>
                                </span>
                              </div>
                            </div>
                            <div className="col position-relative mx-1">
                              {/* <label className="small-font my-1">
                            Commission: M.O
                          </label> */}
                              <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
                                <input
                                  className="small-font bg-none p-2 w-75"
                                  placeholder="Enter Commission: M.0"
                                  onChange={(e) =>
                                    handleEditChange(
                                      userSite.admin_panel_id,
                                      userSite.commission_type,
                                      "share",
                                      e.target.value
                                    )
                                  }
                                  value={userSite?.share}
                                />
                                <span className="small-font text-center border-left3 px-1">
                                  <b>My Comm.. 1%</b>
                                </span>
                              </div>
                            </div>
                            <div className="col position-relative mx-1">
                              {/* <label className="small-font my-1">
                            Commission: M.O
                          </label> */}
                              <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
                                <input
                                  className="small-font bg-none p-2 w-75"
                                  placeholder="Casino Chip Value"
                                  onChange={(e) =>
                                    handleEditChange(
                                      userSite.admin_panel_id,
                                      userSite.commission_type,
                                      "caschip_values",
                                      e.target.value
                                    )
                                  }
                                  value={userSite?.caschip_values}
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
              Update Details <FaArrowRight />
            </button>
          </div>
        </form>
        <ConfirmationPopup />
      </div>
    </>
  );
}

export default EditNewDirector;
