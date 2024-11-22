import React from "react";
import { useNavigate } from "react-router-dom";
import { Images } from "../images";

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage?.clear();
    window.location.reload();
  };
  return (
    <div className="header flex-between px-2 py-1">
      <div>
        <img className="logo-img me-5" src={Images?.S7Logo} alt="Logo" />
        <input className="input-css small-font" placeholder="Search Here..." />
      </div>
      <div className="d-flex">
        <div className="small-font">Vendor Registration and List</div>
      </div>
    </div>
  );
}

export default Header;
