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

export default mongoose.model<ITutorial>("Tutorial", TutorialSchema);
