import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import {
  FaSearch,
  FaUserCog,
  FaChevronDown,
  FaChevronUp,
  FaUserTie,
} from "react-icons/fa";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import { PiDotsNineBold, PiSquaresFourFill } from "react-icons/pi";
import { ImUserPlus } from "react-icons/im";
import { Images } from "../images";
import SubHeader from "./SubHeader";
import { getCountries } from "../api/apiMethods";
import { useDispatch, useSelector } from "react-redux";
import { setAllCountries } from "../redux/action";
import NotificationsPopup from "../pages/popups/NotificationsPopup";
import { AiOutlineLogout } from "react-icons/ai";
import {
  getNotificationsforDirector,
  getNotificationsforManagement,
} from "../api/apiMethods";
import { MdEdit } from "react-icons/md";
import ProfileUpdate from "./ProfileUpdate";
import { imgUrl } from "../api/baseUrl";

function Header() {
  const navigate = useNavigate();
  const role_name = localStorage?.getItem("role_name");
  const role_code = localStorage?.getItem("role_code");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const [notificationPopup, setNotificationPopup] = useState(false);
  const countriesDataFetched = useRef(false);
  const userRole = localStorage.getItem("role_code");
  const [error, setError] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [updateProfile, setUpdateProfille] = useState(false);
  const profilePhoto = localStorage.getItem("photo");
  const parent_role_name = localStorage.getItem("parent_role");
  const allowedRoles = [
    "owner",
    "management",
    "accounts",
    "promotion",
    "risk management",
  ];
  const isDirectorEmployee = parent_role_name === "director";

  const id = localStorage.getItem("user_id");
  const role = localStorage.getItem("role_name");

  const handleNavigate = () => {
    role_code === "white_label" && navigate("/white-label-setting");
  };
  const profilePic = useSelector((item) => item?.profilePic);

  const loginData = useSelector((item) => item?.loginData);
  const handleRegisterBtn = () => {
    setIsActiveBtn(true);
    const path =
      window?.location?.pathname === "/central-casino"
        ? "/vendor-registration"
        : "/sports-vendor-registration";
    navigate(path);
  };

  const handleNotification = () => {
    console.log(unreadCount);
    setNotificationPopup(true);
  };

  const getAllNotificationsToDir = () => {
    getNotificationsforDirector()
      .then((response) => {
        setNotifications(response?.data);
        setUnreadCount(response?.metaData.unread_count);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  const getAllNotificationsToMan = () => {
    getNotificationsforManagement()
      .then((response) => {
        setNotifications(response?.data);
        setUnreadCount(response?.metaData.unread_count);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  useEffect(() => {
    if (role === "director") {
      getAllNotificationsToDir();
    } else if (role === "management") {
      getAllNotificationsToMan();
    }
  }, []);

  const handleLogout = () => {
    if (userRole === "management") {
      localStorage.clear();
      navigate("/master/login");
    } else if (userRole === "director") {
      localStorage.clear();
      navigate("/director/login");
    } else {
      localStorage.clear();
      navigate("/master/login");
    }

    // window.location.reload();
  };
  const dispatch = useDispatch();
  const isDashboard = window?.location?.pathname === "/";
  const getAllCountries = () => {
    getCountries()
      .then((response) => {
        if (response?.status === true) {
          dispatch(setAllCountries(response?.data));
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setError(error?.message || "API request failed");
      });
  };
  useEffect(() => {
    if (countriesDataFetched.current) return;
    countriesDataFetched.current = true;
    getAllCountries();
  }, []);

  const profileSrc =
    role_code === "director"
      ? `${imgUrl}/directorProfilePhotos/${profilePhoto}`
      : isDirectorEmployee
      ? `${imgUrl}/directorProfilePhotos/${profilePhoto}`
      : allowedRoles.includes(role_code)
      ? `${imgUrl}/employeeProfiles/${profilePhoto}`
      : Images?.ProfileImage;
  return (
    <>
      <div className="header">
        <div className="w-100 flex-between px-2 py-1">
          <div className="d-flex align-items-center">
            <img
              className="logo-img me-5"
              src={Images?.S7Logo}
              alt="Logo"
              onClick={() => navigate("/")}
            />
            <div className="d-flex align-items-center input-css ms-1">
              <FaSearch size={18} className="grey-clr me-2" />
              <input
                className="all-none small-font"
                placeholder="Search Here..."
              />
            </div>
          </div>
          <div className="d-flex align-items-center">
            {role_name === "owner" && (
              <div
                className={`flex-center grey-border px-3 py-2 rounded-pill me-2 pointer black-text2 ${
                  isActiveBtn ? "active-saffron-btn white-text" : ""
                }`}
                onClick={handleRegisterBtn}
              >
                <ImUserPlus size={18} />
                <span className="ps-2 small-font white-space">
                  Vendor Registration and List
                </span>
              </div>
            )}
            <div
              className="fw-600 br-4px px-2 py-1 pointer postion-relative"
              onClick={handleNotification}
            >
              {/* <IoMdNotificationsOutline size={26} className="black-clr" /> */}
              {unreadCount === 0 ? (
                <IoMdNotificationsOutline size={26} className="black-text" />
              ) : (
                <div>
                  <IoMdNotificationsOutline size={26} className="black-text" />
                  <span className="notification-count d-flex flex-center white-text small-font px-1">
                    {unreadCount}
                  </span>
                </div>
              )}
              {/* <span className="notification-count d-flex flex-center white-text small-font px-1">
                {unreadCount}
              </span> */}
            </div>
            <div
              className="position-relative"
              onClick={() => setUpdateProfille(true)}
            >
              <img
                className="mx-3 head-profile"
                src={profileSrc}
                alt="Profile"
                loading="lazy"
              />
            </div>
            {updateProfile && (
              <div className="pos-abs w-20">
                <ProfileUpdate
                  updateProfile={updateProfile}
                  setUpdateProfille={setUpdateProfille}
                />
              </div>
            )}

            <AiOutlineLogout
              size={24}
              title="Logout"
              className="black-clr mx-2 fw-800 pointer"
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
              <span className="medium-font pointer text-capitalize">
                Dashboard
              </span>
            </div>
            {role_name !== "owner" ? (
              <div
                className={`${!isDashboard ? "saffron-btn" : "white-btn"}`}
                onClick={handleNavigate}
              >
                {role_name !== "owner" ? (
                  <FaUserTie size={22} className="me-2" />
                ) : (
                  <FaUserCog size={22} className="me-2" />
                )}
                <span className="medium-font pointer text-capitalize">
                  {role_name}
                </span>
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
                  <span className="medium-font pointer text-capitalize">
                    {role_name}
                  </span>
                  {isDropdownOpen ? (
                    <FaChevronUp size={16} className="ms-2" />
                  ) : (
                    <FaChevronDown size={16} className="ms-2" />
                  )}
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-100 br-0px p-0">
                  <Dropdown.Item
                    className="white-btn white-hover small-font"
                    onClick={() => navigate("/central-casino")}
                  >
                    Casino
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="white-btn white-hover small-font"
                    onClick={() => navigate("/central-sports")}
                  >
                    Sports
                  </Dropdown.Item>
                  {/* removed in ccnetrall added in management fancy,market */}
                  {/* <Dropdown.Item
                    className="white-btn white-hover small-font"
                    onClick={() => navigate("/fancy-results")}
                  >
                    Fancy Results
                  </Dropdown.Item> */}
                  {/* <Dropdown.Item
                    className="white-btn white-hover small-font"
                    onClick={() => navigate("/market-results")}
                  >
                    Market Results
                  </Dropdown.Item> */}
                  {/* <Dropdown.Item
                    className="white-btn white-hover small-font"
                    onClick={() => navigate("/matches-list")}
                  >
                    Matches List
                  </Dropdown.Item> */}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
          <div className="flex-center p-2 chat-border me-3">
            <img className="chat-img" src={Images?.ChatIcon} alt="Chat Icon" />
            <span className="ms-2 black-text3 medium-font">Chat</span>
          </div>
        </div>
        {role_name !== "owner" && role_name !== "White Label Setting" && (
          <SubHeader />
        )}
      </div>
      <NotificationsPopup
        notificationPopup={notificationPopup}
        setNotificationPopup={setNotificationPopup}
        notifications={notifications}
        fetchAllNotificationsToMan={getAllNotificationsToMan}
        fetchAllNotificationsToDir={getAllNotificationsToDir}
      />
    </>
  );
}

export default Header;
