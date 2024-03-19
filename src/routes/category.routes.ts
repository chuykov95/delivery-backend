import { Router } from "express";
import CategoryController from "../controllers/category.controller";

class CategoryRoutes {
  router = Router();
  controller = new CategoryController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/", this.controller.create);
    this.router.get("/", this.controller.findAll);
    this.router.get("/:id", this.controller.findOne);
    this.router.put("/:id", this.controller.update);
    this.router.delete("/:id", this.controller.delete);
    this.router.delete("/", this.controller.deleteAll);
  }
}

export default new CategoryRoutes().router;
