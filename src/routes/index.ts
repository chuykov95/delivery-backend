import express, { Application } from "express";
import categoryRoutes from "./category.routes";
import productRoutes from "./product.routes";
import uploadRoutes from "./upload.routes";
import path from "path";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/categories", categoryRoutes);
    app.use("/api/product", productRoutes);
    app.use("/api/upload", uploadRoutes);
  }
}
