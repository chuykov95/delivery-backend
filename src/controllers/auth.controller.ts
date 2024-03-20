import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class AuthController {
  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const user: IUser = await User.findOne({
        username,
      });

      if (!user) {
        res.status(403).send("Пользователь не найден");
        return;
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        res.status(400).json({ message: `Введен неверный пароль` });
        return;
      }

      const token = jwt.sign({ username }, "secret");

      res.cookie("token", token, { httpOnly: true, secure: true });
      res.send(token);
    } catch (error) {
      res.status(403).send({
        message: error.message || "Пользователь не авторизован",
      });
    }
  }
}
