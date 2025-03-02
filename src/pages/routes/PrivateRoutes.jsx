import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("jwt_token");
  const role = localStorage.getItem("role_name");

  if (!token || !role) {
    localStorage.clear();
    return <Navigate to="/master/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
