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
// import { RiDeleteBin5Fill } from "react-icons/ri";
// import { BiSolidMessageAltError } from "react-icons/bi";

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
//   const location = useLocation();
//   const mode = location.state?.mode || "add";
//   const userId = location.state?.userId || null;
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [allAccessWebsites, setAllAccessWebsites] = useState([]);
//   const togglePasswordVisibility = (setter) => setter((prev) => !prev);
//   const [isCreditAllowed, setIsCreditAllowed] = useState(false);
//   const [creditValue, setCreditValue] = useState(1);
//   const [creditreference, setCreditReference]=useState(null)

//   const toggleCreditAllowed = () => {
//     const newIsCreditAllowed = !isCreditAllowed;
//     setIsCreditAllowed(newIsCreditAllowed);
//     setCreditValue(newIsCreditAllowed ? 2 : 1);
//   };

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

//   const GetAllAccessedWebsites = () => {
//     getDirectorAccessWebites()
//       .then((response) => {
//         if (response.status === true) {
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

//   const handleAdminRoleChange = (formId, selectedOption) => {
//     setSelectedAdmins((prev) => ({
//       ...prev,
//       [formId]: selectedOption,
//     }));

//     const adminData = adminWebsite.find(
//       (admin) => admin.id === selectedOption.value
//     );
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

//         if (accotypeid === "3" || accotypeid === "2") {
//           websiteData.share = parseFloat(
//             websiteDetails[userSite.id]?.share || null
//           );
//           websiteData.caschip_values = parseFloat(
//             websiteDetails[userSite.id]?.caschip_values || null
//           );
//           websiteData.downline_comm = parseFloat(
//             websiteDetails[userSite.id]?.downline_comm || null
//           );
//           websiteData.is_casino = websiteDetails[userSite.id]?.casino_allowed
//             ? 1
//             : 2;
//           // Add is_primary for account types 2 and 3
//           websiteData.is_primary = websiteDetails[userSite.id]?.isPrimary
//             ? 1
//             : 2;
//         }

//         if (accotypeid === "1") {
//           websiteData.monthly_amount = parseInt(
//             websiteDetails[userSite.id]?.monthly_amount || null
//           );
//           websiteData.chip_percentage =
//             (parseInt(websiteDetails[userSite.id]?.monthly_amount || 0) /
//               parseInt(websiteDetails[userSite.id]?.max_chips_monthly || 0)) *
//             100;
//           websiteData.max_chips_monthly = parseInt(
//             websiteDetails[userSite.id]?.max_chips_monthly || null
//           );
//           websiteData.is_casino = websiteDetails[userSite.id]?.casino_allowed
//             ? 1
//             : 2;
//           if (websiteDetails[userSite.id]?.casino_chip_value) {
//             websiteData.caschip_values = parseFloat(
//               websiteDetails[userSite.id]?.casino_chip_value
//             );
//           }
//           websiteData.downline_comm = parseFloat(
//             websiteDetails[userSite.id]?.downline_comm || null
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
//       is_credit:creditValue,
//       credit_reference:creditreference
//     };

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
//         setShowWebsiteCreationErrors(
//           error.message[0].message || error.message[0]
//         );
//       });
//   };

//   const handleDirectorSubmit = (e) => {
//     if (e) e.preventDefault();
//     if (!validateForm()) return;
//     if (!selectedOption || Object.keys(selectedOption).length === 0) {
//       setShowWebsiteCreationErrors("Please select at least one Admin Website.");
//       return;
//     }

//     if (!selectedWebsites || Object.keys(selectedWebsites).length === 0) {
//       setShowWebsiteCreationErrors("Please select at least one User Website.");
//       return;
//     }

//     const selectedUserWebsites = forms.flatMap((form) => {
//       return userWebsitesList[form.id]?.map((userSite) => {
//         if (!selectedWebsites[form.id]?.[userSite.website_access_id])
//           return null;

//         const accotypeid = accountTypes[form.id]?.[userSite.website_access_id];
//         let websiteData = {
//           admin_panel_id: selectedOption?.value,
//           user_paner_id: userSite.user_WebSite_id,
//           commission_type: accotypeid,
//         };

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
//           websiteData.is_casino = 1;
//           // Add is_primary for account types 2 and 3
//           websiteData.is_primary = websiteDetails[userSite.website_access_id]
//             ?.isPrimary
//             ? 1
//             : 2;
//         }

//         if (accotypeid === "1") {
//           websiteData.monthly_amount = parseInt(
//             websiteDetails[userSite.website_access_id]?.monthly_amount || null
//           );
//           websiteData.chip_percentage =
//             (parseInt(
//               websiteDetails[userSite.website_access_id]?.monthly_amount || 0
//             ) /
//               parseInt(
//                 websiteDetails[userSite.website_access_id]?.max_chips_monthly ||
//                   0
//               )) *
//             100;
//           websiteData.max_chips_monthly = parseInt(
//             websiteDetails[userSite.website_access_id]?.max_chips_monthly ||
//               null
//           );
//           websiteData.is_casino = websiteDetails[userSite.website_access_id]
//             ?.casino_allowed
//             ? 1
//             : 2;

//           if (websiteDetails[userSite.website_access_id]?.casino_chip_value) {
//             websiteData.caschip_values = parseFloat(
//               websiteDetails[userSite.website_access_id]?.casino_chip_value
//             );
//           }
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
//       is_credit:creditValue,
//       credit_reference:creditreference
//     };

//     console.log(finalData,"==>finalData");

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
//         setShowWebsiteCreationErrors(
//           error.message[0].message || error.message[0]
//         );
//       });
//   };

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
//     if (!password) {
//       newErrors.password = " Password is required.";
//     }
//     if (!confirmPassword) {
//       newErrors.confirmPassword = "Confirm Password is required.";
//     }
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

//   const filteredRoles = adminRolesArray.filter((userRole) => {
//     if (role === "management") {
//       return userRole.label === "director" || userRole.label === "SuperAdmin";
//     } else if (role === "director") {
//       return userRole.label === "SuperAdmin";
//     }
//     return false;
//   });

//   // Render the "Is Primary" checkbox for account types 2 and 3
//   const renderIsPrimaryCheckbox = (formId, userSiteId) => {
//     const accotypeid = accountTypes[formId]?.[userSiteId];
//     if (accotypeid === "2" || accotypeid === "3") {
//       return (
//         <div className="w-80  flex-between position-relative mx-1 d-flex align-items-center">
//           <input
//             type="checkbox"
//             checked={websiteDetails[userSiteId]?.isPrimary || false}
//             onChange={(e) =>
//               handleInputChange(userSiteId, "isPrimary", e.target.checked)
//             }
//           />
//           <label className="small-font mx-2">IS PRIMARY</label>
//         </div>
//       );
//     }
//     return null;
//   };

//   // Function to handle deleting a user site's details
//   const handleDeleteUserSite = (formId, userSiteId) => {
//     // Uncheck the user site checkbox
//     setSelectedWebsites((prev) => ({
//       ...prev,
//       [formId]: {
//         ...prev[formId],
//         [userSiteId]: false,
//       },
//     }));

//     // Clear the commission type
//     setAccountTypes((prev) => ({
//       ...prev,
//       [formId]: {
//         ...prev[formId],
//         [userSiteId]: null,
//       },
//     }));

//     // Clear all entered details for the user site
//     setWebsiteDetails((prevDetails) => {
//       const updatedDetails = { ...prevDetails };
//       delete updatedDetails[userSiteId];
//       return updatedDetails;
//     });
//   };

//   // Rest of your existing functions (GetAllCountries, GetAllCurrencies, etc.)
//   // ...

//   return (
//     <>
//       <div className="m-2 ">
//         <div className="d-flex align-items-center justify-content-between py-2">
//           <h5 className="yellow-font">Add Director & Super Admin</h5>
//           <span
//             className="white-font me-2  p-2 br-10 yellow-bg  cursor-pointer"
//             onClick={() => navigate(-1)}
//           >
//             <FaArrowLeft className="mx-2" /> Back
//           </span>
//         </div>

//         <div className="p-3 white-bg br-10 login-box-shadow">
//           <div className="row">
//             <div className="col p-1">
//               <label className="small-font my-1">Name</label>
//               <input
//                 type="text"
//                 placeholder="Enter Name"
//                 className="small-font rounded all-none input-css w-100"
//                 value={name}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   if (/^[a-zA-Z\s]*$/.test(value)) {
//                     setName(value);
//                   }
//                 }}
//               />
//               {errors?.name && <span className="error">{errors?.name}</span>}
//             </div>

