"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // Necessário para o TypeORM
const data_source_1 = require("./data-source");
const app_1 = __importDefault(require("./app"));
const AuthController_1 = require("./controller/AuthController");
data_source_1.AppDataSource.initialize()
    .then(async () => {
    console.log("Conectado ao banco de dados com sucesso!");
    await AuthController_1.AuthController.createAdminUserIfNotExist();
    app_1.default.listen(5000, () => {
        console.log("Servidor rodando na porta 5000");
    });
})
    .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
});
