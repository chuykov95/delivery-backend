import { Router } from "express";
import UploadController from "../controllers/upload.controller";
import multer from "multer";

class UploadRoutes {
  router = Router();
  controller = new UploadController();

  // Настройка хранилища для сохранения загруженных файлов
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); // Папка, куда будут сохраняться файлы
    },
    filename: function (req, file, cb) {
      // Генерируем уникальное имя файла
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  // Middleware для обработки загрузки файлов
  upload = multer({ storage: this.storage });

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/", this.upload.single("image"), this.controller.create);
    // this.router.get("/", this.controller.findAll);
    // this.router.get("/:id", this.controller.findOne);
    // this.router.put("/:id", this.controller.update);
    // this.router.delete("/:id", this.controller.delete);
    // this.router.delete("/", this.controller.deleteAll);
  }
}

export default new UploadRoutes().router;
