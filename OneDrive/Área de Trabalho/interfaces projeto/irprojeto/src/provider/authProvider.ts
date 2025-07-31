import axios from "axios";
import {
  createContext,
  createElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  username: string | null;
  setAuthUsername: (username: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  username: null,
  setAuthUsername: () => {},
});

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
  const [username, setAuthUsername_] = useState<string | null>(
    localStorage.getItem("username interfaces")
  );
  const setAuthUsername = (newUsername: string | null) => {
    setAuthUsername_(newUsername);
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

  useEffect(() => {
    if (username) {
      localStorage.setItem("username_interfaces", username);
    } else {
      localStorage.removeItem("username_interfaces");
    }
  }, [username]);

  const contextValue = useMemo(() => ({ token, setToken, username, setAuthUsername }), [token, username]);

  return createElement(AuthContext.Provider, { value: contextValue }, children);
};

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
