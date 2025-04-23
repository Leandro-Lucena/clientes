import "reflect-metadata"; // Necessário para o TypeORM
import { AppDataSource } from "./data-source";
import app from "./app";
import { AuthController } from "./controller/AuthController";

AppDataSource.initialize()
  .then(async () => {
    console.log("Conectado ao banco de dados com sucesso!");

    await AuthController.createAdminUserIfNotExist();

    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000");
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });
