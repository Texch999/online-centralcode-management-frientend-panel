import React from "react";
import { Images } from "../images";

function Login() {
  return (
    <div className="login-bg w-100 h-100vh p-5 d-flex justify-content-center align-items-center w-100">
      <div
        className="white-bg w-100 h-fill login-box-shadow rounded-4 flex-between"
        style={{ maxWidth: "1000px" }}
      >
        <div className="w-50 pt-3 h-fill position-relative d-flex justify-content-center">
          <div className="ps-4 pe-5 flex-column px-5 w-75">
            <div className="welcome-font">WELCOME</div>
            <div className="black-text">
              We are Glad to see you back with us
            </div>
            <div className="py-4">
              <div className="d-flex align-items-center input-bg loginbox-radius my-2 px-2">
                <img
                  className="icon-img"
                  alt="iconimg"
                  src={Images.loginUserImages}
                ></img>
                <input
                  className="input-css black-text"
                  placeholder="Username"
                />
              </div>
              <div className="d-flex align-items-center input-bg loginbox-radius my-2 px-2">
                <img
                  className="icon-img"
                  alt="iconimg"
                  src={Images.loginUserLock}
                ></img>
                <input
                  className="input-css black-text"
                  placeholder="Password"
                />
              </div>
              <button className="orange-btn mt-3 w-100">Sign In</button>
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
