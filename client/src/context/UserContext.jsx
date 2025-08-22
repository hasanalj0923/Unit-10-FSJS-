import { createContext, useState } from "react";
import { api } from "../utils/apiHelper";
import Cookies from "js-cookie";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const cookie = Cookies.get("authenticatedUser");
  const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);

  const signIn = async (credentials) => {
    try {
      const response = await api({ path: "users", method: "GET", credentials });

      if (response.status === 200) {
        let user = await response.json();
        user = { ...user, password: credentials.password };
        setAuthUser(user);
        Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
        return user;
      } else if (response.status === 401) {
        return null;
      } else {
        throw new Error("Unexpected error during sign in");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

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
