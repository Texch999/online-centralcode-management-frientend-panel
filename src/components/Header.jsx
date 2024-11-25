import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import {
  FaSearch,
  FaUserClock,
  FaUserCog,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { PiDotsNineBold, PiSquaresFourFill } from "react-icons/pi";
import { Images } from "../images";

function Header() {
  const navigate = useNavigate();
  const role = localStorage?.getItem("role");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  const isDashboard = window?.location?.pathname === "/dashboard";

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
            <span className="ps-2 black-text2 small-font">
              Vendor Registration and List
            </span>
          </div>
          <IoMdNotificationsOutline size={22} className="grey-clr me-2" />
          <img className="me-2" src={Images?.ProfileImage} alt="Profile" />
          <PiDotsNineBold
            size={24}
            className="grey-clr"
            onClick={handleLogout}
          />
        </div>
      </div>
      <div className="d-flex grey-border">
        <div
          className={`${isDashboard ? "saffron-btn" : "white-btn"}`}
          onClick={() => navigate("/dashboard")}
        >
          <PiSquaresFourFill size={24} className="me-2" />
          <span className="medium-font">Dashboard</span>
        </div>
        {role === "Management" ? (
          <div
            className={`${!isDashboard ? "saffron-btn" : "white-btn"}`}
            onClick={() => navigate("/management")}
          >
            <FaUserCog size={24} className="me-2" />
            <span className="medium-font">{role}</span>
          </div>
        ) : (
          <Dropdown onToggle={(isOpen) => setIsDropdownOpen(isOpen)}>
            <Dropdown.Toggle
              variant="none"
              className={`${
                !isDashboard ? "saffron-btn" : "white-btn"
              } br-0px d-flex align-items-center`}
              id="dropdown-autoclose-true"
            >
              <FaUserCog size={24} className="me-2" />
              <span className="medium-font">{role}</span>
              {isDropdownOpen ? (
                <FaChevronUp size={16} className="ms-2" />
              ) : (
                <FaChevronDown size={16} className="ms-2" />
              )}
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100 br-0px p-0 medium-font">
              <Dropdown.Item
                className="white-btn medium-font"
                onClick={() => navigate("/casino")}
              >
                Casino
              </Dropdown.Item>
              <Dropdown.Item
                className="white-btn medium-font"
                onClick={() => navigate("/sports")}
              >
                Sports
              </Dropdown.Item>
              <Dropdown.Item
                className="white-btn medium-font"
                onClick={() => navigate("/fancy-results")}
              >
                Fancy Results
              </Dropdown.Item>
              <Dropdown.Item
                className="white-btn medium-font"
                onClick={() => navigate("/market-results")}
              >
                Market Results
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </div>
  );
}

export default Header;
