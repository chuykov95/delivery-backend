import mongoose from "mongoose";
import { dbConfig } from "../config/db.config";
import { tutorials } from "./tutorial.model";

mongoose.Promise = global.Promise;

const db = {} as any;
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = tutorials(mongoose);

export default db;
