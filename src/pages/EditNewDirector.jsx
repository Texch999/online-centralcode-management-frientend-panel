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
import { useSelector } from "react-redux";
import ErrorComponent from "../components/ErrorComponent";

function EditNewDirector() {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode || "add";
  const userId = location.state?.userId;
  const Role = localStorage.getItem("role_code");
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [showManagementPassword, setShowManagementPassword] = useState(false);
  const [name, setName] = useState("");
  const [loginName, setLoginName] = useState("");
  const [managementPassword, setManagementPassword] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("");
  const [platformFee, setPlatformFee] = useState("");
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
    ...(isCreditAllowed ? [{ value: "credit", label: "Credit" }] : []),
  ];
  const [allSelectedUserWebsites, setAllSelectedUserWebsites] = useState([]);
  const [selectedUserWebsitesPerAdmin, setSelectedUserWebsitesPerAdmin] =
    useState({});
  const [loader, setLoader] = useState(false);
  const allCountries = useSelector((item) => item?.allCountries);
  const getLocationName = (locationId) => {
    const country = allCountries.find((country) => country.id === locationId);
    return country?.name.charAt(0).toUpperCase() + country?.name.slice(1);
  };

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
    const depTypeId = selectedRemark?.value == "offline" ? 2 : 1;
    handleInputChange(websiteId, "deposite_type", depTypeId);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!name) {
      newErrors.name = "name is required.";
    }
    if (!managementPassword) {
      newErrors.managementPassword = "Management Password is required.";
    }
    if (!selectedCountryCode) {
      newErrors.selectedCountryCode = "selectedCountryCode is required.";
    }
    if (!selectedCurrencyCode) {
      newErrors.selectedCurrencyCode = "selectedCurrencyCode is required.";
    }
    if (!managementPassword) {
      newErrors.managementPassword = "Management Password is required.";
    }

    if (isCreditAllowed) {
      if (!creditreference) {
        newErrors.creditreference = "Credit Limit is required.";
      }
    }

    if (!platformFee) {
      newErrors.platformFee = "Platform Fee is required.";
    } else if (parseFloat(platformFee) < 0) {
      newErrors.platformFee = "Platform fee must be at least 1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAddWebsites = (addWebsites) => {
    const errors = {};

    userWebsites.forEach((site) => {
      if (!site.admin_panel_id) {
        errors[`admin_panel_id_${site.id}`] = "Admin panel ID is required.";
      }
      if (!site.user_paner_id) {
        errors[`user_paner_id_${site.id}`] = "User panel ID is required.";
      }
      if (!site.commission_type) {
        errors[`commission_type_${site.id}`] = "Commission type is required.";
      }

      if (site.commission_type == "1") {
        if (!site.monthly_amount || site.monthly_amount == 0) {
          errors[`monthly_amount_${site.id}`] = "Monthly amount is required.";
        }
        if (!site.max_chips_monthly || site.max_chips_monthly == 0) {
          errors[`max_chips_monthly_${site.id}`] =
            "Max chips monthly is required.";
        }
        // if (!site.downline_comm || site.downline_comm == 0) {
        //   errors[`downline_comm_${site.id}`] =
        //     "Downline commission is required.";
        // }

        if (
          site.is_casino === "1" &&
          (!site.caschip_values || site.caschip_values.trim() === "")
        ) {
          errors[`caschip_values_${site.id}`] =
            "Casino chip value is required.";
        } else if (site.is_casino === "1" && isNaN(site.caschip_values)) {
          errors[`caschip_values_${site.id}`] =
            "Casino chip value must be a number.";
        }
      } else if (site.commission_type == "2" || site.commission_type == "3") {
        if (!site.share || site.share == 0) {
          errors[`share_${site.id}`] = "Downline share is required.";
        }

        // if (!site.downline_comm || site.downline_comm == 0) {
        //   errors[`downline_comm_${site.id}`] =
        //     "Downline commission is required.";
        // }

        if (!site.caschip_values || site.caschip_values == "") {
          errors[`caschip_values_${site.id}`] =
            "Casino chip value is required.";
        } else if (isNaN(site.caschip_values)) {
          errors[`caschip_values_${site.id}`] =
            "Casino chip value must be a number.";
        }
      }
    });

    addWebsites.forEach((site, index) => {
      if (!site.admin_panel_id) {
        errors[`admin_panel_id${site.id}`] = "admin_panel_id is required.";
      }
      if (!site.user_paner_id) {
        errors[`user_paner_id${site.id}`] = "user_paner_id is required.";
      }

      if (!site.commission_type) {
        errors[`commission_type_${site.id}`] = "Commission type is required.";
      }

      if (site.commission_type === "1") {
        if (!site.monthly_amount || site.monthly_amount.trim() === "") {
          errors[`monthly_amount_${site.id}`] = "Monthly amount is required.";
        }

        if (!site.max_chips_monthly || site.max_chips_monthly.trim() === "") {
          errors[`max_chips_monthly_${site.id}`] =
            "Max chips monthly is required.";
        }

        // if (!site.downline_comm || site.downline_comm.trim() === "") {
        //   errors[`downline_comm_${site.id}`] =
        //     "Downline commission is required.";
        // } else if (isNaN(site.downline_comm)) {
        //   errors[`downline_comm_${site.id}`] =
        //     "Downline commission must be a number.";
        // } else if (parseInt(site.downline_comm) > 100) {
        //   errors[`downline_comm_${site.id}`] =
        //     "Downline commission must be less than or equal to 100.";
        // }

        if (
          site.is_casino === "1" &&
          (!site.caschip_values || site.caschip_values.trim() === "")
        ) {
          errors[`caschip_values_${site.id}`] =
            "Casino chip value is required.";
        } else if (site.is_casino === "1" && isNaN(site.caschip_values)) {
          errors[`caschip_values_${site.id}`] =
            "Casino chip value must be a number.";
        }
      } else if (site.commission_type === "2" || site.commission_type === "3") {
        if (!site.share || site.share.trim() === "") {
          errors[`share_${site.id}`] = "Downline share is required.";
        } else if (isNaN(site.share)) {
          errors[`share_${site.id}`] = "Downline share must be a number.";
        } else if (parseInt(site.share) > 100) {
          errors[`share_${site.id}`] =
            "Downline share must be less than or equal to 100.";
        }

        // if (!site.downline_comm || site.downline_comm.trim() === "") {
        //   errors[`downline_comm_${site.id}`] =
        //     "Downline commission is required.";
        // } else if (isNaN(site.downline_comm)) {
        //   errors[`downline_comm_${site.id}`] =
        //     "Downline commission must be a number.";
        // } else if (parseInt(site.downline_comm) > 100) {
        //   errors[`downline_comm_${site.id}`] =
        //     "Downline commission must be less than or equal to 100.";
        // }

        if (!site.caschip_values || site.caschip_values.trim() === "") {
          errors[`caschip_values_${site.id}`] =
            "Casino chip value is required.";
        } else if (isNaN(site.caschip_values)) {
          errors[`caschip_values_${site.id}`] =
            "Casino chip value must be a number.";
        }
      }
    });
    return errors;
  };

  useEffect(() => {
    if (userId) {
      setLoader(true);
      if (Role === "management") {
        getDirectorDetailsById(userId)
          .then((response) => {
            if (response.status) {
              setLoader(false);
              setIndividualDirectorData(response.data);
              setName(response.data.name || "");
              setLoginName(response.data.login_name || "");
              setSelectedCountryCode(response.data.county || "");
              setSelectedRole(response.data.type || "");
              setSelectedCurrencyCode(response.data.currency_id || "");
              setIsCreditAllowed(response.data.is_credit == 1);
              setCreditReference(response.data.credit_reference || 0);
              setCreditBalance(response.data.credit_balance || 0);
              setPlatformFee(response.data.platform_fee || 0);
              if (response.data.accessWebsites.length > 0) {
                const updatedUserWebsites = response.data.accessWebsites.map(
                  (site) => {
                    const basePayload = {
                      id: site.website_access_id,
                      user_paner_id: site.user_paner_id,
                      web_url: site.user_panel_url,
                      web_name: site.user_panel_name,
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
                          // downline_comm: site.downline_comm || "",
                          // downline_comm: site.downline_comm || "",
                          share: site.share || "",
                          caschip_values: site.caschip_values || "",
                        };
                      case 2:
                        return {
                          ...basePayload,
                          rent_start_date: site.rent_start_date || "",
                          rent_expiry_date: site.rent_expiry_date || "",
                          monthly_amount: site.monthly_amount || "",
                          max_chips_monthly: site.max_chips_monthly || "",
                          chip_percentage: site.chip_percentage || "",
                          is_casino: site.is_casino || false,
                          caschip_values: site.caschip_values || "",
                          // downline_comm: site.downline_comm || "",
                          // downline_comm: site.downline_comm || "",
                          share: site.share || "",
                          caschip_values: site.caschip_values || "",
                        };
                      case 3:
                        return {
                          ...basePayload,
                          rent_start_date: site.rent_start_date || "",
                          rent_expiry_date: site.rent_expiry_date || "",
                          monthly_amount: site.monthly_amount || "",
                          max_chips_monthly: site.max_chips_monthly || "",
                          chip_percentage: site.chip_percentage || "",
                          is_casino: site.is_casino || false,
                          caschip_values: site.caschip_values || "",
                          // downline_comm: site.downline_comm || "",
                          // downline_comm: site.downline_comm || "",
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
          .catch((error) => {
            setLoader(false);
            console.error("Error fetching director details:", error)
          }
          );
      } else if (Role === "director") {
        getSuperAdminDetailsById(userId);
        setLoader(true)
          .then((response) => {
            if (response.status) {
              setLoader(false);
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
                          // downline_comm: site.downline_comm || "",
                        };
                      case 2:
                        return {
                          ...basePayload,
                          // downline_comm: site.downline_comm || "",
                          share: site.share || "",
                          caschip_values: site.caschip_values || "",
                          rent_start_date: site.rent_start_date || "",
                          rent_expiry_date: site.rent_expiry_date || "",
                          monthly_amount: site.rentAmount || "",
                          max_chips_monthly: site.max_chips_rent || "",
                          chip_percentage: site.rentPercentage || "",
                          is_casino: site.is_casino || false,
                          caschip_values: site.caschip_values || "",
                          // downline_comm: site.downline_comm || "",
                        };
                      case 3:
                        return {
                          ...basePayload,
                          downline_comm: site.downline_comm || "",
                          share: site.share || "",
                          caschip_values: site.caschip_values || "",
                          rent_start_date: site.rent_start_date || "",
                          rent_expiry_date: site.rent_expiry_date || "",
                          monthly_amount: site.rentAmount || "",
                          max_chips_monthly: site.max_chips_rent || "",
                          chip_percentage: site.rentPercentage || "",
                          is_casino: site.is_casino || false,
                          caschip_values: site.caschip_values || "",
                          // downline_comm: site.downline_comm || "",
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
          .catch((error) => {
            console.error("Error fetching super admin details:", error);
            setLoader(false);
          });
      }
    }
  }, [mode, userId]);

  useEffect(() => {
    if (websiteEditErrors && Object.keys(websiteEditErrors).length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [websiteEditErrors]);

  const handleManagementSubmit = () => {
    const adminUserSiteErrors = {};
    forms.forEach((form) => {
      if (!selectedAdmins[form.id]) {
        adminUserSiteErrors[`admin_${form.id}`] =
          "Please select an admin site.";
      }
      if (!selectedSiteIds[form.id]) {
        adminUserSiteErrors[`userSite_${form.id}`] =
          "Please select a user site.";
      }
    });

    const websiteErrors = validateAddWebsites(addWebsites);
    const isFormValid = validateForm();
    if (!isFormValid) return;

    const errors = { ...adminUserSiteErrors, ...websiteErrors };

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const payload = {
      type: parseInt(selectedRole),
      country_id: parseInt(selectedCountryCode),
      currency_id: parseInt(selectedCurrencyCode),
      name: name,
      login_name: loginName,
      parent_password: managementPassword,
      is_credit: isCreditAllowed == true ? 1 : 2,
      credit_reference: isCreditAllowed == true ? creditreference : 0,
      platformFee: platformFee,
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
              // downline_comm: parseFloat(site.downline_comm) || null,
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
                caschip_values: 1,
              }),
            is_casino: site.is_casino === 1 ? 1 : 2,
            ...(site.is_casino === 1
              ? { caschip_values: parseFloat(site.caschip_values) || null }
              : {}),
            // downline_comm: parseFloat(site.downline_comm) || null,
          }))
          : [],
    };

    if (isCreditAllowed == true) {
      payload.credit_reference = creditreference;
    }

    setLoader(true);

    updateDirectorByID(userId, payload)
      .then((response) => {
        if (response.status) {
          setLoader(false);
          setSuccessPopupOpen(true);
          setTimeout(() => navigate("/director-admin"), 2000);
        }
      })
      .catch((error) => {
        console.error("Error updating director:", error);
        setLoader(false);
        setShowWebsiteEditErrors(error.message[0].message || error.message[0]);
      });
  };

  const handleDirectorSubmit = () => {
    if (!validateForm() || !validateAddWebsites()) return;

    const payload = {
      type: parseInt(selectedRole),
      country_id: parseInt(selectedCountryCode),
      currency_id: parseInt(selectedCurrencyCode),
      name: name,
      platformFee: platformFee,
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

  const adminRolesArray = Object.entries(adminRoles).map(([id, name]) => ({ id, name, }));

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

      const formatFloatValue = (value) => {
        if (value === null || value === undefined) return 0.00;
        const num = parseFloat(value);
        return isNaN(num) ? 0.00 : parseFloat(num.toFixed(2));
      };

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
        // downline_comm: formatFloatValue(site.downline_comm),
        share: formatFloatValue(site.share),
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

    const availableUserWebsites = getAvailableUserWebsites(
      selectedOption.value
    );
    setUserWebsitesList((prev) => ({
      ...prev,
      [formId]: availableUserWebsites,
    }));
  };

  const handleCheckboxChange = (formId, userSiteId, user_web_id, adminId) => {
    setSelectedWebsites((prev) => ({
      ...prev,
      [formId]: {
        ...prev[formId],
        [userSiteId]: !prev[formId]?.[userSiteId],
      },
    }));

    if (selectedWebsites[formId]?.[userSiteId]) {
      setAddWebsites((prevAddWebsites) =>
        prevAddWebsites.filter((site) => site.user_paner_id !== userSiteId)
      );

      setSelectedUserWebsitesPerAdmin((prev) => ({
        ...prev,
        [adminId]: prev[adminId].filter((siteId) => siteId !== userSiteId),
      }));
    } else {
      const adminPanelId = selectedAdmins[formId]?.value || null;
      setAddWebsites((prevAddWebsites) => {
        const existingSiteIndex = prevAddWebsites.findIndex(
          (site) => site.form_id === formId
        );

        if (existingSiteIndex !== -1) {
          const updatedWebsites = [...prevAddWebsites];
          updatedWebsites[existingSiteIndex] = {
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
            is_primary: 2,
            form_id: formId,
          };
          return updatedWebsites;
        } else {
          return [
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
              is_primary: 2,
              form_id: formId,
            },
          ];
        }
      });

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

    if (
      parseInt(selectedRole) === 2 &&
      individualDirectorData?.accessWebsites[0]?.admin_panel_id
    ) {
      const adminId = individualDirectorData.accessWebsites[0].admin_panel_id;
      const adminName =
        individualDirectorData.accessWebsites[0].admin_panel_name;

      setSelectedAdmins((prev) => ({
        ...prev,
        [newForm.id]: {
          value: adminId,
          label: adminName,
        },
      }));

      const availableUserWebsites = getAvailableUserWebsites(adminId);
      setUserWebsitesList((prev) => ({
        ...prev,
        [newForm.id]: availableUserWebsites,
      }));
    }
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
    if (!expiryDate) return false;
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
    const selectedUserWebsitesForAdmin =
      selectedUserWebsitesPerAdmin[adminId] || [];

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
        {loader && (
          <div className="my-load">
            <div className="loader "></div>
          </div>
        )}
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

        {websiteEditErrors && <ErrorComponent error={websiteEditErrors} />}
        <div className="white-bg br-10 login-box-shadow w-100 p-2 m-2">
          <div className="row  p-2">
            <div className="col-2 p-1">
              <label className="small-font my-1">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="border-grey3 small-font rounded all-none input-css w-100 input-css"
                value={name}
                onChange={(e) => {
                  const inputValue = e.target.value;
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

            <div className="p-1  col-2 position-relative">
              <label className="small-font my-1">Platform Fee</label>
              <div className="w-100 rounded border-grey3  input-css4">
                <input
                  type="text"
                  placeholder="Enter platform fee"
                  className="border-grey3 small-font rounded all-none input-css w-100"
                  value={platformFee}
                  // onChange={(e) => setPlatformFee(e.target.value)}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === "") {
                      setPlatformFee("");
                      return;
                    }

                    if (/^([0-4](\.\d{0,2})?|5(\.0{0,2})?)?$/.test(value)) {
                      setPlatformFee(value);
                    } else if (/^5$|^5\.$|^5\.0$|^5\.00$/.test(value)) {

                      setPlatformFee(value);
                    }
                  }}
                  onBlur={(e) => {
                    let numericValue = parseFloat(e.target.value);

                    if (isNaN(numericValue) || numericValue < 0) {
                      numericValue = 0;
                    } else if (numericValue > 5) {
                      numericValue = 5;
                    }

                    const formattedValue = numericValue.toFixed(2);
                    setPlatformFee(formattedValue);
                  }}
                  required
                />
              </div>

              {errors?.platformFee && (
                <span className="text-danger small-font error">
                  {errors?.platformFee}
                </span>
              )}
            </div>

            <div className="p-1   col-2 position-relative">
              <label className="small-font my-1">Management Password</label>
              <div className="w-100 rounded border-grey3  input-css4">
                <input
                  type={showManagementPassword ? "text" : "password"}
                  className="  all-none p-2 small-font  w-80"
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
                <span className="text-danger small-font error">
                  {errors?.managementPassword}
                </span>
              )}
            </div>
          </div>
          <div className="row  align-items-center">
            {/* Checkbox for CREDIT ALLOWED */}
            <div className={`col-2  ${errors?.creditreference ? "" : "mt-3"}  d-flex align-items-center`}>
              <label className="fw-600 small-font"> </label>
              <div className={`input-css w-100 ${errors?.creditreference ? "" : "mt-2"} d-flex justify-content-start align-items-center small-font`}>
                <input
                  type="checkbox"
                  checked={isCreditAllowed}
                  onChange={toggleCreditAllowed}
                />
                <label className="small-font ms-2">CREDIT ALLOWED</label>
              </div>
            </div>

            {/* Credit Reference Input */}
            {isCreditAllowed && (
              <div className="col-2">
                <div className="p-1 position-relative">
                  <label className="small-font">Credit Limit </label>
                  <input
                    type="text"
                    className="small-font rounded all-none input-css w-100"
                    placeholder="Enter"
                    value={creditreference || ""}
                    onChange={(e) => {
                      const numericValue = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 9);
                      setCreditReference(numericValue);
                    }}
                    onKeyPress={(e) => {
                      if (e.charCode < 48 || e.charCode > 57) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
                {errors?.creditreference && (
                  <span className="text-danger  error">
                    {errors?.creditreference}
                  </span>
                )}
              </div>
            )}

            {isCreditAllowed && (
              <div className="col-2 ">
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
                      className="small-font grey-bg-clr rounded p-2 w-100 no-cursor border-0"
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
                      <div key={userIndex} className="w-100 mt-3 my-2  row">
                        <div className="col-2 d-flex flex-column mt-4">
                          <select
                            className="small-font w-100 grey-bg-clr rounded p-2 no-cursor border-0"
                            disabled
                          >
                            <option value={userWebsite.id}>
                              {userWebsite.web_name}
                            </option>
                          </select>
                          {errors[`user_paner_id_${userWebsite.id}`] && (
                            <span className="text-danger small-font">
                              {errors[`user_paner_id_${userWebsite.id}`]}
                            </span>
                          )}
                        </div>

                        <div className="col-2  ">
                          <label className="small-font my-1">
                            Commission Type
                          </label>

                          <div className="d-flex  align-items-center">
                            <Select
                              className="w-100"
                              classNamePrefix="react-select"
                              styles={customStyles}
                              isSearchable={false}
                              options={Object.entries(commissionTypes).map(
                                ([value, label]) => ({
                                  value,
                                  label,
                                })
                              )}
                              value={
                                {
                                  value: currentCommissionType,
                                  label:
                                    commissionTypes[currentCommissionType] ||
                                    "Select",
                                }
                              }
                              onChange={(selectedOption) =>
                                handleCommissionTypeChange(
                                  userWebsite.website_access_id,
                                  selectedOption.value
                                )
                              }
                              isDisabled={isExpired(
                                userWebsite.rent_expiry_date || null
                              )}
                            />
                          </div>

                          {errors[`commission_type_${userWebsite.id}`] && (
                            <span className="text-danger small-font">
                              {errors[`commission_type_${userWebsite.id}`]}
                            </span>
                          )}
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
                                    className="small-font grey-bg-clr rounded border-0 p-2 w-100"
                                    value={userWebsite.rent_start_date || ""}
                                  />
                                </div>
                                <div className="col-2">
                                  <label className="small-font my-1">
                                    Rent Expiry Date
                                  </label>
                                  <input
                                    type="text"
                                    className="small-font grey-bg-clr rounded border-0 p-2 w-100"
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
                                className="small-font grey-bg-clr rounded all-none border-0 p-2 w-100"
                                value={userWebsite.monthly_amount || ""}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  const numericValue = inputValue.replace(
                                    /[^0-9]/g,
                                    ""
                                  );
                                  const updatedWebsites = [...userWebsites];
                                  updatedWebsites[userIndex] = {
                                    ...updatedWebsites[userIndex],
                                    monthly_amount: numericValue,
                                  };
                                  setUserWebsites(updatedWebsites);
                                }}
                                disabled={isExpired(
                                  userWebsite.rent_expiry_date
                                    ? userWebsite.rent_expiry_date
                                    : null
                                )}
                              />
                              {errors[`monthly_amount_${userWebsite.id}`] && (
                                <span className="text-danger small-font">
                                  {errors[`monthly_amount_${userWebsite.id}`]}
                                </span>
                              )}
                            </div>
                            <div className="col-2">
                              <label className="small-font my-1">
                                Max Chips Monthly
                              </label>
                              <input
                                type="text"
                                className="small-font grey-bg-clr all-none rounded border-0 p-2 w-100"
                                value={userWebsite.max_chips_monthly || ""}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  const numericValue = inputValue.replace(
                                    /[^0-9]/g,
                                    ""
                                  );
                                  const updatedWebsites = [...userWebsites];
                                  updatedWebsites[userIndex] = {
                                    ...updatedWebsites[userIndex],
                                    max_chips_monthly: numericValue,
                                  };
                                  setUserWebsites(updatedWebsites);
                                }}
                                disabled={isExpired(
                                  userWebsite.rent_expiry_date
                                    ? userWebsite.rent_expiry_date
                                    : null
                                )}
                              />
                              {errors[
                                `max_chips_monthly_${userWebsite.id}`
                              ] && (
                                  <span className="text-danger small-font">
                                    {
                                      errors[
                                      `max_chips_monthly_${userWebsite.id}`
                                      ]
                                    }
                                  </span>
                                )}
                            </div>
                            <div className="col-2">
                              <label className="small-font my-1">
                                Chip (%)
                              </label>
                              <input
                                type="text"
                                className="small-font grey-bg-clr all-none rounded border-0 p-2 w-100"
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
                                    ? "0%"
                                    : `${(
                                      (userWebsite.monthly_amount /
                                        userWebsite.max_chips_monthly) *
                                      100
                                    ).toFixed(2)}%`
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
                                className="small-font grey-bg-clr rounded all-none border-0 p-2 w-100"
                                value={userWebsite.downline_comm || ""}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  const numericValue = inputValue.replace(
                                    /[^0-9]/g,
                                    ""
                                  );

                                  let finalValue = numericValue;
                                  if (
                                    numericValue.length > 2 &&
                                    numericValue !== "100"
                                  ) {
                                    finalValue = numericValue.slice(0, 2);
                                  }

                                  const clampedValue = Math.min(
                                    Math.max(Number(finalValue), 0),
                                    100
                                  );

                                  const updatedWebsites = [...userWebsites];
                                  updatedWebsites[userIndex] = {
                                    ...updatedWebsites[userIndex],
                                    downline_comm: clampedValue,
                                  };
                                  setUserWebsites(updatedWebsites);
                                }}
                                disabled={isExpired(
                                  userWebsite.rent_expiry_date
                                    ? userWebsite.rent_expiry_date
                                    : null
                                )}
                              />
                              {errors[`downline_comm_${userWebsite.id}`] && (
                                <span className="text-danger small-font">
                                  {errors[`downline_comm_${userWebsite.id}`]}
                                </span>
                              )}
                            </div>

                            <div className="col-2  mt-4 ">
                              <div className="grey-bg-clr br-5 border-0">
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
                                  className="small-font all-none grey-bg-clr rounded border-0 p-2 w-100"
                                  value={userWebsite.caschip_values || ""}
                                  onChange={(e) => {
                                    const inputValue = e.target.value;
                                    const numericValue = inputValue.replace(
                                      /[^0-9]/g,
                                      ""
                                    );
                                    const updatedWebsites = [...userWebsites];
                                    updatedWebsites[userIndex] = {
                                      ...updatedWebsites[userIndex],
                                      caschip_values: numericValue,
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
                              <label className="small-font my-1 fw-600">
                                Downline Share (upto 100%)
                              </label>
                              <div className="position-relative">

                                <input
                                  type="text"
                                  className="small-font grey-bg-clr all-none rounded border-0 p-2 w-100 pe-4"
                                  value={userWebsite.share || ""}
                                  onChange={(e) => {
                                    const inputValue = e.target.value;

                                    const numericValue = inputValue.replace(
                                      /[^0-9.]/g,
                                      ""
                                    );

                                    const dotCount = (
                                      numericValue.match(/\./g) || []
                                    ).length;
                                    let finalValue = numericValue;
                                    if (dotCount > 1) {
                                      finalValue = numericValue.slice(
                                        0,
                                        numericValue.lastIndexOf(".")
                                      );
                                    }

                                    const parts = finalValue.split(".");
                                    if (
                                      parts.length === 2 &&
                                      parts[1].length > 2
                                    ) {
                                      finalValue = `${parts[0]
                                        }.${parts[1].slice(0, 2)}`;
                                    }

                                    const numericValueWithoutDot = parts[0];
                                    if (
                                      numericValueWithoutDot.length > 2 &&
                                      Number(numericValueWithoutDot) !== 100
                                    ) {
                                      finalValue = numericValueWithoutDot.slice(
                                        0,
                                        2
                                      );
                                    }

                                    const clampedValue =
                                      finalValue !== "" &&
                                        !isNaN(finalValue) &&
                                        Number(finalValue) <= 100
                                        ? finalValue
                                        : finalValue === ""
                                          ? ""
                                          : "100";

                                    const updatedWebsites = [...userWebsites];
                                    updatedWebsites[userIndex] = {
                                      ...updatedWebsites[userIndex],
                                      share: clampedValue,
                                    };
                                    setUserWebsites(updatedWebsites);
                                  }}
                                />

                                <span className="position-absolute end-0 top-50 translate-middle-y me-3">
                                  %
                                </span>
                              </div>
                              {errors[`share_${userWebsite.id}`] && (
                                <span className="text-danger small-font">
                                  {errors[`share_${userWebsite.id}`]}
                                </span>
                              )}
                            </div>
                            <div className="col-2">
                              <label className="small-font my-1 fw-600">
                                Commission (less than 5%)
                              </label>
                              <div className="position-relative">

                                <input
                                  type="text"
                                  className="small-font grey-bg-clr all-none rounded border-0 p-2 w-100"
                                  value={userWebsite.downline_comm || ""}
                                  onChange={(e) => {
                                    const inputValue = e.target.value;

                                    const numericValue = inputValue.replace(
                                      /[^0-9.]/g,
                                      ""
                                    );

                                    const dotCount = (
                                      numericValue.match(/\./g) || []
                                    ).length;
                                    let finalValue = numericValue;

                                    if (dotCount > 1) {
                                      finalValue = numericValue.slice(
                                        0,
                                        numericValue.lastIndexOf(".")
                                      );
                                    }

                                    const parts = finalValue.split(".");
                                    if (
                                      parts.length === 2 &&
                                      parts[1].length > 2
                                    ) {
                                      finalValue = `${parts[0]
                                        }.${parts[1].slice(0, 2)}`;
                                    }

                                    if (
                                      finalValue === "" ||
                                      (!isNaN(finalValue) &&
                                        Number(finalValue) <= 5)
                                    ) {
                                      const updatedWebsites = [...userWebsites];
                                      updatedWebsites[userIndex] = {
                                        ...updatedWebsites[userIndex],
                                        downline_comm: finalValue,
                                      };
                                      setUserWebsites(updatedWebsites);
                                    }
                                  }}
                                />

                                <span className="position-absolute end-0 top-50 translate-middle-y me-3">
                                  %
                                </span>
                              </div>
                              {errors[`downline_comm_${userWebsite.id}`] && (
                                <span className="text-danger small-font">
                                  {errors[`downline_comm_${userWebsite.id}`]}
                                </span>
                              )}
                            </div>
                            <div className="col-1">
                              <label className="small-font my-1 white-space fw-600">
                                Casino chip Value
                              </label>
                              <input
                                type="text"
                                maxLength={4}
                                className="small-font grey-bg-clr all-none rounded border-0 p-2 w-100"
                                value={userWebsite.caschip_values || ""}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  const numericValue = inputValue.replace(
                                    /[^0-9]/g,
                                    ""
                                  );
                                  const updatedWebsites = [...userWebsites];
                                  updatedWebsites[userIndex] = {
                                    ...updatedWebsites[userIndex],
                                    caschip_values: numericValue,
                                  };
                                  setUserWebsites(updatedWebsites);
                                }}
                              />
                              {errors[`caschip_values_${userWebsite.id}`] && (
                                <span className="text-danger small-font">
                                  {errors[`caschip_values_${userWebsite.id}`]}
                                </span>
                              )}
                            </div>

                            <div className="col-1 grey-bg-clr flex-center  white-space input-css4 ms-2 d-flex border-0 mt-4">
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
                              <label className="small-font mx-2">
                                Is Primary
                              </label>
                            </div>
                          </>
                        )}

                        {currentCommissionType == "3" && (
                          <>
                            <div className="col-2">
                              <label className="small-font my-1 fw-600">
                                Downline Share (upto 100%)
                              </label>
                              <div className="position-relative">

                                <input
                                  type="text"
                                  className="small-font grey-bg-clr all-none rounded border-0 p-2 w-100"
                                  value={userWebsite.share || ""}
                                  onChange={(e) => {
                                    const inputValue = e.target.value;

                                    const numericValue = inputValue.replace(
                                      /[^0-9.]/g,
                                      ""
                                    );

                                    const dotCount = (
                                      numericValue.match(/\./g) || []
                                    ).length;
                                    let finalValue = numericValue;
                                    if (dotCount > 1) {
                                      finalValue = numericValue.slice(
                                        0,
                                        numericValue.lastIndexOf(".")
                                      );
                                    }

                                    const parts = finalValue.split(".");
                                    if (
                                      parts.length === 2 &&
                                      parts[1].length > 2
                                    ) {
                                      finalValue = `${parts[0]
                                        }.${parts[1].slice(0, 2)}`;
                                    }

                                    const numericValueWithoutDot = parts[0];
                                    if (
                                      numericValueWithoutDot.length > 2 &&
                                      Number(numericValueWithoutDot) !== 100
                                    ) {
                                      finalValue = numericValueWithoutDot.slice(
                                        0,
                                        2
                                      );
                                    }

                                    const clampedValue =
                                      finalValue !== "" &&
                                        !isNaN(finalValue) &&
                                        Number(finalValue) <= 100
                                        ? finalValue
                                        : finalValue === ""
                                          ? ""
                                          : "100";

                                    const updatedWebsites = [...userWebsites];
                                    updatedWebsites[userIndex] = {
                                      ...updatedWebsites[userIndex],
                                      share: clampedValue,
                                    };
                                    setUserWebsites(updatedWebsites);
                                  }}
                                />

                                <span className="position-absolute end-0 top-50 translate-middle-y me-3">
                                  %
                                </span>
                              </div>
                              {errors[`share_${userWebsite.id}`] && (
                                <span className="text-danger small-font">
                                  {errors[`share_${userWebsite.id}`]}
                                </span>
                              )}
                            </div>
                            {/* <div className="col-2">
                              <label className="small-font my-1 fw-600">
                                Commission (less than 5%)
                              </label>
                              <div className="position-relative">

                                <input
                                  type="text"
                                  className="small-font grey-bg-clr all-none rounded border-0 p-2 w-100"
                                  value={userWebsite.downline_comm || ""}
                                  onChange={(e) => {
                                    const inputValue = e.target.value;

                                    const numericValue = inputValue.replace(
                                      /[^0-9.]/g,
                                      ""
                                    );

                                    const dotCount = (
                                      numericValue.match(/\./g) || []
                                    ).length;
                                    let finalValue = numericValue;

                                    if (dotCount > 1) {
                                      finalValue = numericValue.slice(
                                        0,
                                        numericValue.lastIndexOf(".")
                                      );
                                    }

                                    const parts = finalValue.split(".");
                                    if (
                                      parts.length === 2 &&
                                      parts[1].length > 2
                                    ) {
                                      finalValue = `${parts[0]
                                        }.${parts[1].slice(0, 2)}`;
                                    }

                                    if (
                                      finalValue !== "" &&
                                      !isNaN(finalValue) &&
                                      Number(finalValue) > 5
                                    ) {
                                      return;
                                    }

                                    const updatedWebsites = [...userWebsites];
                                    updatedWebsites[userIndex] = {
                                      ...updatedWebsites[userIndex],
                                      downline_comm: finalValue,
                                    };
                                    setUserWebsites(updatedWebsites);
                                  }}
                                />

                                <span className="position-absolute end-0 top-50 translate-middle-y me-3">
                                  %
                                </span>
                              </div>
                              {errors[`downline_comm_${userWebsite.id}`] && (
                                <span className="text-danger small-font">
                                  {errors[`downline_comm_${userWebsite.id}`]}
                                </span>
                              )}
                            </div> */}
                            <div className="col-1">
                              <label className="small-font my-1 white-space fw-600">
                                Casino chip Value
                              </label>
                              <input
                                type="text"
                                maxLength={4}
                                className="small-font grey-bg-clr all-none rounded border-0 p-2 w-100"
                                value={userWebsite.caschip_values || ""}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  const numericValue = inputValue.replace(
                                    /[^0-9]/g,
                                    ""
                                  );
                                  const updatedWebsites = [...userWebsites];
                                  updatedWebsites[userIndex] = {
                                    ...updatedWebsites[userIndex],
                                    caschip_values: numericValue,
                                  };
                                  setUserWebsites(updatedWebsites);
                                }}
                              />
                              {errors[`caschip_values_${userWebsite.id}`] && (
                                <span className="text-danger small-font">
                                  {errors[`caschip_values_${userWebsite.id}`]}
                                </span>
                              )}
                            </div>
                            <div className="col-1 grey-bg-clr flex-center  white-space input-css4 ms-2 border-0 d-flex  mt-4">
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
                              <label className="small-font mx-2">
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
              <div className="white-bg mt-2 pt-2">
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
                          styles={customStyles}
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
                          styles={customStyles}
                          options={adminWebsite?.map((admin) => ({
                            value: admin.id,
                            label: admin.web_name,
                          }))}
                          value={selectedAdmins[form.id] || null}
                          onChange={(selectedOption) =>
                            handleAdminRoleChange(form.id, selectedOption)
                          }
                          disabled={Number(selectedRole) === 2}
                          isDisabled={Number(selectedRole) === 2}
                        />
                      </div>
                      {errors[`admin_${form.id}`] && (
                        <span className="text-danger small-font">
                          {errors[`admin_${form.id}`]}
                        </span>
                      )}
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
                                <label>Commison Type</label>
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
                        <div className="row align-items-center g-2">
                          {" "}
                          <div className="col-md-2 col-12 input-css5 small-font">
                            <div className="black-font">User Website</div>
                            <Select
                              className="small-font rounded all-none my-2 w-100"
                              placeholder="Select a website"
                              options={userWebsitesList[form.id].map(
                                (site) => ({
                                  value: site.id,
                                  label: site.web_name,
                                })
                              )}
                              value={
                                selectedSiteIds[form.id]
                                  ? {
                                    value: selectedSiteIds[form.id],
                                    label:
                                      userWebsitesList[form.id].find(
                                        (site) =>
                                          site.id === selectedSiteIds[form.id]
                                      )?.web_url || "",
                                  }
                                  : null
                              }
                              onChange={(selectedOption) => {
                                const selectedSiteId = selectedOption
                                  ? selectedOption.value
                                  : null;
                                const adminId = selectedAdmins[form.id]?.value;

                                setSelectedSiteIds((prev) => ({
                                  ...prev,
                                  [form.id]: selectedSiteId,
                                }));

                                handleCheckboxChange(
                                  form.id,
                                  selectedSiteId,
                                  null,
                                  adminId
                                );
                              }}
                              styles={customStyles}
                            />
                            {errors[`userSite_${form.id}`] && (
                              <span className="text-danger small-font">
                                {errors[`userSite_${form.id}`]}
                              </span>
                            )}
                          </div>
                          {/* Commission Type Select */}
                          {selectedSiteIds[form.id] && (
                            <>
                              <div className="col-md-2 col-12">
                                <label className="small-font fw-600   d-block">
                                  Commission Type
                                </label>
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
                                        accountTypes[form.id]?.[
                                        selectedSiteIds[form.id]
                                        ]
                                    ) || null
                                  }
                                />
                                {errors[
                                  `commission_type_${selectedSiteIds[form.id]}`
                                ] && (
                                    <span className="text-danger small-font">
                                      {
                                        errors[
                                        `commission_type_${selectedSiteIds[form.id]
                                        }`
                                        ]
                                      }
                                    </span>
                                  )}
                              </div>

                              {/* Dynamic Fields - All in one row */}
                              <div className="col-md-8 col-12">
                                <div className="row align-items-center g-2">
                                  {/* Fields for Commission Type 2 */}
                                  {accountTypes[form.id]?.[
                                    selectedSiteIds[form.id]
                                  ] === "2" && (
                                      <>
                                        <div className="col position-relative">
                                          <label className="small-font my-1 fw-600 d-block">
                                            Downline Share (upto 100%)
                                          </label>
                                          <div className="grey-bg-clr rounded border-0 d-flex align-items-center small-font focus-within:border-primary h-100">

                                            <input
                                              type="text"
                                              className="small-font bg-transparent p-2 flex-grow-1"
                                              style={{
                                                border: "none",
                                                outline: "none",
                                                boxShadow: "none",
                                              }}
                                              onChange={(e) =>
                                                handleInputChange(
                                                  selectedSiteIds[form.id],
                                                  "share",
                                                  e.target.value
                                                )
                                              }
                                              onInput={(e) => {
                                                let value = e.target.value;

                                                value = value.replace(/[^0-9.]/g, "");

                                                const decimalCount = (value.match(/\./g) || []).length;
                                                if (decimalCount > 1) {
                                                  value = value.slice(0, -1);
                                                }

                                                if (!value.includes(".") && value.length > 0) {
                                                }

                                                if (value.includes(".")) {
                                                  let parts = value.split(".");
                                                  value = parts[0] + "." + (parts[1] || "").slice(0, 2);
                                                }

                                                if (parseFloat(value) > 100) {
                                                  value = value.slice(0, -1);
                                                }

                                                e.target.value = value;
                                              }}
                                              onBlur={(e) => {
                                                let value = e.target.value;
                                                if (value && !value.includes(".")) {
                                                  value = value + ".00";
                                                  e.target.value = value;
                                                  handleInputChange(
                                                    selectedSiteIds[form.id],
                                                    "share",
                                                    value
                                                  );
                                                } else if (value.includes(".")) {
                                                  let parts = value.split(".");
                                                  if (parts[1].length === 1) {
                                                    value = parts[0] + "." + parts[1] + "0";
                                                    e.target.value = value;
                                                    handleInputChange(
                                                      selectedSiteIds[form.id],
                                                      "share",
                                                      value
                                                    );
                                                  }
                                                }
                                              }}
                                            />

                                            <span className="px-2 text-muted">
                                              %
                                            </span>
                                          </div>
                                          {errors[
                                            `share_${selectedSiteIds[form.id]}`
                                          ] && (
                                              <span className="text-danger small-font">
                                                {
                                                  errors[
                                                  `share_${selectedSiteIds[form.id]
                                                  }`
                                                  ]
                                                }
                                              </span>
                                            )}
                                        </div>

                                        {/* <div className="col position-relative">
                                          <label className="small-font my-1 fw-600 d-block">
                                            Commission (less than 5%)
                                          </label>
                                          <div className="grey-bg-clr rounded border-0 d-flex align-items-center small-font focus-within:border-primary h-100">

                                            <input
                                              type="text"
                                              className="small-font bg-transparent p-2 flex-grow-1"
                                              style={{
                                                border: "none",
                                                outline: "none",
                                                boxShadow: "none",
                                              }}
                                              onChange={(e) =>
                                                handleInputChange(
                                                  selectedSiteIds[form.id],
                                                  "downline_comm",
                                                  e.target.value
                                                )
                                              }
                                              onInput={(e) => {
                                                let value = e.target.value;

                                                // Allow only numbers & decimals
                                                value = value.replace(/[^0-9.]/g, "");

                                                // Ensure only one decimal point
                                                const decimalCount = (value.match(/\./g) || []).length;
                                                if (decimalCount > 1) {
                                                  value = value.slice(0, -1);
                                                }

                                                // Restrict to 2 decimal places if decimal exists
                                                if (value.includes(".")) {
                                                  let parts = value.split(".");
                                                  value = parts[0] + "." + parts[1].slice(0, 2);
                                                }

                                                // Validate range (0-5)
                                                if (value && !isNaN(value)) {
                                                  const numValue = parseFloat(value);
                                                  if (numValue < 0) {
                                                    value = "0";
                                                  } else if (numValue > 5) {
                                                    value = "5";
                                                  }
                                                }

                                                e.target.value = value;
                                              }}
                                              onBlur={(e) => {
                                                let value = e.target.value;

                                                // Only format if there's a value
                                                if (value && !isNaN(value)) {
                                                  // Format whole numbers to 2 decimal places
                                                  if (!value.includes(".")) {
                                                    value = value + ".00";
                                                  }
                                                  // Format numbers with 1 decimal digit to 2 decimal places
                                                  else if (value.split(".")[1].length === 1) {
                                                    value = value + "0";
                                                  }

                                                  // Final range check
                                                  const numValue = parseFloat(value);
                                                  if (numValue > 5) {
                                                    value = "5.00";
                                                  } else if (numValue < 0) {
                                                    value = "0.00";
                                                  }

                                                  // Update the input and trigger onChange
                                                  e.target.value = value;
                                                  handleInputChange(
                                                    selectedSiteIds[form.id],
                                                    "downline_comm",
                                                    value
                                                  );
                                                }
                                              }}
                                            />

                                            <span className="px-2 text-muted">
                                              %
                                            </span>
                                          </div>
                                          {errors[
                                            `downline_comm_${selectedSiteIds[form.id]
                                            }`
                                          ] && (
                                              <span className="text-danger small-font">
                                                {
                                                  errors[
                                                  `downline_comm_${selectedSiteIds[form.id]
                                                  }`
                                                  ]
                                                }
                                              </span>
                                            )}
                                        </div> */}

                                        <div className="col position-relative">
                                          <label className="small-font fw-600 my-1 d-block">
                                            Casino chip Value
                                          </label>
                                          <div className="grey-bg-clr rounded border-0 d-flex align-items-center small-font focus-within:border-primary h-100">
                                            <input
                                              className="small-font bg-transparent p-2 flex-grow-1"
                                              style={{
                                                border: "none",
                                                outline: "none",
                                                boxShadow: "none",
                                              }}
                                              // placeholder="Casino Chip Value"
                                              onChange={(e) =>
                                                handleInputChange(
                                                  selectedSiteIds[form.id],
                                                  "caschip_values",
                                                  e.target.value
                                                )
                                              }
                                              onInput={(e) => {
                                                let value = e.target.value;
                                                value = value.replace(
                                                  /[^0-9]/g,
                                                  ""
                                                );

                                                if (parseInt(value) > 9999) {
                                                } else if (
                                                  parseInt(value) < 0
                                                ) {
                                                  value = "0";
                                                }

                                                if (
                                                  parseInt(value) < 0 ||
                                                  parseInt(value) > 9999
                                                ) {
                                                  e.target.value = "";
                                                } else {
                                                  e.target.value = value;
                                                }
                                              }}
                                              maxLength={4}
                                            />
                                          </div>
                                          {errors[
                                            `caschip_values_${selectedSiteIds[form.id]
                                            }`
                                          ] && (
                                              <span className="text-danger small-font">
                                                {
                                                  errors[
                                                  `caschip_values_${selectedSiteIds[form.id]
                                                  }`
                                                  ]
                                                }
                                              </span>
                                            )}
                                        </div>

                                        <div className="col-2 position-relative">
                                          <label
                                            className="small-font my-1 d-block"
                                            style={{ visibility: "hidden" }}
                                          >
                                            Primary
                                          </label>
                                          <div className="rounded grey-bg-clr d-flex align-items-center small-font p-2 border-0 h-100">
                                            <input
                                              type="checkbox"
                                              className="me-2"
                                              checked={
                                                addWebsites.find(
                                                  (site) =>
                                                    site.id ===
                                                    selectedSiteIds[form.id]
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
                                            <label className="small-font m-0">
                                              Is Primary
                                            </label>
                                          </div>
                                        </div>
                                      </>
                                    )}

                                  {accountTypes[form.id]?.[
                                    selectedSiteIds[form.id]
                                  ] === "3" && (
                                      <>
                                        <div className="col position-relative">
                                          <label className="small-font fw-600 my-1 d-block">
                                            Downline Share (upto 100%)
                                          </label>
                                          <div className="grey-bg-clr rounded border-0 d-flex align-items-center small-font focus-within:border-primary h-100">

                                            <input
                                              type="text"
                                              className="small-font bg-transparent p-2 flex-grow-1"
                                              style={{
                                                border: "none",
                                                outline: "none",
                                                boxShadow: "none",
                                              }}
                                              onChange={(e) =>
                                                handleInputChange(
                                                  selectedSiteIds[form.id],
                                                  "share",
                                                  e.target.value
                                                )
                                              }
                                              onInput={(e) => {
                                                let value = e.target.value;

                                                value = value.replace(/[^0-9.]/g, "");

                                                const decimalCount = (value.match(/\./g) || []).length;
                                                if (decimalCount > 1) {
                                                  value = value.slice(0, -1);
                                                }
                                                if (value.includes(".")) {
                                                  let parts = value.split(".");
                                                  value = parts[0] + "." + (parts[1] || "").slice(0, 2);
                                                }

                                                if (parseFloat(value) > 100) {
                                                  value = value.slice(0, -1);
                                                }

                                                e.target.value = value;
                                              }}
                                              onBlur={(e) => {
                                                let value = e.target.value;
                                                if (value && !value.includes(".")) {
                                                  value = value + ".00";
                                                  e.target.value = value;
                                                  handleInputChange(
                                                    selectedSiteIds[form.id],
                                                    "share",
                                                    value
                                                  );
                                                } else if (value.includes(".")) {
                                                  let parts = value.split(".");
                                                  if (parts[1].length === 1) {
                                                    value = parts[0] + "." + parts[1] + "0";
                                                    e.target.value = value;
                                                    handleInputChange(
                                                      selectedSiteIds[form.id],
                                                      "share",
                                                      value
                                                    );
                                                  }
                                                }
                                              }}
                                            />

                                            <span className="px-2 text-muted">
                                              %
                                            </span>
                                          </div>
                                          {errors[
                                            `share_${selectedSiteIds[form.id]}`
                                          ] && (
                                              <span className="text-danger small-font">
                                                {
                                                  errors[
                                                  `share_${selectedSiteIds[form.id]
                                                  }`
                                                  ]
                                                }
                                              </span>
                                            )}
                                        </div>

                                        {/* <div className="col position-relative">
                                          <label className="small-font fw-600 my-1 d-block">
                                            Commission (less than 5%)
                                          </label>
                                          <div className="grey-bg-clr rounded border-0 d-flex align-items-center small-font focus-within:border-primary h-100">
                                            <input
                                              type="text"
                                              className="small-font bg-transparent p-2 flex-grow-1"
                                              style={{
                                                border: "none",
                                                outline: "none",
                                                boxShadow: "none",
                                              }}
                                              onChange={(e) =>
                                                handleInputChange(
                                                  selectedSiteIds[form.id],
                                                  "downline_comm",
                                                  e.target.value
                                                )
                                              }
                                              onInput={(e) => {
                                                let value = e.target.value;

                                                // Allow only numbers & decimals
                                                value = value.replace(/[^0-9.]/g, "");

                                                // Ensure only one decimal point
                                                const decimalCount = (value.match(/\./g) || []).length;
                                                if (decimalCount > 1) {
                                                  value = value.slice(0, -1);
                                                }

                                                // Restrict to 2 decimal places if decimal exists
                                                if (value.includes(".")) {
                                                  let parts = value.split(".");
                                                  value = parts[0] + "." + parts[1].slice(0, 2);
                                                }

                                                // Validate range (0-5)
                                                if (value && !isNaN(value)) {
                                                  const numValue = parseFloat(value);
                                                  if (numValue < 0) {
                                                    value = "0";
                                                  } else if (numValue > 5) {
                                                    value = "5";
                                                  }
                                                }

                                                e.target.value = value;
                                              }}
                                              onBlur={(e) => {
                                                let value = e.target.value;

                                                if (value && !isNaN(value)) {
                                                  if (!value.includes(".")) {
                                                    value = value + ".00";
                                                  }
                                                  else if (value.split(".")[1].length === 1) {
                                                    value = value + "0";
                                                  }

                                                  const numValue = parseFloat(value);
                                                  if (numValue > 5) {
                                                    value = "5.00";
                                                  } else if (numValue < 0) {
                                                    value = "0.00";
                                                  }

                                                  e.target.value = value;
                                                  handleInputChange(
                                                    selectedSiteIds[form.id],
                                                    "downline_comm",
                                                    value
                                                  );
                                                }
                                              }}
                                            />

                                            <span className="px-2 text-muted">
                                              %
                                            </span>
                                          </div>
                                          {errors[
                                            `downline_comm_${selectedSiteIds[form.id]
                                            }`
                                          ] && (
                                              <span className="text-danger small-font">
                                                {
                                                  errors[
                                                  `downline_comm_${selectedSiteIds[form.id]
                                                  }`
                                                  ]
                                                }
                                              </span>
                                            )}
                                        </div> */}

                                        <div className="col position-relative">
                                          <label className="small-font my-1 fw-600 d-block">
                                            Casino Chip Value
                                          </label>
                                          <div className="grey-bg-clr rounded border-0 d-flex align-items-center small-font focus-within:border-primary h-100">
                                            <input
                                              className="small-font bg-transparent p-2 flex-grow-1"
                                              style={{
                                                border: "none",
                                                outline: "none",
                                                boxShadow: "none",
                                              }}
                                              onChange={(e) =>
                                                handleInputChange(
                                                  selectedSiteIds[form.id],
                                                  "caschip_values",
                                                  e.target.value
                                                )
                                              }
                                              onInput={(e) => {
                                                let value = e.target.value;
                                                value = value.replace(
                                                  /[^0-9]/g,
                                                  ""
                                                );

                                                if (parseInt(value) > 9999) {
                                                } else if (
                                                  parseInt(value) < 0
                                                ) {
                                                  value = "0";
                                                }

                                                if (
                                                  parseInt(value) < 0 ||
                                                  parseInt(value) > 9999
                                                ) {
                                                  e.target.value = "";
                                                } else {
                                                  e.target.value = value;
                                                }
                                              }}
                                              maxLength={4}
                                            />
                                          </div>
                                          {errors[
                                            `caschip_values_${selectedSiteIds[form.id]
                                            }`
                                          ] && (
                                              <span className="text-danger small-font">
                                                {
                                                  errors[
                                                  `caschip_values_${selectedSiteIds[form.id]
                                                  }`
                                                  ]
                                                }
                                              </span>
                                            )}
                                        </div>

                                        <div className="col-2 position-relative">
                                          <label
                                            className="small-font my-1 d-block"
                                            style={{ visibility: "hidden" }}
                                          >
                                            Primary
                                          </label>
                                          <div className="rounded grey-bg-clr d-flex align-items-center small-font p-2 border-0 h-100">
                                            <input
                                              type="checkbox"
                                              className="me-2"
                                              checked={
                                                addWebsites.find(
                                                  (site) =>
                                                    site.id ===
                                                    selectedSiteIds[form.id]
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
                                            <label className="small-font m-0">
                                              Is Primary
                                            </label>
                                          </div>
                                        </div>
                                      </>
                                    )}
                                </div>
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
              </div>
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
          // discription={`Updated ${selectedRole} ${loginName} Successfully`}
          discription={`Updated Successfully`}
        />
      </div>
    </>
  );
}

export default EditNewDirector;
