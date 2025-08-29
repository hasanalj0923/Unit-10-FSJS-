import React, { createContext, useState } from 'react';

/**
 * AuthContext provides global authentication state and methods.
 * Components wrapped in AuthProvider can access the authenticated user
 * and call signIn or signOut functions.
 */
export const AuthContext = createContext(null);

/**
 * AuthProvider component that manages authentication state and provides
 * signIn and signOut functions to children components via context.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - The child components wrapped by AuthProvider
 * @returns {JSX.Element} AuthContext.Provider with auth state and methods
 */
export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  /**
   * Signs in a user with the provided credentials.
   *
   * @async
   * @param {Object} credentials - User login credentials
   * @param {string} credentials.emailAddress - User's email address
   * @param {string} credentials.password - User's password
   * @returns {Object|null} The authenticated user data if successful, otherwise null
   */
  const signIn = async (credentials) => {
    const response = await fetch('http://localhost:5000/api/users', {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa(`${credentials.emailAddress}:${credentials.password}`)
      }
    });

    if (response.status === 200) {
      const data = await response.json();
      setAuthUser({ ...data, password: credentials.password });
      return data;
    } else if (response.status === 401) {
      return null;
    }
  };

  /**
   * Signs out the currently authenticated user by clearing auth state.
   */
  const signOut = () => setAuthUser(null);

  return (
    <AuthContext.Provider value={{ authUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
