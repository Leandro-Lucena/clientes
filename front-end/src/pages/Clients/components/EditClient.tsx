import { Client } from "@/types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  CircularProgress,
  TextField,
  Box,
  FormControl,
  FormLabel,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";

interface EditClientProps {
  client: Client;
  onEdit: (clientId: number, updatedClient: Partial<Client>) => Promise<void>;
}

export default function EditClient({ client, onEdit }: EditClientProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [addressError, setAddressError] = useState(false);
  const [addressErrorMessage, setAddressErrorMessage] = useState("");

  useEffect(() => {
    if (open) {
      setForm({
        name: client.name,
        email: client.email,
        phone: client.phone,
        address: client.address,
      });
    }
  }, [client.address, client.email, client.name, client.phone, open]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    switch (name) {
      case "name":
        setNameError(false);
        setNameErrorMessage("");
        break;
      case "email":
        setEmailError(false);
        setEmailErrorMessage("");
        break;
      case "phone":
        setPhoneError(false);
        setPhoneErrorMessage("");
        break;
      case "address":
        setAddressError(false);
        setAddressErrorMessage("");
        break;
    }
  };

  const validateInputs = () => {
    let isValid = true;

    if (!form.name) {
      setNameError(true);
      setNameErrorMessage("Nome é obrigatório.");
      isValid = false;
    }

    if (!form.email) {
      setEmailError(true);
      setEmailErrorMessage("Email é obrigatório.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      setEmailError(true);
      setEmailErrorMessage("Email inválido.");
      isValid = false;
    }

    if (!form.phone) {
      setPhoneError(true);
      setPhoneErrorMessage("Telefone é obrigatório.");
      isValid = false;
    }

    if (!form.address) {
      setAddressError(true);
      setAddressErrorMessage("Endereço é obrigatório.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const isValid = validateInputs();
    if (!isValid) return;

    setLoading(true);
    await onEdit(client.id, {
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
    });
    setOpen(false);
    setLoading(false);
  };

  return (
    <>
      <IconButton
        aria-label="Editar cliente"
        title="Editar cliente"
        size="small"
        onClick={() => setOpen(true)}
        color="primary"
      >
        <EditIcon fontSize="small" />
      </IconButton>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>Editar Cliente</DialogTitle>
          <DialogContent dividers>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
                mt: 1,
              }}
            >
              <FormControl>
                <FormLabel htmlFor="name">Nome</FormLabel>
                <TextField
                  error={nameError}
                  helperText={nameErrorMessage}
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  fullWidth
                  disabled={loading}
                  variant="outlined"
                  color={nameError ? "error" : "primary"}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  error={emailError}
                  helperText={emailErrorMessage}
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  fullWidth
                  disabled={loading}
                  variant="outlined"
                  color={emailError ? "error" : "primary"}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="phone">Telefone</FormLabel>
                <TextField
                  error={phoneError}
                  helperText={phoneErrorMessage}
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  fullWidth
                  disabled={loading}
                  variant="outlined"
                  color={phoneError ? "error" : "primary"}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="address">Endereço</FormLabel>
                <TextField
                  error={addressError}
                  helperText={addressErrorMessage}
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  fullWidth
                  disabled={loading}
                  rows={2}
                  variant="outlined"
                  color={addressError ? "error" : "primary"}
                />
              </FormControl>

              {loading && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress size={24} />
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpen(false)}
              disabled={loading}
              variant="outlined"
              color="inherit"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} variant="contained">
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
