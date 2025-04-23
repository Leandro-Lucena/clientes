import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entity/User";

interface AuthRequest extends Request {
  user?: User;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(403).json({ message: "Token não fornecido" });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error(
        "JWT_SECRET não configurado no ambiente, cerifique o arquivo '.env'"
      );
      res.status(500).json({ message: "Erro na configuração do servidor" });
      return;
    }

    const decoded: any = jwt.verify(token, secret);

    if (decoded.username !== "admin") {
      res
        .status(403)
        .json({ message: "Acesso negado. Somente admin pode acessar." });
      return;
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
}