//             <div className="col p-1">
//               <label className="small-font my-1">Login Name</label>
//               <input
//                 type="text"
//                 placeholder="Enter Login Name"
//                 className="small-font rounded all-none input-css w-100"
//                 value={loginName}
//                 maxLength={15}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   if (/^[a-zA-Z0-9_]*$/.test(value)) {
//                     setLoginName(value);
//                   }
//                 }}
//                 required
//               />
//               {errors?.loginName && (
//                 <span className="x-small-font error">{errors?.loginName}</span>
//               )}
//             </div>

//             <div className="col p-1">
//               <label className="small-font my-1">Role</label>
//               <Select
//                 className="small-font rounded all-none  w-100"
//                 placeholder="Select"
//                 options={filteredRoles}
//                 isSearchable={false}
//                 value={filteredRoles.find(
//                   (role) => role.value === selectedRole
//                 )}
//                 onChange={(selectedOption) =>
//                   setSelectedRole(selectedOption?.value)
//                 }
//                 styles={customStyles}
//               />
//               {errors.selectedRole && (
//                 <span className="text-danger small-font">
//                   {errors.selectedRole}
//                 </span>
//               )}
//             </div>

//             <div className="col p-1">
//               <label className="small-font my-1">Country</label>
//               <select
//                 className="small-font rounded all-none input-css  w-100"
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
//           <div className="row ">
//             <div className="col p-1 my-2">
//               <label className="small-font my-1">Currency</label>
//               <select
//                 className="small-font rounded all-none input-css  w-100"
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
//             </div>

//             {mode === "edit" ? null : (
//               <>
//                 <div className="p-1 col position-relative my-2">
//                   <label className="small-font my-1">Password</label>
//                   <div className="w-100 input-css4">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       className="small-font rounded all-none input-css  w-90"
//                       placeholder="Enter"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                   </div>
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
//                 <div className="p-1 col position-relative my-2 ">
//                   <label className="small-font my-1">Confirm Password</label>

//                   <div className="w-100 input-css4">
//                     <input
//                       type={showConfirmPassword ? "text" : "password"}
//                       className=" small-font rounded all-none input-css  w-90"
//                       placeholder="Enter"
//                       value={confirmPassword}
//                       onChange={(e) => setConfirmPassword(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <span
//                     className="position-absolute "
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
//                 <div className="p-1 col-3 position-relative my-2">
//                   <label className="small-font my-1">Management Password</label>

//                   <div className="w-100 input-css4">
//                     <input
//                       type={showManagementPassword ? "text" : "password"}
//                       className=" small-font rounded all-none input-css  w-90"
//                       placeholder="Enter"
//                       required
//                       value={managementPassword}
//                       onChange={(e) => setManagementPassword(e.target.value)}
//                     />
//                   </div>
//                   <span
//                     className="position-absolute"
//                     style={{
//                       right: "1.5rem",
//                       top: "2.3rem",
//                       cursor: "pointer",
//                     }}
//                     onClick={() =>
//                       togglePasswordVisibility(setShowManagementPassword)
//                     }
//                   >
//                     {showManagementPassword ? <FaEye /> : <FaEyeSlash />}
//                   </span>
//                   {errors?.managementPassword && (
//                     <span className="x-small-font error">
//                       {errors?.managementPassword}
//                     </span>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//           <div className="row">
//             <div className="col-3 d-flex align-items-center">
//               <input
//                 type="checkbox"
//                 checked={isCreditAllowed}
//                 onChange={toggleCreditAllowed}
//               />
//               <label className="small-font ms-2">CREDIT ALLOWED</label>
//             </div>

//             <div className="col-3">
//               {isCreditAllowed && (
//                 <div className="p-1 col position-relative">
//                   <label className="small-font my-1">Credit Reference</label>
//                   <div className="w-100 input-css4">
//                     <input
//                       type="text"
//                       className="small-font rounded all-none input-css w-90"
//                       placeholder="Enter"
//                       value={creditreference}
//                       onChange={(e)=>setCreditReference(e.target.value)}
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div>
//         <form className="row align-items-center p-2">
//           {forms.map((form, index) => (
//             <>
//               <h5 className="yellow-font large-font my-2 fw-600 mb-0 py-2 ">
//                 WEBSITE MARKET
//               </h5>
//               <div
//                 key={form.id}
//                 className="white-bg br-10 login-box-shadow w-100 p-2 m-2"
//               >
//                 {role === "director" ? (
//                   <div className="col-1">
//                     <label className="small-font my-1">Admin Website</label>
//                     <div className="custom-select-wrapper">
//                       <Select
//                         className="small-font"
//                         placeholder="Select"
//                         isSearchable={false}
//                         options={transformedOptions.filter(
//                           (option) =>
//                             !Object.values(selectedAdmins || {}).some(
//                               (selected) => selected?.value === option.value
//                             )
//                         )}
//                         value={selectedOption}
//                         onChange={(selectedOption) => {
//                           setSelectedOption(selectedOption);
//                           const selectedAdmin = allAccessWebsites
//                             ?.flatMap((access) => access.admin_websites)
//                             .find(
//                               (admin) =>
//                                 admin.admin_panel_id === selectedOption?.value
//                             );

//                           setSelectedAdmins((prev) => ({
//                             ...prev,
//                             [form.id]: selectedOption,
//                           }));

//                           setUserWebsitesList((prev) => ({
//                             ...prev,
//                             [form.id]: selectedAdmin ? selectedAdmin.users : [],
//                           }));
//                         }}
//                       />
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="col-2 ">
//                     <label className="small-font my-1">Admin Website </label>
//                     <div className="custom-select-wrapper">
//                       <Select
//                         className="small-font"
//                         placeholder="Select"
//                         styles={customStyles}
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
//                 <div className="position-relative mt-4">
//                   <div className="hr-line-grey"></div>
//                   <div className="d-flex w-100 my-2">
//                     <div className="small-font black-font my-2 ">
//                       User Website Details
//                     </div>
//                     <hr />
//                   </div>
//                 </div>

//                 <div className="row ">
//                   <div className="col-12">
//                     {role === "director" && selectedOption ? (
//                       userWebsitesList[form.id]?.length > 0 ? (
//                         userWebsitesList[form.id].map((userSite) => (
//                           <div
//                             key={userSite.website_access_id}
//                             className="d-flex flex-column"
//                           >
//                             <div className="dashed-grey-border"></div>
//                             <label className="small-font my-1 ">
//                               User Website
//                             </label>

//                             <div className="col-2  input-css d-flex white-bg border-grey3 my-2">
//                               <input
//                                 type="checkbox"
//                                 className="me-2"
//                                 checked={
//                                   selectedWebsites[form.id]?.[
//                                     userSite.website_access_id
//                                   ] || false
//                                 }
//                                 onChange={() =>
//                                   handleCheckboxChange(
//                                     form.id,
//                                     userSite.website_access_id
//                                   )
//                                 }
//                               />
//                               <input
//                                 type="text"
//                                 className="small-font rounded all-none w-100"
//                                 value={userSite.user_web_url}
//                                 readOnly
//                               />
//                             </div>
//                             {selectedWebsites[form.id]?.[
//                               userSite.website_access_id
//                             ] && (
//                               <>
//                                 {/* Commission Type Dropdown */}
//                                 <div className="col-4 my-1">
//                                   <Select
//                                     className="small-font white-bg"
//                                     placeholder="Account Type"
//                                     options={commissionOptions}
//                                     styles={customStyles}
//                                     onChange={(selectedOption) =>
//                                       handleAccountTypeChange(
//                                         form.id,
//                                         userSite.website_access_id,
//                                         selectedOption
//                                       )
//                                     }
//                                     value={
//                                       commissionOptions.find(
//                                         (option) =>
//                                           option.value ===
//                                           accountTypes[form.id]?.[
//                                             userSite.website_access_id
//                                           ]
//                                       ) || null
//                                     }
//                                   />
//                                 </div>

//                                 {/* Delete Button */}
//                                 <div className="col-4   my-1">
//                                   <button
//                                     type="button"
//                                     className="cst-btn remove-btn"
//                                     onClick={() =>
//                                       handleDeleteUserSite(
//                                         form.id,
//                                         userSite.website_access_id
//                                       )
//                                     }
//                                   >
//                                     <FaTrash className="me-2" /> Delete
//                                   </button>
//                                 </div>

