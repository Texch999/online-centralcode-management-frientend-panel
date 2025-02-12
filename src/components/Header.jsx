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
import { IoMdNotificationsOutline } from "react-icons/io";
import { PiDotsNineBold, PiSquaresFourFill } from "react-icons/pi";
import { ImUserPlus } from "react-icons/im";
import { Images } from "../images";
import SubHeader from "./SubHeader";
import { getAllCountires } from "../api/apiMethods";
import { useDispatch } from "react-redux";
import { setAllCountries } from "../redux/action";
function Header() {
  const navigate = useNavigate();
  const role_name = localStorage?.getItem("role_name");
  const role_code = localStorage?.getItem("role_code");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const countriesDataFetched = useRef(false);
  const userRole = localStorage.getItem("role_code")
  const [error, setError] = useState("");
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

  const handleLogout = () => {
    if (userRole === "management") {
      localStorage.clear();
      navigate("/master/login");
    } else if (userRole === "director") {
      localStorage.clear();
      navigate("/director/login");
    }


    // window.location.reload();

  };
  const dispatch = useDispatch()
  const isDashboard = window?.location?.pathname === "/";
  const getAllCountries = () => {
    getAllCountires()
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
  return (
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
          <IoMdNotificationsOutline
            size={24}
            className="grey-clr me-2 mx-3 fw-800"
          />
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
  );
}

export default Header;
