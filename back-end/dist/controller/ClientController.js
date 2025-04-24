"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const data_source_1 = require("../data-source");
const Client_1 = require("../entity/Client");
class ClientController {
    static async create(req, res) {
        const { name, email, phone, address } = req.body;
        const clientRepository = data_source_1.AppDataSource.getRepository(Client_1.Client);
        const existingClient = await clientRepository.findOneBy({ email });
        if (existingClient) {
            res.status(400).json({ message: "E-mail já está em uso." });
            return;
        }
        const newClient = clientRepository.create({ name, email, phone, address });
        await clientRepository.save(newClient);
        res.status(201).json(newClient);
    }
    static async update(req, res) {
        const { id } = req.params;
        const { name, email, phone, address } = req.body;
        const clientRepository = data_source_1.AppDataSource.getRepository(Client_1.Client);
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
    static async getAll(req, res) {
        const clientRepository = data_source_1.AppDataSource.getRepository(Client_1.Client);
        const clients = await clientRepository.find();
        res.status(200).json(clients);
    }
    static async deleteClient(req, res) {
        const { id } = req.params;
        const clientRepository = data_source_1.AppDataSource.getRepository(Client_1.Client);
        const client = await clientRepository.findOneBy({ id: parseInt(id) });
        if (!client) {
            res.status(404).json({ message: "Cliente não encontrado" });
            return;
        }
        await clientRepository.remove(client);
        res.status(200).json({ message: "Cliente excluido com sucesso" });
    }
}
exports.ClientController = ClientController;
