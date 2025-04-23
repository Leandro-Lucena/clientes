export async function login(username: string, password: string) {
  const body = JSON.stringify({ username, password });
  if (!body) throw new Error("Dados do login não definidos");

  const backendUrl = process.env.REACT_APP_API_URL;
  if (!backendUrl) throw new Error("URL do backend não definida");

  const res = await fetch(`${backendUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erro no login");
  }

  const { token } = await res.json();
  sessionStorage.setItem("token", token);
  return await token;
}

export function logout() {
  sessionStorage.removeItem("token");
}

export function getToken(): string | null {
  return sessionStorage.getItem("token");
}
