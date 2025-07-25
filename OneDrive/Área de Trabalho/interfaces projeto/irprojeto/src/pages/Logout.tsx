// src/routes/Logout.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const Logout: React.FC = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Para “deslogar”, limpamos o token
    setToken(null);
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const timer = setTimeout(handleLogout, 3 * 1000);
    return () => clearTimeout(timer);
  }, []);

  return <>Logout Page</>;
};

export default Logout;
