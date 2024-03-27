import { Router } from "express";
import OrdersController from "../controllers/orders.controller";

class OrdersRoutes {
  router = Router();
  controller = new OrdersController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/restaurants/geo/first", this.controller.findDeliveryZone);
    // this.router.get("/", this.controller.findAll);
    // this.router.get("/:id", this.controller.findOne);
    // this.router.put("/:id", this.controller.update);
    // this.router.delete("/:id", this.controller.delete);
    // this.router.delete("/", this.controller.deleteAll);
  }
}

export default new OrdersRoutes().router;
