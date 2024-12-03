import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import {
  FaSearch,
  FaUserCog,
  FaChevronDown,
  FaChevronUp,
  FaUserTie,
} from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { PiDotsNineBold, PiSquaresFourFill } from "react-icons/pi";
import { Images } from "../images";
import SubHeader from "./SubHeader";
import { ImUserPlus } from "react-icons/im";

function Header() {
  const navigate = useNavigate();
  const role = localStorage?.getItem("role");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isActiveBtn, setIsActiveBtn] = useState(false);

  const handleRegisterBtn = () => {
    setIsActiveBtn(true);
    window?.location?.pathname === "/casino"
      ? navigate("/vendor-registartion")
      : navigate("/sports-vendor-registration");
  };
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  const isDashboard = window?.location?.pathname === "/";

  return (
    <div className="header">
      <div className="w-100 flex-between px-2 py-1">
        <div className="d-flex align-items-center">
          <img className="logo-img me-5" src={Images?.S7Logo} alt="Logo" />
          <div className="d-flex align-items-center input-css ms-1">
            <FaSearch size={18} className="grey-clr me-2" />
            <input
              className="all-none small-font"
              placeholder="Search Here..."
            />
          </div>
        </div>
        <div className="d-flex align-items-center">
          {role === "Central Panel" && (
            <div
              className={`flex-center grey-border px-3 py-2 rounded-pill me-2 pointer black-text2 ${
                isActiveBtn ? "active-saffron-btn white-text " : ""
              }`}
              onClick={handleRegisterBtn}
            >
              <ImUserPlus size={19} />
              <span className="ps-2 small-font white-space">
                Vendor Registration and List
              </span>
            </div>
          )}
          <IoMdNotificationsOutline
            size={25}
            className="grey-clr me-2 mx-3 fw-800"
          />
          <img className="mx-3" src={Images?.ProfileImage} alt="Profile" />
          <PiDotsNineBold
            size={24}
            title="logout"
            className="grey-clr mx-2 fw-800 pointer"
            onClick={handleLogout}
          />
        </div>
      </div>
      <div className="flex-between grey-border">
        <div className="d-flex">
          <div
            className={`${isDashboard ? "saffron-btn" : "white-btn"}`}
            onClick={() => navigate("/")}
          >
            <PiSquaresFourFill size={24} className="me-2" />
            <span className="medium-font pointer">Dashboard</span>
          </div>
          {role === "Management" || role === "Director" || role ==="Super Admin" ? (
            <div
              className={`${!isDashboard ? "saffron-btn" : "white-btn"}`}
              onClick={() => navigate("/management")}
            >
              {role === "Director" || role ==="Super Admin" ? (
                <FaUserTie size={23} className="me-2" />
              ) : (
                <FaUserCog size={24} className="me-2" />
              )}
              <span className="medium-font pointer">{role}</span>
            </div>
          ) : (
            role === "Central Panel" && (
              <Dropdown onToggle={(isOpen) => setIsDropdownOpen(isOpen)}>
                <Dropdown.Toggle
                  variant="none"
                  className={`${
                    !isDashboard ? "saffron-btn" : "white-btn"
                  } br-0px d-flex align-items-center`}
                  id="dropdown-autoclose-true"
                >
                  <FaUserCog size={24} className="me-2" />
                  <span className="medium-font pointer">{role}</span>
                  {isDropdownOpen ? (
                    <FaChevronUp size={16} className="ms-2" />
                  ) : (
                    <FaChevronDown size={16} className="ms-2" />
                  )}
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-100 br-0px p-0">
                  <Dropdown.Item
                    className="white-btn white-hover small-font"
                    onClick={() => navigate("/casino")}
                  >
                    Casino
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="white-btn white-hover small-font"
                    onClick={() => navigate("/sports")}
                  >
                    Sports
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="white-btn white-hover small-font"
                    onClick={() => navigate("/fancy-results")}
                  >
                    Fancy Results
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="white-btn white-hover small-font"
                    onClick={() => navigate("/market-results")}
                  >
                    Market Results
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )
          )}
        </div>
        <div className="flex-center p-2 chat-border me-3">
          <img className="chat-img" src={Images?.ChatIcon} alt="Chat_Icon" />
          <span className="ms-2 black-text3 medium-font">Chat</span>
        </div>
      </div>
      {(role === "Management" || role === "Director" || role ==="Super Admin") && <SubHeader />}
    </div>
  );
}

export default Header;
