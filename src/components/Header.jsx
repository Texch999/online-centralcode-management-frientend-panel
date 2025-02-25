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
import { useDispatch } from "react-redux";
import { setAllCountries } from "../redux/action";
import NotificationsPopup from "../pages/popups/NotificationsPopup";
import {
  getNotificationsforDirector,
  getNotificationsforManagement
} from "../api/apiMethods";
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



  const id = localStorage.getItem("user_id");
  const role = localStorage.getItem("role_name");



  const handleNavigate = () => {
    role_code === "white_label" && navigate("/white-label-setting");
  };

  const handleRegisterBtn = () => {
    setIsActiveBtn(true);
    const path =
      window?.location?.pathname === "/central-casino"
        ? "/vendor-registration"
        : "/sports-vendor-registration";
    navigate(path);
  };

  const handleNotification = () => {
    console.log(unreadCount)
    setNotificationPopup(true);


  }

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
    }
    else if (role === "management") {
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
  // useEffect(() => {
  //   if (countriesDataFetched.current) return;
  //   countriesDataFetched.current = true;
  //   getAllCountries();
  // }, []);
  return (
    <>
      <div className="header">
        <div className="w-100 flex-between px-2 py-1">
          <div className="d-flex align-items-center">
            <img className="logo-img me-5" src={Images?.S7Logo} alt="Logo" onClick={() => navigate("/")} />
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
                className={`flex-center grey-border px-3 py-2 rounded-pill me-2 pointer black-text2 ${isActiveBtn ? "active-saffron-btn white-text" : ""
                  }`}
                onClick={handleRegisterBtn}
              >
                <ImUserPlus size={18} />
                <span className="ps-2 small-font white-space">
                  Vendor Registration and List
                </span>
              </div>
            )}
            {/* <div className="relative inline-block">
            <IoMdNotificationsOutline
              onClick={() => console.log("Open notifications")}
              size={24}
              className="grey-clr me-2 mx-3 fw-800 cursor-pointer"
            />

            {/* Unread Badge (Only show if there are unread notifications) 
            {unreadCount > 0 && (
              <span className="absolute-top-2-right-1 bg-red-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
            </div> */}
            <div
              className="white-font fw-600 br-4px px-2 py-1 pointer postion-relative"
              // onClick={() => setIsNotificationModalShow((prev) => !prev)}
              onClick={handleNotification}
            >
              <IoMdNotificationsOutline size={26}
              />
              <span className="notification-count d-flex flex-center white-text small-font px-1">

                {unreadCount}
              </span>
            </div>
            <img className="mx-3" src={Images?.ProfileImage} alt="Profile" />
            <PiDotsNineBold
              size={24}
              title="Logout"
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
                  className={`${!isDashboard ? "saffron-btn" : "white-btn"
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
