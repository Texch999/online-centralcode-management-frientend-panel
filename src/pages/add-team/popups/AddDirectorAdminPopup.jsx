import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendar,
  FaEye,
  FaEyeSlash,
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
  getUserWebsites,
} from "../../../api/apiMethods";
import { adminRoles, directorDwnlns, Roles } from "../../../utils/enum";

const AddDirectorAdminModal = ({ show, handleClose }) => {
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
  const [roleId, setRoleId] = useState(null); // Store selected role ID

  const roleOptions = [
    { value: "Accounts", label: "Accounts" },
    { value: "Designer", label: "Designer" },
    { value: "Company Team", label: "Company Team" },
  ];

  const togglePasswordVisibility = (setter) => setter((prev) => !prev);

  const adminWebsites = [{ label: "Brahma", value: "brahma" }];
  const accountTypes = [
    { label: "Share", value: "share" },
    { label: "Rental", value: "rental" },
  ];
  const [accountType, setAccountType] = useState(null);
  const [error, setError] = useState();
  const [countryData, setCountryData] = useState();
  const [selectedCountryId, setSelectedCountryId] = useState("");

  const handleChange = (event) => {
    setSelectedCountryId(event.target.value);
  };

  console.log(roleId, "roleId");
  console.log(countryData, "countryData");

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

  const GetAllAdminWebsites = () => {
    getAdminWebsites()
      .then((response) => {
        if (response?.status === true) {
          console.log(response, "AdminWebsites");
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

  const GetAllUserWebsites = () => {
    getUserWebsites()
      .then((response) => {
        if (response?.status === true) {
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
    GetAllUserWebsites();
  }, []);

  const adminRoless =role_name === "director" ?
  (
    Object.entries(directorDwnlns).map(([value, label]) => ({
      value: Number(value), // Role ID (number)
      label, // Role name (string)
    }))
  ):(
   Object.entries(adminRoles).map(([value, label]) => ({
    value: Number(value), // Role ID (number)
    label, // Role name (string)
  }))
)

  const handleRoleChange = (selectedOption) => {
    setRoleId(selectedOption.value); // Update role ID when the role is selected
  };
  return (
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
            className={`btn ${
              activeForm === 1 ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setActiveForm(1)}
          >
            Form 1
          </button>
          <button
            className={`btn ms-2 ${
              activeForm === 2 ? "btn-primary" : "btn-secondary"
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

          {/* Row 3: Website, Share, Rent */}
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
                type="text"
                className="small-font rounded all-none input-css w-100"
                placeholder="Enter"
                value={selectedCountryId}
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
                onClick={() => togglePasswordVisibility(setShowConfirmPassword)}
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
                  options={roleOptions}
                  placeholder="Select"
                  styles={customStyles}
                  maxMenuHeight={120}
                  menuPlacement="auto"
                />
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-12 position-relative">
              <label className="small-font">User Website</label>
              <input
                type="text"
                className="small-font rounded all-none input-css w-100"
                placeholder="Enter Password"
              />
            </div>
          </div>
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
                  <label className="small-font">Commisiion</label>
                  <div className="white-bg border-grey3 d-flex justify-content-between align-items-center small-font">
                    <input
                      className="small-font bg-none p-2"
                      placeholder="Enter"
                      value={commission}
                      onChange={(e) => setCommission(e.target.value)}
                    />
                    <span>
                      <b>1%</b>
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
                      <b>= (My Sharing 40%)</b>
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
          <div className="text-center mb-3">
            <button type="button" className="btn btn-outline-primary">
              + Add Another
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
              onClick={(event) => handleDirector(event)}
            >
              Submit <FaArrowRight />
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddDirectorAdminModal;
