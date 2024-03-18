"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const db_config_1 = require("../config/db.config");
const tutorial_model_1 = require("./tutorial.model");
mongoose_1.default.Promise = global.Promise;
const db = {};
db.mongoose = mongoose_1.default;
db.url = db_config_1.dbConfig.url;
db.tutorials = (0, tutorial_model_1.tutorials)(mongoose_1.default);
exports.default = db;
