import { Images } from "../images";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {
  loginDirector,
  loginDirectorEmployee,
  loginManagement,
} from "../api/apiMethods";
import VerifyToken from "./VerifyToken"; // Import VerifyToken
import {
  setSecureItem,
  getSecureItem,
  removeSecureItem,
} from "../utils/secureStorage";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   const checkToken = async () => {
  //     const token = await getSecureItem("jwt_token");

  //     if (!token) {
  //       navigate("/master/login", { replace: true });
  //       return;
  //     }

  //     const isValidToken = await VerifyToken(token); // Call VerifyToken function

  //     if (!isValidToken) {
  //       await removeSecureItem("jwt_token");
  //       await removeSecureItem("isLoggedIn");
  //       await removeSecureItem("role_name");
  //       navigate("/master/login", { replace: true });
  //     }
  //   };

  //   checkToken();
  // }, [navigate]);

  const handleLogin = async (data) => {
    const payload = {
      login_name: data?.username,
      password: data?.password,
    };

    setLoading(true);

    let loginApiCall;
    if (location.pathname === "/director/login" || !location.pathname) {
      loginApiCall = loginDirector;
    } else if (location.pathname === "/director/employee/login") {
      loginApiCall = loginDirectorEmployee;
    } else {
      loginApiCall = loginManagement;
    }

    try {
      const response = await loginApiCall(payload);
      setLoading(false);

      if (response?.status === true) {
        console.log(response, "====>response?.token");
        // await setSecureItem("jwt_token", response?.token);
        localStorage.setItem("jwt_token", response?.token);
        localStorage.setItem("user_id", response?.user?.id);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("emp_role_id", response?.user?.role?.role_id);

        // await setSecureItem("isLoggedIn", "true");
        // await setSecureItem("emp_role_id", response?.user?.role?.role_id);
        localStorage.setItem("role_name", response?.user?.role?.role_name);
        localStorage.setItem("role_code", response?.user?.role?.role_name);
        localStorage.setItem("user_id", response?.user?.id);
        localStorage.setItem("user_name", response?.user?.name);

        navigate("/");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setLoading(false);
      setError(error?.message || "Login failed");
    }

    setTimeout(() => setError(""), 2000);
  };

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-bg w-100 h-100vh p-5 d-flex justify-content-center align-items-center">
      <div className="white-bg w-100 login-box-shadow rounded-4 d-flex login-box">
        <div className="w-50 pt-3 position-relative d-flex justify-content-center">
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
                  className="icon-img rounded-2"
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
                      value: /^[a-zA-Z0-9 ]*$/,
                      message: "Username can only contain letters and spaces",
                    },
                    minLength: { value: 5, message: "Min 5 characters" },
                    maxLength: { value: 15, message: "Max 15 characters" },
                  })}
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
                    minLength: { value: 6, message: "Min 6 characters" },
                    maxLength: { value: 36, message: "Max 36 characters" },
                    pattern: {
                      value:
                        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/,
                      message:
                        "Must include uppercase, lowercase, number, and special character",
                    },
                  })}
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
                className={`orange-btn mt-4 w-100 ${
                  !isValid || loading ? "disabled-btn" : ""
                }`}
                type="submit"
                disabled={!isValid || loading}
              >
                {loading ? "Logging in..." : "Submit"}
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
        <div className="w-50 pe-3 py-3">
          <img
            src={Images.LoginImageTwo}
            alt="sports-login"
            className="w-100 h-100 rounded-4"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
