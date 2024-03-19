import { Application } from "express";
import categoryRoutes from "./category.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/categories", categoryRoutes);
  }
}
