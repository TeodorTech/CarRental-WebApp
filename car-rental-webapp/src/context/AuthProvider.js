import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const data = JSON.parse(window.localStorage.getItem("userCredentials")) || {};
  const [auth, setAuth] = useState(data);

  useEffect(() => {
    window.localStorage.setItem("userCredentials", JSON.stringify(auth));
  }, [auth]);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
