import { Images } from "../images";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Login() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    let role_name = "";
    let role_code = "";
    switch (username.toLowerCase()) {
      case "central_panel":
        role_name = "Central Panel";
        role_code = "central_panel";
        break;
      case "management":
        role_name = "Management";
        role_code = "management";
        break;
      case "director":
        role_name = "Director";
        role_code = "director";
        break;
      case "super_admin":
        role_name = "Super Admin";
        role_code = "super_admin";
        break;
      case "accounts_team":
        role_name = "Accounts Team";
        role_code = "accounts_team";
        break;
      case "risk_team":
        role_name = "Risk Team";
        role_code = "risk_team";
        break;
      case "designing_team":
        role_name = "Designing Team";
        role_code = "designing_team";
        break;
      case "white_label":
        role_name = "White Label Setting";
        role_code = "white_label";
        break;
      default:
        setError("Invalid username");
        return;
    }
    localStorage.setItem("role_name", role_name);
    localStorage.setItem("role_code", role_code);
    localStorage.setItem("isLoggedIn", "true");
    navigate("/");
    window.location.reload();
  };

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-bg w-100 h-100vh p-5 d-flex justify-content-center align-items-center">
      <div
        className="white-bg w-100 h-fill login-box-shadow rounded-4 d-flex"
        style={{ maxWidth: "1000px" }}
      >
        <div className="w-50 pt-3 h-fill position-relative d-flex justify-content-center">
          <div className="ps-4 pe-5 flex-column px-5 w-75">
            <div className="welcome-font">WELCOME</div>
            <div className="black-text">
              We are glad to see you back with us
            </div>
            <div className="py-4 medium-font">
              <div className="w-100 d-flex align-items-center input-bg loginbox-radius mt-2 p-2">
                <img
                  className="icon-img"
                  alt="username-icon"
                  src={Images.loginUserImages}
                />
                <input
                  className="all-none w-inherit ps-2"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                  aria-label="Username"
                />
              </div>
              {error && <div className="small-font red-font mt-1">{error}</div>}

              <div className="w-100 d-flex align-items-center input-bg loginbox-radius mt-3 p-2">
                <img
                  className="icon-img"
                  alt="password-icon"
                  src={Images.loginUserLock}
                />
                <input
                  className="all-none w-inherit ps-2"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  aria-label="Password"
                />
                <span
                  onClick={handlePasswordVisibility}
                  style={{ cursor: "pointer" }}
                >
                  {passwordVisible ? (
                    <FiEyeOff size={22} />
                  ) : (
                    <FiEye size={22} />
                  )}
                </span>
              </div>

              <button className="orange-btn mt-4 w-100" onClick={handleLogin}>
                Submit
              </button>
            </div>
          </div>
          <img
            src={Images.LoginImageOne}
            alt="login-one"
            className="loginimg w-100"
          />
        </div>
        <div className="w-50 pe-3 py-3 h-fill">
          <img
            src={Images.LoginImageTwo}
            alt="sports-login"
            className="w-100 h-fill"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
