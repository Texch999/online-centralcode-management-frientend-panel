import { Images } from "../images";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";

function Login() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState();
  const [pswdVisiblity, setpswdVisibility] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username.trim()) {
      setError("Username is required");
      return;
    }
    // const role =
    //   username.toLowerCase() === "management" ?
    //   "Management" :"" ||  username.toLowerCase() === "director" ? "Director" :"" ||  username.toLowerCase()==="central_panel" ? "Central Panel" :"";
    // const role = username.toLowerCase();
    let role = "";
    if (username.toLowerCase() === "management") {
      role = "Management";
    } else if (username.toLowerCase() === "director") {
      role = "Director";
    } else if (username.toLowerCase() === "central_panel") {
      role = "Central Panel";
    }

    localStorage.setItem("role", role);
    localStorage.setItem("isLoggedIn", true);
    navigate("/dashboard");
    window.location.reload();
  };
  const handlePasswordVisibility = () => {
    setpswdVisibility(!pswdVisiblity);
  };

  return (
    <div className="login-bg w-100 h-100vh p-5 d-flex justify-content-center align-items-center w-100">
      <div
        className="white-bg w-100 h-fill login-box-shadow rounded-4 flex-between"
        style={{ maxWidth: "1000px" }}
      >
        <div className="w-50 pt-3 h-fill position-relative d-flex justify-content-center">
          <div className="ps-4 pe-5 flex-column px-5 w-75">
            <div className="welcome-font">WELCOME</div>
            <div className="black-text white-space">
              We are Glad to see you back with us
            </div>
            <div className="py-4">
              <div className="d-flex align-items-center input-bg loginbox-radius mt-2 px-2">
                <img
                  className="icon-img"
                  alt="iconimg"
                  src={Images.loginUserImages}
                />
                <input
                  className="input-css"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {error && (
                <div className="small-font text-danger mt-1">{error}</div>
              )}
              <div className="d-flex align-items-center input-bg loginbox-radius mt-2 px-2">
                <img
                  className="icon-img"
                  alt="iconimg"
                  src={Images.loginUserLock}
                ></img>
                <input
                  className="input-css"
                  type={pswdVisiblity ? "text" : "password"}
                  placeholder="Password"
                />
                <span onClick={handlePasswordVisibility}>
                  {pswdVisiblity ? (
                    <IoEyeOffOutline />
                  ) : (
                    <MdOutlineRemoveRedEye />
                  )}
                </span>
              </div>
              <button className="orange-btn mt-3 w-100" onClick={handleLogin}>
                Submit
              </button>
            </div>
          </div>
          <img
            src={Images.LoginImageOne}
            alt="loginone"
            className="loginimg w-100"
          />
        </div>
        <div className="w-50 pe-3 py-3 h-fill">
          <img
            src={Images.LoginImageTwo}
            alt="sportslogin"
            className="w-100 h-fill"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
