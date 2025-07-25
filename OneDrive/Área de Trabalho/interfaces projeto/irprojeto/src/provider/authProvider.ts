import axios from "axios";
import { createContext, createElement, ReactNode, useContext, useEffect, useMemo, useState } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext <AuthContextType>({ token: null, setToken: () => {} });

interface AuthProviderProps {
  children: ReactNode;
}


export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken_] = useState<string | null>(
    localStorage.getItem("token interfaces")
  );

  const setToken = (newToken: string | null) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token interfaces", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token interfaces");
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({ token, setToken }),
    [token]
  );

  return createElement(
    AuthContext.Provider,
    { value: contextValue },
    children
  );
};

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};