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
import { useSelector } from "react-redux";
import { imgUrl } from "../api/baseUrl";

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
  const profilePhoto = localStorage.getItem("photo");

  console.log("profilePhoto", profilePhoto)
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

  const validatePasswords = () => {
    let isValid = true;

    if (!passwordPattern.test(newPswd)) {
      setNewPswdError(
        "password should be in 6-15 chars, and sould conatins 1 uppercase, 1 lowercase, 1 number, 1 special character."
      );
      isValid = false;
    } else {
      setNewPswdError("");
    }

    if (newPswd !== confirmPswd) {
      setConfirmPswdError("Passwords do not match.");
      isValid = false;
    } else {
      setConfirmPswdError("");
    }

    return isValid;
  };

  const isDirectorEmployee = parent_role_name === "director";

  const resetPassword = () => {
    if (!validatePasswords()) return;

    const payload = {
      old_password: oldPswd,
      new_password: newPswd,
      confirm_new_password: confirmPswd,
    };

    if (role_code === "director") {
      resetPswdDirector(payload).then(handleResponse).catch(handleError);
    } else if (isDirectorEmployee) {
      dirEmployeeResetPswd(payload).then(handleResponse).catch(handleError);
    } else if (allowedRoles.includes(role_code)) {
      resetPasswordMan(payload).then(handleResponse).catch(handleError);
    } else {
      setError("Unauthorized role.");
    }
  };

  const handleResponse = (response) => {
    if (response?.status === true) {
      setMsg(response?.message);
      setOldPaswd("");
      setNewPaswd("");
      setConfirmPaswd("");
      setUpdateProfille(false);
      setSuccessPopupOpen(true);
      setTimeout(() => setSuccessPopupOpen(false), 2000);
    } else {
      setError("Something went wrong");
    }
  };

  const handleError = (error) => {
    setError(error?.message);
  };

  const editProfile = () => {
    if (!selectedFile) {
      setError("Please select an image.");
      return;
    }
    const formData = new FormData();
    formData.append("photo", selectedFile);

    if (role_code === "director") {
      dirEditProfile(formData).then(handleEditResponse).catch(handleEditError);
    } else if (isDirectorEmployee) {
      dirEmpEditProfile(formData)
        .then(handleEditResponse)
        .catch(handleEditError);
    } else if (allowedRoles.includes(role_code)) {
      managementEditProfile(formData)
        .then(handleEditResponse)
        .catch(handleEditError);
    } else {
      setError("Unauthorized role.");
    }
  };
  const handleEditResponse = (response) => {
    if (response?.status === true) {
      setMsg(response?.message);
      setOldPaswd("");
      setNewPaswd("");
      setConfirmPaswd("");
      setUpdateProfille(false);
      setSuccessPopupOpen(true);
      setTimeout(() => setSuccessPopupOpen(false), 2000);
    } else {
      setError("Something went wrong");
    }
  };
  const handleEditError = (error) => {
    setError(error?.message);
  };

  const profileSrc =
    role_code === "director"
      ? `${imgUrl}/directorProfilePhotos/${profilePhoto}`
      : isDirectorEmployee
      ? `${imgUrl}/directorProfilePhotos/${profilePhoto}`
      : allowedRoles.includes(role_code)
      ? `${imgUrl}/employeeProfiles/${profilePhoto}`
      : Images?.ProfileImage;

  //   if (!selectedFile) {
  //     setError("Please select an image.");
  //     return;
  //   }
  //   const formData = new FormData();
  //   formData.append("photo", selectedFile);

  //   managementEditProfile(formData)
  //     .then((response) => {
  //       if (response.status === true) {
  //         console.log(response?.data);
  //         setMsg(response?.message);
  //         setSuccessPopupOpen(true);
  //         setTimeout(() => {
  //           setSuccessPopupOpen(false);
  //         }, 2000);
  //       } else {
  //         setError("Something went wrong");
  //       }
  //     })
  //     .catch((error) => {
  //       setError(error?.message);
  //     });
  // };

  // const directorEmpEditProfile = () => {
  //   if (!selectedFile) {
  //     setError("Please select an image.");
  //     return;
  //   }
  //   const formData = new FormData();
  //   formData.append("photo", selectedFile);
  //   let apiCallEditDirEmp;

  //   if (role_code === "director") {
  //     apiCallEditDirEmp = dirEditProfile(formData);
  //   } else if (dirEmpRoles.includes(role_code)) {
  //     apiCallEditDirEmp = dirEmpEditProfile(formData);
  //   } else {
  //     setError("Unauthorized role.");
  //     return;
  //   }
  //   apiCallEditDirEmp
  //     .then((response) => {
  //       if (response.status === true) {
  //         console.log(response?.data);
  //         setMsg(response?.message);
  //         setSuccessPopupOpen(true);
  //         setTimeout(() => {
  //           setSuccessPopupOpen(false);
  //         }, 2000);
  //       } else {
  //         setError("Something went wrong");
  //       }
  //     })
  //     .catch((error) => {
  //       setError(error?.message);
  //     });
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
        <div className="d-flex flex-column flex-center position-relative">
          <div className="">
            <img
              className="mx-3 my-3 profile br-10 "
              src={profileSrc}
              alt="Profile"
              loading="lazy"
            />
          </div>
          <div
            className="saffron-bg pos-abs-profile d-flex align-items-center justify-content-center"
            onClick={() => fileInputRef.current.click()}
          >
            <IoMdAdd size={25} className="white-font fw-bold" />
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
              className="saffron-btn rounded d-flex my-2 small-font align-items-center pointer"
              // onClick={() => {
              //   if (allowedRoles.includes(role_code)) {
              //     manEditProfile();
              //   } else if (
              //     role_code === "director" ||
              //     parent_role_name === "director"
              //   ) {
              //     directorEmpEditProfile();
              //   }
              // }}
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
                  onChange={(e) => setOldPaswd(e.target.value)}
                />
                {oldPswdVisible ? (
                  <IoMdEyeOff
                    className="black-font"
                    size={20}
                    onClick={handleOldPswdVisible}
                  />
                ) : (
                  <IoMdEye
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
                  onChange={(e) => setNewPaswd(e.target.value)}
                />
                {newPswdVisible ? (
                  <IoMdEyeOff
                    className="black-font"
                    size={20}
                    onClick={handleNewPswdVisible}
                  />
                ) : (
                  <IoMdEye
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
                  onChange={(e) => setConfirmPaswd(e.target.value)}
                />
                {confirmPswdVisible ? (
                  <IoMdEyeOff
                    className="black-font"
                    size={20}
                    onClick={handleConfirmPswdVisible}
                  />
                ) : (
                  <IoMdEye
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
                  className={`w-100 saffron-btn rounded small-font ${
                    error ? "disabled-btn" : "pointer"
                  }`}
                  onClick={resetPassword}
                  // onClick={() => {
                  //   if (allowedRoles.includes(role_code)) {
                  //     resetPswdSubmitManagement();
                  //   } else if (
                  //     role_code === "director" ||
                  //     parent_role_name === "director"
                  //   ) {
                  //     resetPswdSubmitDirector();
                  //   }
                  // }}
                  // disabled={!!error}
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
