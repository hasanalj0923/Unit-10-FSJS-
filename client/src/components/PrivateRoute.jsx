import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

/**
 * PrivateRoute component protects routes that require authentication.
 * If a user is signed in, it renders the child route(s) via <Outlet />.
 * If no user is authenticated, it redirects to the sign-in page.
 *
 * Usage:
 *  - Wrap protected routes in <Route element={<PrivateRoute />}> in App.jsx
 *
 * @component
 * @returns {JSX.Element} The protected route or a redirect to "/signin"
 */
const PrivateRoute = () => {
  const { authUser } = useContext(AuthContext);
  return authUser ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
