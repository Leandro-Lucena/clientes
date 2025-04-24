import { Box, Typography, Stack, Snackbar, Slide, Alert } from "@mui/material";
import ClientsTable from "./components/ClientsTable";
import UserMenu from "./components/UserMenu";
import { useState } from "react";
import AddClient from "./components/AddClient";
import { Client } from "@/types";
import { createClient } from "../../services/clientService";

const ClientsPage = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("Mensagem de teste");
  const [severity, setSeverity] = useState<"success" | "error">("success");
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
      handleSnackbarOpen(
        "Erro ao criar cliente. Tente novamente mais tarde.",
        "error"
      );
      console.error("Erro ao criar cliente:", error);
      return;
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
          sx={{ width: "100%" }}
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
          <UserMenu />
        </Stack>
      </Stack>
      <Box sx={{ flexGrow: 1 }}>
        <ClientsTable handleSnackbarOpen={handleSnackbarOpen} />
      </Box>
    </Box>
  );
};

export default ClientsPage;
