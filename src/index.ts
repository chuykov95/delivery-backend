import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./routes";
import { db } from "./config/db.config";
import connect from "./connect-db";
import path from "path";

export default class Server {
  constructor(app: Application) {
    this.config(app);

    connect({ db });

    new Routes(app);
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: "http://localhost:8081",
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/uploads", express.static(path.join(__dirname, "uploads")));
  }
}
