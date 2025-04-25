import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AddClient from "./AddClient";

describe("AddClient", () => {
  const mockOnAdd = jest.fn().mockResolvedValue(undefined);

  const renderWithTheme = () => {
    const theme = createTheme();
    return render(
      <ThemeProvider theme={theme}>
        <AddClient onAdd={mockOnAdd} />
      </ThemeProvider>
    );
  };

  it("Renderiza botão e abre o dialog ao clicar", () => {
    renderWithTheme();
    const button = screen.getByRole("button", { name: /novo cliente/i });
    fireEvent.click(button);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/adicionar cliente/i)).toBeInTheDocument();
  });

  it("Exibe mensagens de erro ao tentar submeter com campos vazios", async () => {
    renderWithTheme();
    fireEvent.click(screen.getByRole("button", { name: /novo cliente/i }));
    fireEvent.click(screen.getByRole("button", { name: /adicionar/i }));

    expect(await screen.findByText(/nome é obrigatório/i)).toBeInTheDocument();
    expect(screen.getByText(/email é obrigatório/i)).toBeInTheDocument();
    expect(screen.getByText(/telefone é obrigatório/i)).toBeInTheDocument();
    expect(screen.getByText(/endereço é obrigatório/i)).toBeInTheDocument();
  });

  it("Chama onAdd com dados válidos", async () => {
    renderWithTheme();
    fireEvent.click(screen.getByRole("button", { name: /novo cliente/i }));

    fireEvent.change(screen.getByLabelText(/nome/i), {
      target: { value: "João" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "joao@email.com" },
    });
    fireEvent.change(screen.getByLabelText(/telefone/i), {
      target: { value: "999999999" },
    });
    fireEvent.change(screen.getByLabelText(/endereço/i), {
      target: { value: "Rua A" },
    });

    fireEvent.click(screen.getByRole("button", { name: /adicionar/i }));

    await waitFor(() => {
      expect(mockOnAdd).toHaveBeenCalledWith({
        name: "João",
        email: "joao@email.com",
        phone: "999999999",
        address: "Rua A",
      });
    });
  });
});
