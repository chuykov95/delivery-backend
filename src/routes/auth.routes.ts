import { Router } from "express";
import AuthController from "../controllers/auth.controller";

class AuthRoutes {
  router = Router();
  controller = new AuthController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/login", this.controller.login);
    // this.router.get("/", this.controller.findAll);
    // this.router.get("/:id", this.controller.findOne);
    // this.router.put("/:id", this.controller.update);
    // this.router.delete("/:id", this.controller.delete);
    // this.router.delete("/", this.controller.deleteAll);
  }
}

export default new AuthRoutes().router;
