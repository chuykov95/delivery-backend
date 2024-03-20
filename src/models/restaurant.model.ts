import mongoose, { Schema, Document } from "mongoose";

export interface IRestaurant extends Document {
  objectId: string | null;
  name: string;
  actualAddress: string;
  state: "active";
  actualAddressLat: number | null;
  actualAddressLon: number | null;
  city: string;
  schedule: string | null;
}

const RestaurantSchema: Schema<IRestaurant> = new Schema<IRestaurant>({
  objectId: { type: String, required: false, default: null },
  name: { type: String, required: true },
  actualAddress: { type: String, required: true },
  state: { type: String, enum: ["active", "inactive"], required: true },
  actualAddressLat: { type: Number, required: false, default: null },
  actualAddressLon: { type: Number, required: false, default: null },
  city: { type: String, required: true },
  schedule: { type: String, required: false, default: null },
});

RestaurantSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);
