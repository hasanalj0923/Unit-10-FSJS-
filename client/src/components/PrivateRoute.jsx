// src/components/PrivateRoute.jsx
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

/**
 * PrivateRoute Component
 *
 * Protects routes that require authentication.
 * - Renders child routes via <Outlet /> if user is authenticated.
 * - Redirects unauthenticated users to /signin.
 * - Preserves intended path for redirect after sign-in.
 */
const PrivateRoute = () => {
  const { authUser } = useContext(UserContext);
  const location = useLocation();

  if (!authUser) {
    // Redirect to sign-in page, saving current location
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
