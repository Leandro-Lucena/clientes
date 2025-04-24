import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ColorModeContext } from "../../theme/ColorModeContext";
import { login } from "../../services/authService";
import { FormEvent, useContext, useState } from "react";
import { LoginSnackbarError } from "./components/LoginSnackbarError";
import { SignInContainer } from "./components/SignInContainer";
import { StyledCard } from "./components/StyledCard";
import { ThemeSwitch } from "../../components/ThemeSwitch";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validateInputs();
    if (!isValid) return;

    const data = new FormData(event.currentTarget);

    const username = data.get("username") as string;
    const password = data.get("password") as string;

    try {
      await login(username, password);
      navigate("/clients");
    } catch (error: any) {
      setSnackbarMessage("Erro ao fazer login: " + error.message);
      setOpenSnackbar(true);
    }
  };

  const validateInputs = () => {
    const username = document.getElementById("username") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (!username.value) {
      setUsernameError(true);
      setUsernameErrorMessage("Campo de usuário obrigatório.");
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage("");
    }

    if (!password.value) {
      setPasswordError(true);
      setPasswordErrorMessage("Campo de senha obrigatório.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <LoginSnackbarError
        open={openSnackbar}
        message={snackbarMessage}
        onClose={() => setOpenSnackbar(false)}
      />
      <StyledCard variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{
            width: "100%",
            fontSize: "clamp(2rem, 10vw, 2.15rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Login
          <ThemeSwitch checked={mode === "dark"} onChange={toggleColorMode} />
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
            mt: 1,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="username">Usuário</FormLabel>
            <TextField
              error={usernameError}
              helperText={usernameErrorMessage}
              id="username"
              name="username"
              placeholder="admin"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={usernameError ? "error" : "primary"}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Senha</FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              id="password"
              name="password"
              placeholder="•••••"
              type="password"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
          >
            Entrar
          </Button>
        </Box>
      </StyledCard>
    </SignInContainer>
  );
}
