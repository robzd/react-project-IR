// src/routes/Login.tsx
import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import axios from "axios";

const Login: React.FC = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const resp = await axios.get("/users", {
        baseURL: "http://localhost:3001",
        params: { username, password },
      });

      if (resp.data.length === 1) {
        // Encontrou usuário
        // Você poderia usar um JWT vindo do servidor, mas aqui
        // geramos um token dummy:
        const token = `token-${username}-${Date.now()}`;
        setToken(token);
        navigate("/", { replace: true });
      } else {
        setError("Usuário ou senha inválidos");
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao conectar ao servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 300,
        margin: "100px auto",
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 4,
      }}
    >
      <h3>Login</h3>

      <div style={{ marginBottom: 10 }}>
        <label>
          Usuário<br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>
          Senha<br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </label>
      </div>

      {error && (
        <div style={{ color: "red", marginBottom: 10 }}>{error}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{ width: "100%", padding: "8px 0" }}
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
};

export default Login;
