import { Router } from "express";
import RestaurantController from "../controllers/restaurant.controller";

class RestaurantRoutes {
  router = Router();
  controller = new RestaurantController();

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

export default new RestaurantRoutes().router;
