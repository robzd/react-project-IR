import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import axios from "axios";
import { useForm } from "react-hook-form";

type LoginFormData = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const { setToken, setAuthUsername } = useAuth();
  const navigate = useNavigate();

  // Configuração do react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError: setFormError,
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const resp = await axios.get("/users", {
        baseURL: "http://localhost:3001",
        params: {
          username: data.username,
          password: data.password,
        },
      });

      if (resp.data.length === 1) {
        // Autenticação bem-sucedida
        const token = `token-${data.username}`;
        setToken(token);
        setAuthUsername(data.username);
        navigate("/", { replace: true });
      } else {
        setFormError("root", {
          type: "manual",
          message: "Usuário ou senha inválidos",
        });
      }
    } catch (err) {
      console.error(err);
      setFormError("root", {
        type: "manual",
        message: "Erro ao conectar ao servidor",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
          Usuário
          <br />
          <input
            type="text"
            {...register("username", {
              required: "Usuário é obrigatório",
              minLength: {
                value: 3,
                message: "Mínimo 3 caracteres",
              },
            })}
            style={{ width: "100%" }}
          />
        </label>
        {errors.username && (
          <div style={{ color: "red", fontSize: 12 }}>
            {errors.username.message}
          </div>
        )}
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>
          Senha
          <br />
          <input
            type="password"
            {...register("password", {
              required: "Senha é obrigatória",
              minLength: {
                value: 4,
                message: "Mínimo 4 caracteres",
              },
            })}
            style={{ width: "100%" }}
          />
        </label>
        {errors.password && (
          <div style={{ color: "red", fontSize: 12 }}>
            {errors.password.message}
          </div>
        )}
      </div>

      {errors.root && (
          //Usuário ou senha inválidos OU Erro ao conectar ao servidor
        <div style={{ color: "red", marginBottom: 10 }}>
          {errors.root.message} 
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        style={{ width: "100%", padding: "8px 0" }}
      >
        {isSubmitting ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
};

export default Login;
