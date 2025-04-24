import { render } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material";
import { ThemeSwitch } from "./ThemeSwitch";

test("Renderiza switch sem erro", () => {
  render(
    <ThemeProvider theme={createTheme()}>
      <ThemeSwitch />
    </ThemeProvider>
  );
});
