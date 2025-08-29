import React, { useRef, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

/**
 * UserSignIn component renders a sign-in form for users to log in to the app.
 * It uses AuthContext to authenticate the user and navigate to the course list on success.
 *
 * Features:
 *  - Collects email and password input using refs
 *  - Displays validation errors if sign-in fails
 *  - Redirects to home page upon successful sign-in
 *  - Provides a cancel link to navigate back to the course list
 *  - Provides a link to the sign-up page for new users
 *
 * @component
 * @returns {JSX.Element} Sign-in form with validation and navigation
 */
const UserSignIn = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errors, setErrors] = useState([]);

  /**
   * Handles form submission to sign in a user.
   * Calls the signIn method from AuthContext and navigates or sets errors based on result.
   *
   * @param {React.FormEvent} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const credentials = {
      emailAddress: emailRef.current.value,
      password: passwordRef.current.value,
    };

    const user = await signIn(credentials);
    if (user) navigate('/');
    else setErrors(['Sign in failed. Check email and password.']);
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        {errors.length > 0 && (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>{errors.map((err, i) => <li key={i}>{err}</li>)}</ul>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor="emailAddress">Email Address</label>
          <input id="emailAddress" type="email" ref={emailRef} required />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" ref={passwordRef} required />
          <button className="button" type="submit">Sign In</button>
          <Link className="button button-secondary" to="/">Cancel</Link>
        </form>
        <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
      </div>
    </main>
  );
};

export default UserSignIn;
