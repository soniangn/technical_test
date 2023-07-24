import React, { createContext, useContext, useMemo, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);

  const dispatchAPI = async (route, method, body) => {
    try {
      const result = await fetch(`http://localhost:5000/${route}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body
      });
      return result
    } catch (e) {
      console.error(e);
      throw new Error(e).message;
    };
  };

  const login = async (user) => {
    try {
      const response = await fetch('http://localhost:5000/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })

    const data = await response.json()
    const userToken = data.token;

    if (userToken) {
      localStorage.setItem('token', JSON.stringify(userToken))
      setAuth(true);
    } 
    
    return data
    } catch (e) {
      console.error(e);
      throw new Error(e).message;
    };
  }

  const logout = () => {
    setAuth(false);
  };

  const value = useMemo(() => ({
    auth,
    login,
    logout,
    dispatchAPI
  }),
  [auth]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
}