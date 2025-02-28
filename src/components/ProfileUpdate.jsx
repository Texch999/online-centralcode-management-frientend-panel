import React, { useState } from "react";
import { Images } from "../images";
import { MdEdit, MdLockReset } from "react-icons/md";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import {
  dirEmployeeResetPswd,
  resetPassword,
  resetPasswordMan,
  resetPswdDirector,
} from "../api/apiMethods";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import SuccessPopup from "../pages/popups/SuccessPopup";

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
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
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

  const resetPswdSubmitManagement = () => {
    if (!validatePasswords()) return;

    if (allowedRoles.includes(role_code)) {
      const payload = {
        old_password: oldPswd,
        new_password: newPswd,
        confirm_new_password: confirmPswd,
      };

      resetPasswordMan(payload)
        .then((response) => {
          if (response?.status === true) {
            console.log(response?.data);
            setSuccessPopupOpen(true);
            setUpdateProfille(false);
            setTimeout(() => {
              setSuccessPopupOpen(false);
            }, 2000);
          } else {
            setError("Something went wrong");
          }
        })
        .catch((error) => {
          setError(error?.message);
        });
    }
  };

  const resetPswdSubmitDirector = () => {
    if (!validatePasswords()) return;

    const payload = {
      old_password: oldPswd,
      new_password: newPswd,
      confirm_new_password: confirmPswd,
    };

    if (role_code === "director") {
      resetPswdDirector(payload)
        .then((response) => {
          if (response?.status === true) {
            console.log(response?.data);
            setUpdateProfille(false);
            setSuccessPopupOpen(true);
            setTimeout(() => {
              setSuccessPopupOpen(false);
            }, 2000);
          } else {
            setError("Something went wrong");
          }
        })
        .catch((error) => {
          setError(error?.message);
        });
    } else if (
      ["accounts", "promotion", "risk management"].includes(role_code)
    ) {
      dirEmployeeResetPswd(payload)
        .then((response) => {
          if (response?.status === true) {
            console.log(response?.data);
            setUpdateProfille(false);
            setSuccessPopupOpen(true);
            setTimeout(() => {
              setSuccessPopupOpen(false);
            }, 2000);
          } else {
            setError("Something went wrong");
          }
        })
        .catch((error) => {
          setError(error?.message);
        });
    }
  };

  //   const resetPswdSubmitDirector = () => {
  //     if (!validatePasswords()) return;

  //     const payload = {
  //       old_password: oldPswd,
  //       new_password: newPswd,
  //       confirm_new_password: confirmPswd,
  //     };

  //     if (role_code === "director") {
  //       resetPswdDirector(payload)
  //         .then((response) => {
  //           if (response?.status === true) {
  //             console.log(response?.data);
  //             setUpdateProfille(false);
  //             setSuccessPopupOpen(true);
  //             setTimeout(() => {
  //               setSuccessPopupOpen(false);
  //             }, 2000);
  //           } else {
  //             setError("Something went wrong");
  //           }
  //         })
  //         .catch((error) => {
  //           setError(error?.message);
  //         });
  //     } else if (
  //       ["accounts", "promotion", "risk management"].includes(role_code)
  //     ) {
  //       dirEmployeeResetPswd(payload)
  //         .then((response) => {
  //           if (response?.status === true) {
  //             console.log(response?.data);
  //             setUpdateProfille(false);
  //             setSuccessPopupOpen(true);
  //             setTimeout(() => {
  //               setSuccessPopupOpen(false);
  //             }, 2000);
  //           } else {
  //             setError("Something went wrong");
  //           }
  //         })
  //         .catch((error) => {
  //           setError(error?.message);
  //         });
  //     }
  //   };

  //   const resetPswdSubmitDirector = () => {
  //     // if (role_code !== "director") return;
  //     if (!validatePasswords()) return;

  //     const payload = {
  //       old_password: oldPswd,
  //       new_password: newPswd,
  //       confirm_new_password: confirmPswd,
  //     };

  //     const apiCall = dirEmpRoles.includes(role_code)
  //       ? dirEmployeeResetPswd
  //       : resetPswdDirector;

  //     apiCall(payload)
  //       .then((response) => {
  //         if (response?.status === true) {
  //           console.log(response?.data);
  //           setUpdateProfille(false);
  //           setSuccessPopupOpen(true);
  //           setTimeout(() => {
  //             setSuccessPopupOpen(true);
  //           }, 2000);
  //         } else {
  //           setError("Something went wrong");
  //         }
  //       })
  //       .catch((error) => {
  //         setError(error?.message);
  //       });
  //   };

  return (
    <div>
      <div className="white-bg box-shadow2 br-10 pb-3">
        <div
          className="d-flex flex-end pointer"
          onClick={() => setUpdateProfille(false)}
        >
          <IoClose className="black-font my-1 mx-2" size={25} />
        </div>
        <div className="d-flex flex-column flex-center">
          <img
            className="mx-3 my-3 profile br-10"
            src={profileImg || Images?.ProfileImage}
            alt="Profile"
            loading="lazy"
          />

          <label className="saffron-btn rounded d-flex small-font align-items-center pointer">
            {profileImg ? (
              <span>Save Profile</span>
            ) : (
              <>
                <span>Change Photo</span>
                <MdEdit className="white-font mx-1" size={16} />
              </>
            )}

            <input
              type="file"
              accept="image/*"
              className="d-none"
              onChange={handleImage}
            />
          </label>
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
                  onClick={() => {
                    if (allowedRoles.includes(role_code)) {
                      resetPswdSubmitManagement();
                    } else if (
                      role_code === "director" ||
                      dirEmpRoles.includes(role_code)
                    ) {
                      resetPswdSubmitDirector();
                    }
                  }}
                  disabled={!!error}
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
        discription={
          "Password Reset Successfully, You can login with your new Password"
        }
      />
    </div>
  );
};

export default ProfileUpdate;