//                                 {/* Fields for Commission Type 1 */}
//                                 {accountTypes[form.id]?.[
//                                   userSite.website_access_id
//                                 ] === "1" && (
//                                   <div className="col-12 ">
//                                     <div className="row">
//                                       <div className="col-2">
//                                         <input
//                                           type="text"
//                                           className="small-font white-bg rounded border-grey3 p-2 w-100"
//                                           placeholder="Monthly Amnt"
//                                           onChange={(e) =>
//                                             handleInputChange(
//                                               userSite.website_access_id,
//                                               "monthly_amount",
//                                               e.target.value
//                                             )
//                                           }
//                                         />
//                                       </div>
//                                       <div className="col-2">
//                                         <input
//                                           type="text"
//                                           className="small-font white-bg rounded border-grey3 p-2 w-100"
//                                           placeholder="Max Chips Monthly"
//                                           onChange={(e) =>
//                                             handleInputChange(
//                                               userSite.website_access_id,
//                                               "max_chips_monthly",
//                                               e.target.value
//                                             )
//                                           }
//                                         />
//                                       </div>
//                                       <div className="col-2">
//                                         <input
//                                           type="text"
//                                           className="small-font white-bg rounded border-grey3 p-2 w-100"
//                                           placeholder="Chip %"
//                                           value={
//                                             (parseInt(
//                                               websiteDetails[
//                                                 userSite.website_access_id
//                                               ]?.monthly_amount || 0
//                                             ) /
//                                               parseInt(
//                                                 websiteDetails[
//                                                   userSite.website_access_id
//                                                 ]?.max_chips_monthly || 0
//                                               )) *
//                                             100
//                                           }
//                                           onChange={(e) =>
//                                             handleInputChange(
//                                               userSite.website_access_id,
//                                               "chip_percentage",
//                                               e.target.value
//                                             )
//                                           }
//                                         />
//                                       </div>
//                                       <div className="col d-flex align-items-center">
//                                         <label className="small-font me-2">
//                                           Casino Allowed
//                                         </label>
//                                         <input
//                                           type="checkbox"
//                                           checked={
//                                             websiteDetails[
//                                               userSite.website_access_id
//                                             ]?.casino_allowed || false
//                                           }
//                                           onChange={(e) =>
//                                             handleInputChange(
//                                               userSite.website_access_id,
//                                               "casino_allowed",
//                                               e.target.checked
//                                             )
//                                           }
//                                         />
//                                       </div>
//                                       {websiteDetails[
//                                         userSite.website_access_id
//                                       ]?.casino_allowed && (
//                                         <div className="col-2">
//                                           <input
//                                             type="text"
//                                             className="small-font white-bg rounded border-grey3 p-2 w-100"
//                                             placeholder="Casino Chip Value"
//                                             onChange={(e) =>
//                                               handleInputChange(
//                                                 userSite.website_access_id,
//                                                 "casino_chip_value",
//                                                 e.target.value
//                                               )
//                                             }
//                                           />
//                                         </div>
//                                       )}
//                                       <div className="col-3">
//                                         <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
//                                           <input
//                                             type="text"
//                                             className="small-font bg-none p-2 w-75"
//                                             placeholder="Commission(%)"
//                                             onChange={(e) =>
//                                               handleInputChange(
//                                                 userSite.website_access_id,
//                                                 "downline_comm",
//                                                 e.target.value
//                                               )
//                                             }
//                                           />
//                                           <span className="small-font text-center border-left3 px-1">
//                                             <b>My Comm.. 1%</b>
//                                           </span>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 )}

//                                 {/* Fields for Commission Type 2 */}
//                                 {accountTypes[form.id]?.[
//                                   userSite.website_access_id
//                                 ] === "2" && (
//                                   <div className="col d-flex">
//                                     <div className="col-2 position-relative mx-1">
//                                       <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
//                                         <input
//                                           className="small-font bg-none p-2 w-75"
//                                           placeholder="Downline Sharing"
//                                           onChange={(e) =>
//                                             handleInputChange(
//                                               userSite.website_access_id,
//                                               "share",
//                                               e.target.value
//                                             )
//                                           }
//                                         />
//                                         <span className="small-font text-center border-left3 px-1">
//                                           <b>My Share 10%</b>
//                                         </span>
//                                       </div>
//                                     </div>
//                                     <div className="col-2 position-relative mx-1">
//                                       <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
//                                         <input
//                                           className="small-font bg-none p-2 w-75"
//                                           placeholder="Enter Commission: M.0"
//                                           onChange={(e) =>
//                                             handleInputChange(
//                                               userSite.website_access_id,
//                                               "downline_comm",
//                                               e.target.value
//                                             )
//                                           }
//                                         />
//                                         <span className="small-font text-center border-left3 px-1">
//                                           <b>My Comm.. 1%</b>
//                                         </span>
//                                       </div>
//                                     </div>
//                                     <div className="col-2 position-relative mx-1">
//                                       <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
//                                         <input
//                                           className="small-font bg-none p-2 w-75"
//                                           placeholder="Casino Chip Value"
//                                           onChange={(e) =>
//                                             handleInputChange(
//                                               userSite.website_access_id,
//                                               "caschip_values",
//                                               e.target.value
//                                             )
//                                           }
//                                         />
//                                         <span className="small-font text-center border-left3 px-1">
//                                           <b className="mx-1">
//                                             Cas. Chip Val 20
//                                           </b>
//                                         </span>
//                                       </div>
//                                     </div>
//                                     {/* Render "Is Primary" checkbox for account types 2 and 3 */}
//                                     {renderIsPrimaryCheckbox(
//                                       form.id,
//                                       userSite.website_access_id
//                                     )}
//                                   </div>
//                                 )}

//                                 {/* Fields for Commission Type 3 */}
//                                 {accountTypes[form.id]?.[
//                                   userSite.website_access_id
//                                 ] === "3" && (
//                                   <div className="col d-flex">
//                                     <div className="col-2 position-relative mx-1">
//                                       <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
//                                         <input
//                                           className="small-font bg-none p-2 w-75"
//                                           placeholder="Downline Sharing"
//                                           onChange={(e) =>
//                                             handleInputChange(
//                                               userSite.website_access_id,
//                                               "share",
//                                               e.target.value
//                                             )
//                                           }
//                                         />
//                                         <span className="small-font text-center border-left3 px-1">
//                                           <b>My Share 10%</b>
//                                         </span>
//                                       </div>
//                                     </div>
//                                     <div className="col-2 position-relative mx-1">
//                                       <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
//                                         <input
//                                           className="small-font bg-none p-2 w-75"
//                                           placeholder="Enter Commission: M.0"
//                                           onChange={(e) =>
//                                             handleInputChange(
//                                               userSite.website_access_id,
//                                               "downline_comm",
//                                               e.target.value
//                                             )
//                                           }
//                                         />
//                                         <span className="small-font text-center border-left3 px-1">
//                                           <b>My Comm.. 1%</b>
//                                         </span>
//                                       </div>
//                                     </div>
//                                     <div className="col-2 position-relative mx-1">
//                                       <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
//                                         <input
//                                           className="small-font bg-none p-2 w-75"
//                                           placeholder="Casino Chip Value"
//                                           onChange={(e) =>
//                                             handleInputChange(
//                                               userSite.website_access_id,
//                                               "caschip_values",
//                                               e.target.value
//                                             )
//                                           }
//                                         />
//                                         <span className="small-font text-center border-left3 px-1">
//                                           <b className="mx-1">
//                                             Cas. Chip Val 20
//                                           </b>
//                                         </span>
//                                       </div>
//                                     </div>
//                                     {/* Render "Is Primary" checkbox for account types 2 and 3 */}
//                                     {renderIsPrimaryCheckbox(
//                                       form.id,
//                                       userSite.website_access_id
//                                     )}
//                                   </div>
//                                 )}
//                               </>
//                             )}
//                           </div>
//                         ))
//                       ) : (
//                         <p className="small-font">""</p>
//                       )
//                     ) : (
//                       <>
//                         {userWebsitesList[form.id]?.length > 0 ? (
//                           userWebsitesList[form.id].map((userSite) => (
//                             <div
//                               key={userSite.id}
//                               className="d-flex white-bg mb-4 flex-column "
//                             >
//                               <div>
//                                 <div className="col-2 input-css   d-flex border-grey3 my-2">
//                                   <input
//                                     type="checkbox"
//                                     className="me-2"
//                                     checked={
//                                       selectedWebsites[form.id]?.[
//                                         userSite.id
//                                       ] || false
//                                     }
//                                     onChange={() =>
//                                       handleCheckboxChange(form.id, userSite.id)
//                                     }
//                                   />
//                                   <input
//                                     type="text"
//                                     className="small-font rounded all-none w-100"
//                                     value={userSite.web_url}
//                                     readOnly
//                                   />
//                                 </div>

