import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./LoginPage";
import { BrowserRouter } from "react-router-dom";
import { ColorModeContext } from "../../theme/ColorModeContext";

jest.mock("../../services/authService", () => ({
  login: jest.fn(),
}));
const mockedLogin = require("../../services/authService").login;

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

const renderWithContext = () => {
  return render(
    <ColorModeContext.Provider
      value={{ mode: "light", toggleColorMode: jest.fn() }}
    >
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    </ColorModeContext.Provider>
  );
};

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Deve exibir mensagens de erro para campos obrigatórios", async () => {
    renderWithContext();

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    expect(await screen.findByText(/usuário obrigatório/i)).toBeInTheDocument();
    expect(await screen.findByText(/senha obrigatório/i)).toBeInTheDocument();
  });

  it("Deve tentar logar com usuário e senha válidos", async () => {
    mockedLogin.mockResolvedValueOnce({});

    renderWithContext();

    fireEvent.change(screen.getByLabelText(/usuário/i), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(mockedLogin).toHaveBeenCalledWith("admin", "123456");
    });

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/clients");
    });
  });

  it("Deve exibir snackbar em caso de erro no login", async () => {
    mockedLogin.mockRejectedValueOnce(new Error("Credenciais inválidas"));

    renderWithContext();

    fireEvent.change(screen.getByLabelText(/usuário/i), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: "wrong" },
    });

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    expect(await screen.findByText(/erro ao fazer login/i)).toBeInTheDocument();
  });
});
