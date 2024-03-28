import { Application } from "express";
import categoryRoutes from "./category.routes";
import productRoutes from "./product.routes";
import uploadRoutes from "./upload.routes";
import restaurantRoutes from "./restaurant.routes";
import authRoutes from "./auth.routes";
import deliveryZoneRoutes from "./delivery-zone.routes";
import ordersRoutes from "./orders.routes";

import { authMiddleWare } from "../middleware/auth.middleware";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/category", authMiddleWare, categoryRoutes);
    app.use("/api/product", authMiddleWare, productRoutes);
    app.use("/api/restaurant", authMiddleWare, restaurantRoutes);
    app.use("/api/zones", authMiddleWare, deliveryZoneRoutes);
    app.use("/api/upload", authMiddleWare, uploadRoutes);

    app.use("/auth", authRoutes);

    app.use("/orders/api/v1", ordersRoutes);
  }
}
