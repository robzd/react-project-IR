// src/routes/Logout.tsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const Logout: React.FC = () => {
  const { setToken, setAuthUsername } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    setAuthUsername(null);
    navigate("/", { replace: true });
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
