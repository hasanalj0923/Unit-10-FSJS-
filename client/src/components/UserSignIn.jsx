import React, { useRef, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const UserSignIn = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errors, setErrors] = useState([]);

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
