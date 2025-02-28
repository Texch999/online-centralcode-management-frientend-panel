import React, { useState } from "react";
import { Images } from "../images";
import { MdEdit, MdLockReset } from "react-icons/md";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const ProfileUpdate = ({ setUpdateProfille }) => {
  const [openResetDropdown, setResetDropdown] = useState(false);
  const handleResetSection = (prev) => {
    setResetDropdown((prev) => !prev);
  };
  const [profileImg, setProfileImg] = useState(null);
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImg(URL.createObjectURL(file));
    }
  };
  return (
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
            <input
              type="text"
              className="w-100 small-font rounded input-css all-none"
              placeholder="Enter"
            />
          </div>

          <div className="my-1">
            <label className="small-font mb-1">New Password</label>
            <input
              type="text"
              className="w-100 small-font rounded input-css all-none"
              placeholder="Enter"
            />
          </div>

          <div className="my-1">
            <label className="small-font mb-1">Confirm Password</label>
            <input
              type="text"
              className="w-100 small-font rounded input-css all-none"
              placeholder="Enter"
            />
          </div>

          <div className="row d-flex mt-3 justify-content-end">
            <div className="">
              <button
                type="button"
                className="w-100 saffron-btn rounded small-font"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileUpdate;
