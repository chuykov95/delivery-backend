import { Application } from "express";
import categoryRoutes from "./category.routes";
import productRoutes from "./product.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/categories", categoryRoutes);
    app.use("/api/product", productRoutes);
  }
}
