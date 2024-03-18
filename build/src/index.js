"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const models_1 = __importDefault(require("./models"));
class Server {
    constructor(app) {
        this.config(app);
        models_1.default.mongoose
            .connect(models_1.default.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(() => {
            console.log("Connected to the database!");
        })
            .catch((err) => {
            console.log("Cannot connect to the database!", err);
            process.exit();
        });
        new routes_1.default(app);
    }
    config(app) {
        const corsOptions = {
            origin: "http://localhost:8081",
        };
        app.use((0, cors_1.default)(corsOptions));
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
    }
}
exports.default = Server;
