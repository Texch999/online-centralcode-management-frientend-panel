import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage?.clear();
    window.location.reload();
  };
  return (
    <div className="header flex-between">
      <h1 onClick={() => navigate("/")}>Header</h1>
      <h1 onClick={() => navigate("/about")}>About</h1>
      <h1 onClick={handleLogout}>Logout</h1>
    </div>
  );
}

export default Header;
