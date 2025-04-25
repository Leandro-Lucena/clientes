import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import DeleteClient from "./DeleteClient";
import { Client } from "@/types";

const mockClient: Client = {
  id: 1,
  name: "João Silva",
  email: "joao@example.com",
  phone: "11999999999",
  address: "Rua Exemplo, 123",
};

const mockOnDelete = jest.fn().mockResolvedValue(undefined);

const renderComponent = () => {
  render(<DeleteClient client={mockClient} onDelete={mockOnDelete} />);
};

describe("DeleteClient", () => {
  beforeEach(() => {
    mockOnDelete.mockClear();
  });

  it("Deve abrir o diálogo de confirmação ao clicar no botão de exclusão", () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: /excluir cliente/i }));

    expect(screen.getByText("Confirmar Exclusão")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Tem certeza que deseja excluir o cliente "João Silva"\?/i
      )
    ).toBeInTheDocument();
  });

  it("Deve fechar o diálogo ao clicar em cancelar", async () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: /excluir cliente/i }));
    fireEvent.click(screen.getByRole("button", { name: /cancelar/i }));

    await waitForElementToBeRemoved(() =>
      screen.queryByText("Confirmar Exclusão")
    );
  });

  it("Deve chamar a função onDelete com o ID do cliente ao confirmar", async () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: /excluir cliente/i }));
    fireEvent.click(screen.getByRole("button", { name: /^excluir$/i }));

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledWith(1);
    });

    await waitFor(() => {
      expect(screen.queryByText("Confirmar Exclusão")).not.toBeInTheDocument();
    });
  });
});