//                                 {selectedWebsites[form.id]?.[userSite.id] && (
//                                   <div className="  flex-row d-flex  w-100 ">
//                                     {/* Commission Type Dropdown */}
//                                     <div className="mt-4 col-2 mx-2 d-flex">
//                                       <Select
//                                         className="small-font col white-bg"
//                                         placeholder="Account Type"
//                                         options={commissionOptions}
//                                         styles={customStyles}
//                                         onChange={(selectedOption) =>
//                                           handleAccountTypeChange(
//                                             form.id,
//                                             userSite.id,
//                                             selectedOption
//                                           )
//                                         }
//                                         value={
//                                           commissionOptions.find(
//                                             (option) =>
//                                               option.value ===
//                                               accountTypes[form.id]?.[
//                                                 userSite.id
//                                               ]
//                                           ) || null
//                                         }
//                                       />
//                                     </div>

//                                     <div className="w-10  mt-4 mx-2">
//                                       <button
//                                         type="button"
//                                         className="all-none remove-btn w-100"
//                                         onClick={() =>
//                                           handleDeleteUserSite(
//                                             form.id,
//                                             userSite.id
//                                           )
//                                         }
//                                       >
//                                         <FaTrash className="me-2  " size={20} />
//                                       </button>
//                                     </div>

//                                     <div className="col-9  ">
//                                       {/* Fields for Commission Type 1 */}
//                                       {accountTypes[form.id]?.[userSite.id] ===
//                                         "1" && (
//                                         <div>
//                                           <div className="d-flex ">
//                                             <div className="col-2  mx-2">
//                                               <label className="fw-600 my-1 small-font">
//                                                 * Monthly Amount
//                                               </label>
//                                               <input
//                                                 type="text"
//                                                 className="small-font white-bg rounded border-grey3 all-none p-2 w-100"
//                                                 placeholder="Monthly Amnt"
//                                                 onKeyPress={(e) => {
//                                                   if (
//                                                     e.charCode < 48 ||
//                                                     e.charCode > 57
//                                                   ) {
//                                                     e.preventDefault();
//                                                   }
//                                                 }}
//                                                 maxLength={9}
//                                                 onChange={(e) =>
//                                                   handleInputChange(
//                                                     userSite.id,
//                                                     "monthly_amount",
//                                                     e.target.value
//                                                   )
//                                                 }
//                                               />
//                                             </div>
//                                             <div className="col-2  mx-2">
//                                               <label className="fw-600 my-1 small-font">
//                                                 * Max Chips Monthly
//                                               </label>

//                                               <input
//                                                 type="text"
//                                                 className="small-font white-bg rounded border-grey3 all-none p-2 w-100"
//                                                 placeholder="Max Chips Monthly"
//                                                 maxLength={9}
//                                                 onKeyPress={(e) => {
//                                                   if (
//                                                     e.charCode < 48 ||
//                                                     e.charCode > 57
//                                                   ) {
//                                                     e.preventDefault();
//                                                   }
//                                                 }}
//                                                 onChange={(e) =>
//                                                   handleInputChange(
//                                                     userSite.id,
//                                                     "max_chips_monthly",
//                                                     e.target.value
//                                                   )
//                                                 }
//                                               />
//                                             </div>
//                                             <div className="col-1  mx-2">
//                                               <label className="fw-600 my-1 small-font">
//                                                 Chips (%)
//                                               </label>

//                                               <input
//                                                 type="text"
//                                                 className="small-font white-bg rounded border-grey3 all-none p-2 w-100"
//                                                 placeholder="Chip %"
//                                                 readOnly
//                                                 value={
//                                                   isNaN(
//                                                     (parseFloat(
//                                                       websiteDetails[
//                                                         userSite.id
//                                                       ]?.monthly_amount
//                                                     ) /
//                                                       parseFloat(
//                                                         websiteDetails[
//                                                           userSite.id
//                                                         ]?.max_chips_monthly
//                                                       )) *
//                                                       100
//                                                   )
//                                                     ? "0%"
//                                                     : (
//                                                         (parseFloat(
//                                                           websiteDetails[
//                                                             userSite.id
//                                                           ]?.monthly_amount
//                                                         ) /
//                                                           parseFloat(
//                                                             websiteDetails[
//                                                               userSite.id
//                                                             ]?.max_chips_monthly
//                                                           )) *
//                                                         100
//                                                       ).toFixed(2) + "%"
//                                                 }
//                                                 onChange={(e) =>
//                                                   handleInputChange(
//                                                     userSite.id,
//                                                     "chip_percentage",
//                                                     e.target.value
//                                                   )
//                                                 }
//                                               />
//                                             </div>
//                                             <div className="col-2 mx-2">
//                                               <label className="fw-600 my-1 small-font">
//                                                 * Commission (%)
//                                               </label>
//                                               <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
//                                                 <input
//                                                   type="text"
//                                                   className="small-font bg-none all-none p-2 w-50"
//                                                   maxLength={2}
//                                                   value={
//                                                     websiteDetails[userSite.id]
//                                                       ?.downline_comm || ""
//                                                   }
//                                                   onChange={(e) => {
//                                                     let value =
//                                                       e.target.value.replace(
//                                                         /\D/g,
//                                                         ""
//                                                       ); // Allow only numbers
//                                                     if (value.length > 3)
//                                                       return; // Restrict input to max 3 digits
//                                                     if (
//                                                       parseInt(value, 10) > 100
//                                                     )
//                                                       return; // Prevent values greater than 100
//                                                     handleInputChange(
//                                                       userSite.id,
//                                                       "downline_comm",
//                                                       value
//                                                     );
//                                                   }}
//                                                 />
//                                                 {/* <span className="small-font text-center px-1 white-space yellow-bg py-2 br-right fw-600">
//                                                   <div>
//                                                     My Comm..{" "}
//                                                     {
//                                                       (parseInt(
//                                                         websiteDetails[
//                                                           userSite.id
//                                                         ]?.downline_comm
//                                                       ) )}
//                                                     %
//                                                   </div>
//                                                 </span> */}
//                                               </div>
//                                             </div>

//                                             <div className="  flex-between input-css d-flex border-grey3 mt-4  mx-2">
//                                               <input
//                                                 type="checkbox"
//                                                 checked={
//                                                   websiteDetails[userSite.id]
//                                                     ?.casino_allowed || false
//                                                 }
//                                                 onChange={(e) =>
//                                                   handleInputChange(
//                                                     userSite.id,
//                                                     "casino_allowed",
//                                                     e.target.checked
//                                                   )
//                                                 }
//                                               />
//                                               <label className="small-font ms-2  white-space ">
//                                                 Casino Allowed
//                                               </label>
//                                             </div>
//                                             {websiteDetails[userSite.id]
//                                               ?.casino_allowed && (
//                                               <div className="col-2">
//                                                 <label className="fw-600 my-1 white-space small-font">
//                                                   * Casino Chip Value
//                                                 </label>
//                                                 <input
//                                                   type="text"
//                                                   className="small-font white-bg rounded all-none border-grey3 p-2 w-100"
//                                                   placeholder="Casino Chip Value"
//                                                   maxLength={4}
//                                                   onKeyPress={(e) => {
//                                                     if (
//                                                       e.charCode < 48 ||
//                                                       e.charCode > 57
//                                                     ) {
//                                                       e.preventDefault();
//                                                     }
//                                                   }}
//                                                   onChange={(e) =>
//                                                     handleInputChange(
//                                                       userSite.id,
//                                                       "casino_chip_value",
//                                                       e.target.value
//                                                     )
//                                                   }
//                                                 />
//                                               </div>
//                                             )}
//                                           </div>
//                                         </div>
//                                       )}

