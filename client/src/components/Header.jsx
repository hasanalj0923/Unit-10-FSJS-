import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const Header = () => {
  const { authUser, signOut } = useContext(AuthContext);

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          {authUser ? (
            <>
              <span>
                Welcome, {authUser.firstName} {authUser.lastName}!{' '}
              </span>
              <Link
                className="signout"
                to="/"
                onClick={signOut}
                style={{ marginLeft: '10px' }}
              >
                Sign Out
              </Link>
            </>
          ) : (
            <>
            <Link className="signup" to="/signup" style={{ marginRight: '10px' }}>
              Sign Up
            </Link>
            <Link className="signin" to="/signin">
              Sign In
            </Link>
          </>
          
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
