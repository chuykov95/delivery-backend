import mongoose, { Schema, Document } from "mongoose";

export interface ITutorial extends Document {
  title: string;
  description: string;
  published: boolean;
}

const TutorialSchema: Schema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  published: { type: String, required: true },
});

TutorialSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default mongoose.model<ITutorial>("Tutorial", TutorialSchema);
