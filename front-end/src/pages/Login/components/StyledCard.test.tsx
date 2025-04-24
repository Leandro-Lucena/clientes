import { render, screen } from "@testing-library/react";
import { StyledCard } from "./StyledCard";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

describe("StyledCard", () => {
  it("Deve aplicar o boxShadow corretamente", () => {
    render(
      <ThemeProvider theme={theme}>
        <StyledCard data-testid="styled-card">Conteúdo do cartão</StyledCard>
      </ThemeProvider>
    );

    const card = screen.getByTestId("styled-card");

    expect(card).toHaveStyle(
      "box-shadow: hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px,hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px"
    );
  });

  it("Deve aplicar o padding corretamente", () => {
    render(
      <ThemeProvider theme={theme}>
        <StyledCard data-testid="styled-card">Conteúdo do cartão</StyledCard>
      </ThemeProvider>
    );

    const card = screen.getByTestId("styled-card");

    expect(card).toHaveStyle(`padding: ${theme.spacing(4)}`);
  });
});
