import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginSnackbarError } from "./LoginSnackbarError";

describe("LoginSnackbarError", () => {
  it("Deve exibir a mensagem de erro quando aberto", async () => {
    const mockOnClose = jest.fn();
    render(
      <LoginSnackbarError
        open={true}
        message="Erro de login"
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText(/erro de login/i)).toBeInTheDocument();
  });

  it("Não deve exibir a mensagem quando o 'open' for false", async () => {
    const mockOnClose = jest.fn();
    render(
      <LoginSnackbarError
        open={false}
        message="Erro de login"
        onClose={mockOnClose}
      />
    );

    expect(screen.queryByText(/erro de login/i)).not.toBeInTheDocument();
  });

  it("Deve chamar onClose quando o alerta for fechado", async () => {
    const mockOnClose = jest.fn();
    render(
      <LoginSnackbarError
        open={true}
        message="Erro de login"
        onClose={mockOnClose}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /close/i }));

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });
});
