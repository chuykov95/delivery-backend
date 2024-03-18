import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./routes";
import mongoose from "mongoose";
import { dbConfig } from "./config/db.config";

export default class Server {
  constructor(app: Application) {
    this.config(app);

    mongoose
      .connect(dbConfig)
      .then(() => {
        console.log("Connected to the database!");
      })
      .catch((err) => {
        console.log("Cannot connect to the database!", err);
        process.exit();
      });

    new Routes(app);
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: "http://localhost:8081",
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }
}
