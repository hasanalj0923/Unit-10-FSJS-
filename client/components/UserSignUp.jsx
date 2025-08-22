// src/components/UserSignUp.jsx
import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import ValidationErrors from "./ValidationErrors";

/**
 * UserSignUp Component
 *
 * Renders a form allowing new users to create an account.
 * Sends POST request to API and automatically signs in user.
 * Displays validation errors and redirects appropriately after signup.
 */
const UserSignUp = () => {
  const { signIn } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { firstName, lastName, emailAddress: email, password };

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.status === 400) {
        const data = await response.json();
        setErrors(data.errors || []);
        return;
      }

      if (response.status === 500) {
        navigate("/error");
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to create user: ${response.status}`);
      }

      // Automatically sign in the user after successful signup
      await signIn(email, password);

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
      <h2>Sign Up</h2>
      <ValidationErrors errors={errors} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

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

        <button type="submit" className="button">Sign Up</button>
        <button type="button" className="button button-secondary" onClick={handleCancel}>Cancel</button>
      </form>
    </main>
  );
};

export default UserSignUp;
