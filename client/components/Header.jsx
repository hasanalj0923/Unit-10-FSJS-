// src/components/Header.jsx
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

/**
 * Header Component
 *
 * Renders the top navigation bar.
 * - Shows "Sign In" and "Sign Up" links if no user is authenticated.
 * - Shows the authenticated user's name and a "Sign Out" button if logged in.
 * - Handles sign out and redirects to homepage.
 */
const Header = () => {
  const { authUser, signOut } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();       // Clear user from global state
    navigate("/");   // Redirect to homepage after signing out
  };

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          {authUser ? (
            <ul className="header--signedin">
              <li>Welcome, {authUser.firstName} {authUser.lastName}!</li>
              <li>
                <button onClick={handleSignOut} className="signout-button">
                  Sign Out
                </button>
              </li>
            </ul>
          ) : (
            <ul className="header--signedout">
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/signin">Sign In</Link></li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
