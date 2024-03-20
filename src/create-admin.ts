import User, { IUser } from "./models/user.model";
import bcrypt from "bcrypt";

export const createAdmin = async () => {
  try {
    const admin = await User.findOne({ username: "admin" });

    if (!admin) {
      const hashedPassword = await bcrypt.hash("admin", 10);
      await User.create({ username: "admin", password: hashedPassword });
    }
  } catch (error) {
    console.error("Ошибка при создании пользователя", error);
  }
};
