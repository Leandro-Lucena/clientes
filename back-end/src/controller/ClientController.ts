import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Client } from "../entity/Client";

export class ClientController {
  static async create(req: Request, res: Response): Promise<void> {
    const { name, email, phone, address } = req.body;
    const clientRepository = AppDataSource.getRepository(Client);
    const existingClient = await clientRepository.findOneBy({ email });

    if (existingClient) {
      res.status(400).json({ message: "E-mail já está em uso." });
      return;
    }

    const newClient = clientRepository.create({ name, email, phone, address });
    await clientRepository.save(newClient);
    res.status(201).json(newClient);
  }

  static async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;
    const clientRepository = AppDataSource.getRepository(Client);
    const client = await clientRepository.findOneBy({ id: parseInt(id) });

    if (!client) {
      res.status(404).json({ message: "Cliente não encontrado" });
      return;
    }

    if (email && email !== client.email) {
      const existingEmail = await clientRepository.findOneBy({ email });

      if (existingEmail && existingEmail.id !== client.id) {
        res
          .status(400)
          .json({ message: "E-mail já está em uso por outro cliente" });
        return;
      }
    }

    client.name = name || client.name;
    client.email = email || client.email;
    client.phone = phone || client.phone;
    client.address = address || client.address;

    await clientRepository.save(client);
    res.status(200).json(client);
  }

  static async getAll(req: Request, res: Response): Promise<void> {
    const clientRepository = AppDataSource.getRepository(Client);
    const clients = await clientRepository.find();
    res.status(200).json(clients);
  }
}
