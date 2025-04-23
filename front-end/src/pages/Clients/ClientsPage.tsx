import { Box, Button, Typography } from "@mui/material";
import ClientsTable from "./ClientsTable";

const ClientsPage = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Clientes
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }}>
        Novo Cliente
      </Button>
      <ClientsTable />
    </Box>
  );
};

export default ClientsPage;
