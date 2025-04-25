import { login, logout, getToken } from "./authService";

beforeEach(() => {
  fetchMock.resetMocks();
  sessionStorage.clear();
  process.env.REACT_APP_API_URL = "http://localhost:5000";
});

describe("login", () => {
  it("Realiza login com sucesso e salva token", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ token: "mock-token" }));

    const token = await login("user", "pass");

    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:5000/auth/login",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "user", password: "pass" }),
      })
    );

    expect(token).toBe("mock-token");
    expect(sessionStorage.getItem("token")).toBe("mock-token");
  });

  it("Lança erro se resposta do servidor for inválida", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: "Credenciais inválidas" }),
      { status: 401 }
    );

    await expect(login("user", "wrong-pass")).rejects.toThrow(
      "Credenciais inválidas"
    );
  });

  it("Lança erro se REACT_APP_API_URL não estiver definida", async () => {
    delete process.env.REACT_APP_API_URL;
    await expect(login("user", "pass")).rejects.toThrow(
      "URL do backend não definida"
    );
  });
});

describe("logout", () => {
  it("Remove token do sessionStorage", () => {
    sessionStorage.setItem("token", "mock-token");
    logout();
    expect(sessionStorage.getItem("token")).toBeNull();
  });
});

describe("getToken", () => {
  it("Retorna o token do sessionStorage", () => {
    sessionStorage.setItem("token", "mock-token");
    expect(getToken()).toBe("mock-token");
  });

  it("Retorna null se token não existir", () => {
    expect(getToken()).toBeNull();
  });
});
