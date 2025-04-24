import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Client } from "@/types";
import {
  deleteClient,
  getClients,
  updateClient,
} from "../../../services/clientService";
import DeleteClient from "./DeleteClient";
import EditClient from "./EditClient";

interface ClientsTableProps {
  handleSnackbarOpen: (message: string, severity: "success" | "error") => void;
}

export default function ClientsTable({
  handleSnackbarOpen,
}: ClientsTableProps) {
  const [rows, setRows] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    getClients()
      .then((data) => {
        if (mounted) {
          setRows(data);
        }
      })
      .catch((err) => {
        handleSnackbarOpen(
          "Erro ao buscar clientes. Tente novamente mais tarde.",
          "error"
        );
        console.error("Erro ao buscar clientes:", err);
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [handleSnackbarOpen]);

  const handleDeleteClient = async (clientId: number) => {
    try {
      const response = await deleteClient(clientId);
      handleSnackbarOpen(response.message, "success");
    } catch (error) {
      handleSnackbarOpen(
        "Erro ao excluir cliente. Tente novamente mais tarde.",
        "error"
      );
      console.error("Erro ao excluir cliente:", error);
      return;
    }
  };

  const handleEditClient = async (
    clientId: number,
    updatedClient: Partial<Client>
  ) => {
    try {
      const response = await updateClient(clientId, updatedClient);
      handleSnackbarOpen(
        "Usuário " + response.name + " editado com sucesso.",
        "success"
      );
    } catch (error) {
      handleSnackbarOpen(
        "Erro ao editar cliente. Tente novamente mais tarde.",
        "error"
      );
      console.error("Erro ao editar cliente:", error);
      return;
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nome", flex: 2, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 2, minWidth: 100 },
    { field: "phone", headerName: "Telefone", flex: 1, minWidth: 100 },
    { field: "address", headerName: "Endereço", flex: 3, minWidth: 200 },
    {
      field: "actions",
      headerName: "Ações",
      type: "actions",
      sortable: false,
      filterable: false,
      width: 80,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <EditClient client={params.row} onEdit={handleEditClient} />
          <DeleteClient client={params.row} onDelete={handleDeleteClient} />
        </>
      ),
    },
  ];

  return (
    <Paper sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        autoPageSize
        sx={{ border: 0 }}
        disableColumnMenu
        localeText={{
          paginationDisplayedRows: ({ from, to, count }) =>
            `${from} até ${to} de ${count}`,
        }}
      />
    </Paper>
  );
}
