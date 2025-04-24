import "jest";
import { AuthController } from "../controller/AuthController";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

jest.mock("bcrypt");
jest.mock("jsonwebtoken");

const mockJson = jest.fn();
const mockStatus = jest.fn().mockReturnValue({ json: mockJson });

const mockResponse = (): Partial<Response> => ({
  status: mockStatus,
  json: mockJson,
});

describe("AuthController.login", () => {
  const userRepositoryMock = {
    findOneBy: jest.fn(),
  };

  beforeAll(() => {
    process.env.JWT_SECRET = "test-secret";
    jest
      .spyOn(AppDataSource, "getRepository")
      .mockReturnValue(userRepositoryMock as any);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Deve retornar 401 se o usuário não for encontrado", async () => {
    userRepositoryMock.findOneBy.mockResolvedValue(undefined);

    const req = {
      body: {
        username: "naoexiste",
        password: "1234",
      },
    } as Request;

    const res = mockResponse() as Response;

    await AuthController.login(req, res);

    expect(mockStatus).toHaveBeenCalledWith(401);
    expect(mockJson).toHaveBeenCalledWith({
      message: "Usuário não encontrado",
    });
  });

  it("Deve retornar 401 se a senha estiver incorreta", async () => {
    const fakeUser = { username: "admin", password: "hashedpass" };
    userRepositoryMock.findOneBy.mockResolvedValue(fakeUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const req = {
      body: {
        username: "admin",
        password: "senhaerrada",
      },
    } as Request;

    const res = mockResponse() as Response;

    await AuthController.login(req, res);

    expect(mockStatus).toHaveBeenCalledWith(401);
    expect(mockJson).toHaveBeenCalledWith({ message: "Senha incorreta" });
  });

  it("Deve retornar token se o login for bem-sucedido", async () => {
    const fakeUser = { id: 1, username: "admin", password: "hashedpass" };
    userRepositoryMock.findOneBy.mockResolvedValue(fakeUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("fake-jwt-token");

    const req = {
      body: {
        username: "admin",
        password: "admin",
      },
    } as Request;

    const res = mockResponse() as Response;

    await AuthController.login(req, res);

    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: 1, username: "admin" },
      "test-secret",
      { expiresIn: "2h" }
    );

    expect(mockJson).toHaveBeenCalledWith({ token: "fake-jwt-token" });
  });
});
