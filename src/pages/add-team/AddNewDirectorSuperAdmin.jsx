import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  FaArrowLeft,
  FaArrowRight,
  FaEye,
  FaEyeSlash,
  FaPlus,
} from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import Select from "react-select";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  createDirector,
  getAdminWebsites,
  getCountries,
  getCurrencies,
} from "../../api/apiMethods";
import { adminRoles, commissionTypes } from "../../utils/enum";
import { customStyles } from "../../components/ReactSelectStyles";
import { useNavigate } from "react-router-dom";

function AddNewDirectorSuperAdmin() {
  const navigate = useNavigate();
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
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("");
  const [error, setError] = useState();
  const [countryData, setCountryData] = useState();
  const [currencyData, setCurrencyData] = useState();

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
  const handleRoleChange = (selectedOption) => {
    setRoleId(selectedOption.value);
  };
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [userWebsites, setUserWebsites] = useState([]);
  console.log(selectedAdmin, "selectedAdmin");

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
      value,
      label,
    })
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
        id: prevForms.length + 1, // Unique ID for the new form
        adminWebsite: null, // Only Admin Website should be visible
        userWebsites: [], // Ensure User Websites are empty
        selectedWebsites: {}, // No selected user websites
        accountTypes: {}, // No account types selected
        showFullForm: false, // This controls visibility of other fields
      },
    ]);
  };

  // const [forms, setForms] = useState([
  //   { id: 1, selectedWebsite: null, accountType: null },
  // ]);

  // const addAnotherForm = () => {
  //   setForms([
  //     ...forms,
  //     { id: forms.length + 1, selectedWebsite: null, accountType: null },
  //   ]);
  // };

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
  console.log(websiteDetails, "websiteDetails");

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
          websiteData.caschip_values = parseFloat(
            websiteDetails[site.id]?.caschip_values || 0
          );
          websiteData.downline_comm = parseFloat(
            websiteDetails[site.id]?.downline_comm || 0
          );
        }

        if (accotypeid === "1") {
          websiteData.rent_start_date =
            websiteDetails[site.id]?.rent_start_date || "";

          websiteData.monthly_amount = parseInt(
            websiteDetails[site.id]?.monthly_amount || 0
          );
          websiteData.chip_percentage = parseFloat(
            websiteDetails[site.id]?.chip_percentage || 0
          );
          websiteData.max_chips_monthly = parseInt(
            websiteDetails[site.id]?.max_chips_monthly || 0
          );
          websiteData.extra_chips_percentage = parseFloat(
            websiteDetails[site.id]?.extra_chips_percentage || 0
          );
          websiteData.share = parseFloat(websiteDetails[site.id]?.share || 0);
        }
        return websiteData;
      });

    if (selectedUserWebsites.length === 0) {
      alert("Please select at least one User Website.");
      return;
    }

    const finalData = {
      type: roleId,
      name: name,
      login_name: loginName,
      password: password,
      confirm_password: confirmPassword,
      parent_password: managementPassword,
      country_id: selectedCountryCode,
      currency_id: selectedCurrencyCode,
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
    console.log("Final Submitted Data:", finalData);
    alert(JSON.stringify(finalData, null, 2));
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
          <h5 className="yellow-font">Add Director & Super Admin</h5>
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
          </div>{" "}
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
            {/* currencyData */}
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
              onClick={() => togglePasswordVisibility(setShowConfirmPassword)}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              {/* {showConfirmPassword ? <FaEye /> : <FaEyeSlash />} */}
            </span>
          </div>
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
              {/* {showConfirmPassword ? <FaEye /> : <FaEyeSlash />} */}
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
                      onChange={(selectedAdmin) =>
                        handleAdminRoleChange(selectedAdmin)
                      }
                    />
                  </div>
                </div>

                {/* User Websites */}
                <div className="col-11">
                  <label className="small-font my-1">User Website</label>
                  {userWebsites.length > 0 ? (
                    userWebsites.map((userSite) => (
                      <div key={userSite.id} className="w-100 row">
                        <div className="col-2 input-css d-flex white-bg border-grey3 my-2">
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
                          <div className="col-1 my-1">
                            {/* <label className="small-font my-1">
                              Account Type
                            </label> */}
                            <Select
                              className="small-font white-bg"
                              placeholder="Account Type"
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
                          <div className="col-9">
                            <div className="row">
                              {" "}
                              <div className="col">
                                {/* <label className="small-font my-1">
                                  Start Date
                                </label> */}
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
                                {/* <label className="small-font my-1">
                                  Monthly Amount
                                </label> */}
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
                                {/* <label className="small-font my-1">
                                  Max Chips Monthly
                                </label> */}
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
                                {/* <label className="small-font my-1">
                                  My Percentage
                                </label> */}
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
                                {/* <label className="small-font my-1">
                                  Extra Chips
                                </label> */}
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
                                  {/* <span>
                                    <b>= (My Sharing 40%)</b>
                                  </span> */}
                                </div>
                              </div>
                              <div className="col-3">
                                {/* <label className="small-font my-1">
                                  Max Chips Rent
                                </label> */}
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
                        {accountTypes[userSite.id] === "2" && (
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
                              {/* <label className="small-font my-1">
                                Commission: M.O
                              </label> */}
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
                              {/* <label className="small-font my-1">
                                Commission: M.O
                              </label> */}
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
                        {accountTypes[userSite.id] === "3" && (
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
                              {/* <label className="small-font my-1">
                                Commission: M.O
                              </label> */}
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
                              {/* <label className="small-font my-1">
                                Commission: M.O
                              </label> */}
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
      </div>
    </>
  );
}

export default AddNewDirectorSuperAdmin;
