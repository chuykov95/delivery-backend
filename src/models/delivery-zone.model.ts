import mongoose, { Schema, Document } from "mongoose";

export interface IDeliveryZone extends Document {
  feature: {
    geometry: {
      type: string;
      coordinates: string[][];
    };
  };
  options: {
    editorDrawingCursor: string;
    editorMaxPoints: number;
    fillColor: string;
    strokeColor: string;
    strokeWidth: number;
  };
  name: string;
  deliveryCost: number;
}

const GeometrySchema = new Schema({
  type: { type: String, required: true },
  coordinates: [[String]],
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
  name: { type: String, required: true },
  deliveryCost: { type: Number, required: true },
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
