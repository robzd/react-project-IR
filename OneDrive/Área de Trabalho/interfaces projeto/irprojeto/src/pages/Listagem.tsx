import { useEffect, useState } from "react";
import { listar, remover } from "../services/api";
import { Jogador } from "../models/jogador";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

export default function Listagem() {
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { username } = useAuth();

  useEffect(() => {
    listar().then((res) => setJogadores(res.data));
  }, []);

  const jogadoresfiltrados = jogadores.filter(i => {
    const q = searchQuery.trim().toLowerCase();
    const nomeJogador = i.nome.toLowerCase().includes(q);
    const notaJogador = i.nota.toString().includes(q);
    const ativoJogador = (q === 'sim' && i.ativo) || ((q === 'nao' || q === 'não') && !i.ativo);
    return nomeJogador || notaJogador || ativoJogador;
  });

  const handleDelete = (id: string) => {
    // Mude de `number` para `string`
    if (window.confirm("Confirma exclusão?")) {
      remover(id).then(() =>
        setJogadores(jogadores.filter((i) => i.id !== id))
      );
    }
  };

  return (
    <div style={{ padding: "15px" }}>
      <div style={{ marginTop: "25px" }}>
        <h3> Bem-vindo, {username} </h3>
        <TextField
          id="outlined-basic"
          label="Filtrar Jogador"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Ativo</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jogadoresfiltrados.map((i) => (
            <TableRow key={i.id}>
              <TableCell>{i.nome}</TableCell>
              <TableCell>{i.nota}</TableCell>
              <TableCell>{i.ativo ? "Sim" : "Nao"}</TableCell>
              <TableCell>
                <Button component={Link} to={`/detalhe/${i.id}`}>
                  Detalhar
                </Button>
                <Button component={Link} to={`/perfil/${i.id}`}>
                  Ver Foto
                </Button>
                <Button component={Link} to={`/editar/${i.id}`}>
                  Editar
                </Button>
                <Button
                  color="error"
                  onClick={() => {
                    if (i.id !== undefined) handleDelete(i.id);
                  }}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
