import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  externalId: string;
  categoryId: string;
  name: string;
  restaurantExtendDatas: string | null;
  price: number;
  schemeId: string | null;
  disabled: boolean | null;
  description: string;
  imageUrls: string[];
  measure: { unit: string; value: number } | null;
  isContainInStopList: boolean | null;
  isListStoped: boolean | null;
  calories: number | null;
  energyValue: number | null;
  proteins: number | null;
  fats: number | null;
  carbohydrates: number | null;
  excise: number | null;
  globalTradeItemNumbers: string[] | null;
}

const MeasureSchema = new Schema({
  unit: { type: String, required: false, default: null },
  value: { type: Number, required: false, default: null },
});

const ProductSchema: Schema<IProduct> = new Schema<IProduct>({
  externalId: { type: String, required: false, default: null },
  categoryId: { type: String, required: true },
  name: { type: String, required: true },
  restaurantExtendDatas: { type: String, required: false, default: null },
  price: { type: Number, required: true },
  schemeId: { type: String, required: false, default: null },
  disabled: { type: Boolean, required: false, default: null },
  description: { type: String, required: false, default: "" },
  imageUrls: { type: [String], required: false, default: [] },
  measure: { type: MeasureSchema, required: false },
  isContainInStopList: { type: Boolean, required: false, default: null },
  isListStoped: { type: Boolean, required: false, default: null },
  calories: { type: Number, required: false, default: null },
  energyValue: { type: Number, required: false, default: null },
  proteins: { type: Number, required: false, default: null },
  fats: { type: Number, required: false, default: null },
  carbohydrates: { type: Number, required: false, default: null },
  excise: { type: Number, required: false, default: null },
  globalTradeItemNumbers: { type: [String], required: false, default: null },
});

ProductSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default mongoose.model<IProduct>("Product", ProductSchema);
