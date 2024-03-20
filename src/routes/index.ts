import express, { Application } from "express";
import categoryRoutes from "./category.routes";
import productRoutes from "./product.routes";
import uploadRoutes from "./upload.routes";
import restaurantRoutes from "./restaurant.routes";
import authRoutes from "./auth.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/category", categoryRoutes);
    app.use("/api/product", productRoutes);
    app.use("/api/restaurant", restaurantRoutes);
    app.use("/api/upload", uploadRoutes);
    app.use("/auth", authRoutes);
  }
}
