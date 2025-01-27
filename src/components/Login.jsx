import { Images } from "../images";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (data) => {
    let role_name = "";
    let role_code = "";

    switch (data.username.trim().toLowerCase()) {
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
          <form
            className="ps-4 pe-5 flex-column px-5 w-75"
            onSubmit={handleSubmit(handleLogin)}
          >
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
                  maxLength={15}
                  {...register("username", {
                    required: "Username is required",
                    pattern: {
                      value: /^[a-zA-Z ]*$/,
                      message: "Username can only contain letters and spaces",
                    },
                    minLength: {
                      value: 5,
                      message: "Username must be at least 5 characters",
                    },
                    maxLength: {
                      value: 15,
                      message: "Username must not exceed 15 characters",
                    },
                  })}
                  aria-label="Username"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, "");
                  }}
                />
              </div>
              {errors.username && (
                <div className="small-font red-font mt-1">
                  {errors.username.message}
                </div>
              )}

              <div className="w-100 d-flex align-items-center input-bg loginbox-radius mt-3 p-2">
                <img
                  className="icon-img"
                  alt="password-icon"
                  src={Images.loginUserLock}
                />
                <input
                  className="all-none w-inherit ps-2"
                  type={passwordVisible ? "text" : "password"}
                  maxLength={36}
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    maxLength: {
                      value: 36,
                      message: "Password must not exceed 36 characters",
                    },
                    pattern: {
                      value:
                        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/,
                      message:
                        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
                    },
                  })}
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
              {errors.password && (
                <div className="small-font red-font mt-1">
                  {errors.password.message}
                </div>
              )}

              <button className="orange-btn mt-4 w-100" type="submit">
                Submit
              </button>
            </div>
          </form>
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
