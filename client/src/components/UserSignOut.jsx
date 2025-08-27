// src/components/UserSignOut.jsx
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

/**
 * UserSignOut Component
 *
 * Signs out the authenticated user by clearing their credentials.
 * Redirects to the homepage immediately after signing out.
 */
const UserSignOut = () => {
  const { signOut } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear authenticated user data from global context
    signOut();
    // Redirect to homepage
    navigate("/");
  }, [signOut, navigate]);

  return (
    <main className="wrap">
      <h2>Signing Out...</h2>
      <p>You are being signed out. Redirecting to the homepage.</p>
    </main>
  );
};

export default UserSignOut;
