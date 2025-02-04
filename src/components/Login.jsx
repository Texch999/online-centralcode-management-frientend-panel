import { Images } from "../images";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { loginDirector, loginUser } from "../api/apiMethods";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    mode: "onChange",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState();
  console.log(loginData, "loginData");
  const location = useLocation();

  const handleLogin = (data) => {
    const payload = {
      login_name: data?.username,
      password: data?.password,
    };
    console.log(payload, "payload");

    setLoading(true);


    const loginApiCall = location.pathname === "/director/login" || !location.pathname ? loginDirector : loginUser;


    loginApiCall(payload)

      .then((response) => {
        setLoading(false);

        if (response?.status === true) {
          console.log(response, "response from API");
          setLoginData(response);
          localStorage.setItem("jwt_token", response?.token);
          localStorage?.setItem("isLoggedIn", true);
          localStorage.setItem("emp_role_id", response?.user?.role?.role_id);
          localStorage.setItem("role_name", response?.user?.role?.role_name);
          localStorage.setItem("role_code", response?.user?.role?.role_name);
          localStorage.setItem("user_id", response?.user?.id);
          navigate("/");
          setError("");
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error?.message || "Login failed");
      });

    setTimeout(() => setError(""), 2000);
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
                  placeholder="Login Name"
                  maxLength={15}
                  autoComplete="username"
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
                  placeholder="Password"
                  maxLength={36}
                  autoComplete="current-password"
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
                        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
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

              <button
                className={`orange-btn mt-4 w-100 ${!isValid || loading ? "disabled-btn" : ""
                  }`}
                type="submit"
                disabled={!isValid || loading}
              >
                {loading ? "Logging in..." : "Submit"} {/* Show loading text */}
              </button>
            </div>
            {error && <div className="small-font red-font">{error}</div>}
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
