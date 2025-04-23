import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthController {
  static async createAdminUserIfNotExist() {
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOneBy({ username: "admin" });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash("admin", 10);

      const adminUser = userRepository.create({
        username: "admin",
        password: hashedPassword,
      });

      await userRepository.save(adminUser);

      console.log("Usuário admin criado com sucesso!");
      console.log("Credenciais de acesso:");
      console.log("Login: admin");
      console.log("Senha: admin");
    } else {
      console.log("O usuário admin já existe no banco de dados.");
    }
  }
  static async login(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ username });

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error(
        "JWT_SECRET não configurado no ambiente, cerifique o arquivo '.env'"
      );
      return res
        .status(500)
        .json({ message: "Erro na configuração do servidor" });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      secret,
      { expiresIn: "2h" }
    );

    return res.json({ token });
  }
}
