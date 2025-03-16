

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
  const [individualSuperAdminData, setIndividualSuperAdminData] = useState(null);
  const [websiteDetails, setWebsiteDetails] = useState({});
  const [selectedRole, setSelectedRole] = useState("");
  const [userWebsites, setUserWebsites] = useState([]);
  const [websiteEditErrors, setShowWebsiteEditErrors] = useState(null);
  const [addWebsites, setAddWebsites] = useState([]);
  const [forms, setForms] = useState([]);
  const role = localStorage.getItem("role_code");
  const togglePasswordVisibility = (setter) => setter((prev) => !prev);
  const [commissionTypeChanges, setCommissionTypeChanges] = useState({});
  const [selectedAdmins, setSelectedAdmins] = useState({});
  const [userWebsitesList, setUserWebsitesList] = useState({});
  const [selectedWebsites, setSelectedWebsites] = useState({});
  const [accountTypes, setAccountTypes] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [allAccessWebsites, setAllAccessWebsites] = useState([]);
  const [isCreditAllowed, setIsCreditAllowed] = useState(false);
  const [creditValue, setCreditValue] = useState(2);
  const [creditreference, setCreditReference] = useState(null);
  const [creditBalance, setCreditBalance] = useState(null);
  const [selectedWebsiteId, setSelectedWebsiteId] = useState(null);
  const [selectedSiteIds, setSelectedSiteIds] = useState({});
  const [selectedRemarks, setSelectedRemarks] = useState({});
  const remarkOptions = [
    { value: "offline", label: "Offline" },
    ...(isCreditAllowed ? [{ value: "credit", label: "Credit" }] : []), // Conditionally add "Credit" option
  ];
  const [allSelectedUserWebsites, setAllSelectedUserWebsites] = useState([]);
  const [selectedUserWebsitesPerAdmin, setSelectedUserWebsitesPerAdmin] = useState({});
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

  const handleRemarkChange = (formId, websiteId, selectedRemark) => {
    setSelectedRemarks((prev) => ({
      ...prev,
      [formId]: {
        ...prev[formId],
        [websiteId]: selectedRemark,
      },
    }));
    const depTypeId = selectedRemark?.value == "offline" ? 2 : 1
    handleInputChange(websiteId, "deposite_type", depTypeId)
  };
  const validateForm = () => {
    let newErrors = {};

    if (!managementPassword) {
      newErrors.managementPassword = "Management Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (userId) {
      if (Role === "management") {
        getDirectorDetailsById(userId)
          .then((response) => {
            if (response.status) {
              setIndividualDirectorData(response.data);
              setName(response.data.name || "");
              setLoginName(response.data.login_name || "");
              setSelectedCountryCode(response.data.county || "");
              setSelectedRole(response.data.type || "");
              setSelectedCurrencyCode(response.data.currency_id || "");
              setIsCreditAllowed(response.data.is_credit == 1);
              setCreditReference(response.data.credit_reference || 0);
              setCreditBalance(response.data.credit_balance || 0);
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
                      website_access_id: site.website_access_id,
                      is_primary: site.is_primary == 1 ? 1 : 2,

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
                      id: site.id,
                      user_paner_id: site.user_paner_id,
                      web_url: site.user_panel_url,
                      admin_panel_id: site.admin_panel_id,
                      commission_type: site.commission_type || "",
                      status:
                        response.data.status === 1 ? "Active" : "Inactive",
                      is_primary: site.is_primary == 1 ? 1 : 2,
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
    // if (!validateForm()) return;

    const payload = {
      type: parseInt(selectedRole),
      country_id: parseInt(selectedCountryCode),
      currency_id: parseInt(selectedCurrencyCode),
      name: name,
      login_name: loginName,
      parent_password: managementPassword,
      is_credit: isCreditAllowed == true ? 1 : 2,
      credit_reference: isCreditAllowed == true ? creditreference : 0,
      accessWebsites: [
        ...userWebsites.map((site) => ({
          id: site.id,
          admin_panel_id: parseInt(site.admin_panel_id),
          user_paner_id: parseInt(site.user_paner_id),
          commission_type: parseInt(site.commission_type),
          ...(site.commission_type == 1
            ? {
              monthly_amount: parseInt(site.monthly_amount) || null,
              max_chips_monthly: parseInt(site.max_chips_monthly) || null,
              chip_percentage:
                (parseInt(site.monthly_amount) /
                  parseInt(site.max_chips_monthly)) *
                100 || null,
              is_casino: site.is_casino === 1 ? 1 : 2,
              ...(site.is_casino === 1
                ? { caschip_values: parseFloat(site.caschip_values) || null }
                : {}),
            }
            : {
              is_primary: site.is_primary == 1 ? 1 : 2,
              share: parseFloat(site.share) || null,
              downline_comm: parseFloat(site.downline_comm) || null,
              caschip_values: parseFloat(site.caschip_values) || null,
              is_primary: site.is_primary,
            }),
        })),
      ],
      addWebsites:
        addWebsites.length > 0
          ? addWebsites.map((site) => ({
            admin_panel_id: parseInt(site.admin_panel_id) || null,
            user_paner_id: parseInt(site.user_paner_id) || null,
            commission_type: parseInt(site.commission_type) || null,
            ...site.add_deposit_chips ? {
              totalAmount: parseFloat(
                site.add_deposit_chips || 0
              ),
              totalChips: parseFloat(
                site.add_deposit_chips || 0
              ),
            } : {},

            ...site.deposite_type == "1" ? {
              depositType: 1,
              creditAmount: parseFloat(site?.credit_amount),
              offDepositAmount: parseFloat(site.add_deposit_chips || 0) - parseFloat(site?.credit_amount || 0),
            } : {
              depositType: 2,
            },

            ...(site.commission_type == 1
              ? {
                monthly_amount: parseInt(site.monthly_amount) || null,
                max_chips_monthly: parseInt(site.max_chips_monthly) || null,
                chip_percentage:
                  (parseInt(site.monthly_amount) /
                    parseInt(site.max_chips_monthly)) *
                  100,
              }
              : {
                is_primary: site.is_primary == 1 ? 1 : 2,
                share: parseFloat(site.share) || null,
                caschip_values: parseFloat(site.caschip_values) || null,
                caschip_values: 1
              }),
            is_casino: site.is_casino === 1 ? 1 : 2,
            ...(site.is_casino === 1
              ? { caschip_values: parseFloat(site.caschip_values) || null }
              : {}),

            downline_comm: parseFloat(site.downline_comm) || null,
          }))
          : [],
    };

    if (isCreditAllowed == true) {
      payload.credit_reference = creditreference
    }
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
      parent_password: managementPassword,
      accessWebsites: [
        ...userWebsites.map((site) => ({
          id: site.id,
          admin_panel_id: parseInt(site.admin_panel_id),
          user_paner_id: parseInt(site.user_paner_id),
          commission_type: parseInt(site.commission_type),
          ...(site.commission_type != 1
            ? {
              is_primary: site.is_primary == 1 ? 1 : 2,
            }
            : {}),
          chip_percentage:
            (parseInt(site.monthly_amount) / parseInt(site.max_chips_monthly)) *
            100,
        })),
      ],
      addWebsites:
        addWebsites.length > 0
          ? addWebsites.map((site) => ({
            admin_panel_id: parseInt(site.admin_panel_id) || null,
            user_paner_id: parseInt(site.user_paner_id) || null,
            commission_type: parseInt(site.commission_type) || null,
            is_primary: site.is_primary == 1 ? 1 : 2,
            downline_comm: parseFloat(site.downline_comm) || null,
            ...(site.commission_type == 1
              ? {
                monthly_amount: parseInt(site.monthly_amount) || null,
                max_chips_monthly: parseInt(site.max_chips_monthly) || null,
                chip_percentage:
                  (parseInt(site.monthly_amount) /
                    parseInt(site.max_chips_monthly)) *
                  100,
              }
              : {
                share: parseFloat(site.share) || null,
                caschip_values: parseFloat(site.caschip_values) || null,
              }),
            is_casino: site.is_casino === 1 ? 1 : 2,
            ...(site.is_casino === 1
              ? { caschip_values: parseFloat(site.caschip_values) || null }
              : {}),
          }))
          : [],
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

  const transformData = (data) => {
    const adminMap = new Map();

    data?.accessWebsites.forEach((site) => {
      const adminKey = site.admin_panel_id;

      if (!adminMap.has(adminKey)) {
        adminMap.set(adminKey, {
          web_name: site.admin_panel_name,
          web_admin_id: site.admin_panel_id,
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
        status: site.status,
        is_primary: site.is_primary == 1 ? 1 : 2,
        website_access_id: site.id ? site.id : site.website_access_id,
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

  // const [selectedAdmins, setSelectedAdmins] = useState({});
  // const [userWebsitesList, setUserWebsitesList] = useState({});
  // const [selectedWebsites, setSelectedWebsites] = useState({});
  // const [accountTypes, setAccountTypes] = useState({});

  // const [errors, setErrors] = useState({});

  // const [selectedOption, setSelectedOption] = useState(null);

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
  // const [allAccessWebsites, setAllAccessWebsites] = useState(false);

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

  // const handleAdminRoleChange = (formId, selectedOption) => {
  //   setSelectedAdmins((prev) => ({
  //     ...prev,
  //     [formId]: selectedOption,
  //   }));

  //   const remainingUserWebsites = getRemainingUserWebsites(
  //     selectedOption.value
  //   );
  //   setUserWebsitesList((prev) => ({
  //     ...prev,
  //     [formId]: remainingUserWebsites,
  //   }));
  // };

  const handleAdminRoleChange = (formId, selectedOption) => {
    setSelectedAdmins((prev) => ({
      ...prev,
      [formId]: selectedOption,
    }));

    const availableUserWebsites = getAvailableUserWebsites(selectedOption.value);
    setUserWebsitesList((prev) => ({
      ...prev,
      [formId]: availableUserWebsites,
    }));
  };


  // const handleCheckboxChange = (formId, userSiteId, user_web_id) => {
  //   setSelectedWebsites((prev) => ({
  //     ...prev,
  //     [formId]: {
  //       ...prev[formId],
  //       [userSiteId]: !prev[formId]?.[userSiteId],
  //     },
  //   }));

  //   if (selectedWebsites[formId]?.[userSiteId]) {
  //     // Remove the user site from addWebsites if unchecked
  //     setAddWebsites((prevAddWebsites) =>
  //       prevAddWebsites.filter((site) => site.user_paner_id !== userSiteId)
  //     );
  //   } else {
  //     // Add the user site to addWebsites if checked
  //     const adminPanelId = selectedAdmins[formId]?.value || null;
  //     console.log(adminPanelId, userSiteId, "===>adminPanelId");
  //     setAddWebsites((prevAddWebsites) => [
  //       ...prevAddWebsites,
  //       {
  //         id: userSiteId,
  //         admin_panel_id: adminPanelId,
  //         user_paner_id: user_web_id ? user_web_id : userSiteId,
  //         commission_type: null,
  //         share: null,
  //         is_casino: null,
  //         caschip_values: null,
  //         downline_comm: null,
  //         monthly_amount: null,
  //         max_chips_monthly: null,
  //         chip_percentage: null,
  //         caschip_values: null,
  //         is_casino: 2,
  //         is_primary: 2, // Default is_primary value for new websites
  //         form_id: formId,
  //       },
  //     ]);
  //   }
  // };

  const handleCheckboxChange = (formId, userSiteId, user_web_id, adminId) => {
    setSelectedWebsites((prev) => ({
      ...prev,
      [formId]: {
        ...prev[formId],
        [userSiteId]: !prev[formId]?.[userSiteId],
      },
    }));

    if (selectedWebsites[formId]?.[userSiteId]) {
      // Remove the user site from addWebsites if unchecked
      setAddWebsites((prevAddWebsites) =>
        prevAddWebsites.filter((site) => site.user_paner_id !== userSiteId)
      );

      // Remove the user site from the selectedUserWebsitesPerAdmin state
      setSelectedUserWebsitesPerAdmin((prev) => ({
        ...prev,
        [adminId]: prev[adminId].filter((siteId) => siteId !== userSiteId),
      }));
    } else {
      // Add the user site to addWebsites if checked
      const adminPanelId = selectedAdmins[formId]?.value || null;
      setAddWebsites((prevAddWebsites) => [
        ...prevAddWebsites,
        {
          id: userSiteId,
          admin_panel_id: adminPanelId,
          user_paner_id: user_web_id ? user_web_id : userSiteId,
          commission_type: null,
          share: null,
          is_casino: null,
          caschip_values: null,
          downline_comm: null,
          monthly_amount: null,
          max_chips_monthly: null,
          chip_percentage: null,
          caschip_values: null,
          is_casino: 2,
          is_primary: 2, // Default is_primary value for new websites
          form_id: formId,
        },
      ]);

      // Add the user site to the selectedUserWebsitesPerAdmin state
      setSelectedUserWebsitesPerAdmin((prev) => ({
        ...prev,
        [adminId]: [...(prev[adminId] || []), userSiteId],
      }));
    }
  };

  const handleAccountTypeChange = (formId, userSiteId, selectedOption) => {
    setAccountTypes((prev) => ({
      ...prev,
      [formId]: {
        ...prev[formId],
        [userSiteId]: selectedOption.value,
      },
    }));

    setAddWebsites((prevAddWebsites) =>
      prevAddWebsites.map((site) =>
        site.id === userSiteId
          ? { ...site, commission_type: selectedOption.value }
          : site
      )
    );
  };

  const handleInputChange = (userSiteId, field, value) => {
    setAddWebsites((prevAddWebsites) =>
      prevAddWebsites.map((site) =>
        site.id === userSiteId ? { ...site, [field]: value } : site
      )
    );
  };

  const addAnotherForm = () => {
    const newForm = { id: Date.now() };
    setForms((prevForms) => [...prevForms, newForm]);
  };

  const removeForm = (id) => {
    setForms((prevForms) => prevForms.filter((form) => form.id !== id));

    setAddWebsites((prevAddWebsites) =>
      prevAddWebsites.filter((website) => website.form_id !== id)
    );
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
  const getRemainingUserWebsites = (adminId) => {
    const assignedUserWebsiteIds = userWebsites.map(
      (site) => site.user_paner_id
    );
    const adminData = adminWebsite.find((admin) => admin.id === adminId);
    return (
      adminData?.userWebsites.filter(
        (site) => !assignedUserWebsiteIds.includes(site.id)
      ) || []
    );
  };

  const hasRemainingUserWebsites = () => {
    return adminWebsite.some(
      (admin) => getRemainingUserWebsites(admin.id).length > 0
    );
  };
  const handleCommissionTypeChange = (websiteId, newCommissionType) => {
    setCommissionTypeChanges((prev) => ({
      ...prev,
      [websiteId]: newCommissionType,
    }));

    // Update the userWebsites state with the new commission type
    setUserWebsites((prevWebsites) =>
      prevWebsites.map((website) =>
        website.website_access_id === websiteId
          ? { ...website, commission_type: newCommissionType }
          : website
      )
    );
  };

  const toggleCreditAllowed = () => {
    const newIsCreditAllowed = !isCreditAllowed;
    setIsCreditAllowed(newIsCreditAllowed);
    setCreditValue(newIsCreditAllowed ? 1 : 2);
  };

  // Render the "Is Primary" checkbox for commission types 2 and 3
  const renderIsPrimaryCheckbox = (websiteId, isPrimary) => {
    return (
      <div className="col position-relative mx-1 d-flex align-items-center">
        <label className="small-font me-2">Is Primary </label>
        <input
          type="checkbox"
          checked={isPrimary || false}
          onChange={(e) =>
            handleInputChange(websiteId, "is_primary", e.target.checked)
          }
        />
      </div>
    );
  };

  const getAvailableUserWebsites = (adminId) => {
    const assignedUserWebsiteIds = userWebsites
      .filter((site) => site.admin_panel_id === adminId)
      .map((site) => site.user_paner_id);

    const adminData = adminWebsite.find((admin) => admin.id === adminId);
    const selectedUserWebsitesForAdmin = selectedUserWebsitesPerAdmin[adminId] || [];

    return (
      adminData?.userWebsites.filter(
        (site) =>
          !assignedUserWebsiteIds.includes(site.id) &&
          !selectedUserWebsitesForAdmin.includes(site.id)
      ) || []
    );
  };


  return (
    <>
      <div>
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="yellow-font ">
            {role === "management"
              ? `Edit Director/SuperAdmin`
              : `Edit SuperAdmin `}
          </h5>
          <span
            className="white-font me-2  p-2 br-10 yellow-bg  cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="mx-2" /> Back
          </span>
        </div>

        {websiteEditErrors && (
          <div className="error-popup-container col-6 p-1 br-5 m-2">
            <ul>
              <li className="fw-600 small-font">{websiteEditErrors}</li>
            </ul>
          </div>
        )}
        <div className="white-bg br-10 login-box-shadow w-100 p-2 m-2">
          <div className="row p-2">
            <div className="col-2 p-1">
              <label className="small-font my-1">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="border-grey3 small-font rounded all-none input-css w-100 input-css"
                value={name}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  // Allow only letters and spaces using a regular expression
                  const filteredValue = inputValue.replace(/[^A-Za-z\s]/g, "");
                  setName(filteredValue);
                }}
                required
              />
              {errors.name && (
                <span className="text-danger small-font">{errors.name}</span>
              )}
            </div>
            <div className="col-2 p-1">
              <label className="small-font my-1">Login Name</label>
              <input
                type="text"
                placeholder="Enter Login Name"
                className="border-grey3 small-font rounded all-none input-css w-100"
                value={loginName}
                readOnly
              />
              {errors.loginName && (
                <span className="text-danger small-font">
                  {errors.loginName}
                </span>
              )}
            </div>
            <div className="col-2 p-1">
              <label className="small-font my-1">Currency</label>
              <select
                className="small-font rounded all-none input-css  border-grey3 w-100 no-cursor"
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
            <div className="col-2 p-1">
              <label className="small-font my-1">Country</label>
              <select
                className="small-font rounded all-none input-css border-grey3 w-100"
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

            <div className="p-1   col-2 position-relative">
              <label className="small-font my-1">Management Password</label>
              <div className="w-100 rounded border-grey3  input-css4">
                <input
                  type={showManagementPassword ? "text" : "password"}
                  className="  all-none p-1  w-80"
                  placeholder="Enter"
                  required
                  value={managementPassword}
                  onChange={(e) => setManagementPassword(e.target.value)}
                />
              </div>

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
                <span className="x-small-font fw-600 error">
                  {errors?.managementPassword}
                </span>
              )}
            </div>
          </div>
          <div className="row align-items-center">
            {/* Checkbox for CREDIT ALLOWED */}
            <div className="col-3 d-flex align-items-center">
              <div className="p-2">
                <input
                  type="checkbox"
                  checked={isCreditAllowed}
                  onChange={toggleCreditAllowed}
                />
                <label className="small-font ms-2">CREDIT ALLOWED</label>
              </div>
              {console.log(isCreditAllowed, "==>isCreditAllowed")}
            </div>

            {/* Credit Reference Input */}
            {isCreditAllowed && (
              <div className="col-3">
                <div className="p-1 position-relative">
                  <label className="small-font">Credit Reference</label>
                  <input
                    type="number"
                    className="small-font rounded all-none input-css w-100"
                    placeholder="Enter"
                    value={creditreference}
                    maxLength={9}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/\D/g, "");
                      setCreditReference(numericValue);
                    }}
                    onKeyPress={(e) => {
                      if (e.charCode < 48 || e.charCode > 57) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
              </div>
            )}

            {/* Credit Balance Input */}
            {isCreditAllowed && (
              <div className="col-3">
                <div className="p-1 position-relative">
                  <label className="small-font"> Credit Balance</label>
                  <input
                    type="text"
                    className="small-font rounded all-none input-css w-100"
                    placeholder="Enter"
                    value={creditBalance}
                    readOnly
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="yellow-font medium-font mt-4 ">WEBSITE MARKET</h3>
        <form className="custom-form small-font p-3">
          <div className="row align-items-center">
            <div>Active</div>
            {adminWebsites?.map((data, index) => (
              <div
                key={index}
                className="login-box-shadow white-bg p-2 my-2 rounded"
              >
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

                {userWebsites?.map((userWebsite, userIndex) => {
                  if (userWebsite.admin_panel_id == data.web_admin_id) {
                    const currentCommissionType =
                      commissionTypeChanges[userWebsite.website_access_id] ||
                      userWebsite.commission_type;

                    return (
                      <div key={userIndex} className="w-100 mt-3 my-2 row">
                        <div className="col-2 d-flex flex-column mt-4">
                          <select
                            className="small-font w-100 white-bg rounded border-grey3 p-2 no-cursor"
                            disabled
                          >
                            <option value={userWebsite.web_url}>
                              {userWebsite.web_url}
                            </option>
                          </select>
                        </div>

                        <div className="col-2  ">
                          <label className="small-font my-1">
                            Commission Type
                          </label>
                          <div className="d-flex align-items-center">
                            <select
                              className="small-font white-bg rounded border-grey3 p-2 w-100"
                              value={currentCommissionType}
                              onChange={(e) =>
                                handleCommissionTypeChange(
                                  userWebsite.website_access_id,
                                  e.target.value
                                )
                              }
                              disabled={isExpired(
                                userWebsite.rent_expiry_date
                                  ? userWebsite.rent_expiry_date
                                  : null
                              )}
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

                        {currentCommissionType == "1" && (
                          <>
                            {userWebsite.rent_start_date && (
                              <>
                                <div className="col-2  ">
                                  <label className="small-font my-1">
                                    Rent Start Date
                                  </label>
                                  <input
                                    type="text"
                                    className="small-font white-bg rounded border-grey3 p-2 w-100"
                                    value={userWebsite.rent_start_date || ""}
                                  />
                                </div>
                                <div className="col-2">
                                  <label className="small-font my-1">
                                    Rent Expiry Date
                                  </label>
                                  <input
                                    type="text"
                                    className="small-font white-bg rounded border-grey3 p-2 w-100"
                                    value={userWebsite.rent_expiry_date || ""}
                                  />
                                </div>
                              </>
                            )}

                            <div className="col-2">
                              <label className="small-font my-1">
                                Monthly Amount
                              </label>
                              <input
                                type="text"
                                maxLength={10}
                                className="small-font white-bg rounded all-none border-grey3 p-2 w-100"
                                value={userWebsite.monthly_amount || ""}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  // Allow only numbers using a regular expression
                                  const numericValue = inputValue.replace(
                                    /[^0-9]/g,
                                    ""
                                  );
                                  const updatedWebsites = [...userWebsites];
                                  updatedWebsites[userIndex] = {
                                    ...updatedWebsites[userIndex],
                                    monthly_amount: numericValue, // Set the filtered value
                                  };
                                  setUserWebsites(updatedWebsites);
                                }}
                                disabled={isExpired(
                                  userWebsite.rent_expiry_date
                                    ? userWebsite.rent_expiry_date
                                    : null
                                )}
                              />
                            </div>
                            <div className="col-2">
                              <label className="small-font my-1">
                                Max Chips Monthly
                              </label>
                              <input
                                type="text"
                                className="small-font white-bg all-none rounded border-grey3 p-2 w-100"
                                value={userWebsite.max_chips_monthly || ""}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  // Allow only numbers using a regular expression
                                  const numericValue = inputValue.replace(
                                    /[^0-9]/g,
                                    ""
                                  );
                                  const updatedWebsites = [...userWebsites];
                                  updatedWebsites[userIndex] = {
                                    ...updatedWebsites[userIndex],
                                    max_chips_monthly: numericValue, // Set the filtered value
                                  };
                                  setUserWebsites(updatedWebsites);
                                }}
                                disabled={isExpired(
                                  userWebsite.rent_expiry_date
                                    ? userWebsite.rent_expiry_date
                                    : null
                                )}
                              />
                            </div>
                            <div className="col-2">
                              <label className="small-font my-1">
                                Chip (%)
                              </label>
                              <input
                                type="text"
                                className="small-font white-bg all-none rounded border-grey3 p-2 w-100"
                                value={
                                  userWebsite.max_chips_monthly === 0 ||
                                    isNaN(
                                      (userWebsite.monthly_amount /
                                        userWebsite.max_chips_monthly) *
                                      100
                                    ) ||
                                    !isFinite(
                                      (userWebsite.monthly_amount /
                                        userWebsite.max_chips_monthly) *
                                      100
                                    )
                                    ? "0%" // Show 0% if max_chips_monthly is 0, the value is NaN, or the value is Infinity
                                    : `${(
                                      (userWebsite.monthly_amount /
                                        userWebsite.max_chips_monthly) *
                                      100
                                    ).toFixed(2)}%` // Otherwise, show the calculated percentage with 2 decimal places
                                }
                                readOnly
                                disabled={isExpired(
                                  userWebsite.rent_expiry_date
                                    ? userWebsite.rent_expiry_date
                                    : null
                                )}
                              />
                            </div>
                            <div className="col-2">
                              <label className="small-font my-1">
                                * Commission (%)
                              </label>
                              <input
                                type="text"
                                className="small-font white-bg rounded all-none border-grey3 p-2 w-100"
                                value={userWebsite.downline_comm || ""}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  // Allow only numbers using a regular expression
                                  const numericValue = inputValue.replace(
                                    /[^0-9]/g,
                                    ""
                                  );

                                  // Restrict input to 2 digits unless the value is exactly 100
                                  let finalValue = numericValue;
                                  if (
                                    numericValue.length > 2 &&
                                    numericValue !== "100"
                                  ) {
                                    finalValue = numericValue.slice(0, 2); // Stop after 2 digits
                                  }

                                  // Ensure the value is between 0 and 100
                                  const clampedValue = Math.min(
                                    Math.max(Number(finalValue), 0),
                                    100
                                  );

                                  const updatedWebsites = [...userWebsites];
                                  updatedWebsites[userIndex] = {
                                    ...updatedWebsites[userIndex],
                                    downline_comm: clampedValue, // Set the clamped value
                                  };
                                  setUserWebsites(updatedWebsites);
                                }}
                                disabled={isExpired(
                                  userWebsite.rent_expiry_date
                                    ? userWebsite.rent_expiry_date
                                    : null
                                )}
                              />
                            </div>

                            <div className="col-2  mt-4 ">
                              <div className="light-white-bg br-5 ">
                                <input
                                  type="checkbox"
                                  className="ms-2"
                                  checked={userWebsite.is_casino === 1}
                                  onChange={(e) => {
                                    const updatedWebsites = [...userWebsites];
                                    updatedWebsites[userIndex] = {
                                      ...updatedWebsites[userIndex],
                                      is_casino: e.target.checked ? 1 : 2,
                                    };
                                    setUserWebsites(updatedWebsites);
                                  }}
                                />
                                <label className="small-font p-2 mt-1">
                                  Casino Allowed
                                </label>
                              </div>
                            </div>

                            {userWebsite.is_casino === 1 && (
                              <div className="col-2">
                                <label className="small-font my-1">
                                  Casino Chip Value
                                </label>
                                <input
                                  type="text"
                                  maxLength={4}
                                  className="small-font all-none white-bg rounded border-grey3 p-2 w-100"
                                  value={userWebsite.caschip_values || ""}
                                  onChange={(e) => {
                                    const inputValue = e.target.value;
                                    // Allow only numbers using a regular expression
                                    const numericValue = inputValue.replace(
                                      /[^0-9]/g,
                                      ""
                                    );
                                    const updatedWebsites = [...userWebsites];
                                    updatedWebsites[userIndex] = {
                                      ...updatedWebsites[userIndex],
                                      caschip_values: numericValue, // Set the filtered value
                                    };
                                    setUserWebsites(updatedWebsites);
                                  }}
                                />
                              </div>
                            )}
                          </>
                        )}

                        {currentCommissionType == "2" && (
                          <>
                            <div className="col-2">
                              <label className="small-font my-1">
                                Downline Share
                              </label>
                              <input
                                type="text"
                                className="small-font white-bg all-none rounded border-grey3 p-2 w-100"
                                value={userWebsite.share || ""}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  // Allow only numbers using a regular expression
                                  const numericValue = inputValue.replace(
                                    /[^0-9]/g,
                                    ""
                                  );

                                  // Restrict input to 2 digits unless the value is exactly 100
                                  let finalValue = numericValue;
                                  if (
                                    numericValue.length > 2 &&
                                    numericValue !== "100"
                                  ) {
                                    finalValue = numericValue.slice(0, 2); // Stop after 2 digits
                                  }

                                  // Ensure the value is between 0 and 100
                                  const clampedValue = Math.min(
                                    Math.max(Number(finalValue), 0),
                                    100
                                  );

                                  const updatedWebsites = [...userWebsites];
                                  updatedWebsites[userIndex] = {
                                    ...updatedWebsites[userIndex],
                                    share: clampedValue, // Set the clamped value
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
                                type="text"
                                className="small-font white-bg all-none rounded border-grey3 p-2 w-100"
                                value={userWebsite.downline_comm || ""}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  // Allow only numbers using a regular expression
                                  const numericValue = inputValue.replace(
                                    /[^0-9]/g,
                                    ""
                                  );

                                  // Restrict input to 2 digits unless the value is exactly 100
                                  let finalValue = numericValue;
                                  if (
                                    numericValue.length > 2 &&
                                    numericValue !== "100"
                                  ) {
                                    finalValue = numericValue.slice(0, 2); // Stop after 2 digits
                                  }

                                  // Ensure the value is between 0 and 100
                                  const clampedValue = Math.min(
                                    Math.max(Number(finalValue), 0),
                                    100
                                  );

                                  const updatedWebsites = [...userWebsites];
                                  updatedWebsites[userIndex] = {
                                    ...updatedWebsites[userIndex],
                                    downline_comm: clampedValue, // Set the clamped value
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
                                type="text"
                                maxLength={4}
                                className="small-font white-bg all-none rounded border-grey3 p-2 w-100"
                                value={userWebsite.caschip_values || ""}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  // Allow only numbers using a regular expression
                                  const numericValue = inputValue.replace(
                                    /[^0-9]/g,
                                    ""
                                  );
                                  const updatedWebsites = [...userWebsites];
                                  updatedWebsites[userIndex] = {
                                    ...updatedWebsites[userIndex],
                                    caschip_values: numericValue, // Set the filtered value
                                  };
                                  setUserWebsites(updatedWebsites);
                                }}
                              />
                            </div>
                            {/* Render "Is Primary" checkbox for commission types 2 and 3 */}

                            <div className="col flex-between white-space input-css ms-2 d-flex border-grey3 mt-4">
                              <input
                                type="checkbox"
                                checked={userWebsite.is_primary === 1}
                                onChange={(e) => {
                                  const updatedWebsites = [...userWebsites];
                                  updatedWebsites[userIndex] = {
                                    ...updatedWebsites[userIndex],
                                    is_primary: e.target.checked ? 1 : 2,
                                  };
                                  setUserWebsites(updatedWebsites);
                                }}
                              />
                              <label className="small-font me-2">
                                Is Primary{" "}
                              </label>
                            </div>
                          </>
                        )}

                        {currentCommissionType == "3" && (
                          <>
                            <div className="col-2">
                              <label className="small-font my-1">
                                Downline Share
                              </label>
                              <input
                                type="text"
                                className="small-font white-bg all-none rounded border-grey3 p-2 w-100"
                                value={userWebsite.share || ""}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  // Allow only numbers using a regular expression
                                  const numericValue = inputValue.replace(
                                    /[^0-9]/g,
                                    ""
                                  );

                                  // Restrict input to 2 digits unless the value is exactly 100
                                  let finalValue = numericValue;
                                  if (
                                    numericValue.length > 2 &&
                                    numericValue !== "100"
                                  ) {
                                    finalValue = numericValue.slice(0, 2); // Stop after 2 digits
                                  }

                                  // Ensure the value is between 0 and 100
                                  const clampedValue = Math.min(
                                    Math.max(Number(finalValue), 0),
                                    100
                                  );

                                  const updatedWebsites = [...userWebsites];
                                  updatedWebsites[userIndex] = {
                                    ...updatedWebsites[userIndex],
                                    share: clampedValue, // Set the clamped value
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
                                type="text"
                                className="small-font white-bg all-none rounded border-grey3 p-2 w-100"
                                value={userWebsite.downline_comm || ""}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  // Allow only numbers using a regular expression
                                  const numericValue = inputValue.replace(
                                    /[^0-9]/g,
                                    ""
                                  );

                                  // Restrict input to 2 digits unless the value is exactly 100
                                  let finalValue = numericValue;
                                  if (
                                    numericValue.length > 2 &&
                                    numericValue !== "100"
                                  ) {
                                    finalValue = numericValue.slice(0, 2); // Stop after 2 digits
                                  }

                                  // Ensure the value is between 0 and 100
                                  const clampedValue = Math.min(
                                    Math.max(Number(finalValue), 0),
                                    100
                                  );

                                  const updatedWebsites = [...userWebsites];
                                  updatedWebsites[userIndex] = {
                                    ...updatedWebsites[userIndex],
                                    downline_comm: clampedValue, // Set the clamped value
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
                                type="text"
                                maxLength={4}
                                className="small-font white-bg all-none rounded border-grey3 p-2 w-100"
                                value={userWebsite.caschip_values || ""}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  // Allow only numbers using a regular expression
                                  const numericValue = inputValue.replace(
                                    /[^0-9]/g,
                                    ""
                                  );
                                  const updatedWebsites = [...userWebsites];
                                  updatedWebsites[userIndex] = {
                                    ...updatedWebsites[userIndex],
                                    caschip_values: numericValue, // Set the filtered value
                                  };
                                  setUserWebsites(updatedWebsites);
                                }}
                              />
                            </div>
                            {/* Render "Is Primary" checkbox for commission types 2 and 3 */}
                            <div className="col flex-between white-space input-css ms-2 d-flex border-grey3 mt-4">
                              <input
                                type="checkbox"
                                checked={userWebsite.is_primary == 1}
                                onChange={(e) => {
                                  const updatedWebsites = [...userWebsites];
                                  updatedWebsites[userIndex] = {
                                    ...updatedWebsites[userIndex],
                                    is_primary: e.target.checked ? 1 : 2,
                                  };
                                  setUserWebsites(updatedWebsites);
                                }}
                              />
                              <label className="small-font me-2">
                                Is Primary
                              </label>
                            </div>
                          </>
                        )}

                        <div className="col-1 ms-2 ">
                          <div
                            className={`my-1 row 
                            `}
                          >
                            status
                            <div
                              className={`small-font fw-600 input-css text-center ${userWebsite.status === "Active"
                                ? "green-font"
                                : "red-font"
                                } `}
                            >
                              {" "}
                              {userWebsite.status}{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            ))}

            {forms.map((form, index) => (
              <>
                <h5 className="yellow-font fw-bold mb-0">ADD WEBSITE MARKET</h5>
                <div key={form.id}>
                  {role === "director" ? (
                    <div className="col-1">
                      <label className="small-font my-2">Admin Website</label>
                      <div className="custom-select-wrapper">
                        <Select
                          className="small-font"
                          placeholder="Select"
                          options={transformedOptions}
                          value={selectedOption}
                          onChange={(selectedOption) => {
                            setSelectedOption(selectedOption);
                            handleAdminRoleChange(form.id, selectedOption);
                            const selectedAdmin = allAccessWebsites
                              .flatMap((access) => access.admin_websites)
                              .find(
                                (admin) =>
                                  admin.admin_panel_id === selectedOption?.value
                              );
                            setUserWebsitesList((prev) => {
                              const updatedList = {
                                ...prev,
                                [form.id]: selectedAdmin
                                  ? selectedAdmin.users
                                  : [],
                              };

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
                  {role === "director" && selectedOption ? (
                    userWebsitesList[form.id]?.length > 0 ? (
                      userWebsitesList[form.id].map((userSite) => (
                        <div
                          key={userSite.website_access_id}
                          className="d-flex"
                        >
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
                                  userSite.website_access_id,
                                  userSite.user_WebSite_id
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
                                      value={
                                        (parseInt(
                                          addWebsites.find(
                                            (site) =>
                                              site.id ===
                                              userSite.website_access_id
                                          ).monthly_amount
                                        ) /
                                          parseInt(
                                            addWebsites.find(
                                              (site) =>
                                                site.id ===
                                                userSite.website_access_id
                                            ).max_chips_monthly
                                          )) *
                                        100
                                      }
                                      readOnly
                                    />
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
                                  <div className="col d-flex align-items-center">
                                    <label className="small-font me-2">
                                      Casino Allowed
                                    </label>
                                    <input
                                      type="checkbox"
                                      checked={
                                        addWebsites.find(
                                          (site) =>
                                            site.id === userSite.website_access_id
                                        )?.is_casino === 1
                                      }
                                      onChange={(e) =>
                                        handleInputChange(
                                          userSite.website_access_id,
                                          "is_casino",
                                          e.target.checked ? 1 : 2
                                        )
                                      }
                                    />
                                  </div>
                                  {addWebsites.find(
                                    (site) =>
                                      site.id === userSite.website_access_id
                                  )?.is_casino === 1 && (
                                      <div className="col">
                                        <input
                                          type="text"
                                          className="small-font white-bg rounded border-grey3 p-2 w-100"
                                          placeholder="Casino Chip Value"
                                          onChange={(e) =>
                                            handleInputChange(
                                              userSite.website_access_id,
                                              "caschip_values",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                    )}
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
                                {/* Render "Is Primary" checkbox for commission types 2 and 3 */}
                                <div className="col position-relative mx-1 d-flex align-items-center">
                                  <label className="small-font me-2">
                                    Is Primary{" "}
                                  </label>
                                  <input
                                    type="checkbox"
                                    checked={
                                      addWebsites.find(
                                        (site) =>
                                          site.id === userSite.website_access_id
                                      )?.is_primary == 1
                                    }
                                    onChange={(e) =>
                                      handleInputChange(
                                        userSite.website_access_id,
                                        "is_primary",
                                        e.target.checked ? 1 : 2
                                      )
                                    }
                                  />
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

                                <div className="col position-relative mx-1 d-flex align-items-center">
                                  <label className="small-font me-2">
                                    Is Primary{" "}
                                  </label>
                                  <input
                                    type="checkbox"
                                    checked={
                                      addWebsites.find(
                                        (site) =>
                                          site.id === userSite.website_access_id
                                      )?.is_primary == 1
                                    }
                                    onChange={(e) =>
                                      handleInputChange(
                                        userSite.website_access_id,
                                        "is_primary",
                                        e.target.checked ? 1 : 2
                                      )
                                    }
                                  />
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
                      {userWebsitesList[form.id]?.length > 0 ? (
                        <div className="row">
                          <div className="col-2 input-css5 small-font">
                            <div className="black-font">User Website</div>
                            <Select
                              className="small-font rounded all-none my-2 w-100"
                              placeholder="Select a website"
                              options={userWebsitesList[form.id]
                                .map((site) => ({
                                  value: site.id,
                                  label: site.web_url,
                                }))
                              }
                              value={
                                selectedSiteIds[form.id]
                                  ? {
                                    value: selectedSiteIds[form.id],
                                    label:
                                      userWebsitesList[form.id].find(
                                        (site) => site.id === selectedSiteIds[form.id]
                                      )?.web_url || "",
                                  }
                                  : null
                              }
                              onChange={(selectedOption) => {
                                const selectedSiteId = selectedOption ? selectedOption.value : null;
                                const adminId = selectedAdmins[form.id]?.value;

                                setSelectedSiteIds((prev) => ({
                                  ...prev,
                                  [form.id]: selectedSiteId,
                                }));

                                handleCheckboxChange(form.id, selectedSiteId, null, adminId);
                              }}
                              styles={customStyles}
                            />
                          </div>
                          {selectedSiteIds[form.id] && (
                            <>
                              <div className="col-1 my-1">
                                <Select
                                  className="small-font white-bg"
                                  placeholder="Account Type"
                                  options={commissionOptions}
                                  styles={customStyles}
                                  onChange={(selectedOption) =>
                                    handleAccountTypeChange(
                                      form.id,
                                      selectedSiteIds[form.id],
                                      selectedOption
                                    )
                                  }
                                  value={
                                    commissionOptions.find(
                                      (option) =>
                                        option.value ===
                                        accountTypes[form.id]?.[selectedSiteIds[form.id]]
                                    ) || null
                                  }
                                />
                              </div>

                              {/* Fields for Commission Type 1 */}
                              {accountTypes[form.id]?.[selectedSiteIds[form.id]] === "1" && (
                                <div className="col-10">
                                  <div className="row">
                                    {/* Monthly Amount */}
                                    <div className="col">
                                      <input
                                        type="text"
                                        className="small-font white-bg rounded border-grey3 p-2 w-100"
                                        placeholder="Monthly Amnt"
                                        onChange={(e) =>
                                          handleInputChange(
                                            selectedSiteIds[form.id],
                                            "monthly_amount",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>

                                    {/* Max Chips Monthly */}
                                    <div className="col">
                                      <input
                                        type="text"
                                        className="small-font white-bg rounded border-grey3 p-2 w-100"
                                        placeholder="Max Chips Monthly"
                                        onChange={(e) =>
                                          handleInputChange(
                                            selectedSiteIds[form.id],
                                            "max_chips_monthly",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>

                                    {/* Rent Percentage (Calculated Field) */}
                                    <div className="col">
                                      <input
                                        type="text"
                                        className="small-font white-bg rounded border-grey3 p-2 w-100"
                                        placeholder="Rent Percentage"
                                        value={
                                          addWebsites.find(
                                            (site) => site.id === selectedSiteIds[form.id]
                                          )?.monthly_amount &&
                                            addWebsites.find(
                                              (site) => site.id === selectedSiteIds[form.id]
                                            )?.max_chips_monthly
                                            ? (
                                              (parseFloat(
                                                addWebsites.find(
                                                  (site) => site.id === selectedSiteIds[form.id]
                                                )?.monthly_amount
                                              ) /
                                                parseFloat(
                                                  addWebsites.find(
                                                    (site) => site.id === selectedSiteIds[form.id]
                                                  )?.max_chips_monthly
                                                )) *
                                              100
                                            ).toFixed(2)
                                            : ""
                                        }
                                        readOnly
                                      />
                                    </div>

                                    {/* Commission */}
                                    <div className="col-3">
                                      <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
                                        <input
                                          type="text"
                                          className="small-font bg-none p-2 w-75"
                                          placeholder="Commission(%)"
                                          onChange={(e) =>
                                            handleInputChange(
                                              selectedSiteIds[form.id],
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

                                    {/* Casino Allowed Checkbox */}
                                    <div className="col d-flex align-items-center">
                                      <label className="small-font me-2">Casino Allowed</label>
                                      <input
                                        type="checkbox"
                                        checked={
                                          addWebsites.find(
                                            (site) => site.id === selectedSiteIds[form.id]
                                          )?.is_casino === 1
                                        }
                                        onChange={(e) =>
                                          handleInputChange(
                                            selectedSiteIds[form.id],
                                            "is_casino",
                                            e.target.checked ? 1 : 2
                                          )
                                        }
                                      />
                                    </div>

                                    {/* Casino Chip Value (Conditional Rendering) */}
                                    {addWebsites.find(
                                      (site) => site.id === selectedSiteIds[form.id]
                                    )?.is_casino === 1 && (
                                        <div className="col">
                                          <input
                                            type="text"
                                            className="small-font white-bg rounded border-grey3 p-2 w-100"
                                            placeholder="Casino Chip Value"
                                            onChange={(e) =>
                                              handleInputChange(
                                                selectedSiteIds[form.id],
                                                "caschip_values",
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                      )}
                                  </div>
                                </div>
                              )}

                              {/* Fields for Commission Type 2 */}
                              {accountTypes[form.id]?.[selectedSiteIds[form.id]] === "2" && (
                                <div className="col d-flex">
                                  <div className="col position-relative mx-1">
                                    <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
                                      <input
                                        className="small-font bg-none p-2 w-75"
                                        placeholder="Downline Sharing"
                                        onChange={(e) =>
                                          handleInputChange(
                                            selectedSiteIds[form.id],
                                            "share",
                                            e.target.value
                                          )
                                        }
                                        max={10}
                                        min={0}
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
                                            selectedSiteIds[form.id],
                                            "downline_comm",
                                            e.target.value
                                          )
                                        }
                                        max={10}
                                        min={0}
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
                                            selectedSiteIds[form.id],
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
                                  {/* Render "Is Primary" checkbox for commission types 2 and 3 */}
                                  <div className="col position-relative mx-1 d-flex align-items-center">
                                    <label className="small-font me-2">Is Primary </label>
                                    <input
                                      type="checkbox"
                                      checked={
                                        addWebsites.find(
                                          (site) => site.id === selectedSiteIds[form.id]
                                        )?.is_primary == 1
                                      }
                                      onChange={(e) =>
                                        handleInputChange(
                                          selectedSiteIds[form.id],
                                          "is_primary",
                                          e.target.checked ? 1 : 2
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              )}

                              {/* Fields for Commission Type 3 */}
                              {accountTypes[form.id]?.[selectedSiteIds[form.id]] === "3" && (
                                <div className="col d-flex">
                                  <div className="col position-relative mx-1">
                                    <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
                                      <input
                                        className="small-font bg-none p-2 w-75"
                                        placeholder="Downline Sharing"
                                        onChange={(e) =>
                                          handleInputChange(
                                            selectedSiteIds[form.id],
                                            "share",
                                            e.target.value
                                          )
                                        }
                                        max={10}
                                        min={0}
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
                                            selectedSiteIds[form.id],
                                            "downline_comm",
                                            e.target.value
                                          )
                                        }
                                        max={10}
                                        min={0}
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
                                            selectedSiteIds[form.id],
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
                                  <div className="col position-relative mx-1 d-flex align-items-center">
                                    <label className="small-font me-2">Is Primary </label>
                                    <input
                                      type="checkbox"
                                      checked={
                                        addWebsites.find(
                                          (site) => site.id === selectedSiteIds[form.id]
                                        )?.is_primary == 1
                                      }
                                      onChange={(e) =>
                                        handleInputChange(
                                          selectedSiteIds[form.id],
                                          "is_primary",
                                          e.target.checked ? 1 : 2
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              )}
                              <div className="row ">
                                <div className="col-2 ">
                                  <label className="fw-600 my-1 small-font">
                                    {/* Cash chip Values */}
                                  </label>
                                  {/* <div className="input-css mt-2">
                                                                {renderIsPrimaryCheckbox(
                                                                  form.id,
                                                                  selectedWebsiteId
                                                                )}
                                                              </div> */}
                                </div>
                                {/* Fields for Commission Type 1, 2, and 3 */}
                                {(accountTypes[form.id]?.[selectedSiteIds[form.id]] == 1 ||
                                  accountTypes[form.id]?.[selectedSiteIds[form.id]] == 2 ||
                                  accountTypes[form.id]?.[selectedSiteIds[form.id]] == 3) && (
                                    <>
                                      <div className="col-2 position-relative mt-1">
                                        <label className="fw-600 small-font">Add Deposit Chips</label>
                                        <div className="input-css mt-2 d-flex justify-content-between align-items-center small-font">
                                          <input
                                            type="number"
                                            className="small-font bg-none w-75 all-none appearance"
                                            placeholder="Enter Chips"
                                            onChange={(e) => {
                                              handleInputChange(
                                                selectedSiteIds[form.id],
                                                "add_deposit_chips",
                                                e.target.value
                                              );
                                            }}
                                          />
                                        </div>
                                      </div>

                                      <div className="col-2 position-relative mt-1">
                                        <label className="fw-600 small-font">Total Paid Amount</label>
                                        <div className="input-css mt-2 d-flex justify-content-between align-items-center small-font">
                                          <input
                                            type="text"
                                            maxLength={2}
                                            className="small-font bg-none w-75 all-none"
                                            value={parseInt(
                                              addWebsites.find(
                                                (site) => site.id == selectedSiteIds[form.id]
                                              )?.add_deposit_chips || 0
                                            )}
                                            readOnly
                                          />
                                        </div>
                                      </div>

                                      <div className="col-2 small-font position-relative mt-3">
                                        <label className="fw-600 small-font">Deposit Remark</label>
                                        <Select
                                          value={
                                            selectedRemarks[form.id]?.[selectedSiteIds[form.id]] || null
                                          }
                                          onChange={(selectedOption) =>
                                            handleRemarkChange(
                                              form.id,
                                              selectedSiteIds[form.id],
                                              selectedOption
                                            )
                                          }
                                          options={remarkOptions}
                                          placeholder="Select..."
                                          styles={customStyles}
                                          isSearchable={false}
                                        />
                                      </div>

                                      {selectedRemarks[form.id]?.[selectedSiteIds[form.id]]?.value ===
                                        "credit" && (
                                          <>
                                            <div className="col-2 position-relative mt-1">
                                              <label className="fw-600 small-font">Credit Amount</label>
                                              <div className="input-css mt-2 d-flex justify-content-between align-items-center small-font">
                                                <input
                                                  type="number"
                                                  maxLength={9}
                                                  className="small-font bg-none w-75 all-none appearance"
                                                  onChange={(e) =>
                                                    handleInputChange(
                                                      selectedSiteIds[form.id],
                                                      "credit_amount",
                                                      e.target.value
                                                    )
                                                  }
                                                />
                                              </div>
                                            </div>

                                            <div className="col-2 position-relative mt-1">
                                              <label className="fw-600 small-font">Paid Amount</label>
                                              <div className="input-css mt-2 d-flex justify-content-between align-items-center small-font">
                                                <input
                                                  type="text"
                                                  maxLength={9}
                                                  className="small-font bg-none w-75 all-none appearance"
                                                  value={
                                                    parseInt(
                                                      addWebsites.find(
                                                        (site) => site.id == selectedSiteIds[form.id]
                                                      )?.add_deposit_chips || 0
                                                    ) -
                                                    parseInt(
                                                      addWebsites.find(
                                                        (site) => site.id == selectedSiteIds[form.id]
                                                      )?.credit_amount || 0
                                                    ) ?? 0
                                                  }
                                                  readOnly
                                                />
                                              </div>
                                            </div>
                                          </>
                                        )}
                                    </>
                                  )}
                              </div>
                            </>
                          )}
                        </div>
                      ) : (
                        <p className="small-font">No user websites available</p>
                      )}
                    </div>
                  )}
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
          </div>
        </form>
        {hasRemainingUserWebsites() && (
          <div className="text-end mb-3 w-100">
            <button type="button" className="cst-btn" onClick={addAnotherForm}>
              <FaPlus className="me-2" /> Add Another
            </button>
          </div>
        )}
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