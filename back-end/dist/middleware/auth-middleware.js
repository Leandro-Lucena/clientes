"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(403).json({ message: "Token não fornecido" });
        return;
    }
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error("JWT_SECRET não configurado no ambiente, cerifique o arquivo '.env'");
            res.status(500).json({ message: "Erro na configuração do servidor" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (decoded.username !== "admin") {
            res
                .status(403)
                .json({ message: "Acesso negado. Somente admin pode acessar." });
            return;
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Token inválido" });
    }
}
