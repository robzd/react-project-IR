import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { inserir, detalhar, atualizar } from "../services/api";
import { Jogador } from "../models/jogador";
import { TextField, Checkbox, Button, FormControlLabel } from "@mui/material";

export default function Formulario() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState<Omit<Jogador, "id">>({
    nome: "",
    nota: 0,
    ativo: false,
    foto: undefined,
  });

  useEffect(() => {
    if (isEdit && id) {
      detalhar(id).then((res) => {
        const { id: _, ...rest } = res.data;
        setForm(rest);
      });
    }
  }, [id, isEdit]);

  const handleSubmit = () => {
    if (isEdit && id) {
      atualizar(id, form).then(() => navigate("/")); // Remova o Number()
    } else {
      inserir(form).then(() => navigate("/"));
    }
  };

  return (
    <div style={{ padding: "15px", alignItems: "center" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <TextField
          label="Nome"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
        />
        <TextField
          label="Nota"
          type="number"
          value={form.nota}
          onChange={(e) => setForm({ ...form, nota: +e.target.value })}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={form.ativo}
              onChange={(e) => setForm({ ...form, ativo: e.target.checked })}
            />
          }
          label="Ativo"
        />
        <Button
          component="label"
          variant="contained"
          size="medium"
          color="secondary"
        >
          Upar Foto
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => {
                setForm({ ...form, foto: reader.result as string });
              };
              reader.readAsDataURL(file);
            }}
          />
        </Button>

        <Button type="submit" variant="contained" size="large">
          {isEdit ? "Atualizar" : "Inserir"}
        </Button>
      </form>
    </div>
  );
}
