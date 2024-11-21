import React from "react";
import { Images } from "../images";

function Login() {
  return (
    <div className="login-bg w-100 h-100vh p-5">
      <div className="white-bg w-100 h-fill login-box-shadow rounded-4 flex-between ">
        <div className="w-50 pt-3 h-fill position-relative">
          <div className="ps-4 pe-5 flex-column">
            <div className="welcome-font">WELCOME</div>
            <div className="black-text">
              We are Glad to see you back with us
            </div>
            <div className="py-4">
              <input className="input-css mt-2" placeholder="Username" />
              <input className="input-css mt-2" placeholder="Password" />
              <button className="orange-btn mt-3 w-100">Submit</button>
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
