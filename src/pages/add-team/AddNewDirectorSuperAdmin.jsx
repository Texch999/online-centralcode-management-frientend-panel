import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
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
  getDirectorAccessWebites,
  getOwnerCurrencies,
} from "../../api/apiMethods";
import { adminRoles, commissionTypes } from "../../utils/enum";
import { customStyles } from "../../components/ReactSelectStyles";
import { useLocation, useNavigate } from "react-router-dom";
import SuccessPopup from "../popups/SuccessPopup";
import { BiSolidMessageAltError } from "react-icons/bi";
import { Spinner } from "react-bootstrap";

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
  const [forms, setForms] = useState([{ id: Date.now() }]);
  const [adminWebsite, setAllAdminWebsite] = useState([]);
  const [selectedAdmins, setSelectedAdmins] = useState({});
  const [userWebsitesList, setUserWebsitesList] = useState({});
  const [selectedWebsites, setSelectedWebsites] = useState({});
  const [accountTypes, setAccountTypes] = useState({});
  const [websiteDetails, setWebsiteDetails] = useState({});
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
  const [isCreditAllowed, setIsCreditAllowed] = useState(false);
  const [creditValue, setCreditValue] = useState(2);
  const [creditreference, setCreditReference] = useState(null);
  const [selectedSiteIds, setSelectedSiteIds] = useState({});
  const [selectedRemarks, setSelectedRemarks] = useState({});
  const [addDepositChips, setAddDepositChips] = useState("");
  const [depositRemark, setDepositRemark] = useState({
    value: "offline",
    label: "Offline",
  });
  const [enteredPaidAmount, setEnteredPaidAmount] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [selectedUserSitesByAdmin, setSelectedUserSitesByAdmin] = useState({});
  const [lastSelectedAdmin, setLastSelectedAdmin] = useState(null); // Track last selected admin
  const [loader, setLoader] = useState(false);

  const toggleCreditAllowed = () => {
    const newIsCreditAllowed = !isCreditAllowed;
    setIsCreditAllowed(newIsCreditAllowed);
    setCreditValue(newIsCreditAllowed ? 1 : 2);
  };

  const handleUserSiteSelection = (formId, adminSiteId, userSiteId) => {
    setSelectedUserSitesByAdmin((prev) => ({
      ...prev,
      [adminSiteId]: [...(prev[adminSiteId] || []), userSiteId],
    }));
  };

  const getAvailableUserSites = (formId, adminSiteId) => {
    const selectedUserSites = selectedUserSitesByAdmin[adminSiteId] || [];
    return userWebsitesList[formId]?.filter(
      (userSite) => !selectedUserSites.includes(userSite.id)
    );
  };

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

  const remarkOptions = [
    { value: "offline", label: "Offline" },
    ...(isCreditAllowed ? [{ value: "credit", label: "Credit" }] : []),
  ];

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

    // Update the last selected admin whenever an admin is selected
    setLastSelectedAdmin(selectedOption);

    const adminData = adminWebsite.find(
      (admin) => admin.id === selectedOption.value
    );
    setUserWebsitesList((prev) => ({
      ...prev,
      [formId]: adminData?.userWebsites || [],
    }));
  };

  const handleCheckboxChange = (formId, userSiteId) => {
    setSelectedWebsites((prev) => ({
      ...prev,
      [formId]: {
        ...prev[formId],
        [userSiteId]: !prev[formId]?.[userSiteId],
      },
    }));

    // Clear previous data when reselecting a user site
    setAccountTypes((prev) => ({
      ...prev,
      [formId]: {
        ...prev[formId],
        [userSiteId]: null,
      },
    }));

    setWebsiteDetails((prevDetails) => ({
      ...prevDetails,
      [formId]: {
        ...prevDetails[formId],
        [userSiteId]: {},
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

  const validateWebsiteFields = (fields, accountType) => {
    const errors = {};
    const comm_type = fields.commission_type;
    // Common validations for all account types
    if (!fields.commission_type || fields.commission_type == "") {
      errors.commission_type = "Commission type is required";
      setShowWebsiteCreationErrors(null);
    }
    // Conditional validations based on account type
    if (comm_type == "1") {
      setShowWebsiteCreationErrors(null);
      // Validations for account type 1
      if (!fields.monthly_amount || fields.monthly_amount.trim() === "") {
        errors.monthly_amount = "Amount is required.";
      } else if (isNaN(fields.monthly_amount)) {
        errors.monthly_amount = "Monthly Amount must be a number.";
      }

      if (!fields.max_chips_monthly || fields.max_chips_monthly.trim() === "") {
        errors.max_chips_monthly = "Chips  is required.";
      } else if (isNaN(fields.max_chips_monthly)) {
        errors.max_chips_monthly = "Max Chips Monthly must be a number.";
      }

      if (!fields.downline_comm || fields.downline_comm.trim() === "") {
        errors.downline_comm = "Commission is required.";
      } else if (isNaN(fields.downline_comm)) {
        errors.downline_comm = "Commission must be a number.";
      } else if (parseInt(fields.downline_comm) > 100) {
        errors.downline_comm =
          "Downline Commission must be less than or equal to 100.";
      }

      if (
        fields.casino_allowed === "1" &&
        (!fields.casino_chip_value || fields.casino_chip_value.trim() === "")
      ) {
        errors.casino_chip_value = "Casino Chip Value is required.";
      } else if (
        fields.casino_allowed === "1" &&
        isNaN(fields.casino_chip_value)
      ) {
        errors.casino_chip_value = "Casino Chip Value must be a number.";
      }
    } else if (comm_type === "2" || comm_type === "3") {
      setShowWebsiteCreationErrors(null);
      // Validations for account types 2 and 3
      if (!fields.share || fields.share.trim() === "") {
        errors.share = "Share is required.";
      } else if (isNaN(fields.share)) {
        errors.share = "Share must be a number.";
      } else if (parseInt(fields.share) > 100) {
        errors.share = "Share must be less than or equal to 100.";
      }

      if (!fields.downline_comm || fields.downline_comm.trim() === "") {
        errors.downline_comm = "Commission is required.";
      } else if (isNaN(fields.downline_comm)) {
        errors.downline_comm = "Commission must be a number.";
      } else if (parseInt(fields.downline_comm) > 100) {
        errors.downline_comm =
          "Downline Commission must be less than or equal to 100.";
      }
      if (!fields.caschip_values || fields.caschip_values.trim() === "") {
        errors.caschip_values = "Chip Value is required.";
      } else if (isNaN(fields.caschip_values)) {
        errors.caschip_values = "Chip Value must be a number.";
      }
    }
    return errors;
  };

  const handleInputChange = (formId, websiteId, field, value) => {
    setWebsiteDetails((prevDetails) => ({
      ...prevDetails,
      [formId]: {
        ...prevDetails[formId],
        [websiteId]: {
          ...prevDetails[formId]?.[websiteId],
          [field]: value,
        },
      },
    }));
  };

  const renderErrorMessage = (formId, websiteId, field) => {
    const errorMessage = validationErrors[formId]?.[websiteId]?.[field];
    return errorMessage ? (
      <span className="small-font error">{errorMessage}</span>
    ) : null;
  };

  const handleSubmit = (e) => {
    console.log("management clicked");

    e.preventDefault();
    let hasErrors = false;
    const newValidationErrors = {};

    // Validate login and general fields
    const loginErrors = validateForm();
    if (Object.keys(loginErrors).length > 0) {
      console.log(loginErrors, "=>loginErrors");
      hasErrors = true;
      setErrors(loginErrors);
    }

    // Ensure forms is an array
    if (!Array.isArray(forms)) {
      return;
    }

    // Validate website fields for each form
    forms.forEach((form) => {
      const formId = form.id;
      const websiteId = selectedSiteIds[formId];

      if (websiteId) {
        const fields = websiteDetails[formId]?.[websiteId] || {};
        const errors = validateWebsiteFields(
          fields,
          accountTypes[formId]?.[websiteId]
        );
        if (Object.keys(errors).length > 0) {
          hasErrors = true;
          newValidationErrors[formId] = {
            ...newValidationErrors[formId],
            [websiteId]: errors,
          };
        }
      }
    });

    // Update the validation errors state
    setValidationErrors(newValidationErrors);

    // If there are validation errors, stop form submission
    if (hasErrors) {
      return;
    }
    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }

    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }
    // Check if at least one admin website is selected
    if (!selectedAdmins || Object.keys(selectedAdmins).length === 0) {
      setShowWebsiteCreationErrors("Please select at least one Admin Website");
      console.log("No admin website selected");
      return;
    }

    // Check if at least one user website is selected
    if (!selectedWebsites || Object.keys(selectedWebsites).length === 0) {
      setShowWebsiteCreationErrors("Please select at least one User Website.");
      return;
    } else {
      setShowWebsiteCreationErrors(null);
    }

    // Map selected user websites and their details into the payload
    const selectedUserWebsites = forms.map((form) => {
      const formId = form.id;
      const websiteId = selectedSiteIds[formId];

      if (!websiteId) return null;
      const userSite = userWebsitesList[formId]?.find(
        (site) => site.id === websiteId
      );

      if (!userSite) return null;
      const accotypeid = accountTypes[formId]?.[websiteId];

      if (!accotypeid) return null;
      let websiteData = {
        admin_panel_id: selectedAdmins[formId]?.value,
        user_paner_id: userSite.id,
        commission_type: accotypeid,
      };

      if (accotypeid === "2" || accotypeid === "3") {
        websiteData.share = parseFloat(
          websiteDetails[formId]?.[websiteId]?.share || 0
        );
        websiteData.caschip_values = parseFloat(
          websiteDetails[formId]?.[websiteId]?.caschip_values || 0
        );
        websiteData.downline_comm = parseFloat(
          websiteDetails[formId]?.[websiteId]?.downline_comm || 0
        );
        websiteData.is_casino = 1;
        websiteData.is_primary =
          websiteDetails[formId]?.[websiteId]?.isPrimary == 1 ? 1 : 2;
      }

      return websiteData;
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
      is_credit: isCreditAllowed ? 1 : 2,
      currency_id: selectedCurrencyCode,
      accessWebsites: validUserWebsites,
      credit_reference: isCreditAllowed ? creditreference : 0,
    };

    if (addDepositChips) {
      finalData.totalAmount = parseFloat(addDepositChips);
      finalData.totalChips = parseFloat(addDepositChips);
    }

    if (depositRemark.value == "credit" && isCreditAllowed) {
      finalData.creditAmount =
        parseFloat(addDepositChips) - parseFloat(enteredPaidAmount);
      finalData.offDepositAmount = parseFloat(enteredPaidAmount);
      finalData.depositType = 1;
    } else {
      finalData.depositType = 2;
    }
    setLoader(true);

    createDirector(finalData)
      .then((response) => {
        if (response.status === true) {
          setLoader(false);
          setSuccessPopupOpen(true);
          setCreateDescription(
            `${
              selectedRole == 1 ? "Director" : "Superadmin"
            } Created Successfully`
          );
          setTimeout(() => {
            navigate("/director-admin");
          }, 2000);
        } else {
          console.log("Something went wrong");
        }
      })
      .catch((error) => {
        console.log(error, "==>error");
        setLoader(false);
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
          websiteData.is_casino = 1;
          // Add is_primary for account types 2 and 3
          websiteData.is_primary = websiteDetails[userSite.website_access_id]
            ?.isPrimary
            ? 1
            : 2;
        }

        if (accotypeid === "1") {
          websiteData.monthly_amount = parseInt(
            websiteDetails[userSite.website_access_id]?.monthly_amount || null
          );
          websiteData.chip_percentage =
            (parseInt(
              websiteDetails[userSite.website_access_id]?.monthly_amount || 0
            ) /
              parseInt(
                websiteDetails[userSite.website_access_id]?.max_chips_monthly ||
                  0
              )) *
            100;
          websiteData.max_chips_monthly = parseInt(
            websiteDetails[userSite.website_access_id]?.max_chips_monthly ||
              null
          );
          //casino allowed
          websiteData.is_casino =
            websiteDetails[userSite.website_access_id]?.casino_allowed == 1
              ? 1
              : 2;

          if (
            (websiteData.is_casino =
              websiteDetails[userSite.website_access_id]?.casino_allowed == 1)
          ) {
            websiteData.caschip_values = parseFloat(
              websiteDetails[userSite.website_access_id]?.casino_chip_value
            );
          }
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
      is_credit: creditValue,
      credit_reference: creditreference,
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

  const validateForm = () => {
    let newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required.";
    } else if (name.trim().length < 6) {
      newErrors.name = "Name must be at least 6 characters long.";
    }

    if (!loginName.trim()) {
      newErrors.loginName = "Login Name is required.";
    } else if (loginName.trim().length < 6) {
      newErrors.loginName = "Login Name must be at least 6 characters long.";
    }

    if (!selectedRole) newErrors.selectedRole = "Role selection is required.";
    if (!selectedCountryCode)
      newErrors.selectedCountryCode = "Country is required.";
    if (!selectedCurrencyCode)
      newErrors.selectedCurrencyCode = "Currency is required.";
    if (!password) {
      newErrors.password = " Password is required.";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
    }
    if (!managementPassword) {
      newErrors.managementPassword = "Management Password is required.";
    }
    if (isCreditAllowed) {
      if (!creditreference || creditreference.trim() === "") {
        newErrors.creditreference = "Credit limit is required.";
      }
      if (addDepositChips != "") {
        if (!depositRemark) {
          newErrors.depositRemark = "Deposit remark is required.";
        }
      }
      const chipsValue = Number(addDepositChips);
      const paidAmount = Number(enteredPaidAmount);

      if (depositRemark.value == "credit") {
        if (!addDepositChips) {
          newErrors.addDepositChips = "addDepositChips is required.";
        }

        if (!enteredPaidAmount) {
          newErrors.enteredPaidAmount = "Enter paid amount is required.";
        } else if (chipsValue < paidAmount) {
          newErrors.enteredPaidAmount = `Paid amount cannot exceed the ${chipsValue}`;
        } else if (chipsValue == 0) {
          newErrors.enteredPaidAmount = "Please enter deposit chips";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addAnotherForm = () => {
    const newFormId = Date.now();
    setForms((prev) => [...prev, { id: newFormId }]);

    // If there's a last selected admin, automatically select it in the new form
    if (lastSelectedAdmin) {
      setSelectedAdmins((prev) => ({
        ...prev,
        [newFormId]: lastSelectedAdmin,
      }));

      const adminData = adminWebsite.find(
        (admin) => admin.id === lastSelectedAdmin.value
      );
      setUserWebsitesList((prev) => ({
        ...prev,
        [newFormId]: adminData?.userWebsites || [],
      }));
    }
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

  const filteredRoles = adminRolesArray.filter((userRole) => {
    if (role === "management") {
      return userRole.label === "director" || userRole.label === "SuperAdmin";
    } else if (role === "director") {
      return userRole.label === "SuperAdmin";
    }
    return false;
  });

  const youpay = Number(addDepositChips) - Number(enteredPaidAmount);
  return (
    <>
      <div className="m-2 ">
      {loader && <div className="my-load">
        <div className="loader "></div></div>}
        <div className="d-flex align-items-center justify-content-between py-2">
          <h5 className="yellow-font">Add Director & Super Admin </h5>
          <span
            className="white-font me-2  p-2 br-10 yellow-bg  cursor-pointer small-font"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="mx-1" /> Back
          </span>
        </div>
        <div className="p-3 white-bg br-10 login-box-shadow">
          <div className="row">
            <div className="col p-1">
              <label className="small-font my-1">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="small-font rounded all-none input-css w-100"
                value={name}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[a-zA-Z\s]*$/.test(value)) {
                    setName(value);
                  }
                }}
              />
              {errors?.name && (
                <span className="x-small-font error">{errors?.name}</span>
              )}
            </div>

            <div className="col p-1">
              <label className="small-font my-1">Login Name</label>
              <input
                type="text"
                placeholder="Enter Login Name"
                className="small-font rounded all-none input-css w-100"
                value={loginName}
                maxLength={15}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[a-zA-Z0-9_]*$/.test(value)) {
                    setLoginName(value);
                  }
                }}
                required
              />
              {errors?.loginName && (
                <span className="small-font error">{errors?.loginName}</span>
              )}
            </div>

            <div className="col p-1">
              <label className="small-font my-1">Role</label>
              <Select
                className="small-font rounded all-none  w-100"
                placeholder="Select"
                options={filteredRoles}
                isSearchable={false}
                value={filteredRoles.find(
                  (role) => role.value === selectedRole
                )}
                onChange={(selectedOption) =>
                  setSelectedRole(selectedOption?.value)
                }
                styles={customStyles}
              />
              {errors.selectedRole && (
                <span className="error x-small-font">
                  {errors.selectedRole}
                </span>
              )}
            </div>
            <div className="col p-1">
              <label className="small-font my-1">Country</label>
              <Select
                className="small-font rounded all-none w-100"
                styles={customStyles}
                value={
                  selectedCountryCode
                    ? {
                        value: selectedCountryCode,
                        label: countryData?.find(
                          (country) => country.id === selectedCountryCode
                        )?.name,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  handleCountryChange({
                    target: {
                      value: selectedOption ? selectedOption.value : "",
                    },
                  })
                }
                options={[
                  { value: "", label: "Select" },
                  ...(countryData?.map((country) => ({
                    value: country.id,
                    label: country.name,
                  })) || []),
                ]}
                placeholder="Select"
                filterOption={(option, searchText) => {
                  const lettersOnly = searchText.replace(/[^a-zA-Z]/g, "");
                  return option.label
                    .toLowerCase()
                    .includes(lettersOnly.toLowerCase());
                }}
                onInputChange={(inputValue) => {
                  return inputValue.replace(/[^a-zA-Z]/g, "");
                }}
              />
              {errors?.selectedCountryCode && (
                <span className="small-font error">
                  {errors?.selectedCountryCode}
                </span>
              )}
            </div>
          </div>
          <div className="row ">
            <div className="col p-1 my-2">
              <label className="small-font my-1">Currency</label>
              <Select
                className="small-font rounded all-none w-100"
                styles={customStyles}
                value={
                  selectedCurrencyCode
                    ? {
                        value: selectedCurrencyCode,
                        label:
                          currencyData?.find(
                            (currency) =>
                              currency.country_id === selectedCurrencyCode
                          )?.currency_name +
                          " --- " +
                          currencyData?.find(
                            (currency) =>
                              currency.country_id === selectedCurrencyCode
                          )?.name,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  handleCurrencyChange({
                    target: {
                      value: selectedOption ? selectedOption.value : "",
                    },
                  })
                }
                options={[
                  { value: "", label: "Select" },
                  ...(currencyData?.map((currency) => ({
                    value: currency.country_id,
                    label: `${currency.currency_name} --- ${currency.name}`,
                  })) || []),
                ]}
                placeholder="Select"
                filterOption={(option, searchText) => {
                  const lettersOnly = searchText.replace(/[^a-zA-Z]/g, "");
                  return option.label
                    .toLowerCase()
                    .includes(lettersOnly.toLowerCase());
                }}
                onInputChange={(inputValue) => {
                  return inputValue.replace(/[^a-zA-Z]/g, "");
                }}
              />
              {errors?.selectedCurrencyCode && (
                <span className="small-font error">
                  {errors?.selectedCurrencyCode}
                </span>
              )}
            </div>
            {mode === "edit" ? null : (
              <>
                <div className="p-1 col position-relative my-2">
                  <label className="small-font my-1">Password</label>
                  <div className="w-100 input-css4">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="small-font rounded all-none input-css  w-90"
                      placeholder="Enter"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
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
                    <span className="small-font error">{errors?.password}</span>
                  )}
                </div>
                <div className="p-1 col position-relative my-2 ">
                  <label className="small-font my-1">Confirm Password</label>
                  <div className="w-100 input-css4">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className=" small-font rounded all-none input-css  w-90"
                      placeholder="Enter"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <span
                    className="position-absolute "
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
                    <span className="small-font error">
                      {errors?.confirmPassword}
                    </span>
                  )}
                </div>
                <div className="p-1 col-3 position-relative my-2">
                  <label className="small-font my-1">Management Password</label>
                  <div className="w-100 input-css4">
                    <input
                      type={showManagementPassword ? "text" : "password"}
                      className=" small-font rounded all-none input-css  w-90"
                      placeholder="Enter"
                      required
                      value={managementPassword}
                      onChange={(e) => setManagementPassword(e.target.value)}
                    />
                  </div>
                  <span
                    className="position-absolute"
                    style={{
                      right: "1.5rem",
                      top: "2.3rem",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      togglePasswordVisibility(setShowManagementPassword)
                    }
                  >
                    {showManagementPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                  {errors?.managementPassword && (
                    <span className="small-font error">
                      {errors?.managementPassword}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="row ">
            <div className="col-3 position-relative mt-1">
              <label className="fw-600 small-font"> </label>
              <div className="input-css mt-2 d-flex justify-content-start align-items-center small-font">
                <input
                  type="checkbox"
                  checked={isCreditAllowed}
                  onChange={toggleCreditAllowed}
                />
                <label className="small-font ms-2">CREDIT ALLOWED </label>
              </div>
            </div>
            {isCreditAllowed && (
              <div className="col-3 ">
                <label className="fw-600  small-font">Credit Limit</label>
                <div className="input-css mt-2 d-flex justify-content-between align-items-center small-font">
                  <input
                    type="text"
                    className="small-font rounded all-none w-100"
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
                {errors?.creditreference && (
                  <span className="small-font error">
                    {errors?.creditreference}
                  </span>
                )}
              </div>
            )}
            <div className="col-3 position-relative mt-1">
              <label className="fw-600 small-font">Add Deposit Chips</label>
              <div className="input-css mt-2 d-flex justify-content-between align-items-center small-font">
                <input
                  type="number"
                  placeholder="Enter Chips"
                  className="small-font bg-none w-75 all-none appearance"
                  onChange={(e) => {
                    setAddDepositChips(e.target.value);
                  }}
                />
              </div>
              {errors?.addDepositChips && (
                <span className="small-font error">
                  {errors?.addDepositChips}
                </span>
              )}
            </div>

            <div className="col-3 position-relative mt-1">
              <label className="fw-600 small-font">Total Paid Amount</label>
              <div className="input-css mt-2 d-flex justify-content-between align-items-center small-font">
                <input
                  type="text"
                  maxLength={2}
                  className="small-font bg-none w-75 all-none"
                  value={Number(addDepositChips)}
                  readOnly
                />
              </div>
            </div>

            <div className="col-3 small-font position-relative mt-2">
              <label className="fw-600 small-font mb-2">Deposit Remark</label>
              <Select
                value={
                  depositRemark.value == "credit" && isCreditAllowed
                    ? depositRemark
                    : { value: "offline", label: "Offline" }
                }
                onChange={(selectedOption) => setDepositRemark(selectedOption)}
                options={remarkOptions}
                placeholder="Select..."
                styles={customStyles}
                isSearchable={false}
              />
              {errors?.depositRemark && (
                <span className="small-font error">
                  {errors?.depositRemark}
                </span>
              )}
            </div>

            {depositRemark.value == "credit" && isCreditAllowed && (
              <>
                {" "}
                <div className="col-3 position-relative mt-2">
                  <label className="fw-600 small-font">Paid Amount</label>
                  <div className="input-css mt-2 d-flex justify-content-between align-items-center small-font">
                    <input
                      type="text"
                      maxLength={9}
                      className="small-font bg-none w-75 all-none appearance"
                      value={enteredPaidAmount ? enteredPaidAmount : 0}
                      onChange={(e) => {
                        const paidAmount = parseFloat(e.target.value);
                        setEnteredPaidAmount(paidAmount);
                      }}
                      onBlur={(e) => {
                        const paidAmount = parseFloat(e.target.value);
                        const chipsValue = addDepositChips
                          ? parseFloat(addDepositChips)
                          : 0;
                        if (paidAmount > chipsValue) {
                          setError(
                            `Paid amount cannot exceed the ${chipsValue}`
                          );
                        } else if (chipsValue == 0) {
                          setError(`Please enter deposit chips`);
                          setEnteredPaidAmount("");
                        } else {
                          setError("");
                        }
                      }}
                    />
                  </div>
                  {error ? (
                    <span className="small-font error">{error}</span>
                  ) : (
                    errors?.enteredPaidAmount && (
                      <span className="small-font error">
                        {errors?.enteredPaidAmount}
                      </span>
                    )
                  )}
                </div>
                <div className="col-3 position-relative mt-2">
                  <label className="fw-600 small-font">Credit Amount</label>
                  <div className="input-css mt-2 d-flex justify-content-between align-items-center small-font">
                    <input
                      type="number"
                      maxLength={9}
                      className="small-font bg-none w-75 all-none appearance"
                      value={youpay > 0 ? youpay : 0}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div>
        <form className="row align-items-center p-2">
          {forms.map((form, index) => (
            <>
              <h5 className="yellow-font large-font my-2 fw-600 mb-0 py-2 ">
                WEBSITE MARKET
              </h5>
              <div
                key={form.id}
                className="white-bg br-10 login-box-shadow w-100 p-2 m-2"
              >
                <div className="col-2 ">
                  <label className="small-font my-1">Admin Website </label>
                  <div className="custom-select-wrapper">
                    <Select
                      className="small-font"
                      isSearchable={false}
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
                      // disabled={Number(selectedRole) === 2}  // Using Number() instead of parseInt
                      // isDisabled={Number(selectedRole) === 2}
                    />
                  </div>
                </div>

                <div className="d-flex align-items-center w-100 my-2">
                  <div className="small-font black-font pe-2">
                    User Website Details
                  </div>
                  <div className="flex-grow-1">
                    <span className="hr-line-grey"></span>
                  </div>
                  <div className="small-font px-2 fw-600">
                    My Sharing - <span className="saffron-clr">100%</span>
                  </div>
                  <div className="flex-grow-1">
                    <span className="hr-line-grey"></span>
                  </div>
                </div>

                <div className="row ">
                  <div className="col-12">
                    {userWebsitesList[form.id]?.length > 0 ? (
                      <div className="d-flex white-bg mb-4 flex-column">
                        <div className="d-flex">
                          <div className="col-2 input-css5   small-font ">
                            <div className="black-font">User Website</div>
                            <Select
                              className="small-font rounded all-none my-2 w-100"
                              placeholder="Select a website"
                              isSearchable={false}
                              options={getAvailableUserSites(
                                form.id,
                                selectedAdmins[form.id]?.value
                              ).map((site) => ({
                                value: site.id,
                                label: site.web_url,
                              }))}
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
                                setSelectedSiteIds((prev) => ({
                                  ...prev,
                                  [form.id]: selectedSiteId,
                                }));
                                setWebsiteDetails((prevDetails) => ({
                                  ...prevDetails,
                                  [form.id]: {
                                    ...prevDetails[form.id],
                                    [selectedSiteId]: {
                                      ...prevDetails[form.id]?.[selectedSiteId],
                                      selectedWebsiteId: selectedSiteId,
                                    },
                                  },
                                }));
                                handleCheckboxChange(form.id, selectedSiteId);
                                handleUserSiteSelection(
                                  form.id,
                                  selectedAdmins[form.id]?.value,
                                  selectedSiteId
                                );
                              }}
                              styles={customStyles}
                            />
                          </div>
                          <div className="flex-row d-flex w-100 ">
                            {/* Commission Type Dropdown */}
                            <div className="col-2 input-css5">
                              <div className="black-font small-font">
                                Commission Type
                              </div>
                              <Select
                                className="small-font my-2"
                                placeholder="Comm Type"
                                options={commissionOptions}
                                styles={customStyles}
                                isSearchable={false}
                                isDisabled={!selectedSiteIds[form.id]}
                                onChange={(selectedOption) => {
                                  handleAccountTypeChange(
                                    form.id,
                                    selectedSiteIds[form.id],
                                    selectedOption
                                  );
                                  handleInputChange(
                                    form.id,
                                    selectedSiteIds[form.id],
                                    "commission_type",
                                    selectedOption.value
                                  );
                                }}
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
                              {renderErrorMessage(
                                form.id,
                                selectedSiteIds[form.id],
                                "commission_type"
                              )}
                            </div>

                            {(accountTypes[form.id]?.[
                              selectedSiteIds[form.id]
                            ] === "2" ||
                              accountTypes[form.id]?.[
                                selectedSiteIds[form.id]
                              ] === "3") && (
                              <div className="col d-flex">
                                <div className="col-2 position-relative mx-1 mt-2">
                                  <label className="fw-600 my-1 white-space small-font">
                                    Downline Share (upto 100%)
                                  </label>
                                  {/* <div className=" rounded input-css  d-flex justify-content-between align-items-center small-font">
                                      <input
                                        type="text"
                                        className="small-font bg-none all-none w-50"
                                        onChange={(e) => {
                                          let value = e.target.value;
                                          if (/^\d*$/.test(value)) {
                                            if (value === "100") {
                                              handleInputChange(
                                                form.id,
                                                selectedSiteIds[form.id],
                                                "share",
                                                value
                                              );
                                            }
                                            else if (value.length <= 2) {
                                              handleInputChange(
                                                form.id,
                                                selectedSiteIds[form.id],
                                                "share",
                                                value
                                              );
                                            }
                                            else {
                                              setValidationErrors(
                                                (prevErrors) => ({
                                                  ...prevErrors,
                                                  [form.id]: {
                                                    ...prevErrors[form.id],
                                                    [selectedSiteIds[form.id]]: {
                                                      ...prevErrors[form.id]?.[
                                                      selectedSiteIds[form.id]
                                                      ],
                                                      share:
                                                        "Value less than 100 !",
                                                    },
                                                  },
                                                })
                                              );

                                              e.target.value = value.slice(0, 2);
                                            }
                                          }
                                          else {
                                            e.target.value = value.replace(
                                              /\D/g,
                                              ""
                                            );
                                          }
                                        }}
                                        onBlur={(e) => {
                                          let numericValue = parseInt(
                                            e.target.value,
                                            10
                                          );

                                          if (
                                            isNaN(numericValue) ||
                                            numericValue < 0
                                          ) {
                                            e.target.value = "0";
                                          }
                                          else if (numericValue > 100) {
                                            e.target.value = "100";
                                          }
                                          handleInputChange(
                                            form.id,
                                            selectedSiteIds[form.id],
                                            "share",
                                            e.target.value
                                          );
                                        }}
                                        defaultValue={0}
                                      />
                                      <span>%</span>
                                    </div> */}
                                  <div className="rounded input-css d-flex justify-content-between align-items-center small-font">
                                    {/* <input
                                      type="text"
                                      className="small-font bg-none all-none w-50"
                                      onChange={(e) => {
                                        let value = e.target.value;

                                        // Allow only numbers with up to 4 decimal places
                                        if (/^\d*\.?\d{0,4}$/.test(value)) {
                                          let numericValue = parseFloat(value);

                                          if (!isNaN(numericValue)) {
                                            if (numericValue <= 100) {
                                              handleInputChange(
                                                form.id,
                                                selectedSiteIds[form.id],
                                                "share",
                                                value
                                              );
                                            } else {
                                              setValidationErrors(
                                                (prevErrors) => ({
                                                  ...prevErrors,
                                                  [form.id]: {
                                                    ...prevErrors[form.id],
                                                    [selectedSiteIds[form.id]]:
                                                      {
                                                        ...prevErrors[
                                                          form.id
                                                        ]?.[
                                                          selectedSiteIds[
                                                            form.id
                                                          ]
                                                        ],
                                                        share:
                                                          "Value less than 100",
                                                      },
                                                  },
                                                })
                                              );
                                              e.target.value = "100";
                                            }
                                          }
                                        } else {
                                          // Remove extra decimals beyond 4 places
                                          e.target.value = value
                                            .replace(/(\.\d{4})\d+$/, "$1")
                                            .replace(/[^0-9.]/g, "");
                                        }
                                      }}
                                      onBlur={(e) => {
                                        let numericValue = parseFloat(
                                          e.target.value
                                        );

                                        if (
                                          isNaN(numericValue) ||
                                          numericValue < 0
                                        ) {
                                          e.target.value = "0";
                                        } else if (numericValue > 100) {
                                          e.target.value = "100";
                                        } else {
                                          // Format value to 4 decimal places
                                          e.target.value =
                                            parseFloat(numericValue).toFixed(4);
                                        }

                                        handleInputChange(
                                          form.id,
                                          selectedSiteIds[form.id],
                                          "share",
                                          e.target.value
                                        );
                                      }}
                                      defaultValue={0}
                                    /> */}

                                    <input
                                      type="text"
                                      className="small-font bg-none all-none w-50"
                                      onChange={(e) => {
                                        let value = e.target.value;

                                        // Allow only numbers and optional decimal with up to 2 places
                                        if (
                                          /^\d{0,2}(\.\d{0,2})?$|^100(\.0{0,2})?$/.test(
                                            value
                                          )
                                        ) {
                                          let numericValue = parseFloat(value);

                                          if (!isNaN(numericValue)) {
                                            // Check if value is <= 100
                                            if (numericValue <= 100) {
                                              handleInputChange(
                                                form.id,
                                                selectedSiteIds[form.id],
                                                "share",
                                                value
                                              );
                                            } else {
                                              // Prevent value greater than 100
                                              setValidationErrors(
                                                (prevErrors) => ({
                                                  ...prevErrors,
                                                  [form.id]: {
                                                    ...prevErrors[form.id],
                                                    [selectedSiteIds[form.id]]:
                                                      {
                                                        ...prevErrors[
                                                          form.id
                                                        ]?.[
                                                          selectedSiteIds[
                                                            form.id
                                                          ]
                                                        ],
                                                        share:
                                                          "Value should be less than or equal to 100",
                                                      },
                                                  },
                                                })
                                              );
                                              e.target.value = "100";
                                            }
                                          }
                                        } else {
                                          // Remove invalid characters and extra decimals
                                          e.target.value = value
                                            .replace(/[^0-9.]/g, "") // Remove non-numeric & non-dot
                                            .replace(/(\.\d{2})\d+$/, "$1") // Limit decimals to 2 places
                                            .replace(/^(\d{2})\d+/, "$1"); // Prevent > 2 digits before decimal if < 100
                                        }
                                      }}
                                      onBlur={(e) => {
                                        let numericValue = parseFloat(
                                          e.target.value
                                        );

                                        if (
                                          isNaN(numericValue) ||
                                          numericValue < 0
                                        ) {
                                          e.target.value = "0"; // Reset to 0 if invalid
                                        } else if (numericValue > 100) {
                                          e.target.value = "100";
                                        } else {
                                          // Format to 2 decimal places if valid
                                          e.target.value =
                                            parseFloat(numericValue).toFixed(2);
                                        }

                                        handleInputChange(
                                          form.id,
                                          selectedSiteIds[form.id],
                                          "share",
                                          e.target.value
                                        );
                                      }}
                                    />

                                    <span>%</span>
                                  </div>

                                  <div className="small-font">
                                    {renderErrorMessage(
                                      form.id,
                                      selectedSiteIds[form.id],
                                      "share"
                                    )}
                                  </div>
                                </div>
                                <div className="col-2 position-relative mt-1 mx-3">
                                  <label className="fw-600  small-font">
                                    Commission ({`upto 5%`})
                                  </label>
                                  <div className=" input-css mt-2 d-flex justify-content-between align-items-center small-font">
                                    {/* <input
                                      type="text"
                                      className="small-font bg-none all-none w-50"
                                      
                                      onChange={(e) => {
                                        let value = e.target.value;

                                        if (
                                          value === "" ||
                                          (parseInt(value) >= 0 &&
                                            parseInt(value) <= 5)
                                        ) {
                                          setValidationErrors((prevErrors) => ({
                                            ...prevErrors,
                                            [form.id]: {
                                              ...prevErrors[form.id],
                                              [selectedSiteIds[form.id]]: {
                                                ...prevErrors[form.id]?.[
                                                  selectedSiteIds[form.id]
                                                ],
                                                downline_comm: "", // Clear error if valid
                                              },
                                            },
                                          }));
                                          handleInputChange(
                                            form.id,
                                            selectedSiteIds[form.id],
                                            "downline_comm",
                                            value
                                          );
                                        }
                                        // Handle invalid input (value > 5)
                                        else {
                                          setValidationErrors((prevErrors) => ({
                                            ...prevErrors,
                                            [form.id]: {
                                              ...prevErrors[form.id],
                                              [selectedSiteIds[form.id]]: {
                                                ...prevErrors[form.id]?.[
                                                  selectedSiteIds[form.id]
                                                ],
                                                downline_comm:
                                                  "Value less than 5%", // Show error
                                              },
                                            },
                                          }));

                                          // Auto-correct value to 5
                                          e.target.value = Math.min(
                                            Math.max(parseInt(value), 0),
                                            5
                                          );
                                        }
                                      }}
                                      onBlur={(e) => {
                                        let numericValue = parseInt(
                                          e.target.value,
                                          10
                                        );

                                        // Ensure value is valid on blur
                                        if (
                                          isNaN(numericValue) ||
                                          numericValue < 0
                                        ) {
                                          e.target.value = "0";
                                        } else if (numericValue > 5) {
                                          e.target.value = "5";
                                        }

                                        // Final value update onBlur
                                        handleInputChange(
                                          form.id,
                                          selectedSiteIds[form.id],
                                          "downline_comm",
                                          e.target.value
                                        );
                                      }}
                                    /> */}

                                    <input
                                      type="text"
                                      className="small-font bg-none all-none w-50"
                                      onChange={(e) => {
                                        let value = e.target.value;

                                        // Allow numbers between 0-5 with up to 2 decimal places
                                        if (
                                          /^([0-4](\.\d{0,2})?|5(\.0{0,2})?)?$/.test(
                                            value
                                          )
                                        ) {
                                          handleInputChange(
                                            form.id,
                                            selectedSiteIds[form.id],
                                            "downline_comm",
                                            value
                                          );
                                        } else {
                                          // Prevent invalid characters from being entered
                                          e.target.value = value.slice(0, -1);
                                        }
                                      }}
                                      onBlur={(e) => {
                                        let numericValue = parseFloat(
                                          e.target.value
                                        );

                                        if (
                                          isNaN(numericValue) ||
                                          numericValue < 0
                                        ) {
                                          numericValue = 0;
                                        } else if (numericValue > 5) {
                                          numericValue = 5;
                                        }

                                        e.target.value =
                                          numericValue.toFixed(2); // Format to 2 decimal places

                                        handleInputChange(
                                          form.id,
                                          selectedSiteIds[form.id],
                                          "downline_comm",
                                          e.target.value
                                        );
                                      }}
                                    />

                                    <span>%</span>
                                  </div>
                                  {renderErrorMessage(
                                    form.id,
                                    selectedSiteIds[form.id],
                                    "downline_comm"
                                  )}
                                </div>
                                <div className="col-2 position-relative mx-3">
                                  <label className="fw-600 my-1 small-font">
                                    Casino chip Value
                                  </label>
                                  <div className="input-css rounded mt-2 d-flex justify-content-between align-items-center small-font">
                                    <input
                                      className="small-font bg-none all-none  w-100"
                                      type="text"
                                      inputMode="numeric"
                                      pattern="[0-9]*"
                                      maxLength={4}
                                      onKeyPress={(event) => {
                                        if (
                                          event.charCode < 48 ||
                                          event.charCode > 57
                                        ) {
                                          event.preventDefault();
                                        }
                                      }}
                                      onChange={(e) => {
                                        const numericValue =
                                          e.target.value.replace(/\D/g, "");
                                        handleInputChange(
                                          form.id,
                                          selectedSiteIds[form.id],
                                          "caschip_values",
                                          numericValue
                                        );
                                      }}
                                    />
                                  </div>
                                  {renderErrorMessage(
                                    form.id,
                                    selectedSiteIds[form.id],
                                    "caschip_values"
                                  )}
                                </div>
                                <div className="col-2 ">
                                  <label className="fw-600 my-1 small-font">
                                    Is Primary
                                  </label>

                                  <div className="input-css mt-2">
                                    <div className="w-70 flex-center">
                                      <input
                                        type="checkbox"
                                        checked={
                                          websiteDetails[form.id]?.[
                                            selectedSiteIds[form.id]
                                          ]?.isPrimary == 1
                                            ? true
                                            : false
                                        }
                                        onChange={(e) =>
                                          handleInputChange(
                                            form.id,
                                            selectedSiteIds[form.id],
                                            "isPrimary",
                                            e.target.checked ? 1 : 2
                                          )
                                        }
                                      />
                                      <label className="small-font mx-2">
                                        IS PRIMARY
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="small-font"></p>
                    )}
                  </div>
                </div>
              </div>

              {websiteCreationErrors && (
                <div className="w-100 d-flex">
                  {" "}
                  <div className="error-popup-container1 col-4 py-3 small-font fw-600 p-1 br-5 m-2 px-4">
                    <BiSolidMessageAltError className="me-3" />
                    {websiteCreationErrors}
                  </div>
                </div>
              )}

              <div className="d-flex py-2  align-items-center ">
                <button
                  type="button"
                  className="cst-btn2 "
                  onClick={() => removeForm(form.id)}
                >
                  <FaTrash className="me-2" /> Remove
                </button>
              </div>
            </>
          ))}
        </form>

        <div className="d-flex justify-content-end ">
          <button
            type="button"
            className="cst-btn me-4"
            onClick={addAnotherForm}
          >
            <FaPlus className="me-2  " /> Add Another
          </button>

          <button
            className="saffron-btn rounded py-2 col-1 black-text2 border-none"
            onClick={
              role === "management" ? handleSubmit : handleDirectorSubmit
            }
            disabled={loader === true ? true : false}
          >
            {loader === true ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              ""
            )}
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
