import { useEffect, useState } from "react";
import { listar, remover } from "../services/api";
import { Jogador } from "../models/jogador";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Listagem() {
  
  const [items, setItems] = useState<Jogador[]>([]);

  useEffect(() => {
    listar().then((res) => setItems(res.data));
  }, []);

  const handleDelete = (id: string) => {
    // Mude de `number` para `string`
    if (window.confirm("Confirma exclusão?")) {
      remover(id).then(() => setItems(items.filter((i) => i.id !== id)));
    }
  };

  return (
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
        {items.map((i) => (
          <TableRow key={i.id}>
            <TableCell>{i.nome}</TableCell>
            <TableCell>{i.nota}</TableCell>
            <TableCell>{i.ativo ? "Sim" : "Não"}</TableCell>
            <TableCell>
              <Button component={Link} to={`/detalhe/${i.id}`}>
                Ver
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
  );
}
