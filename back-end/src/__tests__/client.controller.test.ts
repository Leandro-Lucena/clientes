import { ClientController } from "../controller/ClientController";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";

jest.mock("typeorm", () => {
  const actualTypeorm = jest.requireActual("typeorm");
  return {
    ...actualTypeorm,
    DataSource: jest.fn().mockImplementation(() => ({
      getRepository: jest.fn().mockReturnValue({
        findOneBy: jest.fn() as jest.Mock,
        create: jest.fn(),
        save: jest.fn(),
        remove: jest.fn(),
      }),
    })),
  };
});

const mockJson = jest.fn();
const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
const mockResponse = () =>
  ({
    status: mockStatus,
    json: mockJson,
  } as unknown as Response);

describe("ClientController", () => {
  const clientRepositoryMock = {
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };
  (AppDataSource.getRepository as jest.Mock).mockReturnValue(
    clientRepositoryMock
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("Deve retornar 400 se o e-mail já estiver em uso", async () => {
      const existingClient = { email: "test@example.com" };
      (clientRepositoryMock.findOneBy as jest.Mock).mockResolvedValue(
        existingClient
      );

      const req = {
        body: {
          name: "Test Client",
          email: "test@example.com",
          phone: "123456789",
          address: "123 Test Street",
        },
      } as Request;

      const res = mockResponse();

      await ClientController.create(req, res);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        message: "E-mail já está em uso.",
      });
    });

    it("Deve criar um cliente com sucesso", async () => {
      const newClient = {
        name: "Test Client",
        email: "new@example.com",
        phone: "123456789",
        address: "123 Test Street",
      };
      (clientRepositoryMock.findOneBy as jest.Mock).mockResolvedValue(null);

      const req = {
        body: newClient,
      } as Request;

      const res = mockResponse();
      (clientRepositoryMock.create as jest.Mock).mockReturnValue(newClient);
      (clientRepositoryMock.save as jest.Mock).mockResolvedValue(newClient);

      await ClientController.create(req, res);

      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(newClient);
    });
  });

  describe("update", () => {
    it("Deve retornar 404 se o cliente não for encontrado", async () => {
      (clientRepositoryMock.findOneBy as jest.Mock).mockResolvedValue(null);

      const req = {
        params: { id: "1" },
        body: { name: "Updated Client" },
      } as unknown as Request;

      const res = mockResponse();

      await ClientController.update(req, res);

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({
        message: "Cliente não encontrado",
      });
    });

    it("Deve retornar 400 se o e-mail já estiver em uso por outro cliente", async () => {
      const clientToUpdate = { id: 1, email: "test@example.com" };
      const existingClient = { id: 2, email: "existing@example.com" };

      clientRepositoryMock.findOneBy.mockResolvedValueOnce(clientToUpdate);
      clientRepositoryMock.findOneBy.mockResolvedValueOnce(existingClient);

      const req = {
        params: { id: "1" },
        body: { email: "existing@example.com" },
      } as unknown as Request;

      const res = mockResponse();

      await ClientController.update(req, res);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        message: "E-mail já está em uso por outro cliente",
      });
    });

    it("Deve atualizar um cliente com sucesso", async () => {
      const updatedClient = {
        id: 1,
        name: "Updated Client",
        email: "updated@example.com",
      };
      const clientToUpdate = {
        id: 1,
        email: "old@example.com",
        name: "Old Client",
      };

      (clientRepositoryMock.findOneBy as jest.Mock).mockResolvedValue(
        clientToUpdate
      );
      (clientRepositoryMock.save as jest.Mock).mockResolvedValue(updatedClient);

      const req = {
        params: { id: "1" },
        body: { name: "Updated Client", email: "updated@example.com" },
      } as unknown as Request;

      const res = mockResponse();

      await ClientController.update(req, res);

      expect(mockStatus).toHaveBeenCalledWith(200);
      (clientRepositoryMock.findOneBy as jest.Mock).mockResolvedValue(null);
    });
  });

  describe("deleteClient", () => {
    it("Deve retornar 404 se o cliente não for encontrado", async () => {
      clientRepositoryMock.findOneBy.mockResolvedValue(null);

      const req = { params: { id: "1" } } as unknown as Request;
      const res = mockResponse();

      await ClientController.deleteClient(req, res);

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({
        message: "Cliente não encontrado",
      });
    });

    it("Deve excluir um cliente com sucesso", async () => {
      const clientToDelete = { id: 1, name: "Test Client" };

      clientRepositoryMock.findOneBy.mockResolvedValue(clientToDelete);
      clientRepositoryMock.remove.mockResolvedValue(clientToDelete);

      const req = { params: { id: "1" } } as unknown as Request;
      const res = mockResponse();

      await ClientController.deleteClient(req, res);

      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({
        message: "Cliente excluido com sucesso",
      });
    });
  });
});
