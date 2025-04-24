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
  onDelete: (clientId: number) => Promise<void>;
}

export default function DeleteClient({ client, onDelete }: DeleteClientProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await onDelete(client.id);
    setOpen(false);
    setLoading(false);
  }

  return (
    <div>
      <IconButton
        aria-label="Excluir cliente"
        title="Excluir cliente"
        size="small"
        onClick={() => setOpen(true)}
        color="error"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <p>Tem certeza que deseja excluir o cliente "{client.name}"?</p>
          {loading && <CircularProgress />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={loading}>
            Cancelar
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            disabled={loading}
          >
            {loading ? "Excluindo..." : "Excluir"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
