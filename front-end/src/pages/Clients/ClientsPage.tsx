import {
  Box,
  Typography,
  Stack,
  Snackbar,
  Slide,
  Alert,
  Button,
} from "@mui/material";
import ClientsTable from "./components/ClientsTable";
import UserMenu from "./components/UserMenu";
import { useEffect, useState } from "react";
import AddClient from "./components/AddClient";
import { Client } from "@/types";
import { createClient, getClients } from "../../services/clientService";
import { exportPDF } from "./components/ClientsReportPDF";

const ClientsPage = () => {
  const [rows, setRows] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("Mensagem de teste");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClients();
        setRows(data);
      } catch (err) {
        handleSnackbarOpen("Erro ao buscar clientes.", "error");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, [openSnackbar]);
  const handleSnackbarOpen = (
    message: string,
    severity: "success" | "error"
  ) => {
    setMessage(message);
    setSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleCreateClient = async (newClient: Omit<Client, "id">) => {
    try {
      const response = await createClient(newClient);
      handleSnackbarOpen(
        "Usuário " + response.name + " criado com sucesso.",
        "success"
      );
    } catch (error) {
      const errorMessage =
        (error instanceof Error && error.message) ||
        "Erro ao criar cliente. Tente novamente mais tarde.";

      handleSnackbarOpen(errorMessage, "error");
      console.error("Erro ao criar cliente:", errorMessage);
    }
  };

  const handleExportPDF = async () => {
    setLoading(true);
    try {
      await exportPDF(rows);
    } catch (err) {
      handleSnackbarOpen("Erro ao gerar PDF: " + err, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      p={4}
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        slots={{ transition: Slide }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={severity}
          variant="filled"
          sx={{
            width: "100%",
            color: "#ffffff",
          }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h4">Clientes</Typography>
        <Stack direction="row" alignItems="center" spacing={2}>
          <AddClient onAdd={handleCreateClient} />
          <Button onClick={handleExportPDF}>Exportar PDF</Button>
          <UserMenu />
        </Stack>
      </Stack>
      <Box sx={{ flexGrow: 1 }}>
        <ClientsTable
          handleSnackbarOpen={handleSnackbarOpen}
          rows={rows}
          setRows={setRows}
          loading={loading}
        />
      </Box>
    </Box>
  );
};

export default ClientsPage;
