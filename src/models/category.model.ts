import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  id: string;
  name: string;
  parentId: string;
}

const CategorySchema: Schema = new Schema({
  id: { type: mongoose.Types.ObjectId, default: mongoose.Types.ObjectId },
  name: { type: String, required: true },
  parentId: { type: String, required: false },
});

export default mongoose.model<ICategory>("Category", CategorySchema);
