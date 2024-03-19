import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  parentId: string | null;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  parentId: { type: String, required: false, default: null },
});

CategorySchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default mongoose.model<ICategory>("Category", CategorySchema);
