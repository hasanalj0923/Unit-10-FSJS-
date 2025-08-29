import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

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

  const signOut = () => setAuthUser(null);

  return (
    <AuthContext.Provider value={{ authUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
