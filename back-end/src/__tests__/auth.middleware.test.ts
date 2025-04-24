import { Request, Response, NextFunction } from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

const mockVerify = jwt.verify as jest.Mock;

describe("authMiddleware", () => {
  let req: Partial<Request> & { headers: Record<string, string | undefined> };
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    process.env.JWT_SECRET = "test-secret";

    req = {
      headers: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  it("Deve retornar 403 se o token não for fornecido", () => {
    authMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Token não fornecido" });
    expect(next).not.toHaveBeenCalled();
  });

  it("Deve retornar 500 se o JWT_SECRET não estiver configurado", () => {
    delete process.env.JWT_SECRET;

    req.headers.authorization = "Bearer token";

    authMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Erro na configuração do servidor",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("Deve retornar 401 se o token for inválido", () => {
    process.env.JWT_SECRET = "test-secret";
    req.headers.authorization = "Bearer invalid-token";

    mockVerify.mockImplementation(() => {
      throw new Error("invalid token");
    });

    authMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Token inválido" });
    expect(next).not.toHaveBeenCalled();
  });

  it("Deve retornar 403 se o usuário não for admin", () => {
    req.headers.authorization = "Bearer valid-token";
    mockVerify.mockReturnValue({ username: "user" });

    authMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "Acesso negado. Somente admin pode acessar.",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("Deve chamar next() se o token for válido e o usuário for admin", () => {
    req.headers.authorization = "Bearer valid-token";
    mockVerify.mockReturnValue({ username: "admin" });

    authMiddleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});
