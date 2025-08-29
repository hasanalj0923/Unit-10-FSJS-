import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const PrivateRoute = () => {
  const { authUser } = useContext(AuthContext);
  return authUser ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
