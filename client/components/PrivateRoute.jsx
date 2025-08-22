// src/components/PrivateRoute.jsx
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

/**
 * PrivateRoute Component
 *
 * Higher-order component to protect routes requiring authentication.
 * Renders child routes via <Outlet /> if user is authenticated.
 * Redirects unauthenticated users to /signin, preserving their intended path.
 */
const PrivateRoute = () => {
  const { authUser } = useContext(UserContext);
  const location = useLocation();

  if (!authUser) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
