import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendar,
  FaEye,
  FaEyeSlash,
  FaPlus,
} from "react-icons/fa";
import "../../../App.css";
import { MdOutlineClose } from "react-icons/md";
import Select from "react-select";
import { customStyles } from "../../../components/ReactSelectStyles";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  createDirector,
  getAdminWebsites,
  getCountries,
  getDirectorAccessWebites,
  getUserWebsites,
} from "../../../api/apiMethods";
import { adminRoles, directorDwnlns, Roles } from "../../../utils/enum";
import SuccessPopup from "../../popups/SuccessPopup";

const AddDirectorAdminModal = ({ show, handleClose, getDirectorDwnSAList }) => {
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
  const [parentPassword, setParentPassword] = useState("");
  const [country, setCountry] = useState(null);
  const [commission, setCommission] = useState("");
  const [rentStartDate, setRentStartDate] = useState("");
  const [rentExpiryDate, setRentExpiryDate] = useState("");
  const [maxChipsRent, setMaxChipsRent] = useState("");
  const [rentPercentage, setRentPercentage] = useState("");
  const [maxChipsMonthly, setMaxChipsMonthly] = useState("");
  const [monthlyAmount, setMonthlyAmount] = useState("");
  const [extraChips, setExtraChips] = useState("");
  const [downlineSharing, setDownlineSharing] = useState("");
  const [managementPassword, setManagementPassword] = useState("");
  const [roleId, setRoleId] = useState(null);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [selectedAdminRoleIds, setSelectedAdminRoleIds] = useState(null);
  const [selectedUserWebsiteIds, setSelectedUserWebsiteIds] = useState([]);
  const [accountType, setAccountType] = useState(null);
  const [directorSites, setDirectorSites] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [directorUserRoleWebsites, setDirectorUserRoleWebsites] = useState([]);
  const [directorRoleWebsites, setDirectorRoleWebsites] = useState([]);
  const [error, setError] = useState();
  const [countryData, setCountryData] = useState();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [checkedUrls, setCheckedUrls] = useState([]);

  const togglePasswordVisibility = (setter) => setter((prev) => !prev);

  const handleUserWebsiteSelection = (websiteId) => {
    setSelectedUserWebsiteIds((prevSelected) => {
      if (prevSelected.includes(websiteId)) {
        return prevSelected.filter((id) => id !== websiteId);
      } else {
        return [...prevSelected, websiteId];
      }
    });
  };

  const accountTypes = [
    { label: "Share", value: "share" },
    { label: "Rental", value: "rental" },
  ];

  const handleAdminRoleChange = (selectedOption) => {
    console.log(selectedOption, "Selected Option");
    const selectedId = selectedOption ? selectedOption.value : null;
    console.log(selectedId, "Selected ID");
    setSelectedAdminRoleIds(selectedId);
  };

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

  const commissionMo=100-Number(commission);
  const dwnlnShare=100-Number(downlineSharing);

  const handleDirectorDwnlnSA = (event) => {
    event?.preventDefault();
    const formData = {
      type: roleId,
      name,
      login_name: loginName,
      password,
      confirm_password: confirmPassword,
      parent_password: managementPassword,
      country_id: selectedCountryId,
      accessWebsites: selectedUserWebsiteIds.map((id) => ({
        admin_panel_id: selectedAdminRoleIds,
        user_paner_id: id,
        commission_type: accountType === "share" ? 2 : 1,
        share: accountType === "share" ? commission : undefined,
        rent_start_date: accountType === "rental" ? rentStartDate : undefined,
        rent_expiry_date: accountType === "rental" ? rentExpiryDate : undefined,
        max_chips_rent: accountType === "rental" ? maxChipsRent : undefined,
        rent_percentage: accountType === "rental" ? rentPercentage : undefined,
      })),
    };

    // const formData = {
    //   type: roleId,
    //   name,
    //   login_name: loginName,
    //   password,
    //   confirm_password: confirmPassword,
    //   parent_password: managementPassword,
    //   country_id: selectedCountryId,
    //   accessWebsites: [
    //     {
    //       admin_panel_id: selectedAdminRoleIds,
    //       user_paner_id: 1,
    //       commission_type: accountType === "share" ? 2 : 1,
    //       share: accountType === "share" ? commission : undefined,
    //       rent_start_date: accountType === "rental" ? rentStartDate : undefined,
    //       rent_expiry_date:
    //         accountType === "rental" ? rentExpiryDate : undefined,
    //       max_chips_rent: accountType === "rental" ? maxChipsRent : undefined,
    //       rent_percentage:
    //         accountType === "rental" ? rentPercentage : undefined,
    //     },
    //   ],
    // };
    console.log(formData, "formData");
    createDirector(formData)
      .then((response) => {
        if (response?.status === true) {
          console.log(response, "response from API");
          handleClose();
          setRoleId("");
          setName("");
          setLoginName("");
          setPassword("");
          setConfirmPassword("");
          setManagementPassword("");
          setSelectedCountryId(null);
          setAccountType("");
          setCommission("");
          setRentStartDate("");
          setRentExpiryDate("");
          setMaxChipsRent("");
          setRentPercentage("");
          getDirectorDwnSAList();
          successPopupOpen(true);

          setTimeout(() => {
            setSuccessPopupOpen(false);
          }, [1000]);
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setError(error?.message || "Submission failed");
      });
  };

  useEffect(() => {
    handleDirectorDwnlnSA();
  }, []);

  const getAllDirectorWebsiteList = () => {
    getDirectorAccessWebites()
      .then((response) => {
        if (response?.status) {
          console.log(response, "dir websites");
          setDirectorSites(response.data);
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setError(error?.message || "API request failed");
      });
  };
  useEffect(() => {
    getAllDirectorWebsiteList();
  }, []);

  useEffect(() => {
    if (directorSites.length > 0) {
      const directors = directorSites?.map((item) => ({
        value: item?.admin_panel_id,
        label: item?.admin_website_url,
      }));
      const users = directorSites
        ?.flatMap((user) => user?.users || [])
        ?.map((item) => ({
          value: item?.user_panel,
          label: item?.user_web_url,
        }));
      setDirectorRoleWebsites(directors);
      setDirectorUserRoleWebsites(users);
    }
  }, [directorSites]);

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
  useEffect(() => {
    GetAllCountries();
  }, []);
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
  useEffect(() => {
    GetAllAdminWebsites();
  }, []);
  const [userWebsite, setAllUserWebsite] = useState();
  console.log(userWebsite, "userWebsite");

  const GetAllUserWebsites = () => {
    getUserWebsites()
      .then((response) => {
        if (response?.status === true) {
          setAllUserWebsite(response.data);
          console.log(response, "userWebsites");
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setError(error?.message || "Not able to get Countries");
      });
  };
  useEffect(() => {
    GetAllUserWebsites();
  }, []);

  const adminRoleWebsites = adminWebsite?.map((site) => ({
    value: site.id,
    label: site.web_url,
  }));
  const userRoleWebsites = userWebsite?.map((site) => ({
    value: site.id,
    label: site.web_url,
  }));

  const handleCheckboxChange = (event, id, url) => {
    // Toggle URL selection
    if (event.target.checked) {
      setCheckedUrls((prevUrls) => [...prevUrls, url]);
      setSelectedUserId(id); // Update the selected User ID when checked
    } else {
      setCheckedUrls((prevUrls) =>
        prevUrls.filter((url) => url !== event.target.value)
      );
      setSelectedUserId(null); // Reset the selected User ID when unchecked
    }
  };
  const handleDirector = (event) => {
    event?.preventDefault();

    const formData = {
      type: roleId,
      name,
      login_name: loginName,
      password,
      confirm_password: confirmPassword,
      parent_password: managementPassword,
      country_id: selectedCountryId,
      accessWebsites: [
        {
          admin_panel_id: 1,
          user_paner_id: 1,
          // admin_panel_id: selectedAdminRoleIds,
          // user_paner_id: selectedUserId,
          commission_type: accountType === "share" ? 2 : 1,
          share: accountType === "share" ? commission : undefined,
          rent_start_date: accountType === "rental" ? rentStartDate : undefined,
          rent_expiry_date:
            accountType === "rental" ? rentExpiryDate : undefined,
          max_chips_rent: accountType === "rental" ? maxChipsRent : undefined,
          rent_percentage:
            accountType === "rental" ? rentPercentage : undefined,
        },
      ],
    };
    console.log(formData, "formData");
    createDirector(formData)
      .then((response) => {
        if (response?.status === true) {
          console.log(response, "response from API");
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setError(error?.message || "Submission failed");
      });
  };

  useEffect(() => {
    handleDirector();
  }, []);

  const adminRoless =
    role_name === "director"
      ? Object.entries(directorDwnlns).map(([value, label]) => ({
          value: Number(value),
          label,
        }))
      : Object.entries(adminRoles).map(([value, label]) => ({
          value: Number(value),
          label,
        }));

  const handleRoleChange = (selectedOption) => {
    setRoleId(selectedOption.value);
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose} centered size="md">
        <Modal.Body className="p-1 director-admin-popupbody px-2 py-2">
          <div className="d-flex justify-content-between align-items-center mb-2 px-3">
            {role === "management" ? (
              <h5 className="mb-0 medium-font black-text">
                Add Director & Super Admin
              </h5>
            ) : (
              <h5 className="mb-0 medium-font black-text">Add Super Admin</h5>
            )}
            <Button
              variant="link"
              onClick={handleClose}
              className="text-dark fs-4"
            >
              <MdOutlineClose />
            </Button>
          </div>
          <div className="d-flex mb-3">
            <button
              className={`rounded w-25 mx-1 ${
                activeForm === 1
                  ? "saffron-btn2"
                  : "black-text border-grey3 white-bg"
              }`}
              onClick={() => setActiveForm(1)}
            >
              Form 1
            </button>
            <button
              className={`rounded w-25 mx-1 ${
                activeForm === 2
                  ? "saffron-btn2"
                  : "black-text border-grey3 white-bg"
              }`}
              onClick={() => setActiveForm(2)}
            >
              Form 2
            </button>
          </div>
          <form
            className="add-management-popup-form px-3"
            style={{ display: activeForm === 1 ? "block" : "none" }}
          >
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="small-font">Name</label>
                <input
                  type="text"
                  className="small-font rounded all-none input-css w-100"
                  placeholder="Enter"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="small-font">Login Name</label>
                <input
                  type="text"
                  className="small-font rounded all-none input-css w-100"
                  placeholder="Enter"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6 position-relative">
                <label className="small-font">Role</label>
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
              </div>
              <div className="col-md-6">
                <label className="small-font">Country</label>
                <select
                  className="small-font rounded all-none input-css w-100"
                  value={selectedCountryCode}
                  onChange={handleChange}
                >
                  <option value="">Select a country</option>
                  {countryData?.map((country, index) => (
                    <option key={index} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6 position-relative">
                <label className="small-font">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="small-font rounded all-none input-css w-100"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="position-absolute"
                  style={{ right: "1.5rem", top: "1.8rem", cursor: "pointer" }}
                  onClick={() => togglePasswordVisibility(setShowPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <div className="col-md-6 position-relative">
                <label className="small-font">Confirm Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="small-font rounded all-none input-css w-100"
                  placeholder="Enter Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span
                  className="position-absolute"
                  style={{ right: "1.5rem", top: "1.8rem", cursor: "pointer" }}
                  onClick={() =>
                    togglePasswordVisibility(setShowConfirmPassword)
                  }
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6 position-relative">
                <label className="small-font">Management Password</label>
                <input
                  type={showManagementPassword ? "text" : "password"}
                  className="small-font rounded all-none input-css w-100"
                  placeholder="Enter Password"
                  value={managementPassword}
                  onChange={(e) => setManagementPassword(e.target.value)}
                  required
                />
                <span
                  className="position-absolute"
                  style={{ right: "1.5rem", top: "1.8rem", cursor: "pointer" }}
                  onClick={() =>
                    togglePasswordVisibility(setShowManagementPassword)
                  }
                >
                  {showManagementPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <div className="col-md-6 d-flex align-items-end">
                <button
                  type="button"
                  className="saffron-btn2 add-mng-pop-btn w-100 d-flex align-items-center justify-content-center"
                  onClick={() => setActiveForm(2)}
                >
                  Next
                  <FaArrowRightLong className="ms-2 large-font" />
                </button>
              </div>
            </div>
          </form>
          {/* Form 2 */}
          <form
            className="custom-form small-font p-3"
            style={{ display: activeForm === 2 ? "block" : "none" }}
          >
            {/* Row 3: Website, Share, Rent */}
            <div className="row mb-3">
              <div className="col-md-12 position-relative">
                <label className="small-font">Admin Website</label>
                <div className="custom-select-wrapper">
                  <Select
                    className="small-font"
                    options={
                      role_name === "director"
                        ? directorRoleWebsites
                        : adminRoleWebsites
                    }
                    placeholder="Select"
                    styles={customStyles}
                    maxMenuHeight={120}
                    menuPlacement="auto"
                    onChange={handleAdminRoleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-12 position-relative">
                <label className="small-font">User Website</label>
                {/* <div className="d-flex input-css">
                  <input type="checkbox" className="me-2" />
                  <input
                    type="text"
                    value={
                      role_name === "director"
                        ? directorUserRoleWebsites
                            .map((site) => site.label)
                            .join(", ")
                        : userRoleWebsites
                    }
                    className="small-font rounded all-none w-100"
                    placeholder="Website Names"
                    readOnly
                  />
                </div> */}
                <div className="d-flex input-css">
                  {role_name === "director"
                    ? directorUserRoleWebsites.map((site) => (
                        <div
                          key={site.value}
                          className="d-flex align-items-center mb-2"
                        >
                          <input
                            type="checkbox"
                            className="me-2"
                            checked={selectedUserWebsiteIds.includes(
                              site.value
                            )}
                            onChange={() =>
                              handleUserWebsiteSelection(site.value)
                            }
                          />
                          <label className="small-font">{site.label}</label>
                        </div>
                      ))
                    : userRoleWebsites.map((site) => (
                        <div
                          key={site.value}
                          className="d-flex align-items-center mb-2"
                        >
                          <input
                            type="checkbox"
                            className="me-2"
                            checked={selectedUserWebsiteIds.includes(
                              site.value
                            )}
                            onChange={() =>
                              handleUserWebsiteSelection(site.value)
                            }
                          />
                          <label className="small-font">{site.label}</label>
                        </div>
                      ))}
                </div>
              </div>
            </div>
            {/* <div>
            <h3>Selected Website ID: {selectedUserId}</h3>
            <div className="row mb-3">
              {userWebsite?.map((website) => (
                <div key={website.id} className="row mb-3">
                  <div className="col-md-12 position-relative">
                    <label className="small-font">User Website</label>
                    <div className="d-flex input-css">
                      <input
                        type="checkbox"
                        className="me-2"
                        value={website.web_url} // Use URL as the value for the checkbox
                        onChange={(e) =>
                          handleCheckboxChange(e, website.id, website.web_url)
                        }
                        checked={checkedUrls.includes(website.web_url)} // Check if the URL is selected
                      />
                      <input
                        type="text"
                        className="small-font rounded all-none w-100"
                        placeholder="Website URL"
                        value={website.web_url}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
            <div className="row mb-3">
              <div className="col-md-12 position-relative">
                <label className="small-font">Account Type</label>
                <div className="white-bg border-grey3">
                  <Select
                    className="small-font"
                    options={accountTypes}
                    placeholder="Select"
                    styles={customStyles}
                    maxMenuHeight={120}
                    onChange={(selectedOption) =>
                      setAccountType(selectedOption.value)
                    }
                  />
                </div>
              </div>
            </div>
            {accountType === "share" && (
              <>
                {" "}
                <div className="row mb-3">
                  <div className="col-md-12 position-relative">
                    <label className="small-font">Commission: M.O</label>
                    <div className="white-bg border-grey3 d-flex justify-content-between align-items-center small-font">
                      <input
                        className="small-font bg-none p-2"
                        placeholder="Enter"
                        value={commission}
                        onChange={(e) => setCommission(e.target.value)}
                      />
                      <span>
                        <b className="mx-1">{commissionMo}%</b>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-12 position-relative">
                    <label className="small-font">Downline Sharing</label>
                    <div className="white-bg border-grey3 d-flex justify-content-between align-items-center small-font">
                      <input
                        className="small-font bg-none p-2"
                        placeholder="Enter"
                        value={downlineSharing}
                        onChange={(e) => setDownlineSharing(e.target.value)}
                      />
                      <span>
                        <b className="mx-1">= My Sharing  {dwnlnShare}%</b>
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
            {accountType === "rental" && (
              <>
                {" "}
                <div className="row mb-3">
                  <div className="col-md-12 position-relative">
                    <label className="small-font">Extra Chips</label>
                    <div className="white-bg border-grey3 d-flex justify-content-between align-items-center small-font">
                      <input
                        className="small-font bg-none p-2"
                        placeholder="Enter"
                        value={extraChips}
                        onChange={(e) => setExtraChips(e.target.value)}
                      />
                      <span>
                        <b>= (My Sharing 40%)</b>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="small-font">Start Date</label>
                    <input
                      type="date"
                      className="small-font rounded all-none input-css w-100"
                      placeholder="Enter"
                      value={rentStartDate}
                      onChange={(e) => setRentStartDate(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small-font">Expiry Date</label>
                    <input
                      type="date"
                      className="small-font rounded all-none input-css w-100"
                      placeholder="Enter"
                      value={rentExpiryDate}
                      onChange={(e) => setRentExpiryDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="small-font">Max Chips Monthly</label>
                    <input
                      type="text"
                      className="small-font rounded all-none input-css w-100"
                      placeholder="Enter"
                      value={maxChipsMonthly}
                      onChange={(e) => setMaxChipsMonthly(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small-font">Monthly Amount</label>
                    <input
                      type="text"
                      className="small-font rounded all-none input-css w-100"
                      placeholder="Enter"
                      value={monthlyAmount}
                      onChange={(e) => setMonthlyAmount(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="small-font">Max Chips Monthly</label>
                    <input
                      type="text"
                      className="small-font rounded all-none input-css w-100"
                      placeholder="Enter"
                      value={maxChipsRent}
                      onChange={(e) => setMaxChipsRent(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small-font">My Percentage</label>
                    <input
                      type="text"
                      className="small-font rounded all-none input-css w-100"
                      placeholder="Enter"
                      value={rentPercentage}
                      onChange={(e) => setRentPercentage(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="mb-3">
              <div className="custom-checkbox">
                <input type="checkbox" id="website2" />
                <label htmlFor="website2">www.casinocafe.com</label>
              </div>
              <div className="custom-checkbox">
                <input type="checkbox" id="website3" />
                <label htmlFor="website3">www.starsports247.com</label>
              </div>
            </div>
            <div className="text-center mb-3 w-100">
              <button type="button" className="btn btn-outline-primary">
                <FaPlus className="me-2" /> Add Another
              </button>
            </div>
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => setActiveForm(1)}
              >
                <FaArrowLeft /> Previous
              </button>
              <button
                type="submit"
                className="btn btn-warning"
                onClick={(event) =>
                  role_name === "director"
                    ? handleDirectorDwnlnSA(event)
                    : handleDirector(event)
                }
              >
                Submit <FaArrowRight />
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <SuccessPopup
        successPopupOpen={successPopupOpen}
        setSuccessPopupOpen={setSuccessPopupOpen}
        discription={"user created successfully"}
      />
    </div>
  );
};

export default AddDirectorAdminModal;
