import React from "react";
import { useNavigate } from "react-router-dom";
import { Images } from "../images";
import { FaUserClock } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { PiDotsNineBold } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";

function Header() {
  const handleLogout = () => {
    localStorage?.clear();
    window.location.reload();
  };
  return (
    <div className="header">
      <div className="w-100 flex-between px-2 py-1">
        <div className="d-flex align-items-center">
          <img className="logo-img me-5" src={Images?.S7Logo} alt="Logo" />
          <div className="d-flex align-items-center input-css">
            <FaSearch size={18} className="grey-clr me-2" />
            <input
              className="all-none small-font"
              placeholder="Search Here..."
            />
          </div>
        </div>
        <div className="d-flex align-items-center">
          <div className="flex-center grey-border px-3 py-1 rounded-pill me-2">
            <FaUserClock size={18} />
            <span className="ps-2 black-text2 small-font ">
              Vendor Registration and List
            </span>
          </div>
          <IoMdNotificationsOutline size={22} className="grey-clr me-2" />
          <img
            className="me-2"
            src={Images?.ProfileImage}
            alt="Profile_Image"
          />
          <PiDotsNineBold
            size={24}
            className="grey-clr"
            onClick={handleLogout}
          />
        </div>
      </div>
      <div className="d-flex grey-border">
        <div className="white-btn">Dashboard</div>
        <div className="saffron-btn">Central Panel</div>
      </div>
    </div>
  );
}

export default Header;
