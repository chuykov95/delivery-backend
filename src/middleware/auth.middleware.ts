import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { secret } from "../config/db.config";

export const authMiddleWare = (req: Request, res: Response, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1]; // Получаем токен из заголовка
    if (!token) {
      return res.status(403).json({ message: "Пользователь не авторизован" });
    }
    const decodedData = jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: `Пользователь не авторизован` });
      }
    });

    next();
  } catch (e) {
    return res.status(403).json({ message: "Пользователь не авторизован" });
  }
};
