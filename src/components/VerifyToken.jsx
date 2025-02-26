import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function VerifyToken() {
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");

    if (!token || !isValidJWT(token)) {
      handleInvalidToken();
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const isExpired = payload.exp * 1000 < Date.now();

      if (isExpired) {
        handleInvalidToken();
      } else {
        setIsValid(true);
      }
    } catch (error) {
      console.error("Invalid token format", error);
      handleInvalidToken();
    }
  }, [navigate]);

  const isValidJWT = (token) => {
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    try {
      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));

      return header && payload && typeof payload.exp === "number";
    } catch (error) {
      return false;
    }
  };

  const handleInvalidToken = () => {
    localStorage.removeItem("jwt_token");
    localStorage.setItem("isLoggedIn", "false");
    navigate("/master/login");
  };

  return isValid ? <div>Token is valid</div> : null;
}

export default VerifyToken;
