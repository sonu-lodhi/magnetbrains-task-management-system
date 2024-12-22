import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

function AppContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(localStorage.getItem("Token"));

  const toggle = () => {
    setIsAuth(!isAuth);
  };

  const loginUser = (email, token) => {
    setEmail(email);
    setToken(token);
    setIsAuth(true);
    localStorage.setItem("token", token);
  };

  const logoutUser = () => {
    setEmail("");
    setToken(null);
    setIsAuth(false);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsAuth(true);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        isAuth,
        setIsAuth,
        toggle,
        loginUser,
        logoutUser,
        setToken,
        email,
        token,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
