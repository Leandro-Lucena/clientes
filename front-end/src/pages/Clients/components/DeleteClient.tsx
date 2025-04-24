import { Client } from "@/types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

interface DeleteClientProps {
  client: Client;
  onDelete: (clientId: number) => void;
}

export default function DeleteClient({ client, onDelete }: DeleteClientProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      onDelete(client.id);
      setOpen(false);
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <div>
      {/* Botão de exclusão que abrirá o diálogo */}
      <IconButton
        aria-label="excluir"
        size="small"
        onClick={() => setOpen(true)}
        color="error"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>

      {/* Caixa de diálogo de confirmação */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <p>Tem certeza que deseja excluir o cliente "{client.name}"?</p>
          {loading && <CircularProgress />}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            color="secondary"
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="primary" disabled={loading}>
            {loading ? "Excluindo..." : "Excluir"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
