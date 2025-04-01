import React, { useRef, useState } from "react";
import { Images } from "../images";
import { MdEdit, MdLockReset } from "react-icons/md";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import {
  dirEditProfile,
  dirEmpEditProfile,
  dirEmployeeResetPswd,
  managementEditProfile,
  resetPasswordMan,
  resetPswdDirector,
} from "../api/apiMethods";
import { IoMdAdd, IoMdEye, IoMdEyeOff } from "react-icons/io";
import SuccessPopup from "../pages/popups/SuccessPopup";
import { useDispatch, useSelector } from "react-redux";
import { imgUrl } from "../api/baseUrl";
import { setProfilePhoto } from "../redux/action";

const ProfileUpdate = ({ setUpdateProfille }) => {
  const [openResetDropdown, setResetDropdown] = useState(false);
  const [error, setError] = useState("");
  const [oldPswd, setOldPaswd] = useState("");
  const [newPswd, setNewPaswd] = useState("");
  const [confirmPswd, setConfirmPaswd] = useState("");
  const [oldPswdVisible, setOldPswdVisible] = useState(false);
  const [newPswdVisible, setNewPswdVisible] = useState(false);
  const [confirmPswdVisible, setConfirmPswdVisible] = useState(false);
  const [oldPswdError, setOldPswdError] = useState("");
  const [newPswdError, setNewPswdError] = useState("");
  const [confirmPswdError, setConfirmPswdError] = useState("");
  const role_code = localStorage.getItem("role_name");
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const fileInputRef = useRef(null);
  const parent_role_name = localStorage.getItem("parent_role");
  const isDirectorEmployee = parent_role_name === "director";
  const storedPhoto = localStorage.getItem("photo");
  const [photoPath, setPhotoPath] = useState(storedPhoto);

  const handleOldPswdVisible = () => {
    setOldPswdVisible((prev) => !prev);
  };
  const handleNewPswdVisible = () => {
    setNewPswdVisible((prev) => !prev);
  };
  const handleConfirmPswdVisible = () => {
    setConfirmPswdVisible((prev) => !prev);
  };
  const handleResetSection = (prev) => {
    setResetDropdown((prev) => !prev);
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPaswd(value);

    if (value.length < 6 || value.length > 15) {
      setNewPswdError("Password must be between 6-15 characters.");
    } else if (!passwordPattern.test(value)) {
      setNewPswdError(
        "Password should contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
      );
    } else {
      setNewPswdError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPaswd(value);

    if (value !== newPswd) {
      setConfirmPswdError("Passwords do not match.");
    } else if (value.length < 6 || value.length > 15) {
      setConfirmPswdError("Password must be between 6-15 characters.");
    } else {
      setConfirmPswdError("");
    }
  };

  const allowedRoles = [
    "owner",
    "management",
    "accounts",
    "promotion",
    "risk management",
  ];

  const dirEmpRoles = ["accounts", "promotion", "risk management"];
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{6,15}$/;

  const [profileImg, setProfileImg] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  console.log(selectedFile, "sleetdFile");
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setProfileImg(URL.createObjectURL(file));
    }
  };

  const handleOldPasswordChange = (e) => {
    setOldPaswd(e.target.value);
    if (e.target.value) setError("");
  };

  // const handleNewPasswordChange = (e) => {
  //   setNewPaswd(e.target.value);
  //   if (passwordPattern.test(e.target.value)) {
  //     setNewPswdError("");
  //     setConfirmPswdError("");
  //   }
  // };

  // const handleConfirmPasswordChange = (e) => {
  //   setConfirmPaswd(e.target.value);
  //   if (e.target.value === newPswd) {
  //     setConfirmPswdError("");
  //     setNewPswdError("");
  //   }
  // };

  const profileSrc =
    role_code === "director"
      ? `${imgUrl}/directorProfilePhotos/${photoPath}`
      : isDirectorEmployee
      ? `${imgUrl}/directorProfilePhotos/${photoPath}`
      : allowedRoles.includes(role_code)
      ? `${imgUrl}/employeeProfiles/${photoPath}`
      : Images?.ProfileImage;

  const validatePasswords = () => {
    let isValid = true;

    if (!passwordPattern.test(newPswd)) {
      setNewPswdError(
        "Password should be 6-15 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
      );
      isValid = false;
    } else {
      setNewPswdError("");
      setConfirmPswdError("");
    }

    if (newPswd !== confirmPswd) {
      setConfirmPswdError("Passwords do not match.");
      isValid = false;
    } else {
      setNewPswdError("");
      setConfirmPswdError("");
    }

    return isValid;
  };

  const resetPassword = async () => {
    if (!validatePasswords()) {
      setError("Please enter valid values")
      return;
    }
    const payload = {
      old_password: oldPswd,
      new_password: newPswd,
      confirm_new_password: confirmPswd,
    };

    try {
      let response;

      if (role_code === "director") {
        response = await resetPswdDirector(payload);
      } else if (isDirectorEmployee) {
        response = await dirEmployeeResetPswd(payload);
      } else if (allowedRoles.includes(role_code)) {
        response = await resetPasswordMan(payload);
      } else {
        setError("Unauthorized role.");
        return;
      }

      if (response?.status === true) {
        setMsg(response?.message);
        setOldPaswd("");
        setNewPaswd("");
        setConfirmPaswd("");
        setSuccessPopupOpen(true);
        setTimeout(() => setSuccessPopupOpen(false), 3000);
      } else {
        setError(response?.message);
      }
    } catch (error) {
      setError(
        error?.message || "An error occurred while resetting the password."
      );
    }
  };

  const editProfile = async () => {
    if (!selectedFile) {
      setError("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", selectedFile);

    try {
      let response;

      if (role_code === "director") {
        response = await dirEditProfile(formData);
      } else if (isDirectorEmployee) {
        response = await dirEmpEditProfile(formData);
      } else if (allowedRoles.includes(role_code)) {
        response = await managementEditProfile(formData);
      } else {
        setError("Unauthorized role.");
        return;
      }

      if (response?.status === true) {
        // const file = response?.data?.[0]?.fileName;
        const file = response?.data;
        console.log(file, "fileee");
        setPhotoPath(file);
        localStorage.setItem("photo", file);
        setMsg(response?.message);
        setSuccessPopupOpen(true);
        setTimeout(() => setSuccessPopupOpen(false), 2000);
      } else {
        setError(response?.message || "Something went wrong.");
      }
    } catch (error) {
      setError(
        error?.errors?.message
      );
    }
  };

  // const editProfile = () => {
  //   if (!selectedFile) {
  //     setError("Please select an image.");
  //     return;
  //   }
  //   const formData = new FormData();
  //   formData.append("photo", selectedFile);

  //   if (role_code === "director") {
  //     dirEditProfile(formData).then(handleEditResponse).catch(handleEditError);
  //   } else if (isDirectorEmployee) {
  //     dirEmpEditProfile(formData)
  //       .then(handleEditResponse)
  //       .catch(handleEditError);
  //   } else if (allowedRoles.includes(role_code)) {
  //     managementEditProfile(formData)
  //       .then(handleEditResponse)
  //       .catch(handleEditError);
  //   } else {
  //     setError("Unauthorized role.");
  //   }
  // };
  // const handleEditResponse = (response) => {
  //   if (response?.status === true) {
  //     setMsg(response?.message);
  //     setOldPaswd("");
  //     setNewPaswd("");
  //     setConfirmPaswd("");
  //     setUpdateProfille(false);
  //     setSuccessPopupOpen(true);
  //     setTimeout(() => setSuccessPopupOpen(false), 2000);
  //   } else {
  //     setError("Something went wrong");
  //   }
  // };
  // const handleEditError = (error) => {
  //   setError(error?.message);
  // };

  return (
    <div>
      <div className="white-bg box-shadow2 br-10 pb-3">
        <div
          className="d-flex flex-end pointer"
          onClick={() => setUpdateProfille(false)}
        >
          <IoClose className="black-font my-1 mx-2" size={25} />
        </div>
        <div className="d-flex flex-column flex-center ">
          <div className="position-relative">
            <img
              className="mx-3 my-1 profile br-10 "
              src={profileSrc}
              alt="Profile"
              loading="lazy"
              accept="image/*"
            />

            <div
              className="saffron-bg pos-abs-profile d-flex align-items-center justify-content-center"
              onClick={() => fileInputRef.current.click()}
            >
              <IoMdAdd size={28} className="white-font fw-bold" />
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="d-none"
            onChange={handleImage}
          />

          {profileImg ? (
            <div
              className="saffron-btn rounded d-flex mt-4 small-font align-items-center pointer"
              onClick={editProfile}
            >
              Save Profile
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <div
          className="black-bg mt-3 d-flex small-font flex-between white-font align-items-center px-1 py-2"
          onClick={handleResetSection}
        >
          <div className="d-flex gap-2">
            <MdLockReset className="white-font" size={18} />
            Reset Password 
          </div>

          <span>
            {openResetDropdown ? (
              <FaAngleUp size={20} />
            ) : (
              <FaAngleDown size={20} />
            )}
          </span>
        </div>
        {openResetDropdown && (
          <div className="d-flex flex-column p-2">
            <div className="my-1">
              <label className="small-font mb-1">Old Password</label>
              <div className="d-flex flex-between input-css w-100">
                <input
                  type={oldPswdVisible ? "text" : "password"}
                  className="small-font rounded w-100 all-none"
                  placeholder="Enter"
                  value={oldPswd}
                  onChange={handleOldPasswordChange}
                />
                {oldPswdVisible ? (
                  <IoMdEye
                    className="black-font"
                    size={20}
                    onClick={handleOldPswdVisible}
                  />
                ) : (
                  <IoMdEyeOff
                    className="black-font"
                    size={20}
                    onClick={handleOldPswdVisible}
                  />
                )}
              </div>
              {oldPswdError && (
                <p className="red-font small-font">{oldPswdError}</p>
              )}
            </div>

            <div className="my-1">
              <label className="small-font mb-1">New Password</label>
              <div className="d-flex flex-between input-css w-100">
                <input
                  type={newPswdVisible ? "text" : "password"}
                  className="small-font rounded w-100 all-none"
                  placeholder="Enter"
                  value={newPswd}
                  onChange={handleNewPasswordChange}
                />
                {newPswdVisible ? (
                  <IoMdEye
                    className="black-font"
                    size={20}
                    onClick={handleNewPswdVisible}
                  />
                ) : (
                  <IoMdEyeOff
                    className="black-font"
                    size={20}
                    onClick={handleNewPswdVisible}
                  />
                )}
              </div>
              {newPswdError && (
                <p className="red-font small-font">{newPswdError}</p>
              )}
            </div>

            <div className="my-1">
              <label className="small-font mb-1">Confirm Password</label>
              <div className="d-flex flex-between input-css w-100">
                <input
                  type={confirmPswdVisible ? "text" : "password"}
                  className="small-font rounded w-100 all-none"
                  placeholder="Enter"
                  value={confirmPswd}
                  onChange={handleConfirmPasswordChange}
                />
                {confirmPswdVisible ? (
                  <IoMdEye
                    className="black-font"
                    size={20}
                    onClick={handleConfirmPswdVisible}
                  />
                ) : (
                  <IoMdEyeOff
                    className="black-font"
                    size={20}
                    onClick={handleConfirmPswdVisible}
                  />
                )}
              </div>
              {confirmPswdError && (
                <p className="red-font small-font">{confirmPswdError}</p>
              )}
            </div>

            <div className="row d-flex mt-3 justify-content-end">
              <div className="">
                <button
                  type="button"
                  // className={`w-100 saffron-btn rounded small-font ${
                  //   error ? "disabled-btn" : "pointer"
                  // }`}
                  className={`w-100  small-font ${
                    !oldPswd || !newPswd || !confirmPswd
                      ? "disabled-btn py-2 rounded "
                      : "pointer rounded  saffron-btn"
                  }`}
                  onClick={resetPassword}
                  disabled={!oldPswd || !newPswd || !confirmPswd}
                >
                  Submit
                </button>
              </div>
              {error && <p className="red-font my-2 small-font">{error}</p>}
            </div>
          </div>
        )}
      </div>

      <SuccessPopup
        successPopupOpen={successPopupOpen}
        setSuccessPopupOpen={setSuccessPopupOpen}
        discription={msg}
      />
    </div>
  );
};

export default ProfileUpdate;
