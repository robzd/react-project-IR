import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { detalhar } from "../services/api";
import { Jogador } from "../models/jogador";
import { Card, CardContent, Typography } from "@mui/material";
import { NavBar } from "./NavBar";

export default function Detalhe() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Jogador | null>(null);

  useEffect(() => {
    detalhar(String(id)).then((res) => setItem(res.data));
  }, [id]);

  if (!item) return <div>Carregando…</div>;
  return (
    <div>
      <NavBar />
      <Card>
        <CardContent>
          <Typography>Nome: {item.nome}</Typography>
          <Typography>Valor: {item.nota}</Typography>
          <Typography>Ativo: {item.ativo ? "sim" : "nao"}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}
