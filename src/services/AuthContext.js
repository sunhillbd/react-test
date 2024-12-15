"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AuthContext = createContext();

// Custom hook to access the token
export const useAuth = () => useContext(AuthContext);

// Provider component to manage the token globally
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  // Load token from localStorage when app starts
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  // Set new token and store it in localStorage
  const updateAuthToken = (token) => {
    setAuthToken(token);
    localStorage.setItem("authToken", token);
  };

  return (
    <AuthContext.Provider value={{ authToken, updateAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};
