"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const data_source_1 = require("../data-source");
const User_1 = require("../entity/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    static async createAdminUserIfNotExist() {
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        const existingUser = await userRepository.findOneBy({ username: "admin" });
        if (!existingUser) {
            const hashedPassword = await bcrypt_1.default.hash("admin", 10);
            const adminUser = userRepository.create({
                username: "admin",
                password: hashedPassword,
            });
            await userRepository.save(adminUser);
            console.log("Usuário admin criado com sucesso!");
            console.log("Credenciais de acesso:");
            console.log("Login: admin");
            console.log("Senha: admin");
        }
        else {
            console.log("O usuário admin já existe no banco de dados.");
        }
    }
    static async login(req, res) {
        const { username, password } = req.body;
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        const user = await userRepository.findOneBy({ username });
        if (!user) {
            return res.status(401).json({ message: "Usuário não encontrado" });
        }
        const passwordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Senha incorreta" });
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error("JWT_SECRET não configurado no ambiente, cerifique o arquivo '.env'");
            return res
                .status(500)
                .json({ message: "Erro na configuração do servidor" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, username: user.username }, secret, { expiresIn: "2h" });
        return res.json({ token });
    }
}
exports.AuthController = AuthController;
