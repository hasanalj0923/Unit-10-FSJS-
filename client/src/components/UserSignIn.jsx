// src/components/UserSignIn.jsx
import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import ValidationErrors from "./ValidationErrors";

/**
 * UserSignIn Component
 *
 * Renders a form allowing users to sign in with email and password.
 * Uses signIn method from UserContext.
 * Displays validation errors and redirects appropriately after sign in.
 */
const UserSignIn = () => {
  const { signIn } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn(email, password);

      if (result.errors) {
        setErrors(result.errors);
        return;
      }

      // Redirect back to previous page or homepage
      const from = location.state?.from?.pathname || "/";
      navigate(from);
    } catch (err) {
      console.error(err);
      navigate("/error");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <main className="wrap">
      <h2>Sign In</h2>
      <ValidationErrors errors={errors} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="emailAddress">Email Address</label>
        <input
          id="emailAddress"
          name="emailAddress"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="button">Sign In</button>
        <button type="button" className="button button-secondary" onClick={handleCancel}>Cancel</button>
      </form>
    </main>
  );
};

export default UserSignIn;
