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
        style={{ marginTop: "25px" }}
      />
      <TextField
        label="Nota"
        type="number"
        value={form.nota}
        onChange={(e) => setForm({ ...form, nota: +e.target.value })}
        style={{ marginTop: "25px" }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={form.ativo}
            onChange={(e) => setForm({ ...form, ativo: e.target.checked })}
          />
        }
        label="Ativo"
        sx={{
          display: "flex",
          alignItems: "center", // alinha checkbox + label no meio da linha
          mt: 3, // margem-top equivalente a 24px (3 * 8px)
        }}
      />
      <Button
        type="submit"
        variant="contained"
        style={{ marginTop: "25px", height: "56px" }}
      >
        {isEdit ? "Atualizar" : "Inserir"}
      </Button>
    </form>
  );
}
