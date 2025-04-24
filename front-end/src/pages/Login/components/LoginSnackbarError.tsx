import { Snackbar, Alert, Slide } from "@mui/material";

interface LoginSnackbarErrorProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

export function LoginSnackbarError({
  open,
  message,
  onClose,
}: LoginSnackbarErrorProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      slots={{ transition: Slide }}
    >
      <Alert
        onClose={onClose}
        severity="error"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
