import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CustomBackground } from "./CustomBackground";

const theme = createTheme();

describe("CustomBackground", () => {
  it("Deve ter altura mínima de 100%", () => {
    render(
      <ThemeProvider theme={theme}>
        <CustomBackground data-testid="custom-background">
          Conteúdo de teste
        </CustomBackground>
      </ThemeProvider>
    );

    const customBackground = screen.getByTestId("custom-background");

    expect(customBackground).toHaveStyle("min-height: 100%");
  });

  it("Deve aplicar o padding correto para telas pequenas", () => {
    render(
      <ThemeProvider theme={theme}>
        <CustomBackground data-testid="custom-background">
          Conteúdo de teste
        </CustomBackground>
      </ThemeProvider>
    );

    const customBackground = screen.getByTestId("custom-background");

    expect(customBackground).toHaveStyle(`padding: ${theme.spacing(2)}`);
  });
});
