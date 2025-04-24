import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Client } from "@/types";
import { getClients } from "../../../services/clientService";
import DeleteClient from "./DeleteClient";

export default function ClientsTable() {
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
  }, []);

  const handleDeleteClient = async (clientId: number) => {
    // await deleteClient(clientId);
    // Atualiza o estado removendo o cliente da lista
    setRows((prev) => prev.filter((client) => client.id !== clientId));
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
        <DeleteClient client={params.row} onDelete={handleDeleteClient} />
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
      />
    </Paper>
  );
}