//                                       {/* Fields for Commission Type 2 */}
//                                       {accountTypes[form.id]?.[userSite.id] ===
//                                         "2" && (
//                                         <div className="col d-flex  ">
//                                           <div className="col-2 position-relative mx-1">
//                                             <label className="fw-600 my-1 small-font">
//                                               * Share (%)
//                                             </label>
//                                             <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
//                                               <input
//                                                 type="text"
//                                                 className="small-font bg-none p-2 all-none w-50"
//                                                 value={
//                                                   websiteDetails[userSite.id]
//                                                     ?.share || ""
//                                                 }
//                                                 onChange={(e) => {
//                                                   let value =
//                                                     e.target.value.replace(
//                                                       /\D/g,
//                                                       ""
//                                                     ); // Allow only numbers
//                                                   if (value.length > 3) return; // Restrict input to max 3 digits
//                                                   if (parseInt(value, 10) > 100)
//                                                     return; // Prevent values greater than 100
//                                                   handleInputChange(
//                                                     userSite.id,
//                                                     "share",
//                                                     value
//                                                   );
//                                                 }}
//                                               />
//                                               <span className="small-font text-center px-1 white-space yellow-bg py-2 br-right fw-600">
//                                                 <div className="fw-600">
//                                                   My Share{" "}
//                                                   {100 -
//                                                     (parseInt(
//                                                       websiteDetails[
//                                                         userSite.id
//                                                       ]?.share
//                                                     ) || 0)}
//                                                   %
//                                                 </div>
//                                               </span>
//                                             </div>
//                                           </div>
//                                           <div className="col-2 position-relative mx-3">
//                                             <label className="fw-600 my-1 small-font">
//                                               * Enter Commission
//                                             </label>
//                                             <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
//                                               <input
//                                                 type="text"
//                                                 maxLength={2}
//                                                 className="small-font bg-none p-2 w-75 all-none"
//                                                 // placeholder="Enter Commission: M.0"
//                                                 value={
//                                                   websiteDetails[userSite.id]
//                                                     ?.downline_comm || ""
//                                                 }
//                                                 onChange={(e) => {
//                                                   let value =
//                                                     e.target.value.replace(
//                                                       /\D/g,
//                                                       ""
//                                                     ); // Allow only numbers
//                                                   if (value.length > 3) return; // Restrict input to max 3 digits
//                                                   if (parseInt(value, 10) > 100)
//                                                     return; // Prevent values greater than 100
//                                                   handleInputChange(
//                                                     userSite.id,
//                                                     "downline_comm",
//                                                     value
//                                                   );
//                                                 }}
//                                               />
//                                               {/* <span className="small-font text-center px-1 white-space yellow-bg py-2 br-right fw-500">
//                                                 <b>
//                                                   My Comm..{" "}
//                                                   {100 -
//                                                     (parseInt(
//                                                       websiteDetails[
//                                                         userSite.id
//                                                       ]?.downline_comm
//                                                     ) || 0)}
//                                                   %
//                                                 </b>
//                                               </span> */}
//                                             </div>
//                                           </div>
//                                           <div className="col-2 position-relative mx-3">
//                                             <label className="fw-600 my-1 small-font">
//                                               * Casino Chip Value
//                                             </label>
//                                             <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
//                                               <input
//                                                 className="small-font bg-none all-none p-2 w-100"
//                                                 type="text"
//                                                 inputMode="numeric"
//                                                 pattern="[0-9]*"
//                                                 maxLength={4}
//                                                 onKeyPress={(event) => {
//                                                   if (
//                                                     event.charCode < 48 ||
//                                                     event.charCode > 57
//                                                   ) {
//                                                     event.preventDefault(); // Prevent non-numeric characters
//                                                   }
//                                                 }}
//                                                 onChange={(e) => {
//                                                   const numericValue =
//                                                     e.target.value.replace(
//                                                       /\D/g,
//                                                       ""
//                                                     ); // Remove non-numeric characters
//                                                   handleInputChange(
//                                                     userSite.id,
//                                                     "caschip_values",
//                                                     numericValue
//                                                   );
//                                                 }}
//                                               />

//                                               {/* <span className="small-font text-center px-1 white-space yellow-bg py-2 br-right fw-500">
//     <b className="mx-1">Cas. Chip Val 20</b>
//   </span> */}
//                                             </div>
//                                           </div>

//                                           {/* Render "Is Primary" checkbox for account types 2 and 3 */}
//                                           <div className="w-10 flex-between white-space input-css ms-2 d-flex border-grey3 mt-4">
//                                             {renderIsPrimaryCheckbox(
//                                               form.id,
//                                               userSite.id
//                                             )}
//                                           </div>
//                                         </div>
//                                       )}

//                                       {/* Fields for Commission Type 3 */}
//                                       {accountTypes[form.id]?.[userSite.id] ===
//                                         "3" && (
//                                         <div className="col d-flex ">
//                                           <div className="col-2 position-relative mx-1">
//                                             <label className="fw-600 my-1 small-font">
//                                               * Downline Sharing
//                                             </label>
//                                             <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
//                                               <input
//                                                 type="text"
//                                                 className="small-font bg-none all-none p-2 w-75"
//                                                 // placeholder="Downline Sharing"
//                                                 value={
//                                                   websiteDetails[userSite.id]
//                                                     ?.share || ""
//                                                 }
//                                                 onChange={(e) => {
//                                                   let value =
//                                                     e.target.value.replace(
//                                                       /\D/g,
//                                                       ""
//                                                     ); // Allow only numbers
//                                                   if (value.length > 3) return; // Restrict input to max 3 digits
//                                                   if (parseInt(value, 10) > 100)
//                                                     return; // Prevent values greater than 100
//                                                   handleInputChange(
//                                                     userSite.id,
//                                                     "share",
//                                                     value
//                                                   );
//                                                 }}
//                                               />
//                                               <span className="small-font text-center px-1 white-space yellow-bg py-2 br-right fw-500">
//                                                 <b>
//                                                   My Share{" "}
//                                                   {100 -
//                                                     (parseInt(
//                                                       websiteDetails[
//                                                         userSite.id
//                                                       ]?.share
//                                                     ) || 0)}
//                                                   %
//                                                 </b>
//                                               </span>
//                                             </div>
//                                           </div>
//                                           <div className="col-2 position-relative mx-3">
//                                             <label className="fw-600 my-1 small-font">
//                                               * Commission (%)
//                                             </label>
//                                             <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
//                                               <input
//                                                 type="text"
//                                                 maxLength={2}
//                                                 className="small-font bg-none all-none p-2 w-75"
//                                                 // placeholder="Enter Commission: M.0"
//                                                 value={
//                                                   websiteDetails[userSite.id]
//                                                     ?.downline_comm || ""
//                                                 }
//                                                 onChange={(e) => {
//                                                   let value =
//                                                     e.target.value.replace(
//                                                       /\D/g,
//                                                       ""
//                                                     ); // Allow only numbers
//                                                   if (value.length > 3) return; // Restrict input to max 3 digits
//                                                   if (parseInt(value, 10) > 100)
//                                                     return; // Prevent values greater than 100
//                                                   handleInputChange(
//                                                     userSite.id,
//                                                     "downline_comm",
//                                                     value
//                                                   );
//                                                 }}
//                                               />
//                                               {/* <span className="small-font text-center px-1 white-space yellow-bg py-2 br-right fw-500">
//                                                 <b>
//                                                   My Comm..{" "}
//                                                   {100 -
//                                                     (parseInt(
//                                                       websiteDetails[
//                                                         userSite.id
//                                                       ]?.downline_comm
//                                                     ) || 0)}
//                                                   %
//                                                 </b>
//                                               </span> */}
//                                             </div>
//                                           </div>
//                                           <div className="col-2 position-relative mx-3">
//                                             <label className="fw-600 my-1 small-font">
//                                               * Casino Chip Value
//                                             </label>
//                                             <div className="white-bg rounded border-grey3 d-flex justify-content-between align-items-center small-font">
//                                               <input
//                                                 className="small-font bg-none p-2 all-none w-100"
//                                                 maxLength={4}
//                                                 // placeholder="Casino Chip Value"
//                                                 onKeyPress={(e) => {
//                                                   if (
//                                                     e.charCode < 48 ||
//                                                     e.charCode > 57
//                                                   ) {
//                                                     e.preventDefault();
//                                                   }
//                                                 }}
//                                                 onChange={(e) =>
//                                                   handleInputChange(
//                                                     userSite.id,
//                                                     "caschip_values",
//                                                     e.target.value
//                                                   )
//                                                 }
//                                               />
//                                               {/* <span className="small-font text-center  px-1 white-space yellow-bg py-2 br-right  fw-500">
//                                                 <b className="mx-1">
//                                                   Cas. Chip Val 20
//                                                 </b>
//                                               </span> */}
//                                             </div>
//                                           </div>
//                                           {/* Render "Is Primary" checkbox for account types 2 and 3 */}
//                                           <div className="w-10 flex-between input-css white-space ms-2 d-flex border-grey3 mt-4 mx-2">
//                                             {renderIsPrimaryCheckbox(
//                                               form.id,
//                                               userSite.id
//                                             )}
//                                           </div>
//                                         </div>
//                                       )}
//                                     </div>

