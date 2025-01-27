import { Images } from "../images";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    const usernameRegex = /^[a-zA-Z ]*$/;
    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/;

    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      setError("Username is required");
      return;
    }

    if (!usernameRegex.test(trimmedUsername)) {
      setError("Username can only contain letters and spaces");
      return;
    }

    if (trimmedUsername.length < 5 || trimmedUsername.length > 15) {
      setError("Username must be between 5 and 15 characters long");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    if (password.length < 6 || password.length > 36) {
      setPasswordError("Password must be between 6 and 36 characters long");
      return;
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
      );
      return;
    }

    let role_name = "";
    let role_code = "";

    switch (trimmedUsername.toLowerCase()) {
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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
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
            <div className="black-text">We are glad to see you back with us</div>
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
                  maxLength={15}
                  onChange={(e) => {
                    const value = e.target.value;
                    const usernameRegex = /^[a-zA-Z ]*$/;
                    if (usernameRegex.test(value)) {
                      setUsername(value);
                      setError("");
                    } else {
                      setError("Username can only contain letters and spaces");
                    }
                  }}
                  onKeyPress={handleKeyPress}
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
                  value={password}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPassword(value);
                    setPasswordError("");

                    if (value.length < 6 || value.length > 36) {
                      setPasswordError("Password must be between 6 and 36 characters long");
                    }
                  }}
                  onKeyPress={handleKeyPress}
                  aria-label="Password"
                />
                <span
                  onClick={handlePasswordVisibility}
                  style={{ cursor: "pointer" }}
                >
                  {passwordVisible ? <FiEyeOff size={22} /> : <FiEye size={22} />}
                </span>
              </div>
              {passwordError && (
                <div className="small-font red-font mt-1">{passwordError}</div>
              )}

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
