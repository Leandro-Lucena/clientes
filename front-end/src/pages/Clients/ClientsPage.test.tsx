import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { exportPDF } from "./components/ClientsReportPDF";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ClientsPage from "./ClientsPage";
import { getClients } from "../../services/clientService";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../services/clientService");
jest.mock("./components/ClientsReportPDF", () => ({
  exportPDF: jest.fn(),
}));

const renderWithTheme = (component: React.ReactElement) => {
  const theme = createTheme();
  return render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </MemoryRouter>
  );
};

describe("ClientsPage", () => {
  it("Deve renderizar título e botão de exportar PDF", async () => {
    (getClients as jest.Mock).mockResolvedValue([]);

    renderWithTheme(<ClientsPage />);

    expect(await screen.findByText("Clientes")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /exportar pdf/i })
    ).toBeInTheDocument();
  });

  it("Deve exibir snackbar ao simular erro no fetch", async () => {
    (getClients as jest.Mock).mockRejectedValue(new Error("Erro"));

    renderWithTheme(<ClientsPage />);

    await waitFor(() => {
      expect(screen.getByText(/erro ao buscar clientes/i)).toBeInTheDocument();
    });
  });

  it("Deve chamar função de exportação de PDF ao clicar no botão", async () => {
    (getClients as jest.Mock).mockResolvedValue([]);
    renderWithTheme(<ClientsPage />);

    const button = screen.getByRole("button", { name: /exportar pdf/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(exportPDF).toHaveBeenCalled();
    });
  });
});
