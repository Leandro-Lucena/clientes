import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Client } from "@/types";
import { deleteClient, updateClient } from "../../../services/clientService";
import DeleteClient from "./DeleteClient";
import EditClient from "./EditClient";
import { alpha, useTheme } from "@mui/material";

interface ClientsTableProps {
  handleSnackbarOpen: (message: string, severity: "success" | "error") => void;
  rows: Client[];
  setRows: React.Dispatch<React.SetStateAction<Client[]>>;
  loading: boolean;
}

export default function ClientsTable({
  handleSnackbarOpen,
  rows,
  setRows,
  loading,
}: ClientsTableProps) {
  const theme = useTheme();
  const handleDeleteClient = async (clientId: number) => {
    try {
      const response = await deleteClient(clientId);
      setRows(rows.filter((row) => row.id !== clientId));
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
      const errorMessage =
        (error instanceof Error && error.message) ||
        "Erro ao editar cliente. Tente novamente mais tarde.";

      handleSnackbarOpen(errorMessage, "error");
      console.error("Erro ao editar cliente:", errorMessage);
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nome", flex: 2, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 2, minWidth: 100 },
    { field: "phone", headerName: "Telefone", flex: 1, minWidth: 100 },
    { field: "address", headerName: "Endereço", flex: 3, minWidth: 200 },
    {
      field: "edit",
      headerName: "Editar",
      width: 60,
      renderCell: (params: GridRenderCellParams) => (
        <EditClient client={params.row} onEdit={handleEditClient} />
      ),
    },
    {
      field: "delete",
      headerName: "Excluir",
      width: 65,
      renderCell: (params: GridRenderCellParams) => (
        <DeleteClient client={params.row} onDelete={handleDeleteClient} />
      ),
    },
  ];

  return (
    <Paper sx={{ height: "100%", width: "100%", background: "transparent" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        autoPageSize
        sx={{
          border: 1,
          backgroundColor: alpha(theme.palette.background.paper, 0.7),
          borderColor: "#444",
          borderRadius: 2,
        }}
        disableColumnMenu
        disableRowSelectionOnClick
        disableMultipleRowSelection
        getRowId={(row) => row.id}
        localeText={{
          paginationDisplayedRows: ({ from, to, count }) =>
            `${from} até ${to} de ${count}`,
        }}
      />
    </Paper>
  );
}