//                                     <div></div>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           ))
//                         ) : (
//                           <p className="small-font"></p>
//                         )}
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {websiteCreationErrors && (
//                 <div className="w-100 d-flex">
//                   {" "}
//                   <div className="error-popup-container1 col-4 py-3 small-font fw-600 p-1 br-5 m-2 px-4">
//                     <BiSolidMessageAltError className="me-3" />
//                     {websiteCreationErrors}
//                   </div>
//                 </div>
//               )}

//               <div className="d-flex py-2  align-items-center ">
//                 <button
//                   type="button"
//                   className="cst-btn2 "
//                   onClick={() => removeForm(form.id)}
//                 >
//                   <FaTrash className="me-2" /> Remove
//                 </button>
//               </div>
//             </>
//           ))}
//         </form>

//         <div className="d-flex justify-content-end ">
//           <button
//             type="button"
//             className="cst-btn me-4"
//             onClick={addAnotherForm}
//           >
//             <FaPlus className="me-2  " /> Add Another
//           </button>

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
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiSolidMessageAltError } from "react-icons/bi";

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
  const [isCreditAllowed, setIsCreditAllowed] = useState(false);
  const [creditValue, setCreditValue] = useState(2);
  const [creditreference, setCreditReference] = useState(null);
  const [selectedWebsiteId, setSelectedWebsiteId] = useState(null);

  const toggleCreditAllowed = () => {
    const newIsCreditAllowed = !isCreditAllowed;
    setIsCreditAllowed(newIsCreditAllowed);
    setCreditValue(newIsCreditAllowed ? 1 : 2);
  };

  console.log(creditValue, "==>creditValue");

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

        if (accotypeid === "3" || accotypeid === "2") {
          websiteData.share = parseFloat(
            websiteDetails[userSite.id]?.share || null
          );
          websiteData.caschip_values = parseFloat(
            websiteDetails[userSite.id]?.caschip_values || null
          );
          websiteData.downline_comm = parseFloat(
            websiteDetails[userSite.id]?.downline_comm || null
          );
          websiteData.is_casino = websiteDetails[userSite.id]?.casino_allowed
            ? 1
            : 2;
          // Add is_primary for account types 2 and 3
          websiteData.is_primary = websiteDetails[userSite.id]?.isPrimary
            ? 1
            : 2;
        }

        if (accotypeid === "1") {
          websiteData.monthly_amount = parseInt(
            websiteDetails[userSite.id]?.monthly_amount || null
          );
          websiteData.chip_percentage =
            (parseInt(websiteDetails[userSite.id]?.monthly_amount || 0) /
              parseInt(websiteDetails[userSite.id]?.max_chips_monthly || 0)) *
            100;
          websiteData.max_chips_monthly = parseInt(
            websiteDetails[userSite.id]?.max_chips_monthly || null
          );
          websiteData.is_casino = websiteDetails[userSite.id]?.casino_allowed
            ? 1
            : 2;
          if (websiteDetails[userSite.id]?.casino_chip_value) {
            websiteData.caschip_values = parseFloat(
              websiteDetails[userSite.id]?.casino_chip_value
            );
          }
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
      // is_credit: creditValue || 2,
      // credit_reference: creditreference || 1,
    };

    createDirector(finalData)
      .then((response) => {
        if (response.status === true) {
          setSuccessPopupOpen(true);
          setCreateDescription(
            `${
              selectedRole == 1 ? "Director" : "Superadmin"
            } Added Successfully`
          );
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
          websiteData.is_casino = websiteDetails[userSite.website_access_id]
            ?.casino_allowed
            ? 1
            : 2;

          if (websiteDetails[userSite.website_access_id]?.casino_chip_value) {
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

   console.log(finalData, "finalData");
   

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
    if (!password) {
      newErrors.password = " Password is required.";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
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

  // Render the "Is Primary" checkbox for account types 2 and 3
  const renderIsPrimaryCheckbox = (formId, userSiteId) => {
    const accotypeid = accountTypes[formId]?.[userSiteId];
    if (accotypeid === "2" || accotypeid === "3") {
      return (
        <div className="w-70 flex-between">
          <input
            type="checkbox"
            checked={websiteDetails[userSiteId]?.isPrimary || false}
            onChange={(e) =>
              handleInputChange(userSiteId, "isPrimary", e.target.checked)
            }
          />
          <label className="small-font mx-2">IS PRIMARY </label>
        </div>
      );
    }
    return null;
  };

  // Function to handle deleting a user site's details
  const handleDeleteUserSite = (formId, userSiteId) => {
    // Uncheck the user site checkbox
    setSelectedWebsites((prev) => ({
      ...prev,
      [formId]: {
        ...prev[formId],
        [userSiteId]: false,
      },
    }));

    // Clear the commission type
    setAccountTypes((prev) => ({
      ...prev,
      [formId]: {
        ...prev[formId],
        [userSiteId]: null,
      },
    }));

    // Clear all entered details for the user site
    setWebsiteDetails((prevDetails) => {
      const updatedDetails = { ...prevDetails };
      delete updatedDetails[userSiteId];
      return updatedDetails;
    });
  };

  // Rest of your existing functions (GetAllCountries, GetAllCurrencies, etc.)
  // ...

  const [chosenRemark, setChosenRemark] = useState(null);

  // New variable name for the options
  const remarkOptions = [
    { value: "credit", label: "Credit" },
    { value: "offline", label: "offline" },
  ];

  // New function name for handling changes
  const handleRemarkChange = (selectedRemark) => {
    setChosenRemark(selectedRemark);
    // You can add additional logic here if needed
  };

  return (
    <>
      <div className="m-2 ">
        <div className="d-flex align-items-center justify-content-between py-2">
          <h5 className="yellow-font">Add Director & Super Admin</h5>
          <span
            className="white-font me-2  p-2 br-10 yellow-bg  cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="mx-2" /> Back
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
              {errors?.name && <span className="error">{errors?.name}</span>}
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
                <span className="x-small-font error">{errors?.loginName}</span>
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
                <span className="text-danger small-font">
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
                label: countryData?.find((country) => country.id === selectedCountryCode)?.name,
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
          // Allow only alphabetic characters in search
          const lettersOnly = searchText.replace(/[^a-zA-Z]/g, "");
          return option.label.toLowerCase().includes(lettersOnly.toLowerCase());
        }}
        onInputChange={(inputValue) => {
          // Ensure only alphabetic characters are allowed in the input
          return inputValue.replace(/[^a-zA-Z]/g, "");
        }}
      />
      {errors?.selectedCountryCode && (
        <span className="x-small-font error">{errors?.selectedCountryCode}</span>
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
                (currency) => currency.country_id === selectedCurrencyCode
              )?.currency_name +
              " --- " +
              currencyData?.find(
                (currency) => currency.country_id === selectedCurrencyCode
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
      // Allow only alphabetic characters in search
      const lettersOnly = searchText.replace(/[^a-zA-Z]/g, "");
      return option.label.toLowerCase().includes(lettersOnly.toLowerCase());
    }}
    onInputChange={(inputValue) => {
      // Ensure only alphabetic characters are allowed in the input
      return inputValue.replace(/[^a-zA-Z]/g, "");
    }}
  />
  {errors?.selectedCurrencyCode && (
    <span className="x-small-font error">{errors?.selectedCurrencyCode}</span>
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
                    <span className="x-small-font error">
                      {errors?.password}
                    </span>
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
                    <span className="x-small-font error">
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
                    <span className="x-small-font error">
                      {errors?.managementPassword}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="row ">
            <div className="col-3 d-flex  align-items-center">
              <div className="p-2 my-4">
              <input
                type="checkbox"
                checked={isCreditAllowed}
                onChange={toggleCreditAllowed}
              />
              <label className="small-font ms-2">CREDIT ALLOWED </label>



              </div>
              
            </div>

            <div className="col-3">
              {isCreditAllowed && (
               <div className="p-1 position-relative">
               <label className="small-font">Credit Reference</label>
               <input
                 type="text"
                 className="small-font rounded all-none input-css w-100"
                 placeholder="Enter"
                 value={creditreference}
                 maxLength={9}
                 onChange={(e) => {
                   // Allow only numbers
                   const numericValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                   setCreditReference(numericValue); // Update state with sanitized value
                 }}
                 onKeyPress={(e) => {
                   // Prevent non-numeric characters from being entered
                   if (e.charCode < 48 || e.charCode > 57) {
                     e.preventDefault(); // Block non-numeric input
                   }
                 }}
               />
             </div>
              )}
            </div>
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
                {role === "director" ? (
                  <div className="col-1">
                    <label className="small-font my-1">Admin Website</label>
                    <div className="custom-select-wrapper">
                      <Select
                        className="small-font"
                        placeholder="Select"
                        isSearchable={false}
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
                  <div className="col-2 ">
                    <label className="small-font my-1">Admin Website </label>
                    <div className="custom-select-wrapper">
                      <Select
                        className="small-font"
                        placeholder="Select"
                        styles={customStyles}
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
                <div className="position-relative mt-4">
                  <div className="hr-line-grey"></div>
                  <div className="d-flex w-100 my-2">
                    <div className="small-font black-font my-2 ">
                      User Website Details
                    </div>
                    <hr />
                  </div>
                </div>

                <div className="row ">
                  <div className="col-12">
                    {role === "director" && selectedOption ? (
                      userWebsitesList[form.id]?.length > 0 ? (
                        userWebsitesList[form.id].map((userSite) => (
                          <div
                            key={userSite.website_access_id}
                            className="d-flex flex-column"
                          >
                            <div className="dashed-grey-border"></div>
                            <label className="small-font my-1 ">
                              User Website
                            </label>

                            <div className="col-2  input-css d-flex white-bg border-grey3 my-2">
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
                              <>
                                {/* Commission Type Dropdown */}
                                <div className="col-4 my-1">
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

                                {/* Delete Button */}
                                <div className="col-4   my-1">
                                  <button
                                    type="button"
                                    className="cst-btn remove-btn"
                                    onClick={() =>
                                      handleDeleteUserSite(
                                        form.id,
                                        userSite.website_access_id
                                      )
                                    }
                                  >
                                    <FaTrash className="me-2" /> Delete
                                  </button>
                                </div>

                                {/* Fields for Commission Type 1 */}
                                {accountTypes[form.id]?.[
                                  userSite.website_access_id
                                ] === "1" && (
                                  <div className="col-12 ">
                                    <div className="row">
                                      <div className="col-2">
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
                                      <div className="col-2">
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
                                      <div className="col-2">
                                        <input
                                          type="text"
                                          className="small-font white-bg rounded border-grey3 p-2 w-100"
                                          placeholder="Chip %"
                                          value={
                                            (parseInt(
                                              websiteDetails[
                                                userSite.website_access_id
                                              ]?.monthly_amount || 0
                                            ) /
                                              parseInt(
                                                websiteDetails[
                                                  userSite.website_access_id
                                                ]?.max_chips_monthly || 0
                                              )) *
                                            100
                                          }
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
                                      {websiteDetails[
                                        userSite.website_access_id
                                      ]?.casino_allowed && (
                                        <div className="col-2">
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

                                {/* Fields for Commission Type 2 */}
                                {accountTypes[form.id]?.[
                                  userSite.website_access_id
                                ] === "2" && (
                                  <div className="col d-flex">
                                    <div className="col-2 position-relative mx-1">
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
                                    <div className="col-2 position-relative mx-1">
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
                                    <div className="col-2 position-relative mx-1">
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
                                          <b className="mx-1">
                                            Cas. Chip Val 20
                                          </b>
                                        </span>
                                      </div>
                                    </div>
                                    {/* Render "Is Primary" checkbox for account types 2 and 3 */}
                                    {renderIsPrimaryCheckbox(
                                      form.id,
                                      userSite.website_access_id
                                    )}
                                  </div>
                                )}

                                {/* Fields for Commission Type 3 */}
                                {accountTypes[form.id]?.[
                                  userSite.website_access_id
                                ] === "3" && (
                                  <div className="col d-flex">
                                    <div className="col-2 position-relative mx-1">
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
                                    <div className="col-2 position-relative mx-1">
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
                                    <div className="col-2 position-relative mx-1">
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
                                          <b className="mx-1">
                                            Cas. Chip Val 20
                                          </b>
                                        </span>
                                      </div>
                                    </div>
                                    {/* Render "Is Primary" checkbox for account types 2 and 3 */}
                                    {renderIsPrimaryCheckbox(
                                      form.id,
                                      userSite.website_access_id
                                    )}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="small-font">""</p>
                      )
                    ) : (
                      <>
                        {userWebsitesList[form.id]?.length > 0 ? (
                          <div className="d-flex white-bg mb-4 flex-column">
                            {/* Single Dropdown for All Websites */}

                            <div className="d-flex">
                              <div className="col-2 input-css5   small-font ">
                                <div className="black-font">User Website</div>
                                <Select
                                  className="small-font rounded all-none my-2 w-100"
                                  placeholder="Select a website "
                                  options={userWebsitesList[form.id].map(
                                    (site) => ({
                                      value: site.id, // Value for the option
                                      label: site.web_url, // Display text for the option
                                    })
                                  )}
                                  value={
                                    selectedWebsiteId
                                      ? {
                                          value: selectedWebsiteId,
                                          label:
                                            userWebsitesList[form.id].find(
                                              (site) =>
                                                site.id === selectedWebsiteId
                                            )?.web_url || "",
                                        }
                                      : null
                                  }
                                  onChange={(selectedOption) => {
                                    const selectedSiteId = selectedOption
                                      ? selectedOption.value
                                      : null;
                                    setSelectedWebsiteId(selectedSiteId); // Update the selected website ID
                                    handleCheckboxChange(
                                      form.id,
                                      selectedSiteId
                                    ); // Handle selection
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
                                    className="small-font my-2  "
                                    placeholder=" Commission Type"
                                    options={commissionOptions}
                                    styles={customStyles}
                                    isDisabled={!selectedWebsiteId}
                                    onChange={(selectedOption) =>
                                      handleAccountTypeChange(
                                        form.id,
                                        selectedWebsiteId,
                                        selectedOption
                                      )
                                    }
                                    value={
                                      commissionOptions.find(
                                        (option) =>
                                          option.value ===
                                          accountTypes[form.id]?.[
                                            selectedWebsiteId
                                          ]
                                      ) || null
                                    }
                                  />
                                </div>

                                {/* Fields for Commission Type 1 */}
                                {accountTypes[form.id]?.[selectedWebsiteId] ===
                                  "1" && (
                                  <div>
                                    <div className="d-flex">
                                      <div className="col-2 mt-2 mx-2">
                                        <label className="fw-600 my-1 small-font">
                                          Monthly Amount
                                        </label>
                                        <input
                                          type="text"
                                          className="small-font input-css rounded all-none p-2 w-100"
                                          // placeholder="Monthly Amnt"
                                          onKeyPress={(e) => {
                                            if (
                                              e.charCode < 48 ||
                                              e.charCode > 57
                                            ) {
                                              e.preventDefault();
                                            }
                                          }}
                                          maxLength={9}
                                          onChange={(e) =>
                                            handleInputChange(
                                              selectedWebsiteId,
                                              "monthly_amount",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                      <div className="col-2 mx-2 mt-2">
                                        <label className="fw-600 my-1 small-font">
                                          Max Chips Monthly
                                        </label>
                                        <input
                                          type="text"
                                          className="small-font input-css  rounded  all-none p-2 w-100"
                                          // placeholder="Max Chips Monthly"
                                          maxLength={9}
                                          onKeyPress={(e) => {
                                            if (
                                              e.charCode < 48 ||
                                              e.charCode > 57
                                            ) {
                                              e.preventDefault();
                                            }
                                          }}
                                          onChange={(e) =>
                                            handleInputChange(
                                              selectedWebsiteId,
                                              "max_chips_monthly",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                      <div className="col-1 m-2 ">
                                        <label className="fw-600 my-1 small-font">
                                          Chips (%)
                                        </label>
                                        <input
                                          type="text"
                                          className="small-font input-css rounded  all-none p-2 w-100"
                                          placeholder="Chip %"
                                          readOnly
                                          value={
                                            isNaN(
                                              (parseFloat(
                                                websiteDetails[
                                                  selectedWebsiteId
                                                ]?.monthly_amount
                                              ) /
                                                parseFloat(
                                                  websiteDetails[
                                                    selectedWebsiteId
                                                  ]?.max_chips_monthly
                                                )) *
                                                100
                                            )
                                              ? "0%"
                                              : (
                                                  (parseFloat(
                                                    websiteDetails[
                                                      selectedWebsiteId
                                                    ]?.monthly_amount
                                                  ) /
                                                    parseFloat(
                                                      websiteDetails[
                                                        selectedWebsiteId
                                                      ]?.max_chips_monthly
                                                    )) *
                                                  100
                                                ).toFixed(2) + "%"
                                          }
                                          onChange={(e) =>
                                            handleInputChange(
                                              selectedWebsiteId,
                                              "chip_percentage",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                      <div className="col-2 m-2">
                                        <label className="fw-600 my-1 small-font">
                                          Commission (%)
                                        </label>
                                        <div className="input-css rounded  d-flex justify-content-between align-items-center small-font">
                                          <input
                                            type="text"
                                            className="small-font bg-none all-none  w-50"
                                            maxLength={2}
                                            value={
                                              websiteDetails[selectedWebsiteId]
                                                ?.downline_comm || ""
                                            }
                                            onChange={(e) => {
                                              let value =
                                                e.target.value.replace(
                                                  /\D/g,
                                                  ""
                                                ); // Allow only numbers
                                              if (value.length > 3) return; // Restrict input to max 3 digits
                                              if (parseInt(value, 10) > 100)
                                                return; // Prevent values greater than 100
                                              handleInputChange(
                                                selectedWebsiteId,
                                                "downline_comm",
                                                value
                                              );
                                            }}
                                          />
                                        </div>
                                      </div>

                                      <div className="col-2 m-2">
                                        <div className="  input-css d-flex mt-4  my-2 mx-2">
                                          <input
                                            type="checkbox"
                                            checked={
                                              websiteDetails[selectedWebsiteId]
                                                ?.casino_allowed || false
                                            }
                                            onChange={(e) =>
                                              handleInputChange(
                                                selectedWebsiteId,
                                                "casino_allowed",
                                                e.target.checked
                                              )
                                            }
                                          />
                                          <label className="small-font ms-2 white-space">
                                            Casino Allowed
                                          </label>
                                        </div>
                                      </div>

                                      {websiteDetails[selectedWebsiteId]
                                        ?.casino_allowed && (
                                        <div className="col-2 mt-2">
                                          <label className="fw-600 my-1 white-space small-font">
                                            Casino Chip Value
                                          </label>
                                          <input
                                            type="text"
                                            className="small-font input-css rounded all-none  p-2 w-100"
                                            placeholder="Casino Chip Value"
                                            maxLength={4}
                                            onKeyPress={(e) => {
                                              if (
                                                e.charCode < 48 ||
                                                e.charCode > 57
                                              ) {
                                                e.preventDefault();
                                              }
                                            }}
                                            onChange={(e) =>
                                              handleInputChange(
                                                selectedWebsiteId,
                                                "casino_chip_value",
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {/* Fields for Commission Type 2 and 3 */}
                                {(accountTypes[form.id]?.[selectedWebsiteId] ===
                                  "2" ||
                                  accountTypes[form.id]?.[selectedWebsiteId] ===
                                    "3") && (
                                  <div className="col d-flex">
                                    <div className="col-2 position-relative mx-1 mt-2">
                                      <label className="fw-600 my-1 small-font">
                                        Downline Share
                                      </label>
                                      <div className=" rounded input-css  d-flex justify-content-between align-items-center small-font">
                                        <input
                                          type="text"
                                          className="small-font bg-none  all-none w-50"
                                          value={
                                            websiteDetails[selectedWebsiteId]
                                              ?.share || ""
                                          }
                                          onChange={(e) => {
                                            let value = e.target.value.replace(
                                              /\D/g,
                                              ""
                                            ); // Allow only numbers
                                            if (value.length > 3) return; // Restrict input to max 3 digits
                                            if (parseInt(value, 10) > 100)
                                              return; // Prevent values greater than 100
                                            handleInputChange(
                                              selectedWebsiteId,
                                              "share",
                                              value
                                            );
                                          }}
                                        />
                                        {/* <span className="small-font text-center px-1 white-space yellow-bg py-2 br-right fw-600">
                                          <div className="fw-600">
                                            My Share{" "}
                                            {100 -
                                              (parseInt(
                                                websiteDetails[
                                                  selectedWebsiteId
                                                ]?.share
                                              ) || 0)}
                                            %
                                          </div>
                                        </span> */}
                                      </div>
                                    </div>
                                    <div className="col-2 position-relative mt-1 mx-3">
                                      <label className="fw-600  small-font">
                                        Downline Commission
                                      </label>
                                      <div className=" input-css mt-2 d-flex justify-content-between align-items-center small-font">
                                        <input
                                          type="text"
                                          maxLength={2}
                                          className="small-font bg-none  w-75 all-none"
                                          value={
                                            websiteDetails[selectedWebsiteId]
                                              ?.downline_comm || ""
                                          }
                                          onChange={(e) => {
                                            let value = e.target.value.replace(
                                              /\D/g,
                                              ""
                                            ); // Allow only numbers
                                            if (value.length > 3) return; // Restrict input to max 3 digits
                                            if (parseInt(value, 10) > 100)
                                              return; // Prevent values greater than 100
                                            handleInputChange(
                                              selectedWebsiteId,
                                              "downline_comm",
                                              value
                                            );
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-2 position-relative mx-3">
                                      <label className="fw-600 my-1 small-font">
                                        Cash chip Values
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
                                              event.preventDefault(); // Prevent non-numeric characters
                                            }
                                          }}
                                          onChange={(e) => {
                                            const numericValue =
                                              e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                                            handleInputChange(
                                              selectedWebsiteId,
                                              "caschip_values",
                                              numericValue
                                            );
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-2 ">
                                      <label className="fw-600 my-1 small-font">
                                        {/* Cash chip Values */}
                                      </label>

                                      <div className="input-css mt-2">
                                        {renderIsPrimaryCheckbox(
                                          form.id,
                                          selectedWebsiteId
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

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

                              {
                                accountTypes[form.id]?.[selectedWebsiteId] && (
                                  <>
                                    <div className="col-2 position-relative mt-1">
                                      <label className="fw-600 small-font">
                                        Add Deposit Chips
                                      </label>
                                      <div className="input-css mt-2 d-flex justify-content-between align-items-center small-font">
                                        <input
                                          type="text"
                                          maxLength={2}
                                          className="small-font bg-none w-75 all-none"
                                          value={
                                            websiteDetails[selectedWebsiteId]
                                              ?.downline_comm || ""
                                          }
                                          onChange={(e) => {
                                            let value = e.target.value.replace(
                                              /\D/g,
                                              ""
                                            ); // Allow only numbers
                                            if (value.length > 3) return; // Restrict input to max 3 digits
                                            if (parseInt(value, 10) > 100)
                                              return; // Prevent values greater than 100
                                            handleInputChange(
                                              selectedWebsiteId,
                                              "downline_comm",
                                              value 
                                            );
                                          }}
                                        />
                                      </div>
                                    </div>

                                    <div className="col-2 position-relative mt-1">
                                      <label className="fw-600 small-font">
                                        Add Deposit Amount
                                      </label>
                                      <div className="input-css mt-2 d-flex justify-content-between align-items-center small-font">
                                        <input
                                          type="text"
                                          maxLength={2}
                                          className="small-font bg-none w-75 all-none"
                                          value={
                                            websiteDetails[selectedWebsiteId]
                                              ?.downline_comm || ""
                                          }
                                          onChange={(e) => {
                                            let value = e.target.value.replace(
                                              /\D/g,
                                              ""
                                            ); // Allow only numbers
                                            if (value.length > 3) return; // Restrict input to max 3 digits
                                            if (parseInt(value, 10) > 100)
                                              return; // Prevent values greater than 100
                                            handleInputChange(
                                              selectedWebsiteId,
                                              "downline_comm",
                                              value
                                            );
                                          }}
                                        />
                                      </div>
                                    </div>

                                    <div className="col-2 small-font position-relative mt-3">
                                      <label className="fw-600 small-font">
                                        Deposit Remark
                                      </label>
                                      <Select
                                        value={chosenRemark}
                                        onChange={handleRemarkChange}
                                        options={remarkOptions}
                                        placeholder="Select..."
                                        styles={customStyles}
                                        isSearchable={false}
                                      />
                                    </div>
                                  </>
                                )}
                            </div>
                          </div>
                        ) : (
                          <p className="small-font"></p>
                        )}
                      </>
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
