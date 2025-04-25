import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditClient from "./EditClient";
import { Client } from "@/types";

const mockClient: Client = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  phone: "123456789",
  address: "Rua Exemplo, 123",
};

const mockOnEdit = jest.fn().mockResolvedValue(undefined);

const renderComponent = () => {
  render(<EditClient client={mockClient} onEdit={mockOnEdit} />);
};

describe("EditClient", () => {
  beforeEach(() => {
    mockOnEdit.mockClear();
  });

  it("deve abrir o diálogo ao clicar no botão de edição", () => {
    renderComponent();

    const editButton = screen.getByRole("button", { name: /editar cliente/i });
    fireEvent.click(editButton);

    expect(screen.getByText("Editar Cliente")).toBeInTheDocument();
    expect(screen.getByLabelText("Nome")).toHaveValue(mockClient.name);
    expect(screen.getByLabelText("Email")).toHaveValue(mockClient.email);
  });

  it("deve validar os campos obrigatórios e exibir mensagens de erro", async () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: /editar cliente/i }));

    fireEvent.change(screen.getByLabelText("Nome"), { target: { value: "" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "" } });
    fireEvent.change(screen.getByLabelText("Telefone"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText("Endereço"), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByRole("button", { name: /salvar/i }));

    expect(await screen.findByText("Nome é obrigatório.")).toBeInTheDocument();
    expect(screen.getByText("Email é obrigatório.")).toBeInTheDocument();
    expect(screen.getByText("Telefone é obrigatório.")).toBeInTheDocument();
    expect(screen.getByText("Endereço é obrigatório.")).toBeInTheDocument();
    expect(mockOnEdit).not.toHaveBeenCalled();
  });

  it("deve submeter os dados corretamente se válidos", async () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: /editar cliente/i }));

    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Telefone"), {
      target: { value: "987654321" },
    });
    fireEvent.change(screen.getByLabelText("Endereço"), {
      target: { value: "Rua Nova, 456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /salvar/i }));

    await waitFor(() => {
      expect(mockOnEdit).toHaveBeenCalledWith(1, {
        name: "Jane Doe",
        email: "jane@example.com",
        phone: "987654321",
        address: "Rua Nova, 456",
      });
    });
  });
});
