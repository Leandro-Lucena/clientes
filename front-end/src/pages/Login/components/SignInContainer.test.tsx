import { render, screen } from "@testing-library/react";
import { SignInContainer } from "./SignInContainer";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

describe("SignInContainer", () => {
  it("Deve ter altura mínima de 100%", () => {
    render(
      <ThemeProvider theme={theme}>
        <SignInContainer data-testid="sign-in-container">
          Conteúdo de teste
        </SignInContainer>
      </ThemeProvider>
    );

    const signInContainer = screen.getByTestId("sign-in-container");

    expect(signInContainer).toHaveStyle("min-height: 100%");
  });

  it("Deve aplicar o padding correto para telas pequenas", () => {
    render(
      <ThemeProvider theme={theme}>
        <SignInContainer data-testid="sign-in-container">
          Conteúdo de teste
        </SignInContainer>
      </ThemeProvider>
    );

    const signInContainer = screen.getByTestId("sign-in-container");

    expect(signInContainer).toHaveStyle(`padding: ${theme.spacing(2)}`);
  });
});
