import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./routes";
import db from "./models";

export default class Server {
  constructor(app: Application) {
    this.config(app);

    db.mongoose
      .connect(db.url)
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
