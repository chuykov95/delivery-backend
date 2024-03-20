import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { secret } from "../config/db.config";

export const authMiddleWare = (req: Request, res: Response, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(403).json({ message: "Пользователь не авторизован" });
    }
    const decodedData = jwt.verify(token, secret);
    next();
  } catch (e) {
    return res.status(403).json({ message: "Пользователь не авторизован" });
  }
};
