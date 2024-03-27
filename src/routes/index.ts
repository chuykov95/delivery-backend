import { Application } from "express";
import categoryRoutes from "./category.routes";
import productRoutes from "./product.routes";
import uploadRoutes from "./upload.routes";
import restaurantRoutes from "./restaurant.routes";
import authRoutes from "./auth.routes";
import deliveryZoneRoutes from "./delivery-zone.routes";
import ordersRoutes from "./orders.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/category", categoryRoutes);
    app.use("/api/product", productRoutes);
    app.use("/api/restaurant", restaurantRoutes);
    app.use("/api/zones", deliveryZoneRoutes);
    app.use("/api/upload", uploadRoutes);

    app.use("/auth", authRoutes);

    app.use("/orders/api/v1", ordersRoutes);
  }
}
