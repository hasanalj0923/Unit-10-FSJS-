// src/context/UserContext.jsx
import { createContext, useState } from "react";
import { api } from "../utils/apiHelper";
import Cookies from "js-cookie";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  // Load user from cookie if available
  const cookie = Cookies.get("authenticatedUser");
  const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);

  /**
   * signIn
   * credentials = { emailAddress, password }
   * Returns { user, errors } for consistent error handling
   */
  const signIn = async (credentials) => {
    try {
      const response = await api({ path: "users", method: "GET", credentials });

      if (response.status === 200) {
        let user = await response.json();
        // Store password temporarily if needed for API auth
        user = { ...user, password: credentials.password };
        setAuthUser(user);
        Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
        return { user, errors: [] };
      } else if (response.status === 401) {
        return { user: null, errors: ["Email or password is incorrect"] };
      } else {
        throw new Error("Unexpected error during sign in");
      }
    } catch (error) {
      console.error("SignIn error:", error);
      return { user: null, errors: ["Unexpected error during sign in"] };
    }
  };

  /**
   * signOut
   * Clears auth state and removes cookie
   */
  const signOut = () => {
    setAuthUser(null);
    Cookies.remove("authenticatedUser");
  };

  return (
    <UserContext.Provider value={{ authUser, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};
