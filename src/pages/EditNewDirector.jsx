import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaEye, FaEyeSlash, FaPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAdminWebsites,
  getCountries,
  getCurrencies,
  getDirectorDetailsById,
  updateDirectorByID,
} from "../api/apiMethods";
import { adminRoles, commissionTypes } from "../utils/enum";
import SuccessPopup from "./popups/SuccessPopup";

function EditNewDirector() {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode || "add";
  const userId = location.state?.userId || null;

  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
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
  const [countryData, setCountryData] = useState([]);
  const [currencyData, setCurrencyData] = useState([]);
  const [adminWebsite, setAllAdminWebsite] = useState([]);
  const [individualDirectorData, setIndividualDirectorData] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [userWebsites, setUserWebsites] = useState([]);
  const [addWebsites, setAddWebsites] = useState([]); // State for new websites to add

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

  useEffect(() => {
    if (mode === "edit" && userId) {
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
                        extra_chips_percentage: site.extra_chips_percentage,
                      };
                    case 2:
                      return {
                        ...basePayload,
                        downline_comm: site.downline_comm,
                        share: site.share,
                        caschip_values: site.caschip_values,
                      };
                    case 3:
                      return {
                        ...basePayload,

                        someField: site.someField,
                        anotherField: site.anotherField,
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
    }
  }, [mode, userId]);

  const handleSubmit = () => {
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
      addWebsites: addWebsites.map((website) => {
        const commissionType = parseInt(website.commission_type);
        return {
          admin_panel_id: parseInt(website.admin_panel_id),
          user_paner_id: parseInt(website.user_paner_id),
          commission_type: commissionType,
          share: parseInt(website.share),
          casino_chip_values: parseInt(website.casino_chip_values),
          downline_comm: parseInt(website.downline_comm),
        };
      }),
    };

    updateDirectorByID(userId, payload)
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

  const adminWebsites = transformData(individualDirectorData);

  // Function to add a new empty website object to the addWebsites array
  const handleAddWebsite = () => {
    setAddWebsites([
      ...addWebsites,
      {
        admin_panel_id: "",
        user_paner_id: "",
        commission_type: "",
        rent_start_date: "",
        max_chips_monthly: "",
        extra_chips_percentage: "",
        monthly_amount: "",
        chip_percentage: "",
        share: "",
        casino_chip_values: "",
        downline_comm: "",
      },
    ]);
  };

  // Function to handle changes in the addWebsites array
  const handleAddWebsiteChange = (index, event) => {
    const { name, value } = event.target;
    const updatedAddWebsites = [...addWebsites];
    updatedAddWebsites[index][name] = value;
    setAddWebsites(updatedAddWebsites);
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
          <h5 className="yellow-font">
            {mode === "edit"
              ? "Edit Director & Super Admin"
              : "Add Director & Super Admin"}
          </h5>
        </div>

        <div className="d-flex w-100 my-2 align-items-center">
          {/* Input fields for director details */}
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
          </div>
          <div className="col-1 p-1">
            <label className="small-font my-1">Role</label>
            <select
              className="small-font rounded all-none input-css white-bg border-grey3 w-100"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">Select</option>
              {adminRolesArray.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-1 p-1">
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
          </div>
          <div className="col-1 p-1">
            <label className="small-font my-1">Currency</label>
            <select
              className="small-font rounded all-none input-css white-bg border-grey3 w-100"
              value={selectedCurrencyCode}
              onChange={(e) => setSelectedCurrencyCode(e.target.value)}
            >
              <option value="">Select</option>
              {currencyData.map((currency) => (
                <option key={currency.country_id} value={currency.country_id}>
                  {currency.currency_name}
                </option>
              ))}
            </select>
          </div>
          {mode === "edit" ? null : (
            <>
              <div className="p-1 col position-relative">
                <label className="small-font my-1">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="border-grey3 small-font rounded all-none input-css white-bg w-100"
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
                  className="border-grey3 small-font rounded all-none input-css white-bg w-100"
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
                </span>
              </div>
            </>
          )}
          <div className="p-1 col position-relative">
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

                {data.userWebsites?.map((userWebsite, userIndex) => (
                  <div key={userIndex} className="w-100 mt-3 row">
                    <div className="col-2 d-flex flex-column">
                      <label className="small-font my-1">User Website</label>
                      <select
                        className="small-font w-100 white-bg rounded border-grey3 p-2 no-cursor"
                        disabled
                      >
                        <option value={userWebsite.web_name}>
                          {userWebsite.web_name}
                        </option>
                      </select>
                    </div>
                    <div className="col-2">
                      <label className="small-font my-1">Commission Type</label>
                      <div className="d-flex align-items-center">
                        <input
                          className="small-font white-bg rounded border-grey3 p-2 w-100 no-cursor"
                          placeholder="Commission Type"
                          value={
                            commissionTypes[userWebsite.commission_type] ||
                            "N/A"
                          }
                          readOnly
                          disabled
                        />
                      </div>
                    </div>
                    {userWebsite.commission_type === 1 && (
                      <div className="col-2">
                        <label className="small-font my-1">Extra Chips %</label>
                        <input
                          className="small-font white-bg rounded border-grey3 p-2 w-100"
                          value={userWebsite.extra_chips_percentage}
                          readOnly
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
                            value={userWebsite.share}
                            readOnly
                          />
                        </div>
                        <div className="col-2">
                          <label className="small-font my-1">
                            Downline Comm
                          </label>
                          <input
                            className="small-font white-bg rounded border-grey3 p-2 w-100"
                            value={userWebsite.downline_comm}
                            readOnly
                          />
                        </div>
                        <div className="col-2">
                          <label className="small-font my-1">
                            Caschip Values
                          </label>
                          <input
                            className="small-font white-bg rounded border-grey3 p-2 w-100"
                            value={userWebsite.caschip_values}
                            readOnly
                          />
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))}

            {/* Add Websites Section */}
            {addWebsites.map((website, index) => (
              <div key={index} className="box-shadow p-2 my-2 rounded">
                <h6 className="yellow-font">New Website</h6>
                <div className="w-100 mt-3 row">
                  <div className="col-2 d-flex flex-column">
                    <label className="small-font my-1">Admin Panel ID</label>
                    <input
                      type="number"
                      className="small-font w-100 white-bg rounded border-grey3 p-2"
                      name="admin_panel_id"
                      value={website.admin_panel_id}
                      onChange={(event) => handleAddWebsiteChange(index, event)}
                    />
                  </div>
                  <div className="col-2 d-flex flex-column">
                    <label className="small-font my-1">User Panel ID</label>
                    <input
                      type="number"
                      className="small-font w-100 white-bg rounded border-grey3 p-2"
                      name="user_paner_id"
                      value={website.user_paner_id}
                      onChange={(event) => handleAddWebsiteChange(index, event)}
                    />
                  </div>
                  <div className="col-2">
                    <label className="small-font my-1">Commission Type</label>
                    <select
                      className="small-font w-100 white-bg rounded border-grey3 p-2"
                      name="commission_type"
                      value={website.commission_type}
                      onChange={(event) => handleAddWebsiteChange(index, event)}
                    >
                      <option value="">Select</option>
                      {Object.keys(commissionTypes).map((key) => (
                        <option key={key} value={key}>
                          {commissionTypes[key]}
                        </option>
                      ))}
                    </select>
                  </div>
                  {website.commission_type === "1" && (
                    <>
                      <div className="col-2 d-flex flex-column">
                        <label className="small-font my-1">
                          Rent Start Date
                        </label>
                        <input
                          type="date"
                          className="small-font w-100 white-bg rounded border-grey3 p-2"
                          name="rent_start_date"
                          value={website.rent_start_date}
                          onChange={(event) =>
                            handleAddWebsiteChange(index, event)
                          }
                        />
                      </div>
                      <div className="col-2 d-flex flex-column">
                        <label className="small-font my-1">
                          Max Chips Monthly
                        </label>
                        <input
                          type="number"
                          className="small-font w-100 white-bg rounded border-grey3 p-2"
                          name="max_chips_monthly"
                          value={website.max_chips_monthly}
                          onChange={(event) =>
                            handleAddWebsiteChange(index, event)
                          }
                        />
                      </div>
                      <div className="col-2 d-flex flex-column">
                        <label className="small-font my-1">Extra Chips %</label>
                        <input
                          type="number"
                          className="small-font w-100 white-bg rounded border-grey3 p-2"
                          name="extra_chips_percentage"
                          value={website.extra_chips_percentage}
                          onChange={(event) =>
                            handleAddWebsiteChange(index, event)
                          }
                        />
                      </div>
                      <div className="col-2 d-flex flex-column">
                        <label className="small-font my-1">
                          Monthly Amount
                        </label>
                        <input
                          type="number"
                          className="small-font w-100 white-bg rounded border-grey3 p-2"
                          name="monthly_amount"
                          value={website.monthly_amount}
                          onChange={(event) =>
                            handleAddWebsiteChange(index, event)
                          }
                        />
                      </div>
                      <div className="col-2 d-flex flex-column">
                        <label className="small-font my-1">
                          Chip Percentage
                        </label>
                        <input
                          type="number"
                          className="small-font w-100 white-bg rounded border-grey3 p-2"
                          name="chip_percentage"
                          value={website.chip_percentage}
                          onChange={(event) =>
                            handleAddWebsiteChange(index, event)
                          }
                        />
                      </div>
                    </>
                  )}

                  <div className="col-2 d-flex flex-column">
                    <label className="small-font my-1">Share</label>
                    <input
                      type="number"
                      className="small-font w-100 white-bg rounded border-grey3 p-2"
                      name="share"
                      value={website.share}
                      onChange={(event) => handleAddWebsiteChange(index, event)}
                    />
                  </div>
                  <div className="col-2 d-flex flex-column">
                    <label className="small-font my-1">Caschip Values</label>
                    <input
                      type="number"
                      className="small-font w-100 white-bg rounded border-grey3 p-2"
                      name="casino_chip_values"
                      value={website.casino_chip_values}
                      onChange={(event) => handleAddWebsiteChange(index, event)}
                    />
                  </div>
                  <div className="col-2 d-flex flex-column">
                    <label className="small-font my-1">Downline Comm</label>
                    <input
                      type="number"
                      className="small-font w-100 white-bg rounded border-grey3 p-2"
                      name="downline_comm"
                      value={website.downline_comm}
                      onChange={(event) => handleAddWebsiteChange(index, event)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-end mb-3 w-100">
            <button
              type="button"
              className="cst-btn"
              onClick={handleAddWebsite}
            >
              <FaPlus className="me-2" /> Add Another
            </button>
          </div>

          <div className="d-flex justify-content-end">
            <button
              className="saffron-btn rounded"
              type="button"
              onClick={handleSubmit}
            >
              Update Details
            </button>
          </div>
        </form>
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
