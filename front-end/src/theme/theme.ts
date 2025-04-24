import { createTheme, Theme } from "@mui/material/styles";

export const lightTheme: Theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#9c27b0" },
  },
  typography: { fontFamily: "Roboto, sans-serif" },
});

export const darkTheme: Theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#1976d2" },
    secondary: { main: "#9c27b0" },
  },
  typography: { fontFamily: "Roboto, sans-serif" },
});
