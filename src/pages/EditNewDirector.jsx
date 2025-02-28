import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaEye, FaEyeSlash, FaPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAdminWebsites,
  getCountries,
  getCurrencies,
  getDirectorAccessWebites,
  getDirectorDetailsById,
  getSuperAdminDetailsById,
  updateDirectorByID,
  updateSuperAdminByID,
} from "../api/apiMethods";
import { adminRoles, commissionTypes } from "../utils/enum";
import SuccessPopup from "./popups/SuccessPopup";
import Select from "react-select";
import { customStyles } from "../components/ReactSelectStyles";

function EditNewDirector() {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode || "add";
  const userId = location.state?.userId || null;
  const Role = localStorage.getItem("role_code");
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [showManagementPassword, setShowManagementPassword] = useState(false);
  const [name, setName] = useState("");
  const [loginName, setLoginName] = useState("");
  const [managementPassword, setManagementPassword] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [currencyData, setCurrencyData] = useState([]);
  const [adminWebsite, setAllAdminWebsite] = useState([]);
  const [individualDirectorData, setIndividualDirectorData] = useState(null);
  const [individualSuperAdminData, setIndividualSuperAdminData] =
    useState(null);
  const [websiteDetails, setWebsiteDetails] = useState({});
  console.log(websiteDetails, "websiteDetails");
  const [selectedRole, setSelectedRole] = useState("");
  const [userWebsites, setUserWebsites] = useState([]);
  console.log(userWebsites, "userWebsites");
  const [addWebsites, setAddWebsites] = useState([]);
  const [forms, setForms] = useState([]);
  const role = localStorage.getItem("role_code");
  console.log(userWebsites, "userWebsites");
  const togglePasswordVisibility = (setter) => setter((prev) => !prev);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [countries, currencies, websites] = await Promise.all([
          getCountries(),
          getCurrencies(),
          getAdminWebsites(),
        ]);

        if (countries?.status) setCountryData(countries.data);
        if (currencies?.status) setCurrencyData(currencies.data);
        if (websites?.status) setAllAdminWebsite(websites.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const validateForm = () => {
    const errors = {};

    if (!name) errors.name = "Name is required";
    if (!loginName) errors.loginName = "Login Name is required";
    if (!selectedRole) errors.selectedRole = "Role is required";
    if (!selectedCurrencyCode)
      errors.selectedCurrencyCode = "Currency is required";
    if (!selectedCountryCode)
      errors.selectedCountryCode = "Country is required";
    if (!managementPassword)
      errors.managementPassword = "Management Password is required";

    // Add more validation rules as needed

    return errors;
  };
  useEffect(() => {
    if (userId) {
      if (Role === "management") {
        getDirectorDetailsById(userId)
          .then((response) => {
            if (response.status) {
              setIndividualDirectorData(response.data);
              setName(response.data.login_name || "");
              setLoginName(response.data.login_name || "");
              setSelectedCountryCode(response.data.county || "");
              setSelectedRole(response.data.type || "");
              setSelectedCurrencyCode(response.data.currency_id || "");

              if (response.data.accessWebsites.length > 0) {
                const updatedUserWebsites = response.data.accessWebsites.map(
                  (site) => {
                    const basePayload = {
                      id: site.website_access_id,
                      user_paner_id: site.user_paner_id,
                      web_url: site.user_panel_url,
                      admin_panel_id: site.admin_panel_id,
                      commission_type: site.commission_type || "",
                    };

                    switch (site.commission_type) {
                      case 1:
                        return {
                          ...basePayload,
                          extra_chips_percentage:
                            site.extra_chips_percentage || "",
                        };
                      case 2:
                        return {
                          ...basePayload,
                          downline_comm: site.downline_comm || "",
                          share: site.share || "",
                          caschip_values: site.caschip_values || "",
                        };
                      case 3:
                        return {
                          ...basePayload,
                          downline_comm: site.downline_comm || "",
                          share: site.share || "",
                          caschip_values: site.caschip_values || "",
                        };
                      case 4:
                        return {
                          ...basePayload,
                          someField: site.someField || "",
                          anotherField: site.anotherField || "",
                        };
                      default:
                        return basePayload;
                    }
                  }
                );

                setUserWebsites(updatedUserWebsites);
              }
            }
          })
          .catch((error) =>
            console.error("Error fetching director details:", error)
          );
      } else if (Role === "director") {
        getSuperAdminDetailsById(userId)
          .then((response) => {
            if (response.status) {
              setIndividualSuperAdminData(response.data);
              setName(response.data.login_name || "");
              setLoginName(response.data.login_name || "");
              setSelectedCountryCode(response.data.county || "");
              setSelectedRole(response.data.type || "");
              setSelectedCurrencyCode(response.data.currency_id || "");

              if (response.data.accessWebsites.length > 0) {
                const updatedUserWebsites = response.data.accessWebsites.map(
                  (site) => {
                    const basePayload = {
                      id: site.website_access_id,
                      user_paner_id: site.user_paner_id,
                      web_url: site.user_panel_url,
                      admin_panel_id: site.admin_panel_id,
                      commission_type: site.commission_type || "",
                    };

                    switch (site.commission_type) {
                      case 1:
                        return {
                          ...basePayload,
                          extra_chips_percentage:
                            site.extra_chips_percentage || "",
                        };
                      case 2:
                        return {
                          ...basePayload,
                          downline_comm: site.downline_comm || "",
                          share: site.share || "",
                          caschip_values: site.caschip_values || "",
                        };
                      case 3:
                        return {
                          ...basePayload,
                          downline_comm: site.downline_comm || "",
                          share: site.share || "",
                          caschip_values: site.caschip_values || "",
                        };
                      case 4:
                        return {
                          ...basePayload,
                          someField: site.someField || "",
                          anotherField: site.anotherField || "",
                        };
                      default:
                        return basePayload;
                    }
                  }
                );

                setUserWebsites(updatedUserWebsites);
              }
            }
          })
          .catch((error) =>
            console.error("Error fetching super admin details:", error)
          );
      }
    }
  }, [mode, userId]);
  const handleManagementSubmit = () => {
    const payload = {
      type: parseInt(selectedRole),
      country_id: parseInt(selectedCountryCode),
      currency_id: parseInt(selectedCurrencyCode),
      name: name,
      login_name: loginName,
      parent_password: managementPassword,

      accessWebsites: userWebsites.map((site) => {
        const commissionType = parseInt(site.commission_type);
        console.log(commissionType, "commissionType");
        return {
          id: site.id,
          admin_panel_id: parseInt(site.admin_panel_id),
          user_paner_id: parseInt(site.user_paner_id),
          commission_type: commissionType,
          ...(commissionType === 1
            ? { extra_chips_percentage: site.extra_chips_percentage || null }
            : {
                share: site.share || null,

                downline_comm: site.downline_comm || null,
              }),
        };
      }),
      addWebsites: Object.keys(websiteDetails).map((key) => {
        const commissionType = parseInt(accountTypes[1]?.[key]);
        const adminPanelId = selectedAdmins[1]?.value;
        console.log(adminPanelId, "adminPanelId");

        const websiteData = {
          admin_panel_id: adminPanelId,
          user_paner_id: parseInt(key),
          commission_type: commissionType,
        };

        if (commissionType === 1) {
          websiteData.rent_start_date =
            websiteDetails[key]?.rent_start_date || null;
          websiteData.monthly_amount =
            parseInt(websiteDetails[key]?.monthly_amount) || null;
          websiteData.max_chips_monthly =
            parseInt(websiteDetails[key]?.max_chips_monthly) || null;
          websiteData.chip_percentage =
            parseFloat(websiteDetails[key]?.chip_percentage) || null;
          websiteData.extra_chips_percentage =
            parseFloat(websiteDetails[key]?.extra_chips_percentage) || null;
          websiteData.downline_comm =
            parseFloat(websiteDetails[key]?.downline_comm) || null;
        } else if (commissionType === 2 || commissionType === 3) {
          websiteData.share = parseFloat(websiteDetails[key]?.share) || null;
          websiteData.caschip_values =
            parseFloat(websiteDetails[key]?.caschip_values) || null;
          websiteData.downline_comm =
            parseFloat(websiteDetails[key]?.downline_comm) || null;
        }

        return websiteData;
      }),
    };

    console.log(payload, "=====>payload");

    updateDirectorByID(userId, payload)
      .then((response) => {
        if (response.status) {
          setSuccessPopupOpen(true);
          setTimeout(() => navigate("/director-admin"), 2000);
        }
      })
      .catch((error) => console.error("Error updating director:", error));
  };
  const handleDirectorSubmit = () => {
    console.log("Selected Websites:", selectedWebsites);
    console.log("Account Types:", accountTypes);
    console.log("User Websites List:", userWebsitesList);

    const payload = {
      type: parseInt(selectedRole),
      country_id: parseInt(selectedCountryCode),
      currency_id: parseInt(selectedCurrencyCode),
      name: name,
      login_name: loginName,
      parent_password: managementPassword,
      accessWebsites: userWebsites.map((site) => ({
        id: site.id,
        admin_panel_id: parseInt(site.admin_panel_id),
        user_paner_id: parseInt(site.user_paner_id),
        commission_type: parseInt(site.commission_type),
      })),
      addWebsites: forms
        .flatMap((form) => {
          return userWebsitesList[form.id]?.map((userSite) => {
            if (!selectedWebsites[form.id]?.[userSite.website_access_id])
              return null;

            const accotypeid =
              accountTypes[form.id]?.[userSite.website_access_id];
            console.log(userSite, "userSite");
            let websiteData = {
              admin_panel_id: selectedOption?.value,
              user_paner_id: userSite.user_WebSite_id,
              commission_type: accotypeid,
            };

            console.log(websiteData, "websiteData");

            if (accotypeid === "2" || accotypeid === "3") {
              websiteData.share = parseFloat(
                websiteDetails[userSite.website_access_id]?.share || 0
              );
              websiteData.caschip_values = parseFloat(
                websiteDetails[userSite.website_access_id]?.caschip_values || 0
              );
              websiteData.downline_comm = parseFloat(
                websiteDetails[userSite.website_access_id]?.downline_comm || 0
              );
            }

            if (accotypeid === "1") {
              websiteData.rent_start_date =
                websiteDetails[userSite.website_access_id]?.rent_start_date ||
                "";
              websiteData.monthly_amount = parseInt(
                websiteDetails[userSite.website_access_id]?.monthly_amount || 0
              );
              websiteData.chip_percentage = parseFloat(
                websiteDetails[userSite.website_access_id]?.chip_percentage || 0
              );
              websiteData.max_chips_monthly = parseInt(
                websiteDetails[userSite.website_access_id]?.max_chips_monthly ||
                  0
              );
              websiteData.extra_chips_percentage = parseFloat(
                websiteDetails[userSite.website_access_id]
                  ?.extra_chips_percentage || 0
              );
              websiteData.downline_comm = parseFloat(
                websiteDetails[userSite.website_access_id]?.downline_comm || 0
              );
            }

            return websiteData;
          });
        })
        .filter(Boolean),
    };

    console.log("Payload:", payload);

    updateSuperAdminByID(userId, payload)
      .then((response) => {
        if (response.status) {
          setSuccessPopupOpen(true);
          setTimeout(() => navigate("/director-admin"), 2000);
        }
      })
      .catch((error) => console.error("Error updating director:", error));
  };

  const adminRolesArray = Object.entries(adminRoles).map(([id, name]) => ({
    id,
    name,
  }));
  console.log(adminRolesArray, "adminRolesArray");
  const transformData = (data) => {
    const adminMap = new Map();

    data?.accessWebsites.forEach((site) => {
      const adminKey = site.admin_panel_id;

      if (!adminMap.has(adminKey)) {
        adminMap.set(adminKey, {
          web_name: site.admin_panel_name,
          userWebsites: [],
        });
      }

      adminMap.get(adminKey).userWebsites.push({
        web_name: site.user_panel_name,
        commission_type: site.commission_type,
        extra_chips_percentage: site.extra_chips_percentage,
        share: site.share,
        downline_comm: site.downline_comm,
        caschip_values: site.caschip_values,
      });
    });

    return Array.from(adminMap.values());
  };
  let adminWebsites;

  if (Role === "management") {
    adminWebsites = transformData(individualDirectorData);
  } else if (Role === "director") {
    adminWebsites = transformData(individualSuperAdminData);
  }

  const [selectedAdmins, setSelectedAdmins] = useState({});
  const [userWebsitesList, setUserWebsitesList] = useState({});
  const [selectedWebsites, setSelectedWebsites] = useState({});
  const [accountTypes, setAccountTypes] = useState({});

  const [errors, setErrors] = useState({});
  console.log(selectedAdmins, "selectedAdmins");

  const [selectedOption, setSelectedOption] = useState(null);
  console.log(userWebsitesList, "userWebsitesList");

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
    getCurrencies()
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
  const [allAccessWebsites, setAllAccessWebsites] = useState(false);
  console.log(allAccessWebsites, "allAccessWebsites");

  const GetAllAccessedWebsites = () => {
    getDirectorAccessWebites()
      .then((response) => {
        if (response.status === true) {
          console.log(response, "Response From Accessed Websites");
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

  const handleInputChange = (id, field, value) => {
    setWebsiteDetails((prevDetails) => ({
      ...prevDetails,
      [id]: {
        ...prevDetails[id],
        [field]: value,
      },
    }));
  };
  console.log(selectedOption, "selectedOption");
  const addAnotherForm = () => {
    const newForm = { id: Date.now() };
    setForms((prevForms) => [...prevForms, newForm]);

    setAddWebsites((prevAddWebsites) => [
      ...prevAddWebsites,
      {
        id: newForm.id,
        admin_panel_id: null,
        user_paner_id: null,
        commission_type: null,
        share: null,
        caschip_values: null,
        downline_comm: null,
      },
    ]);
  };
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
      return userRole.name === "director" || userRole.name === "SuperAdmin";
    } else if (role === "director") {
      return userRole.name === "SuperAdmin";
    }
    return false;
  });
  return (
    <>
      <div>
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="yellow-font fw-bold">
            {mode === "edit" ? `Edit  ${role}` : `Add ${role}`}
            {/* {mode === "edit"
              ? "Edit Director & Super Admin"
              : "Add Director & Super Admin"} */}
          </h5>
          <span
            className="yellow-font cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft /> Go Back
          </span>
        </div>

        {/* Input fields for director details */}
        <div className="p-1">
          {" "}
          <div className="row">
            {" "}
            <div className="col p-1">
              <label className="small-font my-1">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="border-grey3 small-font rounded all-none input-css white-bg w-100"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {errors.name && (
                <span className="text-danger small-font">{errors.name}</span>
              )}
            </div>
            <div className="col p-1">
              <label className="small-font my-1">Login Name</label>
              <input
                type="text"
                placeholder="Enter Login Name"
                className="border-grey3 small-font rounded all-none input-css white-bg w-100"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                required
              />
              {errors.loginName && (
                <span className="text-danger small-font">
                  {errors.loginName}
                </span>
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
                    {role.name}
                  </option>
                ))}
                {/* {adminRolesArray
                  .filter((role) => {
                    if (selectedRole === "1") {
                      // If Director is selected, exclude Director
                      return role.name !== "director";
                    } else if (selectedRole === "management") {
                      // If Management is selected, show only Director and SuperAdmin
                      return (
                        role.name === "director" || role.name === "SuperAdmin"
                      );
                    }
                    return true; // Default case, show all roles
                  })
                  .map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))} */}
              </select>
              {errors.selectedRole && (
                <span className="text-danger small-font">
                  {errors.selectedRole}
                </span>
              )}
            </div>
            <div className="col p-1">
              <label className="small-font my-1">Currency</label>
              <select
                className="small-font rounded all-none input-css white-bg border-grey3 w-100"
                value={selectedCurrencyCode}
                onChange={(e) => setSelectedCurrencyCode(e.target.value)}
              >
                <option value="">Select</option>
                {currencyData.map((currency) => (
                  <option key={currency.country_id} value={currency.country_id}>
                    {currency.currency_name}--- {currency.name}
                  </option>
                ))}
              </select>
              {errors.selectedCurrencyCode && (
                <span className="text-danger small-font">
                  {errors.selectedCurrencyCode}
                </span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-3 p-1">
              <label className="small-font my-1">Country</label>
              <select
                className="small-font rounded all-none input-css white-bg border-grey3 w-100"
                value={selectedCountryCode}
                onChange={(e) => setSelectedCountryCode(e.target.value)}
              >
                <option value="">Select</option>
                {countryData.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.selectedCountryCode && (
                <span className="text-danger small-font">
                  {errors.selectedCountryCode}
                </span>
              )}
            </div>

            <div className="p-1  col-3 position-relative">
              <label className="small-font my-1">Management Password</label>
              <input
                type="password"
                className="border-grey3 small-font rounded all-none input-css white-bg w-100"
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
            {errors.managementPassword && (
              <span className="text-danger small-font">
                {errors.managementPassword}
              </span>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="yellow-font medium-font mb-0">WEBSITE MARKET</h3>
        <form className="custom-form small-font p-3">
          <div className="row align-items-center">
            {adminWebsites?.map((data, index) => (
              <div key={index} className="box-shadow p-2 my-2 rounded">
                <div className="w-15 no-cursor">
                  <label className="small-font my-1">Admin Website</label>
                  <div className="d-flex align-items-center">
                    <select
                      className="small-font white-bg rounded border-grey3 p-2 w-100 no-cursor"
                      disabled
                    >
                      <option value={data.web_name}>{data.web_name}</option>
                    </select>
                  </div>
                </div>

                {userWebsites?.map((userWebsite, userIndex) => (
                  <div key={userIndex} className="w-100 mt-3 row">
                    <div className="col-2 d-flex flex-column">
                      <label className="small-font my-1">User Website</label>
                      <select
                        className="small-font w-100 white-bg rounded border-grey3 p-2 no-cursor"
                        disabled
                      >
                        <option value={userWebsite.web_url}>
                          {userWebsite.web_url}
                        </option>
                      </select>
                    </div>
                    <div className="col-2">
                      <label className="small-font my-1">Commission Type</label>
                      <div className="d-flex align-items-center">
                        <select
                          className="small-font white-bg rounded border-grey3 p-2 w-100"
                          value={userWebsite.commission_type}
                          disabled
                          onChange={(e) => {
                            const updatedUserWebsites = [...userWebsites];
                            updatedUserWebsites[userIndex].commission_type =
                              e.target.value;
                            setUserWebsites(updatedUserWebsites);
                          }}
                        >
                          {Object.entries(commissionTypes).map(
                            ([value, label]) => (
                              <option key={value} value={value}>
                                {label}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                    {userWebsite.commission_type === 1 && (
                      <div className="col-2">
                        <label className="small-font my-1">Extra Chips %</label>
                        <input
                          className="small-font white-bg rounded border-grey3 p-2 w-100"
                          value={userWebsite.extra_chips_percentage || ""}
                          onChange={(e) => {
                            const updatedWebsites = [...userWebsites];
                            updatedWebsites[userIndex] = {
                              ...updatedWebsites[userIndex],
                              extra_chips_percentage: e.target.value,
                            };
                            setUserWebsites(updatedWebsites);
                          }}
                        />
                      </div>
                    )}
                    {userWebsite.commission_type === 2 && (
                      <>
                        <div className="col-2">
                          <label className="small-font my-1">
                            Downline Share
                          </label>
                          <input
                            className="small-font white-bg rounded border-grey3 p-2 w-100"
                            value={userWebsite.share || ""}
                            onChange={(e) => {
                              const updatedWebsites = [...userWebsites];
                              updatedWebsites[userIndex] = {
                                ...updatedWebsites[userIndex],
                                share: e.target.value,
                              };
                              setUserWebsites(updatedWebsites);
                            }}
                          />
                        </div>
                        <div className="col-2">
                          <label className="small-font my-1">
                            Downline Comm
                          </label>
                          <input
                            className="small-font white-bg rounded border-grey3 p-2 w-100"
                            value={userWebsite.downline_comm || ""}
                            onChange={(e) => {
                              const updatedWebsites = [...userWebsites];
                              updatedWebsites[userIndex] = {
                                ...updatedWebsites[userIndex],
                                downline_comm: e.target.value,
                              };
                              setUserWebsites(updatedWebsites);
                            }}
                          />
                        </div>
                        <div className="col-2">
                          <label className="small-font my-1">
                            Caschip Values
                          </label>
                          <input
                            className="small-font white-bg rounded border-grey3 p-2 w-100"
                            value={userWebsite.caschip_values || ""}
                            onChange={(e) => {
                              const updatedWebsites = [...userWebsites];
                              updatedWebsites[userIndex] = {
                                ...updatedWebsites[userIndex],
                                caschip_values: e.target.value,
                              };
                              setUserWebsites(updatedWebsites);
                            }}
                          />
                        </div>
                      </>
                    )}
                    {userWebsite.commission_type === 3 && (
                      <>
                        <div className="col-2">
                          <label className="small-font my-1">
                            Downline Share
                          </label>
                          <input
                            className="small-font white-bg rounded border-grey3 p-2 w-100"
                            value={userWebsite.share || ""}
                            onChange={(e) => {
                              const updatedWebsites = [...userWebsites];
                              updatedWebsites[userIndex] = {
                                ...updatedWebsites[userIndex],
                                share: e.target.value,
                              };
                              setUserWebsites(updatedWebsites);
                            }}
                          />
                        </div>
                        <div className="col-2">
                          <label className="small-font my-1">
                            Downline Comm
                          </label>
                          <input
                            className="small-font white-bg rounded border-grey3 p-2 w-100"
                            value={userWebsite.downline_comm || ""}
                            onChange={(e) => {
                              const updatedWebsites = [...userWebsites];
                              updatedWebsites[userIndex] = {
                                ...updatedWebsites[userIndex],
                                downline_comm: e.target.value,
                              };
                              setUserWebsites(updatedWebsites);
                            }}
                          />
                        </div>
                        <div className="col-2">
                          <label className="small-font my-1">
                            Caschip Values
                          </label>
                          <input
                            className="small-font white-bg rounded border-grey3 p-2 w-100"
                            value={userWebsite.caschip_values || ""}
                            onChange={(e) => {
                              const updatedWebsites = [...userWebsites];
                              updatedWebsites[userIndex] = {
                                ...updatedWebsites[userIndex],
                                caschip_values: e.target.value,
                              };
                              setUserWebsites(updatedWebsites);
                            }}
                          />
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))}

            {forms.map((form, index) => (
              <>
                <h5 className="yellow-font fw-bold mb-0">
                  ADD WEBSITE MARKET{" "}
                </h5>
                <div key={form.id}>
                  {role === "director" ? (
                    <div className="col-1">
                      <label className="small-font my-1">Admin Website</label>
                      <div className="custom-select-wrapper">
                        <Select
                          className="small-font"
                          placeholder="Select"
                          options={transformedOptions}
                          value={selectedOption}
                          onChange={(selectedOption) => {
                            console.log("Selected Option:", selectedOption);

                            setSelectedOption(selectedOption);

                            const selectedAdmin = allAccessWebsites
                              .flatMap((access) => access.admin_websites)
                              .find(
                                (admin) =>
                                  admin.admin_panel_id === selectedOption?.value
                              );

                            console.log("Selected Admin:", selectedAdmin);

                            setUserWebsitesList((prev) => {
                              const updatedList = {
                                ...prev,
                                [form.id]: selectedAdmin
                                  ? selectedAdmin.users
                                  : [],
                              };
                              console.log(
                                "Updated User Websites List:",
                                updatedList
                              );
                              return updatedList;
                            });
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
                  )}
                </div>
                <div className="col-11">
                  <label className="small-font my-1">User Website</label>
                  {role === "director" && selectedOption ? (
                    userWebsitesList[form.id]?.length > 0 ? (
                      userWebsitesList[form.id].map((userSite) => (
                        <div key={userSite.website_access_id} className="row">
                          {/* Checkbox for Selecting User Website */}
                          <div>hi:{userSite.user_panel}</div>
                          <span>{userSite.website_access_id}</span>
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
                              <div className="row">
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
                                <div className="col">
                                  <div className="white-bg rounded small-font">
                                    <input
                                      className="small-font white-bg rounded border-grey3 p-2 w-100"
                                      placeholder="Extra Chip %"
                                      onChange={(e) =>
                                        handleInputChange(
                                          userSite.website_access_id,
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
                    </div>
                  )}
                </div>
              </>
            ))}
          </div>
        </form>
        <div className="text-end mb-3 w-100">
          <button type="button" className="cst-btn" onClick={addAnotherForm}>
            <FaPlus className="me-2" /> Add Another
          </button>
        </div>

        <div className="d-flex justify-content-end">
          <button
            className="saffron-btn rounded"
            type="button"
            onClick={
              Role === "management"
                ? handleManagementSubmit
                : handleDirectorSubmit
            }
          >
            Update Details
          </button>
        </div>
        <SuccessPopup
          successPopupOpen={successPopupOpen}
          setSuccessPopupOpen={setSuccessPopupOpen}
          discription={`Updated ${selectedRole} ${loginName} Successfully`}
        />
      </div>
    </>
  );
}

export default EditNewDirector;
