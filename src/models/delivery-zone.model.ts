import mongoose, { Schema, Document } from "mongoose";

export interface IDeliveryZone extends Document {
  feature: {
    geometry: {
      type: string;
      coordinates: number[][];
    };
  };
  options: {
    editorDrawingCursor: string;
    editorMaxPoints: number;
    fillColor: string;
    strokeColor: string;
    strokeWidth: number;
  };
  polygonName: string;
  amountDelivery: number;
  deliveryTime: number;
  isActive: boolean;
  restaurantId: string;
  minOrderAmountDelivery: number;
  minOrderAmountFreeDelivery: number;
}

const GeometrySchema = new Schema({
  type: { type: String, required: true },
  coordinates: [[[Number]]],
});

const OptionsSchema = new Schema({
  editorDrawingCursor: { type: String, required: true },
  editorMaxPoints: { type: Number, required: true },
  fillColor: { type: String, required: true },
  strokeColor: { type: String, required: true },
  strokeWidth: { type: Number, required: true },
});

const DeliveryZoneSchema = new Schema<IDeliveryZone>({
  feature: {
    geometry: { type: GeometrySchema, required: true },
  },
  options: { type: OptionsSchema, required: true },
  polygonName: { type: String, required: true },
  amountDelivery: { type: Number, required: true },
  deliveryTime: { type: Number, required: true },
  isActive: { type: Boolean, required: true },
  restaurantId: { type: String, required: true },
  minOrderAmountDelivery: { type: Number, required: true },
  minOrderAmountFreeDelivery: { type: Number, required: true },
});

DeliveryZoneSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default mongoose.model<IDeliveryZone>(
  "DeliveryZone",
  DeliveryZoneSchema
);
