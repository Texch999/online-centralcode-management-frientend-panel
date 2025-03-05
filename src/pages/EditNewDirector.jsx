import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaEye,
  FaEyeSlash,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
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
  const [selectedRole, setSelectedRole] = useState("");
  const [userWebsites, setUserWebsites] = useState([]);
  const [websiteEditErrors, setShowWebsiteEditErrors] = useState(null);
  const [addWebsites, setAddWebsites] = useState([]);
  const [forms, setForms] = useState([]);
  const role = localStorage.getItem("role_code");
  const togglePasswordVisibility = (setter) => setter((prev) => !prev);

  console.log(websiteEditErrors, "==>websiteEditErrors");

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
  // useEffect(() => {
  //   if (userId) {
  //     if (Role === "management") {
  //       getDirectorDetailsById(userId)
  //         .then((response) => {
  //           if (response.status) {
  //             setIndividualDirectorData(response.data);
  //             setName(response.data.login_name || "");
  //             setLoginName(response.data.login_name || "");
  //             setSelectedCountryCode(response.data.county || "");
  //             setSelectedRole(response.data.type || "");
  //             setSelectedCurrencyCode(response.data.currency_id || "");

  //             if (response.data.accessWebsites.length > 0) {
  //               const updatedUserWebsites = response.data.accessWebsites.map(
  //                 (site) => {
  //                   const basePayload = {
  //                     id: site.website_access_id,
  //                     user_paner_id: site.user_paner_id,
  //                     web_url: site.user_panel_url,
  //                     admin_panel_id: site.admin_panel_id,
  //                     commission_type: site.commission_type || "",
  //                     status: site.status === 1 ? "Active" : "Inactive", // Add status field
  //                   };

  //                   switch (site.commission_type) {
  //                     case 1:
  //                       return {
  //                         ...basePayload,
  //                         extra_chips_percentage:
  //                           site.extra_chips_percentage || "",
  //                       };
  //                     case 2:
  //                       return {
  //                         ...basePayload,
  //                         downline_comm: site.downline_comm || "",
  //                         share: site.share || "",
  //                         caschip_values: site.caschip_values || "",
  //                       };
  //                     case 3:
  //                       return {
  //                         ...basePayload,
  //                         downline_comm: site.downline_comm || "",
  //                         share: site.share || "",
  //                         caschip_values: site.caschip_values || "",
  //                       };
  //                     case 4:
  //                       return {
  //                         ...basePayload,
  //                         someField: site.someField || "",
  //                         anotherField: site.anotherField || "",
  //                       };
  //                     default:
  //                       return basePayload;
  //                   }
  //                 }
  //               );

  //               setUserWebsites(updatedUserWebsites);
  //             }
  //           }
  //         })
  //         .catch((error) =>
  //           console.error("Error fetching director details:", error)
  //         );
  //     } else if (Role === "director") {
  //       getSuperAdminDetailsById(userId)
  //         .then((response) => {
  //           if (response.status) {
  //             setIndividualSuperAdminData(response.data);
  //             setName(response.data.login_name || "");
  //             setLoginName(response.data.login_name || "");
  //             setSelectedCountryCode(response.data.county || "");
  //             setSelectedRole(response.data.type || "");
  //             setSelectedCurrencyCode(response.data.currency_id || "");

  //             if (response.data.accessWebsites.length > 0) {
  //               const updatedUserWebsites = response.data.accessWebsites.map(
  //                 (site) => {
  //                   const basePayload = {
  //                     id: site.website_access_id,
  //                     user_paner_id: site.user_paner_id,
  //                     web_url: site.user_panel_url,
  //                     admin_panel_id: site.admin_panel_id,
  //                     commission_type: site.commission_type || "",
  //                     status: site.status === 1 ? "Active" : "Inactive", // Add status field
  //                   };

  //                   switch (site.commission_type) {
  //                     case 1:
  //                       return {
  //                         ...basePayload,
  //                         extra_chips_percentage:
  //                           site.extra_chips_percentage || "",
  //                         is_casino: site.is_casino,
  //                         rent_start_date: site.rent_start_date,
  //                         downline_comm: site.downline_comm,
  //                         rent_expiry_date: site.rent_expiry_date,
  //                         monthly_amount: site.monthly_amount,
  //                         max_chips_monthly: site.max_chips_monthly,
  //                         chip_percentage: site.chip_percentage,
  //                       };
  //                     case 2:
  //                       return {
  //                         ...basePayload,
  //                         downline_comm: site.downline_comm || "",
  //                         share: site.share || "",
  //                         caschip_values: site.caschip_values || "",

  //                       };
  //                     case 3:
  //                       return {
  //                         ...basePayload,
  //                         downline_comm: site.downline_comm || "",
  //                         share: site.share || "",
  //                         caschip_values: site.caschip_values || "",
  //                       };
  //                     case 4:
  //                       return {
  //                         ...basePayload,
  //                         someField: site.someField || "",
  //                         anotherField: site.anotherField || "",
  //                       };
  //                     default:
  //                       return basePayload;
  //                   }
  //                 }
  //               );

  //               setUserWebsites(updatedUserWebsites);
  //             }
  //           }
  //         })
  //         .catch((error) =>
  //           console.error("Error fetching super admin details:", error)
  //         );
  //     }
  //   }
  // }, [mode, userId]);

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
                      status: site.status === 1 ? "Active" : "Inactive",
                    };

                    switch (site.commission_type) {
                      case 1:
                        return {
                          ...basePayload,
                          rent_start_date: site.rent_start_date || "",
                          rent_expiry_date: site.rent_expiry_date || "",
                          monthly_amount: site.monthly_amount || "",
                          max_chips_monthly: site.max_chips_monthly || "",
                          chip_percentage: site.chip_percentage || "",
                          is_casino: site.is_casino || false,
                          caschip_values: site.caschip_values || "",
                          downline_comm: site.downline_comm || "",
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
                      status: response.data.status === 1 ? "Active" : "Inactive",
                    };

                    switch (site.commission_type) {
                      case 1:
                        return {
                          ...basePayload,
                          rent_start_date: site.rent_start_date || "",
                          rent_expiry_date: site.rent_expiry_date || "",
                          monthly_amount: site.rentAmount || "",
                          max_chips_monthly: site.max_chips_rent || "",
                          chip_percentage: site.rentPercentage || "",
                          is_casino: site.is_casino || false,
                          caschip_values: site.caschip_values || "",
                          downline_comm: site.downline_comm || "",
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
                      default:
                        return basePayload;
                    }
                  }
                );
                console.log(updatedUserWebsites, "====>site")
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
        return {
          id: site.id,
          admin_panel_id: parseInt(site.admin_panel_id),
          user_paner_id: parseInt(site.user_paner_id),
          commission_type: commissionType,
          ...(commissionType === 1
            ? {
              monthly_amount: parseInt(site.monthly_amount) || null,
              max_chips_monthly: parseInt(site.max_chips_monthly) || null,
              chip_percentage: parseFloat(site.chip_percentage) || null,
              is_casino: site.casino_allowed ? 1 : 2, // 1 if allowed, 2 if not
              casino_chip_value: parseFloat(site.casino_chip_value) || null,
            }
            : {
              share: parseFloat(site.share) || null,
              downline_comm: parseFloat(site.downline_comm) || null,
              caschip_values: parseFloat(site.caschip_values) || null,
            }),
        };
      }),
    };

    console.log("Final Payload:", payload);

    updateDirectorByID(userId, payload)
      .then((response) => {
        if (response.status) {
          setSuccessPopupOpen(true);
          setTimeout(() => navigate("/director-admin"), 2000);
        }
      })
      .catch((error) => {
        console.error("Error updating director:", error);
        setShowWebsiteEditErrors(error.message[0].message || error.message[0]);
      });
  };

  const handleDirectorSubmit = () => {
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

    updateSuperAdminByID(userId, payload)
      .then((response) => {
        if (response.status === true) {
          setSuccessPopupOpen(true);
          setTimeout(() => navigate("/director-admin"), 2000);
        }
      })
      .catch((error) => {
        console.error("Error updating director:", error);

        setShowWebsiteEditErrors(error.message[0].message || error.message[0]);
      });
  };

  const adminRolesArray = Object.entries(adminRoles).map(([id, name]) => ({
    id,
    name,
  }));
  console.log(adminRolesArray, "adminRolesArray");
  // const transformData = (data) => {
  //   const adminMap = new Map();

  //   data?.accessWebsites.forEach((site) => {
  //     const adminKey = site.admin_panel_id;

  //     if (!adminMap.has(adminKey)) {
  //       adminMap.set(adminKey, {
  //         web_name: site.admin_panel_name,
  //         userWebsites: [],
  //       });
  //     }

  //     adminMap.get(adminKey).userWebsites.push({
  //       web_name: site.user_panel_name,
  //       commission_type: site.commission_type,
  //       share: site.share,
  //       downline_comm: site.downline_comm,
  //       caschip_values: site.caschip_values,
  //       is_casino: site.is_casino,
  //       rent_start_date: site.rent_start_date,
  //       rent_expiry_date: site.rent_expiry_date,
  //       monthly_amount: site.monthly_amount,
  //       max_chips_monthly: site.max_chips_monthly,
  //       chip_percentage: site.chip_percentage,
  //       share: site.share,
  //     });
  //   });
  //   { console.log(adminMap, "=====>adminMap") }
  //   return Array.from(adminMap.values());
  // };

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
        id: site.website_access_id,
        web_name: site.user_panel_name,
        web_url: site.user_panel_url,
        commission_type: site.commission_type,
        rent_start_date: site.rent_start_date,
        rent_expiry_date: site.rent_expiry_date,
        monthly_amount: site.monthly_amount,
        max_chips_monthly: site.max_chips_monthly,
        chip_percentage: site.chip_percentage,
        is_casino: site.is_casino,
        caschip_values: site.caschip_values,
        downline_comm: site.downline_comm,
        share: site.share,
        status: site.status === 1 ? "Active" : "Inactive",
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

  const [selectedOption, setSelectedOption] = useState(null);

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
  const removeForm = (id) => {
    setForms((prev) => prev.filter((form) => form.id !== id));
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
  const isExpired = (expiryDate) => {
    if (!expiryDate) return false; // If no expiry date, assume it's not expired
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry < today;
  };
  console.log(userWebsites, "====>userWebsites")
  return (
    <>
      <div>
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="yellow-font fw-bold">
            {role === "management" ? `Edit Director/SuperAdmin` : `Edit SuperAdmin `}
          </h5>
          <span
            className="yellow-font cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft /> Go Back
          </span>
        </div>


        {websiteEditErrors && (
          <div className="error-popup-container col-6 p-1 br-5 m-2">
            <ul>
              <li className="fw-600 small-font">{websiteEditErrors}</li>
            </ul>
          </div>
        )}
        <div className="p-1">
          <div className="row">
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
                readOnly
              />
              {errors.loginName && (
                <span className="text-danger small-font">
                  {errors.loginName}
                </span>
              )}
            </div>
            {/* <div className="col p-1">
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
              </select>
              {errors.selectedRole && (
                <span className="text-danger small-font">
                  {errors.selectedRole}
                </span>
              )}
            </div> */}
            <div className="col p-1">
              <label className="small-font my-1">Currency</label>
              <select
                className="small-font rounded all-none input-css white-bg border-grey3 w-100 no-cursor"
                value={selectedCurrencyCode}
                onChange={(e) => setSelectedCurrencyCode(e.target.value)}
                disabled
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
                type={showManagementPassword ? "text" : "password"}
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
            <div>Active</div>
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

                {data.userWebsites?.map((userWebsite, userIndex) => (
                  <div key={userIndex} className="w-100 mt-3 row">
                    <div className="col-2 d-flex flex-column">
                      <select
                        className="small-font w-100 white-bg rounded border-grey3 p-2 no-cursor"
                        disabled
                      >
                        <option value={userWebsite.web_url}>{userWebsite.web_url}</option>
                      </select>
                    </div>

                    <div className="col-2">
                      <label className="small-font my-1">Commission Type</label>
                      <div className="d-flex align-items-center">
                        <select
                          className="small-font white-bg rounded border-grey3 p-2 w-100"
                          value={userWebsite.commission_type}
                          disabled
                        >
                          {Object.entries(commissionTypes).map(([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {userWebsite.commission_type === 1 && (
                      <>
                        <div className="col-2">
                          <label className="small-font my-1">Rent Start Date</label>
                          <input
                            type="date"
                            className="small-font white-bg rounded border-grey3 p-2 w-100"
                            value={userWebsite.rent_start_date || ""}
                            disabled // Always disabled
                          />
                        </div>
                        <div className="col-2">
                          <label className="small-font my-1">Rent Expiry Date</label>
                          <input
                            type="date"
                            className="small-font white-bg rounded border-grey3 p-2 w-100"
                            value={userWebsite.rent_expiry_date || ""}
                            disabled // Always disabled
                          />
                        </div>
                        <div className="col-2">
                          <label className="small-font my-1">Monthly Amount</label>
                          <input
                            type="text"
                            className="small-font white-bg rounded border-grey3 p-2 w-100"
                            value={userWebsite.monthly_amount || ""}
                            disabled={isExpired(userWebsite.rent_expiry_date)} // Disable if expired
                            onChange={(e) => {
                              const updatedWebsites = [...userWebsites];
                              updatedWebsites[userIndex] = {
                                ...updatedWebsites[userIndex],
                                monthly_amount: e.target.value,
                              };
                              setUserWebsites(updatedWebsites);
                            }}
                          />
                        </div>
                        <div className="col-2">
                          <label className="small-font my-1">Max Chips Monthly</label>
                          <input
                            type="text"
                            className="small-font white-bg rounded border-grey3 p-2 w-100"
                            value={userWebsite.max_chips_monthly || ""}
                            disabled={isExpired(userWebsite.rent_expiry_date)} // Disable if expired
                            onChange={(e) => {
                              const updatedWebsites = [...userWebsites];
                              updatedWebsites[userIndex] = {
                                ...updatedWebsites[userIndex],
                                max_chips_monthly: e.target.value,
                              };
                              setUserWebsites(updatedWebsites);
                            }}
                          />
                        </div>
                        <div className="col-2">
                          <label className="small-font my-1">Chip Percentage</label>
                          <input
                            type="text"
                            className="small-font white-bg rounded border-grey3 p-2 w-100"
                            value={userWebsite.chip_percentage || ""}
                            disabled={isExpired(userWebsite.rent_expiry_date)} // Disable if expired
                            onChange={(e) => {
                              const updatedWebsites = [...userWebsites];
                              updatedWebsites[userIndex] = {
                                ...updatedWebsites[userIndex],
                                chip_percentage: e.target.value,
                              };
                              setUserWebsites(updatedWebsites);
                            }}
                          />
                        </div>
                        <div className="col-2">
                          <label className="small-font my-1">Downline Comm</label>
                          <input
                            type="text"
                            className="small-font white-bg rounded border-grey3 p-2 w-100"
                            value={userWebsite.downline_comm || ""}
                            disabled={isExpired(userWebsite.rent_expiry_date)} // Disable if expired
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
                          <label className="small-font my-1">Casino Allowed</label>
                          <input
                            type="checkbox"
                            checked={userWebsite.is_casino === 1} // Ensure this reflects the correct state
                            onChange={(e) => {
                              const updatedWebsites = [...userWebsites];
                              updatedWebsites[userIndex] = {
                                ...updatedWebsites[userIndex],
                                is_casino: e.target.checked ? 1 : 0, // 1 if checked, 0 if unchecked
                              };
                              setUserWebsites(updatedWebsites);
                            }}
                          />
                        </div>
                        {userWebsite.is_casino === 1 && (
                          <div className="col-2">
                            <label className="small-font my-1">Casino Chip Value</label>
                            <input
                              type="text"
                              className="small-font white-bg rounded border-grey3 p-2 w-100"
                              value={userWebsite.caschip_values || ""}
                              disabled={isExpired(userWebsite.rent_expiry_date)} // Disable if expired
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
                        )}
                      </>
                    )}

                    {userWebsite.commission_type === 2 && (
                      <>
                        <div className="col-2">
                          <label className="small-font my-1">Downline Share</label>
                          <input
                            type="text"
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
                          <label className="small-font my-1">Downline Comm</label>
                          <input
                            type="text"
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
                          <label className="small-font my-1">Caschip Values</label>
                          <input
                            type="text"
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
                          <label className="small-font my-1">Downline Share</label>
                          <input
                            type="text"
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
                          <label className="small-font my-1">Downline Comm</label>
                          <input
                            type="text"
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
                          <label className="small-font my-1">Caschip Values</label>
                          <input
                            type="text"
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

                    <div className="col-1 text-end">
                      <h6
                        className={`my-1 row ${userWebsite.status === "Active" ? "green-font" : "red-font"
                          }`}
                      >
                        status: <span className="small-font fw-600"> {userWebsite.status} </span>
                      </h6>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {forms.map((form, index) => (
              <>
                <h5 className="yellow-font fw-bold mb-0">ADD WEBSITE MARKET</h5>
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
                <div className="col-12">
                  {/* <label className="small-font my-1">User Website</label> */}
                  {role === "director" && selectedOption ? (
                    userWebsitesList[form.id]?.length > 0 ? (
                      userWebsitesList[form.id].map((userSite) => (
                        <div
                          key={userSite.website_access_id}
                          className="d-flex"
                        >
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
                              <div className="col-1 my-1">
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
                    <div className="col-12">
                      <label className="small-font my-1">User Website</label>
                      {userWebsitesList[form.id]?.length > 0 ? (
                        userWebsitesList[form.id].map((userSite) => (
                          <div key={userSite.id} className="row">
                            {/* Checkbox for Selecting User Website */}
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
                <div className="d-flex py-2 align-items-center justify-content-end">
                  {" "}
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
          </div>
        </form>
        <div className="text-end mb-3 w-100">
          <button type="button" className="cst-btn" onClick={addAnotherForm}>
            <FaPlus className="me-2" /> Add Another
          </button>
        </div>


        {/* <div className="red-font  small-font fw-600 flex-center">
            {websiteEditErrors}
          </div> */}
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
