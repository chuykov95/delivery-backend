import { Router } from "express";
import DeliveryZoneController from "../controllers/delivery-zone.controller";

class DeliveryZoneRoutes {
  router = Router();
  controller = new DeliveryZoneController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/", this.controller.create);
    this.router.get("/", this.controller.findAll);
    // this.router.get("/:id", this.controller.findOne);
    this.router.put("/", this.controller.update);
    // this.router.delete("/:id", this.controller.delete);
    this.router.delete("/", this.controller.deleteAll);
  }
}

export default new DeliveryZoneRoutes().router;
