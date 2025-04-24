import { Box, Button, Typography, Stack } from "@mui/material";
import ClientsTable from "./components/ClientsTable";
import UserMenu from "./components/UserMenu";

const ClientsPage = () => {
  return (
    <Box
      p={4}
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h4">Clientes</Typography>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button variant="contained">Novo Cliente</Button>
          <UserMenu />
        </Stack>
      </Stack>
      <Box sx={{ flexGrow: 1 }}>
        <ClientsTable />
      </Box>
    </Box>
  );
};

export default ClientsPage;
