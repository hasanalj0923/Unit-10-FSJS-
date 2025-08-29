import React, { useRef, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

/**
 * UserSignUp component renders a sign-up form for new users.
 * It sends user data to the API to create a new account and
 * automatically signs in the user upon successful registration.
 *
 * Features:
 *  - Collects first name, last name, email, and password input using refs
 *  - Displays validation errors if sign-up fails
 *  - Automatically signs in and redirects to home page upon successful registration
 *  - Provides a cancel link to navigate back to the course list
 *  - Provides a link to the sign-in page for existing users
 *
 * @component
 * @returns {JSX.Element} Sign-up form with validation and navigation
 */
const UserSignUp = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [errors, setErrors] = useState([]);

  /**
   * Handles form submission to register a new user.
   * Sends a POST request to the API and signs in the user on success.
   *
   * @param {React.FormEvent} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const newUser = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      emailAddress: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (response.status === 201) {
        await signIn({ emailAddress: newUser.emailAddress, password: newUser.password });
        navigate('/');
      } else if (response.status === 400) {
        const data = await response.json();
        setErrors(data.errors || ['Validation failed']);
      } else {
        throw new Error('Sign up failed');
      }
    } catch (err) {
      console.error(err);
      setErrors([err.message]);
    }
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>
        {errors.length > 0 && (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>{errors.map((err, i) => <li key={i}>{err}</li>)}</ul>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" type="text" ref={firstNameRef} required />
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" type="text" ref={lastNameRef} required />
          <label htmlFor="emailAddress">Email Address</label>
          <input id="emailAddress" type="email" ref={emailRef} required />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" ref={passwordRef} required />
          <button className="button" type="submit">Sign Up</button>
          <Link className="button button-secondary" to="/">Cancel</Link>
        </form>
        <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
        </div>
    </main>
  );
};

export default UserSignUp;
