import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  category: String,
  isbn: String,
  price: String,
  title: String,
  description: String,
  productMaterial: String,
  owner: { type: Schema.Types.ObjectId, ref: "user" },
});

export const ProductModel = model("product", ProductSchema);
