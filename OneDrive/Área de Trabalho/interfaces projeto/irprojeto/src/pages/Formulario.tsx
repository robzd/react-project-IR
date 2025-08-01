import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { inserir, detalhar, atualizar } from "../services/api";
import { Jogador } from "../models/jogador";
import { TextField, Checkbox, Button, FormControlLabel, Box } from "@mui/material";
import { NavBar } from "./NavBar";

type FormData = Omit<Jogador, "id">;

export default function Formulario() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { nome: " ", nota: 0, ativo: false, foto: undefined },
  });

  useEffect(() => {
    if (isEdit && id) {
      detalhar(id).then((res) => {
        const { id: _, ...data } = res.data;
        reset(data);
      });
    }
  }, [id, isEdit, reset]);

  

  const onSubmit = async (data: FormData) => {
    try {
      if (isEdit && id) {
        await atualizar(id, data);
      } else {
        await inserir(data);
      }
      navigate("/");
    } catch (err) {
      setError("nome", { type: "manual", message: "Erro ao salvar dados" });
    }
  };

  const fotoValue = watch("foto");

  return (
    <Box p={3}>
      <NavBar />
      <Box mt={4} component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>

        <TextField
          label="Nome"
          {...register("nome", { 
            required: "Nome é obrigatório",
            minLength: {
              value: 4,
              message: "Mínimo 4 caracteres",
            },
          })}
          error={!!errors.nome}
          helperText={errors.nome?.message}
        />

        <TextField
          label="Nota"
          type="number"
          {...register("nota", {
            required: "Nota é obrigatória",
            min: { value: 0, message: "Mínimo 0" },
            max: { value: 100, message: "Máximo 100" },
          })}
          error={!!errors.nota}
          helperText={errors.nota?.message}
        />

        <FormControlLabel
          control={<Checkbox {...register("ativo")} checked={watch("ativo")} />}
          label="Ativo"
        />

        <Button component="label" variant="contained" color="secondary">
          Upar Foto
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => setValue("foto", reader.result as string);
              reader.readAsDataURL(file);
            }}
          />
        </Button>

        {fotoValue && (
          <Box
            component="img"
            src={fotoValue}
            alt="preview"
            sx={{ width: 56, height: 56, borderRadius: '50%' }}
          />
        )}

        <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
          {isEdit ? "Atualizar" : "Inserir"}
        </Button>
      </Box>
    </Box>
  );
}
