import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { perfil } from "../services/api";
import { Jogador } from "../models/jogador";
import { Box } from "@mui/material";
import { NavBar } from "./NavBar";

export default function Perfil() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Jogador | null>(null);

  useEffect(() => {
    perfil(String(id)).then((res) => setItem(res.data));
  }, [id]);

  if (!item) return <div>Carregando…</div>;
  return (
    <div style={{ padding: "15px" }}>
      <NavBar />
      <h2>{item.nome}</h2>
      <Box
        component="img"
        style={{ width: 500, height: 500, objectFit: "cover" }}
        alt={`Foto do jogador ${item.nome}`}
        src={item.foto}
      />
    </div>
  );
}
